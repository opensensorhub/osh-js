import {CSVLoader} from '@loaders.gl/csv';
import {load as LoadLoadersGL} from '@loaders.gl/core';

let broadcastChannel;

self.onmessage = (event) => {
    if(event.data.message === 'load') {
        broadcastChannel = new BroadcastChannel(event.data.topic);
        load();
    }
}

async function load(){
    const NB_FILES = 252;
    let count = 0;
    for(let i=1;i <= NB_FILES;i++) {
        const data = await LoadLoadersGL('/data/earthquakes.'+i+'.csv', CSVLoader).then(data => {
            for(let j=0;j < data.length;j++) {
                try {
                    if (data[j].time !== null) {
                        broadcastChannel.postMessage({
                            data: data[j]
                        });
                    }
                }catch (ex) {
                    console.warn('skipping..'+data[j]);
                }
            }
            // console.log(((count++)*100/NB_FILES)+'%');
        });
    }
    console.log('done');
}
