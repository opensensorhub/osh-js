import SWEXmlStreamParser from "../parsers/SWEXmlStreamParser.js";

self.onmessage = (e) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let sweXmlParser = new SWEXmlStreamParser(xhr.responseText);
                sweXmlParser.setXml(xhr.responseText);
                let respObj = sweXmlParser.toJson();
                self.postMessage(respObj);
            } else {
                self.postMessage({error: true, msg: xhr.responseText});
            }
        }
    };
    xhr.withCredentials = true;
    xhr.open('GET', e.data, true);
    xhr.send();
};
