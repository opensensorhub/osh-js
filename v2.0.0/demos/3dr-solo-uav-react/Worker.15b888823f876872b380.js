/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/osh/ui/view/video/YUVCanvas.js
class YUVCanvas {
  constructor(parOptions) {
    parOptions = parOptions || {};
    this.canvasElement = parOptions.canvas || document.createElement("canvas");
    this.contextOptions = parOptions.contextOptions;
    this.type = parOptions.type || "yuv420";
    this.customYUV444 = parOptions.customYUV444;
    this.conversionType = parOptions.conversionType || "rec601";
    this.width = parOptions.width || 640;
    this.height = parOptions.height || 320;
    this.animationTime = parOptions.animationTime || 0;
    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;
    this.init();
  }

  init() {
    this.initContextGL();

    if (this.contextGL) {
      this.initProgram();
      this.initBuffers();
      this.initTextures();
    }
    /**
     * Draw the next output picture using WebGL
     */


    if (this.type === "yuv420") {
      this.drawNextOuptutPictureGL = par => {
        var gl = this.contextGL;
        var texturePosBuffer = this.texturePosBuffer;
        var uTexturePosBuffer = this.uTexturePosBuffer;
        var vTexturePosBuffer = this.vTexturePosBuffer;
        var yTextureRef = this.yTextureRef;
        var uTextureRef = this.uTextureRef;
        var vTextureRef = this.vTextureRef;
        var yData = par.yData;
        var uData = par.uData;
        var vData = par.vData;
        var width = this.width;
        var height = this.height;
        var yDataPerRow = par.yDataPerRow || width;
        var yRowCnt = par.yRowCnt || height;
        var uDataPerRow = par.uDataPerRow || width / 2;
        var uRowCnt = par.uRowCnt || height / 2;
        var vDataPerRow = par.vDataPerRow || uDataPerRow;
        var vRowCnt = par.vRowCnt || uRowCnt;
        let roll = Math.round(par.roll / 90) * 90;
        if (roll > 180) roll -= 360;

        if (Math.abs(roll) == 90) {
          this.canvasElement.width = this.height;
          this.canvasElement.height = this.width;
          gl.viewport(0, 0, height, width);
        } else {
          this.canvasElement.width = this.width;
          this.canvasElement.height = this.height;
          gl.viewport(0, 0, width, height);
        }

        var tTop = 0;
        var tLeft = 0;
        var tBottom = height / yRowCnt;
        var tRight = width / yDataPerRow;
        var texturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);

        if (this.customYUV444) {
          tBottom = height / uRowCnt;
          tRight = width / uDataPerRow;
        } else {
          tBottom = height / 2 / uRowCnt;
          tRight = width / 2 / uDataPerRow;
        }

        var uTexturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);
        gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uTexturePosValues, gl.DYNAMIC_DRAW);

        if (this.customYUV444) {
          tBottom = height / vRowCnt;
          tRight = width / vDataPerRow;
        } else {
          tBottom = height / 2 / vRowCnt;
          tRight = width / 2 / vDataPerRow;
        }

