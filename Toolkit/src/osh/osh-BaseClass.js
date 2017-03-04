/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Richard Becker. All Rights Reserved.

 Author: Richard Becker <beckerr@prominentedge.com>

 ******************************* END LICENSE BLOCK ***************************/

/* Simple JavaScript Inheritance
* By John Resig http://ejohn.org/
* MIT Licensed.
*/

(function(){
    var initializing = false;
    var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    // The base BaseClass implementation (does nothing)
    this.BaseClass = function(){};

    // Create a new BaseClass that inherits from this class
    BaseClass.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don’t run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we’re overwriting an existing function
            if(typeof prop[name] == 'function' && typeof _super[name] == 'function' && fnTest.test(prop[name])) {
                prototype[name] = (function(name, fn){
                                      return function() {
                                          var tmp = this._super;

                                          // Add a new ._super() method that is the same method
                                          // but on the super-class
                                          this._super = _super[name];

                                          // The method only need to be bound temporarily, so we
                                          // remove it when we’re done executing
                                          var ret = fn.apply(this, arguments);
                                          this._super = tmp;

                                          return ret;
                                      };
                                  })(name, prop[name]);
            } else {
               prototype[name] = prop[name];
            }
        }

        // The dummy class constructor
        function BaseClass() {
            // All construction is actually done in the initialize method
            if ( !initializing && this.initialize )
                this.initialize.apply(this, arguments);
        }

        // Populate our constructed prototype object
        BaseClass.prototype = prototype;

        // Enforce the constructor to be what we expect
        BaseClass.prototype.constructor = BaseClass;

        // And make this class extendable
        BaseClass.extend = arguments.callee;

        return BaseClass;
    };
})();