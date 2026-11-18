/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2026 Georobotix Inc. All Rights Reserved.

 ******************************* END LICENSE BLOCK ***************************/

import View from "../View.js";
import {isDefined} from "../../../utils/Utils.js";
import {DATASOURCE_DATA_TOPIC} from "../../../Constants.js";
import {EventType} from "../../../event/EventType.js";
import '../../../resources/css/sdrview.css';

const DEFAULT_OPERATING_MODES = [
    {label: 'Spectrum / Audio', value: 'SPECTRUM_AUDIO'},
    {label: '1090 MHz ADS-B', value: 'ADSB_RECEIVER'},
    {label: '162 MHz AIS', value: 'AIS_RECEIVER'}
];

const DEFAULT_AUDIO_MODES = ['OFF', 'WFM', 'WFM_STEREO', 'NFM', 'AM', 'USB', 'LSB', 'CW'];

// the band of the spectrum canvas reserved below the plot for the frequency axis
const PLOT_TOP = 10;
const PLOT_BOTTOM_MARGIN = 28;

// the demodulated audio frames are SWE binary records: a 20 bytes big endian header
// (timestamp, sample rate, channel count, payload length) followed by signed 16 bits PCM
const AUDIO_HEADER_LENGTH = 20;
const DEFAULT_AUDIO_SAMPLE_RATE = 48000;

// the audio carried by an observation rather than by a framed binary stream comes with its own
// sample rate, the HTL scouts demodulating at 44.1 kHz
const DEFAULT_OBSERVATION_AUDIO_SAMPLE_RATE = 44100;

const DEFAULT_HTL_DEMOD_MODES = ['FM', 'WFM', 'AM', 'USB', 'LSB', 'CW'];
const HTL_CONNECTION_MODE_LABELS = {
    '1GbE': 'HTL 1 GbE',
    '10GbE': 'HTL 10 GbE',
    'BOTH': 'HTL Dual 1/10 GbE',
    'UNKNOWN': 'HTL SDR'
};

// the fields an audio record can carry its binary payload in, depending on the parser
const AUDIO_FRAME_FIELDS = ['data', 'frameData', 'samples', 'audio', 'value'];

/**
 * Formats a frequency for the tuning input, which always shows kHz resolution.
 * @param {Number} mhz - the frequency (MHz)
 * @return {String} the formatted frequency
 */
function formatFrequencyMhz(mhz) {
    if (isNaN(mhz) || mhz <= 0) {
        return '0.000';
    }
    return mhz.toFixed(3);
}

/**
 * Formats an elapsed duration as mm:ss.
 * @param {Number} seconds - the elapsed seconds
 * @return {String} the formatted duration
 */
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(remainder).padStart(2, '0');
}

/**
 * Digs the binary payload out of an audio record. Used when no 'getAudioFrame' property tells
 * which field of the record carries it.
 * @param {any} record - the audio record
 * @return {ArrayBuffer|ArrayBufferView|undefined} the binary payload
 */
function findBinaryFrame(record) {
    if (!isDefined(record)) {
        return undefined;
    }
    if (record instanceof ArrayBuffer || ArrayBuffer.isView(record)) {
        return record;
    }
    if (typeof record !== 'object') {
        return undefined;
    }
    for (let field of AUDIO_FRAME_FIELDS) {
        const value = record[field];
        if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
            return value;
        }
    }
    return undefined;
}

/**
 * Decodes a block of signed 16 bits little endian PCM into normalized samples. The payload is
 * accepted as a typed array, an ArrayBuffer, an array of bytes or a base64 string, which is how
 * the different drivers put it in an observation.
 * @param {any} raw - the PCM payload
 * @return {Float32Array|null} the normalized samples, or null if the payload holds none
 */
function pcmToFloat32(raw) {
    if (!isDefined(raw)) {
        return null;
    }
    if (raw instanceof Float32Array) {
        return raw;
    }

    let bytes;
    if (raw instanceof Uint8Array) {
        bytes = raw;
    } else if (ArrayBuffer.isView(raw)) {
        bytes = new Uint8Array(raw.buffer, raw.byteOffset, raw.byteLength);
    } else if (raw instanceof ArrayBuffer) {
        bytes = new Uint8Array(raw);
    } else if (Array.isArray(raw)) {
        if (raw.length === 0) {
            return null;
        }
        bytes = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
            bytes[i] = raw[i] & 0xff;
        }
    } else if (typeof raw === 'string') {
        try {
            const binary = atob(raw);
            bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
        } catch (e) {
            return null;
        }
    } else {
        return null;
    }

    const sampleCount = Math.floor(bytes.byteLength / 2);
    if (sampleCount === 0) {
        return null;
    }

    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const samples = new Float32Array(sampleCount);
    for (let i = 0; i < sampleCount; i++) {
        samples[i] = view.getInt16(i * 2, true) / 32768.0;
    }
    return samples;
}

/**
 * View displaying the RF spectrum of a Software Defined Radio as a spectrum analyzer
 * (amplitude vs frequency) and a waterfall spectrogram (history vs frequency).
 *
 * The view consumes 'sdr' layers. When a ConSys API ControlStream (or a custom 'sendCommand'
 * function) is given, the view also exposes the receiver controls: click-to-tune, center
 * frequency stepping, gain and demodulation mode.
 *
 * @extends View
 */