        var vTexturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);
        gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vTexturePosValues, gl.DYNAMIC_DRAW);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, yDataPerRow, yRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, yData);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, uDataPerRow, uRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uData);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, vDataPerRow, vRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vData);
        gl.uniform1f(this.rollUniform, roll * Math.PI / 180.);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
    } else if (this.type === "yuv422") {
      this.drawNextOuptutPictureGL = par => {
        var gl = this.contextGL;
        var texturePosBuffer = this.texturePosBuffer;
        var textureRef = this.textureRef;
        var data = par.data;
        var width = this.width;
        var height = this.height;
        var dataPerRow = par.dataPerRow || width * 2;
        var rowCnt = par.rowCnt || height;
        gl.viewport(0, 0, width, height);
        var tTop = 0;
        var tLeft = 0;
        var tBottom = height / rowCnt;
        var tRight = width / (dataPerRow / 2);
        var texturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);
        gl.uniform2f(gl.getUniformLocation(this.shaderProgram, 'resolution'), dataPerRow, height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, dataPerRow, rowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
    }
  }
  /**
   * Returns true if the canvas supports WebGL
   */


  isWebGL() {
    return this.contextGL;
  }
  /**
   * Create the GL context from the canvas element
   */


  initContextGL() {
    var canvas = this.canvasElement;
    var gl = null;
    var validContextNames = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
    var nameIndex = 0;

    while (!gl && nameIndex < validContextNames.length) {
      var contextName = validContextNames[nameIndex];

      try {
        if (this.contextOptions) {
          gl = canvas.getContext(contextName, this.contextOptions);
        } else {
          gl = canvas.getContext(contextName);
        }
      } catch (e) {
        gl = null;
      }

      if (!gl || typeof gl.getParameter !== "function") {
        gl = null;
      }

      ++nameIndex;
    }

    this.contextGL = gl;
  }
  /**
   * Initialize GL shader program
   */


  initProgram() {
    var gl = this.contextGL; // vertex shader is the same for all types

    var vertexShaderScript;
    var fragmentShaderScript;

    if (this.type === "yuv420") {
      vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'attribute vec4 uTexturePos;', 'attribute vec4 vTexturePos;', 'varying vec2 textureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'uniform float roll;', 'void main()', '{', '  vec4 ctr = vec4(0.5, 0.5, 0, 0);', '  mat4 rotMatrix = mat4( cos(roll), -sin(roll), 0, 0,', '                         sin(roll),  cos(roll), 0, 0,', '                         0,          0,         1, 0,', '                         0,          0,         0, 1);', '  gl_Position = vertexPos;', '  textureCoord = mat2(rotMatrix) * (texturePos.xy - vec2(ctr)) + vec2(ctr);', '  uTextureCoord = mat2(rotMatrix) * (uTexturePos.xy - vec2(ctr)) + vec2(ctr);', '  vTextureCoord = mat2(rotMatrix) * (vTexturePos.xy - vec2(ctr)) + vec2(ctr);', '}'].join('\n');
      fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float y = texture2D(ySampler,  textureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;', '}'].join('\n');
    } else if (this.type === "yuv422") {
      vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos.xy;', '}'].join('\n');
      fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform highp vec2 resolution;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float texPixX = 1.0 / resolution.x;', '  highp float logPixX = 2.0 / resolution.x;', // half the resolution of the texture
      '  highp float logHalfPixX = 4.0 / resolution.x;', // half of the logical resolution so every 4th pixel
      '  highp float steps = floor(textureCoord.x / logPixX);', '  highp float uvSteps = floor(textureCoord.x / logHalfPixX);', '  highp float y = texture2D(sampler, vec2((logPixX * steps) + texPixX, textureCoord.y)).r;', '  highp float u = texture2D(sampler, vec2((logHalfPixX * uvSteps), textureCoord.y)).r;', '  highp float v = texture2D(sampler, vec2((logHalfPixX * uvSteps) + texPixX + texPixX, textureCoord.y)).r;', //'  highp float y = texture2D(sampler,  textureCoord).r;',
      //'  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;',
      '  gl_FragColor = vec4(y, u, v, 1.0) * YUV2RGB;', '}'].join('\n');
    }

    var YUV2RGB = [];

    if (this.conversionType === "rec709") {
      // ITU-T Rec. 709
      YUV2RGB = [1.16438, 0.00000, 1.79274, -0.97295, 1.16438, -0.21325, -0.53291, 0.30148, 1.16438, 2.11240, 0.00000, -1.13340, 0, 0, 0, 1];
    } else {
      // assume ITU-T Rec. 601
      YUV2RGB = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
    }

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderScript);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.log('Vertex shader failed to compile: ' + gl.getShaderInfoLog(vertexShader));
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderScript);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.log('Fragment shader failed to compile: ' + gl.getShaderInfoLog(fragmentShader));
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log('Program failed to compile: ' + gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);
    var YUV2RGBRef = gl.getUniformLocation(program, 'YUV2RGB');
    gl.uniformMatrix4fv(YUV2RGBRef, false, YUV2RGB);
    this.rollUniform = gl.getUniformLocation(program, "roll");
    this.shaderProgram = program;
  }
  /**
   * Initialize vertex buffers and attach to shader program
   */


  initBuffers() {
    var gl = this.contextGL;
    var program = this.shaderProgram;
    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);
    var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
    gl.enableVertexAttribArray(vertexPosRef);
    gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);

    if (this.animationTime) {
      var animationTime = this.animationTime;
      var timePassed = 0;
      var stepTime = 15;

      var aniFun = function () {
        timePassed += stepTime;
        var mul = 1 * timePassed / animationTime;

        if (timePassed >= animationTime) {
          mul = 1;
        } else {
          setTimeout(aniFun, stepTime);
        }

        var neg = -1 * mul;
        var pos = 1 * mul;
        var vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([pos, pos, neg, pos, pos, neg, neg, neg]), gl.STATIC_DRAW);
        var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
        gl.enableVertexAttribArray(vertexPosRef);
        gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);

        try {
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        } catch (e) {}
      };

      aniFun();
    }

    var texturePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
    var texturePosRef = gl.getAttribLocation(program, 'texturePos');
    gl.enableVertexAttribArray(texturePosRef);
    gl.vertexAttribPointer(texturePosRef, 2, gl.FLOAT, false, 0, 0);
    this.texturePosBuffer = texturePosBuffer;

    if (this.type === "yuv420") {
      var uTexturePosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
      var uTexturePosRef = gl.getAttribLocation(program, 'uTexturePos');
      gl.enableVertexAttribArray(uTexturePosRef);
      gl.vertexAttribPointer(uTexturePosRef, 2, gl.FLOAT, false, 0, 0);
      this.uTexturePosBuffer = uTexturePosBuffer;
      var vTexturePosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
      var vTexturePosRef = gl.getAttribLocation(program, 'vTexturePos');
      gl.enableVertexAttribArray(vTexturePosRef);
      gl.vertexAttribPointer(vTexturePosRef, 2, gl.FLOAT, false, 0, 0);
      this.vTexturePosBuffer = vTexturePosBuffer;
    }
  }
  /**
   * Initialize GL textures and attach to shader program
   */


  initTextures() {
    var gl = this.contextGL;
    var program = this.shaderProgram;

    if (this.type === "yuv420") {
      var yTextureRef = this.initTexture();
      var ySamplerRef = gl.getUniformLocation(program, 'ySampler');
      gl.uniform1i(ySamplerRef, 0);
      this.yTextureRef = yTextureRef;
      var uTextureRef = this.initTexture();
      var uSamplerRef = gl.getUniformLocation(program, 'uSampler');
      gl.uniform1i(uSamplerRef, 1);
      this.uTextureRef = uTextureRef;
      var vTextureRef = this.initTexture();
      var vSamplerRef = gl.getUniformLocation(program, 'vSampler');
      gl.uniform1i(vSamplerRef, 2);
      this.vTextureRef = vTextureRef;
    } else if (this.type === "yuv422") {
      // only one texture for 422
      var textureRef = this.initTexture();
      var samplerRef = gl.getUniformLocation(program, 'sampler');
      gl.uniform1i(samplerRef, 0);
      this.textureRef = textureRef;
    }
  }
  /**
   * Create and configure a single texture
   */


  initTexture() {
    var gl = this.contextGL;
    var textureRef = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textureRef);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return textureRef;
  }
  /**
   * Draw picture data to the canvas.
   * If this object is using WebGL, the data must be an I420 formatted ArrayBuffer,
   * Otherwise, data must be an RGBA formatted ArrayBuffer.
   */


  drawNextOutputPicture(width, height, croppingParams, data) {
    var gl = this.contextGL;

    if (gl) {
      this.drawNextOuptutPictureGL(width, height, croppingParams, data);
    } else {
      this.drawNextOuptutPictureRGBA(width, height, croppingParams, data);
    }
  }
  /**
   * Draw next output picture using ARGB data on a 2d canvas.
   */


  drawNextOuptutPictureRGBA(width, height, croppingParams, data) {
    var canvas = this.canvasElement;
    var argbData = data;
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, width, height);
    imageData.data.set(argbData);

    if (croppingParams === null) {
      ctx.putImageData(imageData, 0, 0);
    } else {
      ctx.putImageData(imageData, -croppingParams.left, -croppingParams.top, 0, 0, croppingParams.width, croppingParams.height);
    }
  }

  resize(width, height) {
    this.canvasElement.width = width;
    this.canvasElement.height = height;
    this.width = width;
    this.height = height;
  }

}

