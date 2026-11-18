# SDR

The SdrView displays the RF spectrum of a Software Defined Radio as two stacked canvases:

- a **spectrum analyzer** (amplitude vs frequency) with a dBFS grid, a frequency grid and axis, the
  center frequency marker, the tuned frequency marker, a peak hold trace and a hover crosshair,
- a **waterfall spectrogram** (history vs frequency) scrolling one row per spectrum frame.

The frequency axis is drawn in its own band at the bottom of the spectrum canvas, the ticks carrying
the frequency in MHz and the axis label the unit. The tuned frequency is marked in rose whenever it
sits inside the displayed span but away from its center, which is what happens over a swept band.

The view handles the whole signal display chain: exponential averaging, peak hold with decay,
automatic dB floor/ceiling tracking, frame rate measurement and a 256 entry color palette.

<DocumentationLoad path="/guide/api/SdrView.html"/>

## Supported layers

The view supports type layers:
- sdr

## Receiver control

When a ConSys API ***controlStream*** (or a custom ***sendCommand*** function) is given, the view also
renders the receiver control bar and enables the interactive tuning:

- type a center frequency in MHz and press Enter or hit *Tune*,
- step the center frequency by ±100 kHz / ±1 MHz,
- click anywhere on the spectrum or on the waterfall to tune to that frequency,
- pick the operating mode, toggle the auto gain, set the tuner gain and pick the demodulation mode,
- start and stop the audio recording on the receiver.

Every command carries the full receiver parameter set, since the receiver expects all of them on each
command:

```json
{
  "parameters": {
    "operatingMode": "SPECTRUM_AUDIO",
    "centerFreq": 98.5,
    "gain": null,
    "autoGain": true,
    "sampleRate": 2048000,
    "agcMode": false,
    "audioMode": "WFM",
    "recordAudio": false
  }
}
```

The payload wrapper can be changed with the ***buildCommand*** property if your control stream expects
another shape, e.g. `buildCommand: parameters => ({params: {RECEIVER: parameters}})`.

The tuning input is only overwritten by the incoming observations while the user is not typing in it,
so the field does not fight the datastream. It is applied on Enter, on *Tune* or when it loses the
focus.

## Audio

Given an ***audioDataSource*** carrying the demodulated audio, the view plays it back through the Web
Audio API and adds the listening controls: a *Listen* / *Muted* toggle, a volume slider and a *Record*
button. Picking a demodulation mode other than `OFF` starts the playback, and picking `OFF` stops it.
Turning the audio on while the receiver is not demodulating selects the mode matching the tuned
frequency: `WFM` over the FM broadcast band, `AM` over the airband, `NFM` elsewhere.

The audio frames are expected as SWE binary records: a 20 bytes big endian header carrying the sample
rate, the channel count and the payload length, followed by signed 16 bits PCM samples. The binary
payload is looked up in the record by name; give a ***getAudioFrame*** function when your parser puts
it somewhere else.

```javascript
new SdrView({
    // ...
    audioDataSource: audioDataSource,
    getAudioFrame: (rec) => rec.samples,
    volume: 80
});
```

A driver demodulating in place instead carries the audio in the spectrum observations themselves. The
layer then reports it as its ***audio*** property and no `audioDataSource` is needed. Such audio is
measured and squelched: the view computes the RMS level of every frame, shows it on a level meter and
only plays frames louder than the ***squelch*** threshold.

## HTL radio

Setting ***receiverType*** to `htl` switches the view to the HTL radio command set. The HTL radio takes
one command choice at a time, so each command nests its parameters under the name of the choice rather
than sending the flat receiver parameters:

```json
{
  "parameters": {
    "controlScout": {
      "scoutId": 0,
      "centerFrequency": 145000000,
      "demodMode": "FM",
      "squelch": -80,
      "volume": 75
    }
  }
}
```

The receiver bar is then replaced by the HTL control panel, opened with the *HTL Controls* button:

- the **spectrum scanner**: the swept band, the FFT bin count and the update rate (`configureSpectrum`),
- the **signal scout and its audio**: the scout, its frequency, its demodulation, the squelch, the
  volume, the listening toggle, the recording toggle (`controlScout`, `startAudioRecording`,
  `stopAudioRecording`) and a live audio level meter,
- the **10 GbE DDC tuner and collector**: tuner, tuning mode, Tx/Rx, AGC, preamp, IQ slot, bandwidth
  (`configureTuner`, `startCollector`, `stopCollector`, `halt`),
- the **unit actions**: `refreshStatus`, `startService`, `resetUnit` and `rebootUnit`.

***connectionMode*** states which connection the radio is reachable over and gates the panel
accordingly: `1GbE` offers the sweep and the scouts, `10GbE` the DDC tuner and the collectors, `BOTH`
all of them. It defaults to `UNKNOWN`, which leaves the 1 GbE controls enabled and settles on `1GbE` as
soon as a swept band is observed. It can also be set at runtime with `setConnectionMode(mode)`.

Tuning follows the same split: over 10 GbE the tuning controls drive the DDC tuner, otherwise they
drive the signal scout inside the swept band.

```javascript
new SdrView({
    container: 'sdr-container',
    layers: [spectrumLayer],
    receiverType: 'htl',
    connectionMode: 'BOTH',
    controlStream: radioControl,
    squelch: -80,
    volume: 75
});
```

## Swept bands

When the layer reports a ***startFrequency*** and a ***stopFrequency***, the display spans that band
instead of being centered on the tuned frequency: the span and the center come from the bounds, and
tuning moves the rose marker inside the band rather than recentering the display.

## Palettes

The ***colorPalette*** property selects the waterfall palette: `heat` (default, navy → blue → cyan →
green → yellow → orange → red → white), `viridis`, `jet` or `cool`. It can also be changed at runtime
with `setColorPalette(scheme)`.

## Example

<<< @/../../showcase/examples/sdr/sdr.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/sdr.html" style="border:none;width:100%;height: 620px" />
