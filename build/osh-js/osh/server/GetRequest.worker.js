import SWEXmlStreamParser from "../parsers/SWEXmlStreamParser.js";
self.onmessage = function (e) {
    var json = e.data.json;
    var req = e.data.request;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (json) {
                    try {
                        var jsonResp = JSON.parse(xhr.responseText);
                        self.postMessage(jsonResp);
                    }
                    catch (exception) {
                        console.error('Cannot parse Json: \n', xhr.responseText);
                        self.postMessage({ error: true, msg: 'Cannot parse Json' });
                    }
                }
                else {
                    var sweXmlParser = new SWEXmlStreamParser(xhr.responseText);
                    sweXmlParser.setXml(xhr.responseText);
                    var respObj = sweXmlParser.toJson();
                    self.postMessage(respObj);
                }
            }
            else {
                self.postMessage({ error: true, msg: xhr.responseText });
            }
        }
    };
    xhr.withCredentials = true;
    xhr.open('GET', req, true);
    xhr.send();
};
//# sourceMappingURL=GetRequest.worker.js.map