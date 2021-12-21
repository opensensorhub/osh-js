define(["./GeometryOffsetAttribute-e8e698d7","./arrayRemoveDuplicates-198208a4","./Transforms-62a339c3","./Matrix2-92b7fb9d","./RuntimeError-4fdc4459","./ComponentDatatype-9ed50558","./PolylineVolumeGeometryLibrary-b9fa2b05","./CorridorGeometryLibrary-143e6a2e","./when-8166c7dd","./GeometryAttribute-6f4c3b93","./GeometryAttributes-50becc99","./IndexDatatype-797210ca","./PolygonPipeline-7fb6627c","./VertexFormat-c0801687","./combine-a5c4cc47","./WebGLConstants-0664004c","./EllipsoidTangentPlane-5d8b4bd3","./AxisAlignedBoundingBox-b0cd1e39","./IntersectionTests-4f28a69c","./Plane-049255eb","./PolylinePipeline-fd9260c9","./EllipsoidGeodesic-133bd147","./EllipsoidRhumbLine-51654311"],(function(t,e,r,a,i,o,n,s,l,d,u,m,f,y,c,p,h,g,C,b,v,A,_){"use strict";var w=new a.Cartesian3,T=new a.Cartesian3,G=new a.Cartesian3,E=new a.Cartesian3,V=new a.Cartesian3,x=new a.Cartesian3,F=new a.Cartesian3,L=new a.Cartesian3;function P(t,e){for(var r=0;r<t.length;r++)t[r]=e.scaleToGeodeticSurface(t[r],t[r]);return t}function N(t,e,r,i,o,n){var l=t.normals,d=t.tangents,u=t.bitangents,m=a.Cartesian3.normalize(a.Cartesian3.cross(r,e,F),F);n.normal&&s.CorridorGeometryLibrary.addAttribute(l,e,i,o),n.tangent&&s.CorridorGeometryLibrary.addAttribute(d,m,i,o),n.bitangent&&s.CorridorGeometryLibrary.addAttribute(u,r,i,o)}function D(t,e,r){var i,n,f,y=t.positions,c=t.corners,p=t.endPositions,h=t.lefts,g=t.normals,C=new u.GeometryAttributes,b=0,v=0,A=0;for(n=0;n<y.length;n+=2)b+=f=y[n].length-3,A+=2*f,v+=y[n+1].length-3;for(b+=3,v+=3,n=0;n<c.length;n++){i=c[n];var _=c[n].leftPositions;l.defined(_)?(b+=f=_.length,A+=f):(v+=f=c[n].rightPositions.length,A+=f)}var V,P=l.defined(p);P&&(b+=V=p[0].length-3,v+=V,A+=6*(V/=3));var D,M,O,I,k,S,R=b+v,H=new Float64Array(R),z={normals:e.normal?new Float32Array(R):void 0,tangents:e.tangent?new Float32Array(R):void 0,bitangents:e.bitangent?new Float32Array(R):void 0},B=0,U=R-1,Y=w,W=T,q=V/2,J=m.IndexDatatype.createTypedArray(R/3,A),j=0;if(P){S=G,k=E;var K=p[0];for(Y=a.Cartesian3.fromArray(g,0,Y),W=a.Cartesian3.fromArray(h,0,W),n=0;n<q;n++)S=a.Cartesian3.fromArray(K,3*(q-1-n),S),k=a.Cartesian3.fromArray(K,3*(q+n),k),s.CorridorGeometryLibrary.addAttribute(H,k,B),s.CorridorGeometryLibrary.addAttribute(H,S,void 0,U),N(z,Y,W,B,U,e),I=1+(M=B/3),O=(D=(U-2)/3)-1,J[j++]=D,J[j++]=M,J[j++]=O,J[j++]=O,J[j++]=M,J[j++]=I,B+=3,U-=3}var Q,X,Z=0,$=0,tt=y[Z++],et=y[Z++];for(H.set(tt,B),H.set(et,U-et.length+1),W=a.Cartesian3.fromArray(h,$,W),f=et.length-3,n=0;n<f;n+=3)Q=r.geodeticSurfaceNormal(a.Cartesian3.fromArray(tt,n,F),F),X=r.geodeticSurfaceNormal(a.Cartesian3.fromArray(et,f-n,L),L),N(z,Y=a.Cartesian3.normalize(a.Cartesian3.add(Q,X,Y),Y),W,B,U,e),I=1+(M=B/3),O=(D=(U-2)/3)-1,J[j++]=D,J[j++]=M,J[j++]=O,J[j++]=O,J[j++]=M,J[j++]=I,B+=3,U-=3;for(Q=r.geodeticSurfaceNormal(a.Cartesian3.fromArray(tt,f,F),F),X=r.geodeticSurfaceNormal(a.Cartesian3.fromArray(et,f,L),L),Y=a.Cartesian3.normalize(a.Cartesian3.add(Q,X,Y),Y),$+=3,n=0;n<c.length;n++){var rt,at,it,ot=(i=c[n]).leftPositions,nt=i.rightPositions,st=x,lt=G,dt=E;if(Y=a.Cartesian3.fromArray(g,$,Y),l.defined(ot)){for(N(z,Y,W,void 0,U,e),U-=3,at=I,it=O,rt=0;rt<ot.length/3;rt++)st=a.Cartesian3.fromArray(ot,3*rt,st),J[j++]=at,J[j++]=it-rt-1,J[j++]=it-rt,s.CorridorGeometryLibrary.addAttribute(H,st,void 0,U),lt=a.Cartesian3.fromArray(H,3*(it-rt-1),lt),dt=a.Cartesian3.fromArray(H,3*at,dt),N(z,Y,W=a.Cartesian3.normalize(a.Cartesian3.subtract(lt,dt,W),W),void 0,U,e),U-=3;st=a.Cartesian3.fromArray(H,3*at,st),lt=a.Cartesian3.subtract(a.Cartesian3.fromArray(H,3*it,lt),st,lt),dt=a.Cartesian3.subtract(a.Cartesian3.fromArray(H,3*(it-rt),dt),st,dt),N(z,Y,W=a.Cartesian3.normalize(a.Cartesian3.add(lt,dt,W),W),B,void 0,e),B+=3}else{for(N(z,Y,W,B,void 0,e),B+=3,at=O,it=I,rt=0;rt<nt.length/3;rt++)st=a.Cartesian3.fromArray(nt,3*rt,st),J[j++]=at,J[j++]=it+rt,J[j++]=it+rt+1,s.CorridorGeometryLibrary.addAttribute(H,st,B),lt=a.Cartesian3.fromArray(H,3*at,lt),dt=a.Cartesian3.fromArray(H,3*(it+rt),dt),N(z,Y,W=a.Cartesian3.normalize(a.Cartesian3.subtract(lt,dt,W),W),B,void 0,e),B+=3;st=a.Cartesian3.fromArray(H,3*at,st),lt=a.Cartesian3.subtract(a.Cartesian3.fromArray(H,3*(it+rt),lt),st,lt),dt=a.Cartesian3.subtract(a.Cartesian3.fromArray(H,3*it,dt),st,dt),N(z,Y,W=a.Cartesian3.normalize(a.Cartesian3.negate(a.Cartesian3.add(dt,lt,W),W),W),void 0,U,e),U-=3}for(tt=y[Z++],et=y[Z++],tt.splice(0,3),et.splice(et.length-3,3),H.set(tt,B),H.set(et,U-et.length+1),f=et.length-3,$+=3,W=a.Cartesian3.fromArray(h,$,W),rt=0;rt<et.length;rt+=3)Q=r.geodeticSurfaceNormal(a.Cartesian3.fromArray(tt,rt,F),F),X=r.geodeticSurfaceNormal(a.Cartesian3.fromArray(et,f-rt,L),L),N(z,Y=a.Cartesian3.normalize(a.Cartesian3.add(Q,X,Y),Y),W,B,U,e),M=(I=B/3)-1,D=1+(O=(U-2)/3),J[j++]=D,J[j++]=M,J[j++]=O,J[j++]=O,J[j++]=M,J[j++]=I,B+=3,U-=3;B-=3,U+=3}if(N(z,Y=a.Cartesian3.fromArray(g,g.length-3,Y),W,B,U,e),P){B+=3,U-=3,S=G,k=E;var ut=p[1];for(n=0;n<q;n++)S=a.Cartesian3.fromArray(ut,3*(V-n-1),S),k=a.Cartesian3.fromArray(ut,3*n,k),s.CorridorGeometryLibrary.addAttribute(H,S,void 0,U),s.CorridorGeometryLibrary.addAttribute(H,k,B),N(z,Y,W,B,U,e),M=(I=B/3)-1,D=1+(O=(U-2)/3),J[j++]=D,J[j++]=M,J[j++]=O,J[j++]=O,J[j++]=M,J[j++]=I,B+=3,U-=3}if(C.position=new d.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:H}),e.st){var mt,ft,yt=new Float32Array(R/3*2),ct=0;if(P){b/=3,v/=3;var pt,ht=Math.PI/(V+1);ft=1/(b-V+1),mt=1/(v-V+1);var gt=V/2;for(n=gt+1;n<V+1;n++)pt=o.CesiumMath.PI_OVER_TWO+ht*n,yt[ct++]=mt*(1+Math.cos(pt)),yt[ct++]=.5*(1+Math.sin(pt));for(n=1;n<v-V+1;n++)yt[ct++]=n*mt,yt[ct++]=0;for(n=V;n>gt;n--)pt=o.CesiumMath.PI_OVER_TWO-n*ht,yt[ct++]=1-mt*(1+Math.cos(pt)),yt[ct++]=.5*(1+Math.sin(pt));for(n=gt;n>0;n--)pt=o.CesiumMath.PI_OVER_TWO-ht*n,yt[ct++]=1-ft*(1+Math.cos(pt)),yt[ct++]=.5*(1+Math.sin(pt));for(n=b-V;n>0;n--)yt[ct++]=n*ft,yt[ct++]=1;for(n=1;n<gt+1;n++)pt=o.CesiumMath.PI_OVER_TWO+ht*n,yt[ct++]=ft*(1+Math.cos(pt)),yt[ct++]=.5*(1+Math.sin(pt))}else{for(ft=1/((b/=3)-1),mt=1/((v/=3)-1),n=0;n<v;n++)yt[ct++]=n*mt,yt[ct++]=0;for(n=b;n>0;n--)yt[ct++]=(n-1)*ft,yt[ct++]=1}C.st=new d.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:yt})}return e.normal&&(C.normal=new d.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:z.normals})),e.tangent&&(C.tangent=new d.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:z.tangents})),e.bitangent&&(C.bitangent=new d.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:z.bitangents})),{attributes:C,indices:J}}function M(t,e,r){r[e++]=t[0],r[e++]=t[1],r[e++]=t[2];for(var a=3;a<t.length;a+=3){var i=t[a],o=t[a+1],n=t[a+2];r[e++]=i,r[e++]=o,r[e++]=n,r[e++]=i,r[e++]=o,r[e++]=n}return r[e++]=t[0],r[e++]=t[1],r[e++]=t[2],r}var O=new a.Cartesian3,I=new a.Cartesian3,k=new a.Cartographic;function S(t,e,r,i,o,n){var s=a.Cartesian3.subtract(e,t,O);a.Cartesian3.normalize(s,s);var l=r.geodeticSurfaceNormal(t,I),d=a.Cartesian3.cross(s,l,O);a.Cartesian3.multiplyByScalar(d,i,d);var u=o.latitude,m=o.longitude,f=n.latitude,y=n.longitude;a.Cartesian3.add(t,d,I),r.cartesianToCartographic(I,k);var c=k.latitude,p=k.longitude;u=Math.min(u,c),m=Math.min(m,p),f=Math.max(f,c),y=Math.max(y,p),a.Cartesian3.subtract(t,d,I),r.cartesianToCartographic(I,k),c=k.latitude,p=k.longitude,u=Math.min(u,c),m=Math.min(m,p),f=Math.max(f,c),y=Math.max(y,p),o.latitude=u,o.longitude=m,n.latitude=f,n.longitude=y}var R=new a.Cartesian3,H=new a.Cartesian3,z=new a.Cartographic,B=new a.Cartographic;function U(t,r,i,o,s){t=P(t,r);var d=e.arrayRemoveDuplicates(t,a.Cartesian3.equalsEpsilon),u=d.length;if(u<2||i<=0)return new a.Rectangle;var m,f,y=.5*i;if(z.latitude=Number.POSITIVE_INFINITY,z.longitude=Number.POSITIVE_INFINITY,B.latitude=Number.NEGATIVE_INFINITY,B.longitude=Number.NEGATIVE_INFINITY,o===n.CornerType.ROUNDED){var c=d[0];a.Cartesian3.subtract(c,d[1],R),a.Cartesian3.normalize(R,R),a.Cartesian3.multiplyByScalar(R,y,R),a.Cartesian3.add(c,R,H),r.cartesianToCartographic(H,k),m=k.latitude,f=k.longitude,z.latitude=Math.min(z.latitude,m),z.longitude=Math.min(z.longitude,f),B.latitude=Math.max(B.latitude,m),B.longitude=Math.max(B.longitude,f)}for(var p=0;p<u-1;++p)S(d[p],d[p+1],r,y,z,B);var h=d[u-1];a.Cartesian3.subtract(h,d[u-2],R),a.Cartesian3.normalize(R,R),a.Cartesian3.multiplyByScalar(R,y,R),a.Cartesian3.add(h,R,H),S(h,H,r,y,z,B),o===n.CornerType.ROUNDED&&(r.cartesianToCartographic(H,k),m=k.latitude,f=k.longitude,z.latitude=Math.min(z.latitude,m),z.longitude=Math.min(z.longitude,f),B.latitude=Math.max(B.latitude,m),B.longitude=Math.max(B.longitude,f));var g=l.defined(s)?s:new a.Rectangle;return g.north=B.latitude,g.south=z.latitude,g.east=B.longitude,g.west=z.longitude,g}function Y(t){var e=(t=l.defaultValue(t,l.defaultValue.EMPTY_OBJECT)).positions,r=t.width;i.Check.defined("options.positions",e),i.Check.defined("options.width",r);var s=l.defaultValue(t.height,0),d=l.defaultValue(t.extrudedHeight,s);this._positions=e,this._ellipsoid=a.Ellipsoid.clone(l.defaultValue(t.ellipsoid,a.Ellipsoid.WGS84)),this._vertexFormat=y.VertexFormat.clone(l.defaultValue(t.vertexFormat,y.VertexFormat.DEFAULT)),this._width=r,this._height=Math.max(s,d),this._extrudedHeight=Math.min(s,d),this._cornerType=l.defaultValue(t.cornerType,n.CornerType.ROUNDED),this._granularity=l.defaultValue(t.granularity,o.CesiumMath.RADIANS_PER_DEGREE),this._shadowVolume=l.defaultValue(t.shadowVolume,!1),this._workerName="createCorridorGeometry",this._offsetAttribute=t.offsetAttribute,this._rectangle=void 0,this.packedLength=1+e.length*a.Cartesian3.packedLength+a.Ellipsoid.packedLength+y.VertexFormat.packedLength+7}Y.pack=function(t,e,r){i.Check.defined("value",t),i.Check.defined("array",e),r=l.defaultValue(r,0);var o=t._positions,n=o.length;e[r++]=n;for(var s=0;s<n;++s,r+=a.Cartesian3.packedLength)a.Cartesian3.pack(o[s],e,r);return a.Ellipsoid.pack(t._ellipsoid,e,r),r+=a.Ellipsoid.packedLength,y.VertexFormat.pack(t._vertexFormat,e,r),r+=y.VertexFormat.packedLength,e[r++]=t._width,e[r++]=t._height,e[r++]=t._extrudedHeight,e[r++]=t._cornerType,e[r++]=t._granularity,e[r++]=t._shadowVolume?1:0,e[r]=l.defaultValue(t._offsetAttribute,-1),e};var W=a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),q=new y.VertexFormat,J={positions:void 0,ellipsoid:W,vertexFormat:q,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,shadowVolume:void 0,offsetAttribute:void 0};return Y.unpack=function(t,e,r){i.Check.defined("array",t),e=l.defaultValue(e,0);for(var o=t[e++],n=new Array(o),s=0;s<o;++s,e+=a.Cartesian3.packedLength)n[s]=a.Cartesian3.unpack(t,e);var d=a.Ellipsoid.unpack(t,e,W);e+=a.Ellipsoid.packedLength;var u=y.VertexFormat.unpack(t,e,q);e+=y.VertexFormat.packedLength;var m=t[e++],f=t[e++],c=t[e++],p=t[e++],h=t[e++],g=1===t[e++],C=t[e];return l.defined(r)?(r._positions=n,r._ellipsoid=a.Ellipsoid.clone(d,r._ellipsoid),r._vertexFormat=y.VertexFormat.clone(u,r._vertexFormat),r._width=m,r._height=f,r._extrudedHeight=c,r._cornerType=p,r._granularity=h,r._shadowVolume=g,r._offsetAttribute=-1===C?void 0:C,r):(J.positions=n,J.width=m,J.height=f,J.extrudedHeight=c,J.cornerType=p,J.granularity=h,J.shadowVolume=g,J.offsetAttribute=-1===C?void 0:C,new Y(J))},Y.computeRectangle=function(t,e){var r=(t=l.defaultValue(t,l.defaultValue.EMPTY_OBJECT)).positions,o=t.width;return i.Check.defined("options.positions",r),i.Check.defined("options.width",o),U(r,l.defaultValue(t.ellipsoid,a.Ellipsoid.WGS84),o,l.defaultValue(t.cornerType,n.CornerType.ROUNDED),e)},Y.createGeometry=function(i){var n=i._positions,u=i._width,c=i._ellipsoid;n=P(n,c);var p=e.arrayRemoveDuplicates(n,a.Cartesian3.equalsEpsilon);if(!(p.length<2||u<=0)){var h,g=i._height,C=i._extrudedHeight,b=!o.CesiumMath.equalsEpsilon(g,C,0,o.CesiumMath.EPSILON2),v=i._vertexFormat,A={ellipsoid:c,positions:p,width:u,cornerType:i._cornerType,granularity:i._granularity,saveAttributes:!0};if(b)A.height=g,A.extrudedHeight=C,A.shadowVolume=i._shadowVolume,A.offsetAttribute=i._offsetAttribute,h=function(e,r){var i=new y.VertexFormat({position:r.position,normal:r.normal||r.bitangent||e.shadowVolume,tangent:r.tangent,bitangent:r.normal||r.bitangent,st:r.st}),n=e.ellipsoid,u=D(s.CorridorGeometryLibrary.computePositions(e),i,n),c=e.height,p=e.extrudedHeight,h=u.attributes,g=u.indices,C=h.position.values,b=C.length,v=new Float64Array(6*b),A=new Float64Array(b);A.set(C);var _,F=new Float64Array(4*b);F=M(C=f.PolygonPipeline.scaleToGeodeticHeight(C,c,n),0,F),F=M(A=f.PolygonPipeline.scaleToGeodeticHeight(A,p,n),2*b,F),v.set(C),v.set(A,b),v.set(F,2*b),h.position.values=v,h=function(t,e){if(!(e.normal||e.tangent||e.bitangent||e.st))return t;var r,i,o=t.position.values;(e.normal||e.bitangent)&&(r=t.normal.values,i=t.bitangent.values);var n,l=t.position.values.length/18,d=3*l,u=2*l,m=2*d;if(e.normal||e.bitangent||e.tangent){var f=e.normal?new Float32Array(6*d):void 0,y=e.tangent?new Float32Array(6*d):void 0,c=e.bitangent?new Float32Array(6*d):void 0,p=w,h=T,g=G,C=E,b=V,v=x,A=m;for(n=0;n<d;n+=3){var _=A+m;p=a.Cartesian3.fromArray(o,n,p),h=a.Cartesian3.fromArray(o,n+d,h),g=a.Cartesian3.fromArray(o,(n+3)%d,g),h=a.Cartesian3.subtract(h,p,h),g=a.Cartesian3.subtract(g,p,g),C=a.Cartesian3.normalize(a.Cartesian3.cross(h,g,C),C),e.normal&&(s.CorridorGeometryLibrary.addAttribute(f,C,_),s.CorridorGeometryLibrary.addAttribute(f,C,_+3),s.CorridorGeometryLibrary.addAttribute(f,C,A),s.CorridorGeometryLibrary.addAttribute(f,C,A+3)),(e.tangent||e.bitangent)&&(v=a.Cartesian3.fromArray(r,n,v),e.bitangent&&(s.CorridorGeometryLibrary.addAttribute(c,v,_),s.CorridorGeometryLibrary.addAttribute(c,v,_+3),s.CorridorGeometryLibrary.addAttribute(c,v,A),s.CorridorGeometryLibrary.addAttribute(c,v,A+3)),e.tangent&&(b=a.Cartesian3.normalize(a.Cartesian3.cross(v,C,b),b),s.CorridorGeometryLibrary.addAttribute(y,b,_),s.CorridorGeometryLibrary.addAttribute(y,b,_+3),s.CorridorGeometryLibrary.addAttribute(y,b,A),s.CorridorGeometryLibrary.addAttribute(y,b,A+3))),A+=6}if(e.normal){for(f.set(r),n=0;n<d;n+=3)f[n+d]=-r[n],f[n+d+1]=-r[n+1],f[n+d+2]=-r[n+2];t.normal.values=f}else t.normal=void 0;if(e.bitangent?(c.set(i),c.set(i,d),t.bitangent.values=c):t.bitangent=void 0,e.tangent){var F=t.tangent.values;y.set(F),y.set(F,d),t.tangent.values=y}}if(e.st){var L=t.st.values,P=new Float32Array(6*u);P.set(L),P.set(L,u);for(var N=2*u,D=0;D<2;D++){for(P[N++]=L[0],P[N++]=L[1],n=2;n<u;n+=2){var M=L[n],O=L[n+1];P[N++]=M,P[N++]=O,P[N++]=M,P[N++]=O}P[N++]=L[0],P[N++]=L[1]}t.st.values=P}return t}(h,r);var L=b/3;if(e.shadowVolume){var P=h.normal.values;b=P.length;var N=new Float32Array(6*b);for(_=0;_<b;_++)P[_]=-P[_];N.set(P,b),N=M(P,4*b,N),h.extrudeDirection=new d.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:N}),r.normal||(h.normal=void 0)}if(l.defined(e.offsetAttribute)){var O=new Uint8Array(6*L);if(e.offsetAttribute===t.GeometryOffsetAttribute.TOP)O=t.arrayFill(O,1,0,L),O=t.arrayFill(O,1,2*L,4*L);else{var I=e.offsetAttribute===t.GeometryOffsetAttribute.NONE?0:1;O=t.arrayFill(O,I)}h.applyOffset=new d.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:O})}var k=g.length,S=L+L,R=m.IndexDatatype.createTypedArray(v.length/3,2*k+3*S);R.set(g);var H,z,B,U,Y=k;for(_=0;_<k;_+=3){var W=g[_],q=g[_+1],J=g[_+2];R[Y++]=J+L,R[Y++]=q+L,R[Y++]=W+L}for(_=0;_<S;_+=2)B=(H=_+S)+1,U=(z=H+S)+1,R[Y++]=H,R[Y++]=z,R[Y++]=B,R[Y++]=B,R[Y++]=z,R[Y++]=U;return{attributes:h,indices:R}}(A,v);else if((h=D(s.CorridorGeometryLibrary.computePositions(A),v,c)).attributes.position.values=f.PolygonPipeline.scaleToGeodeticHeight(h.attributes.position.values,g,c),l.defined(i._offsetAttribute)){var _=i._offsetAttribute===t.GeometryOffsetAttribute.NONE?0:1,F=h.attributes.position.values.length,L=new Uint8Array(F/3);t.arrayFill(L,_),h.attributes.applyOffset=new d.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:L})}var N=h.attributes,O=r.BoundingSphere.fromVertices(N.position.values,void 0,3);return v.position||(h.attributes.position.values=void 0),new d.Geometry({attributes:N,indices:h.indices,primitiveType:d.PrimitiveType.TRIANGLES,boundingSphere:O,offsetAttribute:i._offsetAttribute})}},Y.createShadowVolume=function(t,e,r){var a=t._granularity,i=t._ellipsoid,o=e(a,i),n=r(a,i);return new Y({positions:t._positions,width:t._width,cornerType:t._cornerType,ellipsoid:i,granularity:a,extrudedHeight:o,height:n,vertexFormat:y.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(Y.prototype,{rectangle:{get:function(){return l.defined(this._rectangle)||(this._rectangle=U(this._positions,this._ellipsoid,this._width,this._cornerType)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return[0,0,0,1,1,0]}}}),function(t,e){return l.defined(e)&&(t=Y.unpack(t,e)),t._ellipsoid=a.Ellipsoid.clone(t._ellipsoid),Y.createGeometry(t)}}));