import HttpConnector from "../../protocol/HttpConnector";
import {assertDefined} from "../../utils/Utils";

class SensorWebApi {
    constructor(networkProperties) {
        this.networkProperties = networkProperties;
        this.protocol = this.networkProperties.protocol || 'https';
        this.endpoint = this.networkProperties.endpoint;

        assertDefined(this.networkProperties.endpoint, 'endpoint');
        if(this.networkProperties.endpoint.endsWith('/')) {
            this.endpoint = this.networkProperties.endpoint.substring(0,this.networkProperties.endpoint.length - 1);
        }
    }
    createConnector(apiResource) {
        if(this.protocol === 'https' || this.protocol === 'https') {
            let separator = '';
            if(apiResource.length > 0 && apiResource.charAt(0) !== '/') {
                separator = '/';
            }
            return new HttpConnector(this.protocol + '://' + this.endpoint + separator + apiResource ,{
                responseType: 'application/json',
                method: 'GET'
            });
        } else if(this.protocol === 'mqtts' || this.protocol === 'mqtt') {

        }
    }
}
export default SensorWebApi;
