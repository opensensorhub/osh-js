import YUVCanvas from './YUVCanvas';

export const Projection = Object.freeze({
	EQUIRECTANGULAR : 0,
	DUAL_FISHEYE    : 1,
	CUBEMAP_3X2     : 2,
	SINGLE_FISHEYE  : 3,
});

const PROJECTION_MAP = {
	'equirectangular': Projection.EQUIRECTANGULAR,
	'dual_fisheye':    Projection.DUAL_FISHEYE,
	'cubemap':         Projection.CUBEMAP_3X2,
	'single_fisheye':  Projection.SINGLE_FISHEYE,
};

const PROJECTION_GLSL = `
// ── Equirectangular ──────────────────────────────────────────────────────────
vec2 equirectUV(vec3 dir) {
    float lon = atan(dir.z, dir.x);
    float lat = asin(clamp(dir.y, -1.0, 1.0));
    return vec2(
        lon / (2.0 * PI) + 0.5,
        1.0 - (lat / PI + 0.5)
    );
}

// ── Single fisheye ───────────────────────────────────────────────────────────
vec2 singleFisheyeUV(vec3 dir, float fovRad) {
    float theta = acos(clamp(dir.z, -1.0, 1.0));
    float r     = clamp(theta / fovRad, 0.0, 1.0);
    float phi   = atan(dir.y, dir.x);
    return vec2(
        cos(phi) * r * 0.5 + 0.5,
        1.0 - (sin(phi) * r * 0.5 + 0.5)
    );
}

// ── Dual fisheye ─────────────────────────────────────────────────────────────
vec2 dualFisheyeUV(vec3 dir, float fovRad) {
    bool front  = dir.z < 0.0;
    float theta = acos(clamp(front ? -dir.z : dir.z, 0.0, 1.0));
    float r     = clamp(theta / fovRad, 0.0, 1.0);
    float phi   = atan(dir.y, front ? dir.x : -dir.x);
    vec2  circle  = vec2(cos(phi) * r * 0.25, sin(phi) * r * 0.5);
    float xOffset = front ? 0.25 : 0.75;
    return vec2(circle.x + xOffset, 1.0 - (circle.y + 0.5));
}

// ── Cubemap 3x2 ──────────────────────────────────────────────────────────────
// FFmpeg c3x2 default face order: rludfb
//   Row 0: RIGHT(0)  LEFT(1)   DOWN(2)
//   Row 1: UP(3)     BACK(4)  FRONT(5)
void cubeSelect(vec3 dir, out int face, out float fu, out float fv) {
    vec3 a = abs(dir);

    if (a.z >= a.x && a.z >= a.y) {
        if (dir.z > 0.0) {
            face = 5;                        // FRONT (+Z)
            fu   = -dir.x / a.z;
            fv   = -dir.y / a.z;
        } else {
            face = 4;                        // BACK (-Z)
            fu   =  dir.x / a.z;
            fv   = -dir.y / a.z;
        }
    } else if (a.x >= a.y) {
        if (dir.x > 0.0) {
            face = 0;                        // RIGHT (+X)
            fu   =  dir.z / a.x;
            fv   = -dir.y / a.x;
        } else {
            face = 1;                        // LEFT (-X)
            fu   = -dir.z / a.x;
            fv   = -dir.y / a.x;
        }
    } else {
        if (dir.y < 0.0) {
            face = 3;                        // UP
            fu   =  dir.x / a.y;
            fv   =  dir.z / a.y;
        } else {
            face = 2;                        // DOWN
            fu   =  dir.x / a.y;
            fv   = -dir.z / a.y;
        }
    }
}

vec2 atlasUV_3x2(int face, float fu, float fv) {
    vec2  uv  = vec2(fu, fv) * 0.5 + 0.5;
    float col = float(face < 3 ? face : face - 3);
    float row = float(face < 3 ? 0    : 1);
    return vec2((col + uv.x) / 3.0, (row + uv.y) / 2.0);
}

vec2 cubemapUV(vec3 dir) {
    int face; float fu, fv;
    cubeSelect(dir, face, fu, fv);
    return atlasUV_3x2(face, fu, fv);
}
`;

