define(["exports","./Matrix2-92b7fb9d","./RuntimeError-4fdc4459","./when-8166c7dd","./WebGLConstants-0664004c","./Transforms-62a339c3"],(function(e,t,r,n,a,i){"use strict";var o=Object.freeze({NONE:0,TRIANGLES:1,LINES:2,POLYLINES:3}),s={POINTS:a.WebGLConstants.POINTS,LINES:a.WebGLConstants.LINES,LINE_LOOP:a.WebGLConstants.LINE_LOOP,LINE_STRIP:a.WebGLConstants.LINE_STRIP,TRIANGLES:a.WebGLConstants.TRIANGLES,TRIANGLE_STRIP:a.WebGLConstants.TRIANGLE_STRIP,TRIANGLE_FAN:a.WebGLConstants.TRIANGLE_FAN,validate:function(e){return e===s.POINTS||e===s.LINES||e===s.LINE_LOOP||e===s.LINE_STRIP||e===s.TRIANGLES||e===s.TRIANGLE_STRIP||e===s.TRIANGLE_FAN}},u=Object.freeze(s);function p(e){e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT),r.Check.typeOf.object("options.attributes",e.attributes),this.attributes=e.attributes,this.indices=e.indices,this.primitiveType=n.defaultValue(e.primitiveType,u.TRIANGLES),this.boundingSphere=e.boundingSphere,this.geometryType=n.defaultValue(e.geometryType,o.NONE),this.boundingSphereCV=e.boundingSphereCV,this.offsetAttribute=e.offsetAttribute}p.computeNumberOfVertices=function(e){r.Check.typeOf.object("geometry",e);var t=-1;for(var a in e.attributes)if(e.attributes.hasOwnProperty(a)&&n.defined(e.attributes[a])&&n.defined(e.attributes[a].values)){var i=e.attributes[a],o=i.values.length/i.componentsPerAttribute;if(t!==o&&-1!==t)throw new r.DeveloperError("All attribute lists must have the same number of attributes.");t=o}return t};var I=new t.Cartographic,l=new t.Cartesian3,N=new t.Matrix4,b=[new t.Cartographic,new t.Cartographic,new t.Cartographic],c=[new t.Cartesian2,new t.Cartesian2,new t.Cartesian2],m=[new t.Cartesian2,new t.Cartesian2,new t.Cartesian2],f=new t.Cartesian3,h=new i.Quaternion,T=new t.Matrix4,d=new t.Matrix2;p._textureCoordinateRotationPoints=function(e,r,n,a){var o,s=t.Rectangle.center(a,I),u=t.Cartographic.toCartesian(s,n,l),p=i.Transforms.eastNorthUpToFixedFrame(u,n,N),y=t.Matrix4.inverse(p,N),E=c,C=b;C[0].longitude=a.west,C[0].latitude=a.south,C[1].longitude=a.west,C[1].latitude=a.north,C[2].longitude=a.east,C[2].latitude=a.south;var L=f;for(o=0;o<3;o++)t.Cartographic.toCartesian(C[o],n,L),L=t.Matrix4.multiplyByPointAsVector(y,L,L),E[o].x=L.x,E[o].y=L.y;var A=i.Quaternion.fromAxisAngle(t.Cartesian3.UNIT_Z,-r,h),w=t.Matrix3.fromQuaternion(A,T),P=e.length,v=Number.POSITIVE_INFINITY,x=Number.POSITIVE_INFINITY,S=Number.NEGATIVE_INFINITY,G=Number.NEGATIVE_INFINITY;for(o=0;o<P;o++)L=t.Matrix4.multiplyByPointAsVector(y,e[o],L),L=t.Matrix3.multiplyByVector(w,L,L),v=Math.min(v,L.x),x=Math.min(x,L.y),S=Math.max(S,L.x),G=Math.max(G,L.y);var O=t.Matrix2.fromRotation(r,d),R=m;R[0].x=v,R[0].y=x,R[1].x=v,R[1].y=G,R[2].x=S,R[2].y=x;var g=E[0],_=E[2].x-g.x,V=E[1].y-g.y;for(o=0;o<3;o++){var M=R[o];t.Matrix2.multiplyByVector(O,M,M),M.x=(M.x-g.x)/_,M.y=(M.y-g.y)/V}var D=R[0],F=R[1],W=R[2],Y=new Array(6);return t.Cartesian2.pack(D,Y),t.Cartesian2.pack(F,Y,2),t.Cartesian2.pack(W,Y,4),Y},e.Geometry=p,e.GeometryAttribute=function(e){if(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT),!n.defined(e.componentDatatype))throw new r.DeveloperError("options.componentDatatype is required.");if(!n.defined(e.componentsPerAttribute))throw new r.DeveloperError("options.componentsPerAttribute is required.");if(e.componentsPerAttribute<1||e.componentsPerAttribute>4)throw new r.DeveloperError("options.componentsPerAttribute must be between 1 and 4.");if(!n.defined(e.values))throw new r.DeveloperError("options.values is required.");this.componentDatatype=e.componentDatatype,this.componentsPerAttribute=e.componentsPerAttribute,this.normalize=n.defaultValue(e.normalize,!1),this.values=e.values},e.GeometryType=o,e.PrimitiveType=u}));