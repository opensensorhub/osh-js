import SWEXmlStreamParser from "../parsers/SWEXmlStreamParser.js";

self.onmessage = (e) => {
    const json = e.data.json;
    const req = e.data.request;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(json) {
                    try {
                        const jsonResp = JSON.parse(xhr.responseText);
                        self.postMessage(jsonResp);
                    }catch(exception) {
                        console.error('Cannot parse Json: \n',xhr.responseText);
                        self.postMessage({error: true, msg: 'Cannot parse Json'});
                    }
                } else {
                    let sweXmlParser = new SWEXmlStreamParser(xhr.responseText);
                    sweXmlParser.setXml(xhr.responseText);
                    let respObj = sweXmlParser.toJson();
                    self.postMessage(respObj);
                }
            } else {
                self.postMessage({error: true, msg: xhr.responseText});
            }
        }
    };
    xhr.withCredentials = true;
    xhr.open('GET', req, true);
    xhr.send();
};
