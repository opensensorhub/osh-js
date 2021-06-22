/***************************** BEGIN LICENSE BLOCK ***************************
 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.
 Copyright (C) 2015-2021 Mathieu Dhainaut. All Rights Reserved.
 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>
 ******************************* END LICENSE BLOCK ***************************/

import View from "../View.js";
import {isDefined} from "../../../utils/Utils";
import FfmpegAudio from "./decoder/FfmpegAudio";
import WebCodecApi from "./decoder/WebCodecApi";

/**
 * This class is in charge of listening Audio using either default native WebAPI or compatible WebCodec(if supported)
 * @extends View
 * @example
 *
 import AudioView from 'core/ui/view/audio/AudioView.js';

 let audioView = new AudioView({
  name: 'Audio',
  dataSourceId: audioDatasource.id
});
 */

class AudioView extends View {

    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {number} [properties.gain=1.0] - set the gain to be applied to the input  before its propagation to the output
     * @param {string} [properties.codec='aac'] - the audio codec
     * @param {boolean} [properties.playSound=true] - define if the sound is playing on the output
     * @param {DataSource} properties.dataSource - the dataSource object
    * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     */
    constructor(properties) {
        super({
            supportedLayers: ['data'],
            gain: 1.0,
            playSound: true,
            codec: 'aac',
            visualizers : [],
            dataSourceId: properties.dataSource.id,
            ...properties,
            visible: false,
        });
        this.visualizers = this.properties.visualizers;
        this.isInitContext = false;
    }

    initVisualizers() {
        this.visualizersMap = {};
        for (let visualizer of this.visualizers) {
            /**
             *
             * Module is {
             *     analyzer: <analyzer_instance>,
             *     type: 'time' | 'frequency',
             *     format: 'byte' | 'float'
             * }
             */
            this.visualizersMap[visualizer.id] = visualizer.createAnalyzer(this.audioCtx);
        }
    }

    addVisualizer(visualizer) {
        // add to current existing context
        // otherwise, will be initialized later
        if(isDefined(this.audioCtx)) {
            this.visualizersMap[visualizer.id] = visualizer.createAnalyzer(this.audioCtx);
        }
        this.visualizers.push(visualizer);
    }

    initAudioContext(sampleRate, timestamp) {
        if (!this.isInitContext) {
            // time audio position
            this.deltaInc = 0.2;
            this.audioCtx = null;

            this.analyzerTimeNode = null;
            this.analyzerFreqNode = null;
            this.analyzerFreqByteNode = null;
            this.gainNode = null;

            this.gain = this.properties.gain;

            let AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext({
                sampleRate: sampleRate,
                latencyHint: 'interactive'
            });

            this.gainNode = this.audioCtx.createGain();
            this.gainNode.gain.setValueAtTime(this.gain, 0);

            this.startTime = timestamp;
            this.isInitContext = true;

            this.initDecoder();
            this.initVisualizers();
        }
    }

    initDecoder() {
        try {
            this.decoder = new WebCodecApi({
                ...this.properties,
                audioCtx: this.audioCtx
            });
            console.warn('using WebCodec for audio decoding');
        } catch (error) {
            this.decoder = new FfmpegAudio({
                ...this.properties,
                audioCtx: this.audioCtx
            });
            console.warn('using FfmpegAudio for audio decoding');
        }
        this.decoder.onDecodedBuffer = this.onDecodedBuffer.bind(this);
    }

    onDecodedBuffer(audioBuffer) {
        let replaySpeed = 1.0;

        if (isDefined(this.properties.dataSource)) {
            replaySpeed = this.properties.dataSource.getReplaySpeed();
        }
        let source = this.audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        // source.detune.value = replaySpeed  * 100;
        source.playbackRate.value = replaySpeed;

        let node = source;

        node = node.connect(this.gainNode);

        // connect to visualizers using modules
        for (let visualizer of this.visualizers) {
            node = node.connect(this.visualizersMap[visualizer.id]['analyzer']);
        }

        // play sound
        if (this.properties.playSound) {
            node.connect(this.audioCtx.destination);
        }

        source.start(this.deltaInc);
        this.deltaInc += audioBuffer.duration;

        const decoded = {
            buffer: audioBuffer,
            timestamp: this.startTime + this.deltaInc * 1000,
            time: {},
            frequency: {}
        };

        // gets the necessary decoded data
        let visModule;
        for (let visualizer of this.visualizers) {
            // time | frequency
            // --> byte | float
            visModule = this.visualizersMap[visualizer.id];
            if (visModule.type === 'time') {
                if (visModule.format === 'byte' &&  !decoded['time'].hasOwnProperty('byte')) {
                    const array = new Uint8Array(visModule['analyzer'].fftSize);
                    visModule['analyzer'].getByteTimeDomainData(array);
                    decoded['time']['byte'] = array;
                } else if (visModule.format === 'float' && !decoded['time'].hasOwnProperty('float')) {
                    const array = new Float32Array(visModule['analyzer'].fftSize);
                    visModule['analyzer'].getFloatTimeDomainData(array);
                    decoded['time']['float'] = array;
                }
            } else if (visModule.type === 'frequency') {
                if (visModule.format === 'byte' && !decoded['frequency'].hasOwnProperty('byte')) {
                    const array = new Uint8Array(visModule['analyzer'].frequencyBinCount);
                    visModule['analyzer'].getByteFrequencyData(array);
                    decoded['frequency']['byte'] = array;
                } else if (visModule.format === 'float' && !decoded['frequency'].hasOwnProperty('float')) {
                    const array = new Float32Array(visModule['analyzer'].frequencyBinCount);
                    visModule['analyzer'].getFloatFrequencyData(array);
                    decoded['frequency']['float'] = array;
                }
            }
        }

        // forward result
        for (let visualizer of this.visualizers) {
            visualizer.draw(decoded);
        }

        this.onEndedDecodedBuffer(decoded);

        source.onended = (event) => {
            for (let visualizer of this.visualizers) {
                visualizer.onended(decoded);
            }
        }
    }

    onEndedDecodedBuffer(audioBuffer) {}

    setData(dataSourceId, data) {
        for (let value of data.values) {
            if (!this.isInitContext) {
                this.initAudioContext(value.data.sampleRate, value.timeStamp);
            }

            this.decoder.decode(value.data, value.timeStamp);
        }
    }

    reset() {
        super.reset();
        if (isDefined(this.decoder)) {
            this.decoder.reset();
        }
        if (this.isInitContext) {
            for (let visualizer of this.visualizers) {
                visualizer.reset();
                this.visualizersMap[visualizer.id]['analyzer'].disconnect();
            }
            if (isDefined(this.gainNode)) {
                this.gainNode.disconnect();
            }
            this.audioCtx.close();
            this.isInitContext = false;
        }
    }

    getCurrentTime() {
        if (this.audioCtx === null) {
            return 0;
        }
        return this.audioCtx.currentTime;
    }

    setGain(value) {
        if (isDefined(this.gainNode)) {
            this.gainNode.gain.setValueAtTime(value, 0);
        } else {
            this.gain = value;
        }
    }
}

export default AudioView;



