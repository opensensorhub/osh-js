define(["exports","./GeometryOffsetAttribute-e8e698d7","./Transforms-62a339c3","./Matrix2-92b7fb9d","./ComponentDatatype-9ed50558","./when-8166c7dd","./RuntimeError-4fdc4459","./GeometryAttribute-6f4c3b93","./GeometryAttributes-50becc99","./IndexDatatype-797210ca","./VertexFormat-c0801687"],(function(e,t,a,r,i,n,o,m,s,u,l){"use strict";var f=new r.Cartesian3,c=new r.Cartesian3,d=new r.Cartesian3,p=new r.Cartesian3,C=new r.Cartesian3,y=new r.Cartesian3(1,1,1),v=Math.cos,h=Math.sin;function _(e){e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT);var t=n.defaultValue(e.radii,y),a=n.defaultValue(e.innerRadii,t),m=n.defaultValue(e.minimumClock,0),s=n.defaultValue(e.maximumClock,i.CesiumMath.TWO_PI),u=n.defaultValue(e.minimumCone,0),f=n.defaultValue(e.maximumCone,i.CesiumMath.PI),c=Math.round(n.defaultValue(e.stackPartitions,64)),d=Math.round(n.defaultValue(e.slicePartitions,64)),p=n.defaultValue(e.vertexFormat,l.VertexFormat.DEFAULT);if(d<3)throw new o.DeveloperError("options.slicePartitions cannot be less than three.");if(c<3)throw new o.DeveloperError("options.stackPartitions cannot be less than three.");this._radii=r.Cartesian3.clone(t),this._innerRadii=r.Cartesian3.clone(a),this._minimumClock=m,this._maximumClock=s,this._minimumCone=u,this._maximumCone=f,this._stackPartitions=c,this._slicePartitions=d,this._vertexFormat=l.VertexFormat.clone(p),this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipsoidGeometry"}_.packedLength=2*r.Cartesian3.packedLength+l.VertexFormat.packedLength+7,_.pack=function(e,t,a){if(!n.defined(e))throw new o.DeveloperError("value is required");if(!n.defined(t))throw new o.DeveloperError("array is required");return a=n.defaultValue(a,0),r.Cartesian3.pack(e._radii,t,a),a+=r.Cartesian3.packedLength,r.Cartesian3.pack(e._innerRadii,t,a),a+=r.Cartesian3.packedLength,l.VertexFormat.pack(e._vertexFormat,t,a),a+=l.VertexFormat.packedLength,t[a++]=e._minimumClock,t[a++]=e._maximumClock,t[a++]=e._minimumCone,t[a++]=e._maximumCone,t[a++]=e._stackPartitions,t[a++]=e._slicePartitions,t[a]=n.defaultValue(e._offsetAttribute,-1),t};var x,A=new r.Cartesian3,w=new r.Cartesian3,b=new l.VertexFormat,k={radii:A,innerRadii:w,vertexFormat:b,minimumClock:void 0,maximumClock:void 0,minimumCone:void 0,maximumCone:void 0,stackPartitions:void 0,slicePartitions:void 0,offsetAttribute:void 0};_.unpack=function(e,t,a){if(!n.defined(e))throw new o.DeveloperError("array is required");t=n.defaultValue(t,0);var i=r.Cartesian3.unpack(e,t,A);t+=r.Cartesian3.packedLength;var m=r.Cartesian3.unpack(e,t,w);t+=r.Cartesian3.packedLength;var s=l.VertexFormat.unpack(e,t,b);t+=l.VertexFormat.packedLength;var u=e[t++],f=e[t++],c=e[t++],d=e[t++],p=e[t++],C=e[t++],y=e[t];return n.defined(a)?(a._radii=r.Cartesian3.clone(i,a._radii),a._innerRadii=r.Cartesian3.clone(m,a._innerRadii),a._vertexFormat=l.VertexFormat.clone(s,a._vertexFormat),a._minimumClock=u,a._maximumClock=f,a._minimumCone=c,a._maximumCone=d,a._stackPartitions=p,a._slicePartitions=C,a._offsetAttribute=-1===y?void 0:y,a):(k.minimumClock=u,k.maximumClock=f,k.minimumCone=c,k.maximumCone=d,k.stackPartitions=p,k.slicePartitions=C,k.offsetAttribute=-1===y?void 0:y,new _(k))},_.createGeometry=function(e){var o=e._radii;if(!(o.x<=0||o.y<=0||o.z<=0)){var l=e._innerRadii;if(!(l.x<=0||l.y<=0||l.z<=0)){var y,_,x=e._minimumClock,A=e._maximumClock,w=e._minimumCone,b=e._maximumCone,k=e._vertexFormat,P=e._slicePartitions+1,F=e._stackPartitions+1;(P=Math.round(P*Math.abs(A-x)/i.CesiumMath.TWO_PI))<2&&(P=2),(F=Math.round(F*Math.abs(b-w)/i.CesiumMath.PI))<2&&(F=2);var g=0,V=[w],D=[x];for(y=0;y<F;y++)V.push(w+y*(b-w)/(F-1));for(V.push(b),_=0;_<P;_++)D.push(x+_*(A-x)/(P-1));D.push(A);var E=V.length,M=D.length,T=0,G=1,L=l.x!==o.x||l.y!==o.y||l.z!==o.z,O=!1,I=!1,z=!1;L&&(G=2,w>0&&(O=!0,T+=P-1),b<Math.PI&&(I=!0,T+=P-1),(A-x)%i.CesiumMath.TWO_PI?(z=!0,T+=2*(F-1)+1):T+=1);var N=M*E*G,R=new Float64Array(3*N),U=t.arrayFill(new Array(N),!1),S=t.arrayFill(new Array(N),!1),B=P*F*G,W=6*(B+T+1-(P+F)*G),q=u.IndexDatatype.createTypedArray(B,W),Y=k.normal?new Float32Array(3*N):void 0,J=k.tangent?new Float32Array(3*N):void 0,X=k.bitangent?new Float32Array(3*N):void 0,Z=k.st?new Float32Array(2*N):void 0,j=new Array(E),H=new Array(E);for(y=0;y<E;y++)j[y]=h(V[y]),H[y]=v(V[y]);var K=new Array(M),Q=new Array(M);for(_=0;_<M;_++)Q[_]=v(D[_]),K[_]=h(D[_]);for(y=0;y<E;y++)for(_=0;_<M;_++)R[g++]=o.x*j[y]*Q[_],R[g++]=o.y*j[y]*K[_],R[g++]=o.z*H[y];var $,ee,te,ae,re=N/2;if(L)for(y=0;y<E;y++)for(_=0;_<M;_++)R[g++]=l.x*j[y]*Q[_],R[g++]=l.y*j[y]*K[_],R[g++]=l.z*H[y],U[re]=!0,y>0&&y!==E-1&&0!==_&&_!==M-1&&(S[re]=!0),re++;for(g=0,y=1;y<E-2;y++)for($=y*M,ee=(y+1)*M,_=1;_<M-2;_++)q[g++]=ee+_,q[g++]=ee+_+1,q[g++]=$+_+1,q[g++]=ee+_,q[g++]=$+_+1,q[g++]=$+_;if(L){var ie=E*M;for(y=1;y<E-2;y++)for($=ie+y*M,ee=ie+(y+1)*M,_=1;_<M-2;_++)q[g++]=ee+_,q[g++]=$+_,q[g++]=$+_+1,q[g++]=ee+_,q[g++]=$+_+1,q[g++]=ee+_+1}if(L){if(O)for(ae=E*M,y=1;y<M-2;y++)q[g++]=y,q[g++]=y+1,q[g++]=ae+y+1,q[g++]=y,q[g++]=ae+y+1,q[g++]=ae+y;if(I)for(te=E*M-M,ae=E*M*G-M,y=1;y<M-2;y++)q[g++]=te+y+1,q[g++]=te+y,q[g++]=ae+y,q[g++]=te+y+1,q[g++]=ae+y,q[g++]=ae+y+1}if(z){for(y=1;y<E-2;y++)ae=M*E+M*y,te=M*y,q[g++]=ae,q[g++]=te+M,q[g++]=te,q[g++]=ae,q[g++]=ae+M,q[g++]=te+M;for(y=1;y<E-2;y++)ae=M*E+M*(y+1)-1,te=M*(y+1)-1,q[g++]=te+M,q[g++]=ae,q[g++]=te,q[g++]=te+M,q[g++]=ae+M,q[g++]=ae}var ne=new s.GeometryAttributes;k.position&&(ne.position=new m.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:R}));var oe,me=0,se=0,ue=0,le=0,fe=N/2,ce=r.Ellipsoid.fromCartesian3(o),de=r.Ellipsoid.fromCartesian3(l);if(k.st||k.normal||k.tangent||k.bitangent){for(y=0;y<N;y++){oe=U[y]?de:ce;var pe=r.Cartesian3.fromArray(R,3*y,f),Ce=oe.geodeticSurfaceNormal(pe,c);if(S[y]&&r.Cartesian3.negate(Ce,Ce),k.st){var ye=r.Cartesian2.negate(Ce,C);Z[me++]=Math.atan2(ye.y,ye.x)/i.CesiumMath.TWO_PI+.5,Z[me++]=Math.asin(Ce.z)/Math.PI+.5}if(k.normal&&(Y[se++]=Ce.x,Y[se++]=Ce.y,Y[se++]=Ce.z),k.tangent||k.bitangent){var ve,he=d,_e=0;if(U[y]&&(_e=fe),ve=!O&&y>=_e&&y<_e+2*M?r.Cartesian3.UNIT_X:r.Cartesian3.UNIT_Z,r.Cartesian3.cross(ve,Ce,he),r.Cartesian3.normalize(he,he),k.tangent&&(J[ue++]=he.x,J[ue++]=he.y,J[ue++]=he.z),k.bitangent){var xe=r.Cartesian3.cross(Ce,he,p);r.Cartesian3.normalize(xe,xe),X[le++]=xe.x,X[le++]=xe.y,X[le++]=xe.z}}}k.st&&(ne.st=new m.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:Z})),k.normal&&(ne.normal=new m.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:Y})),k.tangent&&(ne.tangent=new m.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:J})),k.bitangent&&(ne.bitangent=new m.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:X}))}if(n.defined(e._offsetAttribute)){var Ae=R.length,we=new Uint8Array(Ae/3),be=e._offsetAttribute===t.GeometryOffsetAttribute.NONE?0:1;t.arrayFill(we,be),ne.applyOffset=new m.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:we})}return new m.Geometry({attributes:ne,indices:q,primitiveType:m.PrimitiveType.TRIANGLES,boundingSphere:a.BoundingSphere.fromEllipsoid(ce),offsetAttribute:e._offsetAttribute})}}},_.getUnitEllipsoid=function(){return n.defined(x)||(x=_.createGeometry(new _({radii:new r.Cartesian3(1,1,1),vertexFormat:l.VertexFormat.POSITION_ONLY}))),x},e.EllipsoidGeometry=_}));