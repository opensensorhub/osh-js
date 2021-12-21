define(["exports","./Matrix2-92b7fb9d","./RuntimeError-4fdc4459","./when-8166c7dd","./Transforms-62a339c3"],(function(e,t,i,n,h){"use strict";function r(e,t,i,h){this.x=n.defaultValue(e,0),this.y=n.defaultValue(t,0),this.width=n.defaultValue(i,0),this.height=n.defaultValue(h,0)}r.packedLength=4,r.pack=function(e,t,h){return i.Check.typeOf.object("value",e),i.Check.defined("array",t),h=n.defaultValue(h,0),t[h++]=e.x,t[h++]=e.y,t[h++]=e.width,t[h]=e.height,t},r.unpack=function(e,t,h){return i.Check.defined("array",e),t=n.defaultValue(t,0),n.defined(h)||(h=new r),h.x=e[t++],h.y=e[t++],h.width=e[t++],h.height=e[t],h},r.fromPoints=function(e,t){if(n.defined(t)||(t=new r),!n.defined(e)||0===e.length)return t.x=0,t.y=0,t.width=0,t.height=0,t;for(var i=e.length,h=e[0].x,a=e[0].y,d=e[0].x,c=e[0].y,u=1;u<i;u++){var f=e[u],o=f.x,y=f.y;h=Math.min(o,h),d=Math.max(o,d),a=Math.min(y,a),c=Math.max(y,c)}return t.x=h,t.y=a,t.width=d-h,t.height=c-a,t};var a=new h.GeographicProjection,d=new t.Cartographic,c=new t.Cartographic;r.fromRectangle=function(e,i,h){if(n.defined(h)||(h=new r),!n.defined(e))return h.x=0,h.y=0,h.width=0,h.height=0,h;var u=(i=n.defaultValue(i,a)).project(t.Rectangle.southwest(e,d)),f=i.project(t.Rectangle.northeast(e,c));return t.Cartesian2.subtract(f,u,f),h.x=u.x,h.y=u.y,h.width=f.x,h.height=f.y,h},r.clone=function(e,t){if(n.defined(e))return n.defined(t)?(t.x=e.x,t.y=e.y,t.width=e.width,t.height=e.height,t):new r(e.x,e.y,e.width,e.height)},r.union=function(e,t,h){i.Check.typeOf.object("left",e),i.Check.typeOf.object("right",t),n.defined(h)||(h=new r);var a=Math.min(e.x,t.x),d=Math.min(e.y,t.y),c=Math.max(e.x+e.width,t.x+t.width),u=Math.max(e.y+e.height,t.y+t.height);return h.x=a,h.y=d,h.width=c-a,h.height=u-d,h},r.expand=function(e,t,n){i.Check.typeOf.object("rectangle",e),i.Check.typeOf.object("point",t),n=r.clone(e,n);var h=t.x-n.x,a=t.y-n.y;return h>n.width?n.width=h:h<0&&(n.width-=h,n.x=t.x),a>n.height?n.height=a:a<0&&(n.height-=a,n.y=t.y),n},r.intersect=function(e,t){i.Check.typeOf.object("left",e),i.Check.typeOf.object("right",t);var n=e.x,r=e.y,a=t.x,d=t.y;return n>a+t.width||n+e.width<a||r+e.height<d||r>d+t.height?h.Intersect.OUTSIDE:h.Intersect.INTERSECTING},r.equals=function(e,t){return e===t||n.defined(e)&&n.defined(t)&&e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height},r.prototype.clone=function(e){return r.clone(this,e)},r.prototype.intersect=function(e){return r.intersect(this,e)},r.prototype.equals=function(e){return r.equals(this,e)},e.BoundingRectangle=r}));