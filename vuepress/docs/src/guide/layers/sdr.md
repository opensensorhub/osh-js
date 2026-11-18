# SDR

The SdrLayer carries the RF spectrum of a Software Defined Radio: the amplitude bins and the frequency
plan (center frequency / sample rate, or start / stop frequency) they have to be drawn against. It also
forwards the receiver settings (operating mode, tuner gain, demodulation mode, audio recording) when the
datastream reports them.

<br/>
<DocumentationLoad path="/guide/api/SdrLayer.html"/>

## Type

The SdrLayer is of the type ***sdr***.

## Field detection

SDR datastreams expose their spectrum under many different names and nesting levels. When no getter is
given for a field, the layer flattens the record (digging through `result`, `data` and any nested output
object) and looks the field up by name:

| Property | Record fields looked up |
| --- | --- |
| `amplitude` | `amplitude`, `SpectrumAmplitude`, `Spectrum Amplitude`, `powerSpectrum`, `power_spectrum`, `Power Spectrum`, `values`, `value`, `psd`, `power`, `spectrum`, `rf_spectrum` |
| `centerFrequency` | `center_frequency`, `centerFrequency`, `Center Frequency`, `centerFreq`, `center_freq`, `frequency` |
| `startFrequency` | `startFrequency`, `start_frequency`, `Start Frequency`, `startFreq`, `start_freq`, `freqStart`, `minFrequency`, `min_frequency` |
| `stopFrequency` | `stopFrequency`, `stop_frequency`, `Stop Frequency`, `stopFreq`, `stop_freq`, `freqStop`, `maxFrequency`, `max_frequency` |
| `sampleRate` | `sampleRate`, `sample_rate`, `Sample Rate`, `bandwidth`, `bandwidthHz`, `span`, `spanHz` |
| `frequencyAxis` | `frequency_axis`, `frequencyAxis`, `Frequency Axis`, `freq_axis` |
| `operatingMode` | `operatingMode`, `operating_mode`, `mode` |
| `gain` | `tunerGain`, `tuner_gain`, `gain` |
| `autoGain` | `autoGain`, `auto_gain` |
| `audioMode` | `audioMode`, `audio_mode`, `demodMode` |
| `recordingAudio` | `AudioRecordingActive`, `audioRecordingActive`, `recordAudio`, `isRecordingAudio` |
| `audio` | `audioData`, `pcmAudio`, `audio_data`, `Audio Data`, `pcm_data`, `audio` |
| `audioSampleRate` | `audioSampleRate`, `sampleRate`, `sample_rate`, `Sample Rate` |
| `audioChannels` | `channels`, `channelCount`, `numChannels` |
| `scoutId` | `scoutId`, `scout_id` |

The ***roles*** property overrides that lookup without having to write a getter, which is what you want
when the record holds several arrays or several frequency fields:

```javascript
new SdrLayer({
    dataSourceId: spectrumDataSource.id,
    roles: {
        amplitude: 'rtlsdr_spectrum_amplitude',
        centerFrequency: 'tuned_frequency',
        sampleRate: 'bandwidth_hz'
    }
});
```

An auto-detected or role-mapped center, start or stop frequency below 10000 is assumed to be expressed in
MHz and is converted to Hz, which is how most SDR drivers report it. A value returned by an explicit
`getCenterFrequency`, `getStartFrequency` or `getStopFrequency` getter is always taken as Hz.

The amplitude bins are accepted as a plain array, a typed array, an array of objects
(`[{amplitude: -45.2}]`), a delimited string or a wrapper object (`{values: [...]}`).

The ***amplitude*** and the ***audio*** are refreshed by every record, even to nothing, so a record
only carrying the receiver settings is neither drawn as a new spectrum frame nor played back as audio
again. The frequency plan and the settings are sticky instead.

## Demodulated audio

A driver demodulating in place puts the audio in the observation rather than on a stream of its own.
The ***audio*** payload is handed over to the view untouched, since the view is the only place knowing
the sample rate and the channel count it goes with. It is accepted as a typed array, an ArrayBuffer, an
array of bytes or a base64 string, and is read as signed 16 bits little endian PCM.

Note that the ***audioSampleRate*** of such a record is the audio rate, not the span. A record carrying
only audio therefore never reaches the frequency plan: the view stops at the audio when the record holds
no amplitude bins.

## Swept bands

A driver sweeping a band rather than tuning a receiver to a center frequency reports the bounds of the
sweep instead. When a record carries both a ***startFrequency*** and a ***stopFrequency***, the view
derives the span and the center of the display from them, and the center frequency of the record is then
only taken as a position inside the band:

```javascript
new SdrLayer({
    dataSourceId: spectrumDataSource.id,
    getAmplitude: (rec) => rec.result.powerSpectrum,
    getStartFrequency: (rec) => rec.result.startFrequency * 1e6,
    getStopFrequency: (rec) => rec.result.stopFrequency * 1e6
});
```

## Example

<<< @/../../showcase/examples/sdr/sdr.js#snippet_sdr_layer
