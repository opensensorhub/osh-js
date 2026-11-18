/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2025 Georobotix Inc. All Rights Reserved.

 ******************************* END LICENSE BLOCK ***************************/

import Layer from "./Layer.js";
import {isDefined, randomUUID} from "../../utils/Utils.js";

/**
 * Flattens a SWE-JSON / OM-JSON / ConSys record into a single level object so that
 * the spectrum fields can be looked up by name whatever the nesting of the result.
 * @param {Object|String} raw - the record to flatten
 * @return {Object} a single level object
 */
export function flattenRecord(raw) {
    if (!raw) return {};

    if (typeof raw === 'string') {
        const trimmed = raw.trim();
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
            try {
                return flattenRecord(JSON.parse(trimmed));
            } catch (e) {
                // not a JSON payload
            }
        }
        return {};
    }

    if (typeof raw !== 'object') return {};

    if (Array.isArray(raw)) {
        return raw.length > 0 ? flattenRecord(raw[0]) : {};
    }

    let merged = {...raw};

    if (raw.result && typeof raw.result === 'object') {
        merged = {...merged, ...flattenRecord(raw.result)};
    }
    if (raw.data && typeof raw.data === 'object') {
        merged = {...merged, ...flattenRecord(raw.data)};
    }
    if (Array.isArray(raw.values) && raw.values.length > 0) {
        if (typeof raw.values[0] === 'object') {
            merged = {...merged, ...flattenRecord(raw.values[0])};
        } else {
            merged.values = raw.values;
        }
    }

    // merge all nested child objects (e.g. raw.rtlsdr_spectrum, raw.rtlsdr_settings, raw.output)
    for (let key of Object.keys(raw)) {
        const value = raw[key];
        if (value
            && typeof value === 'object'
            && !Array.isArray(value)
            && !ArrayBuffer.isView(value)) {
            for (let subKey of Object.keys(value)) {
                if (!isDefined(merged[subKey])) {
                    merged[subKey] = value[subKey];
                }
            }
        }
    }

    return merged;
}

/**
 * Extracts a numeric array out of the many shapes a spectrum field can take: a plain array,
 * a typed array, an array of objects, a delimited string or a wrapper object.
 * @param {any} raw - the value to convert
 * @param {Number} [defaultValue=-100] - the value used to replace any non finite number
 * @return {Number[]|null} the numeric array or null if the value does not hold one
 */
export function toNumericArray(raw, defaultValue = -100) {
    if (!isDefined(raw)) return null;

    if (Array.isArray(raw)) {
        if (raw.length === 0) return [];
        if (typeof raw[0] === 'number') {
            return raw.map(value => isFinite(value) ? value : defaultValue);
        }
        return raw.map(item => {
            if (typeof item === 'number') return isFinite(item) ? item : defaultValue;
            if (Array.isArray(item)) return Number(item[0]) || defaultValue;
            if (item && typeof item === 'object') {
                // no nullish coalescing here: the showcase examples are still built by webpack 4,
                // which cannot parse it. isDefined() has the same null/undefined semantics
                let candidate = firstDefined(item, ['amplitude', 'value', 'power']);
                if (!isDefined(candidate)) {
                    candidate = Object.values(item)[0];
                }
                const value = Number(candidate);
                return isFinite(value) ? value : defaultValue;
            }
            const value = Number(item);
            return isFinite(value) ? value : defaultValue;
        });
    }

    if (ArrayBuffer.isView(raw) && !(raw instanceof DataView)) {
        return Array.from(raw).map(value => isFinite(value) ? value : defaultValue);
    }

    if (typeof raw === 'string') {
        const parts = raw.trim().split(/[\s,]+/);
        if (parts.length > 1) {
            const numbers = parts.map(Number).filter(value => !isNaN(value));
            if (numbers.length > 0) return numbers;
        }
        return null;
    }

    if (typeof raw === 'object') {
        if (Array.isArray(raw.value)) return toNumericArray(raw.value, defaultValue);
        if (Array.isArray(raw.values)) return toNumericArray(raw.values, defaultValue);
        if (Array.isArray(raw.elements)) return toNumericArray(raw.elements, defaultValue);
        if (Array.isArray(raw.data)) return toNumericArray(raw.data, defaultValue);
        if (Array.isArray(raw.array)) return toNumericArray(raw.array, defaultValue);
        if (raw.buffer && raw.byteLength) {
            return Array.from(new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4));
        }
        const values = Object.values(raw);
        if (values.length > 0 && typeof values[0] === 'number') {
            return values;
        }
    }

    return null;
}

