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
import WebCodecApi from "./WebCodecApi";
import {isDefined} from "../../../utils/Utils";
import AudioTimeDomainCanvas from "./canvas/AudioTimeDomainCanvas";
import AudioFrequencyDomainCanvas from "./canvas/AudioFrequencyDomainCanvas";
import AudioTimeDomainChartJs from "./chart/AudioTimeDomainChartJs";
import AudioFrequencyDomainChartJs from "./chart/AudioFrequencyDomainChartJs";
import FfmpegAudio from "./FfmpegAudio";

/**
 * This class is in charge of listening Audio using either default native WebAPI or compatible WebCodec(if supported)
 * @extends View
 * @example
 *
 import AudioView from 'core/ui/view/audio/AudioView.js';

 let audioView = new AudioView({
  container: 'audio-container',
  name: 'Audio',
  dataSourceId: audioDatasource.id
});
 */

class AudioView extends View {

    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.flush - Number of elements to concatenate before flushing (for WebAudioApi only)
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {boolean} properties.visible - set the default behavior of the visibility of the view
     * @param {number} properties.gain - set the gain to be applied to the input  before its propagation to the output
     * @param {string} [properties.codec='aac'] - the audio codec
     * @param {boolean} [properties.output=true] - define if the sound is playing on the output
     * @param {DataSource} properties.dataSource - the dataSource object
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     */
    constructor(properties) {
        super({
            supportedLayers: ['data'],
            gain: 1.0,
            output: true,
            codec: 'aac',
            dataSourceId: properties.dataSource.id,
            ...properties,
            visible: true
        });
        this.isInitContext = false;
        this.initViews();
        this.initPlaybackRate();

    }

    initViews() {
        this.views = {};

        if (isDefined(this.properties.timeDomainVisualization)) {
            this.views.timeDomainVisualization = this.properties.timeDomainVisualization;
        }

        if (isDefined(this.properties.frequencyDomainVisualization)) {
            this.views.frequencyDomainVisualization = this.properties.frequencyDomainVisualization;
        }

        if (isDefined(this.views.timeDomainVisualization)) {
            if (this.views.timeDomainVisualization.type === 'canvas') {
                this.views.timeDomainVisualization.view = new AudioTimeDomainCanvas({
                    nodeElement: this.elementDiv,
                    ...this.views.timeDomainVisualization
                });
            } else if (this.views.timeDomainVisualization.type === 'chart') {
                this.views.timeDomainVisualization.view = new AudioTimeDomainChartJs({
                    nodeElement: this.elementDiv,
                    ...this.views.timeDomainVisualization
                });
            }
        }

        if (isDefined(this.views.frequencyDomainVisualization)) {
            if (this.views.frequencyDomainVisualization.type === 'canvas') {
                this.views.frequencyDomainVisualization.view = new AudioFrequencyDomainCanvas({
                    nodeElement: this.elementDiv,
                    ...this.views.frequencyDomainVisualization
                });
            } else if (this.views.frequencyDomainVisualization.type === 'chart') {
                this.views.frequencyDomainVisualization.view = new AudioFrequencyDomainChartJs({
                    nodeElement: this.elementDiv,
                    ...this.views.frequencyDomainVisualization
                });
            }
        }
    }

    initAudioContext(sampleRate,timestamp) {
        // time audio position
        this.deltaInc = 0.2;
        this.key = true;
        this.audioCtx = null;

        this.analyzerTimeNode = null;
        this.analyzerFreqNode = null;
        this.gainNode = null;

        this.startTime = 0;
        this.gain = this.properties.gain;

        let AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext({
            sampleRate: sampleRate,
            latencyHint: 'interactive'
        });

        if (isDefined(this.properties.frequencyDomainVisualization)) {
            this.analyzerFreqNode = this.audioCtx.createAnalyser();
            this.analyzerFreqNode.fftSize = this.properties.frequencyDomainVisualization.fftSize;
        }

        if (isDefined(this.properties.timeDomainVisualization)) {
            this.analyzerTimeNode = this.audioCtx.createAnalyser();
            this.analyzerTimeNode.fftSize = this.properties.timeDomainVisualization.fftSize;
        }
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.setValueAtTime(this.gain, 0);

        this.startTime = timestamp;
        this.deltaInc = 0.1;
        this.isInitContext = true;
    }

