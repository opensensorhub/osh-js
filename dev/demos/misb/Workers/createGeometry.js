define(["./when-8166c7dd","./PrimitivePipeline-347d5966","./createTaskProcessorWorker","./Transforms-62a339c3","./Matrix2-92b7fb9d","./RuntimeError-4fdc4459","./ComponentDatatype-9ed50558","./WebGLConstants-0664004c","./combine-a5c4cc47","./GeometryAttribute-6f4c3b93","./GeometryAttributes-50becc99","./GeometryPipeline-54fb0bb4","./AttributeCompression-212262a3","./EncodedCartesian3-4a314cb8","./IndexDatatype-797210ca","./IntersectionTests-4f28a69c","./Plane-049255eb","./WebMercatorProjection-6ac42c0a"],(function(e,r,t,n,i,o,a,c,s,f,u,b,d,m,l,p,y,P){"use strict";var v={};function k(r){var t=v[r];return e.defined(t)||("object"==typeof exports?v[t]=t=require("Workers/"+r):require(["Workers/"+r],(function(e){v[t=e]=e}))),t}return t((function(t,n){for(var i=t.subTasks,o=i.length,a=new Array(o),c=0;c<o;c++){var s=i[c],f=s.geometry,u=s.moduleName;if(e.defined(u)){var b=k(u);a[c]=b(f,s.offset)}else a[c]=f}return e.when.all(a,(function(e){return r.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));