/* harmony default export */ var video_YUVCanvas = (YUVCanvas);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/osh/utils/Utils.js
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

/** * @module Utils */

/** Maximum value of a long */
const MAX_LONG = Math.pow(2, 53) + 1;
/**
 * Global helper method to test if a letiable or object attribute is defined
 */

function isDefined(v) {
  return typeof v !== 'undefined' && v !== null;
}
/**
 Global helper method to test if a letiable or object attribute has a value,
 that is it is defined and non null
 */

function hasValue(v) {
  return isDefined(v) && v !== null;
}
/**
 Global helper method to test if a letiable or object attribute is of a particular type
 */

function hasType(v, expectedType) {
  let hasVal = hasValue(v);
  return hasVal && typeof v === expectedType;
}
/**
 Global helper method to test if a letiable or object attribute is an object
 */

function isObject(v, letName) {
  return hasType(v, 'object', letName);
}
/**
 Global helper method to test if a letiable or object attribute is an array
 */

function isArray(v) {
  return isDefined(v) && Array.isArray(v);
}
/**
 Global helper method to test if a letiable or object attribute is a function
 */

function isFunction(v, letName) {
  return hasType(v, 'function', letName);
}
/**
 Assert that a letiable or object attribute is defined
 **/

function assertDefined(v, letName = 'letiable') {
  if (!isDefined(v)) {
    throw letName + " must be defined";
  }

  return v;
}
/**
 Assert that a letiable or object attribute is defined and non-null
 **/