function buildFragSrc420() {
	return `
precision highp float;
const float PI = 3.14159265358979323846;

varying highp vec3 vDir;

uniform sampler2D ySampler;
uniform sampler2D uSampler;
uniform sampler2D vSampler;
uniform mat4      YUV2RGB;

uniform int   uProjection;
uniform float uFisheyeFovRad;

${PROJECTION_GLSL}

void main(void) {
    vec3 dir = normalize(vDir);
    vec2 uv;

    if      (uProjection == 0) uv = equirectUV(dir);
    else if (uProjection == 1) uv = dualFisheyeUV(dir, uFisheyeFovRad);
    else if (uProjection == 2) uv = cubemapUV(dir);
    else if (uProjection == 3) uv = singleFisheyeUV(dir, uFisheyeFovRad);
    else                       uv = equirectUV(dir);

    float y = texture2D(ySampler, uv).r;
    float u = texture2D(uSampler, uv).r;
    float v = texture2D(vSampler, uv).r;
    gl_FragColor = vec4(y, u, v, 1.0) * YUV2RGB;
}`;
}

function buildFragSrc422() {
	return `
precision highp float;
const float PI = 3.14159265358979323846;

varying highp vec3 vDir;

uniform sampler2D   sampler;
uniform highp vec2  resolution;
uniform mat4        YUV2RGB;

uniform int   uProjection;
uniform float uFisheyeFovRad;

${PROJECTION_GLSL}

void main(void) {
    vec3 dir = normalize(vDir);
    vec2 uv;

    if      (uProjection == 0) uv = equirectUV(dir);
    else if (uProjection == 1) uv = dualFisheyeUV(dir, uFisheyeFovRad);
    else if (uProjection == 2) uv = cubemapUV(dir);
    else if (uProjection == 3) uv = singleFisheyeUV(dir, uFisheyeFovRad);
    else                       uv = equirectUV(dir);

    float texPixX     = 1.0 / resolution.x;
    float logPixX     = 2.0 / resolution.x;
    float logHalfPixX = 4.0 / resolution.x;
    float steps   = floor(uv.x / logPixX);
    float uvSteps = floor(uv.x / logHalfPixX);
    float y = texture2D(sampler, vec2(logPixX * steps + texPixX,            uv.y)).r;
    float u = texture2D(sampler, vec2(logHalfPixX * uvSteps,                uv.y)).r;
    float v = texture2D(sampler, vec2(logHalfPixX * uvSteps + 2.0*texPixX,  uv.y)).r;
    gl_FragColor = vec4(y, u, v, 1.0) * YUV2RGB;
}`;
}

const VERT_SRC = `
attribute vec3 vertexPos;
uniform mat4 MVP;
varying highp vec3 vDir;

void main() {
    gl_Position = MVP * vec4(vertexPos, 1.0);
    vDir = vertexPos;
}`;

class YUV360Canvas extends YUVCanvas {

	/**
	 * @param {object}  parOptions
	 *
	 * Viewing camera:
	 * @param {number}  [parOptions.initialYaw=0]      Initial yaw in radians
	 * @param {number}  [parOptions.initialPitch=0]    Initial pitch in radians
	 * @param {number}  [parOptions.fov=75]            Viewer field of view in degrees
	 *
	 * Source projection:
	 * @param {string}  [parOptions.projection='equirectangular']
	 *     One of: 'equirectangular', 'dual_fisheye', 'cubemap', 'single_fisheye'
	 *
	 * Fisheye lens parameters (dual_fisheye and single_fisheye only):
	 * @param {number}  [parOptions.fisheyeFovDeg=204]
	 *     Full field of view of each fisheye lens in degrees.
	 *     204° is the empirical value for the Insta360 X-series.
	 *     This is the lens FOV, not the viewer FOV.
	 */
	constructor(parOptions) {
		parOptions = parOptions || {};
		super(parOptions);

		this.yaw    = parOptions.initialYaw   != null ? parOptions.initialYaw   : 0;
		this.pitch  = parOptions.initialPitch != null ? parOptions.initialPitch : 0;
		this.fovDeg = parOptions.fov          != null ? parOptions.fov          : 75;

		this.projection = PROJECTION_MAP[parOptions.projection] ?? Projection.EQUIRECTANGULAR;

		const fullFovDeg   = parOptions.fisheyeFovDeg != null ? parOptions.fisheyeFovDeg : 204;
		this.fisheyeFovRad = (fullFovDeg / 2) * (Math.PI / 180);

		this._initCameraControls();
	}

