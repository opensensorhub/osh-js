define(["./when-8166c7dd","./Matrix2-92b7fb9d","./Transforms-62a339c3","./ComponentDatatype-9ed50558","./RuntimeError-4fdc4459","./GeometryAttribute-6f4c3b93","./GeometryAttributes-50becc99","./IndexDatatype-797210ca","./WallGeometryLibrary-ace2cc0d","./combine-a5c4cc47","./WebGLConstants-0664004c","./arrayRemoveDuplicates-198208a4","./PolylinePipeline-fd9260c9","./EllipsoidGeodesic-133bd147","./EllipsoidRhumbLine-51654311","./IntersectionTests-4f28a69c","./Plane-049255eb"],(function(e,i,t,r,n,a,o,s,l,d,m,u,p,f,h,c,g){"use strict";var y=new i.Cartesian3,v=new i.Cartesian3;function E(t){var a=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions,o=t.maximumHeights,s=t.minimumHeights;if(!e.defined(a))throw new n.DeveloperError("options.positions is required.");if(e.defined(o)&&o.length!==a.length)throw new n.DeveloperError("options.positions and options.maximumHeights must have the same length.");if(e.defined(s)&&s.length!==a.length)throw new n.DeveloperError("options.positions and options.minimumHeights must have the same length.");var l=e.defaultValue(t.granularity,r.CesiumMath.RADIANS_PER_DEGREE),d=e.defaultValue(t.ellipsoid,i.Ellipsoid.WGS84);this._positions=a,this._minimumHeights=s,this._maximumHeights=o,this._granularity=l,this._ellipsoid=i.Ellipsoid.clone(d),this._workerName="createWallOutlineGeometry";var m=1+a.length*i.Cartesian3.packedLength+2;e.defined(s)&&(m+=s.length),e.defined(o)&&(m+=o.length),this.packedLength=m+i.Ellipsoid.packedLength+1}E.pack=function(t,r,a){if(!e.defined(t))throw new n.DeveloperError("value is required");if(!e.defined(r))throw new n.DeveloperError("array is required");var o;a=e.defaultValue(a,0);var s=t._positions,l=s.length;for(r[a++]=l,o=0;o<l;++o,a+=i.Cartesian3.packedLength)i.Cartesian3.pack(s[o],r,a);var d=t._minimumHeights;if(l=e.defined(d)?d.length:0,r[a++]=l,e.defined(d))for(o=0;o<l;++o)r[a++]=d[o];var m=t._maximumHeights;if(l=e.defined(m)?m.length:0,r[a++]=l,e.defined(m))for(o=0;o<l;++o)r[a++]=m[o];return i.Ellipsoid.pack(t._ellipsoid,r,a),r[a+=i.Ellipsoid.packedLength]=t._granularity,r};var w=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),_={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:w,granularity:void 0};return E.unpack=function(t,r,a){if(!e.defined(t))throw new n.DeveloperError("array is required");var o;r=e.defaultValue(r,0);var s,l,d=t[r++],m=new Array(d);for(o=0;o<d;++o,r+=i.Cartesian3.packedLength)m[o]=i.Cartesian3.unpack(t,r);if((d=t[r++])>0)for(s=new Array(d),o=0;o<d;++o)s[o]=t[r++];if((d=t[r++])>0)for(l=new Array(d),o=0;o<d;++o)l[o]=t[r++];var u=i.Ellipsoid.unpack(t,r,w),p=t[r+=i.Ellipsoid.packedLength];return e.defined(a)?(a._positions=m,a._minimumHeights=s,a._maximumHeights=l,a._ellipsoid=i.Ellipsoid.clone(u,a._ellipsoid),a._granularity=p,a):(_.positions=m,_.minimumHeights=s,_.maximumHeights=l,_.granularity=p,new E(_))},E.fromConstantHeights=function(i){var t,r,a=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).positions;if(!e.defined(a))throw new n.DeveloperError("options.positions is required.");var o=i.minimumHeight,s=i.maximumHeight,l=e.defined(o),d=e.defined(s);if(l||d){var m=a.length;t=l?new Array(m):void 0,r=d?new Array(m):void 0;for(var u=0;u<m;++u)l&&(t[u]=o),d&&(r[u]=s)}return new E({positions:a,maximumHeights:r,minimumHeights:t,ellipsoid:i.ellipsoid})},E.createGeometry=function(n){var d=n._positions,m=n._minimumHeights,u=n._maximumHeights,p=n._granularity,f=n._ellipsoid,h=l.WallGeometryLibrary.computePositions(f,d,u,m,p,!1);if(e.defined(h)){var c,g=h.bottomPositions,E=h.topPositions,w=E.length,_=2*w,H=new Float64Array(_),C=0;for(w/=3,c=0;c<w;++c){var b=3*c,A=i.Cartesian3.fromArray(E,b,y),D=i.Cartesian3.fromArray(g,b,v);H[C++]=D.x,H[C++]=D.y,H[C++]=D.z,H[C++]=A.x,H[C++]=A.y,H[C++]=A.z}var k=new o.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:H})}),x=_/3;_=2*x-4+x;var G=s.IndexDatatype.createTypedArray(x,_),L=0;for(c=0;c<x-2;c+=2){var P=c,T=c+2,V=i.Cartesian3.fromArray(H,3*P,y),I=i.Cartesian3.fromArray(H,3*T,v);if(!i.Cartesian3.equalsEpsilon(V,I,r.CesiumMath.EPSILON10)){var R=c+1,S=c+3;G[L++]=R,G[L++]=P,G[L++]=R,G[L++]=S,G[L++]=P,G[L++]=T}}return G[L++]=x-2,G[L++]=x-1,new a.Geometry({attributes:k,indices:G,primitiveType:a.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere.fromVertices(H)})}},function(t,r){return e.defined(r)&&(t=E.unpack(t,r)),t._ellipsoid=i.Ellipsoid.clone(t._ellipsoid),E.createGeometry(t)}}));