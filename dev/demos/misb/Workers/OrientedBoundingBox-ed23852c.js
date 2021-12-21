define(["exports","./Transforms-62a339c3","./Matrix2-92b7fb9d","./RuntimeError-4fdc4459","./when-8166c7dd","./EllipsoidTangentPlane-5d8b4bd3","./ComponentDatatype-9ed50558","./Plane-049255eb"],(function(a,e,t,r,n,i,s,o){"use strict";function d(a,e){this.center=t.Cartesian3.clone(n.defaultValue(a,t.Cartesian3.ZERO)),this.halfAxes=t.Matrix3.clone(n.defaultValue(e,t.Matrix3.ZERO))}d.packedLength=t.Cartesian3.packedLength+t.Matrix3.packedLength,d.pack=function(a,e,i){return r.Check.typeOf.object("value",a),r.Check.defined("array",e),i=n.defaultValue(i,0),t.Cartesian3.pack(a.center,e,i),t.Matrix3.pack(a.halfAxes,e,i+t.Cartesian3.packedLength),e},d.unpack=function(a,e,i){return r.Check.defined("array",a),e=n.defaultValue(e,0),n.defined(i)||(i=new d),t.Cartesian3.unpack(a,e,i.center),t.Matrix3.unpack(a,e+t.Cartesian3.packedLength,i.halfAxes),i};var C=new t.Cartesian3,u=new t.Cartesian3,c=new t.Cartesian3,l=new t.Cartesian3,h=new t.Cartesian3,f=new t.Cartesian3,m=new t.Matrix3,x={unitary:new t.Matrix3,diagonal:new t.Matrix3};d.fromPoints=function(a,e){if(n.defined(e)||(e=new d),!n.defined(a)||0===a.length)return e.halfAxes=t.Matrix3.ZERO,e.center=t.Cartesian3.ZERO,e;var r,i=a.length,s=t.Cartesian3.clone(a[0],C);for(r=1;r<i;r++)t.Cartesian3.add(s,a[r],s);var o=1/i;t.Cartesian3.multiplyByScalar(s,o,s);var p,M=0,w=0,g=0,v=0,y=0,b=0;for(r=0;r<i;r++)M+=(p=t.Cartesian3.subtract(a[r],s,u)).x*p.x,w+=p.x*p.y,g+=p.x*p.z,v+=p.y*p.y,y+=p.y*p.z,b+=p.z*p.z;M*=o,w*=o,g*=o,v*=o,y*=o,b*=o;var E=m;E[0]=M,E[1]=w,E[2]=g,E[3]=w,E[4]=v,E[5]=y,E[6]=g,E[7]=y,E[8]=b;var N=t.Matrix3.computeEigenDecomposition(E,x),O=t.Matrix3.clone(N.unitary,e.halfAxes),P=t.Matrix3.getColumn(O,0,l),T=t.Matrix3.getColumn(O,1,h),I=t.Matrix3.getColumn(O,2,f),A=-Number.MAX_VALUE,R=-Number.MAX_VALUE,S=-Number.MAX_VALUE,D=Number.MAX_VALUE,L=Number.MAX_VALUE,U=Number.MAX_VALUE;for(r=0;r<i;r++)p=a[r],A=Math.max(t.Cartesian3.dot(P,p),A),R=Math.max(t.Cartesian3.dot(T,p),R),S=Math.max(t.Cartesian3.dot(I,p),S),D=Math.min(t.Cartesian3.dot(P,p),D),L=Math.min(t.Cartesian3.dot(T,p),L),U=Math.min(t.Cartesian3.dot(I,p),U);P=t.Cartesian3.multiplyByScalar(P,.5*(D+A),P),T=t.Cartesian3.multiplyByScalar(T,.5*(L+R),T),I=t.Cartesian3.multiplyByScalar(I,.5*(U+S),I);var q=t.Cartesian3.add(P,T,e.center);t.Cartesian3.add(q,I,q);var z=c;return z.x=A-D,z.y=R-L,z.z=S-U,t.Cartesian3.multiplyByScalar(z,.5,z),t.Matrix3.multiplyByScale(e.halfAxes,z,e.halfAxes),e};var p=new t.Cartesian3,M=new t.Cartesian3;function w(a,e,i,s,o,C,u,c,l,h,f){if(!(n.defined(o)&&n.defined(C)&&n.defined(u)&&n.defined(c)&&n.defined(l)&&n.defined(h)))throw new r.DeveloperError("all extents (minimum/maximum X/Y/Z) are required.");n.defined(f)||(f=new d);var m=f.halfAxes;t.Matrix3.setColumn(m,0,e,m),t.Matrix3.setColumn(m,1,i,m),t.Matrix3.setColumn(m,2,s,m);var x=p;x.x=(o+C)/2,x.y=(u+c)/2,x.z=(l+h)/2;var w=M;w.x=(C-o)/2,w.y=(c-u)/2,w.z=(h-l)/2;var g=f.center;return x=t.Matrix3.multiplyByVector(m,x,x),t.Cartesian3.add(a,x,g),t.Matrix3.multiplyByScale(m,w,m),f}var g=new t.Cartographic,v=new t.Cartesian3,y=new t.Cartographic,b=new t.Cartographic,E=new t.Cartographic,N=new t.Cartographic,O=new t.Cartographic,P=new t.Cartesian3,T=new t.Cartesian3,I=new t.Cartesian3,A=new t.Cartesian3,R=new t.Cartesian3,S=new t.Cartesian2,D=new t.Cartesian2,L=new t.Cartesian2,U=new t.Cartesian2,q=new t.Cartesian2,z=new t.Cartesian3,_=new t.Cartesian3,B=new t.Cartesian3,V=new t.Cartesian3,k=new t.Cartesian2,W=new t.Cartesian3,X=new t.Cartesian3,j=new t.Cartesian3,Z=new o.Plane(t.Cartesian3.UNIT_X,0);d.fromRectangle=function(a,e,d,C,u){if(!n.defined(a))throw new r.DeveloperError("rectangle is required");if(a.width<0||a.width>s.CesiumMath.TWO_PI)throw new r.DeveloperError("Rectangle width must be between 0 and 2*pi");if(a.height<0||a.height>s.CesiumMath.PI)throw new r.DeveloperError("Rectangle height must be between 0 and pi");if(n.defined(C)&&!s.CesiumMath.equalsEpsilon(C.radii.x,C.radii.y,s.CesiumMath.EPSILON15))throw new r.DeveloperError("Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y)");var c,l,h,f,m,x,p;if(e=n.defaultValue(e,0),d=n.defaultValue(d,0),C=n.defaultValue(C,t.Ellipsoid.WGS84),a.width<=s.CesiumMath.PI){var M=t.Rectangle.center(a,g),Y=C.cartographicToCartesian(M,v),G=new i.EllipsoidTangentPlane(Y,C);p=G.plane;var F=M.longitude,H=a.south<0&&a.north>0?0:M.latitude,J=t.Cartographic.fromRadians(F,a.north,d,y),K=t.Cartographic.fromRadians(a.west,a.north,d,b),Q=t.Cartographic.fromRadians(a.west,H,d,E),$=t.Cartographic.fromRadians(a.west,a.south,d,N),aa=t.Cartographic.fromRadians(F,a.south,d,O),ea=C.cartographicToCartesian(J,P),ta=C.cartographicToCartesian(K,T),ra=C.cartographicToCartesian(Q,I),na=C.cartographicToCartesian($,A),ia=C.cartographicToCartesian(aa,R),sa=G.projectPointToNearestOnPlane(ea,S),oa=G.projectPointToNearestOnPlane(ta,D),da=G.projectPointToNearestOnPlane(ra,L),Ca=G.projectPointToNearestOnPlane(na,U),ua=G.projectPointToNearestOnPlane(ia,q);return l=-(c=Math.min(oa.x,da.x,Ca.x)),f=Math.max(oa.y,sa.y),h=Math.min(Ca.y,ua.y),K.height=$.height=e,ta=C.cartographicToCartesian(K,T),na=C.cartographicToCartesian($,A),m=Math.min(o.Plane.getPointDistance(p,ta),o.Plane.getPointDistance(p,na)),x=d,w(G.origin,G.xAxis,G.yAxis,G.zAxis,c,l,h,f,m,x,u)}var ca=a.south>0,la=a.north<0,ha=ca?a.south:la?a.north:0,fa=t.Rectangle.center(a,g).longitude,ma=t.Cartesian3.fromRadians(fa,ha,d,C,z);ma.z=0;var xa=Math.abs(ma.x)<s.CesiumMath.EPSILON10&&Math.abs(ma.y)<s.CesiumMath.EPSILON10?t.Cartesian3.UNIT_X:t.Cartesian3.normalize(ma,_),pa=t.Cartesian3.UNIT_Z,Ma=t.Cartesian3.cross(xa,pa,B);p=o.Plane.fromPointNormal(ma,xa,Z);var wa=t.Cartesian3.fromRadians(fa+s.CesiumMath.PI_OVER_TWO,ha,d,C,V);c=-(l=t.Cartesian3.dot(o.Plane.projectPointOntoPlane(p,wa,k),Ma)),f=t.Cartesian3.fromRadians(0,a.north,la?e:d,C,W).z,h=t.Cartesian3.fromRadians(0,a.south,ca?e:d,C,X).z;var ga=t.Cartesian3.fromRadians(a.east,ha,d,C,j);return w(ma,Ma,pa,xa,c,l,h,f,m=o.Plane.getPointDistance(p,ga),x=0,u)},d.clone=function(a,e){if(n.defined(a))return n.defined(e)?(t.Cartesian3.clone(a.center,e.center),t.Matrix3.clone(a.halfAxes,e.halfAxes),e):new d(a.center,a.halfAxes)},d.intersectPlane=function(a,i){if(!n.defined(a))throw new r.DeveloperError("box is required.");if(!n.defined(i))throw new r.DeveloperError("plane is required.");var s=a.center,o=i.normal,d=a.halfAxes,C=o.x,u=o.y,c=o.z,l=Math.abs(C*d[t.Matrix3.COLUMN0ROW0]+u*d[t.Matrix3.COLUMN0ROW1]+c*d[t.Matrix3.COLUMN0ROW2])+Math.abs(C*d[t.Matrix3.COLUMN1ROW0]+u*d[t.Matrix3.COLUMN1ROW1]+c*d[t.Matrix3.COLUMN1ROW2])+Math.abs(C*d[t.Matrix3.COLUMN2ROW0]+u*d[t.Matrix3.COLUMN2ROW1]+c*d[t.Matrix3.COLUMN2ROW2]),h=t.Cartesian3.dot(o,s)+i.distance;return h<=-l?e.Intersect.OUTSIDE:h>=l?e.Intersect.INSIDE:e.Intersect.INTERSECTING};var Y=new t.Cartesian3,G=new t.Cartesian3,F=new t.Cartesian3,H=new t.Cartesian3,J=new t.Cartesian3,K=new t.Cartesian3;d.distanceSquaredTo=function(a,e){if(!n.defined(a))throw new r.DeveloperError("box is required.");if(!n.defined(e))throw new r.DeveloperError("cartesian is required.");var i=t.Cartesian3.subtract(e,a.center,p),o=a.halfAxes,d=t.Matrix3.getColumn(o,0,Y),C=t.Matrix3.getColumn(o,1,G),u=t.Matrix3.getColumn(o,2,F),c=t.Cartesian3.magnitude(d),l=t.Cartesian3.magnitude(C),h=t.Cartesian3.magnitude(u),f=!0,m=!0,x=!0;c>0?t.Cartesian3.divideByScalar(d,c,d):f=!1,l>0?t.Cartesian3.divideByScalar(C,l,C):m=!1,h>0?t.Cartesian3.divideByScalar(u,h,u):x=!1;var M,w,g,v=!f+!m+!x;if(1===v){var y=d;M=C,w=u,m?x||(y=u,w=d):(y=C,M=d),g=t.Cartesian3.cross(M,w,J),y===d?d=g:y===C?C=g:y===u&&(u=g)}else if(2===v){M=d,m?M=C:x&&(M=u);var b=t.Cartesian3.UNIT_Y;b.equalsEpsilon(M,s.CesiumMath.EPSILON3)&&(b=t.Cartesian3.UNIT_X),w=t.Cartesian3.cross(M,b,H),t.Cartesian3.normalize(w,w),g=t.Cartesian3.cross(M,w,J),t.Cartesian3.normalize(g,g),M===d?(C=w,u=g):M===C?(u=w,d=g):M===u&&(d=w,C=g)}else 3===v&&(d=t.Cartesian3.UNIT_X,C=t.Cartesian3.UNIT_Y,u=t.Cartesian3.UNIT_Z);var E=K;E.x=t.Cartesian3.dot(i,d),E.y=t.Cartesian3.dot(i,C),E.z=t.Cartesian3.dot(i,u);var N,O=0;return E.x<-c?O+=(N=E.x+c)*N:E.x>c&&(O+=(N=E.x-c)*N),E.y<-l?O+=(N=E.y+l)*N:E.y>l&&(O+=(N=E.y-l)*N),E.z<-h?O+=(N=E.z+h)*N:E.z>h&&(O+=(N=E.z-h)*N),O};var Q=new t.Cartesian3,$=new t.Cartesian3;d.computePlaneDistances=function(a,i,s,o){if(!n.defined(a))throw new r.DeveloperError("box is required.");if(!n.defined(i))throw new r.DeveloperError("position is required.");if(!n.defined(s))throw new r.DeveloperError("direction is required.");n.defined(o)||(o=new e.Interval);var d=Number.POSITIVE_INFINITY,C=Number.NEGATIVE_INFINITY,u=a.center,c=a.halfAxes,l=t.Matrix3.getColumn(c,0,Y),h=t.Matrix3.getColumn(c,1,G),f=t.Matrix3.getColumn(c,2,F),m=t.Cartesian3.add(l,h,Q);t.Cartesian3.add(m,f,m),t.Cartesian3.add(m,u,m);var x=t.Cartesian3.subtract(m,i,$),p=t.Cartesian3.dot(s,x);return d=Math.min(p,d),C=Math.max(p,C),t.Cartesian3.add(u,l,m),t.Cartesian3.add(m,h,m),t.Cartesian3.subtract(m,f,m),t.Cartesian3.subtract(m,i,x),p=t.Cartesian3.dot(s,x),d=Math.min(p,d),C=Math.max(p,C),t.Cartesian3.add(u,l,m),t.Cartesian3.subtract(m,h,m),t.Cartesian3.add(m,f,m),t.Cartesian3.subtract(m,i,x),p=t.Cartesian3.dot(s,x),d=Math.min(p,d),C=Math.max(p,C),t.Cartesian3.add(u,l,m),t.Cartesian3.subtract(m,h,m),t.Cartesian3.subtract(m,f,m),t.Cartesian3.subtract(m,i,x),p=t.Cartesian3.dot(s,x),d=Math.min(p,d),C=Math.max(p,C),t.Cartesian3.subtract(u,l,m),t.Cartesian3.add(m,h,m),t.Cartesian3.add(m,f,m),t.Cartesian3.subtract(m,i,x),p=t.Cartesian3.dot(s,x),d=Math.min(p,d),C=Math.max(p,C),t.Cartesian3.subtract(u,l,m),t.Cartesian3.add(m,h,m),t.Cartesian3.subtract(m,f,m),t.Cartesian3.subtract(m,i,x),p=t.Cartesian3.dot(s,x),d=Math.min(p,d),C=Math.max(p,C),t.Cartesian3.subtract(u,l,m),t.Cartesian3.subtract(m,h,m),t.Cartesian3.add(m,f,m),t.Cartesian3.subtract(m,i,x),p=t.Cartesian3.dot(s,x),d=Math.min(p,d),C=Math.max(p,C),t.Cartesian3.subtract(u,l,m),t.Cartesian3.subtract(m,h,m),t.Cartesian3.subtract(m,f,m),t.Cartesian3.subtract(m,i,x),p=t.Cartesian3.dot(s,x),d=Math.min(p,d),C=Math.max(p,C),o.start=d,o.stop=C,o};var aa=new e.BoundingSphere;d.isOccluded=function(a,t){if(!n.defined(a))throw new r.DeveloperError("box is required.");if(!n.defined(t))throw new r.DeveloperError("occluder is required.");var i=e.BoundingSphere.fromOrientedBoundingBox(a,aa);return!t.isBoundingSphereVisible(i)},d.prototype.intersectPlane=function(a){return d.intersectPlane(this,a)},d.prototype.distanceSquaredTo=function(a){return d.distanceSquaredTo(this,a)},d.prototype.computePlaneDistances=function(a,e,t){return d.computePlaneDistances(this,a,e,t)},d.prototype.isOccluded=function(a){return d.isOccluded(this,a)},d.equals=function(a,e){return a===e||n.defined(a)&&n.defined(e)&&t.Cartesian3.equals(a.center,e.center)&&t.Matrix3.equals(a.halfAxes,e.halfAxes)},d.prototype.clone=function(a){return d.clone(this,a)},d.prototype.equals=function(a){return d.equals(this,a)},a.OrientedBoundingBox=d}));