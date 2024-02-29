const http = require('http');
const https = require('https');

class NexradSites {
    constructor() {
        this.sites = this.init();
        console.log('NexradSites sites table loaded: this.sites = ' + this.sites);
    }

    init() {
        let foiReqUrl = 'http://localhost:8282/sensorhub/sos?service=SOS&version=2.0&request=GetFeatureOfInterest&responseFormat=application/json';
        let request = http.get(foiReqUrl, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Error retrieving sites from the server. Code: ${res.statusCode}`);
                res.resume();
                return;
            }

            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('close', () => {
                this.sites = JSON.parse(data);
                // this.sites.forEach((site) => {
                //     console.log(site.properties.name + ":" + site.properties.uid + ":" + site.geometry.coordinates);
                // });

                return this.sites;   
            });

        });

        request.on('error', (err) => {
            console.error(`Error retrieving site FOI data from server: ${err.message}`);
        });

    }
    
    getSite(id) {
        let site =  this.sites.find(s => s.properties.name === id);
        return site;
    }

    getSiteLocation(id) {
        // let site =  this.sites.find(s => s.id === id);
        let site =  this.getSite(id);
        if(!site) {
            console.log('nv.gsl: cannot find site for ' + id);
            return;
        }
        // console.log('ns getSiteloc: ' + site.id);
        return {
            x: site.geometry.coordinates[0],
            y: site.geometry.coordinates[1],
            z: site.geometry.coordinates[2]
        };
    }

}

export default NexradSites;