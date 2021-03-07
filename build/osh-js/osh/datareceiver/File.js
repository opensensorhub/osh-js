/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

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
import DataSource from './DataSource.js';
import FileWorker from './workers/File.worker.js';
/**
 * This datasource provides generic parsing for File input. It is agnostic of the content of the file.
 *
 * @extends DataSource
 * @example
 * import File from 'core/datasource/File.js';
 *
 * let earthquakeDatasource = new File("EQ", {
    protocol: "file",
    paths: ["./data/earthquake.1.csv"]
  });
 */
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String[]} properties.paths the file paths
     */
    function File(name, properties) {
        return _super.call(this, name, __assign(__assign({}, properties), { protocol: 'file' }), new FileWorker()) || this;
    }
    return File;
}(DataSource));
export default File;
//# sourceMappingURL=File.js.map