	dispose() {
		if (this._domListeners) {
			for (const { target, type, handler, options } of this._domListeners) {
				target.removeEventListener(type, handler, options);
			}
			this._domListeners = [];
		}

		const gl = this.contextGL;
		if (gl) {
			gl.getExtension('WEBGL_lose_context')?.loseContext();
			this.contextGL = null;
		}
	}

	// ─────────────────────────────────────────────────────────────────────────
	// Public API
	// ─────────────────────────────────────────────────────────────────────────

	/**
	 * Switch the source projection at runtime.
	 * @param {string|number} projection  String key or Projection.* constant
	 */
	setProjection(projection) {
		this.projection = typeof projection === 'string'
			? (PROJECTION_MAP[projection] ?? Projection.EQUIRECTANGULAR)
			: projection;
		this._uploadProjectionUniforms();
	}

	/**
	 * Update the fisheye lens FOV (full angle in degrees).
	 * @param {number} fullFovDeg  Full lens FOV in degrees (e.g. 204 for Insta360)
	 */
	setFisheyeFov(fullFovDeg) {
		this.fisheyeFovRad = (fullFovDeg / 2) * (Math.PI / 180);
		this._uploadProjectionUniforms();
	}

	// ─────────────────────────────────────────────────────────────────────────
	// Core init overrides
	// ─────────────────────────────────────────────────────────────────────────

	init() {
		this.initContextGL();

		if (this.contextGL) {
			this.initProgram();
			this.initBuffers();
			this.initTextures();
		}

		if (this.type === 'yuv420') {
			this.drawNextOutputPictureGL = (par) => this._drawYUV420(par);
		} else if (this.type === 'yuv422') {
			this.drawNextOutputPictureGL = (par) => this._drawYUV422(par);
		}
	}

	initProgram() {
		const gl = this.contextGL;

		const fragSrc = this.type === 'yuv420' ? buildFragSrc420() : buildFragSrc422();

		let YUV2RGB;
		if (this.conversionType === 'rec709') {
			YUV2RGB = [
				1.16438,  0.00000,  1.79274, -0.97295,
				1.16438, -0.21325, -0.53291,  0.30148,
				1.16438,  2.11240,  0.00000, -1.13340,
				0, 0, 0, 1,
			];
		} else {
			YUV2RGB = [
				1.16438,  0.00000,  1.59603, -0.87079,
				1.16438, -0.39176, -0.81297,  0.52959,
				1.16438,  2.01723,  0.00000, -1.08139,
				0, 0, 0, 1,
			];
		}

		const vert = this._compileShader(gl.VERTEX_SHADER,   VERT_SRC);
		const frag = this._compileShader(gl.FRAGMENT_SHADER, fragSrc);

		const program = gl.createProgram();
		gl.attachShader(program, vert);
		gl.attachShader(program, frag);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('YUV360Canvas: program link error —',
				gl.getProgramInfoLog(program));
		}

		gl.useProgram(program);

		gl.uniformMatrix4fv(
			gl.getUniformLocation(program, 'YUV2RGB'), false, YUV2RGB);

		this.mvpUniform        = gl.getUniformLocation(program, 'MVP');
		this.projectionUniform = gl.getUniformLocation(program, 'uProjection');
		this.fisheyeFovUniform = gl.getUniformLocation(program, 'uFisheyeFovRad');
		this.shaderProgram     = program;

