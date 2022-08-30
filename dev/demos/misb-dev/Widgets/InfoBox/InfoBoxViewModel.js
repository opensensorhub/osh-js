import defined from"../../Core/defined.js";import Event from"../../Core/Event.js";import knockout from"../../ThirdParty/knockout.js";var cameraEnabledPath="M 13.84375 7.03125 C 11.412798 7.03125 9.46875 8.975298 9.46875 11.40625 L 9.46875 11.59375 L 2.53125 7.21875 L 2.53125 24.0625 L 9.46875 19.6875 C 9.4853444 22.104033 11.423165 24.0625 13.84375 24.0625 L 25.875 24.0625 C 28.305952 24.0625 30.28125 22.087202 30.28125 19.65625 L 30.28125 11.40625 C 30.28125 8.975298 28.305952 7.03125 25.875 7.03125 L 13.84375 7.03125 z",cameraDisabledPath="M 27.34375 1.65625 L 5.28125 27.9375 L 8.09375 30.3125 L 30.15625 4.03125 L 27.34375 1.65625 z M 13.84375 7.03125 C 11.412798 7.03125 9.46875 8.975298 9.46875 11.40625 L 9.46875 11.59375 L 2.53125 7.21875 L 2.53125 24.0625 L 9.46875 19.6875 C 9.4724893 20.232036 9.5676108 20.7379 9.75 21.21875 L 21.65625 7.03125 L 13.84375 7.03125 z M 28.21875 7.71875 L 14.53125 24.0625 L 25.875 24.0625 C 28.305952 24.0625 30.28125 22.087202 30.28125 19.65625 L 30.28125 11.40625 C 30.28125 9.8371439 29.456025 8.4902779 28.21875 7.71875 z";function InfoBoxViewModel(){this._cameraClicked=new Event,this._closeClicked=new Event,this.maxHeight=500,this.enableCamera=!1,this.isCameraTracking=!1,this.showInfo=!1,this.titleText="",this.description="",knockout.track(this,["showInfo","titleText","description","maxHeight","enableCamera","isCameraTracking"]),this._loadingIndicatorHtml='<div class="cesium-infoBox-loadingContainer"><span class="cesium-infoBox-loading"></span></div>',this.cameraIconPath=void 0,knockout.defineProperty(this,"cameraIconPath",{get:function(){return!this.enableCamera||this.isCameraTracking?cameraDisabledPath:cameraEnabledPath}}),knockout.defineProperty(this,"_bodyless",{get:function(){return!defined(this.description)||0===this.description.length}})}InfoBoxViewModel.prototype.maxHeightOffset=function(e){return this.maxHeight-e+"px"},Object.defineProperties(InfoBoxViewModel.prototype,{cameraClicked:{get:function(){return this._cameraClicked}},closeClicked:{get:function(){return this._closeClicked}}});export default InfoBoxViewModel;