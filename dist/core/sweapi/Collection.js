/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/
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
import SweCollectionDataParser from "../parsers/sweapi/collection/SweCollectionDataParser";
var Collection = /** @class */ (function () {
    /**
     *
     */
    function Collection(url, filter, pageSize, parser, responseFormat) {
        if (responseFormat === void 0) { responseFormat = 'json'; }
        this.url = url;
        this.filter = filter;
        this.pageSize = pageSize;
        this.parser = parser;
        this.pageOffset = 0;
        this.init = false;
        this.total = 0;
        this.collectionDataParser = new SweCollectionDataParser(filter.props.format);
        this.responseFormat = responseFormat;
        this.currentPage = -1;
    }
    /**
     * Check if has next page
     * @return {boolean}
     */
    Collection.prototype.hasNext = function () {
        return this.pageOffset !== -1;
    };
    Collection.prototype.fetchData = function (offset) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString, fullUrl, jsonResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryString = "".concat(this.filter.toQueryString(), "&offset=").concat(offset, "&limit=").concat(this.pageSize);
                        fullUrl = this.url + '?' + queryString;
                        return [4 /*yield*/, fetch(fullUrl, {
                                method: 'GET',
                                headers: {}
                            }).then(function (response) {
                                if (!response.ok) {
                                    var err = new Error("Got ".concat(response.status, " response from ").concat(fullUrl));
                                    err.response = response;
                                    throw err;
                                }
                                if (_this.responseFormat === 'json') {
                                    return response.json();
                                }
                                else if (_this.responseFormat === 'arraybuffer') {
                                    return response.arrayBuffer();
                                }
                            })];
                    case 1:
                        jsonResponse = _a.sent();
                        return [2 /*return*/, this.parseResponse(jsonResponse)];
                }
            });
        });
    };
    Collection.prototype.parseResponse = function (jsonResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var items, data, _i, items_1, item;
            return __generator(this, function (_a) {
                items = this.collectionDataParser.parseData(jsonResponse);
                data = [];
                if (Array.isArray(items)) {
                    for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                        item = items_1[_i];
                        data.push(this.parser.parseData(item));
                    }
                }
                else {
                    data.push(items);
                }
                return [2 /*return*/, data];
            });
        });
    };
    /**
     * Fetches next page.
     * @param page - the number of page to fetch
     * @return {Promise<Array>}
     */
    Collection.prototype.nextPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasNext()) return [3 /*break*/, 2];
                        this.currentPage++;
                        this.pageOffset = this.currentPage * this.pageSize;
                        return [4 /*yield*/, this.fetchData(this.pageOffset)];
                    case 1:
                        data = _a.sent();
                        if (data.length === 0 || data.length < this.pageSize) {
                            this.pageOffset = -1;
                        }
                        return [2 /*return*/, data];
                    case 2: throw Error('Has no more pages');
                }
            });
        });
    };
    Collection.prototype.page = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.currentPage = page;
                        this.pageOffset = this.currentPage * this.pageSize;
                        return [4 /*yield*/, this.fetchData(this.pageOffset)];
                    case 1:
                        data = _a.sent();
                        if (data.length === 0 || data.length < this.pageSize) {
                            this.pageOffset = -1;
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Fetches previous page.
     * @param page - the number of page to fetch
     * @return {Promise<Array>}
     */
    Collection.prototype.previousPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.hasPrevious()) {
                    this.currentPage--;
                    this.pageOffset = this.currentPage * this.pageSize;
                    return [2 /*return*/, this.fetchData(this.pageOffset)];
                }
                else {
                    throw Error('Has no more pages');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Check if has previous page
     * @return {boolean}
     */
    Collection.prototype.hasPrevious = function () {
        return this.currentPage > 0;
    };
    return Collection;
}());
export default Collection;
//# sourceMappingURL=Collection.js.map