function assertType(v, expectedType, letName = 'letiable') {
  assertDefined(v, letName);

  if (typeof v !== expectedType) {
    throw letName + " must be of type " + expectedType;
  }

  return v;
}
/**
 Assert that a letiable or object attribute is a string
 **/

function assertBoolean(v, letName) {
  return assertType(v, 'boolean', letName);
}
/**
 Assert that a letiable or object attribute is a string
 **/

function assertString(v, letName) {
  return assertType(v, 'string', letName);
}
/**
 Assert that a letiable or object attribute is a number
 **/

function assertNumber(v, letName) {
  return assertType(v, 'number', letName);
}
/**
 Assert that a letiable or object attribute is a number
 **/

function assertPositive(v, letName) {
  assertNumber(v, letName);

  if (v <= 0) {
    throw letName + " must be a positive number";
  }
}
/**
 Assert that a letiable or object attribute is an object
 **/

function assertObject(v, letName) {
  return assertType(v, 'object', letName);
}
/**
 Assert that a letiable or object attribute is an object
 **/

function assertArray(v, letName = 'letiable') {
  assertDefined(v, letName);

  if (!Array.isArray(v)) {
    throw letName + " must be an array";
  }

  return v;
}
/**
 Assert that a letiable or object attribute is a function
 **/

function assertFunction(v, letName) {
  return assertType(v, 'function', letName);
}
/**
 Assert that a letiable or object attribute is defined and non-null
 **/

function assertHasValue(v, letName = 'letiable') {
  assertDefined(v, letName);

  if (!hasValue(v)) {
    throw letName + " must not be null";
  }

  return v;
}
/**
 *
 * @return {String}
 */

function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/**
 * This function stamps/embeds a UUID into an object and returns the UUID generated for it
 * @return {String}
 */

