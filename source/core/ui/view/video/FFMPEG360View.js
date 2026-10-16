import FFMPEGView from './FFMPEGView';
import YUV360Canvas from './YUV360Canvas';

class FFMPEG360View extends FFMPEGView {
	constructor(properties) {
		super(properties);
		this.fisheyeFovDeg = properties?.props360?.fisheyeFovDeg ?? 204;
		this.projection = properties?.props360?.projection ?? 'equirectangular';
		this.canvas360.setProjection(this.projection);
		this.canvas360.setFisheyeFov(this.fisheyeFovDeg);
	}

	get canvas360() {
		return /** @type {YUV360Canvas} */ (this.yuvCanvas);
	}

	createCanvas(width, height, style){
		return new YUV360Canvas({width: width, height: height, fisheyeFovDeg: this.fisheyeFovDeg, projection: this.projection, contextOptions: {preserveDrawingBuffer: true}});
	}

	setFisheyeFov(fullFovDeg) {
		this.fisheyeFovDeg = fullFovDeg;
		if (this.yuvCanvas) this.canvas360.setFisheyeFov(fullFovDeg);
	}

	setProjection(projection) {
		this.projection = projection;
		if (this.yuvCanvas) this.canvas360.setProjection(projection);
	}

	destroy() {
		this.canvas360?.dispose();
		super.destroy();
	}
}

export default FFMPEG360View;