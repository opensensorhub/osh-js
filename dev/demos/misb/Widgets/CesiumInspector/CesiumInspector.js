import defined from"../../Core/defined.js";import destroyObject from"../../Core/destroyObject.js";import DeveloperError from"../../Core/DeveloperError.js";import knockout from"../../ThirdParty/knockout.js";import getElement from"../getElement.js";import InspectorShared from"../InspectorShared.js";import CesiumInspectorViewModel from"./CesiumInspectorViewModel.js";function CesiumInspector(e,t){if(!defined(e))throw new DeveloperError("container is required.");if(!defined(t))throw new DeveloperError("scene is required.");e=getElement(e);var i=document.createElement("div"),n=new CesiumInspectorViewModel(t,i);this._viewModel=n,this._container=e;var c=document.createElement("div");this._element=c;var r=document.createElement("div");r.textContent="Cesium Inspector",r.className="cesium-cesiumInspector-button",r.setAttribute("data-bind","click: toggleDropDown"),c.appendChild(r),c.className="cesium-cesiumInspector",c.setAttribute("data-bind",'css: { "cesium-cesiumInspector-visible" : dropDownVisible, "cesium-cesiumInspector-hidden" : !dropDownVisible }'),e.appendChild(this._element);var s=document.createElement("div");this._panel=s,s.className="cesium-cesiumInspector-dropDown",c.appendChild(s);var a=InspectorShared.createSection,d=InspectorShared.createCheckbox,p=a(s,"General","generalVisible","toggleGeneral"),m=d("Show Frustums","frustums"),o=document.createElement("div");o.className="cesium-cesiumInspector-frustumStatistics",o.setAttribute("data-bind","visible: frustums, html: frustumStatisticText"),m.appendChild(o),p.appendChild(m),p.appendChild(d("Show Frustum Planes","frustumPlanes")),p.appendChild(d("Performance Display","performance")),i.className="cesium-cesiumInspector-performanceDisplay",p.appendChild(i);var l=document.createElement("div");l.className="cesium-cesiumInspector-shaderCache",l.setAttribute("data-bind","html: shaderCacheText"),p.appendChild(l);var u=document.createElement("div");p.appendChild(u);var h=document.createElement("span");h.setAttribute("data-bind",'html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Frustum:"'),u.appendChild(h);var v=document.createElement("span");v.setAttribute("data-bind","text: depthFrustumText"),u.appendChild(v);var b=document.createElement("input");b.type="button",b.value="-",b.className="cesium-cesiumInspector-pickButton",b.setAttribute("data-bind","click: decrementDepthFrustum"),u.appendChild(b);var C=document.createElement("input");C.type="button",C.value="+",C.className="cesium-cesiumInspector-pickButton",C.setAttribute("data-bind","click: incrementDepthFrustum"),u.appendChild(C);var E=a(s,"Primitives","primitivesVisible","togglePrimitives"),k=document.createElement("div");k.className="cesium-cesiumInspector-pickSection",E.appendChild(k);var I=document.createElement("input");I.type="button",I.value="Pick a primitive",I.className="cesium-cesiumInspector-pickButton",I.setAttribute("data-bind",'css: {"cesium-cesiumInspector-pickButtonHighlight" : pickPrimitiveActive}, click: pickPrimitive');var f=document.createElement("div");f.className="cesium-cesiumInspector-center",f.appendChild(I),k.appendChild(f),k.appendChild(d("Show bounding sphere","primitiveBoundingSphere","hasPickedPrimitive")),k.appendChild(d("Show reference frame","primitiveReferenceFrame","hasPickedPrimitive")),this._primitiveOnly=d("Show only selected","filterPrimitive","hasPickedPrimitive"),k.appendChild(this._primitiveOnly);var N=a(s,"Terrain","terrainVisible","toggleTerrain"),y=document.createElement("div");y.className="cesium-cesiumInspector-pickSection",N.appendChild(y);var S=document.createElement("input");S.type="button",S.value="Pick a tile",S.className="cesium-cesiumInspector-pickButton",S.setAttribute("data-bind",'css: {"cesium-cesiumInspector-pickButtonHighlight" : pickTileActive}, click: pickTile'),(f=document.createElement("div")).appendChild(S),f.className="cesium-cesiumInspector-center",y.appendChild(f);var w=document.createElement("div");y.appendChild(w);var g=document.createElement("input");g.type="button",g.value="Parent",g.className="cesium-cesiumInspector-pickButton",g.setAttribute("data-bind","click: selectParent");var P=document.createElement("input");P.type="button",P.value="NW",P.className="cesium-cesiumInspector-pickButton",P.setAttribute("data-bind","click: selectNW");var A=document.createElement("input");A.type="button",A.value="NE",A.className="cesium-cesiumInspector-pickButton",A.setAttribute("data-bind","click: selectNE");var D=document.createElement("input");D.type="button",D.value="SW",D.className="cesium-cesiumInspector-pickButton",D.setAttribute("data-bind","click: selectSW");var T=document.createElement("input");T.type="button",T.value="SE",T.className="cesium-cesiumInspector-pickButton",T.setAttribute("data-bind","click: selectSE");var B=document.createElement("div");B.className="cesium-cesiumInspector-tileText",w.className="cesium-cesiumInspector-frustumStatistics",w.appendChild(B),w.setAttribute("data-bind","visible: hasPickedTile"),B.setAttribute("data-bind","html: tileText");var _=document.createElement("div");_.className="cesium-cesiumInspector-relativeText",_.textContent="Select relative:",w.appendChild(_);var j=document.createElement("table"),x=document.createElement("tr"),V=document.createElement("tr"),F=document.createElement("td");F.appendChild(g);var M=document.createElement("td");M.appendChild(P);var O=document.createElement("td");O.appendChild(A),x.appendChild(F),x.appendChild(M),x.appendChild(O);var W=document.createElement("td"),q=document.createElement("td");q.appendChild(D);var G=document.createElement("td");G.appendChild(T),V.appendChild(W),V.appendChild(q),V.appendChild(G),j.appendChild(x),j.appendChild(V),w.appendChild(j),y.appendChild(d("Show bounding volume","tileBoundingSphere","hasPickedTile")),y.appendChild(d("Show only selected","filterTile","hasPickedTile")),N.appendChild(d("Wireframe","wireframe")),N.appendChild(d("Suspend LOD update","suspendUpdates")),N.appendChild(d("Show tile coordinates","tileCoordinates")),knockout.applyBindings(n,this._element)}Object.defineProperties(CesiumInspector.prototype,{container:{get:function(){return this._container}},viewModel:{get:function(){return this._viewModel}}}),CesiumInspector.prototype.isDestroyed=function(){return!1},CesiumInspector.prototype.destroy=function(){return knockout.cleanNode(this._element),this._container.removeChild(this._element),this.viewModel.destroy(),destroyObject(this)};export default CesiumInspector;