function stampUUID(obj) {
  obj._osh_id = obj._osh_id || randomUUID();
  return obj._osh_id;
} //buffer is an ArrayBuffer object, the offset if specified in bytes, and the type is a string
//corresponding to an OGC data type.
//See http://def.seegrid.csiro.au/sissvoc/ogc-def/resource?uri=http://www.opengis.net/def/dataType/OGC/0/

/**
 *
 * @param buffer
 * @param offset
 * @param type
 * @return {*}
 */

function ParseBytes(buffer, offset, type) {
  let view = new DataView(buffer); //Note: There exist types not listed in the map below that have OGC definitions, but no appropriate
  //methods or corresponding types available for parsing in javascript. They are float128, float16, signedLong,
  //and unsignedLong

  let typeMap = {
    double: function (offset) {
      return {
        val: view.getFloat64(offset),
        bytes: 8
      };
    },
    float64: function (offset) {
      return {
        val: view.getFloat64(offset),
        bytes: 8
      };
    },
    float32: function (offset) {
      return {
        val: view.getFloat32(offset),
        bytes: 4
      };
    },
    signedByte: function (offset) {
      return {
        val: view.getInt8(offset),
        bytes: 1
      };
    },
    signedInt: function (offset) {
      return {
        val: view.getInt32(offset),
        bytes: 4
      };
    },
    signedShort: function (offset) {
      return {
        val: view.getInt16(offset),
        bytes: 2
      };
    },
    unsignedByte: function (offset) {
      return {
        val: view.getUint8(offset),
        bytes: 1
      };
    },
    unsignedInt: function (offset) {
      return {
        val: view.getUint32(offset),
        bytes: 4
      };
    },
    unsignedShort: function (offset) {
      return {
        val: view.getUint16(offset),
        bytes: 2
      };
    } //TODO: string-utf-8:

  };
  return typeMap[type](offset);
} //This function recursivley iterates over the resultStructure to fill in
//values read from data which should be an ArrayBuffer containing the payload from a websocket

/**
 *
 * @param struct
 * @param data
 * @param offsetBytes
 * @return {*}
 */

function ReadData(struct, data, offsetBytes) {
  let offset = offsetBytes;

  for (let i = 0; i < struct.fields.length; i++) {
    let currFieldStruct = struct.fields[i];

    if (isDefined(currFieldStruct.type) && currFieldStruct.type !== null) {
      let ret = ParseBytes(data, offset, currFieldStruct.type);
      currFieldStruct.val = ret.val;
      offset += ret.bytes;
    } else if (isDefined(currFieldStruct.count) && currFieldStruct.count !== null) {
      //check if count is a reference to another letiable
      if (isNaN(currFieldStruct.count)) {
        let id = currFieldStruct.count;
        let fieldName = struct.id2FieldMap[id];
        currFieldStruct.count = struct.findFieldByName(fieldName).val;
      }

      for (let c = 0; c < currFieldStruct.count; c++) {
        for (let j = 0; j < currFieldStruct.fields.length; j++) {
          let field = JSON.parse(JSON.stringify(currFieldStruct.fields[j]));
          offset = ReadData(field, data, offset);
          currFieldStruct.val.push(field);
        }
      }
    }
  }

  return offset;
}
/**
 *
 * @param resultStructure
 * @return {{}}
 */

function GetResultObject(resultStructure) {
  //TODO: handle cases for nested arrays / matrix data types
  let result = {};

  for (let i = 0; i < resultStructure.fields.length; i++) {
    if (isDefined(resultStructure.fields[i].count)) {
      result[resultStructure.fields[i].name] = [];

      for (let c = 0; c < resultStructure.fields[i].count; c++) {
        let item = {};

        for (let k = 0; k < resultStructure.fields[i].val[c].fields.length; k++) {
          item[resultStructure.fields[i].val[c].fields[k].name] = resultStructure.fields[i].val[c].fields[k].val;
        }

        result[resultStructure.fields[i].name].push(item);
      }
    } else {
      result[resultStructure.fields[i].name] = resultStructure.fields[i].val;
    }
  }

  return result;
}
/**
 *
 * @return {boolean}
 */