		this._uploadProjectionUniforms();
	}

	initBuffers() {
		const gl      = this.contextGL;
		const program = this.shaderProgram;

		const LAT_BANDS  = 32;
		const LONG_BANDS = 64;

		const { positions, texCoords, indices } = this._buildSphere(LAT_BANDS, LONG_BANDS);
		this.sphereIndexCount = indices.length;

		const posBuf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		const posLoc = gl.getAttribLocation(program, 'vertexPos');
		gl.enableVertexAttribArray(posLoc);
		gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

		const uvBuf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

		const idxBuf = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		this.sphereIndexBuffer = idxBuf;
	}

	initTexture() {
		const gl         = this.contextGL;
		const textureRef = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, textureRef);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,     gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,     gl.CLAMP_TO_EDGE);
		gl.bindTexture(gl.TEXTURE_2D, null);
		return textureRef;
	}

	// ─────────────────────────────────────────────────────────────────────────
	// Per-frame draw
	// ─────────────────────────────────────────────────────────────────────────

	_drawYUV420(par) {
		const gl = this.contextGL;
		const { yData, uData, vData } = par;
		const width  = this.width;
		const height = this.height;

		const yDataPerRow = par.yDataPerRow || width;
		const yRowCnt     = par.yRowCnt     || height;
		const uDataPerRow = par.uDataPerRow || (width  / 2);
		const uRowCnt     = par.uRowCnt     || (height / 2);
		const vDataPerRow = par.vDataPerRow || uDataPerRow;
		const vRowCnt     = par.vRowCnt     || uRowCnt;

		gl.viewport(0, 0, this.canvasElement.width, this.canvasElement.height);
		gl.clearColor(0, 0, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.yTextureRef);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE,
			yDataPerRow, yRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, yData);

		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, this.uTextureRef);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE,
			uDataPerRow, uRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uData);

		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, this.vTextureRef);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE,
			vDataPerRow, vRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vData);

		gl.uniformMatrix4fv(this.mvpUniform, false, this._computeMVP());

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sphereIndexBuffer);
		gl.drawElements(gl.TRIANGLES, this.sphereIndexCount, gl.UNSIGNED_SHORT, 0);
	}

	_drawYUV422(par) {
		const gl = this.contextGL;
		const { data } = par;
		const width      = this.width;
		const height     = this.height;
		const dataPerRow = par.dataPerRow || (width * 2);
		const rowCnt     = par.rowCnt     || height;

		gl.viewport(0, 0, this.canvasElement.width, this.canvasElement.height);
		gl.clearColor(0, 0, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);

		gl.uniform2f(
			gl.getUniformLocation(this.shaderProgram, 'resolution'),
			dataPerRow, height);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.textureRef);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE,
			dataPerRow, rowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);

		gl.uniformMatrix4fv(this.mvpUniform, false, this._computeMVP());

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sphereIndexBuffer);
		gl.drawElements(gl.TRIANGLES, this.sphereIndexCount, gl.UNSIGNED_SHORT, 0);
	}

	// ─────────────────────────────────────────────────────────────────────────
	// Projection uniforms
	// ─────────────────────────────────────────────────────────────────────────

	_uploadProjectionUniforms() {
		const gl = this.contextGL;
		if (!gl || !this.shaderProgram) return;
		gl.useProgram(this.shaderProgram);
		gl.uniform1i(this.projectionUniform, this.projection);
		gl.uniform1f(this.fisheyeFovUniform, this.fisheyeFovRad);
	}

	// ─────────────────────────────────────────────────────────────────────────
	// Sphere mesh
	// ─────────────────────────────────────────────────────────────────────────

	_buildSphere(latBands, longBands) {
		const positions = [];
		const texCoords = [];
		const indices   = [];

		for (let lat = 0; lat <= latBands; lat++) {
			const theta    = (lat / latBands) * Math.PI;
			const sinTheta = Math.sin(theta);
			const cosTheta = Math.cos(theta);

			for (let lon = 0; lon <= longBands; lon++) {
				const phi    = (lon / longBands) * 2 * Math.PI;
				const sinPhi = Math.sin(phi);
				const cosPhi = Math.cos(phi);

				positions.push(cosPhi * sinTheta, cosTheta, sinPhi * sinTheta);
				texCoords.push(1 - lon / longBands, lat / latBands);
			}
		}

		for (let lat = 0; lat < latBands; lat++) {
			for (let lon = 0; lon < longBands; lon++) {
				const a = lat       * (longBands + 1) + lon;
				const b = a + 1;
				const c = (lat + 1) * (longBands + 1) + lon;
				const d = c + 1;
				indices.push(a, c, b);
				indices.push(b, c, d);
			}
		}

		return { positions, texCoords, indices };
	}

	// ─────────────────────────────────────────────────────────────────────────
	// Camera & MVP
	// ─────────────────────────────────────────────────────────────────────────

	_computeMVP() {
		const fov    = ((this.fovDeg != null ? this.fovDeg : 75) * Math.PI) / 180;
		const aspect = this.canvasElement.width / (this.canvasElement.height || 1);
		const yaw    = this.yaw   || 0;
		const pitch  = this.pitch || 0;

		const proj = this._mat4Perspective(fov, aspect, 0.1, 100);
		const view = this._mat4Mul(
			this._mat4RotX(-pitch),
			this._mat4RotY(-yaw)
		);
		return this._mat4Mul(proj, view);
	}

	// ─────────────────────────────────────────────────────────────────────────
	// Camera controls
	// ─────────────────────────────────────────────────────────────────────────

	_initCameraControls() {
		const canvas    = this.canvasElement;
		const DRAG_SENS = 0.003;

		let dragging = false;
		let lastX    = 0;
		let lastY    = 0;

		this._domListeners = [];

		const add = (target, type, handler, options) => {
			target.addEventListener(type, handler, options);
			this._domListeners.push({ target, type, handler, options });
		};

		const onDragStart = (x, y) => { dragging = true; lastX = x; lastY = y; };
		const onDragMove  = (x, y) => {
			if (!dragging) return;
			const dx = x - lastX;
			const dy = y - lastY;
			lastX = x;
			lastY = y;
			this.yaw  += dx * DRAG_SENS;
			this.pitch = Math.max(-Math.PI / 2,
				Math.min(Math.PI / 2, this.pitch + dy * DRAG_SENS));
		};
		const onDragEnd = () => { dragging = false; };

		const onWheel = (e) => {
			e.preventDefault();
			this.fovDeg = Math.max(30, Math.min(120, this.fovDeg + e.deltaY * 0.05));
		};

		const onTouchStart = (e) => {
			if (e.touches.length === 1) { e.preventDefault(); onDragStart(e.touches[0].clientX, e.touches[0].clientY); }
		};

		const onTouchMove = (e) => {
			if (e.touches.length === 1) { e.preventDefault(); onDragMove(e.touches[0].clientX, e.touches[0].clientY); }
		};

		let lastPinchDist = null;
		const onTouchPinchStart = (e) => {
			if (e.touches.length === 2) lastPinchDist = this._pinchDist(e.touches);
		};

		const onTouchPinchMove = (e) => {
			if (e.touches.length === 2 && lastPinchDist !== null) {
				const dist  = this._pinchDist(e.touches);
				this.fovDeg = Math.max(30, Math.min(120, this.fovDeg - (dist - lastPinchDist) * 0.1));
				lastPinchDist = dist;
			}
		};

		const onTouchPinchEnd = () => { lastPinchDist = null; };

		/*
		canvas.addEventListener('wheel', (e) => {
			e.preventDefault();
			this.fovDeg = Math.max(30, Math.min(120, this.fovDeg + e.deltaY * 0.05));
		}, { passive: false });

		canvas.addEventListener('touchstart', (e) => {
			if (e.touches.length === 1) { e.preventDefault(); onDragStart(e.touches[0].clientX, e.touches[0].clientY); }
		}, { passive: false });
		window.addEventListener('touchmove', (e) => {
			if (e.touches.length === 1) { e.preventDefault(); onDragMove(e.touches[0].clientX, e.touches[0].clientY); }
		}, { passive: false });
		window.addEventListener('touchend', onDragEnd);

		//let lastPinchDist = null;
		canvas.addEventListener('touchstart', (e) => {
			if (e.touches.length === 2) lastPinchDist = this._pinchDist(e.touches);
		}, { passive: true });
		canvas.addEventListener('touchmove', (e) => {
			if (e.touches.length === 2 && lastPinchDist !== null) {
				const dist  = this._pinchDist(e.touches);
				this.fovDeg = Math.max(30, Math.min(120, this.fovDeg - (dist - lastPinchDist) * 0.1));
				lastPinchDist = dist;
			}
		}, { passive: true });
		canvas.addEventListener('touchend',    () => { lastPinchDist = null; });
		canvas.addEventListener('touchcancel', () => { lastPinchDist = null; });

		 */


		add(canvas, 'mousedown', (e) => onDragStart(e.clientX, e.clientY));
		add(window, 'mousemove', (e) => onDragMove(e.clientX, e.clientY));
		add(window, 'mouseup',   onDragEnd);
		add(canvas, 'wheel', onWheel, { passive: false });
		add(canvas, 'touchstart', onTouchStart, { passive: false });
		add(window, 'touchmove', onTouchMove, { passive: false });
		add(window, 'touchend', onDragEnd);
		add(canvas, 'touchstart', onTouchPinchStart, { passive: true });
		add(canvas, 'touchmove', onTouchPinchMove, { passive: true });
		add(canvas, 'touchend',    onTouchPinchEnd);
		add(canvas, 'touchcancel', onTouchPinchEnd);
	}

	_pinchDist(touches) {
		const dx = touches[0].clientX - touches[1].clientX;
		const dy = touches[0].clientY - touches[1].clientY;
		return Math.sqrt(dx * dx + dy * dy);
	}

	// ─────────────────────────────────────────────────────────────────────────
	// Matrix helpers
	// ─────────────────────────────────────────────────────────────────────────

	_mat4Perspective(fov, aspect, near, far) {
		const f  = 1 / Math.tan(fov / 2);
		const nf = 1 / (near - far);
		return new Float32Array([
			f / aspect, 0, 0,                  0,
			0,          f, 0,                  0,
			0,          0, (far + near) * nf, -1,
			0,          0, 2*far*near*nf,      0,
		]);
	}

	_mat4RotY(a) {
		const c = Math.cos(a), s = Math.sin(a);
		return new Float32Array([ c, 0, -s, 0,  0, 1, 0, 0,  s, 0, c, 0,  0, 0, 0, 1 ]);
	}

	_mat4RotX(a) {
		const c = Math.cos(a), s = Math.sin(a);
		return new Float32Array([ 1, 0, 0, 0,  0, c, s, 0,  0, -s, c, 0,  0, 0, 0, 1 ]);
	}

	_mat4Mul(a, b) {
		const out = new Float32Array(16);
		for (let col = 0; col < 4; col++)
			for (let row = 0; row < 4; row++) {
				let sum = 0;
				for (let k = 0; k < 4; k++) sum += a[k*4+row] * b[col*4+k];
				out[col*4+row] = sum;
			}
		return out;
	}

	_compileShader(type, src) {
		const gl     = this.contextGL;
		const shader = gl.createShader(type);
		gl.shaderSource(shader, src);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			const label = type === gl.VERTEX_SHADER ? 'Vertex' : 'Fragment';
			console.error(`YUV360Canvas: ${label} shader compile error —`,
				gl.getShaderInfoLog(shader));
		}
		return shader;
	}
}

export default YUV360Canvas;