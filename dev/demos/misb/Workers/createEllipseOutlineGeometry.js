define(["./Matrix2-92b7fb9d","./when-8166c7dd","./EllipseOutlineGeometry-5a16619f","./RuntimeError-4fdc4459","./ComponentDatatype-9ed50558","./WebGLConstants-0664004c","./GeometryOffsetAttribute-e8e698d7","./Transforms-62a339c3","./combine-a5c4cc47","./EllipseGeometryLibrary-64f7a7c9","./GeometryAttribute-6f4c3b93","./GeometryAttributes-50becc99","./IndexDatatype-797210ca"],(function(e,t,r,i,n,c,o,l,a,s,d,u,f){"use strict";return function(i,n){return t.defined(n)&&(i=r.EllipseOutlineGeometry.unpack(i,n)),i._center=e.Cartesian3.clone(i._center),i._ellipsoid=e.Ellipsoid.clone(i._ellipsoid),r.EllipseOutlineGeometry.createGeometry(i)}}));