class SdrView extends View {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]} [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.autoDb=true] - Automatically track the dB floor and ceiling
     * @param {Number} [properties.minDb=-100] - The dB floor of the display
     * @param {Number} [properties.maxDb=-20] - The dB ceiling of the display
     * @param {Number} [properties.averaging=2] - The number of frames of the exponential smoothing. 1 disables it
     * @param {Boolean} [properties.peakHold=true] - Display the peak hold trace
     * @param {Number} [properties.peakHoldDecay=0.25] - The dB decay of the peak hold trace per frame
     * @param {Boolean} [properties.waterfall=true] - Display the waterfall spectrogram
     * @param {Number} [properties.waterfallSpeed=2] - The number of pixel rows drawn per spectrum frame
     * @param {String} [properties.colorPalette='heat'] - The waterfall palette: 'heat', 'viridis', 'jet' or 'cool'
     * @param {Number} [properties.spectrumHeight=215] - The height (px) of the spectrum canvas
     * @param {Number} [properties.waterfallHeight=160] - The height (px) of the waterfall canvas
     * @param {Number} [properties.centerFrequency=98000000] - The center frequency (Hz) used until the data reports one
     * @param {Number} [properties.sampleRate=2048000] - The sample rate / span (Hz) used until the data reports one
     * @param {Boolean} [properties.showControls=true] - Display the tuning and display control bar
     * @param {Boolean} [properties.showReceiverControls] - Display the receiver control bar. Defaults to true
     * when a 'controlStream', a 'sendCommand' or an 'audioDataSource' property is defined
     * @param {Object} [properties.controlStream] - A ConSys API ControlStream used to send the receiver commands
     * @param {Function} [properties.sendCommand] - function(payload, label) overriding how a command is sent
     * @param {Function} [properties.buildCommand] - function(parameters) building the command payload from the
     * receiver parameters. Defaults to parameters => ({parameters})
     * @param {Function} [properties.onTune] - function(frequencyHz) called when the user tunes the receiver
     * @param {Object[]} [properties.operatingModes] - the selectable operating modes as {label, value} objects
     * @param {String[]} [properties.audioModes] - the selectable demodulation modes
     * @param {String} [properties.operatingMode='SPECTRUM_AUDIO'] - the initial operating mode
     * @param {String} [properties.audioMode='OFF'] - the initial demodulation mode
     * @param {Number} [properties.gain=20.7] - the initial tuner gain (dB)
     * @param {Number} [properties.maxGain=49.6] - the highest tuner gain (dB) offered by the gain slider
     * @param {Boolean} [properties.autoGain=true] - the initial auto gain state
     * @param {Object} [properties.audioDataSource] - the DataSource carrying the demodulated audio. Its
     * binary frames are played back by the view when the user turns the audio on
     * @param {Function} [properties.getAudioFrame] - function(record) returning the binary audio frame of
     * an audio record. Defaults to the first binary field found in the record
     * @param {Boolean} [properties.showAudioControls] - Display the audio listening controls. Defaults to
     * true when an 'audioDataSource' property is defined
     * @param {Number} [properties.volume=80] - the initial playback volume, from 0 to 100
     * @param {Number} [properties.squelch=-80] - the audio squelch threshold (dBFS). Audio quieter than
     * this is not played back
     * @param {String} [properties.receiverType='rtlsdr'] - the command set of the receiver: 'rtlsdr' for
     * the flat receiver parameters, 'htl' for the HTL radio command choices
     * @param {String} [properties.connectionMode='UNKNOWN'] - the HTL connection: '1GbE', '10GbE', 'BOTH'
     * or 'UNKNOWN'. Gates the controls each connection offers
     * @param {Boolean} [properties.showHtlControls=false] - open the HTL control panel on startup
     * @param {String[]} [properties.htlDemodModes] - the selectable HTL scout demodulation modes
     * @param {Number} [properties.htlStartFrequency=130000000] - the initial sweep start frequency (Hz)
     * @param {Number} [properties.htlStopFrequency=170000000] - the initial sweep stop frequency (Hz)
     * @param {Number} [properties.htlNumPoints=1024] - the initial sweep FFT bin count
     * @param {Number} [properties.htlUpdateRate=10] - the initial sweep update rate (Hz)
     * @param {Number} [properties.htlScoutId=0] - the scout driven by the tuning controls
     * @param {Number} [properties.htlScoutFrequency=145000000] - the initial scout center frequency (Hz)
     * @param {Number} [properties.htlTunerId=0] - the 10 GbE tuner driven by the tuning controls
     * @param {Number} [properties.htlTunerFrequency=150000000] - the initial tuner center frequency (Hz)
     */
    constructor(properties) {
        super({
            supportedLayers: ['sdr'],
            visible: true,
            ...properties
        });

        const props = isDefined(properties) ? properties : {};

        // display settings
        this.autoDb = isDefined(props.autoDb) ? props.autoDb : true;
        this.minDb = isDefined(props.minDb) ? props.minDb : -100;
        this.maxDb = isDefined(props.maxDb) ? props.maxDb : -20;
        this.averaging = isDefined(props.averaging) ? props.averaging : 2;
        this.peakHold = isDefined(props.peakHold) ? props.peakHold : true;
        this.peakHoldDecay = isDefined(props.peakHoldDecay) ? props.peakHoldDecay : 0.25;
        this.showWaterfall = isDefined(props.waterfall) ? props.waterfall : true;
        this.waterfallSpeed = isDefined(props.waterfallSpeed) ? props.waterfallSpeed : 2;
        this.colorPalette = isDefined(props.colorPalette) ? props.colorPalette : 'heat';
        this.spectrumHeight = isDefined(props.spectrumHeight) ? props.spectrumHeight : 215;
        this.waterfallHeight = isDefined(props.waterfallHeight) ? props.waterfallHeight : 160;

        // frequency plan
        this.centerFrequencyHz = isDefined(props.centerFrequency) ? props.centerFrequency : 98000000;
        this.sampleRateHz = isDefined(props.sampleRate) ? props.sampleRate : 2048000;
        this.numBins = 0;
        // a datastream reporting a start and a stop frequency sweeps a band instead of being tuned
        // to a center frequency: the frequency plan then comes from those bounds
        this.hasStartStop = false;

        // receiver settings
        this.operatingMode = isDefined(props.operatingMode) ? props.operatingMode : 'SPECTRUM_AUDIO';
        this.audioMode = isDefined(props.audioMode) ? props.audioMode : 'OFF';
        this.gain = isDefined(props.gain) ? props.gain : 20.7;
        this.maxGain = isDefined(props.maxGain) ? props.maxGain : 49.6;
        this.autoGain = isDefined(props.autoGain) ? props.autoGain : true;
        this.operatingModes = isDefined(props.operatingModes) ? props.operatingModes : DEFAULT_OPERATING_MODES;
        this.audioModes = isDefined(props.audioModes) ? props.audioModes : DEFAULT_AUDIO_MODES;

        // command sink
        this.controlStream = props.controlStream;
        this.buildCommand = isDefined(props.buildCommand) ? props.buildCommand : (parameters => ({parameters}));
        this.showControls = isDefined(props.showControls) ? props.showControls : true;
        this.showReceiverControls = isDefined(props.showReceiverControls) ? props.showReceiverControls :
            (isDefined(props.controlStream) || isDefined(props.sendCommand) || isDefined(props.audioDataSource));

        // audio playback
        this.audioDataSource = props.audioDataSource;
        this.showAudioControls = isDefined(props.showAudioControls) ? props.showAudioControls :
            isDefined(props.audioDataSource);
        this.volume = isDefined(props.volume) ? props.volume : 80;
        this.squelch = isDefined(props.squelch) ? props.squelch : -80;
        this.isListening = false;
        this.isRecordingAudio = false;
        this.audioContext = null;
        this.audioGainNode = null;
        this.nextAudioStartTime = 0;
        this.audioBroadcastChannel = null;
        this.audioSampleRate = DEFAULT_OBSERVATION_AUDIO_SAMPLE_RATE;
        this.audioChannels = 1;
        this.audioLevelDb = -100;
        this.isAudioConnected = false;
        this.recordingDurationSec = 0;
        this.recordingTimerId = null;

        // HTL radio command set
        this.receiverType = isDefined(props.receiverType) ? props.receiverType : 'rtlsdr';
        this.connectionMode = isDefined(props.connectionMode) ? props.connectionMode : 'UNKNOWN';
        this.showHtlPanel = isDefined(props.showHtlControls) ? props.showHtlControls : false;
        this.htlDemodModes = isDefined(props.htlDemodModes) ? props.htlDemodModes : DEFAULT_HTL_DEMOD_MODES;
        this.htlStartFrequencyHz = isDefined(props.htlStartFrequency) ? props.htlStartFrequency : 130000000;
        this.htlStopFrequencyHz = isDefined(props.htlStopFrequency) ? props.htlStopFrequency : 170000000;
        this.htlNumPoints = isDefined(props.htlNumPoints) ? props.htlNumPoints : 1024;
        this.htlUpdateRate = isDefined(props.htlUpdateRate) ? props.htlUpdateRate : 10;
        this.htlScoutId = isDefined(props.htlScoutId) ? props.htlScoutId : 0;
        this.htlScoutFrequencyHz = isDefined(props.htlScoutFrequency) ? props.htlScoutFrequency : 145000000;
        this.htlDemodMode = this.htlDemodModes[0];
        this.htlSweepIsDefault = !isDefined(props.htlStartFrequency) && !isDefined(props.htlStopFrequency);
        // 10 GbE DDC tuner and collector, driven by the HTL panel
        this.htlTunerId = isDefined(props.htlTunerId) ? props.htlTunerId : 0;
        this.htlTunerFrequencyHz = isDefined(props.htlTunerFrequency) ? props.htlTunerFrequency : 150000000;
        this.htlTunerMode = 'AutoTune';
        this.htlTxRxMode = 'Rx';
        this.htlTunerAgc = true;
        this.htlTunerAttenuation = 0;
        this.htlTunerTxPower = 0;
        this.htlTunerPreamp = false;
        this.htlTunerDropResources = false;
        this.htlCollectorSlot = 'iq0';
        this.htlCollectorTunerId = -1;
        this.htlCollectorFrequencyHz = 150000000;
        this.htlCollectorBandwidthHz = 2000000;
        this.htlCollectorSampleRate = 0;
        this.htlCollectorSnapshotSamples = 0;
        this.htlCollectorAgc = true;
        this.htlCollectorAttenuation = 0;
        this.htlCollectorPreamp = false;
        this.htlCollectorTriggerType = 'None';
        this.htlCollectorId = -1;
        this.htlHaltType = 'All';
        this.htlServiceName = 'DDC';

        // state
        this.isLive = false;
        this.isPaused = false;
        this.fps = 0;
        this.frameCounter = 0;
        this.lastFpsTime = Date.now();
        this.peakFrequencyMhz = '---';
        this.peakDb = '---';
        this.tuneMhz = this.centerFrequencyHz / 1e6;
        // the tuning input is only overwritten by the datastream while the user is not typing in it
        this.isEditingTuneInput = false;
        // the tuned frequency is still the one the view was created with, so a swept band may recenter it
        this.tuneMhzIsDefault = true;

        // dsp buffers
        this.smoothedBins = null;
        this.peakHoldBins = null;

        // hover state
        this.tooltipVisible = false;
        this.tooltipX = -1;
        this.tooltipY = -1;

        // rendering
        this.paletteRgb = new Uint8Array(256 * 3);
        this.initPalette(this.colorPalette);
        this.rowCanvas = null;
        this.rowCtx = null;
        this.animationFrameId = null;
        this.resizeObserver = null;
        this.readouts = {};

        this.buildDom();
        this.onResize();
        this.clearWaterfall();
        this.startRenderLoop();
        this.connectAudioDataSource();

        if (isDefined(window.ResizeObserver)) {
            this.resizeObserver = new ResizeObserver(() => this.onResize());
            this.resizeObserver.observe(this.elementDiv);
        }
    }

    // ------------------------------------------------------------------ DOM

    /**
     * @private
     */
    createElement(tag, className, parent, text) {
        const element = document.createElement(tag);
        if (isDefined(className)) {
            element.setAttribute('class', className);
        }
        if (isDefined(text)) {
            element.innerText = text;
        }
        if (isDefined(parent)) {
            parent.appendChild(element);
        }
        return element;
    }

    /**
     * @private
     */
    createButton(label, className, parent, onClick, title) {
        const button = this.createElement('button', 'sdr-btn ' + (className || ''), parent, label);
        button.setAttribute('type', 'button');
        if (isDefined(title)) {
            button.setAttribute('title', title);
        }
        button.addEventListener('click', onClick);
        return button;
    }

    /**
     * @private
     */
    createSelect(options, selectedValue, parent, onChange) {
        const select = this.createElement('select', 'sdr-select', parent);
        for (let option of options) {
            const value = isDefined(option.value) ? option.value : option;
            const label = isDefined(option.label) ? option.label : option;
            const optionElement = this.createElement('option', undefined, select, label);
            optionElement.setAttribute('value', value);
            if (value === selectedValue) {
                optionElement.setAttribute('selected', 'selected');
            }
        }
        select.addEventListener('change', () => onChange(select.value));
        return select;
    }

    /**
     * Creates a labelled numeric input.
     * @private
     */
    createNumberField(label, value, step, parent, onChange, width) {
        const field = this.createElement('label', 'sdr-field', parent);
        this.createElement('span', 'sdr-field-label', field, label);
        const input = this.createElement('input', 'sdr-number-input', field);
        input.setAttribute('type', 'number');
        input.setAttribute('step', String(step));
        input.value = String(value);
        if (isDefined(width)) {
            input.style.width = width;
        }
        input.addEventListener('change', () => onChange(Number(input.value)));
        return input;
    }

    /**
     * Creates a labelled select bound to a list of values.
     * @private
     */
    createSelectField(label, options, selectedValue, parent, onChange) {
        const field = this.createElement('label', 'sdr-field', parent);
        this.createElement('span', 'sdr-field-label', field, label);
        return this.createSelect(options, selectedValue, field, onChange);
    }

    /**
     * Creates a labelled checkbox.
     * @private
     */
    createCheckbox(label, checked, parent, onChange) {
        const field = this.createElement('label', 'sdr-field sdr-field-inline sdr-checkbox-field', parent);
        const input = this.createElement('input', undefined, field);
        input.setAttribute('type', 'checkbox');
        input.checked = checked;
        input.addEventListener('change', () => onChange(input.checked));
        this.createElement('span', 'sdr-field-label', field, label);
        return input;
    }

    /**
     * Creates a labelled slider showing its value next to it.
     * @private
     */
    createSliderField(label, value, min, max, step, unit, parent, onChange) {
        const field = this.createElement('label', 'sdr-field sdr-field-inline', parent);
        this.createElement('span', 'sdr-field-label', field, label);
        const slider = this.createElement('input', 'sdr-slider', field);
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', String(min));
        slider.setAttribute('max', String(max));
        slider.setAttribute('step', String(step));
        slider.value = String(value);
        const readout = this.createElement('span', 'sdr-slider-value', field, value + unit);
        slider.addEventListener('input', () => {
            readout.innerText = slider.value + unit;
            onChange(Number(slider.value));
        });
        return slider;
    }

    /**
     * Builds the whole view: status bar, control bars and both canvases.
     * @private
     */
    buildDom() {
        const root = this.elementDiv;
        root.classList.add('sdr-card');

        // ---- status header
        const header = this.createElement('div', 'sdr-header', root);
        const leftGroup = this.createElement('div', 'sdr-status-group', header);
        this.pulseElement = this.createElement('span', 'sdr-pulse waiting', leftGroup);
        this.statusElement = this.createElement('span', 'sdr-status-title', leftGroup, 'CONNECTING');
        this.frequencyBadge = this.createElement('span', 'sdr-freq-badge', leftGroup, '--- MHz');
        this.spanBadge = this.createElement('span', 'sdr-span-badge', leftGroup, 'Span: --- MHz');
        this.modeBadge = this.createElement('span', 'sdr-chip sdr-chip-primary', leftGroup, '');
        if (this.isHtl()) {
            this.connectionBadge = this.createElement('span',
                'sdr-chip sdr-chip-' + this.connectionModeClass(), leftGroup, this.connectionModeLabel());
        }

        const rightGroup = this.createElement('div', 'sdr-status-group', header);
        this.peakBadge = this.createElement('span', 'sdr-chip sdr-chip-warning', rightGroup, 'Peak: --- MHz (--- dB)');
        this.fpsBadge = this.createElement('span', 'sdr-fps-badge', rightGroup, '0 fps');

        // ---- tuning and display controls
        if (this.showControls) {
            const controlsBar = this.createElement('div', 'sdr-controls-bar', root);
            const tuneGroup = this.createElement('div', 'sdr-group', controlsBar);

            const tuneField = this.createElement('label', 'sdr-field', tuneGroup);
            this.createElement('span', 'sdr-field-label', tuneField, 'Center (MHz)');
            this.tuneInput = this.createElement('input', 'sdr-tune-input', tuneField);
            this.tuneInput.setAttribute('type', 'text');
            this.tuneInput.setAttribute('placeholder', '0000.000');
            this.tuneInput.value = formatFrequencyMhz(this.tuneMhz);
            this.tuneInput.addEventListener('focus', () => this.onTuneFocus());
            this.tuneInput.addEventListener('blur', () => this.applyTuneInput());
            this.tuneInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    this.applyTuneInput();
                }
            });

            this.createButton('Tune', 'sdr-btn-primary', tuneGroup, () => this.applyTuneInput());

            const stepGroup = this.createElement('div', 'sdr-btn-group', tuneGroup);
            this.createButton('-1M', 'sdr-btn-xs', stepGroup, () => this.stepFrequency(-1.0), 'Down 1 MHz');
            this.createButton('-100k', 'sdr-btn-xs', stepGroup, () => this.stepFrequency(-0.1), 'Down 100 kHz');
            this.createButton('+100k', 'sdr-btn-xs', stepGroup, () => this.stepFrequency(0.1), 'Up 100 kHz');
            this.createButton('+1M', 'sdr-btn-xs', stepGroup, () => this.stepFrequency(1.0), 'Up 1 MHz');

            const displayGroup = this.createElement('div', 'sdr-group', controlsBar);

            if (this.isHtl()) {
                this.htlToggleButton = this.createButton('HTL Controls', '', displayGroup, () => {
                    this.showHtlPanel = !this.showHtlPanel;
                    this.refreshToggles();
                }, 'Toggle the HTL radio control panel');
            }

            this.autoDbButton = this.createButton('Auto dB', '', displayGroup, () => {
                this.autoDb = !this.autoDb;
                this.refreshToggles();
            }, 'Automatically scale dB floor and ceiling');

            this.pauseButton = this.createButton('Pause', '', displayGroup, () => {
                this.isPaused = !this.isPaused;
                this.refreshToggles();
            });

            this.waterfallButton = this.createButton('Waterfall', '', displayGroup, () => {
                this.showWaterfall = !this.showWaterfall;
                this.waterfallWrapper.style.display = this.showWaterfall ? 'block' : 'none';
                if (this.showWaterfall) {
                    this.onResize();
                }
                this.refreshToggles();
            });
        }

        // ---- HTL radio controls, replacing the receiver bar when the radio is an HTL one
        if (this.isHtl()) {
            this.buildHtlPanel(root);
        }

        // ---- receiver hardware controls
        if (this.showReceiverControls && !this.isHtl()) {
            const receiverBar = this.createElement('div', 'sdr-rx-controls', root);
            this.createElement('span', 'sdr-sublabel', receiverBar, 'RECEIVER:');

            const modeField = this.createElement('label', 'sdr-field', receiverBar);
            this.createElement('span', 'sdr-field-label', modeField, 'Mode');
            this.operatingModeSelect = this.createSelect(this.operatingModes, this.operatingMode, modeField,
                (value) => this.applyOperatingMode(value));

            this.autoGainButton = this.createButton('Auto Gain', '', receiverBar, () => this.toggleAutoGain());

            this.gainField = this.createElement('label', 'sdr-field sdr-field-inline', receiverBar);
            this.gainLabel = this.createElement('span', 'sdr-field-label', this.gainField, this.gain + ' dB');
            this.gainSlider = this.createElement('input', 'sdr-slider', this.gainField);
            this.gainSlider.setAttribute('type', 'range');
            this.gainSlider.setAttribute('min', '0');
            this.gainSlider.setAttribute('max', String(this.maxGain));
            this.gainSlider.setAttribute('step', '1');
            this.gainSlider.value = String(this.gain);
            this.gainSlider.addEventListener('input', () => {
                this.gain = Number(this.gainSlider.value);
                this.gainLabel.innerText = this.gain + ' dB';
            });
            this.gainSlider.addEventListener('change', () => this.applyGain());

            const audioField = this.createElement('label', 'sdr-field', receiverBar);
            this.createElement('span', 'sdr-field-label', audioField, 'Demod');
            this.audioModeSelect = this.createSelect(this.audioModes, this.audioMode, audioField,
                (value) => this.applyAudioMode(value));

            if (this.showAudioControls) {
                this.listenButton = this.createButton('Muted', '', receiverBar, () => this.toggleAudioListen(),
                    'Play the demodulated audio');

                this.volumeField = this.createElement('label', 'sdr-field sdr-field-inline', receiverBar);
                this.createElement('span', 'sdr-field-label', this.volumeField, 'Vol');
                this.volumeSlider = this.createElement('input', 'sdr-slider sdr-volume-slider', this.volumeField);
                this.volumeSlider.setAttribute('type', 'range');
                this.volumeSlider.setAttribute('min', '0');
                this.volumeSlider.setAttribute('max', '100');
                this.volumeSlider.setAttribute('step', '1');
                this.volumeSlider.value = String(this.volume);
                this.volumeSlider.addEventListener('input', () => this.setVolume(Number(this.volumeSlider.value)));

                this.recordButton = this.createButton('Record', '', receiverBar, () => this.toggleAudioRecording(),
                    'Record the demodulated audio on the receiver');
            }
        }

        // ---- spectrum canvas
        const spectrumWrapper = this.createElement('div', 'sdr-canvas-wrapper', root);
        const spectrumHeader = this.createElement('div', 'sdr-canvas-header', spectrumWrapper);
        this.createElement('span', 'sdr-canvas-title', spectrumHeader,
            'RF Spectrum Analyzer (Amplitude vs Frequency)');
        this.hoverReadout = this.createElement('span', 'sdr-hover-readout', spectrumHeader, '');
        this.spectrumCanvas = this.createElement('canvas', 'sdr-canvas', spectrumWrapper);
        this.spectrumCanvas.height = this.spectrumHeight;

        // ---- waterfall canvas
        this.waterfallWrapper = this.createElement('div', 'sdr-canvas-wrapper sdr-canvas-wrapper-waterfall', root);
        const waterfallHeader = this.createElement('div', 'sdr-canvas-header', this.waterfallWrapper);
        this.createElement('span', 'sdr-canvas-title', waterfallHeader,
            'Waterfall Spectrogram (History vs Frequency)');
        const legend = this.createElement('div', 'sdr-legend', waterfallHeader);
        this.minDbLabel = this.createElement('span', 'sdr-legend-label', legend, this.minDb + ' dB');
        this.createElement('div', 'sdr-legend-gradient', legend);
        this.maxDbLabel = this.createElement('span', 'sdr-legend-label', legend, this.maxDb + ' dB');
        this.waterfallCanvas = this.createElement('canvas', 'sdr-canvas', this.waterfallWrapper);
        this.waterfallCanvas.height = this.waterfallHeight;
        this.waterfallWrapper.style.display = this.showWaterfall ? 'block' : 'none';

        for (let canvas of [this.spectrumCanvas, this.waterfallCanvas]) {
            const isSpectrum = (canvas === this.spectrumCanvas);
            canvas.addEventListener('mousemove', (event) => this.onCanvasMouseMove(event, isSpectrum));
            canvas.addEventListener('mouseleave', () => this.onCanvasMouseLeave());
            canvas.addEventListener('click', (event) => this.onCanvasClick(event));
        }

        this.refreshToggles();
    }

    /**
     * Builds the HTL radio control panel: the spectrum sweep, the signal scout and its audio, the
     * 10 GbE DDC tuner and collector, and the unit actions.
     * @private
     */
    buildHtlPanel(root) {
        const panel = this.createElement('div', 'sdr-htl-panel', root);
        this.htlPanel = panel;

        // ---- panel header and unit actions
        const panelHeader = this.createElement('div', 'sdr-htl-header', panel);
        const titleGroup = this.createElement('div', 'sdr-group', panelHeader);
        this.createElement('span', 'sdr-htl-title', titleGroup, 'HTL RADIO CONTROLS');
        this.htlModeBadge = this.createElement('span', 'sdr-chip sdr-chip-' + this.connectionModeClass(),
            titleGroup, this.connectionModeLabel());

        const actionGroup = this.createElement('div', 'sdr-group', panelHeader);
        this.createButton('Refresh Status', 'sdr-btn-xs', actionGroup, () => this.applyHtlRefreshStatus(),
            'Publish the latest core unit status');
        this.createButton('Reset Unit', 'sdr-btn-xs sdr-btn-warning', actionGroup, () => this.resetHtlUnit(),
            'Reset the tuners and the collectors to their factory defaults');
        this.createButton('Reboot Radio', 'sdr-btn-xs sdr-btn-danger', actionGroup, () => this.rebootHtlUnit(),
            'Reboot the HTL radio unit');

        // ---- 1 GbE spectrum sweep
        this.htlSweepSection = this.createElement('div', 'sdr-htl-section', panel);
        const sweepHeader = this.createElement('div', 'sdr-htl-section-header', this.htlSweepSection);
        this.createElement('span', 'sdr-htl-section-title', sweepHeader, 'SPECTRUM SCANNER CONFIGURATION');
        this.htlSweepNotice = this.createElement('span', 'sdr-htl-notice', sweepHeader, '(Requires a 1 GbE connection)');

        const sweepRow = this.createElement('div', 'sdr-group', this.htlSweepSection);
        this.htlStartInput = this.createNumberField('Start (MHz)', this.htlStartFrequencyHz / 1e6, 1, sweepRow,
            (value) => this.htlStartFrequencyHz = value * 1e6, '110px');
        this.htlStopInput = this.createNumberField('Stop (MHz)', this.htlStopFrequencyHz / 1e6, 1, sweepRow,
            (value) => this.htlStopFrequencyHz = value * 1e6, '110px');
        this.createSelectField('FFT Bins', [512, 1024, 2048, 4096, 8192], this.htlNumPoints, sweepRow,
            (value) => this.htlNumPoints = Number(value));
        this.createSelectField('Rate (Hz)', [1, 2, 5, 10, 15, 20, 25, 30], this.htlUpdateRate, sweepRow,
            (value) => this.htlUpdateRate = Number(value));
        this.createButton('Apply Sweep', 'sdr-btn-primary', sweepRow, () => this.applyHtlSpectrumConfig());

        // ---- 1 GbE signal scout and demodulated audio
        this.htlScoutSection = this.createElement('div', 'sdr-htl-section', panel);
        const scoutHeader = this.createElement('div', 'sdr-htl-section-header', this.htlScoutSection);
        const scoutTitleGroup = this.createElement('div', 'sdr-group', scoutHeader);
        this.createElement('span', 'sdr-htl-section-title', scoutTitleGroup, 'SIGNAL SCOUT & AUDIO DEMODULATION');
        this.audioFormatBadge = this.createElement('span', 'sdr-chip sdr-chip-success', scoutTitleGroup, '');
        this.recordingBadge = this.createElement('span', 'sdr-chip sdr-chip-danger', scoutTitleGroup, '');
        this.htlScoutNotice = this.createElement('span', 'sdr-htl-notice', scoutHeader, '(Requires a 1 GbE connection)');

        const scoutRow = this.createElement('div', 'sdr-group', this.htlScoutSection);
        this.createSelectField('Scout ID', [0, 1, 2, 3], this.htlScoutId, scoutRow,
            (value) => this.htlScoutId = Number(value));
        this.htlScoutInput = this.createNumberField('Scout Freq (MHz)', this.htlScoutFrequencyHz / 1e6, 0.025,
            scoutRow, (value) => this.htlScoutFrequencyHz = value * 1e6, '120px');
        this.createButton('Set Peak', 'sdr-btn-xs', scoutRow, () => this.setScoutToPeak(),
            'Set the scout frequency to the detected peak frequency');
        this.htlDemodSelect = this.createSelectField('Demod', this.htlDemodModes, this.htlDemodMode, scoutRow,
            (value) => this.htlDemodMode = value);
        this.squelchSlider = this.createSliderField('SQL', this.squelch, -120, 0, 1, 'dB', scoutRow,
            (value) => this.squelch = value);
        this.volumeSlider = this.createSliderField('VOL', this.volume, 0, 100, 5, '%', scoutRow,
            (value) => this.setVolume(value));
        this.listenButton = this.createButton('Listen', '', scoutRow, () => this.toggleAudioListen(),
            'Play the demodulated audio in the browser');
        this.recordButton = this.createButton('Record', '', scoutRow, () => this.toggleAudioRecording(),
            'Record the scout audio to a file on the driver');
        this.createButton('Apply Scout', 'sdr-btn-primary', scoutRow, () => this.applyHtlScout());

        // ---- live audio level meter
        this.audioMeterRow = this.createElement('div', 'sdr-audio-meter', this.htlScoutSection);
        this.createElement('span', 'sdr-field-label', this.audioMeterRow, 'Audio Level');
        const meterTrack = this.createElement('div', 'sdr-audio-meter-track', this.audioMeterRow);
        this.audioMeterBar = this.createElement('div', 'sdr-audio-meter-bar', meterTrack);
        this.audioLevelLabel = this.createElement('span', 'sdr-slider-value', this.audioMeterRow, '--- dBFS');
        this.audioGateBadge = this.createElement('span', 'sdr-chip sdr-chip-muted', this.audioMeterRow, 'SQUELCHED');

        // ---- 10 GbE DDC tuner and collector
        this.htlDdcSection = this.createElement('div', 'sdr-htl-section', panel);
        const ddcHeader = this.createElement('div', 'sdr-htl-section-header', this.htlDdcSection);
        this.createElement('span', 'sdr-htl-section-title', ddcHeader, '10 GbE DDC TUNER & COLLECTOR TASKING');
        this.htlDdcNotice = this.createElement('span', 'sdr-htl-notice', ddcHeader, '(Requires a 10 GbE connection)');

        const tunerRow = this.createElement('div', 'sdr-group', this.htlDdcSection);
        this.createSelectField('Tuner', [0, 1], this.htlTunerId, tunerRow,
            (value) => this.htlTunerId = Number(value));
        this.createSelectField('Tune Mode', ['AutoTune', 'ManualTune'], this.htlTunerMode, tunerRow,
            (value) => this.htlTunerMode = value);
        this.htlTunerInput = this.createNumberField('Tuner (MHz)', this.htlTunerFrequencyHz / 1e6, 0.1, tunerRow,
            (value) => this.htlTunerFrequencyHz = value * 1e6, '110px');
        this.createSelectField('Tx/Rx', ['Rx', 'Tx', 'FullDuplex'], this.htlTxRxMode, tunerRow,
            (value) => this.htlTxRxMode = value);
        this.createCheckbox('AGC', this.htlTunerAgc, tunerRow, (checked) => this.htlTunerAgc = checked);
        this.createCheckbox('Preamp', this.htlTunerPreamp, tunerRow, (checked) => this.htlTunerPreamp = checked);
        this.createButton('Apply Tuner', 'sdr-btn-primary', tunerRow, () => this.applyHtlTuner());

        const collectorRow = this.createElement('div', 'sdr-group', this.htlDdcSection);
        this.createSelectField('IQ Slot', ['iq0', 'iq1'], this.htlCollectorSlot, collectorRow,
            (value) => this.htlCollectorSlot = value);
        this.createSelectField('BW (MHz)', [0.5, 1.0, 2.0, 5.0, 10.0, 20.0], this.htlCollectorBandwidthHz / 1e6,
            collectorRow, (value) => this.htlCollectorBandwidthHz = Number(value) * 1e6);
        this.createButton('Start Collect', 'sdr-btn-success', collectorRow, () => this.applyHtlCollectorStart());
        this.createButton('Stop', 'sdr-btn-danger', collectorRow, () => this.applyHtlCollectorStop());
        this.createButton('Halt All', 'sdr-btn-warning', collectorRow, () => this.applyHtlHalt());

        // ---- format service
        const serviceRow = this.createElement('div', 'sdr-group sdr-htl-footer', panel);
        this.createSelectField('Format Service', ['DDC', 'HSTA'], this.htlServiceName, serviceRow,
            (value) => this.htlServiceName = value);
        this.createButton('Start Service', 'sdr-btn-xs', serviceRow, () => this.applyHtlStartService());
    }

    /**
     * Updates the active state of the toggle buttons.
     * @private
     */
    refreshToggles() {
        if (isDefined(this.autoDbButton)) {
            this.autoDbButton.classList.toggle('sdr-btn-active', this.autoDb);
            this.pauseButton.innerText = this.isPaused ? 'Resume' : 'Pause';
            this.pauseButton.classList.toggle('sdr-btn-warning', this.isPaused);
            this.waterfallButton.classList.toggle('sdr-btn-active', this.showWaterfall);
        }
        if (isDefined(this.autoGainButton)) {
            this.autoGainButton.classList.toggle('sdr-btn-active', this.autoGain);
            this.gainField.style.display = this.autoGain ? 'none' : 'inline-flex';
        }
        if (isDefined(this.listenButton)) {
            this.listenButton.classList.toggle('sdr-btn-success', this.isListening);
            this.recordButton.classList.toggle('sdr-btn-danger', this.isRecordingAudio);
            if (this.isHtl()) {
                this.listenButton.innerText = this.isListening ? 'Listening' : 'Listen';
                this.recordButton.innerText = this.isRecordingAudio ? 'Stop Rec' : 'Record';
            } else {
                this.listenButton.innerText = this.isListening ? 'Listen' : 'Muted';
                this.recordButton.innerText = this.isRecordingAudio ? 'Recording' : 'Record';
                // outside the HTL panel the volume only shows while something is playing
                this.volumeField.style.display = this.isListening ? 'inline-flex' : 'none';
            }
        }
        if (isDefined(this.htlPanel)) {
            this.htlToggleButton.classList.toggle('sdr-btn-active', this.showHtlPanel);
            this.htlPanel.style.display = this.showHtlPanel ? 'block' : 'none';

            // each connection only offers part of the radio, the rest is dimmed out
            const is1Gbe = this.is1GbeCapable();
            const is10Gbe = this.is10GbeCapable();
            this.htlSweepSection.classList.toggle('sdr-htl-section-disabled', !is1Gbe);
            this.htlScoutSection.classList.toggle('sdr-htl-section-disabled', !is1Gbe);
            this.htlDdcSection.classList.toggle('sdr-htl-section-disabled', !is10Gbe);
            this.htlSweepNotice.style.display = is1Gbe ? 'none' : 'inline';
            this.htlScoutNotice.style.display = is1Gbe ? 'none' : 'inline';
            this.htlDdcNotice.style.display = is10Gbe ? 'none' : 'inline';

            this.audioFormatBadge.style.display = this.isAudioConnected ? 'inline-block' : 'none';
            this.audioFormatBadge.innerText = 'AUDIO: ' + Math.round(this.audioSampleRate / 1000) + ' kHz '
                + (this.audioChannels === 1 ? 'Mono' : 'Stereo');
            this.recordingBadge.style.display = this.isRecordingAudio ? 'inline-block' : 'none';
            this.recordingBadge.innerText = '● REC ' + formatDuration(this.recordingDurationSec);
            this.audioMeterRow.style.display = this.isAudioConnected ? 'flex' : 'none';
        }
    }

    /**
     * Refreshes the audio level meter from the last measured audio level.
     * @private
     */
    refreshAudioMeter() {
        if (!isDefined(this.audioMeterBar)) {
            return;
        }
        const gateOpen = this.audioLevelDb >= this.squelch;
        // -100 dBFS reads empty, 0 dBFS reads full
        this.audioMeterBar.style.width = Math.max(0, Math.min(100, (this.audioLevelDb + 100) * 1.25)) + '%';
        this.audioMeterBar.classList.toggle('sdr-audio-meter-open', gateOpen);
        this.audioLevelLabel.innerText = this.audioLevelDb + ' dBFS';
        this.audioGateBadge.innerText = gateOpen ? 'GATE OPEN' : 'SQUELCHED';
        this.audioGateBadge.setAttribute('class', 'sdr-chip ' + (gateOpen ? 'sdr-chip-success' : 'sdr-chip-muted'));
    }

    /**
     * @return {Boolean} whether the receiver takes the HTL radio command set
     */
    isHtl() {
        return this.receiverType === 'htl';
    }

    /**
     * @return {Boolean} whether the connection offers the spectrum sweep and the signal scouts
     */
    is1GbeCapable() {
        return this.connectionMode === '1GbE' || this.connectionMode === 'BOTH'
            || this.connectionMode === 'UNKNOWN';
    }

    /**
     * @return {Boolean} whether the connection offers the DDC tuners and collectors
     */
    is10GbeCapable() {
        return this.connectionMode === '10GbE' || this.connectionMode === 'BOTH';
    }

    /**
     * @return {String} the human readable label of the current HTL connection
     */
    connectionModeLabel() {
        const label = HTL_CONNECTION_MODE_LABELS[this.connectionMode];
        return isDefined(label) ? label : HTL_CONNECTION_MODE_LABELS.UNKNOWN;
    }

    /**
     * @private
     * @return {String} the chip modifier coloring the connection badge
     */
    connectionModeClass() {
        if (this.connectionMode === '1GbE') return 'success';
        if (this.connectionMode === '10GbE') return 'purple';
        if (this.connectionMode === 'BOTH') return 'cyan';
        return 'muted';
    }

    /**
     * Sets the HTL connection, which gates the controls the panel offers.
     * @param {String} mode - '1GbE', '10GbE', 'BOTH' or 'UNKNOWN'
     */
    setConnectionMode(mode) {
        if (this.connectionMode === mode) {
            return;
        }
        this.connectionMode = mode;
        const label = this.connectionModeLabel();
        const className = 'sdr-chip sdr-chip-' + this.connectionModeClass();
        if (isDefined(this.connectionBadge)) {
            this.connectionBadge.innerText = label;
            this.connectionBadge.setAttribute('class', className);
        }
        if (isDefined(this.htlModeBadge)) {
            this.htlModeBadge.innerText = label;
            this.htlModeBadge.setAttribute('class', className);
        }
        this.refreshToggles();
    }

    /**
     * Refreshes the status bar readouts, skipping the untouched ones.
     * @private
     */
    refreshReadouts() {
        const values = {
            status: this.isPaused ? 'PAUSED' : (this.isLive ? 'LIVE' : 'CONNECTING'),
            pulse: this.isPaused ? 'paused' : (this.isLive ? 'live' : 'waiting'),
            frequency: (this.centerFrequencyHz / 1e6).toFixed(3) + ' MHz',
            span: 'Span: ' + (this.sampleRateHz / 1e6).toFixed(2) + ' MHz',
            mode: isDefined(this.operatingMode) ? this.operatingMode.replace('_', ' ') : '',
            peak: 'Peak: ' + this.peakFrequencyMhz + ' MHz (' + this.peakDb + ' dB)',
            fps: this.fps + ' fps',
            minDb: this.minDb + ' dB',
            maxDb: this.maxDb + ' dB'
        };

        if (values.status !== this.readouts.status) {
            this.statusElement.innerText = values.status;
            this.pulseElement.setAttribute('class', 'sdr-pulse ' + values.pulse);
        }
        if (values.frequency !== this.readouts.frequency) {
            this.frequencyBadge.innerText = values.frequency;
        }
        if (values.span !== this.readouts.span) {
            this.spanBadge.innerText = values.span;
        }
        if (values.mode !== this.readouts.mode) {
            this.modeBadge.innerText = values.mode;
            this.modeBadge.style.display = values.mode === '' ? 'none' : 'inline-block';
        }
        if (values.peak !== this.readouts.peak) {
            this.peakBadge.innerText = values.peak;
        }
        if (values.fps !== this.readouts.fps) {
            this.fpsBadge.innerText = values.fps;
        }
        if (values.minDb !== this.readouts.minDb) {
            this.minDbLabel.innerText = values.minDb;
        }
        if (values.maxDb !== this.readouts.maxDb) {
            this.maxDbLabel.innerText = values.maxDb;
        }

        this.readouts = values;
    }

    // ------------------------------------------------------------------ palette

    /**
     * Builds the 256 RGB entries lookup table used to color the waterfall.
     * @param {String} scheme - 'heat', 'viridis', 'jet' or 'cool'
     */
    initPalette(scheme) {
        for (let i = 0; i < 256; i++) {
            const norm = i / 255.0;
            let r = 0;
            let g = 0;
            let b = 0;

            if (scheme === 'viridis') {
                r = Math.floor(255 * (0.28 + 0.72 * norm * norm));
                g = Math.floor(255 * (0.05 + 0.95 * Math.sin(norm * Math.PI * 0.9)));
                b = Math.floor(255 * (0.45 + 0.55 * (1.0 - norm)));
            } else if (scheme === 'jet') {
                const fourVal = 4 * norm;
                r = Math.min(255, Math.max(0, Math.floor(255 * (1.5 - Math.abs(fourVal - 3)))));
                g = Math.min(255, Math.max(0, Math.floor(255 * (1.5 - Math.abs(fourVal - 2)))));
                b = Math.min(255, Math.max(0, Math.floor(255 * (1.5 - Math.abs(fourVal - 1)))));
            } else if (scheme === 'cool') {
                r = Math.floor(255 * norm);
                g = Math.floor(255 * (1.0 - norm));
                b = 255;
            } else {
                // standard RF heat: navy -> blue -> cyan -> green -> yellow -> orange -> red -> white
                if (norm < 0.15) {
                    const t = norm / 0.15;
                    r = Math.floor(10 * t);
                    g = Math.floor(15 * t);
                    b = Math.floor(40 + 120 * t);
                } else if (norm < 0.35) {
                    const t = (norm - 0.15) / 0.2;
                    r = Math.floor(10 + 20 * t);
                    g = Math.floor(15 + 185 * t);
                    b = Math.floor(160 + 95 * t);
                } else if (norm < 0.55) {
                    const t = (norm - 0.35) / 0.2;
                    r = Math.floor(30 + 30 * t);
                    g = Math.floor(200 + 40 * t);
                    b = Math.floor(255 * (1.0 - t));
                } else if (norm < 0.75) {
                    const t = (norm - 0.55) / 0.2;
                    r = Math.floor(60 + 195 * t);
                    g = Math.floor(240 + 15 * t);
                    b = 0;
                } else if (norm < 0.9) {
                    const t = (norm - 0.75) / 0.15;
                    r = 255;
                    g = Math.floor(255 * (1.0 - 0.7 * t));
                    b = 0;
                } else {
                    const t = (norm - 0.9) / 0.1;
                    r = 255;
                    g = Math.floor(76 + 179 * t);
                    b = Math.floor(255 * t);
                }
            }

            this.paletteRgb[i * 3] = Math.min(255, Math.max(0, r));
            this.paletteRgb[i * 3 + 1] = Math.min(255, Math.max(0, g));
            this.paletteRgb[i * 3 + 2] = Math.min(255, Math.max(0, b));
        }
    }

    /**
     * Changes the waterfall color palette.
     * @param {String} scheme - 'heat', 'viridis', 'jet' or 'cool'
     */
    setColorPalette(scheme) {
        this.colorPalette = scheme;
        this.initPalette(scheme);
    }

    // ------------------------------------------------------------------ data

    async setData(dataSourceId, data) {
        if (data.type !== 'sdr' || !isDefined(this.spectrumCanvas)) {
            return;
        }
        for (let props of data.values) {
            this.updateSpectrum(props);
        }
    }

    /**
     * Updates the frequency plan, the receiver settings and the spectrum buffers from one record.
     * @param {Object} props - the SdrLayer properties
     */
    updateSpectrum(props) {
        if (this.isPaused || !isDefined(props)) {
            return;
        }

        // 0) demodulated audio carried by the observation itself
        if (isDefined(props.audio)) {
            if (isDefined(props.scoutId)) {
                this.htlScoutId = props.scoutId;
            }
            this.handleAudioObservation(props.audio, props.audioSampleRate, props.audioChannels);

            // a record only carrying audio holds no frequency plan of its own: its sample rate is
            // the audio one, not the span, so it must not reach the spectrum below
            if (!isDefined(props.amplitude)) {
                return;
            }
        }

        // 1) receiver settings
        if (isDefined(props.operatingMode)) {
            this.operatingMode = props.operatingMode;
            if (isDefined(this.operatingModeSelect)) {
                this.operatingModeSelect.value = this.operatingMode;
            }
        }
        if (isDefined(props.gain)) {
            this.gain = props.gain;
            if (isDefined(this.gainSlider) && document.activeElement !== this.gainSlider) {
                this.gainSlider.value = String(this.gain);
                this.gainLabel.innerText = this.gain + ' dB';
            }
        }
        if (isDefined(props.autoGain) && props.autoGain !== this.autoGain) {
            this.autoGain = props.autoGain;
            this.refreshToggles();
        }
        if (isDefined(props.audioMode)) {
            this.audioMode = props.audioMode;
            if (isDefined(this.audioModeSelect)) {
                this.audioModeSelect.value = this.audioMode;
            }
        }
        if (isDefined(props.recordingAudio) && props.recordingAudio !== this.isRecordingAudio) {
            this.isRecordingAudio = props.recordingAudio;
            this.refreshToggles();
        }

        // 2) frequency plan
        // a start and a stop frequency describe a swept band (e.g. a wideband sweep) rather than a
        // receiver tuned to a center frequency: they then drive both the span and the center
        const bandStartHz = props.startFrequency;
        const bandStopHz = props.stopFrequency;
        this.hasStartStop = isDefined(bandStartHz) && isDefined(bandStopHz)
            && bandStartHz > 0 && bandStopHz > bandStartHz;

        if (this.hasStartStop) {
            const bandSpan = bandStopHz - bandStartHz;
            const bandCenter = (bandStartHz + bandStopHz) / 2.0;
            this.sampleRateHz = Math.round(bandSpan);
            this.centerFrequencyHz = Math.round(bandCenter);
            // only recenter the tuning when it still is the initial one or sits outside the band
            if (this.tuneMhzIsDefault || Math.abs(this.tuneMhz * 1e6 - bandCenter) > bandSpan / 2.0) {
                this.setTuneMhz(bandCenter / 1e6);
            }
            // the sweep inputs follow the band actually reported, until the user sets them himself
            if (this.htlSweepIsDefault) {
                this.setHtlSweepRange(bandStartHz, bandStopHz);
                this.htlSweepIsDefault = true;
            }
            // only the 1 GbE connection sweeps a band, so it identifies itself by doing so
            if (this.isHtl() && this.connectionMode === 'UNKNOWN') {
                this.setConnectionMode('1GbE');
            }
        }

        // inside a swept band the reported center frequency is only kept when it falls in the band
        if (isDefined(props.centerFrequency)
            && (!this.hasStartStop
                || (props.centerFrequency > bandStartHz && props.centerFrequency < bandStopHz))) {
            this.setCenterFrequency(props.centerFrequency);
        }
        if (isDefined(props.sampleRate)) {
            this.sampleRateHz = props.sampleRate;
        }

        // the explicit frequency axis calibrates the span and the center when they are not reported
        const frequencyAxis = props.frequencyAxis;
        if (isDefined(frequencyAxis) && frequencyAxis.length >= 2) {
            const span = Math.abs(frequencyAxis[frequencyAxis.length - 1] - frequencyAxis[0]);
            if (span > 0 && !this.hasStartStop && !isDefined(props.sampleRate)) {
                this.sampleRateHz = Math.round(span);
            }
            if (!this.hasStartStop && !isDefined(props.centerFrequency)) {
                this.setCenterFrequency(Math.round((frequencyAxis[0] + frequencyAxis[frequencyAxis.length - 1]) / 2.0));
            }
        }

        // 3) spectrum amplitude bins
        const bins = props.amplitude;
        if (!isDefined(bins) || bins.length === 0) {
            return;
        }

        const count = bins.length;
        this.numBins = count;
        this.isLive = true;
        this.frameCounter++;

        const now = Date.now();
        if (now - this.lastFpsTime >= 1000) {
            this.fps = this.frameCounter;
            this.frameCounter = 0;
            this.lastFpsTime = now;
        }

        if (this.smoothedBins === null || this.smoothedBins.length !== count) {
            this.smoothedBins = new Float32Array(count);
            this.peakHoldBins = new Float32Array(count);
            for (let i = 0; i < count; i++) {
                const value = Number(bins[i]) || -100.0;
                this.smoothedBins[i] = value;
                this.peakHoldBins[i] = value;
            }
        }

        // exponential smoothing and peak hold
        const alpha = 1.0 / Math.max(1, this.averaging);
        let maxPower = -999;
        let minPower = 999;
        let maxBinIndex = 0;

        for (let i = 0; i < count; i++) {
            const value = Number(bins[i]);
            const cleanValue = (isNaN(value) || !isFinite(value)) ? -100.0 : value;

            this.smoothedBins[i] = (1.0 - alpha) * this.smoothedBins[i] + alpha * cleanValue;

            if (cleanValue > this.peakHoldBins[i]) {
                this.peakHoldBins[i] = cleanValue;
            } else {
                this.peakHoldBins[i] -= this.peakHoldDecay;
            }

            if (cleanValue > maxPower) {
                maxPower = cleanValue;
                maxBinIndex = i;
            }
            if (cleanValue < minPower) {
                minPower = cleanValue;
            }
        }

        // peak frequency readout
        const startFrequencyHz = this.centerFrequencyHz - this.sampleRateHz / 2.0;
        const binWidthHz = this.sampleRateHz / count;
        this.peakFrequencyMhz = ((startFrequencyHz + maxBinIndex * binWidthHz) / 1e6).toFixed(3);
        this.peakDb = maxPower.toFixed(1);

        // auto dB floor/ceiling tracking
        if (this.autoDb && minPower < 500 && maxPower > -500 && minPower <= maxPower) {
            const targetMin = Math.max(-140, Math.min(-30, Math.floor(minPower - 6)));
            const targetMax = Math.max(targetMin + 15, Math.min(10, Math.ceil(maxPower + 10)));
            this.minDb = Math.round(0.85 * this.minDb + 0.15 * targetMin);
            this.maxDb = Math.round(0.85 * this.maxDb + 0.15 * targetMax);
            if (this.maxDb <= this.minDb) {
                this.maxDb = this.minDb + 20;
            }
        }

        if (this.showWaterfall) {
            this.renderWaterfallRow(this.smoothedBins);
        }
    }

    /**
     * Sets the current center frequency and syncs the tuning input.
     * @param {Number} frequencyHz - the center frequency (Hz)
     */
    setCenterFrequency(frequencyHz) {
        this.centerFrequencyHz = frequencyHz;
        this.setTuneMhz(frequencyHz / 1e6);
    }

    /**
     * Sets the tuned frequency and refreshes the tuning input, leaving it alone while the user
     * is typing in it.
     * @private
     * @param {Number} mhz - the tuned frequency (MHz)
     */
    setTuneMhz(mhz) {
        this.tuneMhz = parseFloat(mhz.toFixed(4));
        this.tuneMhzIsDefault = false;
        if (isDefined(this.tuneInput) && !this.isEditingTuneInput) {
            this.tuneInput.value = formatFrequencyMhz(this.tuneMhz);
        }
    }

    // ------------------------------------------------------------------ rendering

    /**
     * Starts the render loop drawing the spectrum at the display refresh rate.
     * @private
     */
    startRenderLoop() {
        const loop = () => {
            if (!isDefined(this.spectrumCanvas)) {
                return;
            }
            this.renderSpectrum();
            this.refreshReadouts();
            this.animationFrameId = requestAnimationFrame(loop);
        };
        this.animationFrameId = requestAnimationFrame(loop);
    }

    /**
     * Draws the spectrum analyzer: grids, center marker, peak hold trace and spectrum trace.
     */
    renderSpectrum() {
        const canvas = this.spectrumCanvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        if (w <= 0 || h <= 0) return;

        ctx.fillStyle = '#06090e';
        ctx.fillRect(0, 0, w, h);

        const min = this.minDb;
        const max = this.maxDb;
        const dbRange = Math.max(1, max - min);

        // the plot area, the band below it carrying the frequency axis
        const plotTop = PLOT_TOP;
        const plotBottom = h - PLOT_BOTTOM_MARGIN;
        const plotHeight = Math.max(1, plotBottom - plotTop);

        // dBFS horizontal grid lines
        ctx.strokeStyle = '#172033';
        ctx.lineWidth = 1;
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = '#94a3b8';

        const stepDb = dbRange <= 40 ? 10 : dbRange <= 80 ? 20 : 30;
        const startDb = Math.ceil(min / stepDb) * stepDb;
        for (let db = startDb; db <= max; db += stepDb) {
            const y = plotBottom - ((db - min) / dbRange) * plotHeight;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
            ctx.fillText(`${db} dB`, 6, y - 3);
        }

        // frequency vertical grid lines
        const spanHz = this.sampleRateHz;
        const startFrequencyHz = this.centerFrequencyHz - spanHz / 2.0;
        const numDivs = 8;
        for (let f = 0; f <= numDivs; f++) {
            const x = (f / numDivs) * w;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, plotBottom);
            ctx.stroke();
        }

        // frequency axis baseline
        ctx.strokeStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(0, plotBottom);
        ctx.lineTo(w, plotBottom);
        ctx.stroke();

        // frequency axis ticks, the unit being carried by the axis label below them
        for (let f = 0; f <= numDivs; f++) {
            const x = (f / numDivs) * w;
            const frequencyAtX = (startFrequencyHz + (f / numDivs) * spanHz) / 1e6;
            ctx.textAlign = f === 0 ? 'left' : (f === numDivs ? 'right' : 'center');
            const labelX = f === 0 ? 4 : (f === numDivs ? w - 4 : x);
            ctx.fillText(frequencyAtX.toFixed(3), labelX, plotBottom + 13);
        }

        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'center';
        ctx.fillText('MHz', w / 2.0, h - 3);
        ctx.textAlign = 'left';

        // center frequency marker
        ctx.save();
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(w / 2.0, 0);
        ctx.lineTo(w / 2.0, plotBottom);
        ctx.stroke();
        ctx.restore();

        // tuned frequency marker, drawn when the tuning sits inside the span but off its center
        const tunedHz = this.tuneMhz * 1e6;
        if (tunedHz >= startFrequencyHz && tunedHz <= startFrequencyHz + spanHz
            && Math.abs(tunedHz - this.centerFrequencyHz) > 100) {
            const tunedX = ((tunedHz - startFrequencyHz) / spanHz) * w;
            ctx.save();
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            ctx.moveTo(tunedX, 0);
            ctx.lineTo(tunedX, plotBottom);
            ctx.stroke();
            ctx.fillStyle = '#f43f5e';
            ctx.font = 'bold 9px monospace';
            ctx.fillText(this.tuneMhz.toFixed(3), Math.min(Math.max(tunedX + 4, 4), w - 65), 14);
            ctx.restore();
        }

        if (this.smoothedBins === null || this.smoothedBins.length < 2) {
            ctx.fillStyle = '#64748b';
            ctx.font = '13px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Awaiting SDR RF spectrum data...', w / 2, (plotTop + plotBottom) / 2);
            ctx.textAlign = 'left';
            return;
        }

        const bins = this.smoothedBins;
        const count = bins.length;
        const denom = count - 1;

        // peak hold trace
        if (this.peakHold && this.peakHoldBins !== null) {
            ctx.beginPath();
            for (let i = 0; i < count; i++) {
                const x = (i / denom) * w;
                const value = Math.max(min, Math.min(max, this.peakHoldBins[i]));
                const y = plotBottom - ((value - min) / dbRange) * plotHeight;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
            ctx.lineWidth = 1.0;
            ctx.stroke();
        }

        // spectrum fill polygon
        ctx.beginPath();
        ctx.moveTo(0, plotBottom);
        for (let i = 0; i < count; i++) {
            const x = (i / denom) * w;
            const value = Math.max(min, Math.min(max, bins[i]));
            const y = plotBottom - ((value - min) / dbRange) * plotHeight;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(w, plotBottom);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, plotTop, 0, plotBottom);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
        gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.15)');
        gradient.addColorStop(1, 'rgba(14, 165, 233, 0.0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // spectrum trace
        ctx.save();
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
            const x = (i / denom) * w;
            const value = Math.max(min, Math.min(max, bins[i]));
            const y = plotBottom - ((value - min) / dbRange) * plotHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#00f5d4';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();

        // hover crosshair, kept out of the frequency axis band
        if (this.tooltipVisible && this.tooltipX >= 0 && this.tooltipY >= 0 && this.tooltipY <= plotBottom) {
            ctx.save();
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
            ctx.setLineDash([2, 3]);
            ctx.beginPath();
            ctx.moveTo(this.tooltipX, 0);
            ctx.lineTo(this.tooltipX, plotBottom);
            ctx.moveTo(0, this.tooltipY);
            ctx.lineTo(w, this.tooltipY);
            ctx.stroke();
            ctx.restore();
        }
    }

    /**
     * Scrolls the waterfall down and draws the given spectrum frame as its new top row.
     * @param {Float32Array} bins - the spectrum amplitude bins
     */
    renderWaterfallRow(bins) {
        const canvas = this.waterfallCanvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        if (w <= 0 || h <= 0) return;

        const speed = this.waterfallSpeed;
        ctx.drawImage(canvas, 0, 0, w, h - speed, 0, speed, w, h - speed);

        if (this.rowCanvas === null) {
            this.rowCanvas = document.createElement('canvas');
        }
        if (this.rowCanvas.width !== w) {
            this.rowCanvas.width = w;
            this.rowCanvas.height = 1;
            this.rowCtx = this.rowCanvas.getContext('2d');
        }
        if (!this.rowCtx) return;

        const rowImageData = this.rowCtx.createImageData(w, 1);
        const data = rowImageData.data;
        const min = this.minDb;
        const range = Math.max(1, this.maxDb - min);
        const count = bins.length;

        for (let x = 0; x < w; x++) {
            const binIndex = Math.floor((x / w) * count);
            let norm = (bins[binIndex] - min) / range;
            if (norm < 0) norm = 0;
            if (norm > 1) norm = 1;

            const paletteIndex = Math.floor(norm * 255) * 3;
            const dataIndex = x * 4;

            data[dataIndex] = this.paletteRgb[paletteIndex];
            data[dataIndex + 1] = this.paletteRgb[paletteIndex + 1];
            data[dataIndex + 2] = this.paletteRgb[paletteIndex + 2];
            data[dataIndex + 3] = 255;
        }

        this.rowCtx.putImageData(rowImageData, 0, 0);
        ctx.drawImage(this.rowCanvas, 0, 0, w, 1, 0, 0, w, speed);
    }

    /**
     * Fills the waterfall with the background color.
     * @private
     */
    clearWaterfall() {
        if (!isDefined(this.waterfallCanvas)) return;
        const ctx = this.waterfallCanvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = '#06090e';
        ctx.fillRect(0, 0, this.waterfallCanvas.width, this.waterfallCanvas.height);
    }

    onResize() {
        if (!isDefined(this.spectrumCanvas)) {
            return;
        }

        const width = Math.max(300, Math.floor(this.spectrumCanvas.clientWidth) || 600);

        if (this.spectrumCanvas.width !== width) {
            this.spectrumCanvas.width = width;
        }

        if (this.waterfallCanvas.width !== width) {
            // keep the spectrogram history across the resize
            let previousCanvas = null;
            if (this.waterfallCanvas.width > 0 && this.waterfallCanvas.height > 0) {
                previousCanvas = document.createElement('canvas');
                previousCanvas.width = this.waterfallCanvas.width;
                previousCanvas.height = this.waterfallCanvas.height;
                const previousCtx = previousCanvas.getContext('2d');
                if (previousCtx) {
                    previousCtx.drawImage(this.waterfallCanvas, 0, 0);
                }
            }

            this.waterfallCanvas.width = width;
            const ctx = this.waterfallCanvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#06090e';
                ctx.fillRect(0, 0, width, this.waterfallCanvas.height);
                if (previousCanvas !== null) {
                    ctx.drawImage(previousCanvas, 0, 0, width, this.waterfallCanvas.height);
                }
            }
        }
    }

    // ------------------------------------------------------------------ interactions

    /**
     * Holds the tuning input against the datastream feedback while the user types in it.
     * @private
     */
    onTuneFocus() {
        this.isEditingTuneInput = true;
    }

    /**
     * Tunes to the frequency typed in the tuning input, then puts it back under the control of the
     * datastream.
     * @private
     */
    applyTuneInput() {
        const value = parseFloat(this.tuneInput.value);
        this.isEditingTuneInput = false;
        if (!isNaN(value) && value > 0) {
            this.tuneToMhz(value);
        }
        this.tuneInput.value = formatFrequencyMhz(this.tuneMhz);
    }

    onCanvasMouseMove(event, isSpectrum) {
        const canvas = isSpectrum ? this.spectrumCanvas : this.waterfallCanvas;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.tooltipVisible = isSpectrum;
        this.tooltipX = x;
        this.tooltipY = y;

        const spanHz = this.sampleRateHz;
        const startHz = this.centerFrequencyHz - spanHz / 2.0;
        const mhz = ((startHz + (x / rect.width) * spanHz) / 1e6).toFixed(4);

        if (isSpectrum) {
            // the amplitude is only read off the plot area, the band below it being the frequency axis
            const plotBottom = rect.height - PLOT_BOTTOM_MARGIN;
            const plotHeight = Math.max(1, plotBottom - PLOT_TOP);
            const clampedY = Math.max(PLOT_TOP, Math.min(plotBottom, y));
            const dbRange = Math.max(1, this.maxDb - this.minDb);
            const dbAtY = this.maxDb - ((clampedY - PLOT_TOP) / plotHeight) * dbRange;
            this.hoverReadout.innerText = `${mhz} MHz | ${dbAtY.toFixed(1)} dBFS`;
        } else {
            this.hoverReadout.innerText = `${mhz} MHz`;
        }
    }

    onCanvasMouseLeave() {
        this.tooltipVisible = false;
        this.hoverReadout.innerText = '';
    }

    onCanvasClick(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const spanHz = this.sampleRateHz;
        const startHz = this.centerFrequencyHz - spanHz / 2.0;
        this.tuneToMhz(parseFloat(((startHz + (x / rect.width) * spanHz) / 1e6).toFixed(4)));
    }

    // ------------------------------------------------------------------ receiver commands

    /**
     * Tunes the receiver to the given center frequency.
     * @param {Number} targetMhz - the center frequency (MHz)
     */
    tuneToMhz(targetMhz) {
        const value = typeof targetMhz === 'number' ? targetMhz : parseFloat(String(targetMhz));
        if (isNaN(value) || value <= 0) {
            return;
        }

        this.setTuneMhz(value);
        // a swept band keeps its own center, the tuning only moving the marker inside it
        if (!this.hasStartStop) {
            this.centerFrequencyHz = Math.round(value * 1e6);
        }

        if (this.isHtl()) {
            // over 10 GbE the tuning drives a DDC tuner, over 1 GbE a signal scout inside the sweep
            if (this.connectionMode === '10GbE') {
                this.applyHtlTuner(value);
            } else {
                this.setHtlScoutFrequency(value * 1e6);
                this.applyHtlScout();
            }
        } else {
            this.sendReceiverCommand({centerFreq: value}, `Tune to ${value} MHz`);
        }

        if (isDefined(this.properties.onTune)) {
            this.properties.onTune(Math.round(value * 1e6));
        }
    }

    /**
     * Steps the center frequency.
     * @param {Number} deltaMhz - the frequency step (MHz)
     */
    stepFrequency(deltaMhz) {
        this.tuneToMhz(parseFloat((this.tuneMhz + deltaMhz).toFixed(4)));
    }

    /**
     * Sends the current gain as a manual gain.
     */
    applyGain() {
        this.autoGain = false;
        this.refreshToggles();
        this.sendReceiverCommand({gain: this.gain, autoGain: false}, `Set Gain ${this.gain} dB`);
    }

    /**
     * Toggles the auto gain.
     */
    toggleAutoGain() {
        this.autoGain = !this.autoGain;
        this.refreshToggles();
        this.sendReceiverCommand({autoGain: this.autoGain}, `Auto Gain ${this.autoGain ? 'ON' : 'OFF'}`);
    }

    /**
     * Sets the demodulation mode.
     * @param {String} mode - one of the audioModes values
     */
    applyAudioMode(mode) {
        this.audioMode = mode;
        if (isDefined(this.audioModeSelect)) {
            this.audioModeSelect.value = mode;
        }

        // picking a demodulation starts the playback, turning it off stops it
        if (mode !== 'OFF' && !this.isListening) {
            this.initAudioEngine();
            this.isListening = true;
            this.refreshToggles();
        } else if (mode === 'OFF' && this.isListening) {
            this.isListening = false;
            this.refreshToggles();
        }

        this.sendReceiverCommand({audioMode: mode}, `Demod Mode ${mode}`);
    }

    /**
     * Sets the receiver operating mode.
     * @param {String} mode - one of the operatingModes values
     */
    applyOperatingMode(mode) {
        this.operatingMode = mode;
        this.sendReceiverCommand({operatingMode: mode}, `Operating Mode ${mode}`);
    }

    /**
     * Builds the full receiver parameters, the receiver expecting all of them on every command.
     * @param {Object} overrides - the parameters changed by the user
     * @return {Object} the receiver parameters
     */
    buildReceiverParameters(overrides) {
        const currentMhz = isDefined(overrides.centerFreq) ?
            Number(overrides.centerFreq) : (this.tuneMhz || (this.centerFrequencyHz / 1e6) || 98.0);

        const autoGain = isDefined(overrides.autoGain) ? Boolean(overrides.autoGain) : this.autoGain;
        let gain = null;
        if (!autoGain) {
            gain = isDefined(overrides.gain) ? Number(overrides.gain) : Number(this.gain);
            if (isNaN(gain)) {
                gain = 20.7;
            }
        }

        const audioMode = isDefined(overrides.audioMode) ? overrides.audioMode : this.audioMode;

        return {
            operatingMode: isDefined(overrides.operatingMode) ? overrides.operatingMode : this.operatingMode,
            centerFreq: parseFloat(currentMhz.toFixed(4)),
            gain: gain,
            autoGain: autoGain,
            sampleRate: isDefined(overrides.sampleRate) ? Number(overrides.sampleRate) : this.sampleRateHz,
            agcMode: false,
            audioMode: String(audioMode),
            recordAudio: isDefined(overrides.recordAudio) ? Boolean(overrides.recordAudio) : this.isRecordingAudio
        };
    }

    /**
     * Sends a command to the receiver control stream.
     * @param {Object} overrides - the parameters changed by the user
     * @param {String} label - a human readable label of the command
     */
    sendReceiverCommand(overrides, label) {
        const payload = this.buildCommand(this.buildReceiverParameters(overrides));

        if (isDefined(this.properties.sendCommand)) {
            this.properties.sendCommand(payload, label);
        } else if (isDefined(this.controlStream)) {
            this.controlStream.postCommand(JSON.stringify(payload));
        }
    }

    // ------------------------------------------------------------------ HTL radio commands

    /**
     * Sends an HTL command. The HTL radio takes one command choice at a time, so the parameters
     * are nested under the name of the choice instead of being flat as on an RTL-SDR receiver.
     * @param {String} choiceName - the name of the command choice
     * @param {Object} parameters - the parameters of the choice
     * @param {String} label - a human readable label of the command
     */
    sendHtlCommand(choiceName, parameters, label) {
        const payload = this.buildCommand({[choiceName]: parameters});

        if (isDefined(this.properties.sendCommand)) {
            this.properties.sendCommand(payload, label);
        } else if (isDefined(this.controlStream)) {
            this.controlStream.postCommand(JSON.stringify(payload));
        }
    }

    /**
     * Sets the band the spectrum scanner sweeps, without sending it to the radio.
     * @param {Number} startHz - the start frequency (Hz)
     * @param {Number} stopHz - the stop frequency (Hz)
     */
    setHtlSweepRange(startHz, stopHz) {
        this.htlStartFrequencyHz = startHz;
        this.htlStopFrequencyHz = stopHz;
        this.htlSweepIsDefault = false;
        if (isDefined(this.htlStartInput)) {
            this.htlStartInput.value = (startHz / 1e6).toFixed(3);
            this.htlStopInput.value = (stopHz / 1e6).toFixed(3);
        }
    }

    /**
     * Applies the spectrum scanner configuration.
     */
    applyHtlSpectrumConfig() {
        const startHz = Number(this.htlStartFrequencyHz);
        const stopHz = Number(this.htlStopFrequencyHz);
        if (isNaN(startHz) || isNaN(stopHz) || stopHz <= startHz) {
            return;
        }
        this.htlSweepIsDefault = false;
        this.sendHtlCommand('configureSpectrum', {
            startFrequency: startHz,
            stopFrequency: stopHz,
            numPoints: Number(this.htlNumPoints),
            updateRate: Number(this.htlUpdateRate)
        }, 'Configure Spectrum');
    }

    /**
     * Applies the signal scout settings: its center frequency, its demodulation, its squelch and
     * its volume.
     */
    applyHtlScout() {
        const frequencyHz = Number(this.htlScoutFrequencyHz);
        if (isNaN(frequencyHz) || frequencyHz <= 0) {
            return;
        }
        this.sendHtlCommand('controlScout', {
            scoutId: Number(this.htlScoutId),
            centerFrequency: frequencyHz,
            demodMode: this.htlDemodMode,
            squelch: Number(this.squelch),
            volume: Number(this.volume)
        }, `Control Scout ${this.htlScoutId}`);
    }

    /**
     * Points the signal scout at the peak currently detected in the spectrum.
     */
    setScoutToPeak() {
        const peakMhz = parseFloat(this.peakFrequencyMhz);
        if (isNaN(peakMhz) || peakMhz <= 0) {
            return;
        }
        this.setHtlScoutFrequency(peakMhz * 1e6);
    }

    /**
     * Sets the scout center frequency, without sending it to the radio.
     * @param {Number} frequencyHz - the center frequency (Hz)
     */
    setHtlScoutFrequency(frequencyHz) {
        this.htlScoutFrequencyHz = frequencyHz;
        if (isDefined(this.htlScoutInput)) {
            this.htlScoutInput.value = (frequencyHz / 1e6).toFixed(3);
        }
    }

    /**
     * Applies the 10 GbE DDC tuner settings.
     * @param {Number} [frequencyMhz] - the center frequency (MHz). Defaults to the one of the panel
     */
    applyHtlTuner(frequencyMhz) {
        const targetMhz = isDefined(frequencyMhz) ? frequencyMhz : this.htlTunerFrequencyHz / 1e6;
        const frequencyHz = targetMhz * 1e6;
        if (isNaN(frequencyHz) || frequencyHz <= 0) {
            return;
        }
        this.htlTunerFrequencyHz = frequencyHz;
        if (isDefined(this.htlTunerInput)) {
            this.htlTunerInput.value = targetMhz.toFixed(3);
        }
        this.sendHtlCommand('configureTuner', {
            tunerId: Number(this.htlTunerId),
            mode: this.htlTunerMode,
            centerFrequency: frequencyHz,
            txRxMode: this.htlTxRxMode,
            agcEnabled: Boolean(this.htlTunerAgc),
            attenuation: Number(this.htlTunerAttenuation || 0),
            txPower: Number(this.htlTunerTxPower || 0),
            enablePreamp: Boolean(this.htlTunerPreamp),
            dropResources: Boolean(this.htlTunerDropResources)
        }, `Configure Tuner ${this.htlTunerId}`);
    }

    /**
     * Starts the 10 GbE DDC collector on the selected IQ slot.
     */
    applyHtlCollectorStart() {
        this.sendHtlCommand('startCollector', {
            slot: this.htlCollectorSlot,
            tunerId: Number(this.htlCollectorTunerId),
            centerFrequency: Number(this.htlCollectorFrequencyHz),
            bandwidth: Number(this.htlCollectorBandwidthHz),
            sampleRate: Number(this.htlCollectorSampleRate || 0),
            snapshotNumSamples: Number(this.htlCollectorSnapshotSamples || 0),
            agcEnabled: Boolean(this.htlCollectorAgc),
            attenuation: Number(this.htlCollectorAttenuation || 0),
            enablePreamp: Boolean(this.htlCollectorPreamp),
            triggerType: this.htlCollectorTriggerType,
            triggerStartTime: new Date().toISOString(),
            collectorId: Number(this.htlCollectorId)
        }, `Start Collector ${this.htlCollectorSlot}`);
    }

    /**
     * Stops the 10 GbE DDC collector on the selected IQ slot.
     */
    applyHtlCollectorStop() {
        this.sendHtlCommand('stopCollector', {
            slot: this.htlCollectorSlot,
            collectorId: -1
        }, `Stop Collector ${this.htlCollectorSlot}`);
    }

    /**
     * Halts the radio resources.
     */
    applyHtlHalt() {
        this.sendHtlCommand('halt', {type: this.htlHaltType}, `Halt ${this.htlHaltType}`);
    }

    /**
     * Asks the radio to publish its latest core unit status.
     */
    applyHtlRefreshStatus() {
        this.sendHtlCommand('refreshStatus', {confirm: true}, 'Refresh Status');
    }

    /**
     * Starts the selected format service.
     */
    applyHtlStartService() {
        if (!isDefined(this.htlServiceName) || this.htlServiceName === '') {
            return;
        }
        this.sendHtlCommand('startService', {serviceName: this.htlServiceName},
            `Start Service ${this.htlServiceName}`);
    }

    /**
     * Resets the tuners and the collectors to their factory defaults.
     */
    resetHtlUnit() {
        this.sendHtlCommand('resetUnit', {confirm: true}, 'Reset Unit');
    }

    /**
     * Reboots the radio unit. Every stream disconnects while it restarts.
     */
    rebootHtlUnit() {
        this.sendHtlCommand('rebootUnit', {confirm: true}, 'Reboot Unit');
    }

    // ------------------------------------------------------------------ audio playback

    /**
     * Listens to the demodulated audio datasource, whose frames are played back once the user
     * turns the audio on.
     * @private
     */
    connectAudioDataSource() {
        if (!isDefined(this.audioDataSource)) {
            return;
        }
        const getAudioFrame = isDefined(this.properties.getAudioFrame) ?
            this.properties.getAudioFrame : findBinaryFrame;

        this.audioBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + this.audioDataSource.id);
        this.audioBroadcastChannel.onmessage = (event) => {
            if (event.data.type !== EventType.DATA) {
                return;
            }
            for (let record of event.data.values) {
                this.pushAudioFrame(getAudioFrame(record));
            }
        };
    }

    /**
     * Creates the Web Audio graph playing the demodulated audio back, or resumes it when the
     * browser suspended it.
     * @private
     */
    initAudioEngine(sampleRate) {
        if (this.audioContext === null) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!isDefined(AudioContextClass)) {
                return;
            }
            // run the graph at the rate of the audio itself, so nothing has to be resampled
            const rate = (isDefined(sampleRate) && sampleRate > 0) ? sampleRate : DEFAULT_AUDIO_SAMPLE_RATE;
            try {
                this.audioContext = new AudioContextClass({sampleRate: rate, latencyHint: 'interactive'});
            } catch (e) {
                console.warn('[SdrView] audio context init error:', e);
                return;
            }
            this.audioGainNode = this.audioContext.createGain();
            this.audioGainNode.gain.setValueAtTime(this.volume / 100.0, this.audioContext.currentTime);
            this.audioGainNode.connect(this.audioContext.destination);
            this.nextAudioStartTime = 0;
        }
        // the browsers only let an audio context run after a user gesture
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    /**
     * Plays one demodulated audio frame back. The frame is a SWE binary record: a big endian
     * header carrying the sample rate, the channel count and the payload length, followed by
     * signed 16 bits PCM samples.
     * @param {ArrayBuffer|ArrayBufferView} frame - the audio frame
     */
    pushAudioFrame(frame) {
        if (!isDefined(frame)) {
            return;
        }

        let buffer = frame;
        let offset = 0;
        if (ArrayBuffer.isView(frame)) {
            buffer = frame.buffer;
            offset = frame.byteOffset;
        }
        if (!(buffer instanceof ArrayBuffer) || buffer.byteLength - offset < AUDIO_HEADER_LENGTH) {
            return;
        }

        const view = new DataView(buffer, offset);
        const sampleRate = view.getInt32(8, false);
        const channels = view.getInt32(12, false);
        const payloadLength = view.getInt32(16, false);

        if (payloadLength > 0 && buffer.byteLength - offset >= AUDIO_HEADER_LENGTH + payloadLength) {
            const pcmBytes = new Uint8Array(buffer, offset + AUDIO_HEADER_LENGTH, payloadLength);
            this.playPcmChunk(pcmBytes, channels, sampleRate > 0 ? sampleRate : DEFAULT_AUDIO_SAMPLE_RATE);
        }
    }

    /**
     * Queues a block of signed 16 bits PCM samples right after the audio already scheduled.
     * @private
     * @param {Uint8Array} pcmBytes - the PCM samples
     * @param {Number} channels - the channel count, 1 or 2
     * @param {Number} sampleRate - the sample rate (Hz)
     */
    playPcmChunk(pcmBytes, channels, sampleRate) {
        if (!this.isListening || this.audioContext === null || this.audioContext.state !== 'running') {
            return;
        }

        const samples = new Int16Array(pcmBytes.buffer, pcmBytes.byteOffset,
            Math.floor(pcmBytes.byteLength / 2));
        if (samples.length === 0) {
            return;
        }

        let audioBuffer;
        if (channels === 2) {
            const frameCount = Math.floor(samples.length / 2);
            audioBuffer = this.audioContext.createBuffer(2, frameCount, sampleRate);
            const left = audioBuffer.getChannelData(0);
            const right = audioBuffer.getChannelData(1);
            for (let i = 0; i < frameCount; i++) {
                left[i] = samples[i * 2] / 32768.0;
                right[i] = samples[i * 2 + 1] / 32768.0;
            }
        } else {
            audioBuffer = this.audioContext.createBuffer(1, samples.length, sampleRate);
            const mono = audioBuffer.getChannelData(0);
            for (let i = 0; i < samples.length; i++) {
                mono[i] = samples[i] / 32768.0;
            }
        }

        // resync when the queue ran dry or drifted too far ahead of the playback
        const now = this.audioContext.currentTime;
        if (this.nextAudioStartTime < now || this.nextAudioStartTime > now + 0.35) {
            this.nextAudioStartTime = now + 0.05;
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioGainNode !== null ? this.audioGainNode : this.audioContext.destination);
        source.start(this.nextAudioStartTime);
        this.nextAudioStartTime += audioBuffer.duration;
    }

    /**
     * Plays back the demodulated audio of one observation, and measures its level. The audio is
     * gated by the squelch, so anything quieter than the threshold is measured but not played.
     * @param {any} rawAudio - the PCM payload, as signed 16 bits little endian samples
     * @param {Number} [sampleRate=44100] - the sample rate (Hz)
     * @param {Number} [channels=1] - the channel count
     */
    handleAudioObservation(rawAudio, sampleRate, channels) {
        const rate = (isDefined(sampleRate) && sampleRate > 0) ?
            sampleRate : DEFAULT_OBSERVATION_AUDIO_SAMPLE_RATE;
        this.audioSampleRate = rate;
        this.audioChannels = (isDefined(channels) && channels > 0) ? channels : 1;
        this.isAudioConnected = true;

        const samples = pcmToFloat32(rawAudio);
        if (samples === null || samples.length === 0) {
            return;
        }

        // RMS level of the frame, which is what the squelch and the level meter work off
        let sumOfSquares = 0;
        for (let i = 0; i < samples.length; i++) {
            sumOfSquares += samples[i] * samples[i];
        }
        const rms = Math.sqrt(sumOfSquares / samples.length);
        this.audioLevelDb = Math.round(20 * Math.log10(Math.max(1e-5, rms)));
        this.refreshAudioMeter();
        this.refreshToggles();

        if (!this.isListening || this.audioLevelDb < this.squelch) {
            return;
        }

        this.initAudioEngine(rate);
        if (this.audioContext === null) {
            return;
        }
        this.setVolume(this.volume);

        try {
            const audioBuffer = this.audioContext.createBuffer(1, samples.length, rate);
            audioBuffer.copyToChannel(samples, 0, 0);

            const source = this.audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.audioGainNode !== null ? this.audioGainNode : this.audioContext.destination);

            const now = this.audioContext.currentTime;
            if (this.nextAudioStartTime < now || this.nextAudioStartTime > now + 0.5) {
                this.nextAudioStartTime = now + 0.04;
            }
            source.start(this.nextAudioStartTime);
            this.nextAudioStartTime += audioBuffer.duration;
        } catch (e) {
            console.warn('[SdrView] audio playback error:', e);
        }
    }

    /**
     * Turns the audio playback on or off. Turning it on while the receiver is not demodulating
     * also selects the demodulation matching the tuned frequency.
     */
    toggleAudioListen() {
        this.isListening = !this.isListening;
        this.refreshToggles();

        if (!this.isListening) {
            // mute right away, so the frames already queued stop playing too
            this.setVolume(this.volume);
            return;
        }

        this.initAudioEngine(this.audioSampleRate);
        this.setVolume(this.volume);

        // the HTL scouts carry their own demodulation, set through the scout controls
        if (!this.isHtl() && this.audioMode === 'OFF') {
            const mhz = this.tuneMhz;
            let mode = 'NFM';
            if (mhz >= 88.0 && mhz <= 108.0) {
                mode = 'WFM';
            } else if (mhz >= 118.0 && mhz <= 137.0) {
                mode = 'AM';
            }
            this.applyAudioMode(mode);
        }
    }

    /**
     * Sets the playback volume.
     * @param {Number} volume - the volume, from 0 to 100
     */
    setVolume(volume) {
        this.volume = volume;
        if (isDefined(this.volumeSlider) && Number(this.volumeSlider.value) !== volume) {
            this.volumeSlider.value = String(volume);
        }
        if (this.audioGainNode !== null && this.audioContext !== null) {
            const gain = this.isListening ? Math.max(0, Math.min(1, volume / 100.0)) : 0;
            this.audioGainNode.gain.setValueAtTime(gain, this.audioContext.currentTime);
        }
    }

    /**
     * Starts or stops the audio recording. The HTL radio takes a start and a stop command and
     * reports nothing back, so the elapsed time is counted here; an RTL-SDR receiver takes the
     * recording as one more receiver parameter.
     */
    toggleAudioRecording() {
        this.isRecordingAudio = !this.isRecordingAudio;

        if (this.isHtl()) {
            if (this.isRecordingAudio) {
                this.sendHtlCommand('startAudioRecording', {directory: '', prefix: ''},
                    'Start Audio Recording');
                this.startRecordingTimer();
            } else {
                this.sendHtlCommand('stopAudioRecording', {confirm: true}, 'Stop Audio Recording');
                this.stopRecordingTimer();
            }
        } else {
            this.sendReceiverCommand({recordAudio: this.isRecordingAudio},
                this.isRecordingAudio ? 'Start Audio Recording' : 'Stop Audio Recording');
        }

        this.refreshToggles();
    }

    /**
     * @private
     */
    startRecordingTimer() {
        this.stopRecordingTimer();
        this.recordingDurationSec = 0;
        this.recordingTimerId = setInterval(() => {
            this.recordingDurationSec++;
            this.refreshToggles();
        }, 1000);
    }

    /**
     * @private
     */
    stopRecordingTimer() {
        if (this.recordingTimerId !== null) {
            clearInterval(this.recordingTimerId);
            this.recordingTimerId = null;
        }
    }

    // ------------------------------------------------------------------ lifecycle

    reset() {
        super.reset();
        this.smoothedBins = null;
        this.peakHoldBins = null;
        this.isLive = false;
        this.fps = 0;
        this.frameCounter = 0;
        this.numBins = 0;
        this.hasStartStop = false;
        this.nextAudioStartTime = 0;
        this.isAudioConnected = false;
        this.audioLevelDb = -100;
        this.peakFrequencyMhz = '---';
        this.peakDb = '---';
        this.clearWaterfall();
        this.refreshAudioMeter();
        this.refreshToggles();
    }

    destroy() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.stopRecordingTimer();
        if (this.audioBroadcastChannel !== null) {
            this.audioBroadcastChannel.close();
            this.audioBroadcastChannel = null;
        }
        if (this.audioContext !== null) {
            this.audioContext.close();
            this.audioContext = null;
            this.audioGainNode = null;
        }
        if (this.resizeObserver !== null) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        this.spectrumCanvas = undefined;
        this.waterfallCanvas = undefined;
        super.destroy();
    }
}

export default SdrView;
