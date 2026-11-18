import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';
import SdrLayer from 'osh-js/core/ui/layer/SdrLayer.js';
import SdrView from 'osh-js/core/ui/view/sdr/SdrView.js';
import ControlStream from 'osh-js/core/consysapi/controlstream/ControlStream.js';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer.js';
import {Mode} from 'osh-js/core/datasource/Mode.js';

// A SensorHub node running the RTL-SDR driver. Replace the endpoint, the credentials and the
// datastream/controlstream ids with the ones of your own node.
const ENDPOINT_URL = 'localhost:8484/sensorhub/api';
const TLS = false;
const SPECTRUM_DATASTREAM_ID = '0410';
// Leave empty when the node demodulates no audio: the listening controls are then left out.
const AUDIO_DATASTREAM_ID = '';
const RECEIVER_CONTROLSTREAM_ID = '040g';
const CREDENTIALS = {username: 'admin', password: 'admin'};

// The recorded window to replay. Set REPLAY to false to follow a receiver that is running now:
// a real time datasource only carries what the driver publishes from the moment it connects,
// so it stays empty against a datastream that only holds recorded observations.
const REPLAY = true;
const REPLAY_START_TIME = '2026-11-12T16:02:57Z';
const REPLAY_END_TIME = '2026-11-13T17:08:37Z';
const REPLAY_SPEED = 1.0;

const TIME_PROPERTIES = REPLAY ? {
    mode: Mode.REPLAY,
    startTime: REPLAY_START_TIME,
    endTime: REPLAY_END_TIME,
    replaySpeed: REPLAY_SPEED
} : {
    mode: Mode.REAL_TIME
};

// #region snippet_sdr_datasource
const spectrumDataSource = new ConSysApi('RTL-SDR - RF Spectrum', {
    endpointUrl: ENDPOINT_URL,
    resource: `/datastreams/${SPECTRUM_DATASTREAM_ID}/observations`,
    tls: TLS,
    protocol: 'ws',
    responseFormat: 'application/om+json',
    connectorOpts: CREDENTIALS,
    ...TIME_PROPERTIES
});
// #endregion snippet_sdr_datasource

// #region snippet_sdr_audio_datasource
// The demodulated audio, as SWE binary records. Only built when the node exposes an audio
// datastream, an empty id otherwise asking the node for '/datastreams//observations'.
const audioDataSource = AUDIO_DATASTREAM_ID === '' ? undefined :
    new ConSysApi('RTL-SDR - Demodulated Audio', {
        endpointUrl: ENDPOINT_URL,
        resource: `/datastreams/${AUDIO_DATASTREAM_ID}/observations`,
        tls: TLS,
        protocol: 'ws',
        responseFormat: 'application/swe+binary',
        connectorOpts: CREDENTIALS,
        ...TIME_PROPERTIES
    });
// #endregion snippet_sdr_audio_datasource

// #region snippet_sdr_layer
// Without any getter the layer detects the spectrum fields in the record by name. Here the
// RTL-SDR record fields are mapped explicitly, which is what you want as soon as the record
// holds several arrays or several frequency fields.
// The driver reports 'center_frequency' in Hz and publishes no sample rate, so the span is
// calibrated from the frequency axis instead.
const spectrumLayer = new SdrLayer({
    dataSourceId: spectrumDataSource.id,
    name: 'RF Spectrum',
    getAmplitude: (rec) => rec.result.amplitude,
    getCenterFrequency: (rec) => rec.result.center_frequency,
    getFrequencyAxis: (rec) => rec.result.frequency_axis
    // a driver sweeping a band reports its bounds instead of a center frequency and a span:
    // getStartFrequency: (rec) => rec.result.startFrequency * 1e6,
    // getStopFrequency: (rec) => rec.result.stopFrequency * 1e6
});
// #endregion snippet_sdr_layer

// The control stream driving the receiver. Remove it (and the 'controlStream' property below)
// to get a read-only spectrum display.
const receiverControl = new ControlStream({id: RECEIVER_CONTROLSTREAM_ID}, {
    endpointUrl: ENDPOINT_URL,
    tls: TLS,
    connectorOpts: CREDENTIALS
});

// #region snippet_sdr_view
const sdrView = new SdrView({
    container: 'sdr-container',
    layers: [spectrumLayer],
    css: 'sdr-view',
    // only used until the first record reports the frequency plan it was recorded with
    centerFrequency: 98.9e6,
    sampleRate: 2e6,
    autoDb: true,
    averaging: 2,
    waterfall: true,
    waterfallSpeed: 2,
    colorPalette: 'heat',
    controlStream: receiverControl,
    audioDataSource: audioDataSource,
    volume: 80,
    onTune: (frequencyHz) => console.log('Tuned to ' + (frequencyHz / 1e6).toFixed(4) + ' MHz')
});
// #endregion snippet_sdr_view

const dataSources = [spectrumDataSource];
if (audioDataSource !== undefined) {
    dataSources.push(audioDataSource);
}

if (REPLAY) {
    // Mode.REPLAY requires a DataSynchronizer: it owns the replay clock the datasources are
    // driven by. Connecting a replay datasource on its own throws inside the datasource worker
    // and the view then waits for data that never comes.
    const dataSynchronizer = new DataSynchronizer({
        replaySpeed: REPLAY_SPEED,
        masterTimeRefreshRate: 250,
        startTime: REPLAY_START_TIME,
        endTime: REPLAY_END_TIME,
        dataSources: dataSources
    });
    dataSynchronizer.connect();
} else {
    for (let dataSource of dataSources) {
        dataSource.connect();
    }
}
