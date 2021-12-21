define(["./when-8166c7dd","./Matrix2-92b7fb9d","./ArcType-13a53523","./Transforms-62a339c3","./Color-0181dacd","./ComponentDatatype-9ed50558","./RuntimeError-4fdc4459","./GeometryAttribute-6f4c3b93","./GeometryAttributes-50becc99","./IndexDatatype-797210ca","./PolylinePipeline-fd9260c9","./combine-a5c4cc47","./WebGLConstants-0664004c","./EllipsoidGeodesic-133bd147","./EllipsoidRhumbLine-51654311","./IntersectionTests-4f28a69c","./Plane-049255eb"],(function(e,o,r,t,a,i,l,n,s,d,p,c,f,y,u,h,C){"use strict";function g(e,o,r,t,i,l,n){var s,d=p.PolylinePipeline.numberOfPoints(e,o,i),c=r.red,f=r.green,y=r.blue,u=r.alpha,h=t.red,C=t.green,g=t.blue,T=t.alpha;if(a.Color.equals(r,t)){for(s=0;s<d;s++)l[n++]=a.Color.floatToByte(c),l[n++]=a.Color.floatToByte(f),l[n++]=a.Color.floatToByte(y),l[n++]=a.Color.floatToByte(u);return n}var m=(h-c)/d,v=(C-f)/d,E=(g-y)/d,P=(T-u)/d,_=n;for(s=0;s<d;s++)l[_++]=a.Color.floatToByte(c+s*m),l[_++]=a.Color.floatToByte(f+s*v),l[_++]=a.Color.floatToByte(y+s*E),l[_++]=a.Color.floatToByte(u+s*P);return _}function T(t){var n=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions,s=t.colors,d=e.defaultValue(t.colorsPerVertex,!1);if(!e.defined(n)||n.length<2)throw new l.DeveloperError("At least two positions are required.");if(e.defined(s)&&(d&&s.length<n.length||!d&&s.length<n.length-1))throw new l.DeveloperError("colors has an invalid length.");this._positions=n,this._colors=s,this._colorsPerVertex=d,this._arcType=e.defaultValue(t.arcType,r.ArcType.GEODESIC),this._granularity=e.defaultValue(t.granularity,i.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=e.defaultValue(t.ellipsoid,o.Ellipsoid.WGS84),this._workerName="createSimplePolylineGeometry";var p=1+n.length*o.Cartesian3.packedLength;p+=e.defined(s)?1+s.length*a.Color.packedLength:1,this.packedLength=p+o.Ellipsoid.packedLength+3}T.pack=function(r,t,i){if(!e.defined(r))throw new l.DeveloperError("value is required");if(!e.defined(t))throw new l.DeveloperError("array is required");var n;i=e.defaultValue(i,0);var s=r._positions,d=s.length;for(t[i++]=d,n=0;n<d;++n,i+=o.Cartesian3.packedLength)o.Cartesian3.pack(s[n],t,i);var p=r._colors;for(d=e.defined(p)?p.length:0,t[i++]=d,n=0;n<d;++n,i+=a.Color.packedLength)a.Color.pack(p[n],t,i);return o.Ellipsoid.pack(r._ellipsoid,t,i),i+=o.Ellipsoid.packedLength,t[i++]=r._colorsPerVertex?1:0,t[i++]=r._arcType,t[i]=r._granularity,t},T.unpack=function(r,t,i){if(!e.defined(r))throw new l.DeveloperError("array is required");var n;t=e.defaultValue(t,0);var s=r[t++],d=new Array(s);for(n=0;n<s;++n,t+=o.Cartesian3.packedLength)d[n]=o.Cartesian3.unpack(r,t);var p=(s=r[t++])>0?new Array(s):void 0;for(n=0;n<s;++n,t+=a.Color.packedLength)p[n]=a.Color.unpack(r,t);var c=o.Ellipsoid.unpack(r,t);t+=o.Ellipsoid.packedLength;var f=1===r[t++],y=r[t++],u=r[t];return e.defined(i)?(i._positions=d,i._colors=p,i._ellipsoid=c,i._colorsPerVertex=f,i._arcType=y,i._granularity=u,i):new T({positions:d,colors:p,ellipsoid:c,colorsPerVertex:f,arcType:y,granularity:u})};var m=new Array(2),v=new Array(2),E={positions:m,height:v,ellipsoid:void 0,minDistance:void 0,granularity:void 0};return T.createGeometry=function(l){var c,f,y,u,h,C=l._positions,T=l._colors,P=l._colorsPerVertex,_=l._arcType,b=l._granularity,A=l._ellipsoid,B=i.CesiumMath.chordLength(b,A.maximumRadius),w=e.defined(T)&&!P,k=C.length,D=0;if(_===r.ArcType.GEODESIC||_===r.ArcType.RHUMB){var G,L,V;_===r.ArcType.GEODESIC?(G=i.CesiumMath.chordLength(b,A.maximumRadius),L=p.PolylinePipeline.numberOfPoints,V=p.PolylinePipeline.generateArc):(G=b,L=p.PolylinePipeline.numberOfPointsRhumbLine,V=p.PolylinePipeline.generateRhumbArc);var x=p.PolylinePipeline.extractHeights(C,A),S=E;if(_===r.ArcType.GEODESIC?S.minDistance=B:S.granularity=b,S.ellipsoid=A,w){var I=0;for(c=0;c<k-1;c++)I+=L(C[c],C[c+1],G)+1;f=new Float64Array(3*I),u=new Uint8Array(4*I),S.positions=m,S.height=v;var R=0;for(c=0;c<k-1;++c){m[0]=C[c],m[1]=C[c+1],v[0]=x[c],v[1]=x[c+1];var O=V(S);if(e.defined(T)){var M=O.length/3;h=T[c];for(var U=0;U<M;++U)u[R++]=a.Color.floatToByte(h.red),u[R++]=a.Color.floatToByte(h.green),u[R++]=a.Color.floatToByte(h.blue),u[R++]=a.Color.floatToByte(h.alpha)}f.set(O,D),D+=O.length}}else if(S.positions=C,S.height=x,f=new Float64Array(V(S)),e.defined(T)){for(u=new Uint8Array(f.length/3*4),c=0;c<k-1;++c)D=g(C[c],C[c+1],T[c],T[c+1],B,u,D);var q=T[k-1];u[D++]=a.Color.floatToByte(q.red),u[D++]=a.Color.floatToByte(q.green),u[D++]=a.Color.floatToByte(q.blue),u[D++]=a.Color.floatToByte(q.alpha)}}else{y=w?2*k-2:k,f=new Float64Array(3*y),u=e.defined(T)?new Uint8Array(4*y):void 0;var N=0,F=0;for(c=0;c<k;++c){var H=C[c];if(w&&c>0&&(o.Cartesian3.pack(H,f,N),N+=3,h=T[c-1],u[F++]=a.Color.floatToByte(h.red),u[F++]=a.Color.floatToByte(h.green),u[F++]=a.Color.floatToByte(h.blue),u[F++]=a.Color.floatToByte(h.alpha)),w&&c===k-1)break;o.Cartesian3.pack(H,f,N),N+=3,e.defined(T)&&(h=T[c],u[F++]=a.Color.floatToByte(h.red),u[F++]=a.Color.floatToByte(h.green),u[F++]=a.Color.floatToByte(h.blue),u[F++]=a.Color.floatToByte(h.alpha))}}var W=new s.GeometryAttributes;W.position=new n.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f}),e.defined(T)&&(W.color=new n.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:4,values:u,normalize:!0}));var Y=2*((y=f.length/3)-1),z=d.IndexDatatype.createTypedArray(y,Y),J=0;for(c=0;c<y-1;++c)z[J++]=c,z[J++]=c+1;return new n.Geometry({attributes:W,indices:z,primitiveType:n.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromPoints(C)})},function(r,t){return e.defined(t)&&(r=T.unpack(r,t)),r._ellipsoid=o.Ellipsoid.clone(r._ellipsoid),T.createGeometry(r)}}));