    initDecoder() {
        try {
            this.decoder = new WebCodecApi({
                ...this.properties,
                audioCtx: this.audioCtx
            });
            console.warn('using WebCodec for audio decoding');
        } catch (error) {
            this.decoder = new FfmpegAudio(this.properties);
            console.warn('using FfmpegAudio for audio decoding');
        }
        this.decoder.onDecodedBuffer = this.onDecodedBuffer.bind(this);
    }

    initPlaybackRate() {

    }
    onDecodedBuffer(audioBuffer) {
        let replaySpeed = 1.0;

        if(isDefined(this.properties.dataSource)) {
            replaySpeed = this.properties.dataSource.getReplaySpeed();
        }
        let source = this.audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.detune.value = replaySpeed  * 100;
        // source.playbackRate.value = replaySpeed * 1000;

        let node = source;

        node = node.connect(this.gainNode);
        if (this.analyzerTimeNode !== null) {
            node = node.connect(this.analyzerTimeNode);
        }

        if (this.analyzerFreqNode !== null) {
            node = node.connect(this.analyzerFreqNode);
        }

        // play sound
        if (this.properties.output) {
            node.connect(this.audioCtx.destination);
        }

        // Connect the source to be analysed
        source.start(this.deltaInc);
        this.deltaInc += audioBuffer.duration;

        let dataTimeDomainArray, dataFreqDomainArray;

        if (this.analyzerTimeNode !== null) {
            dataTimeDomainArray = new Float32Array(this.analyzerTimeNode.fftSize);
            this.analyzerTimeNode.getFloatTimeDomainData(dataTimeDomainArray);
        }

        if (this.analyzerFreqNode !== null) {
            dataFreqDomainArray = new Float32Array(this.analyzerFreqNode.frequencyBinCount);
            this.analyzerFreqNode.getFloatFrequencyData(dataFreqDomainArray);
        }

        const decoded = {
            buffer: audioBuffer,
            dataTimeDomainArray: dataTimeDomainArray,
            dataFreqDomainArray: dataFreqDomainArray,
            timestamp: this.startTime + this.deltaInc * 1000
        };


        if(replaySpeed === 1.0) {
            if (isDefined(this.views.frequencyDomainVisualization)) {
                this.views.frequencyDomainVisualization.view.draw(decoded);
            }
            if (isDefined(this.views.timeDomainVisualization)) {
                this.views.timeDomainVisualization.view.draw(decoded);
            }
        }

        source.onended = (event) => {
            if(replaySpeed !== 1.0) {
                if (isDefined(this.views.frequencyDomainVisualization)) {
                    this.views.frequencyDomainVisualization.view.draw(decoded);
                }
                if (isDefined(this.views.timeDomainVisualization)) {
                    this.views.timeDomainVisualization.view.draw(decoded);
                }
            }

            if (isDefined(this.views.frequencyDomainVisualization)) {
                this.views.frequencyDomainVisualization.view.onended(decoded);
            }
            if (isDefined(this.views.timeDomainVisualization)) {
                this.views.timeDomainVisualization.view.onended(decoded);
            }
        }
    }

    setData(dataSourceId, data) {
        for (let value of data.values) {
            if (!this.isInitContext) {
                this.initAudioContext(value.data.sampleRate,value.timeStamp);
                this.initDecoder();
            }

            this.decoder.decode(value.data, value.timeStamp);
        }
    }

    reset() {
        this.decoder.reset();
        if (this.isInitContext) {
            if (isDefined(this.views.frequencyDomainVisualization)) {
                this.views.frequencyDomainVisualization.view.reset();
            }
            if (isDefined(this.views.timeDomainVisualization)) {
                this.views.timeDomainVisualization.view.reset();
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

    draw(decodedSample) {}
}

export default AudioView;



