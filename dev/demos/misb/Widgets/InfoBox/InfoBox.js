import buildModuleUrl from"../../Core/buildModuleUrl.js";import Check from"../../Core/Check.js";import Color from"../../Core/Color.js";import defined from"../../Core/defined.js";import destroyObject from"../../Core/destroyObject.js";import knockout from"../../ThirdParty/knockout.js";import getElement from"../getElement.js";import subscribeAndEvaluate from"../subscribeAndEvaluate.js";import InfoBoxViewModel from"./InfoBoxViewModel.js";function InfoBox(e){Check.defined("container",e),e=getElement(e);var t=document.createElement("div");t.className="cesium-infoBox",t.setAttribute("data-bind",'css: { "cesium-infoBox-visible" : showInfo, "cesium-infoBox-bodyless" : _bodyless }'),e.appendChild(t);var o=document.createElement("div");o.className="cesium-infoBox-title",o.setAttribute("data-bind","text: titleText"),t.appendChild(o);var i=document.createElement("button");i.type="button",i.className="cesium-button cesium-infoBox-camera",i.setAttribute("data-bind",'attr: { title: "Focus camera on object" },click: function () { cameraClicked.raiseEvent(this); },enable: enableCamera,cesiumSvgPath: { path: cameraIconPath, width: 32, height: 32 }'),t.appendChild(i);var n=document.createElement("button");n.type="button",n.className="cesium-infoBox-close",n.setAttribute("data-bind","click: function () { closeClicked.raiseEvent(this); }"),n.innerHTML="&times;",t.appendChild(n);var r=document.createElement("iframe");r.className="cesium-infoBox-iframe",r.setAttribute("sandbox","allow-same-origin allow-popups allow-forms"),r.setAttribute("data-bind","style : { maxHeight : maxHeightOffset(40) }"),r.setAttribute("allowfullscreen",!0),t.appendChild(r);var s=new InfoBoxViewModel;knockout.applyBindings(s,t),this._container=e,this._element=t,this._frame=r,this._viewModel=s,this._descriptionSubscription=void 0;var a=this;r.addEventListener("load",(function(){var e=r.contentDocument,o=e.createElement("link");o.href=buildModuleUrl("Widgets/InfoBox/InfoBoxDescription.css"),o.rel="stylesheet",o.type="text/css";var i=e.createElement("div");i.className="cesium-infoBox-description",e.head.appendChild(o),e.body.appendChild(i),a._descriptionSubscription=subscribeAndEvaluate(s,"description",(function(e){r.style.height="5px",i.innerHTML=e;var o=null,n=i.firstElementChild;if(null!==n&&1===i.childNodes.length){var s=window.getComputedStyle(n);if(null!==s){var a=s["background-color"],l=Color.fromCssColorString(a);defined(l)&&0!==l.alpha&&(o=s["background-color"])}}t.style["background-color"]=o;var c=i.getBoundingClientRect().height;r.style.height=c+"px"}))})),r.setAttribute("src","about:blank")}Object.defineProperties(InfoBox.prototype,{container:{get:function(){return this._container}},viewModel:{get:function(){return this._viewModel}},frame:{get:function(){return this._frame}}}),InfoBox.prototype.isDestroyed=function(){return!1},InfoBox.prototype.destroy=function(){var e=this._container;return knockout.cleanNode(this._element),e.removeChild(this._element),defined(this._descriptionSubscription)&&this._descriptionSubscription.dispose(),destroyObject(this)};export default InfoBox;