// Fallback field names looked up in the flattened record when no getter is given
const AUTO_FIELDS = {
    amplitude: ['amplitude', 'SpectrumAmplitude', 'Spectrum Amplitude', 'powerSpectrum', 'power_spectrum',
        'Power Spectrum', 'values', 'value', 'psd', 'power', 'spectrum', 'rf_spectrum'],
    centerFrequency: ['center_frequency', 'centerFrequency', 'Center Frequency', 'centerFreq', 'center_freq', 'frequency'],
    startFrequency: ['startFrequency', 'start_frequency', 'Start Frequency', 'startFreq', 'start_freq',
        'freqStart', 'minFrequency', 'min_frequency'],
    stopFrequency: ['stopFrequency', 'stop_frequency', 'Stop Frequency', 'stopFreq', 'stop_freq',
        'freqStop', 'maxFrequency', 'max_frequency'],
    sampleRate: ['sampleRate', 'sample_rate', 'Sample Rate', 'bandwidth', 'bandwidthHz', 'span', 'spanHz'],
    frequencyAxis: ['frequency_axis', 'frequencyAxis', 'Frequency Axis', 'freq_axis'],
    operatingMode: ['operatingMode', 'operating_mode', 'mode'],
    gain: ['tunerGain', 'tuner_gain', 'gain'],
    autoGain: ['autoGain', 'auto_gain'],
    audioMode: ['audioMode', 'audio_mode', 'demodMode'],
    recordingAudio: ['AudioRecordingActive', 'audioRecordingActive', 'recordAudio', 'isRecordingAudio'],
    audio: ['audioData', 'pcmAudio', 'audio_data', 'Audio Data', 'pcm_data', 'audio'],
    audioSampleRate: ['audioSampleRate', 'sampleRate', 'sample_rate', 'Sample Rate'],
    audioChannels: ['channels', 'channelCount', 'numChannels'],
    scoutId: ['scoutId', 'scout_id']
};

// the frequency properties expressed in Hz, normalized from MHz when the driver reports them so
const FREQUENCY_PROPERTIES = ['centerFrequency', 'startFrequency', 'stopFrequency'];

// the properties refreshed by every record, even to undefined, so that a record only carrying the
// receiver settings is neither drawn as a new spectrum frame nor played back as audio again
const VOLATILE_PROPERTIES = ['amplitude', 'audio'];

function firstDefined(flatRecord, names) {
    for (let name of names) {
        if (isDefined(flatRecord[name])) {
            return flatRecord[name];
        }
    }
    return undefined;
}

/**
 * Normalizes a frequency to Hz. Values below 10000 are assumed to be expressed in MHz,
 * which is how most SDR drivers report the tuned frequency.
 * @param {Number} value - the frequency
 * @return {Number} the frequency in Hz
 */
function toHz(value) {
    return value < 10000 ? value * 1e6 : value;
}

/**
 * Layer carrying the RF spectrum of a Software Defined Radio: the amplitude bins and the
 * frequency plan (center frequency / sample rate, or start / stop frequency) they have to be
 * drawn against. It also forwards the receiver settings (operating mode, gain, demodulation,
 * audio recording) when the datastream reports them.
 * @extends Layer
 */
class SdrLayer extends Layer {
    /**
     * Create the SdrLayer
     * @param {Object} properties -
     * @param {Number} [properties.centerFrequency=undefined] - the default center frequency (Hz)
     * @param {Number} [properties.sampleRate=undefined] - the default sample rate / span (Hz)
     * @param {String} [properties.amplitudeUnit='dBFS'] - the unit of the amplitude bins
     * @param {Object} [properties.roles={}] - maps a record field name to a spectrum role, any of
     * 'amplitude', 'centerFrequency', 'startFrequency', 'stopFrequency', 'sampleRate', 'frequencyAxis'.
     * Used before the automatic field detection
     * @param {Function} properties.getAmplitude - returns the amplitude bins of the record
     * @param {Function} properties.getCenterFrequency - returns the center frequency (Hz) of the record
     * @param {Function} properties.getStartFrequency - returns the start frequency (Hz) of the swept band
     * @param {Function} properties.getStopFrequency - returns the stop frequency (Hz) of the swept band
     * @param {Function} properties.getSampleRate - returns the sample rate / span (Hz) of the record
     * @param {Function} properties.getFrequencyAxis - returns the frequency axis bins (Hz) of the record
     * @param {Function} properties.getOperatingMode - returns the receiver operating mode of the record
     * @param {Function} properties.getGain - returns the tuner gain (dB) of the record
     * @param {Function} properties.getAutoGain - returns the auto gain flag of the record
     * @param {Function} properties.getAudioMode - returns the demodulation mode of the record
     * @param {Function} properties.getRecordingAudio - returns the audio recording flag of the record
     * @param {Function} properties.getAudio - returns the demodulated audio samples of the record, as
     * signed 16 bits little endian PCM
     * @param {Function} properties.getAudioSampleRate - returns the audio sample rate (Hz) of the record
     * @param {Function} properties.getAudioChannels - returns the audio channel count of the record
     * @param {Function} properties.getScoutId - returns the id of the scout the audio comes from
     */
    constructor(properties) {
        super(properties);
        this.type = 'sdr';
    }