function isOpera() {
  return !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
}
/**
 *
 * @return {boolean}
 */

function isFirefox() {
  return typeof InstallTrigger !== 'undefined';
}
/**
 *
 * @return {boolean}
 */

function isSafari() {
  return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
}
/**
 *
 * @return {boolean}
 */

function isChrome() {
  return !!window.chrome && !!window.chrome.webstore;
}
/**
 *
 * @return {*|boolean}
 */

function isBlink() {
  return (isChrome || isOpera) && !!window.CSS;
}
/**
 *
 * @param a
 * @param b
 * @return {boolean}
 */

function isArrayIntersect(a, b) {
  return a.filter(function (element) {
    return b.indexOf(element) > -1;
  }).length > 0;
}
/**
 *
 * @param o
 * @return {boolean}
 */

function isElement(o) {
  return typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
  o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
}
/**
 *
 * @return {*}
 */

function isWebWorker() {
  return isDefined(Worker);
}
/**
 *
 * @param div
 */

function takeScreenShot(div) {}
/**
 * Remove a css class from a the div given as argument.
 * @param div the div to remove the class from
 * @param css the css class to remove
 */

function removeCss(div, css) {
  let divCss = div.className;
  css = divCss.replace(css, "");
  div.className = css;
}
/**
 * Add a css class to a the div given as argument.
 * @param div the div to add the class to
 * @param css the css class to add
 */

function addCss(div, css) {
  div.setAttribute("class", div.className + " " + css);
}
/**
 * Removes the last character of a {string} object.
 * @param {string} value - The input {string}
 * @return {string} The value without the last character
 */

function removeLastCharIfExist(value) {
  if (!isDefined(undefined) || value === null || value.length === 0 || !value.endsWith("/")) {
    return value;
  }

  return value.substring(0, value.length - 1);
}
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/osh/Constants.js
const DATA_SYNCHRONIZER_TOPIC = 'data-synchronizer-';
const DATASOURCE_DATA_TOPIC = 'datasource-data-';
const FFMPEG_VIEW_DECODE_TOPIC = 'ffmpeg-decode-';
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/osh/ui/view/video/workers/ffmpeg.draw.worker.js




let bc;

self.buffer = [];

self.onmessage = (e) => {
    self.framerate =  e.data.framerate;
    self.yuvCanvas  = new video_YUVCanvas({
        width: e.data.width,
        height: e.data.height,
        contextOptions: {preserveDrawingBuffer: true},
        canvas: e.data.canvas
    });

   bc = new BroadcastChannel(FFMPEG_VIEW_DECODE_TOPIC+e.data.dataSourceId);

    bc.onmessage = (e) => {
        self.buffer.push(e.data);
    };
};

function display(e) {
    if(isDefined(self.yuvCanvas)) {
        // update canvas size if frame size are changing
        if(self.yuvCanvas.width !== e.width || self.yuvCanvas.height !== e.height) {
            //re-create the canvas
            self.yuvCanvas.resize(e.width, e.height);
        }

        self.yuvCanvas.drawNextOuptutPictureGL({
            yData: e.yData,
            yDataPerRow: e.yDataPerRow,
            yRowCnt: e.yRowCnt,
            uData: e.uData,
            uDataPerRow: e.uDataPerRow,
            uRowCnt: e.uRowCnt,
            vData: e.vData,
            vDataPerRow: e.vDataPerRow,
            vRowCnt: e.vRowCnt,
            roll: e.roll
        });
    }
}

setInterval(() => {
    if (buffer.length > 1) {
        display(buffer.shift());
    }
}, 1000 / self.framerate);

function ffmpeg_draw_worker_reset() {
// clear canvas
    let nodata = new Uint8Array(1);
    self.yuvCanvas.drawNextOuptutPictureGL({
        yData: nodata,
        yDataPerRow: 1,
        yRowCnt: 1,
        uData: nodata,
        uDataPerRow: 1,
        uRowCnt: 1,
        vData: nodata,
        vDataPerRow: 1,
        vRowCnt: 1
    });
}


/***/ })
/******/ ]);