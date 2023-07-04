/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import DataConnector from "../../core/connector/DataConnector";
import { Status } from "../../core/connector/Status";
/**
 * Defines the FileConnector to read a File content
 * @extends DataConnector
 * @example
 * import FileConnector from 'core/connector/FileConnector.js';
 *
 * let paths = ['path1','path2]...];
 * let connector = new FileConnector(paths);
 *
 * // connect
 * connector.connect();
 *
 * // disconnect
 * connector.disconnect();
 *
 * // close
 * connector.close();
 *
 */
var FileConnector = /** @class */ (function (_super) {
    __extends(FileConnector, _super);
    /**
     * @param (string[]) paths - list of file paths
     */
    function FileConnector() {
        var _this = _super.call(this, '') || this;
        _this.opened = false;
        return _this;
    }
    /**
     * Start reading file content
     */
    FileConnector.prototype.doRequest = function (paths) {
        if (paths === void 0) { paths = []; }
        return __awaiter(this, void 0, void 0, function () {
            var _i, paths_1, path, d, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.opened) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        this.opened = true;
                        this.onChangeStatus(Status.CONNECTED);
                        _i = 0, paths_1 = paths;
                        _a.label = 2;
                    case 2:
                        if (!(_i < paths_1.length)) return [3 /*break*/, 5];
                        path = paths_1[_i];
                        return [4 /*yield*/, fetch(path)];
                    case 3:
                        d = _a.sent();
                        this.onMessage(d);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.onChangeStatus(Status.DISCONNECTED);
                        // read is done
                        this.opened = false;
                        return [3 /*break*/, 7];
                    case 6:
                        ex_1 = _a.sent();
                        throw Error(ex_1);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FileConnector.prototype.isConnected = function () {
        return this.opened;
    };
    return FileConnector;
}(DataConnector));
export default FileConnector;
//# sourceMappingURL=FileConnector.js.map