    // call by super class
    init(properties = this.properties) {
        super.init(properties);
        const props = {
            sdrId: randomUUID(),
            amplitude: null,
            frequencyAxis: null,
            centerFrequency: undefined,
            startFrequency: undefined,
            stopFrequency: undefined,
            sampleRate: undefined,
            amplitudeUnit: 'dBFS',
            operatingMode: undefined,
            gain: undefined,
            autoGain: undefined,
            audioMode: undefined,
            recordingAudio: undefined,
            audio: undefined,
            audioSampleRate: undefined,
            audioChannels: undefined,
            scoutId: undefined
        };

        if (isDefined(properties.centerFrequency)) {
            props.centerFrequency = properties.centerFrequency;
        }

        if (isDefined(properties.sampleRate)) {
            props.sampleRate = properties.sampleRate;
        }

        if (isDefined(properties.amplitudeUnit)) {
            props.amplitudeUnit = properties.amplitudeUnit;
        }

        this.roles = isDefined(properties.roles) ? properties.roles : {};

        this.definedId('sdrId', props);

        // explicit getters take precedence over the automatic detection
        const getters = {
            amplitude: 'getAmplitude',
            centerFrequency: 'getCenterFrequency',
            startFrequency: 'getStartFrequency',
            stopFrequency: 'getStopFrequency',
            sampleRate: 'getSampleRate',
            frequencyAxis: 'getFrequencyAxis',
            operatingMode: 'getOperatingMode',
            gain: 'getGain',
            autoGain: 'getAutoGain',
            audioMode: 'getAudioMode',
            recordingAudio: 'getRecordingAudio',
            audio: 'getAudio',
            audioSampleRate: 'getAudioSampleRate',
            audioChannels: 'getAudioChannels',
            scoutId: 'getScoutId'
        };

        for (let property in getters) {
            const funcName = getters[property];
            if (isDefined(properties[funcName])) {
                let fn = async (rec, timestamp, options) => {
                    const value = await this.getFunc(funcName)(rec, timestamp, options);
                    this.updateProperty(property, this.castValue(property, value, false));
                };
                this.addFn(this.getDataSourcesIdsByProperty(funcName), fn);
            }
        }

        // detect the remaining fields from the record itself
        const autoProperties = Object.keys(getters).filter(property => !isDefined(properties[getters[property]]));
        if (autoProperties.length > 0) {
            let fn = (rec) => {
                const flatRecord = flattenRecord(rec);
                for (let property of autoProperties) {
                    let value = isDefined(this.roles[property]) ? flatRecord[this.roles[property]] : undefined;
                    if (!isDefined(value)) {
                        value = firstDefined(flatRecord, AUTO_FIELDS[property]);
                    }
                    // the frequency plan and the settings are sticky, the spectrum and the audio
                    // are not. @see VOLATILE_PROPERTIES
                    if (isDefined(value) || VOLATILE_PROPERTIES.includes(property)) {
                        this.updateProperty(property, this.castValue(property, value, true));
                    }
                }
            };
            this.addFn(this.dataSourceIds, fn);
        }
    }

    /**
     * Converts a raw record value into the type expected for the given spectrum property.
     * @private
     * @param {String} property - the property name
     * @param {any} value - the raw value
     * @param {Boolean} normalizeFrequency - assume a frequency below 10000 is expressed in MHz
     * @return {any} the converted value
     */
    castValue(property, value, normalizeFrequency) {
        if (!isDefined(value)) {
            return undefined;
        }
        if (property === 'amplitude' || property === 'frequencyAxis') {
            const array = toNumericArray(value, property === 'amplitude' ? -100 : 0);
            // a new array instance per record so that each buffered record keeps its own bins
            return (array !== null && array.length > 0) ? Float32Array.from(array) : undefined;
        }
        if (property === 'audio') {
            // the PCM payload is handed over untouched: it is decoded by the view, which is the
            // only place knowing the sample rate and the channel count it goes with
            return value;
        }
        if (property === 'audioSampleRate' || property === 'audioChannels' || property === 'scoutId') {
            const number = Number(value);
            return (isNaN(number) || number < 0) ? undefined : number;
        }
        if (FREQUENCY_PROPERTIES.includes(property) || property === 'sampleRate') {
            const number = Number(value);
            if (isNaN(number) || number <= 0) {
                return undefined;
            }
            return (normalizeFrequency && FREQUENCY_PROPERTIES.includes(property)) ? toHz(number) : number;
        }
        if (property === 'gain') {
            const number = Number(value);
            return isNaN(number) ? undefined : number;
        }
        if (property === 'autoGain' || property === 'recordingAudio') {
            return Boolean(value);
        }
        return String(value);
    }
}

export default SdrLayer;
