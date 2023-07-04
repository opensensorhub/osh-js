var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import TextDataParser from "../../parsers/TextDataParser";
import { assertDefined, isDefined } from "../../utils/Utils";
import SWEXmlStreamParser from "../../parsers/SWEXmlStreamParser";
import JsonDataParser from "../../parsers/JsonDataParser";
import BinaryDataParser from "../../parsers/BinaryDataParser";
var SosGetResultParser = /** @class */ (function () {
    function SosGetResultParser() {
        this.templatePromise = undefined;
    }
    SosGetResultParser.prototype.init = function (properties) {
        this.properties = properties;
    };
    SosGetResultParser.prototype.fetchGetResultTemplate = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var getResultTemplateUrl, response, template, sweXmlParser, json, respSchema, resultEncoding, rootElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assertDefined(this.properties, 'Properties are not defined, the parser has not been initialized');
                        getResultTemplateUrl = this.buildGetResultTemplateUrl(properties);
                        return [4 /*yield*/, fetch(getResultTemplateUrl)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        template = _a.sent();
                        //
                        if ('responseFormat' in properties && properties.responseFormat === 'application/json') {
                            this.parser = new JsonDataParser(JSON.parse(template), { timeShift: this.properties.timeShift || 0 });
                        }
                        else {
                            sweXmlParser = new SWEXmlStreamParser(template);
                            json = sweXmlParser.toJson();
                            respSchema = void 0;
                            // Retro compatibility
                            if (isDefined(json.GetResultTemplateResponse)) {
                                respSchema = json.GetResultTemplateResponse;
                            }
                            else {
                                respSchema = json;
                            }
                            resultEncoding = respSchema.resultEncoding;
                            rootElement = respSchema.resultStructure;
                            if (resultEncoding && resultEncoding.type === 'TextEncoding') {
                                this.parser = new TextDataParser(rootElement, resultEncoding, { timeShift: this.properties.timeShift || 0 });
                            }
                            else if (resultEncoding && resultEncoding.type === 'BinaryEncoding') {
                                this.parser = new BinaryDataParser(rootElement, resultEncoding, { timeShift: this.properties.timeShift || 0 });
                            }
                            else {
                                throw Error('Not supported parser format');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SosGetResultParser.prototype.checkInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        if (!isDefined(this.templatePromise)) {
                            this.templatePromise = this.fetchGetResultTemplate(this.properties);
                        }
                        return [4 /*yield*/, this.templatePromise];
                    case 1:
                        _a.sent();
                        this.initialized = true;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SosGetResultParser.prototype.parseDataBlock = function (arrayBuffer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkInit()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.parser.parseDataBlock(arrayBuffer)];
                }
            });
        });
    };
    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the protocol protocol
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.foiId the foiId
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Date} properties.lastTimeStamp - the last timestamp to start at this time (ISO String)
     * @param {Object} properties.customUrlParams - the encoding options
     * @return {String} the full url
     */
    SosGetResultParser.prototype.buildUrl = function (properties) {
        var url = _super.prototype.buildUrl.call(this, __assign({}, properties));
        // adds feature of interest urn
        if (properties.foiId && properties.of !== '') {
            url += '&featureOfInterest=' + properties.foiId;
        }
        return url;
    };
    SosGetResultParser.prototype.buildGetResultTemplateUrl = function (properties) {
        var url = '';
        var protocol = properties.tls ? 'https' : 'http';
        url += protocol + '://' + properties.endpointUrl + '?';
        url += "service=SOS";
        url += "&version=2.0";
        // adds request
        url += "&request=GetResultTemplate";
        // adds offering
        url += "&offering=" + properties.offeringID;
        // adds observedProperty
        url += "&observedProperty=" + properties.observedProperty;
        if ('responseFormat' in properties) {
            url += "&responseFormat=" + properties.responseFormat;
        }
        return url;
    };
    return SosGetResultParser;
}());
export default SosGetResultParser;
//# sourceMappingURL=SosGetResult.parser.js.map