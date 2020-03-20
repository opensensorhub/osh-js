var $wnd = $wnd || window.parent;
var __gwtModuleFunction = $wnd.sml_editor;
var $sendStats = __gwtModuleFunction.__sendStats;
$sendStats('moduleStartup', 'moduleEvalStart');
var $gwt_version = "2.7.0";
var $strongName = 'F0371CB3107EEE39E947B592CDCA95CA';
var $gwt = {};
var $doc = $wnd.document;
var $moduleName, $moduleBase;
function __gwtStartLoadingFragment(frag) {
var fragFile = 'deferredjs/' + $strongName + '/' + frag + '.cache.js';
return __gwtModuleFunction.__startLoadingFragment(fragFile);
}
function __gwtInstallCode(code) {return __gwtModuleFunction.__installRunAsyncCode(code);}
function __gwt_isKnownPropertyValue(propName, propValue) {
return __gwtModuleFunction.__gwt_isKnownPropertyValue(propName, propValue);
}
function __gwt_getMetaProperty(name) {
return __gwtModuleFunction.__gwt_getMetaProperty(name);
}
var $stats = $wnd.__gwtStatsEvent ? function(a) {
return $wnd.__gwtStatsEvent && $wnd.__gwtStatsEvent(a);
} : null;
var $sessionId = $wnd.__gwtStatsSessionId ? $wnd.__gwtStatsSessionId : null;
var $intern_0 = 'object', $intern_1 = 'string', $intern_2 = 2147483647, $intern_3 = 'java.lang', $intern_4 = 'com.google.gwt.core.client', $intern_5 = 3.141592653589793, $intern_6 = 'com.google.gwt.animation.client', $intern_7 = 'com.google.gwt.user.client', $intern_8 = {3:1, 5:1}, $intern_9 = {3:1, 9:1, 5:1}, $intern_10 = 'com.google.gwt.core.client.impl', $intern_11 = 'anonymous', $intern_12 = {3:1, 286:1}, $intern_13 = 'Unknown', $intern_14 = {3:1}, $intern_15 = {113:1, 39:1, 3:1, 25:1, 22:1}, $intern_16 = 'com.google.gwt.dom.client', $intern_17 = 'com.google.web.bindery.event.shared', $intern_18 = 'com.google.gwt.event.shared', $intern_19 = 'com.google.gwt.event.dom.client', $intern_20 = 'com.google.gwt.event.logical.shared', $intern_21 = {64:1, 3:1, 9:1, 5:1}, $intern_22 = 'UmbrellaException', $intern_23 = 'com.google.gwt.http.client', $intern_24 = {48:1, 3:1, 9:1, 5:1}, $intern_25 = 4194303, $intern_26 = 1048575, $intern_27 = 17592186044416, $intern_28 = 4194304, $intern_29 = 524288, $intern_30 = 'com.google.gwt.text.shared.testing', $intern_31 = 'CSS1Compat', $intern_32 = 'load', $intern_33 = 65536, $intern_34 = 'DOMMouseScroll', $intern_35 = 131072, $intern_36 = 16777216, $intern_37 = 33554432, $intern_38 = 67108864, $intern_39 = '__gwtLastUnhandledEvent', $intern_40 = 'aria-hidden', $intern_41 = 'com.google.gwt.user.client.ui', $intern_42 = {14:1, 11:1, 13:1, 12:1, 15:1, 10:1, 8:1}, $intern_43 = {14:1, 11:1, 13:1, 12:1, 30:1, 15:1, 10:1, 8:1}, $intern_44 = {14:1, 11:1, 13:1, 12:1, 30:1, 61:1, 15:1, 10:1, 8:1}, $intern_45 = 'verticalAlign', $intern_46 = 'cellSpacing', $intern_47 = {14:1, 11:1, 13:1, 12:1, 30:1, 15:1, 60:1, 10:1, 8:1}, $intern_48 = 'height', $intern_49 = 'width', $intern_50 = 'cellPadding', $intern_51 = 'editor-area', $intern_52 = {14:1, 11:1, 13:1, 12:1, 30:1, 61:1, 15:1, 70:1, 10:1, 8:1}, $intern_53 = 'value', $intern_54 = {40:1, 3:1, 25:1, 22:1}, $intern_55 = 'gecko1_8', $intern_56 = 'Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (gecko1_8) does not match the runtime user.agent value (', $intern_57 = 'Expect more errors.', $intern_58 = 'com.google.gwt.xml.client.impl', $intern_59 = {45:1, 20:1}, $intern_60 = 'http://relaxng.org/ns/compatibility/annotations/1.0', $intern_61 = 'documentation', $intern_62 = 'http://relaxng.org/ns/structure/1.0', $intern_63 = 'name', $intern_64 = 'defaultValue', $intern_65 = 'com.sensia.gwt.relaxNG', $intern_66 = 'com.sensia.relaxNG', $intern_67 = {21:1, 7:1, 3:1}, $intern_68 = 'maxExclusive', $intern_69 = 'maxInclusive', $intern_70 = 'minExclusive', $intern_71 = 'minInclusive', $intern_72 = -2147483648, $intern_73 = 'beginPosition', $intern_74 = 'endPosition', $intern_75 = {4:1}, $intern_76 = 'com.sensia.swetools.editors.sensorml.client', $intern_77 = 'swe-property-panel', $intern_78 = {93:1, 38:1}, $intern_79 = {289:1, 38:1}, $intern_80 = 'rng-optional-unselect', $intern_81 = 'rng-optional-select', $intern_82 = 'Enter name', $intern_83 = 'identifier', $intern_84 = 'Identification', $intern_85 = 'Constraints', $intern_86 = 'Characteristics', $intern_87 = 'I/O Signals', $intern_88 = 'contactInfo', $intern_89 = {14:1, 11:1, 13:1, 12:1, 15:1, 10:1, 8:1, 288:1, 3:1}, $intern_90 = 'com.sensia.swetools.editors.sensorml.client.panels', $intern_91 = 'swe-object-type', $intern_92 = 'com.sensia.swetools.editors.sensorml.client.panels.elements', $intern_93 = 'swe-section-title', $intern_94 = 'invalid-value', $intern_95 = 'valid-value', $intern_96 = 'For input string: "', $intern_97 = 'java.util', $intern_98 = {78:1}, $intern_99 = {18:1}, $intern_100 = {3:1, 6:1}, $intern_101 = '__proto__', $intern_102 = 'com.google.gwt.lang';
var _, com_google_gwt_lang_ModuleUtils_initFnList, com_google_gwt_lang_JavaClassHierarchySetupUtil_prototypesByTypeId = {}, com_google_gwt_lang_CollapsedPropertyHolder_permutationId = -1;
function com_google_gwt_lang_JavaClassHierarchySetupUtil_typeMarkerFn__V(){
}

function com_google_gwt_lang_JavaClassHierarchySetupUtil_portableObjCreate__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(obj){
  function F(){
  }

  ;
  F.prototype = obj || {};
  return new F;
}

function com_google_gwt_lang_JavaClassHierarchySetupUtil_modernizeBrowser__V(){
  !Array.isArray && (Array.isArray = function(vArg){
    return Object.prototype.toString.call(vArg) === '[object Array]';
  }
  );
}

function com_google_gwt_lang_JavaClassHierarchySetupUtil_maybeGetClassLiteralFromPlaceHolder__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(entry){
  return entry instanceof Array?entry[0]:null;
}

function com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V(){
}

function com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(typeId, superTypeId, castableTypeMap){
  var prototypesByTypeId = com_google_gwt_lang_JavaClassHierarchySetupUtil_prototypesByTypeId;
  var createSubclassPrototype = com_google_gwt_lang_JavaClassHierarchySetupUtil_createSubclassPrototype__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2;
  var maybeGetClassLiteralFromPlaceHolder = com_google_gwt_lang_JavaClassHierarchySetupUtil_maybeGetClassLiteralFromPlaceHolder__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2;
  var prototype = prototypesByTypeId[typeId];
  var clazz = maybeGetClassLiteralFromPlaceHolder(prototype);
  if (prototype && !clazz) {
    _ = prototype;
  }
   else {
    _ = prototypesByTypeId[typeId] = !superTypeId?{}:createSubclassPrototype(superTypeId);
    _.java_lang_Object_castableTypeMap$ = castableTypeMap;
    _.constructor = _;
    !superTypeId && (_.java_lang_Object_typeMarker$ = com_google_gwt_lang_JavaClassHierarchySetupUtil_typeMarkerFn__V);
  }
  for (var i = 3; i < arguments.length; ++i) {
    arguments[i].prototype = _;
  }
  clazz && (_.java_lang_Object__1_1_1clazz$ = clazz);
}

function com_google_gwt_lang_JavaClassHierarchySetupUtil_createSubclassPrototype__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(superTypeId){
  var prototypesByTypeId = com_google_gwt_lang_JavaClassHierarchySetupUtil_prototypesByTypeId;
  return com_google_gwt_lang_JavaClassHierarchySetupUtil_portableObjCreate__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(prototypesByTypeId[superTypeId]);
}

function com_google_gwt_lang_ModuleUtils_setGwtProperty__Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2V(propertyName, propertyValue){
  typeof window === $intern_0 && typeof window['$gwt'] === $intern_0 && (window['$gwt'][propertyName] = propertyValue);
}

function com_google_gwt_lang_ModuleUtils_registerEntry__Lcom_google_gwt_core_client_JavaScriptObject_2(){
  return com_google_gwt_core_client_impl_Impl_entry__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2;
}

function com_google_gwt_lang_ModuleUtils_gwtOnLoad__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2V(errFn, modName, modBase, softPermutationId){
  com_google_gwt_lang_ModuleUtils_ensureModuleInit__V();
  var initFnList = com_google_gwt_lang_ModuleUtils_initFnList;
  $moduleName = modName;
  $moduleBase = modBase;
  com_google_gwt_lang_CollapsedPropertyHolder_permutationId = softPermutationId;
  function initializeModules(){
    for (var i = 0; i < initFnList.length; i++) {
      initFnList[i]();
    }
  }

  if (errFn) {
    try {
      $entry(initializeModules)();
    }
     catch (e) {
      errFn(modName, e);
    }
  }
   else {
    $entry(initializeModules)();
  }
}

function com_google_gwt_lang_ModuleUtils_ensureModuleInit__V(){
  com_google_gwt_lang_ModuleUtils_initFnList == null && (com_google_gwt_lang_ModuleUtils_initFnList = []);
}

function com_google_gwt_lang_ModuleUtils_addInitFunctions__V(){
  com_google_gwt_lang_ModuleUtils_ensureModuleInit__V();
  var initFnList = com_google_gwt_lang_ModuleUtils_initFnList;
  for (var i = 0; i < arguments.length; i++) {
    initFnList.push(arguments[i]);
  }
}

function java_lang_Object_Object__V(){
}

function java_lang_Object_equals_1Ljava_1lang_1Object_1_1Z_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(this$static, other){
  return com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(this$static)?java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(this$static, other):com_google_gwt_lang_Cast_hasJavaObjectVirtualDispatch__Ljava_lang_Object_2Z(this$static)?this$static.equals__Ljava_lang_Object_2Z$(other):com_google_gwt_lang_Cast_isJavaArray__Ljava_lang_Object_2Z(this$static)?this$static === other:this$static === other;
}

function java_lang_Object_getClass_1_1Ljava_1lang_1Class_1_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Class_2(this$static){
  return com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(this$static)?com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1String_12_1classLit:com_google_gwt_lang_Cast_hasJavaObjectVirtualDispatch__Ljava_lang_Object_2Z(this$static)?this$static.java_lang_Object__1_1_1clazz$:com_google_gwt_lang_Cast_isJavaArray__Ljava_lang_Object_2Z(this$static)?this$static.java_lang_Object__1_1_1clazz$:com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1JavaScriptObject_12_1classLit;
}

function java_lang_Object_hashCode_1_1I_1_1devirtual$__Ljava_lang_Object_2I(this$static){
  return com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(this$static)?java_lang_String$HashCache_getHashCode__Ljava_lang_String_2I(this$static):com_google_gwt_lang_Cast_hasJavaObjectVirtualDispatch__Ljava_lang_Object_2Z(this$static)?this$static.hashCode__I$():com_google_gwt_lang_Cast_isJavaArray__Ljava_lang_Object_2Z(this$static)?com_google_gwt_core_client_impl_Impl_getHashCode__Ljava_lang_Object_2I(this$static):com_google_gwt_core_client_impl_Impl_getHashCode__Ljava_lang_Object_2I(this$static);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(1, null, {}, java_lang_Object_Object__V);
_.equals__Ljava_lang_Object_2Z$ = function java_lang_Object_equals__Ljava_lang_Object_2Z(other){
  return this === other;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_lang_Object_getClass__Ljava_lang_Class_2(){
  return this.java_lang_Object__1_1_1clazz$;
}
;
_.hashCode__I$ = function java_lang_Object_hashCode__I(){
  return com_google_gwt_core_client_impl_Impl_getHashCode__Ljava_lang_Object_2I(this);
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Object_toString__Ljava_lang_String_2(){
  return java_lang_Class_$getName__Ljava_lang_Class_2Ljava_lang_String_2(java_lang_Object_getClass_1_1Ljava_1lang_1Class_1_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Class_2(this)) + '@' + java_lang_Integer_toUnsignedRadixString__IILjava_lang_String_2(java_lang_Object_hashCode_1_1I_1_1devirtual$__Ljava_lang_Object_2I(this), 16);
}
;
_.toString = function(){
  return this.toString__Ljava_lang_String_2$();
}
;
com_google_gwt_lang_Cast_stringCastMap = {3:1, 324:1, 25:1, 2:1};
com_google_gwt_lang_JavaClassHierarchySetupUtil_modernizeBrowser__V();
function com_google_gwt_lang_Cast_canCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(src_0, dstId){
  return com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(src_0) && !!com_google_gwt_lang_Cast_stringCastMap[dstId] || src_0.java_lang_Object_castableTypeMap$ && !!src_0.java_lang_Object_castableTypeMap$[dstId];
}

function com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(src_0, dstId){
  if (src_0 != null && !com_google_gwt_lang_Cast_canCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(src_0, dstId)) {
    throw new java_lang_ClassCastException_ClassCastException__V;
  }
  return src_0;
}

function com_google_gwt_lang_Cast_dynamicCastJso__Ljava_lang_Object_2Ljava_lang_Object_2(src_0){
  if (src_0 != null && !(!com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(src_0) && !com_google_gwt_lang_Util_hasTypeMarker__Ljava_lang_Object_2Z(src_0))) {
    throw new java_lang_ClassCastException_ClassCastException__V;
  }
  return src_0;
}

function com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(src_0){
  if (src_0 != null && !com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(src_0)) {
    throw new java_lang_ClassCastException_ClassCastException__V;
  }
  return src_0;
}

function com_google_gwt_lang_Cast_hasJavaObjectVirtualDispatch__Ljava_lang_Object_2Z(src_0){
  return !com_google_gwt_lang_Cast_instanceofArray__Ljava_lang_Object_2Z(src_0) && com_google_gwt_lang_Util_hasTypeMarker__Ljava_lang_Object_2Z(src_0);
}

function com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(src_0, dstId){
  return src_0 != null && com_google_gwt_lang_Cast_canCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(src_0, dstId);
}

function com_google_gwt_lang_Cast_instanceOfJso__Ljava_lang_Object_2Z(src_0){
  return src_0 != null && !com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(src_0) && !com_google_gwt_lang_Util_hasTypeMarker__Ljava_lang_Object_2Z(src_0);
}

function com_google_gwt_lang_Cast_instanceofArray__Ljava_lang_Object_2Z(src_0){
  return Array.isArray(src_0);
}

function com_google_gwt_lang_Cast_isJavaArray__Ljava_lang_Object_2Z(src_0){
  return com_google_gwt_lang_Cast_instanceofArray__Ljava_lang_Object_2Z(src_0) && com_google_gwt_lang_Util_hasTypeMarker__Ljava_lang_Object_2Z(src_0);
}

function com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(src_0){
  return typeof src_0 === $intern_1;
}

function com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(src_0){
  return src_0 == null?null:src_0;
}

function com_google_gwt_lang_Cast_round_1int__DI(x_0){
  return ~~Math.max(Math.min(x_0, $intern_2), -2147483648);
}

function com_google_gwt_lang_Cast_throwClassCastExceptionUnlessNull__Ljava_lang_Object_2Ljava_lang_Object_2(o){
  if (o != null) {
    throw new java_lang_ClassCastException_ClassCastException__V;
  }
  return null;
}

var com_google_gwt_lang_Cast_stringCastMap;
function java_lang_Class_$ensureNamesAreInitialized__Ljava_lang_Class_2V(this$static){
  if (this$static.java_lang_Class_typeName != null) {
    return;
  }
  java_lang_Class_initializeNames__Ljava_lang_Class_2V(this$static);
}

function java_lang_Class_$getName__Ljava_lang_Class_2Ljava_lang_String_2(this$static){
  java_lang_Class_$ensureNamesAreInitialized__Ljava_lang_Class_2V(this$static);
  return this$static.java_lang_Class_typeName;
}

function java_lang_Class_Class__V(){
  ++java_lang_Class_nextSequentialId;
  this.java_lang_Class_typeName = null;
  this.java_lang_Class_simpleName = null;
  this.java_lang_Class_packageName = null;
  this.java_lang_Class_compoundName = null;
  this.java_lang_Class_canonicalName = null;
  this.java_lang_Class_typeId = null;
  this.java_lang_Class_arrayLiterals = null;
}

function java_lang_Class_createClassObject__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2(packageName, compoundClassName){
  var clazz;
  clazz = new java_lang_Class_Class__V;
  clazz.java_lang_Class_packageName = packageName;
  clazz.java_lang_Class_compoundName = compoundClassName;
  return clazz;
}

function java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2(packageName, compoundClassName, typeId){
  var clazz;
  clazz = java_lang_Class_createClassObject__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2(packageName, compoundClassName);
  java_lang_Class_maybeSetClassLiteral__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2V(typeId, clazz);
  return clazz;
}

function java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2(packageName, compoundClassName, typeId, enumConstantsFunc){
  var clazz;
  clazz = java_lang_Class_createClassObject__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2(packageName, compoundClassName);
  java_lang_Class_maybeSetClassLiteral__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2V(typeId, clazz);
  clazz.java_lang_Class_modifiers = enumConstantsFunc?8:0;
  return clazz;
}

function java_lang_Class_createForInterface__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2(packageName, compoundClassName){
  var clazz;
  clazz = java_lang_Class_createClassObject__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2(packageName, compoundClassName);
  clazz.java_lang_Class_modifiers = 2;
  return clazz;
}

function java_lang_Class_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(leafClass, dimensions){
  var arrayLiterals = leafClass.java_lang_Class_arrayLiterals = leafClass.java_lang_Class_arrayLiterals || [];
  return arrayLiterals[dimensions] || (arrayLiterals[dimensions] = leafClass.private$java_lang_Class$createClassLiteralForArray__ILjava_lang_Class_2(dimensions));
}

function java_lang_Class_getPrototypeForClass__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2(clazz){
  if (clazz.isPrimitive__Z()) {
    return null;
  }
  var typeId = clazz.java_lang_Class_typeId;
  var prototype = com_google_gwt_lang_JavaClassHierarchySetupUtil_prototypesByTypeId[typeId];
  return prototype;
}

function java_lang_Class_initializeNames__Ljava_lang_Class_2V(clazz){
  if (clazz.isArray__Z()) {
    var componentType = clazz.java_lang_Class_componentType;
    componentType.isPrimitive__Z()?(clazz.java_lang_Class_typeName = '[' + componentType.java_lang_Class_typeId):!componentType.isArray__Z()?(clazz.java_lang_Class_typeName = '[L' + componentType.getName__Ljava_lang_String_2() + ';'):(clazz.java_lang_Class_typeName = '[' + componentType.getName__Ljava_lang_String_2());
    clazz.java_lang_Class_canonicalName = componentType.getCanonicalName__Ljava_lang_String_2() + '[]';
    clazz.java_lang_Class_simpleName = componentType.getSimpleName__Ljava_lang_String_2() + '[]';
    return;
  }
  var packageName = clazz.java_lang_Class_packageName;
  var compoundName = clazz.java_lang_Class_compoundName;
  compoundName = compoundName.split('/');
  clazz.java_lang_Class_typeName = java_lang_Class_join__Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2('.', [packageName, java_lang_Class_join__Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2('$', compoundName)]);
  clazz.java_lang_Class_canonicalName = java_lang_Class_join__Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2('.', [packageName, java_lang_Class_join__Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2('.', compoundName)]);
  clazz.java_lang_Class_simpleName = compoundName[compoundName.length - 1];
}

function java_lang_Class_join__Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(separator, strings){
  var i = 0;
  while (!strings[i] || strings[i] == '') {
    i++;
  }
  var result = strings[i++];
  for (; i < strings.length; i++) {
    if (!strings[i] || strings[i] == '') {
      continue;
    }
    result += separator + strings[i];
  }
  return result;
}

function java_lang_Class_maybeSetClassLiteral__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2V(typeId, clazz){
  var proto;
  if (!typeId) {
    return;
  }
  clazz.java_lang_Class_typeId = typeId;
  var prototype = java_lang_Class_getPrototypeForClass__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2(clazz);
  if (!prototype) {
    com_google_gwt_lang_JavaClassHierarchySetupUtil_prototypesByTypeId[typeId] = [clazz];
    return;
  }
  prototype.java_lang_Object__1_1_1clazz$ = clazz;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(114, 1, {}, java_lang_Class_Class__V);
_.private$java_lang_Class$createClassLiteralForArray__ILjava_lang_Class_2 = function java_lang_Class_createClassLiteralForArray__ILjava_lang_Class_2(dimensions){
  var clazz;
  clazz = new java_lang_Class_Class__V;
  clazz.java_lang_Class_modifiers = 4;
  dimensions > 1?(clazz.java_lang_Class_componentType = java_lang_Class_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(this, dimensions - 1)):(clazz.java_lang_Class_componentType = this);
  return clazz;
}
;
_.getCanonicalName__Ljava_lang_String_2 = function java_lang_Class_getCanonicalName__Ljava_lang_String_2(){
  java_lang_Class_$ensureNamesAreInitialized__Ljava_lang_Class_2V(this);
  return this.java_lang_Class_canonicalName;
}
;
_.getName__Ljava_lang_String_2 = function java_lang_Class_getName__Ljava_lang_String_2(){
  return java_lang_Class_$getName__Ljava_lang_Class_2Ljava_lang_String_2(this);
}
;
_.getSimpleName__Ljava_lang_String_2 = function java_lang_Class_getSimpleName__Ljava_lang_String_2(){
  java_lang_Class_$ensureNamesAreInitialized__Ljava_lang_Class_2V(this);
  return this.java_lang_Class_simpleName;
}
;
_.isArray__Z = function java_lang_Class_isArray__Z(){
  return (this.java_lang_Class_modifiers & 4) != 0;
}
;
_.isPrimitive__Z = function java_lang_Class_isPrimitive__Z(){
  return (this.java_lang_Class_modifiers & 1) != 0;
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Class_toString__Ljava_lang_String_2(){
  return ((this.java_lang_Class_modifiers & 2) != 0?'interface ':(this.java_lang_Class_modifiers & 1) != 0?'':'class ') + (java_lang_Class_$ensureNamesAreInitialized__Ljava_lang_Class_2V(this) , this.java_lang_Class_typeName);
}
;
_.java_lang_Class_modifiers = 0;
var java_lang_Class_nextSequentialId = 1;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Object_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Object', 1), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1JavaScriptObject_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_4, 'JavaScriptObject$', 0), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Class_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Class', 114);
function com_google_gwt_animation_client_Animation_$cancel__Lcom_google_gwt_animation_client_Animation_2V(this$static){
  if (!this$static.com_google_gwt_animation_client_Animation_isRunning) {
    return;
  }
  this$static.com_google_gwt_animation_client_Animation_wasStarted = this$static.com_google_gwt_animation_client_Animation_isStarted;
  this$static.com_google_gwt_animation_client_Animation_element = null;
  this$static.com_google_gwt_animation_client_Animation_isRunning = false;
  this$static.com_google_gwt_animation_client_Animation_isStarted = false;
  if (this$static.com_google_gwt_animation_client_Animation_requestHandle) {
    this$static.com_google_gwt_animation_client_Animation_requestHandle.cancel__V();
    this$static.com_google_gwt_animation_client_Animation_requestHandle = null;
  }
  this$static.com_google_gwt_animation_client_Animation_wasStarted && com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$onComplete__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2V(this$static);
}

function com_google_gwt_animation_client_Animation_$run__Lcom_google_gwt_animation_client_Animation_2IDLcom_google_gwt_dom_client_Element_2V(this$static, startTime){
  com_google_gwt_animation_client_Animation_$cancel__Lcom_google_gwt_animation_client_Animation_2V(this$static);
  this$static.com_google_gwt_animation_client_Animation_isRunning = true;
  this$static.com_google_gwt_animation_client_Animation_isStarted = false;
  this$static.com_google_gwt_animation_client_Animation_duration = 350;
  this$static.com_google_gwt_animation_client_Animation_startTime = startTime;
  this$static.com_google_gwt_animation_client_Animation_element = null;
  ++this$static.com_google_gwt_animation_client_Animation_runId;
  com_google_gwt_animation_client_Animation$1_$execute__Lcom_google_gwt_animation_client_Animation$1_2DV(this$static.com_google_gwt_animation_client_Animation_callback, com_google_gwt_core_client_JsDate_now__D());
}

function com_google_gwt_animation_client_Animation_$update__Lcom_google_gwt_animation_client_Animation_2DZ(this$static, curTime){
  var curRunId, finished, progress;
  curRunId = this$static.com_google_gwt_animation_client_Animation_runId;
  finished = curTime >= this$static.com_google_gwt_animation_client_Animation_startTime + this$static.com_google_gwt_animation_client_Animation_duration;
  if (this$static.com_google_gwt_animation_client_Animation_isStarted && !finished) {
    progress = (curTime - this$static.com_google_gwt_animation_client_Animation_startTime) / this$static.com_google_gwt_animation_client_Animation_duration;
    com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$onUpdate__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2DV(this$static, (1 + Math.cos($intern_5 + progress * $intern_5)) / 2);
    return this$static.com_google_gwt_animation_client_Animation_isRunning && this$static.com_google_gwt_animation_client_Animation_runId == curRunId;
  }
  if (!this$static.com_google_gwt_animation_client_Animation_isStarted && curTime >= this$static.com_google_gwt_animation_client_Animation_startTime) {
    this$static.com_google_gwt_animation_client_Animation_isStarted = true;
    com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$onStart__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2V(this$static);
    if (!(this$static.com_google_gwt_animation_client_Animation_isRunning && this$static.com_google_gwt_animation_client_Animation_runId == curRunId)) {
      return false;
    }
  }
  if (finished) {
    this$static.com_google_gwt_animation_client_Animation_isRunning = false;
    this$static.com_google_gwt_animation_client_Animation_isStarted = false;
    com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$onComplete__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2V(this$static);
    return false;
  }
  return true;
}

function com_google_gwt_animation_client_Animation_Animation__Lcom_google_gwt_animation_client_AnimationScheduler_2V(scheduler){
  this.com_google_gwt_animation_client_Animation_callback = new com_google_gwt_animation_client_Animation$1_Animation$1__Lcom_google_gwt_animation_client_Animation_2V(this);
  this.com_google_gwt_animation_client_Animation_scheduler = scheduler;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(142, 1, {});
_.com_google_gwt_animation_client_Animation_duration = -1;
_.com_google_gwt_animation_client_Animation_isRunning = false;
_.com_google_gwt_animation_client_Animation_isStarted = false;
_.com_google_gwt_animation_client_Animation_runId = -1;
_.com_google_gwt_animation_client_Animation_startTime = -1;
_.com_google_gwt_animation_client_Animation_wasStarted = false;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1Animation_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_6, 'Animation', 142);
function com_google_gwt_animation_client_Animation$1_$execute__Lcom_google_gwt_animation_client_Animation$1_2DV(this$static, timestamp){
  com_google_gwt_animation_client_Animation_$update__Lcom_google_gwt_animation_client_Animation_2DZ(this$static.com_google_gwt_animation_client_Animation$1_this$01, timestamp)?(this$static.com_google_gwt_animation_client_Animation$1_this$01.com_google_gwt_animation_client_Animation_requestHandle = this$static.com_google_gwt_animation_client_Animation$1_this$01.com_google_gwt_animation_client_Animation_scheduler.requestAnimationFrame__Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationHandle_2(this$static.com_google_gwt_animation_client_Animation$1_this$01.com_google_gwt_animation_client_Animation_callback, this$static.com_google_gwt_animation_client_Animation$1_this$01.com_google_gwt_animation_client_Animation_element)):(this$static.com_google_gwt_animation_client_Animation$1_this$01.com_google_gwt_animation_client_Animation_requestHandle = null);
}

function com_google_gwt_animation_client_Animation$1_Animation$1__Lcom_google_gwt_animation_client_Animation_2V(this$0){
  this.com_google_gwt_animation_client_Animation$1_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(274, 1, {}, com_google_gwt_animation_client_Animation$1_Animation$1__Lcom_google_gwt_animation_client_Animation_2V);
_.execute__DV = function com_google_gwt_animation_client_Animation$1_execute__DV(timestamp){
  com_google_gwt_animation_client_Animation$1_$execute__Lcom_google_gwt_animation_client_Animation$1_2DV(this, timestamp);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1Animation$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_6, 'Animation/1', 274);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(320, 1, {});
var com_google_gwt_animation_client_AnimationScheduler_instance;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1AnimationScheduler_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_6, 'AnimationScheduler', 320);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(110, 1, {110:1});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1AnimationScheduler$AnimationHandle_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_6, 'AnimationScheduler/AnimationHandle', 110);
function com_google_gwt_animation_client_AnimationSchedulerImplStandard_AnimationSchedulerImplStandard__V(){
}

function com_google_gwt_animation_client_AnimationSchedulerImplStandard_cancelImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(holder){
  $wnd.cancelAnimationFrame(holder.id);
}

function com_google_gwt_animation_client_AnimationSchedulerImplStandard_requestImpl__Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_core_client_JavaScriptObject_2(cb, element){
  var callback = $entry(function(){
    var time = com_google_gwt_core_client_JsDate_now__D();
    cb.execute__DV(time);
  }
  );
  var handle = $wnd.requestAnimationFrame(callback, element);
  return {id:handle};
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(282, 320, {}, com_google_gwt_animation_client_AnimationSchedulerImplStandard_AnimationSchedulerImplStandard__V);
_.requestAnimationFrame__Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationHandle_2 = function com_google_gwt_animation_client_AnimationSchedulerImplStandard_requestAnimationFrame__Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationHandle_2(callback, element){
  var handle;
  handle = com_google_gwt_animation_client_AnimationSchedulerImplStandard_requestImpl__Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_core_client_JavaScriptObject_2(callback, element);
  return new com_google_gwt_animation_client_AnimationSchedulerImplStandard$1_AnimationSchedulerImplStandard$1__Lcom_google_gwt_animation_client_AnimationSchedulerImplStandard_2V(handle);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1AnimationSchedulerImplStandard_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_6, 'AnimationSchedulerImplStandard', 282);
function com_google_gwt_animation_client_AnimationSchedulerImplStandard$1_AnimationSchedulerImplStandard$1__Lcom_google_gwt_animation_client_AnimationSchedulerImplStandard_2V(val$handle){
  this.com_google_gwt_animation_client_AnimationSchedulerImplStandard$1_val$handle2 = val$handle;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(283, 110, {110:1}, com_google_gwt_animation_client_AnimationSchedulerImplStandard$1_AnimationSchedulerImplStandard$1__Lcom_google_gwt_animation_client_AnimationSchedulerImplStandard_2V);
_.cancel__V = function com_google_gwt_animation_client_AnimationSchedulerImplStandard$1_cancel__V(){
  com_google_gwt_animation_client_AnimationSchedulerImplStandard_cancelImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(this.com_google_gwt_animation_client_AnimationSchedulerImplStandard$1_val$handle2);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1AnimationSchedulerImplStandard$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_6, 'AnimationSchedulerImplStandard/1', 283);
function com_google_gwt_animation_client_AnimationSchedulerImplTimer_$cancelAnimationFrame__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationHandle_2V(this$static, requestId){
  java_util_ArrayList_$remove__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static.com_google_gwt_animation_client_AnimationSchedulerImplTimer_animationRequests, requestId);
  this$static.com_google_gwt_animation_client_AnimationSchedulerImplTimer_animationRequests.java_util_ArrayList_array.length == 0 && com_google_gwt_user_client_Timer_$cancel__Lcom_google_gwt_user_client_Timer_2V(this$static.com_google_gwt_animation_client_AnimationSchedulerImplTimer_timer);
}

function com_google_gwt_animation_client_AnimationSchedulerImplTimer_$updateAnimations__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2V(this$static){
  var curAnimations, duration, requestId, requestId$index, requestId$max;
  curAnimations = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1AnimationSchedulerImplTimer$AnimationHandleImpl_12_1classLit, {332:1, 3:1}, 112, this$static.com_google_gwt_animation_client_AnimationSchedulerImplTimer_animationRequests.java_util_ArrayList_array.length, 0, 1);
  curAnimations = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_ArrayList_$toArray__Ljava_util_ArrayList_2_3Ljava_lang_Object_2_3Ljava_lang_Object_2(this$static.com_google_gwt_animation_client_AnimationSchedulerImplTimer_animationRequests, curAnimations), 332);
  duration = new com_google_gwt_core_client_Duration_Duration__V;
  for (requestId$index = 0 , requestId$max = curAnimations.length; requestId$index < requestId$max; ++requestId$index) {
    requestId = curAnimations[requestId$index];
    java_util_ArrayList_$remove__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static.com_google_gwt_animation_client_AnimationSchedulerImplTimer_animationRequests, requestId);
    com_google_gwt_animation_client_Animation$1_$execute__Lcom_google_gwt_animation_client_Animation$1_2DV(requestId.com_google_gwt_animation_client_AnimationSchedulerImplTimer$AnimationHandleImpl_callback, duration.com_google_gwt_core_client_Duration_start);
  }
  this$static.com_google_gwt_animation_client_AnimationSchedulerImplTimer_animationRequests.java_util_ArrayList_array.length > 0 && com_google_gwt_user_client_Timer_$schedule__Lcom_google_gwt_user_client_Timer_2IV(this$static.com_google_gwt_animation_client_AnimationSchedulerImplTimer_timer, java_lang_Math_max__III(16 - (com_google_gwt_core_client_JsDate_now__D() - duration.com_google_gwt_core_client_Duration_start)));
}

function com_google_gwt_animation_client_AnimationSchedulerImplTimer_AnimationSchedulerImplTimer__V(){
  this.com_google_gwt_animation_client_AnimationSchedulerImplTimer_animationRequests = new java_util_ArrayList_ArrayList__V;
  this.com_google_gwt_animation_client_AnimationSchedulerImplTimer_timer = new com_google_gwt_animation_client_AnimationSchedulerImplTimer$1_AnimationSchedulerImplTimer$1__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2V(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(284, 320, {}, com_google_gwt_animation_client_AnimationSchedulerImplTimer_AnimationSchedulerImplTimer__V);
_.requestAnimationFrame__Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationHandle_2 = function com_google_gwt_animation_client_AnimationSchedulerImplTimer_requestAnimationFrame__Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationHandle_2(callback, element){
  var requestId;
  requestId = new com_google_gwt_animation_client_AnimationSchedulerImplTimer$AnimationHandleImpl_AnimationSchedulerImplTimer$AnimationHandleImpl__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2V(this, callback);
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this.com_google_gwt_animation_client_AnimationSchedulerImplTimer_animationRequests, requestId);
  this.com_google_gwt_animation_client_AnimationSchedulerImplTimer_animationRequests.java_util_ArrayList_array.length == 1 && com_google_gwt_user_client_Timer_$schedule__Lcom_google_gwt_user_client_Timer_2IV(this.com_google_gwt_animation_client_AnimationSchedulerImplTimer_timer, 16);
  return requestId;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1AnimationSchedulerImplTimer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_6, 'AnimationSchedulerImplTimer', 284);
function com_google_gwt_user_client_Timer_$cancel__Lcom_google_gwt_user_client_Timer_2V(this$static){
  if (!this$static.com_google_gwt_user_client_Timer_timerId) {
    return;
  }
  ++this$static.com_google_gwt_user_client_Timer_cancelCounter;
  this$static.com_google_gwt_user_client_Timer_isRepeating?com_google_gwt_user_client_Timer_clearInterval__IV(this$static.com_google_gwt_user_client_Timer_timerId.java_lang_Integer_value):com_google_gwt_user_client_Timer_clearTimeout__IV(this$static.com_google_gwt_user_client_Timer_timerId.java_lang_Integer_value);
  this$static.com_google_gwt_user_client_Timer_timerId = null;
}

function com_google_gwt_user_client_Timer_$schedule__Lcom_google_gwt_user_client_Timer_2IV(this$static, delayMillis){
  if (delayMillis < 0) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V('must be non-negative');
  }
  !!this$static.com_google_gwt_user_client_Timer_timerId && com_google_gwt_user_client_Timer_$cancel__Lcom_google_gwt_user_client_Timer_2V(this$static);
  this$static.com_google_gwt_user_client_Timer_isRepeating = false;
  this$static.com_google_gwt_user_client_Timer_timerId = java_lang_Integer_valueOf__ILjava_lang_Integer_2(com_google_gwt_user_client_Timer_setTimeout__Lcom_google_gwt_core_client_JavaScriptObject_2II(com_google_gwt_user_client_Timer_createCallback__Lcom_google_gwt_user_client_Timer_2ILcom_google_gwt_core_client_JavaScriptObject_2(this$static, this$static.com_google_gwt_user_client_Timer_cancelCounter), delayMillis));
}

function com_google_gwt_user_client_Timer_Timer__V(){
}

function com_google_gwt_user_client_Timer_clearInterval__IV(timerId){
  $wnd.clearInterval(timerId);
}

function com_google_gwt_user_client_Timer_clearTimeout__IV(timerId){
  $wnd.clearTimeout(timerId);
}

function com_google_gwt_user_client_Timer_createCallback__Lcom_google_gwt_user_client_Timer_2ILcom_google_gwt_core_client_JavaScriptObject_2(timer, cancelCounter){
  return $entry(function(){
    timer.package_private$com_google_gwt_user_client_Timer$fire__IV(cancelCounter);
  }
  );
}

function com_google_gwt_user_client_Timer_setTimeout__Lcom_google_gwt_core_client_JavaScriptObject_2II(func, time){
  return $wnd.setTimeout(func, time);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(128, 1, {});
_.package_private$com_google_gwt_user_client_Timer$fire__IV = function com_google_gwt_user_client_Timer_fire__IV(scheduleCancelCounter){
  if (scheduleCancelCounter != this.com_google_gwt_user_client_Timer_cancelCounter) {
    return;
  }
  this.com_google_gwt_user_client_Timer_isRepeating || (this.com_google_gwt_user_client_Timer_timerId = null);
  this.run__V();
}
;
_.com_google_gwt_user_client_Timer_cancelCounter = 0;
_.com_google_gwt_user_client_Timer_isRepeating = false;
_.com_google_gwt_user_client_Timer_timerId = null;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Timer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_7, 'Timer', 128);
function com_google_gwt_animation_client_AnimationSchedulerImplTimer$1_AnimationSchedulerImplTimer$1__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2V(this$0){
  this.com_google_gwt_animation_client_AnimationSchedulerImplTimer$1_this$01 = this$0;
  com_google_gwt_user_client_Timer_Timer__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(285, 128, {}, com_google_gwt_animation_client_AnimationSchedulerImplTimer$1_AnimationSchedulerImplTimer$1__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2V);
_.run__V = function com_google_gwt_animation_client_AnimationSchedulerImplTimer$1_run__V(){
  com_google_gwt_animation_client_AnimationSchedulerImplTimer_$updateAnimations__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2V(this.com_google_gwt_animation_client_AnimationSchedulerImplTimer$1_this$01);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1AnimationSchedulerImplTimer$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_6, 'AnimationSchedulerImplTimer/1', 285);
function com_google_gwt_animation_client_AnimationSchedulerImplTimer$AnimationHandleImpl_AnimationSchedulerImplTimer$AnimationHandleImpl__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2V(this$0, callback){
  this.com_google_gwt_animation_client_AnimationSchedulerImplTimer$AnimationHandleImpl_this$01 = this$0;
  this.com_google_gwt_animation_client_AnimationSchedulerImplTimer$AnimationHandleImpl_callback = callback;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(112, 110, {110:1, 112:1}, com_google_gwt_animation_client_AnimationSchedulerImplTimer$AnimationHandleImpl_AnimationSchedulerImplTimer$AnimationHandleImpl__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationCallback_2V);
_.cancel__V = function com_google_gwt_animation_client_AnimationSchedulerImplTimer$AnimationHandleImpl_cancel__V(){
  com_google_gwt_animation_client_AnimationSchedulerImplTimer_$cancelAnimationFrame__Lcom_google_gwt_animation_client_AnimationSchedulerImplTimer_2Lcom_google_gwt_animation_client_AnimationScheduler$AnimationHandle_2V(this.com_google_gwt_animation_client_AnimationSchedulerImplTimer$AnimationHandleImpl_this$01, this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1animation_1client_1AnimationSchedulerImplTimer$AnimationHandleImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_6, 'AnimationSchedulerImplTimer/AnimationHandleImpl', 112);
function com_google_gwt_core_client_Duration_Duration__V(){
  this.com_google_gwt_core_client_Duration_start = com_google_gwt_core_client_JsDate_now__D();
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(125, 1, {}, com_google_gwt_core_client_Duration_Duration__V);
_.com_google_gwt_core_client_Duration_start = 0;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1Duration_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_4, 'Duration', 125);
function com_google_gwt_core_client_GWT_isScript__Z(){
  return true;
}

function java_lang_Throwable_$fillInStackTrace__Ljava_lang_Throwable_2Ljava_lang_Throwable_2(this$static){
  this$static.java_lang_Throwable_stackTrace = null;
  com_google_gwt_core_client_impl_StackTraceCreator_captureStackTrace__Ljava_lang_Throwable_2Ljava_lang_Object_2V(this$static, this$static.java_lang_Throwable_detailMessage);
  return this$static;
}

function java_lang_Throwable_$initCause__Ljava_lang_Throwable_2Ljava_lang_Throwable_2Ljava_lang_Throwable_2(this$static, cause){
  com_google_gwt_core_shared_impl_InternalPreconditions_checkState__ZLjava_lang_Object_2V(!this$static.java_lang_Throwable_cause);
  com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalArgument__ZLjava_lang_Object_2V(cause != this$static, 'Self-causation not permitted');
  this$static.java_lang_Throwable_cause = cause;
  return this$static;
}

function java_lang_Throwable_$printStackTrace__Ljava_lang_Throwable_2Ljava_io_PrintStream_2V(this$static){
  var element$array, element$index, element$max, t, com_google_gwt_core_client_impl_StackTraceCreator_constructJavaStackTrace__Ljava_lang_Throwable_2_3Ljava_lang_StackTraceElement_2_stackTrace_0;
  for (t = this$static; t; t = t.java_lang_Throwable_cause) {
    for (element$array = (t.java_lang_Throwable_stackTrace == null && (t.java_lang_Throwable_stackTrace = (com_google_gwt_core_client_impl_StackTraceCreator_$clinit__V() , com_google_gwt_core_client_impl_StackTraceCreator_constructJavaStackTrace__Ljava_lang_Throwable_2_3Ljava_lang_StackTraceElement_2_stackTrace_0 = com_google_gwt_core_client_impl_StackTraceCreator_collector.getStackTrace__Ljava_lang_Object_2_3Ljava_lang_StackTraceElement_2(t) , com_google_gwt_core_client_impl_StackTraceCreator_dropInternalFrames___3Ljava_lang_StackTraceElement_2_3Ljava_lang_StackTraceElement_2(com_google_gwt_core_client_impl_StackTraceCreator_constructJavaStackTrace__Ljava_lang_Throwable_2_3Ljava_lang_StackTraceElement_2_stackTrace_0))) , t.java_lang_Throwable_stackTrace) , element$index = 0 , element$max = element$array.length; element$index < element$max; ++element$index)
    ;
  }
}

function java_lang_Throwable_Throwable__Ljava_lang_String_2Ljava_lang_Throwable_2V(message, cause){
  this.java_lang_Throwable_cause = cause;
  this.java_lang_Throwable_detailMessage = message;
  java_lang_Throwable_$fillInStackTrace__Ljava_lang_Throwable_2Ljava_lang_Throwable_2(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(5, 1, $intern_8);
_.getMessage__Ljava_lang_String_2 = function java_lang_Throwable_getMessage__Ljava_lang_String_2(){
  return this.java_lang_Throwable_detailMessage;
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Throwable_toString__Ljava_lang_String_2(){
  var className, msg;
  className = java_lang_Class_$getName__Ljava_lang_Class_2Ljava_lang_String_2(this.java_lang_Object__1_1_1clazz$);
  msg = this.getMessage__Ljava_lang_String_2();
  return msg != null?className + ': ' + msg:className;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Throwable_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Throwable', 5);
function java_lang_Exception_Exception__Ljava_lang_String_2V(message){
  this.java_lang_Throwable_detailMessage = message;
  java_lang_Throwable_$fillInStackTrace__Ljava_lang_Throwable_2Ljava_lang_Throwable_2(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(9, 5, $intern_9);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Exception_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Exception', 9);
function java_lang_RuntimeException_RuntimeException__V(){
  java_lang_Throwable_$fillInStackTrace__Ljava_lang_Throwable_2Ljava_lang_Throwable_2(this);
}

function java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V(message){
  java_lang_Exception_Exception__Ljava_lang_String_2V.call(this, message);
}

function java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2Ljava_lang_Throwable_2V(message, cause){
  java_lang_Throwable_Throwable__Ljava_lang_String_2Ljava_lang_Throwable_2V.call(this, message, cause);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(17, 9, $intern_9, java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1RuntimeException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'RuntimeException', 17);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(147, 17, $intern_9);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1JavaScriptExceptionBase_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_10, 'JavaScriptExceptionBase', 147);
function com_google_gwt_core_client_JavaScriptException_$clinit__V(){
  com_google_gwt_core_client_JavaScriptException_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_core_client_JavaScriptException_NOT_1SET = new java_lang_Object_Object__V;
}

function com_google_gwt_core_client_JavaScriptException_$ensureInit__Lcom_google_gwt_core_client_JavaScriptException_2V(this$static){
  var exception;
  if (this$static.com_google_gwt_core_client_JavaScriptException_message == null) {
    exception = com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_google_gwt_core_client_JavaScriptException_e) === com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_core_client_JavaScriptException_NOT_1SET)?null:this$static.com_google_gwt_core_client_JavaScriptException_e;
    this$static.com_google_gwt_core_client_JavaScriptException_name = exception == null?'null':com_google_gwt_lang_Cast_instanceOfJso__Ljava_lang_Object_2Z(exception)?com_google_gwt_core_client_JavaScriptException_getExceptionName0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(com_google_gwt_lang_Cast_dynamicCastJso__Ljava_lang_Object_2Ljava_lang_Object_2(exception)):com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(exception)?'String':java_lang_Class_$getName__Ljava_lang_Class_2Ljava_lang_String_2(java_lang_Object_getClass_1_1Ljava_1lang_1Class_1_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Class_2(exception));
    this$static.com_google_gwt_core_client_JavaScriptException_description = this$static.com_google_gwt_core_client_JavaScriptException_description + ': ' + (com_google_gwt_lang_Cast_instanceOfJso__Ljava_lang_Object_2Z(exception)?com_google_gwt_core_client_JavaScriptException_getExceptionDescription0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(com_google_gwt_lang_Cast_dynamicCastJso__Ljava_lang_Object_2Ljava_lang_Object_2(exception)):exception + '');
    this$static.com_google_gwt_core_client_JavaScriptException_message = '(' + this$static.com_google_gwt_core_client_JavaScriptException_name + ') ' + this$static.com_google_gwt_core_client_JavaScriptException_description;
  }
}

function com_google_gwt_core_client_JavaScriptException_JavaScriptException__Ljava_lang_Object_2V(e){
  com_google_gwt_core_client_JavaScriptException_$clinit__V();
  this.java_lang_Throwable_cause = null;
  this.java_lang_Throwable_detailMessage = null;
  this.com_google_gwt_core_client_JavaScriptException_description = '';
  this.com_google_gwt_core_client_JavaScriptException_e = e;
  this.com_google_gwt_core_client_JavaScriptException_description = '';
}

function com_google_gwt_core_client_JavaScriptException_getExceptionDescription0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(e){
  return e == null?null:e.message;
}

function com_google_gwt_core_client_JavaScriptException_getExceptionName0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(e){
  return e == null?null:e.name;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(31, 147, {31:1, 3:1, 9:1, 5:1}, com_google_gwt_core_client_JavaScriptException_JavaScriptException__Ljava_lang_Object_2V);
_.getMessage__Ljava_lang_String_2 = function com_google_gwt_core_client_JavaScriptException_getMessage__Ljava_lang_String_2(){
  return com_google_gwt_core_client_JavaScriptException_$ensureInit__Lcom_google_gwt_core_client_JavaScriptException_2V(this) , this.com_google_gwt_core_client_JavaScriptException_message;
}
;
_.getThrown__Ljava_lang_Object_2 = function com_google_gwt_core_client_JavaScriptException_getThrown__Ljava_lang_Object_2(){
  return com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(this.com_google_gwt_core_client_JavaScriptException_e) === com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_core_client_JavaScriptException_NOT_1SET)?null:this.com_google_gwt_core_client_JavaScriptException_e;
}
;
var com_google_gwt_core_client_JavaScriptException_NOT_1SET;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1JavaScriptException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_4, 'JavaScriptException', 31);
function com_google_gwt_core_client_JsArray_$push__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JavaScriptObject_2V(this$static, value_0){
  this$static[this$static.length] = value_0;
}

function com_google_gwt_core_client_JsDate_now__D(){
  if (Date.now) {
    return Date.now();
  }
  return (new Date).getTime();
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(291, 1, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1Scheduler_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_4, 'Scheduler', 291);
function com_google_gwt_core_client_impl_Impl_apply__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(jsFunction, thisObj, args){
  return jsFunction.apply(thisObj, args);
  var _;
}

function com_google_gwt_core_client_impl_Impl_enter__Z(){
  var now_0;
  if (com_google_gwt_core_client_impl_Impl_entryDepth != 0) {
    now_0 = com_google_gwt_core_client_JsDate_now__D();
    if (now_0 - com_google_gwt_core_client_impl_Impl_watchdogEntryDepthLastScheduled > 2000) {
      com_google_gwt_core_client_impl_Impl_watchdogEntryDepthLastScheduled = now_0;
      com_google_gwt_core_client_impl_Impl_watchdogEntryDepthTimerId = $wnd.setTimeout(com_google_gwt_core_client_impl_Impl_watchdogEntryDepthRun__V, 10);
    }
  }
  if (com_google_gwt_core_client_impl_Impl_entryDepth++ == 0) {
    com_google_gwt_core_client_impl_SchedulerImpl_$flushEntryCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V((com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V() , com_google_gwt_core_client_impl_SchedulerImpl_INSTANCE));
    return true;
  }
  return false;
}

function com_google_gwt_core_client_impl_Impl_entry__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(jsFunction){
  return function(){
    if (com_google_gwt_core_client_GWT_isScript__Z()) {
      return com_google_gwt_core_client_impl_Impl_entry0__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(jsFunction, this, arguments);
    }
     else {
      var _ = com_google_gwt_core_client_impl_Impl_entry0__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(jsFunction, this, arguments);
      _ != null && (_ = _.val);
      return _;
    }
  }
  ;
}

function com_google_gwt_core_client_impl_Impl_entry0__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(jsFunction, thisObj, args){
  var initialEntry;
  initialEntry = com_google_gwt_core_client_impl_Impl_enter__Z();
  try {
    return com_google_gwt_core_client_impl_Impl_apply__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(jsFunction, thisObj, args);
  }
   finally {
    com_google_gwt_core_client_impl_Impl_exit__ZV(initialEntry);
  }
}

function com_google_gwt_core_client_impl_Impl_exit__ZV(initialEntry){
  initialEntry && com_google_gwt_core_client_impl_SchedulerImpl_$flushFinallyCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V((com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V() , com_google_gwt_core_client_impl_SchedulerImpl_INSTANCE));
  --com_google_gwt_core_client_impl_Impl_entryDepth;
  if (initialEntry) {
    if (com_google_gwt_core_client_impl_Impl_watchdogEntryDepthTimerId != -1) {
      com_google_gwt_core_client_impl_Impl_watchdogEntryDepthCancel__IV(com_google_gwt_core_client_impl_Impl_watchdogEntryDepthTimerId);
      com_google_gwt_core_client_impl_Impl_watchdogEntryDepthTimerId = -1;
    }
  }
}

function com_google_gwt_core_client_impl_Impl_getHashCode__Ljava_lang_Object_2I(o){
  return o.$H || (o.$H = ++com_google_gwt_core_client_impl_Impl_sNextHashId);
}

function com_google_gwt_core_client_impl_Impl_reportToBrowser__Ljava_lang_Object_2V(e){
  $wnd.setTimeout(function(){
    throw e;
  }
  , 0);
}

function com_google_gwt_core_client_impl_Impl_watchdogEntryDepthCancel__IV(timerId){
  $wnd.clearTimeout(timerId);
}

function com_google_gwt_core_client_impl_Impl_watchdogEntryDepthRun__V(){
  com_google_gwt_core_client_impl_Impl_entryDepth != 0 && (com_google_gwt_core_client_impl_Impl_entryDepth = 0);
  com_google_gwt_core_client_impl_Impl_watchdogEntryDepthTimerId = -1;
}

var com_google_gwt_core_client_impl_Impl_entryDepth = 0, com_google_gwt_core_client_impl_Impl_sNextHashId = 0, com_google_gwt_core_client_impl_Impl_watchdogEntryDepthLastScheduled = 0, com_google_gwt_core_client_impl_Impl_watchdogEntryDepthTimerId = -1;
function com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V(){
  com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_core_client_impl_SchedulerImpl_INSTANCE = new com_google_gwt_core_client_impl_SchedulerImpl_SchedulerImpl__V;
}

function com_google_gwt_core_client_impl_SchedulerImpl_$flushEntryCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$static){
  var oldQueue, rescheduled;
  if (this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands;
      this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands = null;
      rescheduled = com_google_gwt_core_client_impl_SchedulerImpl_runScheduledTasks__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2(oldQueue, rescheduled);
    }
     while (this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands);
    this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands = rescheduled;
  }
}

function com_google_gwt_core_client_impl_SchedulerImpl_$flushFinallyCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$static){
  var oldQueue, rescheduled;
  if (this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands;
      this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands = null;
      rescheduled = com_google_gwt_core_client_impl_SchedulerImpl_runScheduledTasks__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2(oldQueue, rescheduled);
    }
     while (this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands);
    this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands = rescheduled;
  }
}

function com_google_gwt_core_client_impl_SchedulerImpl_$flushPostEventPumpCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$static){
  var oldDeferred;
  if (this$static.com_google_gwt_core_client_impl_SchedulerImpl_deferredCommands) {
    oldDeferred = this$static.com_google_gwt_core_client_impl_SchedulerImpl_deferredCommands;
    this$static.com_google_gwt_core_client_impl_SchedulerImpl_deferredCommands = null;
    !this$static.com_google_gwt_core_client_impl_SchedulerImpl_incrementalCommands && (this$static.com_google_gwt_core_client_impl_SchedulerImpl_incrementalCommands = []);
    com_google_gwt_core_client_impl_SchedulerImpl_runScheduledTasks__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2(oldDeferred, this$static.com_google_gwt_core_client_impl_SchedulerImpl_incrementalCommands);
  }
  !!this$static.com_google_gwt_core_client_impl_SchedulerImpl_incrementalCommands && (this$static.com_google_gwt_core_client_impl_SchedulerImpl_incrementalCommands = com_google_gwt_core_client_impl_SchedulerImpl_$runRepeatingTasks__Lcom_google_gwt_core_client_impl_SchedulerImpl_2Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2(this$static.com_google_gwt_core_client_impl_SchedulerImpl_incrementalCommands));
}

function com_google_gwt_core_client_impl_SchedulerImpl_$isWorkQueued__Lcom_google_gwt_core_client_impl_SchedulerImpl_2Z(this$static){
  return !!this$static.com_google_gwt_core_client_impl_SchedulerImpl_deferredCommands || !!this$static.com_google_gwt_core_client_impl_SchedulerImpl_incrementalCommands;
}

function com_google_gwt_core_client_impl_SchedulerImpl_$maybeSchedulePostEventPumpCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$static){
  if (!this$static.com_google_gwt_core_client_impl_SchedulerImpl_shouldBeRunning) {
    this$static.com_google_gwt_core_client_impl_SchedulerImpl_shouldBeRunning = true;
    !this$static.com_google_gwt_core_client_impl_SchedulerImpl_flusher && (this$static.com_google_gwt_core_client_impl_SchedulerImpl_flusher = new com_google_gwt_core_client_impl_SchedulerImpl$Flusher_SchedulerImpl$Flusher__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$static));
    com_google_gwt_core_client_impl_SchedulerImpl_scheduleFixedDelayImpl__Lcom_google_gwt_core_client_Scheduler$RepeatingCommand_2IV(this$static.com_google_gwt_core_client_impl_SchedulerImpl_flusher, 1);
    !this$static.com_google_gwt_core_client_impl_SchedulerImpl_rescue && (this$static.com_google_gwt_core_client_impl_SchedulerImpl_rescue = new com_google_gwt_core_client_impl_SchedulerImpl$Rescuer_SchedulerImpl$Rescuer__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$static));
    com_google_gwt_core_client_impl_SchedulerImpl_scheduleFixedDelayImpl__Lcom_google_gwt_core_client_Scheduler$RepeatingCommand_2IV(this$static.com_google_gwt_core_client_impl_SchedulerImpl_rescue, 50);
  }
}

function com_google_gwt_core_client_impl_SchedulerImpl_$runRepeatingTasks__Lcom_google_gwt_core_client_impl_SchedulerImpl_2Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2(tasks){
  var canceledSomeTasks, duration, executedSomeTask, i, length_0, newTasks, t;
  length_0 = tasks.length;
  if (length_0 == 0) {
    return null;
  }
  canceledSomeTasks = false;
  duration = new com_google_gwt_core_client_Duration_Duration__V;
  while (com_google_gwt_core_client_JsDate_now__D() - duration.com_google_gwt_core_client_Duration_start < 16) {
    executedSomeTask = false;
    for (i = 0; i < length_0; i++) {
      t = tasks[i];
      if (!t) {
        continue;
      }
      executedSomeTask = true;
      if (!t[0].execute__Z()) {
        tasks[i] = null;
        canceledSomeTasks = true;
      }
    }
    if (!executedSomeTask) {
      break;
    }
  }
  if (canceledSomeTasks) {
    newTasks = [];
    for (i = 0; i < length_0; i++) {
      !!tasks[i] && com_google_gwt_core_client_JsArray_$push__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JavaScriptObject_2V(newTasks, tasks[i]);
    }
    return newTasks.length == 0?null:newTasks;
  }
   else {
    return tasks;
  }
}

function com_google_gwt_core_client_impl_SchedulerImpl_$scheduleDeferred__Lcom_google_gwt_core_client_impl_SchedulerImpl_2Lcom_google_gwt_core_client_Scheduler$ScheduledCommand_2V(this$static, cmd){
  this$static.com_google_gwt_core_client_impl_SchedulerImpl_deferredCommands = com_google_gwt_core_client_impl_SchedulerImpl_push__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_impl_SchedulerImpl$Task_2Lcom_google_gwt_core_client_JsArray_2(this$static.com_google_gwt_core_client_impl_SchedulerImpl_deferredCommands, [cmd, false]);
  com_google_gwt_core_client_impl_SchedulerImpl_$maybeSchedulePostEventPumpCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$static);
}

function com_google_gwt_core_client_impl_SchedulerImpl_SchedulerImpl__V(){
}

function com_google_gwt_core_client_impl_SchedulerImpl_execute__Lcom_google_gwt_core_client_Scheduler$RepeatingCommand_2Z(cmd){
  return cmd.execute__Z();
}

function com_google_gwt_core_client_impl_SchedulerImpl_push__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_impl_SchedulerImpl$Task_2Lcom_google_gwt_core_client_JsArray_2(queue, task){
  !queue && (queue = []);
  com_google_gwt_core_client_JsArray_$push__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JavaScriptObject_2V(queue, task);
  return queue;
}

function com_google_gwt_core_client_impl_SchedulerImpl_runScheduledTasks__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2(tasks, rescheduled){
  var e, i, j, t;
  for (i = 0 , j = tasks.length; i < j; i++) {
    t = tasks[i];
    try {
      t[1]?t[0].execute__Z() && (rescheduled = com_google_gwt_core_client_impl_SchedulerImpl_push__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_impl_SchedulerImpl$Task_2Lcom_google_gwt_core_client_JsArray_2(rescheduled, t)):com_google_gwt_user_client_ui_Image$State$1_$execute__Lcom_google_gwt_user_client_ui_Image$State$1_2V(t[0]);
    }
     catch ($e0) {
      $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
      if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 5)) {
        e = $e0;
        com_google_gwt_core_client_impl_Impl_reportToBrowser__Ljava_lang_Object_2V(com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(e, 31)?com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(e, 31).getThrown__Ljava_lang_Object_2():e);
      }
       else 
        throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    }
  }
  return rescheduled;
}

function com_google_gwt_core_client_impl_SchedulerImpl_scheduleFixedDelayImpl__Lcom_google_gwt_core_client_Scheduler$RepeatingCommand_2IV(cmd, delayMs){
  com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V();
  function callback(){
    var ret = $entry(com_google_gwt_core_client_impl_SchedulerImpl_execute__Lcom_google_gwt_core_client_Scheduler$RepeatingCommand_2Z)(cmd);
    !com_google_gwt_core_client_GWT_isScript__Z() && (ret = ret == true);
    ret && $wnd.setTimeout(callback, delayMs);
  }

  $wnd.setTimeout(callback, delayMs);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(182, 291, {}, com_google_gwt_core_client_impl_SchedulerImpl_SchedulerImpl__V);
_.com_google_gwt_core_client_impl_SchedulerImpl_flushRunning = false;
_.com_google_gwt_core_client_impl_SchedulerImpl_shouldBeRunning = false;
var com_google_gwt_core_client_impl_SchedulerImpl_INSTANCE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1SchedulerImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_10, 'SchedulerImpl', 182);
function com_google_gwt_core_client_impl_SchedulerImpl$Flusher_SchedulerImpl$Flusher__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$0){
  this.com_google_gwt_core_client_impl_SchedulerImpl$Flusher_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(183, 1, {}, com_google_gwt_core_client_impl_SchedulerImpl$Flusher_SchedulerImpl$Flusher__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V);
_.execute__Z = function com_google_gwt_core_client_impl_SchedulerImpl$Flusher_execute__Z(){
  this.com_google_gwt_core_client_impl_SchedulerImpl$Flusher_this$01.com_google_gwt_core_client_impl_SchedulerImpl_flushRunning = true;
  com_google_gwt_core_client_impl_SchedulerImpl_$flushPostEventPumpCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this.com_google_gwt_core_client_impl_SchedulerImpl$Flusher_this$01);
  this.com_google_gwt_core_client_impl_SchedulerImpl$Flusher_this$01.com_google_gwt_core_client_impl_SchedulerImpl_flushRunning = false;
  return this.com_google_gwt_core_client_impl_SchedulerImpl$Flusher_this$01.com_google_gwt_core_client_impl_SchedulerImpl_shouldBeRunning = com_google_gwt_core_client_impl_SchedulerImpl_$isWorkQueued__Lcom_google_gwt_core_client_impl_SchedulerImpl_2Z(this.com_google_gwt_core_client_impl_SchedulerImpl$Flusher_this$01);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1SchedulerImpl$Flusher_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_10, 'SchedulerImpl/Flusher', 183);
function com_google_gwt_core_client_impl_SchedulerImpl$Rescuer_SchedulerImpl$Rescuer__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$0){
  this.com_google_gwt_core_client_impl_SchedulerImpl$Rescuer_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(184, 1, {}, com_google_gwt_core_client_impl_SchedulerImpl$Rescuer_SchedulerImpl$Rescuer__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V);
_.execute__Z = function com_google_gwt_core_client_impl_SchedulerImpl$Rescuer_execute__Z(){
  this.com_google_gwt_core_client_impl_SchedulerImpl$Rescuer_this$01.com_google_gwt_core_client_impl_SchedulerImpl_flushRunning && com_google_gwt_core_client_impl_SchedulerImpl_scheduleFixedDelayImpl__Lcom_google_gwt_core_client_Scheduler$RepeatingCommand_2IV(this.com_google_gwt_core_client_impl_SchedulerImpl$Rescuer_this$01.com_google_gwt_core_client_impl_SchedulerImpl_flusher, 1);
  return this.com_google_gwt_core_client_impl_SchedulerImpl$Rescuer_this$01.com_google_gwt_core_client_impl_SchedulerImpl_shouldBeRunning;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1SchedulerImpl$Rescuer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_10, 'SchedulerImpl/Rescuer', 184);
function com_google_gwt_core_client_impl_StackTraceCreator_$clinit__V(){
  com_google_gwt_core_client_impl_StackTraceCreator_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  var c, enforceLegacy;
  enforceLegacy = !(!!Error.stackTraceLimit || 'stack' in new Error);
  c = new com_google_gwt_core_client_impl_StackTraceCreator$CollectorModernNoSourceMap_StackTraceCreator$CollectorModernNoSourceMap__V;
  com_google_gwt_core_client_impl_StackTraceCreator_collector = enforceLegacy?new com_google_gwt_core_client_impl_StackTraceCreator$CollectorLegacy_StackTraceCreator$CollectorLegacy__V:c;
}

function com_google_gwt_core_client_impl_StackTraceCreator_captureStackTrace__Ljava_lang_Throwable_2Ljava_lang_Object_2V(throwable, reference){
  com_google_gwt_core_client_impl_StackTraceCreator_$clinit__V();
  com_google_gwt_core_client_impl_StackTraceCreator_collector.collect__Ljava_lang_Object_2Ljava_lang_Object_2V(throwable, reference);
}

function com_google_gwt_core_client_impl_StackTraceCreator_dropInternalFrames___3Ljava_lang_StackTraceElement_2_3Ljava_lang_StackTraceElement_2(stackTrace){
  var dropFrameUntilFnName, i, numberOfFrameToSearch;
  dropFrameUntilFnName = 'com_google_gwt_core_client_impl_StackTraceCreator_captureStackTrace__Ljava_lang_Throwable_2Ljava_lang_Object_2V';
  numberOfFrameToSearch = java_lang_Math_min__III(stackTrace.length, 5);
  for (i = 0; i < numberOfFrameToSearch; i++) {
    if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(stackTrace[i].java_lang_StackTraceElement_methodName, dropFrameUntilFnName)) {
      return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2((stackTrace.length >= i + 1 && stackTrace.splice(0, i + 1) , stackTrace), 286);
    }
  }
  return stackTrace;
}

function com_google_gwt_core_client_impl_StackTraceCreator_extractFunctionName__Ljava_lang_String_2Ljava_lang_String_2(fnName){
  var fnRE = /function(?:\s+([\w$]+))?\s*\(/;
  var match_0 = fnRE.exec(fnName);
  return match_0 && match_0[1] || $intern_11;
}

function com_google_gwt_core_client_impl_StackTraceCreator_parseInt__Ljava_lang_String_2I(number){
  com_google_gwt_core_client_impl_StackTraceCreator_$clinit__V();
  return parseInt(number) || -1;
}

var com_google_gwt_core_client_impl_StackTraceCreator_collector;
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(302, 1, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$Collector_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_10, 'StackTraceCreator/Collector', 302);
function com_google_gwt_core_client_impl_StackTraceCreator$CollectorLegacy_StackTraceCreator$CollectorLegacy__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(148, 302, {}, com_google_gwt_core_client_impl_StackTraceCreator$CollectorLegacy_StackTraceCreator$CollectorLegacy__V);
_.collect__Ljava_lang_Object_2Ljava_lang_Object_2V = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorLegacy_collect__Ljava_lang_Object_2Ljava_lang_Object_2V(t, thrownIgnored){
  var seen = {}, com_google_gwt_core_client_impl_StackTraceCreator_getFunctionName__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2_name_0;
  t.fnStack = [];
  var callee = arguments.callee.caller;
  while (callee) {
    var name_0 = (com_google_gwt_core_client_impl_StackTraceCreator_$clinit__V() , callee.name || (callee.name = com_google_gwt_core_client_impl_StackTraceCreator_extractFunctionName__Ljava_lang_String_2Ljava_lang_String_2(callee.toString())));
    t.fnStack.push(name_0);
    var keyName = ':' + name_0;
    var withThisName = seen[keyName];
    if (withThisName) {
      var i, j;
      for (i = 0 , j = withThisName.length; i < j; i++) {
        if (withThisName[i] === callee) {
          return;
        }
      }
    }
    (withThisName || (seen[keyName] = [])).push(callee);
    callee = callee.caller;
  }
}
;
_.getStackTrace__Ljava_lang_Object_2_3Ljava_lang_StackTraceElement_2 = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorLegacy_getStackTrace__Ljava_lang_Object_2_3Ljava_lang_StackTraceElement_2(t){
  var i, length_0, stack_0, stackTrace;
  stack_0 = (com_google_gwt_core_client_impl_StackTraceCreator_$clinit__V() , t && t.fnStack && t.fnStack instanceof Array?t.fnStack:[]);
  length_0 = stack_0.length;
  stackTrace = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1StackTraceElement_12_1classLit, $intern_12, 46, length_0, 0, 1);
  for (i = 0; i < length_0; i++) {
    stackTrace[i] = new java_lang_StackTraceElement_StackTraceElement__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2IV(stack_0[i], null, -1);
  }
  return stackTrace;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$CollectorLegacy_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_10, 'StackTraceCreator/CollectorLegacy', 148);
function com_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_$clinit__V(){
  com_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  Error.stackTraceLimit = 64;
}

function com_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_$parse__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_2Ljava_lang_String_2Ljava_lang_StackTraceElement_2(this$static, stString){
  var closeParen, col, endFileUrlIndex, fileName, index_0, lastColonIndex, line, location_0, toReturn;
  if (!stString.length) {
    return this$static.createSte__Ljava_lang_String_2Ljava_lang_String_2IILjava_lang_StackTraceElement_2($intern_13, $intern_11, -1, -1);
  }
  toReturn = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(stString);
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(toReturn.substr(0, 3), 'at ') && (toReturn = java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(toReturn, 3, toReturn.length - 3));
  toReturn = toReturn.replace(/\[.*?\]/g, '');
  index_0 = toReturn.indexOf('(');
  if (index_0 == -1) {
    index_0 = toReturn.indexOf('@');
    if (index_0 == -1) {
      location_0 = toReturn;
      toReturn = '';
    }
     else {
      location_0 = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(toReturn, index_0 + 1, toReturn.length - (index_0 + 1)));
      toReturn = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(toReturn.substr(0, index_0));
    }
  }
   else {
    closeParen = toReturn.indexOf(')', index_0);
    location_0 = toReturn.substr(index_0 + 1, closeParen - (index_0 + 1));
    toReturn = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(toReturn.substr(0, index_0));
  }
  index_0 = java_lang_String_$indexOf__Ljava_lang_String_2Ljava_lang_String_2I(toReturn, java_lang_String_fromCodePoint__ILjava_lang_String_2(46));
  index_0 != -1 && (toReturn = java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(toReturn, index_0 + 1, toReturn.length - (index_0 + 1)));
  (!toReturn.length || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(toReturn, 'Anonymous function')) && (toReturn = $intern_11);
  lastColonIndex = java_lang_String_$lastIndexOf__Ljava_lang_String_2Ljava_lang_String_2I(location_0, java_lang_String_fromCodePoint__ILjava_lang_String_2(58));
  endFileUrlIndex = java_lang_String_$lastIndexOf__Ljava_lang_String_2Ljava_lang_String_2II(location_0, java_lang_String_fromCodePoint__ILjava_lang_String_2(58), lastColonIndex - 1);
  line = -1;
  col = -1;
  fileName = $intern_13;
  if (lastColonIndex != -1 && endFileUrlIndex != -1) {
    fileName = location_0.substr(0, endFileUrlIndex);
    line = com_google_gwt_core_client_impl_StackTraceCreator_parseInt__Ljava_lang_String_2I(location_0.substr(endFileUrlIndex + 1, lastColonIndex - (endFileUrlIndex + 1)));
    col = com_google_gwt_core_client_impl_StackTraceCreator_parseInt__Ljava_lang_String_2I(java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(location_0, lastColonIndex + 1, location_0.length - (lastColonIndex + 1)));
  }
  return this$static.createSte__Ljava_lang_String_2Ljava_lang_String_2IILjava_lang_StackTraceElement_2(fileName, toReturn, line, col);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(303, 302, {});
_.collect__Ljava_lang_Object_2Ljava_lang_Object_2V = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_collect__Ljava_lang_Object_2Ljava_lang_Object_2V(t, jsThrown){
  function fixIE(e){
    if (!('stack' in e)) {
      try {
        throw e;
      }
       catch (ignored) {
      }
    }
    return e;
  }

  var backingJsError;
  typeof jsThrown == $intern_1?(backingJsError = fixIE(new Error(jsThrown))):jsThrown instanceof Object && 'stack' in jsThrown?(backingJsError = jsThrown):(backingJsError = fixIE(new Error));
  t.__gwt$backingJsError = backingJsError;
}
;
_.createSte__Ljava_lang_String_2Ljava_lang_String_2IILjava_lang_StackTraceElement_2 = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_createSte__Ljava_lang_String_2Ljava_lang_String_2IILjava_lang_StackTraceElement_2(fileName, method, line, col){
  return new java_lang_StackTraceElement_StackTraceElement__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2IV(method, fileName + '@' + col, line < 0?-1:line);
}
;
_.getStackTrace__Ljava_lang_Object_2_3Ljava_lang_StackTraceElement_2 = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_getStackTrace__Ljava_lang_Object_2_3Ljava_lang_StackTraceElement_2(t){
  var addIndex, i, length_0, stack_0, stackTrace, ste, com_google_gwt_core_client_impl_StackTraceCreator_split__Ljava_lang_Object_2Lcom_google_gwt_core_client_JsArrayString_2_e_0;
  stack_0 = (com_google_gwt_core_client_impl_StackTraceCreator_$clinit__V() , com_google_gwt_core_client_impl_StackTraceCreator_split__Ljava_lang_Object_2Lcom_google_gwt_core_client_JsArrayString_2_e_0 = t.__gwt$backingJsError , com_google_gwt_core_client_impl_StackTraceCreator_split__Ljava_lang_Object_2Lcom_google_gwt_core_client_JsArrayString_2_e_0 && com_google_gwt_core_client_impl_StackTraceCreator_split__Ljava_lang_Object_2Lcom_google_gwt_core_client_JsArrayString_2_e_0.stack?com_google_gwt_core_client_impl_StackTraceCreator_split__Ljava_lang_Object_2Lcom_google_gwt_core_client_JsArrayString_2_e_0.stack.split('\n'):[]);
  stackTrace = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1StackTraceElement_12_1classLit, $intern_12, 46, 0, 0, 1);
  addIndex = 0;
  length_0 = stack_0.length;
  if (length_0 == 0) {
    return stackTrace;
  }
  ste = com_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_$parse__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_2Ljava_lang_String_2Ljava_lang_StackTraceElement_2(this, stack_0[0]);
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(ste.java_lang_StackTraceElement_methodName, $intern_11) || (stackTrace[addIndex++] = ste);
  for (i = 1; i < length_0; i++) {
    stackTrace[addIndex++] = com_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_$parse__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_2Ljava_lang_String_2Ljava_lang_StackTraceElement_2(this, stack_0[i]);
  }
  return stackTrace;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$CollectorModern_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_10, 'StackTraceCreator/CollectorModern', 303);
function com_google_gwt_core_client_impl_StackTraceCreator$CollectorModernNoSourceMap_StackTraceCreator$CollectorModernNoSourceMap__V(){
  com_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_$clinit__V();
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(149, 303, {}, com_google_gwt_core_client_impl_StackTraceCreator$CollectorModernNoSourceMap_StackTraceCreator$CollectorModernNoSourceMap__V);
_.createSte__Ljava_lang_String_2Ljava_lang_String_2IILjava_lang_StackTraceElement_2 = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorModernNoSourceMap_createSte__Ljava_lang_String_2Ljava_lang_String_2IILjava_lang_StackTraceElement_2(fileName, method, line, col){
  return new java_lang_StackTraceElement_StackTraceElement__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2IV(method, fileName, -1);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$CollectorModernNoSourceMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_10, 'StackTraceCreator/CollectorModernNoSourceMap', 149);
function com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalArgument__ZLjava_lang_Object_2V(expression, errorMessage){
  if (!expression) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V('' + errorMessage);
  }
}

function com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(expression){
  if (!expression) {
    throw new java_util_NoSuchElementException_NoSuchElementException__V;
  }
}

function com_google_gwt_core_shared_impl_InternalPreconditions_checkElementIndex__IIV(index_0, size_0){
  if (index_0 < 0 || index_0 >= size_0) {
    throw new java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__Ljava_lang_String_2V('Index: ' + index_0 + ', Size: ' + size_0);
  }
}

function com_google_gwt_core_shared_impl_InternalPreconditions_checkNotNull__Ljava_lang_Object_2Ljava_lang_Object_2(reference){
  if (!reference) {
    throw new java_lang_NullPointerException_NullPointerException__V;
  }
  return reference;
}

function com_google_gwt_core_shared_impl_InternalPreconditions_checkPositionIndex__IIV(index_0, size_0){
  if (index_0 < 0 || index_0 > size_0) {
    throw new java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__Ljava_lang_String_2V('Index: ' + index_0 + ', Size: ' + size_0);
  }
}

function com_google_gwt_core_shared_impl_InternalPreconditions_checkState__ZLjava_lang_Object_2V(expression){
  if (!expression) {
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V("Can't overwrite cause");
  }
}

function com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(this$static, newChild){
  return this$static.appendChild(newChild);
}

function com_google_gwt_dom_client_Node_$removeChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(this$static, oldChild){
  return this$static.removeChild(oldChild);
}

function com_google_gwt_dom_client_Element_$addClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Z(this$static, className){
  var idx, oldClassName;
  className = com_google_gwt_dom_client_Element_trimClassName__Ljava_lang_String_2Ljava_lang_String_2(className);
  oldClassName = com_google_gwt_dom_client_Element_$getClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(this$static);
  idx = com_google_gwt_dom_client_Element_indexOfName__Ljava_lang_String_2Ljava_lang_String_2I(oldClassName, className);
  if (idx == -1) {
    oldClassName.length > 0?com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this$static, oldClassName + ' ' + className):com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this$static, className);
    return true;
  }
  return false;
}

function com_google_gwt_dom_client_Element_$getClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(this$static){
  return this$static.className || '';
}

function com_google_gwt_dom_client_Element_$getPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2I(this$static, name_0){
  return parseInt(this$static[name_0]) | 0;
}

function com_google_gwt_dom_client_Element_$getPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2(this$static, name_0){
  return this$static[name_0] == null?null:String(this$static[name_0]);
}

function com_google_gwt_dom_client_Element_$removeAttribute__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this$static, name_0){
  this$static.removeAttribute(name_0);
}

function com_google_gwt_dom_client_Element_$removeClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Z(this$static, className){
  var begin, end, idx, newClassName, oldStyle;
  className = com_google_gwt_dom_client_Element_trimClassName__Ljava_lang_String_2Ljava_lang_String_2(className);
  oldStyle = com_google_gwt_dom_client_Element_$getClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(this$static);
  idx = com_google_gwt_dom_client_Element_indexOfName__Ljava_lang_String_2Ljava_lang_String_2I(oldStyle, className);
  if (idx != -1) {
    begin = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(oldStyle.substr(0, idx));
    end = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(oldStyle, idx + className.length));
    begin.length == 0?(newClassName = end):end.length == 0?(newClassName = begin):(newClassName = begin + ' ' + end);
    com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this$static, newClassName);
    return true;
  }
  return false;
}

function com_google_gwt_dom_client_Element_$setAttribute__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(this$static, name_0, value_0){
  this$static.setAttribute(name_0, value_0);
}

function com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this$static, className){
  this$static.className = className || '';
}

function com_google_gwt_dom_client_Element_$setInnerHTML__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this$static, html){
  this$static.innerHTML = html || '';
}

function com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV(this$static, name_0, value_0){
  this$static[name_0] = value_0;
}

function com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(this$static, name_0, value_0){
  this$static[name_0] = value_0;
}

function com_google_gwt_dom_client_Element_indexOfName__Ljava_lang_String_2Ljava_lang_String_2I(nameList, name_0){
  var idx, last, lastPos;
  idx = nameList.indexOf(name_0);
  while (idx != -1) {
    if (idx == 0 || nameList.charCodeAt(idx - 1) == 32) {
      last = idx + name_0.length;
      lastPos = nameList.length;
      if (last == lastPos || last < lastPos && nameList.charCodeAt(last) == 32) {
        break;
      }
    }
    idx = nameList.indexOf(name_0, idx + 1);
  }
  return idx;
}

function com_google_gwt_dom_client_Element_trimClassName__Ljava_lang_String_2Ljava_lang_String_2(className){
  className = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(className);
  return className;
}

function com_google_gwt_dom_client_DOMImpl_$getParentElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Element_2(node){
  var parent_0 = node.parentNode;
  (!parent_0 || parent_0.nodeType != 1) && (parent_0 = null);
  return parent_0;
}

function com_google_gwt_dom_client_DOMImpl_$selectAdd__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_SelectElement_2Lcom_google_gwt_dom_client_OptionElement_2Lcom_google_gwt_dom_client_OptionElement_2V(select, option, before){
  select.add(option, before);
}

function com_google_gwt_dom_client_DOMImplStandard_$dispatchEvent__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_NativeEvent_2V(target, evt){
  target.dispatchEvent(evt);
}

function com_google_gwt_dom_client_DOMImplStandard_$eventPreventDefault__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_NativeEvent_2V(evt){
  evt.preventDefault();
}

function com_google_gwt_dom_client_DOMImplStandard_$setInnerText__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(elem, text_0){
  elem.textContent = text_0 || '';
}

function com_google_gwt_dom_client_DOMImplMozilla_$eventGetRelatedTarget__Lcom_google_gwt_dom_client_DOMImplMozilla_2Lcom_google_gwt_dom_client_NativeEvent_2Lcom_google_gwt_dom_client_EventTarget_2(evt){
  var relatedTarget = evt.relatedTarget;
  if (!relatedTarget) {
    return null;
  }
  try {
    var nodeName = relatedTarget.nodeName;
    return relatedTarget;
  }
   catch (e) {
    return null;
  }
}

function com_google_gwt_dom_client_DOMImplMozilla_$isOrHasChild__Lcom_google_gwt_dom_client_DOMImplMozilla_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Z(parent_0, child){
  return parent_0 === child || !!(parent_0.compareDocumentPosition(child) & 16);
}

function com_google_gwt_dom_client_DOMImplMozilla_$toString__Lcom_google_gwt_dom_client_DOMImplMozilla_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(elem){
  var doc = elem.ownerDocument;
  var temp = elem.cloneNode(true);
  var tempDiv = doc.createElement('DIV');
  tempDiv.appendChild(temp);
  outer = tempDiv.innerHTML;
  temp.innerHTML = '';
  return outer;
}

function com_google_gwt_dom_client_ImageElement_$setHeight__Lcom_google_gwt_dom_client_ImageElement_2IV(this$static, height){
  this$static.height = height;
}

function com_google_gwt_dom_client_ImageElement_$setSrc__Lcom_google_gwt_dom_client_ImageElement_2Ljava_lang_String_2V(this$static, src_0){
  this$static.src = src_0;
}

function com_google_gwt_dom_client_ImageElement_$setWidth__Lcom_google_gwt_dom_client_ImageElement_2IV(this$static, width_0){
  this$static.width = width_0;
}

function com_google_gwt_dom_client_InputElement_$setMaxLength__Lcom_google_gwt_dom_client_InputElement_2IV(this$static, maxLength){
  this$static.maxLength = maxLength;
}

function com_google_gwt_dom_client_InputElement_$setSize__Lcom_google_gwt_dom_client_InputElement_2IV(this$static, size_0){
  this$static.size = size_0;
}

function com_google_gwt_dom_client_Style_$setPropertyImpl__Lcom_google_gwt_dom_client_Style_2Ljava_lang_String_2Ljava_lang_String_2V(this$static, name_0, value_0){
  this$static[name_0] = value_0;
}

function java_lang_Enum_Enum__Ljava_lang_String_2IV(name_0, ordinal){
  this.java_lang_Enum_name = name_0;
  this.java_lang_Enum_ordinal = ordinal;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(22, 1, {3:1, 25:1, 22:1});
_.equals__Ljava_lang_Object_2Z$ = function java_lang_Enum_equals__Ljava_lang_Object_2Z(other){
  return this === other;
}
;
_.hashCode__I$ = function java_lang_Enum_hashCode__I(){
  return com_google_gwt_core_client_impl_Impl_getHashCode__Ljava_lang_Object_2I(this);
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Enum_toString__Ljava_lang_String_2(){
  return this.java_lang_Enum_name != null?this.java_lang_Enum_name:'' + this.java_lang_Enum_ordinal;
}
;
_.java_lang_Enum_ordinal = 0;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Enum_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Enum', 22);
function com_google_gwt_dom_client_Style$TextAlign_$clinit__V(){
  com_google_gwt_dom_client_Style$TextAlign_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_dom_client_Style$TextAlign_CENTER = new com_google_gwt_dom_client_Style$TextAlign$1_Style$TextAlign$1__Ljava_lang_String_2IV;
  com_google_gwt_dom_client_Style$TextAlign_JUSTIFY = new com_google_gwt_dom_client_Style$TextAlign$2_Style$TextAlign$2__Ljava_lang_String_2IV;
  com_google_gwt_dom_client_Style$TextAlign_LEFT = new com_google_gwt_dom_client_Style$TextAlign$3_Style$TextAlign$3__Ljava_lang_String_2IV;
  com_google_gwt_dom_client_Style$TextAlign_RIGHT = new com_google_gwt_dom_client_Style$TextAlign$4_Style$TextAlign$4__Ljava_lang_String_2IV;
}

function com_google_gwt_dom_client_Style$TextAlign_Style$TextAlign__Ljava_lang_String_2IV(enum$name, enum$ordinal){
  java_lang_Enum_Enum__Ljava_lang_String_2IV.call(this, enum$name, enum$ordinal);
}

function com_google_gwt_dom_client_Style$TextAlign_values___3Lcom_google_gwt_dom_client_Style$TextAlign_2(){
  com_google_gwt_dom_client_Style$TextAlign_$clinit__V();
  return com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1dom_1client_1Style$TextAlign_12_1classLit, 1), $intern_14, 39, 0, [com_google_gwt_dom_client_Style$TextAlign_CENTER, com_google_gwt_dom_client_Style$TextAlign_JUSTIFY, com_google_gwt_dom_client_Style$TextAlign_LEFT, com_google_gwt_dom_client_Style$TextAlign_RIGHT]);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(39, 22, $intern_15);
var com_google_gwt_dom_client_Style$TextAlign_CENTER, com_google_gwt_dom_client_Style$TextAlign_JUSTIFY, com_google_gwt_dom_client_Style$TextAlign_LEFT, com_google_gwt_dom_client_Style$TextAlign_RIGHT;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1dom_1client_1Style$TextAlign_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_16, 'Style/TextAlign', 39, com_google_gwt_dom_client_Style$TextAlign_values___3Lcom_google_gwt_dom_client_Style$TextAlign_2);
function com_google_gwt_dom_client_Style$TextAlign$1_Style$TextAlign$1__Ljava_lang_String_2IV(){
  com_google_gwt_dom_client_Style$TextAlign_Style$TextAlign__Ljava_lang_String_2IV.call(this, 'CENTER', 0);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(197, 39, $intern_15, com_google_gwt_dom_client_Style$TextAlign$1_Style$TextAlign$1__Ljava_lang_String_2IV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1dom_1client_1Style$TextAlign$1_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_16, 'Style/TextAlign/1', 197, null);
function com_google_gwt_dom_client_Style$TextAlign$2_Style$TextAlign$2__Ljava_lang_String_2IV(){
  com_google_gwt_dom_client_Style$TextAlign_Style$TextAlign__Ljava_lang_String_2IV.call(this, 'JUSTIFY', 1);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(198, 39, $intern_15, com_google_gwt_dom_client_Style$TextAlign$2_Style$TextAlign$2__Ljava_lang_String_2IV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1dom_1client_1Style$TextAlign$2_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_16, 'Style/TextAlign/2', 198, null);
function com_google_gwt_dom_client_Style$TextAlign$3_Style$TextAlign$3__Ljava_lang_String_2IV(){
  com_google_gwt_dom_client_Style$TextAlign_Style$TextAlign__Ljava_lang_String_2IV.call(this, 'LEFT', 2);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(199, 39, $intern_15, com_google_gwt_dom_client_Style$TextAlign$3_Style$TextAlign$3__Ljava_lang_String_2IV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1dom_1client_1Style$TextAlign$3_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_16, 'Style/TextAlign/3', 199, null);
function com_google_gwt_dom_client_Style$TextAlign$4_Style$TextAlign$4__Ljava_lang_String_2IV(){
  com_google_gwt_dom_client_Style$TextAlign_Style$TextAlign__Ljava_lang_String_2IV.call(this, 'RIGHT', 3);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(200, 39, $intern_15, com_google_gwt_dom_client_Style$TextAlign$4_Style$TextAlign$4__Ljava_lang_String_2IV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1dom_1client_1Style$TextAlign$4_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_16, 'Style/TextAlign/4', 200, null);
function com_google_gwt_dom_client_TextAreaElement_$setRows__Lcom_google_gwt_dom_client_TextAreaElement_2IV(this$static, rows_0){
  this$static.rows = rows_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(310, 1, {});
_.toString__Ljava_lang_String_2$ = function com_google_web_bindery_event_shared_Event_toString__Ljava_lang_String_2(){
  return 'An event type';
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1web_1bindery_1event_1shared_1Event_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_17, 'Event', 310);
function com_google_gwt_event_shared_GwtEvent_$overrideSource__Lcom_google_gwt_event_shared_GwtEvent_2Ljava_lang_Object_2V(this$static, source){
  this$static.com_google_web_bindery_event_shared_Event_source = source;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(311, 310, {});
_.com_google_gwt_event_shared_GwtEvent_dead = false;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1GwtEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_18, 'GwtEvent', 311);
function com_google_gwt_event_dom_client_DomEvent_$setNativeEvent__Lcom_google_gwt_event_dom_client_DomEvent_2Lcom_google_gwt_dom_client_NativeEvent_2V(this$static, nativeEvent){
  this$static.com_google_gwt_event_dom_client_DomEvent_nativeEvent = nativeEvent;
}

function com_google_gwt_event_dom_client_DomEvent_$setRelativeElement__Lcom_google_gwt_event_dom_client_DomEvent_2Lcom_google_gwt_dom_client_Element_2V(this$static, relativeElem){
  this$static.com_google_gwt_event_dom_client_DomEvent_relativeElem = relativeElem;
}

function com_google_gwt_event_dom_client_DomEvent_fireNativeEvent__Lcom_google_gwt_dom_client_NativeEvent_2Lcom_google_gwt_event_shared_HasHandlers_2Lcom_google_gwt_dom_client_Element_2V(nativeEvent, handlerSource, relativeElem){
  var currentNative, currentRelativeElem, type_0, type$iterator, types;
  if (com_google_gwt_event_dom_client_DomEvent_registered) {
    types = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_event_dom_client_PrivateMap_$unsafeGet__Lcom_google_gwt_event_dom_client_PrivateMap_2Ljava_lang_String_2Ljava_lang_Object_2(com_google_gwt_event_dom_client_DomEvent_registered, nativeEvent.type), 6);
    if (types) {
      for (type$iterator = types.iterator__Ljava_util_Iterator_2(); type$iterator.hasNext__Z();) {
        type_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(type$iterator.next__Ljava_lang_Object_2(), 55);
        currentNative = type_0.com_google_gwt_event_dom_client_DomEvent$Type_flyweight.com_google_gwt_event_dom_client_DomEvent_nativeEvent;
        currentRelativeElem = type_0.com_google_gwt_event_dom_client_DomEvent$Type_flyweight.com_google_gwt_event_dom_client_DomEvent_relativeElem;
        com_google_gwt_event_dom_client_DomEvent_$setNativeEvent__Lcom_google_gwt_event_dom_client_DomEvent_2Lcom_google_gwt_dom_client_NativeEvent_2V(type_0.com_google_gwt_event_dom_client_DomEvent$Type_flyweight, nativeEvent);
        com_google_gwt_event_dom_client_DomEvent_$setRelativeElement__Lcom_google_gwt_event_dom_client_DomEvent_2Lcom_google_gwt_dom_client_Element_2V(type_0.com_google_gwt_event_dom_client_DomEvent$Type_flyweight, relativeElem);
        com_google_gwt_user_client_ui_Widget_$fireEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_GwtEvent_2V(handlerSource, type_0.com_google_gwt_event_dom_client_DomEvent$Type_flyweight);
        com_google_gwt_event_dom_client_DomEvent_$setNativeEvent__Lcom_google_gwt_event_dom_client_DomEvent_2Lcom_google_gwt_dom_client_NativeEvent_2V(type_0.com_google_gwt_event_dom_client_DomEvent$Type_flyweight, currentNative);
        com_google_gwt_event_dom_client_DomEvent_$setRelativeElement__Lcom_google_gwt_event_dom_client_DomEvent_2Lcom_google_gwt_dom_client_Element_2V(type_0.com_google_gwt_event_dom_client_DomEvent$Type_flyweight, currentRelativeElem);
      }
    }
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(315, 311, {});
_.getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2 = function com_google_gwt_event_dom_client_DomEvent_getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2(){
  return this.getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2();
}
;
var com_google_gwt_event_dom_client_DomEvent_registered;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1DomEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'DomEvent', 315);
function com_google_gwt_event_dom_client_ChangeEvent_$clinit__V(){
  com_google_gwt_event_dom_client_ChangeEvent_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_event_dom_client_ChangeEvent_TYPE = new com_google_gwt_event_dom_client_DomEvent$Type_DomEvent$Type__Ljava_lang_String_2Lcom_google_gwt_event_dom_client_DomEvent_2V('change', new com_google_gwt_event_dom_client_ChangeEvent_ChangeEvent__V);
}

function com_google_gwt_event_dom_client_ChangeEvent_ChangeEvent__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(269, 315, {}, com_google_gwt_event_dom_client_ChangeEvent_ChangeEvent__V);
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_event_dom_client_ChangeEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(handler, 289).onChange__Lcom_google_gwt_event_dom_client_ChangeEvent_2V(this);
}
;
_.getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2 = function com_google_gwt_event_dom_client_ChangeEvent_getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2(){
  return com_google_gwt_event_dom_client_ChangeEvent_TYPE;
}
;
var com_google_gwt_event_dom_client_ChangeEvent_TYPE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1ChangeEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'ChangeEvent', 269);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(316, 315, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1HumanInputEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'HumanInputEvent', 316);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(317, 316, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1MouseEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'MouseEvent', 317);
function com_google_gwt_event_dom_client_ClickEvent_$clinit__V(){
  com_google_gwt_event_dom_client_ClickEvent_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_event_dom_client_ClickEvent_TYPE = new com_google_gwt_event_dom_client_DomEvent$Type_DomEvent$Type__Ljava_lang_String_2Lcom_google_gwt_event_dom_client_DomEvent_2V('click', new com_google_gwt_event_dom_client_ClickEvent_ClickEvent__V);
}

function com_google_gwt_event_dom_client_ClickEvent_ClickEvent__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(204, 317, {}, com_google_gwt_event_dom_client_ClickEvent_ClickEvent__V);
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_event_dom_client_ClickEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(handler, 93).onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V(this);
}
;
_.getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2 = function com_google_gwt_event_dom_client_ClickEvent_getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2(){
  return com_google_gwt_event_dom_client_ClickEvent_TYPE;
}
;
var com_google_gwt_event_dom_client_ClickEvent_TYPE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1ClickEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'ClickEvent', 204);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(186, 1, {});
_.hashCode__I$ = function com_google_web_bindery_event_shared_Event$Type_hashCode__I(){
  return this.com_google_web_bindery_event_shared_Event$Type_index;
}
;
_.toString__Ljava_lang_String_2$ = function com_google_web_bindery_event_shared_Event$Type_toString__Ljava_lang_String_2(){
  return 'Event type';
}
;
_.com_google_web_bindery_event_shared_Event$Type_index = 0;
var com_google_web_bindery_event_shared_Event$Type_nextHashCode = 0;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1web_1bindery_1event_1shared_1Event$Type_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_17, 'Event/Type', 186);
function com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V(){
  this.com_google_web_bindery_event_shared_Event$Type_index = ++com_google_web_bindery_event_shared_Event$Type_nextHashCode;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(72, 186, {}, com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1GwtEvent$Type_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_18, 'GwtEvent/Type', 72);
function com_google_gwt_event_dom_client_DomEvent$Type_DomEvent$Type__Ljava_lang_String_2Lcom_google_gwt_event_dom_client_DomEvent_2V(eventName, flyweight){
  var types;
  com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V.call(this);
  this.com_google_gwt_event_dom_client_DomEvent$Type_flyweight = flyweight;
  !com_google_gwt_event_dom_client_DomEvent_registered && (com_google_gwt_event_dom_client_DomEvent_registered = new com_google_gwt_event_dom_client_PrivateMap_PrivateMap__V);
  types = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_event_dom_client_PrivateMap_$unsafeGet__Lcom_google_gwt_event_dom_client_PrivateMap_2Ljava_lang_String_2Ljava_lang_Object_2(com_google_gwt_event_dom_client_DomEvent_registered, eventName), 6);
  if (!types) {
    types = new java_util_ArrayList_ArrayList__V;
    com_google_gwt_event_dom_client_PrivateMap_$unsafePut__Lcom_google_gwt_event_dom_client_PrivateMap_2Ljava_lang_String_2Ljava_lang_Object_2V(com_google_gwt_event_dom_client_DomEvent_registered, eventName, types);
  }
  types.add__Ljava_lang_Object_2Z(this);
  this.com_google_gwt_event_dom_client_DomEvent$Type_name = eventName;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(55, 72, {55:1}, com_google_gwt_event_dom_client_DomEvent$Type_DomEvent$Type__Ljava_lang_String_2Lcom_google_gwt_event_dom_client_DomEvent_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1DomEvent$Type_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'DomEvent/Type', 55);
function com_google_gwt_event_dom_client_DoubleClickEvent_$clinit__V(){
  com_google_gwt_event_dom_client_DoubleClickEvent_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_event_dom_client_DoubleClickEvent_TYPE = new com_google_gwt_event_dom_client_DomEvent$Type_DomEvent$Type__Ljava_lang_String_2Lcom_google_gwt_event_dom_client_DomEvent_2V('dblclick', new com_google_gwt_event_dom_client_DoubleClickEvent_DoubleClickEvent__V);
}

function com_google_gwt_event_dom_client_DoubleClickEvent_$dispatch__Lcom_google_gwt_event_dom_client_DoubleClickEvent_2Lcom_google_gwt_event_dom_client_DoubleClickHandler_2V(handler){
  com_sensia_relaxNG_RNGData_$setConfirmed__Lcom_sensia_relaxNG_RNGData_2ZV(handler.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$1_val$data2, false);
  com_google_gwt_user_client_ui_ValueBoxBase_$setReadOnly__Lcom_google_gwt_user_client_ui_ValueBoxBase_2ZV(handler.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$1_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, false);
}

function com_google_gwt_event_dom_client_DoubleClickEvent_DoubleClickEvent__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(277, 317, {}, com_google_gwt_event_dom_client_DoubleClickEvent_DoubleClickEvent__V);
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_event_dom_client_DoubleClickEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_google_gwt_event_dom_client_DoubleClickEvent_$dispatch__Lcom_google_gwt_event_dom_client_DoubleClickEvent_2Lcom_google_gwt_event_dom_client_DoubleClickHandler_2V(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(handler, 329));
}
;
_.getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2 = function com_google_gwt_event_dom_client_DoubleClickEvent_getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2(){
  return com_google_gwt_event_dom_client_DoubleClickEvent_TYPE;
}
;
var com_google_gwt_event_dom_client_DoubleClickEvent_TYPE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1DoubleClickEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'DoubleClickEvent', 277);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(322, 315, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1KeyEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'KeyEvent', 322);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(323, 322, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1KeyCodeEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'KeyCodeEvent', 323);
function com_google_gwt_event_dom_client_KeyPressEvent_$clinit__V(){
  com_google_gwt_event_dom_client_KeyPressEvent_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_event_dom_client_KeyPressEvent_TYPE = new com_google_gwt_event_dom_client_DomEvent$Type_DomEvent$Type__Ljava_lang_String_2Lcom_google_gwt_event_dom_client_DomEvent_2V('keypress', new com_google_gwt_event_dom_client_KeyPressEvent_KeyPressEvent__V);
}

function com_google_gwt_event_dom_client_KeyPressEvent_$dispatch__Lcom_google_gwt_event_dom_client_KeyPressEvent_2Lcom_google_gwt_event_dom_client_KeyPressHandler_2V(this$static, handler){
  com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_$onKeyPress__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_2Lcom_google_gwt_event_dom_client_KeyPressEvent_2V(handler, this$static);
}

function com_google_gwt_event_dom_client_KeyPressEvent_KeyPressEvent__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(278, 322, {}, com_google_gwt_event_dom_client_KeyPressEvent_KeyPressEvent__V);
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_event_dom_client_KeyPressEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_google_gwt_event_dom_client_KeyPressEvent_$dispatch__Lcom_google_gwt_event_dom_client_KeyPressEvent_2Lcom_google_gwt_event_dom_client_KeyPressHandler_2V(this, com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(handler, 330));
}
;
_.getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2 = function com_google_gwt_event_dom_client_KeyPressEvent_getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2(){
  return com_google_gwt_event_dom_client_KeyPressEvent_TYPE;
}
;
var com_google_gwt_event_dom_client_KeyPressEvent_TYPE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1KeyPressEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'KeyPressEvent', 278);
function com_google_gwt_event_dom_client_KeyUpEvent_$clinit__V(){
  com_google_gwt_event_dom_client_KeyUpEvent_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_event_dom_client_KeyUpEvent_TYPE = new com_google_gwt_event_dom_client_DomEvent$Type_DomEvent$Type__Ljava_lang_String_2Lcom_google_gwt_event_dom_client_DomEvent_2V('keyup', new com_google_gwt_event_dom_client_KeyUpEvent_KeyUpEvent__V);
}

function com_google_gwt_event_dom_client_KeyUpEvent_KeyUpEvent__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(279, 323, {}, com_google_gwt_event_dom_client_KeyUpEvent_KeyUpEvent__V);
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_event_dom_client_KeyUpEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_$onKeyUp__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_2Lcom_google_gwt_event_dom_client_KeyUpEvent_2V(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(handler, 328));
}
;
_.getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2 = function com_google_gwt_event_dom_client_KeyUpEvent_getAssociatedType__Lcom_google_gwt_event_dom_client_DomEvent$Type_2(){
  return com_google_gwt_event_dom_client_KeyUpEvent_TYPE;
}
;
var com_google_gwt_event_dom_client_KeyUpEvent_TYPE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1KeyUpEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'KeyUpEvent', 279);
function com_google_gwt_event_dom_client_PrivateMap_$unsafeGet__Lcom_google_gwt_event_dom_client_PrivateMap_2Ljava_lang_String_2Ljava_lang_Object_2(this$static, key){
  return this$static.com_google_gwt_event_dom_client_PrivateMap_map[key];
}

function com_google_gwt_event_dom_client_PrivateMap_$unsafePut__Lcom_google_gwt_event_dom_client_PrivateMap_2Ljava_lang_String_2Ljava_lang_Object_2V(this$static, key, value_0){
  this$static.com_google_gwt_event_dom_client_PrivateMap_map[key] = value_0;
}

function com_google_gwt_event_dom_client_PrivateMap_PrivateMap__V(){
  this.com_google_gwt_event_dom_client_PrivateMap_map = {};
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(207, 1, {}, com_google_gwt_event_dom_client_PrivateMap_PrivateMap__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1dom_1client_1PrivateMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_19, 'PrivateMap', 207);
function com_google_gwt_event_logical_shared_CloseEvent_CloseEvent__Ljava_lang_Object_2ZV(){
}

function com_google_gwt_event_logical_shared_CloseEvent_fire__Lcom_google_gwt_event_logical_shared_HasCloseHandlers_2Ljava_lang_Object_2ZV(source){
  var event_0;
  if (com_google_gwt_event_logical_shared_CloseEvent_TYPE) {
    event_0 = new com_google_gwt_event_logical_shared_CloseEvent_CloseEvent__Ljava_lang_Object_2ZV;
    source.fireEvent__Lcom_google_gwt_event_shared_GwtEvent_2V(event_0);
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(193, 311, {}, com_google_gwt_event_logical_shared_CloseEvent_CloseEvent__Ljava_lang_Object_2ZV);
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_event_logical_shared_CloseEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(handler, 287).onClose__Lcom_google_gwt_event_logical_shared_CloseEvent_2V(this);
}
;
_.getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2 = function com_google_gwt_event_logical_shared_CloseEvent_getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2(){
  return com_google_gwt_event_logical_shared_CloseEvent_TYPE;
}
;
var com_google_gwt_event_logical_shared_CloseEvent_TYPE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1logical_1shared_1CloseEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_20, 'CloseEvent', 193);
function com_google_gwt_event_logical_shared_OpenEvent_$dispatch__Lcom_google_gwt_event_logical_shared_OpenEvent_2Lcom_google_gwt_event_logical_shared_OpenHandler_2V(handler){
  com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_$updateImage__Lcom_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_2ZLcom_google_gwt_user_client_ui_Image_2V(handler.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_imager, handler.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_this$01.com_google_gwt_user_client_ui_DisclosurePanel_isOpen, handler.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_iconImage);
}

function com_google_gwt_event_logical_shared_OpenEvent_OpenEvent__Ljava_lang_Object_2V(){
}

function com_google_gwt_event_logical_shared_OpenEvent_fire__Lcom_google_gwt_event_logical_shared_HasOpenHandlers_2Ljava_lang_Object_2V(source){
  var event_0;
  if (com_google_gwt_event_logical_shared_OpenEvent_TYPE) {
    event_0 = new com_google_gwt_event_logical_shared_OpenEvent_OpenEvent__Ljava_lang_Object_2V;
    !!source.com_google_gwt_user_client_ui_Widget_handlerManager && com_google_gwt_event_shared_HandlerManager_$fireEvent__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent_2V(source.com_google_gwt_user_client_ui_Widget_handlerManager, event_0);
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(281, 311, {}, com_google_gwt_event_logical_shared_OpenEvent_OpenEvent__Ljava_lang_Object_2V);
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_event_logical_shared_OpenEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_google_gwt_event_logical_shared_OpenEvent_$dispatch__Lcom_google_gwt_event_logical_shared_OpenEvent_2Lcom_google_gwt_event_logical_shared_OpenHandler_2V(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(handler, 331));
}
;
_.getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2 = function com_google_gwt_event_logical_shared_OpenEvent_getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2(){
  return com_google_gwt_event_logical_shared_OpenEvent_TYPE;
}
;
var com_google_gwt_event_logical_shared_OpenEvent_TYPE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1logical_1shared_1OpenEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_20, 'OpenEvent', 281);
function com_google_gwt_event_shared_HandlerManager_$addHandler__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this$static, type_0, handler){
  return new com_google_gwt_event_shared_LegacyHandlerWrapper_LegacyHandlerWrapper__Lcom_google_web_bindery_event_shared_HandlerRegistration_2V(com_google_web_bindery_event_shared_SimpleEventBus_$doAdd__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_lang_Object_2Lcom_google_web_bindery_event_shared_HandlerRegistration_2(this$static.com_google_gwt_event_shared_HandlerManager_eventBus, type_0, handler));
}

function com_google_gwt_event_shared_HandlerManager_$fireEvent__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent_2V(this$static, event_0){
  var e, oldSource;
  !event_0.com_google_gwt_event_shared_GwtEvent_dead || (event_0.com_google_gwt_event_shared_GwtEvent_dead = false , event_0.com_google_web_bindery_event_shared_Event_source = null);
  oldSource = event_0.com_google_web_bindery_event_shared_Event_source;
  com_google_gwt_event_shared_GwtEvent_$overrideSource__Lcom_google_gwt_event_shared_GwtEvent_2Ljava_lang_Object_2V(event_0, this$static.com_google_gwt_event_shared_HandlerManager_source);
  try {
    com_google_web_bindery_event_shared_SimpleEventBus_$doFire__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event_2Ljava_lang_Object_2V(this$static.com_google_gwt_event_shared_HandlerManager_eventBus, event_0);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 64)) {
      e = $e0;
      throw new com_google_gwt_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V(e.com_google_web_bindery_event_shared_UmbrellaException_causes);
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
  }
   finally {
    oldSource == null?(event_0.com_google_gwt_event_shared_GwtEvent_dead = true , event_0.com_google_web_bindery_event_shared_Event_source = null):(event_0.com_google_web_bindery_event_shared_Event_source = oldSource);
  }
}

function com_google_gwt_event_shared_HandlerManager_HandlerManager__Ljava_lang_Object_2V(source){
  this.com_google_gwt_event_shared_HandlerManager_eventBus = new com_google_gwt_event_shared_HandlerManager$Bus_HandlerManager$Bus__ZV;
  this.com_google_gwt_event_shared_HandlerManager_source = source;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(82, 1, {11:1}, com_google_gwt_event_shared_HandlerManager_HandlerManager__Ljava_lang_Object_2V);
_.fireEvent__Lcom_google_gwt_event_shared_GwtEvent_2V = function com_google_gwt_event_shared_HandlerManager_fireEvent__Lcom_google_gwt_event_shared_GwtEvent_2V(event_0){
  com_google_gwt_event_shared_HandlerManager_$fireEvent__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent_2V(this, event_0);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1HandlerManager_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_18, 'HandlerManager', 82);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(312, 1, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1web_1bindery_1event_1shared_1EventBus_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_17, 'EventBus', 312);
function com_google_web_bindery_event_shared_SimpleEventBus_$defer__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_SimpleEventBus$Command_2V(this$static, command){
  !this$static.com_google_web_bindery_event_shared_SimpleEventBus_deferredDeltas && (this$static.com_google_web_bindery_event_shared_SimpleEventBus_deferredDeltas = new java_util_ArrayList_ArrayList__V);
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static.com_google_web_bindery_event_shared_SimpleEventBus_deferredDeltas, command);
}

function com_google_web_bindery_event_shared_SimpleEventBus_$doAdd__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_lang_Object_2Lcom_google_web_bindery_event_shared_HandlerRegistration_2(this$static, type_0, handler){
  if (!type_0) {
    throw new java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V('Cannot add a handler with a null type');
  }
  this$static.com_google_web_bindery_event_shared_SimpleEventBus_firingDepth > 0?com_google_web_bindery_event_shared_SimpleEventBus_$defer__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_SimpleEventBus$Command_2V(this$static, new com_google_web_bindery_event_shared_SimpleEventBus$2_SimpleEventBus$2__Lcom_google_web_bindery_event_shared_SimpleEventBus_2V(this$static, type_0, handler)):com_google_web_bindery_event_shared_SimpleEventBus_$doAddNow__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_lang_Object_2V(this$static, type_0, null, handler);
  return new com_google_web_bindery_event_shared_SimpleEventBus$1_SimpleEventBus$1__Lcom_google_web_bindery_event_shared_SimpleEventBus_2V;
}

function com_google_web_bindery_event_shared_SimpleEventBus_$doAddNow__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_lang_Object_2V(this$static, type_0, source, handler){
  var l;
  l = com_google_web_bindery_event_shared_SimpleEventBus_$ensureHandlerList__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, type_0, source);
  l.add__Ljava_lang_Object_2Z(handler);
}

function com_google_web_bindery_event_shared_SimpleEventBus_$doFire__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event_2Ljava_lang_Object_2V(this$static, event_0){
  var causes, e, handler, handlers, it;
  if (!event_0) {
    throw new java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V('Cannot fire null event');
  }
  try {
    ++this$static.com_google_web_bindery_event_shared_SimpleEventBus_firingDepth;
    handlers = com_google_web_bindery_event_shared_SimpleEventBus_$getDispatchList__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, event_0.getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2());
    causes = null;
    it = this$static.com_google_web_bindery_event_shared_SimpleEventBus_isReverseOrder?handlers.listIterator__ILjava_util_ListIterator_2(handlers.size__I()):handlers.listIterator__Ljava_util_ListIterator_2();
    while (this$static.com_google_web_bindery_event_shared_SimpleEventBus_isReverseOrder?it.hasPrevious__Z():it.hasNext__Z()) {
      handler = this$static.com_google_web_bindery_event_shared_SimpleEventBus_isReverseOrder?it.previous__Ljava_lang_Object_2():it.next__Ljava_lang_Object_2();
      try {
        event_0.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(handler, 38));
      }
       catch ($e0) {
        $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
        if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 5)) {
          e = $e0;
          !causes && (causes = new java_util_HashSet_HashSet__V);
          java_util_HashSet_$add__Ljava_util_HashSet_2Ljava_lang_Object_2Z(causes, e);
        }
         else 
          throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
      }
    }
    if (causes) {
      throw new com_google_web_bindery_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V(causes);
    }
  }
   finally {
    --this$static.com_google_web_bindery_event_shared_SimpleEventBus_firingDepth;
    this$static.com_google_web_bindery_event_shared_SimpleEventBus_firingDepth == 0 && com_google_web_bindery_event_shared_SimpleEventBus_$handleQueuedAddsAndRemoves__Lcom_google_web_bindery_event_shared_SimpleEventBus_2V(this$static);
  }
}

function com_google_web_bindery_event_shared_SimpleEventBus_$ensureHandlerList__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, type_0, source){
  var handlers, sourceMap;
  sourceMap = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this$static.com_google_web_bindery_event_shared_SimpleEventBus_map.get__Ljava_lang_Object_2Ljava_lang_Object_2(type_0), 68);
  if (!sourceMap) {
    sourceMap = new java_util_HashMap_HashMap__V;
    this$static.com_google_web_bindery_event_shared_SimpleEventBus_map.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(type_0, sourceMap);
  }
  handlers = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(sourceMap.get__Ljava_lang_Object_2Ljava_lang_Object_2(source), 6);
  if (!handlers) {
    handlers = new java_util_ArrayList_ArrayList__V;
    sourceMap.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(source, handlers);
  }
  return handlers;
}

function com_google_web_bindery_event_shared_SimpleEventBus_$getDispatchList__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, type_0){
  var directHandlers;
  directHandlers = com_google_web_bindery_event_shared_SimpleEventBus_$getHandlerList__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, type_0);
  return directHandlers;
}

function com_google_web_bindery_event_shared_SimpleEventBus_$getHandlerList__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, type_0){
  var handlers, sourceMap;
  sourceMap = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this$static.com_google_web_bindery_event_shared_SimpleEventBus_map.get__Ljava_lang_Object_2Ljava_lang_Object_2(type_0), 68);
  if (!sourceMap) {
    return java_util_Collections_$clinit__V() , java_util_Collections_$clinit__V() , java_util_Collections_EMPTY_1LIST;
  }
  handlers = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(sourceMap.get__Ljava_lang_Object_2Ljava_lang_Object_2(null), 6);
  if (!handlers) {
    return java_util_Collections_$clinit__V() , java_util_Collections_$clinit__V() , java_util_Collections_EMPTY_1LIST;
  }
  return handlers;
}

function com_google_web_bindery_event_shared_SimpleEventBus_$handleQueuedAddsAndRemoves__Lcom_google_web_bindery_event_shared_SimpleEventBus_2V(this$static){
  var c, c$iterator;
  if (this$static.com_google_web_bindery_event_shared_SimpleEventBus_deferredDeltas) {
    try {
      for (c$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this$static.com_google_web_bindery_event_shared_SimpleEventBus_deferredDeltas); c$iterator.java_util_AbstractList$IteratorImpl_i < c$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
        c = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(c$iterator.java_util_AbstractList$IteratorImpl_i < c$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(c$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(c$iterator.java_util_AbstractList$IteratorImpl_i++), 325));
        com_google_web_bindery_event_shared_SimpleEventBus_$doAddNow__Lcom_google_web_bindery_event_shared_SimpleEventBus_2Lcom_google_web_bindery_event_shared_Event$Type_2Ljava_lang_Object_2Ljava_lang_Object_2V(c.com_google_web_bindery_event_shared_SimpleEventBus$2_this$01, c.com_google_web_bindery_event_shared_SimpleEventBus$2_val$type2, c.com_google_web_bindery_event_shared_SimpleEventBus$2_val$source3, c.com_google_web_bindery_event_shared_SimpleEventBus$2_val$handler4);
      }
    }
     finally {
      this$static.com_google_web_bindery_event_shared_SimpleEventBus_deferredDeltas = null;
    }
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(187, 312, {});
_.com_google_web_bindery_event_shared_SimpleEventBus_firingDepth = 0;
_.com_google_web_bindery_event_shared_SimpleEventBus_isReverseOrder = false;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1web_1bindery_1event_1shared_1SimpleEventBus_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_17, 'SimpleEventBus', 187);
function com_google_gwt_event_shared_HandlerManager$Bus_HandlerManager$Bus__ZV(){
  this.com_google_web_bindery_event_shared_SimpleEventBus_map = new java_util_HashMap_HashMap__V;
  this.com_google_web_bindery_event_shared_SimpleEventBus_isReverseOrder = false;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(188, 187, {}, com_google_gwt_event_shared_HandlerManager$Bus_HandlerManager$Bus__ZV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1HandlerManager$Bus_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_18, 'HandlerManager/Bus', 188);
function com_google_gwt_event_shared_LegacyHandlerWrapper_LegacyHandlerWrapper__Lcom_google_web_bindery_event_shared_HandlerRegistration_2V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(203, 1, {}, com_google_gwt_event_shared_LegacyHandlerWrapper_LegacyHandlerWrapper__Lcom_google_web_bindery_event_shared_HandlerRegistration_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1LegacyHandlerWrapper_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_18, 'LegacyHandlerWrapper', 203);
function com_google_web_bindery_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V(causes){
  java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2Ljava_lang_Throwable_2V.call(this, com_google_web_bindery_event_shared_UmbrellaException_makeMessage__Ljava_util_Set_2Ljava_lang_String_2(causes), com_google_web_bindery_event_shared_UmbrellaException_makeCause__Ljava_util_Set_2Ljava_lang_Throwable_2(causes));
  this.com_google_web_bindery_event_shared_UmbrellaException_causes = causes;
}

function com_google_web_bindery_event_shared_UmbrellaException_makeCause__Ljava_util_Set_2Ljava_lang_Throwable_2(causes){
  var iterator;
  iterator = causes.iterator__Ljava_util_Iterator_2();
  if (!iterator.hasNext__Z()) {
    return null;
  }
  return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(iterator.next__Ljava_lang_Object_2(), 5);
}

function com_google_web_bindery_event_shared_UmbrellaException_makeMessage__Ljava_util_Set_2Ljava_lang_String_2(causes){
  var b, count, first, t, t$iterator;
  count = causes.size__I();
  if (count == 0) {
    return null;
  }
  b = new java_lang_StringBuilder_StringBuilder__Ljava_lang_String_2V(count == 1?'Exception caught: ':count + ' exceptions caught: ');
  first = true;
  for (t$iterator = causes.iterator__Ljava_util_Iterator_2(); t$iterator.hasNext__Z();) {
    t = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(t$iterator.next__Ljava_lang_Object_2(), 5);
    first?(first = false):(b.java_lang_AbstractStringBuilder_string += '; ' , b);
    java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, t.getMessage__Ljava_lang_String_2());
  }
  return b.java_lang_AbstractStringBuilder_string;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(64, 17, $intern_21, com_google_web_bindery_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1web_1bindery_1event_1shared_1UmbrellaException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_17, $intern_22, 64);
function com_google_gwt_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V(causes){
  com_google_web_bindery_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V.call(this, causes);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(118, 64, $intern_21, com_google_gwt_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1UmbrellaException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_18, $intern_22, 118);
function com_google_gwt_http_client_Request_$cancel__Lcom_google_gwt_http_client_Request_2V(this$static){
  var xhr;
  if (!this$static.com_google_gwt_http_client_Request_xmlHttpRequest) {
    return;
  }
  com_google_gwt_user_client_Timer_$cancel__Lcom_google_gwt_user_client_Timer_2V(this$static.com_google_gwt_http_client_Request_timer);
  xhr = this$static.com_google_gwt_http_client_Request_xmlHttpRequest;
  this$static.com_google_gwt_http_client_Request_xmlHttpRequest = null;
  com_google_gwt_xhr_client_XMLHttpRequest_$clearOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(xhr);
  xhr.abort();
}

function com_google_gwt_http_client_Request_$fireOnResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_RequestCallback_2V(this$static, callback){
  var response, xhr;
  if (!this$static.com_google_gwt_http_client_Request_xmlHttpRequest) {
    return;
  }
  com_google_gwt_user_client_Timer_$cancel__Lcom_google_gwt_user_client_Timer_2V(this$static.com_google_gwt_http_client_Request_timer);
  xhr = this$static.com_google_gwt_http_client_Request_xmlHttpRequest;
  this$static.com_google_gwt_http_client_Request_xmlHttpRequest = null;
  response = new com_google_gwt_http_client_ResponseImpl_ResponseImpl__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(xhr);
  com_sensia_gwt_relaxNG_RNGParser$1_$onResponseReceived__Lcom_sensia_gwt_relaxNG_RNGParser$1_2Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(callback, response);
}

function com_google_gwt_http_client_Request_$fireOnTimeout__Lcom_google_gwt_http_client_Request_2V(this$static){
  if (!this$static.com_google_gwt_http_client_Request_xmlHttpRequest) {
    return;
  }
  com_google_gwt_http_client_Request_$cancel__Lcom_google_gwt_http_client_Request_2V(this$static);
  new com_google_gwt_http_client_RequestTimeoutException_RequestTimeoutException__Lcom_google_gwt_http_client_Request_2IV(this$static.com_google_gwt_http_client_Request_timeoutMillis);
}

function com_google_gwt_http_client_Request_Request__Lcom_google_gwt_xhr_client_XMLHttpRequest_2ILcom_google_gwt_http_client_RequestCallback_2V(xmlHttpRequest, timeoutMillis){
  this.com_google_gwt_http_client_Request_timer = new com_google_gwt_http_client_Request$1_Request$1__Lcom_google_gwt_http_client_Request_2V(this);
  if (!xmlHttpRequest) {
    throw new java_lang_NullPointerException_NullPointerException__V;
  }
  if (timeoutMillis < 0) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__V;
  }
  this.com_google_gwt_http_client_Request_timeoutMillis = timeoutMillis;
  this.com_google_gwt_http_client_Request_xmlHttpRequest = xmlHttpRequest;
  timeoutMillis > 0 && com_google_gwt_user_client_Timer_$schedule__Lcom_google_gwt_user_client_Timer_2IV(this.com_google_gwt_http_client_Request_timer, timeoutMillis);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(209, 1, {}, com_google_gwt_http_client_Request_Request__Lcom_google_gwt_xhr_client_XMLHttpRequest_2ILcom_google_gwt_http_client_RequestCallback_2V);
_.com_google_gwt_http_client_Request_timeoutMillis = 0;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Request_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'Request', 209);
function com_google_gwt_http_client_Request$1_Request$1__Lcom_google_gwt_http_client_Request_2V(this$0){
  this.com_google_gwt_http_client_Request$1_this$01 = this$0;
  com_google_gwt_user_client_Timer_Timer__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(211, 128, {}, com_google_gwt_http_client_Request$1_Request$1__Lcom_google_gwt_http_client_Request_2V);
_.run__V = function com_google_gwt_http_client_Request$1_run__V(){
  com_google_gwt_http_client_Request_$fireOnTimeout__Lcom_google_gwt_http_client_Request_2V(this.com_google_gwt_http_client_Request$1_this$01);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Request$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'Request/1', 211);
function com_google_gwt_http_client_RequestBuilder_$clinit__V(){
  com_google_gwt_http_client_RequestBuilder_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V('DELETE');
  com_google_gwt_http_client_RequestBuilder_GET = new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V('GET');
  new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V('HEAD');
  new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V('POST');
  new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V('PUT');
}

function com_google_gwt_http_client_RequestBuilder_$doSend__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(this$static, callback){
  var e, request, requestPermissionException, xmlHttpRequest;
  xmlHttpRequest = new $wnd.XMLHttpRequest;
  try {
    com_google_gwt_xhr_client_XMLHttpRequest_$open__Lcom_google_gwt_xhr_client_XMLHttpRequest_2Ljava_lang_String_2Ljava_lang_String_2V(xmlHttpRequest, this$static.com_google_gwt_http_client_RequestBuilder_httpMethod, this$static.com_google_gwt_http_client_RequestBuilder_url);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 31)) {
      e = $e0;
      requestPermissionException = new com_google_gwt_http_client_RequestPermissionException_RequestPermissionException__Ljava_lang_String_2V(this$static.com_google_gwt_http_client_RequestBuilder_url);
      java_lang_Throwable_$initCause__Ljava_lang_Throwable_2Ljava_lang_Throwable_2Ljava_lang_Throwable_2(requestPermissionException, new com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V(e.getMessage__Ljava_lang_String_2()));
      throw requestPermissionException;
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
  }
  xmlHttpRequest.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
  this$static.com_google_gwt_http_client_RequestBuilder_includeCredentials && (xmlHttpRequest.withCredentials = true , undefined);
  request = new com_google_gwt_http_client_Request_Request__Lcom_google_gwt_xhr_client_XMLHttpRequest_2ILcom_google_gwt_http_client_RequestCallback_2V(xmlHttpRequest, this$static.com_google_gwt_http_client_RequestBuilder_timeoutMillis);
  com_google_gwt_xhr_client_XMLHttpRequest_$setOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2Lcom_google_gwt_xhr_client_ReadyStateChangeHandler_2V(xmlHttpRequest, new com_google_gwt_http_client_RequestBuilder$1_RequestBuilder$1__Lcom_google_gwt_http_client_RequestBuilder_2V(request, callback));
  try {
    xmlHttpRequest.send(null);
  }
   catch ($e1) {
    $e1 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e1);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e1, 31)) {
      e = $e1;
      throw new com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V(e.getMessage__Ljava_lang_String_2());
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e1);
  }
  return request;
}

function com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(this$static, callback){
  com_google_gwt_http_client_StringValidator_throwIfNull__Ljava_lang_String_2Ljava_lang_Object_2V('callback', callback);
  return com_google_gwt_http_client_RequestBuilder_$doSend__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(this$static, callback);
}

function com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V(httpMethod, url_0){
  com_google_gwt_http_client_RequestBuilder_$clinit__V();
  com_google_gwt_http_client_RequestBuilder_RequestBuilder__Ljava_lang_String_2Ljava_lang_String_2V.call(this, !httpMethod?null:httpMethod.com_google_gwt_http_client_RequestBuilder$Method_name, url_0);
}

function com_google_gwt_http_client_RequestBuilder_RequestBuilder__Ljava_lang_String_2Ljava_lang_String_2V(httpMethod, url_0){
  com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V('httpMethod', httpMethod);
  com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V('url', url_0);
  this.com_google_gwt_http_client_RequestBuilder_httpMethod = httpMethod;
  this.com_google_gwt_http_client_RequestBuilder_url = url_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(127, 1, {}, com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V);
_.com_google_gwt_http_client_RequestBuilder_includeCredentials = false;
_.com_google_gwt_http_client_RequestBuilder_timeoutMillis = 0;
var com_google_gwt_http_client_RequestBuilder_GET;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestBuilder_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'RequestBuilder', 127);
function com_google_gwt_http_client_RequestBuilder$1_RequestBuilder$1__Lcom_google_gwt_http_client_RequestBuilder_2V(val$request, val$callback){
  this.com_google_gwt_http_client_RequestBuilder$1_val$request2 = val$request;
  this.com_google_gwt_http_client_RequestBuilder$1_val$callback3 = val$callback;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(208, 1, {}, com_google_gwt_http_client_RequestBuilder$1_RequestBuilder$1__Lcom_google_gwt_http_client_RequestBuilder_2V);
_.onReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V = function com_google_gwt_http_client_RequestBuilder$1_onReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(xhr){
  if (xhr.readyState == 4) {
    com_google_gwt_xhr_client_XMLHttpRequest_$clearOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(xhr);
    com_google_gwt_http_client_Request_$fireOnResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_RequestCallback_2V(this.com_google_gwt_http_client_RequestBuilder$1_val$request2, this.com_google_gwt_http_client_RequestBuilder$1_val$callback3);
  }
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestBuilder$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'RequestBuilder/1', 208);
function com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V(name_0){
  this.com_google_gwt_http_client_RequestBuilder$Method_name = name_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(74, 1, {}, com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V);
_.toString__Ljava_lang_String_2$ = function com_google_gwt_http_client_RequestBuilder$Method_toString__Ljava_lang_String_2(){
  return this.com_google_gwt_http_client_RequestBuilder$Method_name;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestBuilder$Method_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'RequestBuilder/Method', 74);
function com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V(message){
  java_lang_Exception_Exception__Ljava_lang_String_2V.call(this, message);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(48, 9, $intern_24, com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'RequestException', 48);
function com_google_gwt_http_client_RequestPermissionException_RequestPermissionException__Ljava_lang_String_2V(url_0){
  com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V.call(this, 'The URL ' + url_0 + ' is invalid or violates the same-origin security restriction');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(223, 48, $intern_24, com_google_gwt_http_client_RequestPermissionException_RequestPermissionException__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestPermissionException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'RequestPermissionException', 223);
function com_google_gwt_http_client_RequestTimeoutException_RequestTimeoutException__Lcom_google_gwt_http_client_Request_2IV(timeoutMillis){
  com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V.call(this, 'A request timeout has expired after ' + timeoutMillis + ' ms');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(227, 48, $intern_24, com_google_gwt_http_client_RequestTimeoutException_RequestTimeoutException__Lcom_google_gwt_http_client_Request_2IV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestTimeoutException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'RequestTimeoutException', 227);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(318, 1, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Response_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'Response', 318);
function com_google_gwt_http_client_ResponseImpl_ResponseImpl__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(xmlHttpRequest){
  this.com_google_gwt_http_client_ResponseImpl_xmlHttpRequest = xmlHttpRequest;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(210, 318, {}, com_google_gwt_http_client_ResponseImpl_ResponseImpl__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1ResponseImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_23, 'ResponseImpl', 210);
function com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V(name_0, value_0){
  com_google_gwt_http_client_StringValidator_throwIfNull__Ljava_lang_String_2Ljava_lang_Object_2V(name_0, value_0);
  if (0 == java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(value_0).length) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V(name_0 + ' cannot be empty');
  }
}

function com_google_gwt_http_client_StringValidator_throwIfNull__Ljava_lang_String_2Ljava_lang_Object_2V(name_0, value_0){
  if (null == value_0) {
    throw new java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V(name_0 + ' cannot be null');
  }
}

function com_google_gwt_i18n_client_BidiUtils_getDirectionOnElement__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2(elem){
  var dirPropertyValue;
  dirPropertyValue = com_google_gwt_dom_client_Element_$getPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2(elem, 'dir');
  if (java_lang_String_$equalsIgnoreCase__Ljava_lang_String_2Ljava_lang_String_2Z('rtl', dirPropertyValue)) {
    return com_google_gwt_i18n_client_HasDirection$Direction_$clinit__V() , com_google_gwt_i18n_client_HasDirection$Direction_RTL;
  }
   else if (java_lang_String_$equalsIgnoreCase__Ljava_lang_String_2Ljava_lang_String_2Z('ltr', dirPropertyValue)) {
    return com_google_gwt_i18n_client_HasDirection$Direction_$clinit__V() , com_google_gwt_i18n_client_HasDirection$Direction_LTR;
  }
  return com_google_gwt_i18n_client_HasDirection$Direction_$clinit__V() , com_google_gwt_i18n_client_HasDirection$Direction_DEFAULT;
}

function com_google_gwt_i18n_client_BidiUtils_setDirectionOnElement__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2V(elem, direction){
  switch (direction.java_lang_Enum_ordinal) {
    case 0:
      {
        com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(elem, 'dir', 'rtl');
        break;
      }

    case 1:
      {
        com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(elem, 'dir', 'ltr');
        break;
      }

    case 2:
      {
        com_google_gwt_i18n_client_BidiUtils_getDirectionOnElement__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2(elem) != (com_google_gwt_i18n_client_HasDirection$Direction_$clinit__V() , com_google_gwt_i18n_client_HasDirection$Direction_DEFAULT) && com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(elem, 'dir', '');
        break;
      }

  }
}

function com_google_gwt_i18n_client_HasDirection$Direction_$clinit__V(){
  com_google_gwt_i18n_client_HasDirection$Direction_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_i18n_client_HasDirection$Direction_RTL = new com_google_gwt_i18n_client_HasDirection$Direction_HasDirection$Direction__Ljava_lang_String_2IV('RTL', 0);
  com_google_gwt_i18n_client_HasDirection$Direction_LTR = new com_google_gwt_i18n_client_HasDirection$Direction_HasDirection$Direction__Ljava_lang_String_2IV('LTR', 1);
  com_google_gwt_i18n_client_HasDirection$Direction_DEFAULT = new com_google_gwt_i18n_client_HasDirection$Direction_HasDirection$Direction__Ljava_lang_String_2IV('DEFAULT', 2);
}

function com_google_gwt_i18n_client_HasDirection$Direction_HasDirection$Direction__Ljava_lang_String_2IV(enum$name, enum$ordinal){
  java_lang_Enum_Enum__Ljava_lang_String_2IV.call(this, enum$name, enum$ordinal);
}

function com_google_gwt_i18n_client_HasDirection$Direction_values___3Lcom_google_gwt_i18n_client_HasDirection$Direction_2(){
  com_google_gwt_i18n_client_HasDirection$Direction_$clinit__V();
  return com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1HasDirection$Direction_12_1classLit, 1), $intern_14, 71, 0, [com_google_gwt_i18n_client_HasDirection$Direction_RTL, com_google_gwt_i18n_client_HasDirection$Direction_LTR, com_google_gwt_i18n_client_HasDirection$Direction_DEFAULT]);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(71, 22, {71:1, 3:1, 25:1, 22:1}, com_google_gwt_i18n_client_HasDirection$Direction_HasDirection$Direction__Ljava_lang_String_2IV);
var com_google_gwt_i18n_client_HasDirection$Direction_DEFAULT, com_google_gwt_i18n_client_HasDirection$Direction_LTR, com_google_gwt_i18n_client_HasDirection$Direction_RTL;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1HasDirection$Direction_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2('com.google.gwt.i18n.client', 'HasDirection/Direction', 71, com_google_gwt_i18n_client_HasDirection$Direction_values___3Lcom_google_gwt_i18n_client_HasDirection$Direction_2);
function com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(clazz, dimensions){
  return java_lang_Class_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(clazz, dimensions);
}

function com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(leafClassLiteral, castableTypeMap, elementTypeId, length_0, elementTypeCategory, dimensions){
  var result;
  result = com_google_gwt_lang_Array_initializeArrayElementsWithDefaults__IILjava_lang_Object_2(elementTypeCategory, length_0);
  com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(leafClassLiteral, dimensions), castableTypeMap, elementTypeId, elementTypeCategory, result);
  return result;
}

function com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(arrayClass, castableTypeMap, elementTypeId, elementTypeCategory, array){
  array.java_lang_Object__1_1_1clazz$ = arrayClass;
  array.java_lang_Object_castableTypeMap$ = castableTypeMap;
  array.java_lang_Object_typeMarker$ = com_google_gwt_lang_JavaClassHierarchySetupUtil_typeMarkerFn__V;
  array.__elementTypeId$ = elementTypeId;
  array.__elementTypeCategory$ = elementTypeCategory;
  return array;
}

function com_google_gwt_lang_Array_initializeArrayElementsWithDefaults__IILjava_lang_Object_2(elementTypeCategory, length_0){
  var array = new Array(length_0);
  var initValue;
  switch (elementTypeCategory) {
    case 6:
      initValue = {l:0, m:0, h:0};
      break;
    case 7:
      initValue = 0;
      break;
    case 8:
      initValue = false;
      break;
    default:return array;
  }
  for (var i = 0; i < length_0; ++i) {
    array[i] = initValue;
  }
  return array;
}

function com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(array, index_0, value_0){
  var elementTypeId;
  if (value_0 != null) {
    switch (array.__elementTypeCategory$) {
      case 4:
        if (!com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(value_0)) {
          throw new java_lang_ArrayStoreException_ArrayStoreException__V;
        }

        break;
      case 0:
        {
          elementTypeId = array.__elementTypeId$;
          if (!com_google_gwt_lang_Cast_canCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(value_0, elementTypeId)) {
            throw new java_lang_ArrayStoreException_ArrayStoreException__V;
          }
          break;
        }

      case 2:
        if (!(!com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(value_0) && !com_google_gwt_lang_Util_hasTypeMarker__Ljava_lang_Object_2Z(value_0))) {
          throw new java_lang_ArrayStoreException_ArrayStoreException__V;
        }

        break;
      case 1:
        {
          elementTypeId = array.__elementTypeId$;
          if (!(!com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(value_0) && !com_google_gwt_lang_Util_hasTypeMarker__Ljava_lang_Object_2Z(value_0)) && !com_google_gwt_lang_Cast_canCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(value_0, elementTypeId)) {
            throw new java_lang_ArrayStoreException_ArrayStoreException__V;
          }
          break;
        }

    }
  }
  return array[index_0] = value_0;
}

function com_google_gwt_lang_Exceptions_cacheJavaScriptException__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptException_2V(e, jse){
  if (e && typeof e == $intern_0) {
    try {
      e.__gwt$exception = jse;
    }
     catch (ignored) {
    }
  }
}

function com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2(e){
  var jse;
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(e, 31)) {
    jse = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(e, 31);
    if (com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(jse.com_google_gwt_core_client_JavaScriptException_e) !== com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2((com_google_gwt_core_client_JavaScriptException_$clinit__V() , com_google_gwt_core_client_JavaScriptException_NOT_1SET))) {
      return com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(jse.com_google_gwt_core_client_JavaScriptException_e) === com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_core_client_JavaScriptException_NOT_1SET)?null:jse.com_google_gwt_core_client_JavaScriptException_e;
    }
  }
  return e;
}

function com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2(e){
  var jse;
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(e, 5)) {
    return e;
  }
  jse = e && e.__gwt$exception;
  if (!jse) {
    jse = new com_google_gwt_core_client_JavaScriptException_JavaScriptException__Ljava_lang_Object_2V(e);
    com_google_gwt_core_client_impl_StackTraceCreator_captureStackTrace__Ljava_lang_Throwable_2Ljava_lang_Object_2V(jse, e);
    com_google_gwt_lang_Exceptions_cacheJavaScriptException__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptException_2V(e, jse);
  }
  return jse;
}

function com_google_gwt_lang_LongLibBase_create__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(value_0){
  var a0, a1, a2;
  a0 = value_0 & $intern_25;
  a1 = value_0 >> 22 & $intern_25;
  a2 = value_0 < 0?$intern_26:0;
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(a0, a1, a2);
}

function com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(l, m, h){
  return {l:l, m:m, h:h};
}

function com_google_gwt_lang_LongLib_eq__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(a, b){
  return a.l == b.l && a.m == b.m && a.h == b.h;
}

function com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(value_0){
  var a0, a1, a2, negative, result, com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg0_0, com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg1_0, com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg2_0;
  if (isNaN(value_0)) {
    return com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_ZERO;
  }
  if (value_0 < -9223372036854775808) {
    return com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_MIN_1VALUE;
  }
  if (value_0 >= 9223372036854775807) {
    return com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_MAX_1VALUE;
  }
  negative = false;
  if (value_0 < 0) {
    negative = true;
    value_0 = -value_0;
  }
  a2 = 0;
  if (value_0 >= $intern_27) {
    a2 = com_google_gwt_lang_Cast_round_1int__DI(value_0 / $intern_27);
    value_0 -= a2 * $intern_27;
  }
  a1 = 0;
  if (value_0 >= $intern_28) {
    a1 = com_google_gwt_lang_Cast_round_1int__DI(value_0 / $intern_28);
    value_0 -= a1 * $intern_28;
  }
  a0 = com_google_gwt_lang_Cast_round_1int__DI(value_0);
  result = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(a0, a1, a2);
  negative && (com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg0_0 = ~result.l + 1 & $intern_25 , com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg1_0 = ~result.m + (com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg0_0 == 0?1:0) & $intern_25 , com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg2_0 = ~result.h + (com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg0_0 == 0 && com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg1_0 == 0?1:0) & $intern_26 , result.l = com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg0_0 , result.m = com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg1_0 , result.h = com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_neg2_0 , undefined);
  return result;
}

function com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(value_0){
  var rebase, result;
  if (value_0 > -129 && value_0 < 128) {
    rebase = value_0 + 128;
    com_google_gwt_lang_LongLib_boxedValues == null && (com_google_gwt_lang_LongLib_boxedValues = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1lang_1LongLibBase$LongEmul_12_1classLit, $intern_14, 336, 256, 0, 1));
    result = com_google_gwt_lang_LongLib_boxedValues[rebase];
    !result && (result = com_google_gwt_lang_LongLib_boxedValues[rebase] = com_google_gwt_lang_LongLibBase_create__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(value_0));
    return result;
  }
  return com_google_gwt_lang_LongLibBase_create__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(value_0);
}

function com_google_gwt_lang_LongLib_shru__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(a, n){
  var a2, res0, res1, res2;
  n &= 63;
  a2 = a.h & $intern_26;
  if (n < 22) {
    res2 = a2 >>> n;
    res1 = a.m >> n | a2 << 22 - n;
    res0 = a.l >> n | a.m << 22 - n;
  }
   else if (n < 44) {
    res2 = 0;
    res1 = a2 >>> n - 22;
    res0 = a.m >> n - 22 | a.h << 44 - n;
  }
   else {
    res2 = 0;
    res1 = 0;
    res0 = a2 >>> n - 44;
  }
  return {l:res0 & $intern_25, m:res1 & $intern_25, h:res2 & $intern_26};
}

function com_google_gwt_lang_LongLib_toInt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(a){
  return a.l | a.m << 22;
}

function com_google_gwt_lang_LongLib_xor__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a, b){
  return {l:a.l ^ b.l, m:a.m ^ b.m, h:a.h ^ b.h};
}

var com_google_gwt_lang_LongLib_boxedValues;
function com_google_gwt_lang_LongLib$Const_$clinit__V(){
  com_google_gwt_lang_LongLib$Const_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_lang_LongLib$Const_MAX_1VALUE = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2($intern_25, $intern_25, 524287);
  com_google_gwt_lang_LongLib$Const_MIN_1VALUE = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(0, 0, $intern_29);
  com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(1);
  com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(2);
  com_google_gwt_lang_LongLib$Const_ZERO = com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(0);
}

var com_google_gwt_lang_LongLib$Const_MAX_1VALUE, com_google_gwt_lang_LongLib$Const_MIN_1VALUE, com_google_gwt_lang_LongLib$Const_ZERO;
function com_google_gwt_lang_Util_hasTypeMarker__Ljava_lang_Object_2Z(o){
  return o.java_lang_Object_typeMarker$ === com_google_gwt_lang_JavaClassHierarchySetupUtil_typeMarkerFn__V;
}

function com_google_gwt_lang_com_100046sensia_100046swetools_100046editors_100046sensorml_100046SensorMLEditor_1_1EntryMethodHolder_init__V(){
  $wnd.setTimeout($entry(com_google_gwt_useragent_client_UserAgentAsserter_assertCompileTimeUserAgent__V));
  com_google_gwt_user_client_DocumentModeAsserter_$onModuleLoad__Lcom_google_gwt_user_client_DocumentModeAsserter_2V();
  com_sensia_swetools_editors_sensorml_client_SensorMLModule_$onModuleLoad__Lcom_sensia_swetools_editors_sensorml_client_SensorMLModule_2V();
}

function com_google_gwt_resources_client_impl_ImageResourcePrototype_ImageResourcePrototype__Ljava_lang_String_2Lcom_google_gwt_safehtml_shared_SafeUri_2IIIIZZV(url_0){
  this.com_google_gwt_resources_client_impl_ImageResourcePrototype_height = 16;
  this.com_google_gwt_resources_client_impl_ImageResourcePrototype_width = 16;
  this.com_google_gwt_resources_client_impl_ImageResourcePrototype_url = url_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(144, 1, {}, com_google_gwt_resources_client_impl_ImageResourcePrototype_ImageResourcePrototype__Ljava_lang_String_2Lcom_google_gwt_safehtml_shared_SafeUri_2IIIIZZV);
_.com_google_gwt_resources_client_impl_ImageResourcePrototype_height = 0;
_.com_google_gwt_resources_client_impl_ImageResourcePrototype_width = 0;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1resources_1client_1impl_1ImageResourcePrototype_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2('com.google.gwt.resources.client.impl', 'ImageResourcePrototype', 144);
function com_google_gwt_safehtml_shared_SafeUriString_SafeUriString__Ljava_lang_String_2V(uri_0){
  if (uri_0 == null) {
    throw new java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V('uri is null');
  }
  this.com_google_gwt_safehtml_shared_SafeUriString_uri = uri_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(77, 1, {290:1, 77:1}, com_google_gwt_safehtml_shared_SafeUriString_SafeUriString__Ljava_lang_String_2V);
_.equals__Ljava_lang_Object_2Z$ = function com_google_gwt_safehtml_shared_SafeUriString_equals__Ljava_lang_Object_2Z(obj){
  if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(obj, 290)) {
    return false;
  }
  return java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(this.com_google_gwt_safehtml_shared_SafeUriString_uri, com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(obj, 290), 77).com_google_gwt_safehtml_shared_SafeUriString_uri);
}
;
_.hashCode__I$ = function com_google_gwt_safehtml_shared_SafeUriString_hashCode__I(){
  return java_lang_String$HashCache_getHashCode__Ljava_lang_String_2I(this.com_google_gwt_safehtml_shared_SafeUriString_uri);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1safehtml_1shared_1SafeUriString_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2('com.google.gwt.safehtml.shared', 'SafeUriString', 77);
function com_google_gwt_safehtml_shared_UriUtils_$clinit__V(){
  com_google_gwt_safehtml_shared_UriUtils_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  new RegExp('%5B', 'g');
  new RegExp('%5D', 'g');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(321, 1, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1text_1shared_1AbstractRenderer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2('com.google.gwt.text.shared', 'AbstractRenderer', 321);
function com_google_gwt_text_shared_testing_PassthroughParser_PassthroughParser__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(276, 1, {}, com_google_gwt_text_shared_testing_PassthroughParser_PassthroughParser__V);
var com_google_gwt_text_shared_testing_PassthroughParser_INSTANCE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1text_1shared_1testing_1PassthroughParser_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_30, 'PassthroughParser', 276);
function com_google_gwt_text_shared_testing_PassthroughRenderer_PassthroughRenderer__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(275, 321, {}, com_google_gwt_text_shared_testing_PassthroughRenderer_PassthroughRenderer__V);
var com_google_gwt_text_shared_testing_PassthroughRenderer_INSTANCE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1text_1shared_1testing_1PassthroughRenderer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_30, 'PassthroughRenderer', 275);
function com_google_gwt_user_client_DOM_$clinit__V(){
  com_google_gwt_user_client_DOM_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_impl_DOMImplMozilla_$clinit__V();
}

function com_google_gwt_user_client_DOM_dispatchEvent__Lcom_google_gwt_user_client_Event_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2V(evt, elem, listener){
  com_google_gwt_user_client_DOM_$clinit__V();
  var prevCurrentEvent;
  prevCurrentEvent = com_google_gwt_user_client_DOM_currentEvent;
  com_google_gwt_user_client_DOM_currentEvent = evt;
  elem == com_google_gwt_user_client_DOM_sCaptureElem && com_google_gwt_user_client_impl_DOMImpl_$eventGetTypeInt__Lcom_google_gwt_user_client_impl_DOMImpl_2Ljava_lang_String_2I(evt.type) == 8192 && (com_google_gwt_user_client_DOM_sCaptureElem = null);
  listener.onBrowserEvent__Lcom_google_gwt_user_client_Event_2V(evt);
  com_google_gwt_user_client_DOM_currentEvent = prevCurrentEvent;
}

function com_google_gwt_user_client_DOM_insertChild__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(parent_0, child, index_0){
  com_google_gwt_user_client_DOM_$clinit__V();
  com_google_gwt_user_client_impl_DOMImplStandard_$insertChild__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(parent_0, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(child), index_0);
}

function com_google_gwt_user_client_DOM_isPotential__Lcom_google_gwt_core_client_JavaScriptObject_2Z(o){
  com_google_gwt_user_client_DOM_$clinit__V();
  try {
    return !!o && !!o.__gwt_resolve;
  }
   catch (e) {
    return false;
  }
}

function com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(maybePotential){
  com_google_gwt_user_client_DOM_$clinit__V();
  return maybePotential.__gwt_resolve?maybePotential.__gwt_resolve():maybePotential;
}

var com_google_gwt_user_client_DOM_currentEvent = null, com_google_gwt_user_client_DOM_sCaptureElem;
function com_google_gwt_user_client_DocumentModeAsserter_$onModuleLoad__Lcom_google_gwt_user_client_DocumentModeAsserter_2V(){
  var allowedModes, currentMode, i;
  currentMode = $doc.compatMode;
  allowedModes = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1String_12_1classLit, 1), $intern_14, 2, 4, [$intern_31]);
  for (i = 0; i < allowedModes.length; i++) {
    if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(allowedModes[i], currentMode)) {
      return;
    }
  }
  allowedModes.length == 1 && java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_31, allowedModes[0]) && java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z('BackCompat', currentMode)?"GWT no longer supports Quirks Mode (document.compatMode=' BackCompat').<br>Make sure your application's host HTML page has a Standards Mode (document.compatMode=' CSS1Compat') doctype,<br>e.g. by using &lt;!doctype html&gt; at the start of your application's HTML page.<br><br>To continue using this unsupported rendering mode and risk layout problems, suppress this message by adding<br>the following line to your*.gwt.xml module file:<br>&nbsp;&nbsp;&lt;extend-configuration-property name=\"document.compatMode\" value=\"" + currentMode + '"/&gt;':"Your *.gwt.xml module configuration prohibits the use of the current document rendering mode (document.compatMode=' " + currentMode + "').<br>Modify your application's host HTML page doctype, or update your custom " + "'document.compatMode' configuration property settings.";
}

function com_google_gwt_user_client_Event_getTypeInt__Ljava_lang_String_2I(typeName){
  return com_google_gwt_user_client_impl_DOMImpl_$eventGetTypeInt__Lcom_google_gwt_user_client_impl_DOMImpl_2Ljava_lang_String_2I((com_google_gwt_user_client_DOM_$clinit__V() , typeName));
}

function com_google_gwt_user_client_Event_sinkEvents__Lcom_google_gwt_dom_client_Element_2IV(elem){
  com_google_gwt_user_client_DOM_$clinit__V();
  com_google_gwt_user_client_impl_DOMImplMozilla_$sinkEvents__Lcom_google_gwt_user_client_impl_DOMImplMozilla_2Lcom_google_gwt_dom_client_Element_2IV(elem, 32768);
}

function com_google_gwt_user_client_Window_addCloseHandler__Lcom_google_gwt_event_logical_shared_CloseHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(handler){
  com_google_gwt_user_client_Window_maybeInitializeCloseHandlers__V();
  return com_google_gwt_user_client_Window_addHandler__Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(com_google_gwt_event_logical_shared_CloseEvent_TYPE?com_google_gwt_event_logical_shared_CloseEvent_TYPE:(com_google_gwt_event_logical_shared_CloseEvent_TYPE = new com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V), handler);
}

function com_google_gwt_user_client_Window_addHandler__Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(type_0, handler){
  return com_google_gwt_event_shared_HandlerManager_$addHandler__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2((!com_google_gwt_user_client_Window_handlers && (com_google_gwt_user_client_Window_handlers = new com_google_gwt_user_client_Window$WindowHandlers_Window$WindowHandlers__V) , com_google_gwt_user_client_Window_handlers), type_0, handler);
}

function com_google_gwt_user_client_Window_maybeInitializeCloseHandlers__V(){
  if (!com_google_gwt_user_client_Window_closeHandlersInitialized) {
    com_google_gwt_user_client_impl_WindowImpl_$initWindowCloseHandler__Lcom_google_gwt_user_client_impl_WindowImpl_2V();
    com_google_gwt_user_client_Window_closeHandlersInitialized = true;
  }
}

function com_google_gwt_user_client_Window_onClosing__Ljava_lang_String_2(){
  var event_0;
  if (com_google_gwt_user_client_Window_closeHandlersInitialized) {
    event_0 = new com_google_gwt_user_client_Window$ClosingEvent_Window$ClosingEvent__V;
    !!com_google_gwt_user_client_Window_handlers && com_google_gwt_event_shared_HandlerManager_$fireEvent__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent_2V(com_google_gwt_user_client_Window_handlers, event_0);
    return null;
  }
  return null;
}

var com_google_gwt_user_client_Window_closeHandlersInitialized = false, com_google_gwt_user_client_Window_handlers;
function com_google_gwt_user_client_Window$ClosingEvent_$clinit__V(){
  com_google_gwt_user_client_Window$ClosingEvent_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_Window$ClosingEvent_TYPE = new com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V;
}

function com_google_gwt_user_client_Window$ClosingEvent_Window$ClosingEvent__V(){
  com_google_gwt_user_client_Window$ClosingEvent_$clinit__V();
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(185, 311, {}, com_google_gwt_user_client_Window$ClosingEvent_Window$ClosingEvent__V);
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_user_client_Window$ClosingEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_google_gwt_lang_Cast_throwClassCastExceptionUnlessNull__Ljava_lang_Object_2Ljava_lang_Object_2(handler);
  null.nullMethod();
}
;
_.getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2 = function com_google_gwt_user_client_Window$ClosingEvent_getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2(){
  return com_google_gwt_user_client_Window$ClosingEvent_TYPE;
}
;
var com_google_gwt_user_client_Window$ClosingEvent_TYPE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Window$ClosingEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_7, 'Window/ClosingEvent', 185);
function com_google_gwt_user_client_Window$WindowHandlers_Window$WindowHandlers__V(){
  com_google_gwt_event_shared_HandlerManager_HandlerManager__Ljava_lang_Object_2V.call(this, null);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(124, 82, {11:1}, com_google_gwt_user_client_Window$WindowHandlers_Window$WindowHandlers__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Window$WindowHandlers_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_7, 'Window/WindowHandlers', 124);
function com_google_gwt_user_client_impl_DOMImpl_$eventGetTypeInt__Lcom_google_gwt_user_client_impl_DOMImpl_2Ljava_lang_String_2I(eventType){
  switch (eventType) {
    case 'blur':
      return 4096;
    case 'change':
      return 1024;
    case 'click':
      return 1;
    case 'dblclick':
      return 2;
    case 'focus':
      return 2048;
    case 'keydown':
      return 128;
    case 'keypress':
      return 256;
    case 'keyup':
      return 512;
    case $intern_32:
      return 32768;
    case 'losecapture':
      return 8192;
    case 'mousedown':
      return 4;
    case 'mousemove':
      return 64;
    case 'mouseout':
      return 32;
    case 'mouseover':
      return 16;
    case 'mouseup':
      return 8;
    case 'scroll':
      return 16384;
    case 'error':
      return $intern_33;
    case $intern_34:
    case 'mousewheel':
      return $intern_35;
    case 'contextmenu':
      return 262144;
    case 'paste':
      return $intern_29;
    case 'touchstart':
      return 1048576;
    case 'touchmove':
      return 2097152;
    case 'touchend':
      return $intern_28;
    case 'touchcancel':
      return 8388608;
    case 'gesturestart':
      return $intern_36;
    case 'gesturechange':
      return $intern_37;
    case 'gestureend':
      return $intern_38;
    default:return -1;
  }
}

function com_google_gwt_user_client_impl_DOMImpl_$maybeInitializeEventSystem__Lcom_google_gwt_user_client_impl_DOMImpl_2V(){
  if (!com_google_gwt_user_client_impl_DOMImpl_eventSystemIsInitialized) {
    com_google_gwt_user_client_impl_DOMImplStandard_$initEventSystem__Lcom_google_gwt_user_client_impl_DOMImplStandard_2V();
    com_google_gwt_user_client_impl_DOMImplMozilla_$initSyntheticMouseUpEvents__Lcom_google_gwt_user_client_impl_DOMImplMozilla_2V();
    com_google_gwt_user_client_impl_DOMImpl_eventSystemIsInitialized = true;
  }
}

function com_google_gwt_user_client_impl_DOMImpl_getEventListener__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2(elem){
  var maybeListener = elem.__listener;
  return !com_google_gwt_lang_Cast_instanceOfJso__Ljava_lang_Object_2Z(maybeListener) && com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(maybeListener, 13)?maybeListener:null;
}

function com_google_gwt_user_client_impl_DOMImpl_setEventListener__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2V(elem, listener){
  elem.__listener = listener;
}

var com_google_gwt_user_client_impl_DOMImpl_eventSystemIsInitialized = false;
function com_google_gwt_user_client_impl_DOMImplStandard_$clinit__V(){
  com_google_gwt_user_client_impl_DOMImplStandard_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_impl_DOMImplStandard_bitlessEventDispatchers = {_default_:com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent__Lcom_google_gwt_user_client_Event_2V, dragenter:com_google_gwt_user_client_impl_DOMImplStandard_dispatchDragEvent__Lcom_google_gwt_user_client_Event_2V, dragover:com_google_gwt_user_client_impl_DOMImplStandard_dispatchDragEvent__Lcom_google_gwt_user_client_Event_2V};
  com_google_gwt_user_client_impl_DOMImplStandard_captureEventDispatchers = {click:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, dblclick:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, mousedown:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, mouseup:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, mousemove:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, mouseover:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, mouseout:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, mousewheel:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, keydown:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedEvent__Lcom_google_gwt_user_client_Event_2V, keyup:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedEvent__Lcom_google_gwt_user_client_Event_2V, keypress:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedEvent__Lcom_google_gwt_user_client_Event_2V, touchstart:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, touchend:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, touchmove:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, touchcancel:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, gesturestart:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, gestureend:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V, gesturechange:com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V};
}

function com_google_gwt_user_client_impl_DOMImplStandard_$getChild__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2ILcom_google_gwt_dom_client_Element_2(elem, index_0){
  var count = 0, child = elem.firstChild;
  while (child) {
    if (child.nodeType == 1) {
      if (index_0 == count)
        return child;
      ++count;
    }
    child = child.nextSibling;
  }
  return null;
}

function com_google_gwt_user_client_impl_DOMImplStandard_$getChildCount__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2I(elem){
  var count = 0, child = elem.firstChild;
  while (child) {
    child.nodeType == 1 && ++count;
    child = child.nextSibling;
  }
  return count;
}

function com_google_gwt_user_client_impl_DOMImplStandard_$initEventSystem__Lcom_google_gwt_user_client_impl_DOMImplStandard_2V(){
  com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent = $entry(com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent__Lcom_google_gwt_user_client_Event_2V);
  com_google_gwt_user_client_impl_DOMImplStandard_dispatchUnhandledEvent = $entry(com_google_gwt_user_client_impl_DOMImplStandard_dispatchUnhandledEvent__Lcom_google_gwt_user_client_Event_2V);
  var foreach = com_google_gwt_user_client_impl_EventMap_foreach__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2V;
  var bitlessEvents = com_google_gwt_user_client_impl_DOMImplStandard_bitlessEventDispatchers;
  foreach(bitlessEvents, function(e, fn){
    bitlessEvents[e] = $entry(fn);
  }
  );
  var captureEvents = com_google_gwt_user_client_impl_DOMImplStandard_captureEventDispatchers;
  foreach(captureEvents, function(e, fn){
    captureEvents[e] = $entry(fn);
  }
  );
  foreach(captureEvents, function(e, fn){
    $wnd.addEventListener(e, fn, true);
  }
  );
}

function com_google_gwt_user_client_impl_DOMImplStandard_$insertChild__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(parent_0, toAdd, index_0){
  var count = 0, child = parent_0.firstChild, before = null;
  while (child) {
    if (child.nodeType == 1) {
      if (count == index_0) {
        before = child;
        break;
      }
      ++count;
    }
    child = child.nextSibling;
  }
  parent_0.insertBefore(toAdd, before);
}

function com_google_gwt_user_client_impl_DOMImplStandard_$sinkBitlessEvent__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(elem, eventTypeName){
  var com_google_gwt_user_client_impl_DOMImplStandard_$sinkBitlessEventImpl__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V_dispatchMap_0, com_google_gwt_user_client_impl_DOMImplStandard_$sinkBitlessEventImpl__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V_dispatcher_0;
  com_google_gwt_user_client_impl_DOMImpl_$maybeInitializeEventSystem__Lcom_google_gwt_user_client_impl_DOMImpl_2V();
  com_google_gwt_user_client_impl_DOMImplStandard_$sinkBitlessEventImpl__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V_dispatchMap_0 = com_google_gwt_user_client_impl_DOMImplStandard_bitlessEventDispatchers;
  com_google_gwt_user_client_impl_DOMImplStandard_$sinkBitlessEventImpl__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V_dispatcher_0 = com_google_gwt_user_client_impl_DOMImplStandard_$sinkBitlessEventImpl__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V_dispatchMap_0[eventTypeName] || com_google_gwt_user_client_impl_DOMImplStandard_$sinkBitlessEventImpl__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V_dispatchMap_0['_default_'];
  elem.addEventListener(eventTypeName, com_google_gwt_user_client_impl_DOMImplStandard_$sinkBitlessEventImpl__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V_dispatcher_0, false);
}

function com_google_gwt_user_client_impl_DOMImplStandard_$sinkEventsImpl__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2IV(elem, bits){
  var chMask = (elem.__eventBits || 0) ^ bits;
  elem.__eventBits = bits;
  if (!chMask)
    return;
  chMask & 1 && (elem.onclick = bits & 1?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 2 && (elem.ondblclick = bits & 2?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 4 && (elem.onmousedown = bits & 4?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 8 && (elem.onmouseup = bits & 8?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 16 && (elem.onmouseover = bits & 16?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 32 && (elem.onmouseout = bits & 32?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 64 && (elem.onmousemove = bits & 64?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 128 && (elem.onkeydown = bits & 128?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 256 && (elem.onkeypress = bits & 256?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 512 && (elem.onkeyup = bits & 512?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 1024 && (elem.onchange = bits & 1024?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 2048 && (elem.onfocus = bits & 2048?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 4096 && (elem.onblur = bits & 4096?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 8192 && (elem.onlosecapture = bits & 8192?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 16384 && (elem.onscroll = bits & 16384?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 32768 && (elem.onload = bits & 32768?com_google_gwt_user_client_impl_DOMImplStandard_dispatchUnhandledEvent:null);
  chMask & $intern_33 && (elem.onerror = bits & $intern_33?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & $intern_35 && (elem.onmousewheel = bits & $intern_35?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 262144 && (elem.oncontextmenu = bits & 262144?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & $intern_29 && (elem.onpaste = bits & $intern_29?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 1048576 && (elem.ontouchstart = bits & 1048576?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 2097152 && (elem.ontouchmove = bits & 2097152?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & $intern_28 && (elem.ontouchend = bits & $intern_28?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & 8388608 && (elem.ontouchcancel = bits & 8388608?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & $intern_36 && (elem.ongesturestart = bits & $intern_36?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & $intern_37 && (elem.ongesturechange = bits & $intern_37?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
  chMask & $intern_38 && (elem.ongestureend = bits & $intern_38?com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent:null);
}

function com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedEvent__Lcom_google_gwt_user_client_Event_2V(evt){
  com_google_gwt_user_client_DOM_$clinit__V();
}

function com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V(evt){
  com_google_gwt_user_client_impl_DOMImplStandard_$clinit__V();
  com_google_gwt_user_client_DOM_$clinit__V();
  return;
}

function com_google_gwt_user_client_impl_DOMImplStandard_dispatchDragEvent__Lcom_google_gwt_user_client_Event_2V(evt){
  com_google_gwt_dom_client_DOMImplStandard_$eventPreventDefault__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_NativeEvent_2V(evt);
  com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent__Lcom_google_gwt_user_client_Event_2V(evt);
}

function com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent__Lcom_google_gwt_user_client_Event_2V(evt){
  var element;
  element = com_google_gwt_user_client_impl_DOMImplStandard_getFirstAncestorWithListener__Lcom_google_gwt_user_client_Event_2Lcom_google_gwt_dom_client_Element_2(evt);
  if (!element) {
    return;
  }
  com_google_gwt_user_client_DOM_dispatchEvent__Lcom_google_gwt_user_client_Event_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2V(evt, element.nodeType != 1?null:element, com_google_gwt_user_client_impl_DOMImpl_getEventListener__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2(element));
}

function com_google_gwt_user_client_impl_DOMImplStandard_dispatchUnhandledEvent__Lcom_google_gwt_user_client_Event_2V(evt){
  var element;
  element = evt.currentTarget;
  com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(element, $intern_39, evt.type);
  com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent__Lcom_google_gwt_user_client_Event_2V(evt);
}

function com_google_gwt_user_client_impl_DOMImplStandard_getFirstAncestorWithListener__Lcom_google_gwt_user_client_Event_2Lcom_google_gwt_dom_client_Element_2(evt){
  var curElem;
  curElem = evt.currentTarget;
  while (!!curElem && !com_google_gwt_user_client_impl_DOMImpl_getEventListener__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2(curElem)) {
    curElem = curElem.parentNode;
  }
  return curElem;
}

var com_google_gwt_user_client_impl_DOMImplStandard_bitlessEventDispatchers, com_google_gwt_user_client_impl_DOMImplStandard_captureElem, com_google_gwt_user_client_impl_DOMImplStandard_captureEventDispatchers, com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent, com_google_gwt_user_client_impl_DOMImplStandard_dispatchUnhandledEvent;
function com_google_gwt_user_client_impl_DOMImplMozilla_$clinit__V(){
  com_google_gwt_user_client_impl_DOMImplMozilla_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_impl_DOMImplStandard_$clinit__V();
  com_google_gwt_user_client_impl_DOMImplStandard_captureEventDispatchers[$intern_34] = com_google_gwt_user_client_impl_DOMImplStandard_dispatchCapturedMouseEvent__Lcom_google_gwt_user_client_Event_2V;
}

function com_google_gwt_user_client_impl_DOMImplMozilla_$initSyntheticMouseUpEvents__Lcom_google_gwt_user_client_impl_DOMImplMozilla_2V(){
  $wnd.addEventListener('mouseout', $entry(function(evt){
    var cap = (com_google_gwt_user_client_impl_DOMImplStandard_$clinit__V() , com_google_gwt_user_client_impl_DOMImplStandard_captureElem);
    if (cap && !evt.relatedTarget) {
      if ('html' == evt.target.tagName.toLowerCase()) {
        var muEvent = $doc.createEvent('MouseEvents');
        muEvent.initMouseEvent('mouseup', true, true, $wnd, 0, evt.screenX, evt.screenY, evt.clientX, evt.clientY, evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, evt.button, null);
        cap.dispatchEvent(muEvent);
      }
    }
  }
  ), true);
}

function com_google_gwt_user_client_impl_DOMImplMozilla_$sinkEvents__Lcom_google_gwt_user_client_impl_DOMImplMozilla_2Lcom_google_gwt_dom_client_Element_2IV(elem, bits){
  com_google_gwt_user_client_impl_DOMImpl_$maybeInitializeEventSystem__Lcom_google_gwt_user_client_impl_DOMImpl_2V();
  com_google_gwt_user_client_impl_DOMImplStandard_$sinkEventsImpl__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2IV(elem, bits);
  bits & $intern_35 && elem.addEventListener($intern_34, (com_google_gwt_user_client_impl_DOMImplStandard_$clinit__V() , com_google_gwt_user_client_impl_DOMImplStandard_dispatchEvent), false);
}

function com_google_gwt_user_client_impl_EventMap_foreach__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2V(map_0, fn){
  for (var e in map_0) {
    map_0.hasOwnProperty(e) && fn(e, map_0[e]);
  }
}

function com_google_gwt_user_client_impl_WindowImpl_$initWindowCloseHandler__Lcom_google_gwt_user_client_impl_WindowImpl_2V(){
  var oldOnBeforeUnload = $wnd.onbeforeunload;
  var oldOnUnload = $wnd.onunload;
  $wnd.onbeforeunload = function(evt){
    var ret, oldRet;
    try {
      ret = $entry(com_google_gwt_user_client_Window_onClosing__Ljava_lang_String_2)();
    }
     finally {
      oldRet = oldOnBeforeUnload && oldOnBeforeUnload(evt);
    }
    if (ret != null) {
      return ret;
    }
    if (oldRet != null) {
      return oldRet;
    }
  }
  ;
  $wnd.onunload = $entry(function(evt){
    try {
      com_google_gwt_user_client_Window_closeHandlersInitialized && com_google_gwt_event_logical_shared_CloseEvent_fire__Lcom_google_gwt_event_logical_shared_HasCloseHandlers_2Ljava_lang_Object_2ZV((!com_google_gwt_user_client_Window_handlers && (com_google_gwt_user_client_Window_handlers = new com_google_gwt_user_client_Window$WindowHandlers_Window$WindowHandlers__V) , com_google_gwt_user_client_Window_handlers));
    }
     finally {
      oldOnUnload && oldOnUnload(evt);
      $wnd.onresize = null;
      $wnd.onscroll = null;
      $wnd.onbeforeunload = null;
      $wnd.onunload = null;
    }
  }
  );
}

function com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this$static, style){
  com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), style, true);
}

function com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this$static){
  return com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element;
}

function com_google_gwt_user_client_ui_UIObject_$getTitle__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2(this$static){
  return com_google_gwt_dom_client_Element_$getPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), 'title');
}

function com_google_gwt_user_client_ui_UIObject_$removeStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this$static, style){
  com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), style, false);
}

function com_google_gwt_user_client_ui_UIObject_$replaceNode__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2V(node, newNode){
  var p = node.parentNode;
  if (!p) {
    return;
  }
  p.insertBefore(newNode, node);
  p.removeChild(node);
}

function com_google_gwt_user_client_ui_UIObject_$resolvePotentialElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2(){
  throw new java_lang_UnsupportedOperationException_UnsupportedOperationException__V;
}

function com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2V(this$static, elem){
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2V(this$static, (com_google_gwt_user_client_DOM_$clinit__V() , elem));
}

function com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2V(this$static, elem){
  this$static.com_google_gwt_user_client_ui_UIObject_element = elem;
}

function com_google_gwt_user_client_ui_UIObject_$setStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2ZV(this$static, style, add_0){
  com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), style, add_0);
}

function com_google_gwt_user_client_ui_UIObject_$setVisible__Lcom_google_gwt_user_client_ui_UIObject_2ZV(this$static, visible){
  com_google_gwt_user_client_ui_UIObject_setVisible__Lcom_google_gwt_dom_client_Element_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), visible);
}

function com_google_gwt_user_client_ui_UIObject_$sinkBitlessEvent__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this$static, eventTypeName){
  com_google_gwt_user_client_DOM_$clinit__V();
  com_google_gwt_user_client_impl_DOMImplStandard_$sinkBitlessEvent__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this$static.com_google_gwt_user_client_ui_UIObject_element, eventTypeName);
}

function com_google_gwt_user_client_ui_UIObject_getStylePrimaryName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(elem){
  var fullClassName, spaceIdx;
  fullClassName = com_google_gwt_dom_client_Element_$getClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(elem);
  spaceIdx = java_lang_String_$indexOf__Ljava_lang_String_2Ljava_lang_String_2I(fullClassName, java_lang_String_fromCodePoint__ILjava_lang_String_2(32));
  if (spaceIdx >= 0) {
    return fullClassName.substr(0, spaceIdx);
  }
  return fullClassName;
}

function com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV(elem, style, add_0){
  if (!elem) {
    throw new java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V('Null widget handle. If you are creating a composite, ensure that initWidget() has been called.');
  }
  style = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(style);
  if (style.length == 0) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V('Style names cannot be empty');
  }
  add_0?com_google_gwt_dom_client_Element_$addClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Z(elem, style):com_google_gwt_dom_client_Element_$removeClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Z(elem, style);
}

function com_google_gwt_user_client_ui_UIObject_setVisible__Lcom_google_gwt_dom_client_Element_2ZV(elem, visible){
  elem.style.display = visible?'':'none';
  visible?elem.removeAttribute($intern_40):elem.setAttribute($intern_40, 'true');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(10, 1, {12:1, 10:1});
_.resolvePotentialElement__Lcom_google_gwt_dom_client_Element_2 = function com_google_gwt_user_client_ui_UIObject_resolvePotentialElement__Lcom_google_gwt_dom_client_Element_2(){
  return com_google_gwt_user_client_ui_UIObject_$resolvePotentialElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2();
}
;
_.toString__Ljava_lang_String_2$ = function com_google_gwt_user_client_ui_UIObject_toString__Ljava_lang_String_2(){
  if (!this.com_google_gwt_user_client_ui_UIObject_element) {
    return '(null handle)';
  }
  return com_google_gwt_dom_client_DOMImplMozilla_$toString__Lcom_google_gwt_dom_client_DOMImplMozilla_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element));
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1UIObject_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'UIObject', 10);
function com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this$static, handler, type_0){
  var typeInt;
  typeInt = com_google_gwt_user_client_Event_getTypeInt__Ljava_lang_String_2I(type_0.com_google_gwt_event_dom_client_DomEvent$Type_name);
  typeInt == -1?com_google_gwt_user_client_ui_UIObject_$sinkBitlessEvent__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this$static, type_0.com_google_gwt_event_dom_client_DomEvent$Type_name):this$static.com_google_gwt_user_client_ui_Widget_eventsToSink == -1?(com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_user_client_impl_DOMImplMozilla_$sinkEvents__Lcom_google_gwt_user_client_impl_DOMImplMozilla_2Lcom_google_gwt_dom_client_Element_2IV(this$static.com_google_gwt_user_client_ui_UIObject_element, typeInt | (this$static.com_google_gwt_user_client_ui_UIObject_element.__eventBits || 0))):(this$static.com_google_gwt_user_client_ui_Widget_eventsToSink |= typeInt);
  return com_google_gwt_event_shared_HandlerManager_$addHandler__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(!this$static.com_google_gwt_user_client_ui_Widget_handlerManager?(this$static.com_google_gwt_user_client_ui_Widget_handlerManager = new com_google_gwt_event_shared_HandlerManager_HandlerManager__Ljava_lang_Object_2V(this$static)):this$static.com_google_gwt_user_client_ui_Widget_handlerManager, type_0, handler);
}

function com_google_gwt_user_client_ui_Widget_$addHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this$static, handler, type_0){
  return com_google_gwt_event_shared_HandlerManager_$addHandler__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(!this$static.com_google_gwt_user_client_ui_Widget_handlerManager?(this$static.com_google_gwt_user_client_ui_Widget_handlerManager = new com_google_gwt_event_shared_HandlerManager_HandlerManager__Ljava_lang_Object_2V(this$static)):this$static.com_google_gwt_user_client_ui_Widget_handlerManager, type_0, handler);
}

function com_google_gwt_user_client_ui_Widget_$fireEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_GwtEvent_2V(this$static, event_0){
  !!this$static.com_google_gwt_user_client_ui_Widget_handlerManager && com_google_gwt_event_shared_HandlerManager_$fireEvent__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent_2V(this$static.com_google_gwt_user_client_ui_Widget_handlerManager, event_0);
}

function com_google_gwt_user_client_ui_Widget_$onAttach__Lcom_google_gwt_user_client_ui_Widget_2V(this$static){
  var bitsToAdd;
  if (this$static.isAttached__Z()) {
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V("Should only call onAttach when the widget is detached from the browser's document");
  }
  this$static.com_google_gwt_user_client_ui_Widget_attached = true;
  com_google_gwt_user_client_DOM_$clinit__V();
  com_google_gwt_user_client_impl_DOMImpl_setEventListener__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2V(this$static.com_google_gwt_user_client_ui_UIObject_element, this$static);
  bitsToAdd = this$static.com_google_gwt_user_client_ui_Widget_eventsToSink;
  this$static.com_google_gwt_user_client_ui_Widget_eventsToSink = -1;
  bitsToAdd > 0 && (this$static.com_google_gwt_user_client_ui_Widget_eventsToSink == -1?com_google_gwt_user_client_impl_DOMImplMozilla_$sinkEvents__Lcom_google_gwt_user_client_impl_DOMImplMozilla_2Lcom_google_gwt_dom_client_Element_2IV(this$static.com_google_gwt_user_client_ui_UIObject_element, bitsToAdd | (this$static.com_google_gwt_user_client_ui_UIObject_element.__eventBits || 0)):(this$static.com_google_gwt_user_client_ui_Widget_eventsToSink |= bitsToAdd));
  this$static.doAttachChildren__V();
  this$static.onLoad__V();
}

function com_google_gwt_user_client_ui_Widget_$onBrowserEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Event_2V(this$static, event_0){
  var related;
  switch (com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_user_client_impl_DOMImpl_$eventGetTypeInt__Lcom_google_gwt_user_client_impl_DOMImpl_2Ljava_lang_String_2I(event_0.type)) {
    case 16:
    case 32:
      related = com_google_gwt_dom_client_DOMImplMozilla_$eventGetRelatedTarget__Lcom_google_gwt_dom_client_DOMImplMozilla_2Lcom_google_gwt_dom_client_NativeEvent_2Lcom_google_gwt_dom_client_EventTarget_2(event_0);
      if (!!related && com_google_gwt_dom_client_DOMImplMozilla_$isOrHasChild__Lcom_google_gwt_dom_client_DOMImplMozilla_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Z(this$static.com_google_gwt_user_client_ui_UIObject_element, related)) {
        return;
      }

  }
  com_google_gwt_event_dom_client_DomEvent_fireNativeEvent__Lcom_google_gwt_dom_client_NativeEvent_2Lcom_google_gwt_event_shared_HasHandlers_2Lcom_google_gwt_dom_client_Element_2V(event_0, this$static, this$static.com_google_gwt_user_client_ui_UIObject_element);
}

function com_google_gwt_user_client_ui_Widget_$onDetach__Lcom_google_gwt_user_client_ui_Widget_2V(this$static){
  if (!this$static.isAttached__Z()) {
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V("Should only call onDetach when the widget is attached to the browser's document");
  }
  try {
    this$static.doDetachChildren__V();
  }
   finally {
    com_google_gwt_user_client_DOM_$clinit__V();
    com_google_gwt_user_client_impl_DOMImpl_setEventListener__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2V(this$static.com_google_gwt_user_client_ui_UIObject_element, null);
    this$static.com_google_gwt_user_client_ui_Widget_attached = false;
  }
}

function com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(this$static){
  if (!this$static.com_google_gwt_user_client_ui_Widget_parent) {
    com_google_gwt_user_client_ui_RootPanel_$clinit__V();
    java_util_HashSet_$contains__Ljava_util_HashSet_2Ljava_lang_Object_2Z(com_google_gwt_user_client_ui_RootPanel_widgetsToDetach, this$static) && com_google_gwt_user_client_ui_RootPanel_detachNow__Lcom_google_gwt_user_client_ui_Widget_2V(this$static);
  }
   else if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(this$static.com_google_gwt_user_client_ui_Widget_parent, 30)) {
    com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this$static.com_google_gwt_user_client_ui_Widget_parent, 30).remove__Lcom_google_gwt_user_client_ui_Widget_2Z(this$static);
  }
   else if (this$static.com_google_gwt_user_client_ui_Widget_parent) {
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V("This widget's parent does not implement HasWidgets");
  }
}

function com_google_gwt_user_client_ui_Widget_$replaceElement__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_dom_client_Element_2V(this$static, elem){
  this$static.com_google_gwt_user_client_ui_Widget_attached && (com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_user_client_impl_DOMImpl_setEventListener__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2V(this$static.com_google_gwt_user_client_ui_UIObject_element, null));
  !!this$static.com_google_gwt_user_client_ui_UIObject_element && com_google_gwt_user_client_ui_UIObject_$replaceNode__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2V(this$static.com_google_gwt_user_client_ui_UIObject_element, elem);
  this$static.com_google_gwt_user_client_ui_UIObject_element = elem;
  this$static.com_google_gwt_user_client_ui_Widget_attached && (com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_user_client_impl_DOMImpl_setEventListener__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2V(this$static.com_google_gwt_user_client_ui_UIObject_element, this$static));
}

function com_google_gwt_user_client_ui_Widget_$setParent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, parent_0){
  var oldParent;
  oldParent = this$static.com_google_gwt_user_client_ui_Widget_parent;
  if (!parent_0) {
    try {
      !!oldParent && oldParent.isAttached__Z() && this$static.onDetach__V();
    }
     finally {
      this$static.com_google_gwt_user_client_ui_Widget_parent = null;
    }
  }
   else {
    if (oldParent) {
      throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V('Cannot set a new parent without first clearing the old parent');
    }
    this$static.com_google_gwt_user_client_ui_Widget_parent = parent_0;
    parent_0.isAttached__Z() && this$static.onAttach__V();
  }
}

function com_google_gwt_user_client_ui_Widget_$sinkEvents__Lcom_google_gwt_user_client_ui_Widget_2IV(this$static, eventBitsToAdd){
  this$static.com_google_gwt_user_client_ui_Widget_eventsToSink == -1?(com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_user_client_impl_DOMImplMozilla_$sinkEvents__Lcom_google_gwt_user_client_impl_DOMImplMozilla_2Lcom_google_gwt_dom_client_Element_2IV(this$static.com_google_gwt_user_client_ui_UIObject_element, eventBitsToAdd | (this$static.com_google_gwt_user_client_ui_UIObject_element.__eventBits || 0))):(this$static.com_google_gwt_user_client_ui_Widget_eventsToSink |= eventBitsToAdd);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(8, 10, $intern_42);
_.doAttachChildren__V = function com_google_gwt_user_client_ui_Widget_doAttachChildren__V(){
}
;
_.doDetachChildren__V = function com_google_gwt_user_client_ui_Widget_doDetachChildren__V(){
}
;
_.fireEvent__Lcom_google_gwt_event_shared_GwtEvent_2V = function com_google_gwt_user_client_ui_Widget_fireEvent__Lcom_google_gwt_event_shared_GwtEvent_2V(event_0){
  com_google_gwt_user_client_ui_Widget_$fireEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_GwtEvent_2V(this, event_0);
}
;
_.isAttached__Z = function com_google_gwt_user_client_ui_Widget_isAttached__Z(){
  return this.com_google_gwt_user_client_ui_Widget_attached;
}
;
_.onAttach__V = function com_google_gwt_user_client_ui_Widget_onAttach__V(){
  com_google_gwt_user_client_ui_Widget_$onAttach__Lcom_google_gwt_user_client_ui_Widget_2V(this);
}
;
_.onBrowserEvent__Lcom_google_gwt_user_client_Event_2V = function com_google_gwt_user_client_ui_Widget_onBrowserEvent__Lcom_google_gwt_user_client_Event_2V(event_0){
  com_google_gwt_user_client_ui_Widget_$onBrowserEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Event_2V(this, event_0);
}
;
_.onDetach__V = function com_google_gwt_user_client_ui_Widget_onDetach__V(){
  com_google_gwt_user_client_ui_Widget_$onDetach__Lcom_google_gwt_user_client_ui_Widget_2V(this);
}
;
_.onLoad__V = function com_google_gwt_user_client_ui_Widget_onLoad__V(){
}
;
_.com_google_gwt_user_client_ui_Widget_attached = false;
_.com_google_gwt_user_client_ui_Widget_eventsToSink = 0;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Widget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'Widget', 8);
function com_google_gwt_user_client_ui_Panel_$clear__Lcom_google_gwt_user_client_ui_Panel_2V(this$static){
  var it;
  it = new com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_WidgetCollection$WidgetIterator__Lcom_google_gwt_user_client_ui_WidgetCollection_2V(this$static.com_google_gwt_user_client_ui_ComplexPanel_children);
  while (it.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_index < it.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_this$01.com_google_gwt_user_client_ui_WidgetCollection_size) {
    com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_$next__Lcom_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_2Lcom_google_gwt_user_client_ui_Widget_2(it);
    com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_$remove__Lcom_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_2V(it);
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(307, 8, $intern_43);
_.add__Lcom_google_gwt_user_client_ui_Widget_2V = function com_google_gwt_user_client_ui_Panel_add__Lcom_google_gwt_user_client_ui_Widget_2V(child){
  throw new java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V('This panel does not support no-arg add()');
}
;
_.doAttachChildren__V = function com_google_gwt_user_client_ui_Panel_doAttachChildren__V(){
  com_google_gwt_user_client_ui_AttachDetachException_tryCommand__Ljava_lang_Iterable_2Lcom_google_gwt_user_client_ui_AttachDetachException$Command_2V(this, (com_google_gwt_user_client_ui_AttachDetachException_$clinit__V() , com_google_gwt_user_client_ui_AttachDetachException_attachCommand));
}
;
_.doDetachChildren__V = function com_google_gwt_user_client_ui_Panel_doDetachChildren__V(){
  com_google_gwt_user_client_ui_AttachDetachException_tryCommand__Ljava_lang_Iterable_2Lcom_google_gwt_user_client_ui_AttachDetachException$Command_2V(this, (com_google_gwt_user_client_ui_AttachDetachException_$clinit__V() , com_google_gwt_user_client_ui_AttachDetachException_detachCommand));
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Panel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'Panel', 307);
function com_google_gwt_user_client_ui_ComplexPanel_$add__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2V(this$static, child, container){
  com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(child);
  com_google_gwt_user_client_ui_WidgetCollection_$add__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_google_gwt_user_client_ui_ComplexPanel_children, child);
  com_google_gwt_user_client_DOM_$clinit__V();
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(container, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(child.com_google_gwt_user_client_ui_UIObject_element));
  com_google_gwt_user_client_ui_Widget_$setParent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_Widget_2V(child, this$static);
}

function com_google_gwt_user_client_ui_ComplexPanel_$adjustIndex__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2II(this$static, child, beforeIndex){
  var idx;
  com_google_gwt_user_client_ui_ComplexPanel_$checkIndexBoundsForInsertion__Lcom_google_gwt_user_client_ui_ComplexPanel_2IV(this$static, beforeIndex);
  if (child.com_google_gwt_user_client_ui_Widget_parent == this$static) {
    idx = com_google_gwt_user_client_ui_WidgetCollection_$indexOf__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2I(this$static.com_google_gwt_user_client_ui_ComplexPanel_children, child);
    idx < beforeIndex && --beforeIndex;
  }
  return beforeIndex;
}

function com_google_gwt_user_client_ui_ComplexPanel_$checkIndexBoundsForInsertion__Lcom_google_gwt_user_client_ui_ComplexPanel_2IV(this$static, index_0){
  if (index_0 < 0 || index_0 > this$static.com_google_gwt_user_client_ui_ComplexPanel_children.com_google_gwt_user_client_ui_WidgetCollection_size) {
    throw new java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V;
  }
}

function com_google_gwt_user_client_ui_ComplexPanel_$insert__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2IZV(this$static, child, container, beforeIndex, domInsert){
  beforeIndex = com_google_gwt_user_client_ui_ComplexPanel_$adjustIndex__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2II(this$static, child, beforeIndex);
  com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(child);
  com_google_gwt_user_client_ui_WidgetCollection_$insert__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2IV(this$static.com_google_gwt_user_client_ui_ComplexPanel_children, child, beforeIndex);
  domInsert?com_google_gwt_user_client_DOM_insertChild__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(container, (com_google_gwt_user_client_DOM_$clinit__V() , child.com_google_gwt_user_client_ui_UIObject_element), beforeIndex):(com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(container, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(child.com_google_gwt_user_client_ui_UIObject_element)));
  com_google_gwt_user_client_ui_Widget_$setParent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_Widget_2V(child, this$static);
}

function com_google_gwt_user_client_ui_ComplexPanel_$remove__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this$static, w){
  var elem;
  if (w.com_google_gwt_user_client_ui_Widget_parent != this$static) {
    return false;
  }
  try {
    com_google_gwt_user_client_ui_Widget_$setParent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_Widget_2V(w, null);
  }
   finally {
    elem = (com_google_gwt_user_client_DOM_$clinit__V() , w.com_google_gwt_user_client_ui_UIObject_element);
    com_google_gwt_dom_client_Node_$removeChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2((null , com_google_gwt_dom_client_DOMImpl_$getParentElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Element_2(elem)), elem);
    com_google_gwt_user_client_ui_WidgetCollection_$remove__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_google_gwt_user_client_ui_ComplexPanel_children, w);
  }
  return true;
}

function com_google_gwt_user_client_ui_ComplexPanel_ComplexPanel__V(){
  this.com_google_gwt_user_client_ui_ComplexPanel_children = new com_google_gwt_user_client_ui_WidgetCollection_WidgetCollection__Lcom_google_gwt_user_client_ui_HasWidgets_2V(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(96, 307, $intern_43);
_.getWidgetIndex__Lcom_google_gwt_user_client_ui_Widget_2I = function com_google_gwt_user_client_ui_ComplexPanel_getWidgetIndex__Lcom_google_gwt_user_client_ui_Widget_2I(child){
  return com_google_gwt_user_client_ui_WidgetCollection_$indexOf__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2I(this.com_google_gwt_user_client_ui_ComplexPanel_children, child);
}
;
_.iterator__Ljava_util_Iterator_2 = function com_google_gwt_user_client_ui_ComplexPanel_iterator__Ljava_util_Iterator_2(){
  return new com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_WidgetCollection$WidgetIterator__Lcom_google_gwt_user_client_ui_WidgetCollection_2V(this.com_google_gwt_user_client_ui_ComplexPanel_children);
}
;
_.remove__Lcom_google_gwt_user_client_ui_Widget_2Z = function com_google_gwt_user_client_ui_ComplexPanel_remove__Lcom_google_gwt_user_client_ui_Widget_2Z(w){
  return com_google_gwt_user_client_ui_ComplexPanel_$remove__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this, w);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ComplexPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'ComplexPanel', 96);
function com_google_gwt_user_client_ui_AbsolutePanel_$add__Lcom_google_gwt_user_client_ui_AbsolutePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, w){
  com_google_gwt_user_client_ui_ComplexPanel_$add__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2V(this$static, w, (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element));
}

function com_google_gwt_user_client_ui_AbsolutePanel_changeToStaticPositioning__Lcom_google_gwt_dom_client_Element_2V(elem){
  com_google_gwt_dom_client_Style_$setPropertyImpl__Lcom_google_gwt_dom_client_Style_2Ljava_lang_String_2Ljava_lang_String_2V(elem.style, 'left', '');
  com_google_gwt_dom_client_Style_$setPropertyImpl__Lcom_google_gwt_dom_client_Style_2Ljava_lang_String_2Ljava_lang_String_2V(elem.style, 'top', '');
  com_google_gwt_dom_client_Style_$setPropertyImpl__Lcom_google_gwt_dom_client_Style_2Ljava_lang_String_2Ljava_lang_String_2V(elem.style, 'position', '');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(158, 96, $intern_44);
_.add__Lcom_google_gwt_user_client_ui_Widget_2V = function com_google_gwt_user_client_ui_AbsolutePanel_add__Lcom_google_gwt_user_client_ui_Widget_2V(w){
  com_google_gwt_user_client_ui_AbsolutePanel_$add__Lcom_google_gwt_user_client_ui_AbsolutePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this, w);
}
;
_.insert__Lcom_google_gwt_user_client_ui_Widget_2IV = function com_google_gwt_user_client_ui_AbsolutePanel_insert__Lcom_google_gwt_user_client_ui_Widget_2IV(w, beforeIndex){
  com_google_gwt_user_client_ui_ComplexPanel_$insert__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2IZV(this, w, (com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), beforeIndex, true);
}
;
_.remove__Lcom_google_gwt_user_client_ui_Widget_2Z = function com_google_gwt_user_client_ui_AbsolutePanel_remove__Lcom_google_gwt_user_client_ui_Widget_2Z(w){
  var removed;
  removed = com_google_gwt_user_client_ui_ComplexPanel_$remove__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this, w);
  removed && com_google_gwt_user_client_ui_AbsolutePanel_changeToStaticPositioning__Lcom_google_gwt_dom_client_Element_2V((com_google_gwt_user_client_DOM_$clinit__V() , w.com_google_gwt_user_client_ui_UIObject_element));
  return removed;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1AbsolutePanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'AbsolutePanel', 158);
function com_google_gwt_user_client_ui_AttachDetachException_$clinit__V(){
  com_google_gwt_user_client_ui_AttachDetachException_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_ui_AttachDetachException_attachCommand = new com_google_gwt_user_client_ui_AttachDetachException$1_AttachDetachException$1__V;
  com_google_gwt_user_client_ui_AttachDetachException_detachCommand = new com_google_gwt_user_client_ui_AttachDetachException$2_AttachDetachException$2__V;
}

function com_google_gwt_user_client_ui_AttachDetachException_AttachDetachException__Ljava_util_Set_2V(causes){
  com_google_gwt_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V.call(this, causes);
}

function com_google_gwt_user_client_ui_AttachDetachException_tryCommand__Ljava_lang_Iterable_2Lcom_google_gwt_user_client_ui_AttachDetachException$Command_2V(hasWidgets, c){
  com_google_gwt_user_client_ui_AttachDetachException_$clinit__V();
  var caught, e, w, w$iterator;
  caught = null;
  for (w$iterator = hasWidgets.iterator__Ljava_util_Iterator_2(); w$iterator.hasNext__Z();) {
    w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(w$iterator.next__Ljava_lang_Object_2(), 8);
    try {
      c.execute__Lcom_google_gwt_user_client_ui_Widget_2V(w);
    }
     catch ($e0) {
      $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
      if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 5)) {
        e = $e0;
        !caught && (caught = new java_util_HashSet_HashSet__V);
        java_util_HashSet_$add__Ljava_util_HashSet_2Ljava_lang_Object_2Z(caught, e);
      }
       else 
        throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    }
  }
  if (caught) {
    throw new com_google_gwt_user_client_ui_AttachDetachException_AttachDetachException__Ljava_util_Set_2V(caught);
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(162, 118, $intern_21, com_google_gwt_user_client_ui_AttachDetachException_AttachDetachException__Ljava_util_Set_2V);
var com_google_gwt_user_client_ui_AttachDetachException_attachCommand, com_google_gwt_user_client_ui_AttachDetachException_detachCommand;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1AttachDetachException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'AttachDetachException', 162);
function com_google_gwt_user_client_ui_AttachDetachException$1_AttachDetachException$1__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(163, 1, {}, com_google_gwt_user_client_ui_AttachDetachException$1_AttachDetachException$1__V);
_.execute__Lcom_google_gwt_user_client_ui_Widget_2V = function com_google_gwt_user_client_ui_AttachDetachException$1_execute__Lcom_google_gwt_user_client_ui_Widget_2V(w){
  w.onAttach__V();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1AttachDetachException$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'AttachDetachException/1', 163);
function com_google_gwt_user_client_ui_AttachDetachException$2_AttachDetachException$2__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(164, 1, {}, com_google_gwt_user_client_ui_AttachDetachException$2_AttachDetachException$2__V);
_.execute__Lcom_google_gwt_user_client_ui_Widget_2V = function com_google_gwt_user_client_ui_AttachDetachException$2_execute__Lcom_google_gwt_user_client_ui_Widget_2V(w){
  w.onDetach__V();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1AttachDetachException$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'AttachDetachException/2', 164);
function com_google_gwt_user_client_ui_FocusWidget_$setEnabled__Lcom_google_gwt_user_client_ui_FocusWidget_2ZV(this$static, enabled){
  (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element)['disabled'] = !enabled;
}

function com_google_gwt_user_client_ui_FocusWidget_FocusWidget__Lcom_google_gwt_dom_client_Element_2V(elem){
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2V(this, (com_google_gwt_user_client_DOM_$clinit__V() , elem));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(102, 8, $intern_42);
_.onAttach__V = function com_google_gwt_user_client_ui_FocusWidget_onAttach__V(){
  var tabIndex;
  com_google_gwt_user_client_ui_Widget_$onAttach__Lcom_google_gwt_user_client_ui_Widget_2V(this);
  tabIndex = (com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element).tabIndex;
  -1 == tabIndex && (this.com_google_gwt_user_client_ui_UIObject_element.tabIndex = 0 , undefined);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1FocusWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'FocusWidget', 102);
function com_google_gwt_user_client_ui_ButtonBase_ButtonBase__Lcom_google_gwt_dom_client_Element_2V(elem){
  com_google_gwt_user_client_ui_FocusWidget_FocusWidget__Lcom_google_gwt_dom_client_Element_2V.call(this, elem);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(201, 102, $intern_42);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ButtonBase_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'ButtonBase', 201);
function com_google_gwt_user_client_ui_Button_Button__Ljava_lang_String_2V(){
  var com_google_gwt_user_client_ui_Button_Button__V_com_google_gwt_dom_client_DOMImpl_$createButtonElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2Lcom_google_gwt_dom_client_ButtonElement_2_e_0_0;
  com_google_gwt_user_client_ui_ButtonBase_ButtonBase__Lcom_google_gwt_dom_client_Element_2V.call(this, (com_google_gwt_user_client_ui_Button_Button__V_com_google_gwt_dom_client_DOMImpl_$createButtonElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2Lcom_google_gwt_dom_client_ButtonElement_2_e_0_0 = $doc.createElement('BUTTON') , com_google_gwt_user_client_ui_Button_Button__V_com_google_gwt_dom_client_DOMImpl_$createButtonElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2Lcom_google_gwt_dom_client_ButtonElement_2_e_0_0.type = 'button' , com_google_gwt_user_client_ui_Button_Button__V_com_google_gwt_dom_client_DOMImpl_$createButtonElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2Lcom_google_gwt_dom_client_ButtonElement_2_e_0_0));
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), 'gwt-Button');
  com_google_gwt_dom_client_Element_$setInnerHTML__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this.com_google_gwt_user_client_ui_UIObject_element, 'Load');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(126, 201, $intern_42, com_google_gwt_user_client_ui_Button_Button__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Button_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'Button', 126);
function com_google_gwt_user_client_ui_CellPanel_$setCellHorizontalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(td, align_0){
  com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , td), 'align', align_0.com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_textAlignString);
}

function com_google_gwt_user_client_ui_CellPanel_$setCellVerticalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V(td, align_0){
  com_google_gwt_user_client_ui_CellPanel_$setCellVerticalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_user_client_Element_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V((com_google_gwt_user_client_DOM_$clinit__V() , td), align_0);
}

function com_google_gwt_user_client_ui_CellPanel_$setCellVerticalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_user_client_Element_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V(td, align_0){
  com_google_gwt_dom_client_Style_$setPropertyImpl__Lcom_google_gwt_dom_client_Style_2Ljava_lang_String_2Ljava_lang_String_2V(td.style, $intern_45, align_0.com_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_verticalAlignString);
}

function com_google_gwt_user_client_ui_CellPanel_$setSpacing__Lcom_google_gwt_user_client_ui_CellPanel_2IV(this$static, spacing){
  com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV(this$static.com_google_gwt_user_client_ui_CellPanel_table, $intern_46, spacing);
}

function com_google_gwt_user_client_ui_CellPanel_CellPanel__V(){
  com_google_gwt_user_client_ui_ComplexPanel_ComplexPanel__V.call(this);
  this.com_google_gwt_user_client_ui_CellPanel_table = (com_google_gwt_user_client_DOM_$clinit__V() , $doc.createElement('table'));
  this.com_google_gwt_user_client_ui_CellPanel_body = $doc.createElement('tbody');
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(this.com_google_gwt_user_client_ui_CellPanel_table, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(this.com_google_gwt_user_client_ui_CellPanel_body));
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2V(this, this.com_google_gwt_user_client_ui_CellPanel_table);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(99, 96, $intern_43);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1CellPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'CellPanel', 99);
function com_google_gwt_user_client_ui_Composite_$checkInit__Lcom_google_gwt_user_client_ui_Composite_2V(this$static){
  if (!this$static.com_google_gwt_user_client_ui_Composite_widget) {
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V('initWidget() is not called yet');
  }
}

function com_google_gwt_user_client_ui_Composite_$initWidget__Lcom_google_gwt_user_client_ui_Composite_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, widget){
  var elem;
  if (this$static.com_google_gwt_user_client_ui_Composite_widget) {
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V('Composite.initWidget() may only be called once.');
  }
  if (!widget) {
    throw new java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V('widget cannot be null');
  }
  com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(widget);
  elem = (com_google_gwt_user_client_DOM_$clinit__V() , widget.com_google_gwt_user_client_ui_UIObject_element);
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2V(this$static, elem);
  (com_google_gwt_user_client_ui_PotentialElement_$clinit__V() , com_google_gwt_user_client_DOM_isPotential__Lcom_google_gwt_core_client_JavaScriptObject_2Z(elem)) && com_google_gwt_user_client_ui_PotentialElement_$setResolver__Lcom_google_gwt_user_client_ui_PotentialElement_2Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2(elem, this$static);
  this$static.com_google_gwt_user_client_ui_Composite_widget = widget;
  com_google_gwt_user_client_ui_Widget_$setParent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_Widget_2V(widget, this$static);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(314, 8, $intern_42);
_.isAttached__Z = function com_google_gwt_user_client_ui_Composite_isAttached__Z(){
  if (this.com_google_gwt_user_client_ui_Composite_widget) {
    return this.com_google_gwt_user_client_ui_Composite_widget.com_google_gwt_user_client_ui_Widget_attached;
  }
  return false;
}
;
_.onAttach__V = function com_google_gwt_user_client_ui_Composite_onAttach__V(){
  com_google_gwt_user_client_ui_Composite_$checkInit__Lcom_google_gwt_user_client_ui_Composite_2V(this);
  if (this.com_google_gwt_user_client_ui_Widget_eventsToSink != -1) {
    com_google_gwt_user_client_ui_Widget_$sinkEvents__Lcom_google_gwt_user_client_ui_Widget_2IV(this.com_google_gwt_user_client_ui_Composite_widget, this.com_google_gwt_user_client_ui_Widget_eventsToSink);
    this.com_google_gwt_user_client_ui_Widget_eventsToSink = -1;
  }
  com_google_gwt_user_client_ui_Widget_$onAttach__Lcom_google_gwt_user_client_ui_Widget_2V(this.com_google_gwt_user_client_ui_Composite_widget);
  com_google_gwt_user_client_DOM_$clinit__V();
  com_google_gwt_user_client_impl_DOMImpl_setEventListener__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_EventListener_2V(this.com_google_gwt_user_client_ui_UIObject_element, this);
}
;
_.onBrowserEvent__Lcom_google_gwt_user_client_Event_2V = function com_google_gwt_user_client_ui_Composite_onBrowserEvent__Lcom_google_gwt_user_client_Event_2V(event_0){
  com_google_gwt_user_client_ui_Widget_$onBrowserEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Event_2V(this, event_0);
  com_google_gwt_user_client_ui_Widget_$onBrowserEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Event_2V(this.com_google_gwt_user_client_ui_Composite_widget, event_0);
}
;
_.onDetach__V = function com_google_gwt_user_client_ui_Composite_onDetach__V(){
  com_google_gwt_user_client_ui_Widget_$onDetach__Lcom_google_gwt_user_client_ui_Widget_2V(this.com_google_gwt_user_client_ui_Composite_widget);
}
;
_.resolvePotentialElement__Lcom_google_gwt_dom_client_Element_2 = function com_google_gwt_user_client_ui_Composite_resolvePotentialElement__Lcom_google_gwt_dom_client_Element_2(){
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2V(this, com_google_gwt_user_client_ui_UIObject_$resolvePotentialElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2());
  return com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Composite_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'Composite', 314);
function com_google_gwt_user_client_ui_DirectionalTextHelper_$setTextOrHtml__Lcom_google_gwt_user_client_ui_DirectionalTextHelper_2Ljava_lang_String_2ZV(this$static, content, isHtml){
  isHtml?com_google_gwt_dom_client_Element_$setInnerHTML__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this$static.com_google_gwt_user_client_ui_DirectionalTextHelper_element, content):com_google_gwt_dom_client_DOMImplStandard_$setInnerText__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this$static.com_google_gwt_user_client_ui_DirectionalTextHelper_element, content);
  if (this$static.com_google_gwt_user_client_ui_DirectionalTextHelper_textDir != this$static.com_google_gwt_user_client_ui_DirectionalTextHelper_initialElementDir) {
    this$static.com_google_gwt_user_client_ui_DirectionalTextHelper_textDir = this$static.com_google_gwt_user_client_ui_DirectionalTextHelper_initialElementDir;
    com_google_gwt_i18n_client_BidiUtils_setDirectionOnElement__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2V(this$static.com_google_gwt_user_client_ui_DirectionalTextHelper_element, this$static.com_google_gwt_user_client_ui_DirectionalTextHelper_initialElementDir);
  }
}

function com_google_gwt_user_client_ui_DirectionalTextHelper_DirectionalTextHelper__Lcom_google_gwt_dom_client_Element_2ZV(element){
  this.com_google_gwt_user_client_ui_DirectionalTextHelper_element = element;
  this.com_google_gwt_user_client_ui_DirectionalTextHelper_initialElementDir = com_google_gwt_i18n_client_BidiUtils_getDirectionOnElement__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2(element);
  this.com_google_gwt_user_client_ui_DirectionalTextHelper_textDir = this.com_google_gwt_user_client_ui_DirectionalTextHelper_initialElementDir;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(205, 1, {}, com_google_gwt_user_client_ui_DirectionalTextHelper_DirectionalTextHelper__Lcom_google_gwt_dom_client_Element_2ZV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DirectionalTextHelper_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DirectionalTextHelper', 205);
function com_google_gwt_user_client_ui_DisclosurePanel_$remove__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this$static, w){
  if (w == this$static.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper.com_google_gwt_user_client_ui_SimplePanel_widget) {
    com_google_gwt_user_client_ui_DisclosurePanel_$setContent__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, null);
    return true;
  }
  return false;
}

function com_google_gwt_user_client_ui_DisclosurePanel_$setContent__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, content){
  var currentContent;
  currentContent = this$static.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper.com_google_gwt_user_client_ui_SimplePanel_widget;
  if (currentContent) {
    com_google_gwt_user_client_ui_SimplePanel_$setWidget__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper, null);
    com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , currentContent.com_google_gwt_user_client_ui_UIObject_element), 'content', false);
  }
  if (content) {
    com_google_gwt_user_client_ui_SimplePanel_$setWidget__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper, content);
    com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , content.com_google_gwt_user_client_ui_UIObject_element), 'content', true);
    com_google_gwt_user_client_ui_DisclosurePanel_$setContentDisplay__Lcom_google_gwt_user_client_ui_DisclosurePanel_2ZV(this$static, false);
  }
}

function com_google_gwt_user_client_ui_DisclosurePanel_$setContentDisplay__Lcom_google_gwt_user_client_ui_DisclosurePanel_2ZV(this$static, animate){
  if (this$static.com_google_gwt_user_client_ui_DisclosurePanel_isOpen) {
    com_google_gwt_user_client_ui_UIObject_$setStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2ZV(this$static, com_google_gwt_user_client_ui_UIObject_getStylePrimaryName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element)) + '-' + 'closed', false);
    com_google_gwt_user_client_ui_UIObject_$setStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2ZV(this$static, com_google_gwt_user_client_ui_UIObject_getStylePrimaryName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(this$static.com_google_gwt_user_client_ui_UIObject_element) + '-' + 'open', true);
  }
   else {
    com_google_gwt_user_client_ui_UIObject_$setStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2ZV(this$static, com_google_gwt_user_client_ui_UIObject_getStylePrimaryName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element)) + '-' + 'open', false);
    com_google_gwt_user_client_ui_UIObject_$setStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2ZV(this$static, com_google_gwt_user_client_ui_UIObject_getStylePrimaryName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(this$static.com_google_gwt_user_client_ui_UIObject_element) + '-' + 'closed', true);
  }
  if (this$static.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper.com_google_gwt_user_client_ui_SimplePanel_widget) {
    !com_google_gwt_user_client_ui_DisclosurePanel_contentAnimation && (com_google_gwt_user_client_ui_DisclosurePanel_contentAnimation = new com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_DisclosurePanel$ContentAnimation__V);
    com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$setOpen__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2Lcom_google_gwt_user_client_ui_DisclosurePanel_2ZV(com_google_gwt_user_client_ui_DisclosurePanel_contentAnimation, this$static, animate && this$static.com_google_gwt_user_client_ui_DisclosurePanel_isAnimationEnabled);
  }
}

function com_google_gwt_user_client_ui_DisclosurePanel_$setHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, headerWidget){
  com_google_gwt_user_client_ui_SimplePanel_$setWidget__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_google_gwt_user_client_ui_DisclosurePanel_header, headerWidget);
}

function com_google_gwt_user_client_ui_DisclosurePanel_$setOpen__Lcom_google_gwt_user_client_ui_DisclosurePanel_2ZV(this$static, isOpen){
  if (this$static.com_google_gwt_user_client_ui_DisclosurePanel_isOpen != isOpen) {
    this$static.com_google_gwt_user_client_ui_DisclosurePanel_isOpen = isOpen;
    com_google_gwt_user_client_ui_DisclosurePanel_$setContentDisplay__Lcom_google_gwt_user_client_ui_DisclosurePanel_2ZV(this$static, true);
    this$static.com_google_gwt_user_client_ui_DisclosurePanel_isOpen?com_google_gwt_event_logical_shared_OpenEvent_fire__Lcom_google_gwt_event_logical_shared_HasOpenHandlers_2Ljava_lang_Object_2V(this$static):com_google_gwt_event_logical_shared_CloseEvent_fire__Lcom_google_gwt_event_logical_shared_HasCloseHandlers_2Ljava_lang_Object_2ZV(this$static);
  }
}

function com_google_gwt_user_client_ui_DisclosurePanel_DisclosurePanel__Lcom_google_gwt_resources_client_ImageResource_2Lcom_google_gwt_resources_client_ImageResource_2Ljava_lang_String_2V(openImage, closedImage, headerText){
  this.com_google_gwt_user_client_ui_DisclosurePanel_mainPanel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
  this.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper = new com_google_gwt_user_client_ui_SimplePanel_SimplePanel__V;
  this.com_google_gwt_user_client_ui_DisclosurePanel_header = new com_google_gwt_user_client_ui_DisclosurePanel$ClickableHeader_DisclosurePanel$ClickableHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2V(this);
  com_google_gwt_user_client_ui_Composite_$initWidget__Lcom_google_gwt_user_client_ui_Composite_2Lcom_google_gwt_user_client_ui_Widget_2V(this, this.com_google_gwt_user_client_ui_DisclosurePanel_mainPanel);
  com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_google_gwt_user_client_ui_DisclosurePanel_mainPanel, this.com_google_gwt_user_client_ui_DisclosurePanel_header);
  com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_google_gwt_user_client_ui_DisclosurePanel_mainPanel, this.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper);
  com_google_gwt_dom_client_Style_$setPropertyImpl__Lcom_google_gwt_dom_client_Style_2Ljava_lang_String_2Ljava_lang_String_2V(com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper).style, 'padding', '0px');
  com_google_gwt_dom_client_Style_$setPropertyImpl__Lcom_google_gwt_dom_client_Style_2Ljava_lang_String_2Ljava_lang_String_2V(com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper).style, 'overflow', 'hidden');
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), 'gwt-DisclosurePanel');
  com_google_gwt_user_client_ui_DisclosurePanel_$setContentDisplay__Lcom_google_gwt_user_client_ui_DisclosurePanel_2ZV(this, false);
  com_google_gwt_user_client_ui_DisclosurePanel_$setHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this, new com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_DisclosurePanel$DefaultHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_resources_client_ImageResource_2Lcom_google_gwt_resources_client_ImageResource_2Ljava_lang_String_2V(this, openImage, closedImage, headerText));
}

function com_google_gwt_user_client_ui_DisclosurePanel_DisclosurePanel__Ljava_lang_String_2V(headerText){
  com_google_gwt_user_client_ui_DisclosurePanel_DisclosurePanel__Lcom_google_gwt_resources_client_ImageResource_2Lcom_google_gwt_resources_client_ImageResource_2Ljava_lang_String_2V.call(this, (com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator$disclosurePanelOpenInitializer_$clinit__V() , com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator_disclosurePanelOpen), (com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator$disclosurePanelClosedInitializer_$clinit__V() , com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator_disclosurePanelClosed), headerText);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(109, 314, $intern_43, com_google_gwt_user_client_ui_DisclosurePanel_DisclosurePanel__Ljava_lang_String_2V);
_.iterator__Ljava_util_Iterator_2 = function com_google_gwt_user_client_ui_DisclosurePanel_iterator__Ljava_util_Iterator_2(){
  return new com_google_gwt_user_client_ui_WidgetIterators$1_WidgetIterators$1__V(com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Widget_12_1classLit, 1), $intern_14, 8, 0, [this.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper.com_google_gwt_user_client_ui_SimplePanel_widget]));
}
;
_.remove__Lcom_google_gwt_user_client_ui_Widget_2Z = function com_google_gwt_user_client_ui_DisclosurePanel_remove__Lcom_google_gwt_user_client_ui_Widget_2Z(w){
  return com_google_gwt_user_client_ui_DisclosurePanel_$remove__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this, w);
}
;
_.com_google_gwt_user_client_ui_DisclosurePanel_isAnimationEnabled = false;
_.com_google_gwt_user_client_ui_DisclosurePanel_isOpen = false;
var com_google_gwt_user_client_ui_DisclosurePanel_contentAnimation;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DisclosurePanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DisclosurePanel', 109);
function com_google_gwt_user_client_ui_SimplePanel_$add__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, w){
  if (this$static.com_google_gwt_user_client_ui_SimplePanel_widget) {
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V('SimplePanel can only contain one child widget');
  }
  com_google_gwt_user_client_ui_SimplePanel_$setWidget__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, w);
}

function com_google_gwt_user_client_ui_SimplePanel_$remove__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this$static, w){
  if (this$static.com_google_gwt_user_client_ui_SimplePanel_widget != w) {
    return false;
  }
  try {
    com_google_gwt_user_client_ui_Widget_$setParent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_Widget_2V(w, null);
  }
   finally {
    com_google_gwt_dom_client_Node_$removeChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), w.com_google_gwt_user_client_ui_UIObject_element);
    this$static.com_google_gwt_user_client_ui_SimplePanel_widget = null;
  }
  return true;
}

function com_google_gwt_user_client_ui_SimplePanel_$setWidget__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, w){
  if (w == this$static.com_google_gwt_user_client_ui_SimplePanel_widget) {
    return;
  }
  !!w && com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(w);
  !!this$static.com_google_gwt_user_client_ui_SimplePanel_widget && com_google_gwt_user_client_ui_SimplePanel_$remove__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this$static, this$static.com_google_gwt_user_client_ui_SimplePanel_widget);
  this$static.com_google_gwt_user_client_ui_SimplePanel_widget = w;
  if (w) {
    com_google_gwt_user_client_DOM_$clinit__V();
    com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(this$static.com_google_gwt_user_client_ui_UIObject_element, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this$static.com_google_gwt_user_client_ui_SimplePanel_widget)));
    com_google_gwt_user_client_ui_Widget_$setParent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_Widget_2V(w, this$static);
  }
}

function com_google_gwt_user_client_ui_SimplePanel_SimplePanel__V(){
  com_google_gwt_user_client_ui_SimplePanel_SimplePanel__Lcom_google_gwt_dom_client_Element_2V.call(this, (com_google_gwt_user_client_DOM_$clinit__V() , $doc.createElement('div')));
}

function com_google_gwt_user_client_ui_SimplePanel_SimplePanel__Lcom_google_gwt_dom_client_Element_2V(elem){
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2V(this, (com_google_gwt_user_client_DOM_$clinit__V() , elem));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(60, 307, $intern_47, com_google_gwt_user_client_ui_SimplePanel_SimplePanel__V);
_.add__Lcom_google_gwt_user_client_ui_Widget_2V = function com_google_gwt_user_client_ui_SimplePanel_add__Lcom_google_gwt_user_client_ui_Widget_2V(w){
  com_google_gwt_user_client_ui_SimplePanel_$add__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this, w);
}
;
_.iterator__Ljava_util_Iterator_2 = function com_google_gwt_user_client_ui_SimplePanel_iterator__Ljava_util_Iterator_2(){
  return new com_google_gwt_user_client_ui_SimplePanel$1_SimplePanel$1__Lcom_google_gwt_user_client_ui_SimplePanel_2V(this);
}
;
_.remove__Lcom_google_gwt_user_client_ui_Widget_2Z = function com_google_gwt_user_client_ui_SimplePanel_remove__Lcom_google_gwt_user_client_ui_Widget_2Z(w){
  return com_google_gwt_user_client_ui_SimplePanel_$remove__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this, w);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1SimplePanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'SimplePanel', 60);
function com_google_gwt_user_client_ui_DisclosurePanel$ClickableHeader_DisclosurePanel$ClickableHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2V(this$0){
  var elem;
  this.com_google_gwt_user_client_ui_DisclosurePanel$ClickableHeader_this$01 = this$0;
  com_google_gwt_user_client_ui_SimplePanel_SimplePanel__Lcom_google_gwt_dom_client_Element_2V.call(this, (com_google_gwt_user_client_DOM_$clinit__V() , $doc.createElement('a')));
  elem = this.com_google_gwt_user_client_ui_UIObject_element;
  com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(elem, 'href', 'javascript:void(0);');
  com_google_gwt_dom_client_Style_$setPropertyImpl__Lcom_google_gwt_dom_client_Style_2Ljava_lang_String_2Ljava_lang_String_2V(elem.style, 'display', 'block');
  this.com_google_gwt_user_client_ui_Widget_eventsToSink == -1?com_google_gwt_user_client_impl_DOMImplMozilla_$sinkEvents__Lcom_google_gwt_user_client_impl_DOMImplMozilla_2Lcom_google_gwt_dom_client_Element_2IV(this.com_google_gwt_user_client_ui_UIObject_element, 1 | (this.com_google_gwt_user_client_ui_UIObject_element.__eventBits || 0)):(this.com_google_gwt_user_client_ui_Widget_eventsToSink |= 1);
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this.com_google_gwt_user_client_ui_UIObject_element, 'header');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(270, 60, $intern_47, com_google_gwt_user_client_ui_DisclosurePanel$ClickableHeader_DisclosurePanel$ClickableHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2V);
_.onBrowserEvent__Lcom_google_gwt_user_client_Event_2V = function com_google_gwt_user_client_ui_DisclosurePanel$ClickableHeader_onBrowserEvent__Lcom_google_gwt_user_client_Event_2V(event_0){
  switch (com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_user_client_impl_DOMImpl_$eventGetTypeInt__Lcom_google_gwt_user_client_impl_DOMImpl_2Ljava_lang_String_2I(event_0.type)) {
    case 1:
      com_google_gwt_dom_client_DOMImplStandard_$eventPreventDefault__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_NativeEvent_2V(event_0);
      com_google_gwt_user_client_ui_DisclosurePanel_$setOpen__Lcom_google_gwt_user_client_ui_DisclosurePanel_2ZV(this.com_google_gwt_user_client_ui_DisclosurePanel$ClickableHeader_this$01, !this.com_google_gwt_user_client_ui_DisclosurePanel$ClickableHeader_this$01.com_google_gwt_user_client_ui_DisclosurePanel_isOpen);
  }
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DisclosurePanel$ClickableHeader_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DisclosurePanel/ClickableHeader', 270);
function com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$onComplete__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2V(this$static){
  this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_opening || com_google_gwt_user_client_ui_UIObject_$setVisible__Lcom_google_gwt_user_client_ui_UIObject_2ZV(this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_curPanel.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper, false);
  com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_curPanel.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper).style[$intern_48] = 'auto';
  this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_curPanel = null;
}

function com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$onStart__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2V(this$static){
  com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$onUpdate__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2DV(this$static, (1 + Math.cos($intern_5)) / 2);
  if (this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_opening) {
    com_google_gwt_user_client_ui_UIObject_$setVisible__Lcom_google_gwt_user_client_ui_UIObject_2ZV(this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_curPanel.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper, true);
    com_google_gwt_user_client_ui_UIObject_$setVisible__Lcom_google_gwt_user_client_ui_UIObject_2ZV(this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_curPanel.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper.com_google_gwt_user_client_ui_SimplePanel_widget, true);
  }
}

function com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$onUpdate__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2DV(this$static, progress){
  var height, scrollHeight;
  scrollHeight = com_google_gwt_dom_client_Element_$getPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2I(com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_curPanel.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper), 'scrollHeight');
  height = com_google_gwt_lang_Cast_round_1int__DI(progress * scrollHeight);
  this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_opening || (height = scrollHeight - height);
  height = height > 1?height:1;
  com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_curPanel.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper).style[$intern_48] = height + 'px';
  com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_curPanel.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper).style[$intern_49] = 'auto';
}

function com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_$setOpen__Lcom_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_2Lcom_google_gwt_user_client_ui_DisclosurePanel_2ZV(this$static, panel, animate){
  com_google_gwt_animation_client_Animation_$cancel__Lcom_google_gwt_animation_client_Animation_2V(this$static);
  if (animate) {
    this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_curPanel = panel;
    this$static.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_opening = panel.com_google_gwt_user_client_ui_DisclosurePanel_isOpen;
    com_google_gwt_animation_client_Animation_$run__Lcom_google_gwt_animation_client_Animation_2IDLcom_google_gwt_dom_client_Element_2V(this$static, com_google_gwt_core_client_JsDate_now__D());
  }
   else {
    com_google_gwt_user_client_ui_UIObject_$setVisible__Lcom_google_gwt_user_client_ui_UIObject_2ZV(panel.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper, panel.com_google_gwt_user_client_ui_DisclosurePanel_isOpen);
    panel.com_google_gwt_user_client_ui_DisclosurePanel_isOpen && com_google_gwt_user_client_ui_UIObject_$setVisible__Lcom_google_gwt_user_client_ui_UIObject_2ZV(panel.com_google_gwt_user_client_ui_DisclosurePanel_contentWrapper.com_google_gwt_user_client_ui_SimplePanel_widget, true);
  }
}

function com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_DisclosurePanel$ContentAnimation__V(){
  com_google_gwt_animation_client_Animation_Animation__Lcom_google_gwt_animation_client_AnimationScheduler_2V.call(this, (!com_google_gwt_animation_client_AnimationScheduler_instance && (com_google_gwt_animation_client_AnimationScheduler_instance = !!$wnd.requestAnimationFrame && !!$wnd.cancelAnimationFrame?new com_google_gwt_animation_client_AnimationSchedulerImplStandard_AnimationSchedulerImplStandard__V:new com_google_gwt_animation_client_AnimationSchedulerImplTimer_AnimationSchedulerImplTimer__V) , com_google_gwt_animation_client_AnimationScheduler_instance));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(271, 142, {}, com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_DisclosurePanel$ContentAnimation__V);
_.com_google_gwt_user_client_ui_DisclosurePanel$ContentAnimation_opening = false;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DisclosurePanel$ContentAnimation_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DisclosurePanel/ContentAnimation', 271);
function com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_DisclosurePanel$DefaultHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_resources_client_ImageResource_2Lcom_google_gwt_resources_client_ImageResource_2Ljava_lang_String_2V(this$0, openImage, closedImage, text_0){
  com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_DisclosurePanel$DefaultHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_user_client_ui_DisclosurePanel$Imager_2Ljava_lang_String_2V.call(this, this$0, new com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_DisclosurePanel$DefaultHeader$2__V(closedImage, openImage), text_0);
}

function com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_DisclosurePanel$DefaultHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_user_client_ui_DisclosurePanel$Imager_2Ljava_lang_String_2V(this$0, imager, text_0){
  var imageTD, root, tbody, tr;
  this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_this$01 = this$0;
  this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_imager = imager;
  this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_iconImage = new com_google_gwt_user_client_ui_Image_Image__Lcom_google_gwt_resources_client_ImageResource_2V(imager.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_val$closedImage2);
  root = (com_google_gwt_user_client_DOM_$clinit__V() , $doc.createElement('table'));
  tbody = $doc.createElement('tbody');
  tr = $doc.createElement('tr');
  imageTD = $doc.createElement('td');
  this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_labelTD = $doc.createElement('td');
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2V(this, root);
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(root, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(tbody));
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(tbody, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(tr));
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(tr, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(imageTD));
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(tr, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_labelTD));
  com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(imageTD, 'align', 'center');
  com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(imageTD, 'valign', 'middle');
  imageTD.style[$intern_49] = com_google_gwt_user_client_ui_Image_$getWidth__Lcom_google_gwt_user_client_ui_Image_2I(this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_iconImage) + 'px';
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(imageTD, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_iconImage)));
  com_google_gwt_dom_client_DOMImplStandard_$setInnerText__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_labelTD, text_0);
  com_google_gwt_user_client_ui_Widget_$addHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this$0, this, (!com_google_gwt_event_logical_shared_OpenEvent_TYPE && (com_google_gwt_event_logical_shared_OpenEvent_TYPE = new com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V) , com_google_gwt_event_logical_shared_OpenEvent_TYPE));
  com_google_gwt_user_client_ui_Widget_$addHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this$0, this, com_google_gwt_event_logical_shared_CloseEvent_TYPE?com_google_gwt_event_logical_shared_CloseEvent_TYPE:(com_google_gwt_event_logical_shared_CloseEvent_TYPE = new com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V));
  com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_$updateImage__Lcom_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_2ZLcom_google_gwt_user_client_ui_Image_2V(this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_imager, this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_this$01.com_google_gwt_user_client_ui_DisclosurePanel_isOpen, this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_iconImage);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(143, 8, {287:1, 14:1, 331:1, 38:1, 11:1, 13:1, 12:1, 15:1, 10:1, 8:1}, com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_DisclosurePanel$DefaultHeader__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_resources_client_ImageResource_2Lcom_google_gwt_resources_client_ImageResource_2Ljava_lang_String_2V);
_.onClose__Lcom_google_gwt_event_logical_shared_CloseEvent_2V = function com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_onClose__Lcom_google_gwt_event_logical_shared_CloseEvent_2V(event_0){
  com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_$updateImage__Lcom_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_2ZLcom_google_gwt_user_client_ui_Image_2V(this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_imager, this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_this$01.com_google_gwt_user_client_ui_DisclosurePanel_isOpen, this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader_iconImage);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DisclosurePanel$DefaultHeader_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DisclosurePanel/DefaultHeader', 143);
function com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_$updateImage__Lcom_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_2ZLcom_google_gwt_user_client_ui_Image_2V(this$static, open_0, image){
  open_0?com_google_gwt_user_client_ui_Image_$setResource__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_resources_client_ImageResource_2V(image, this$static.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_val$openImage3):com_google_gwt_user_client_ui_Image_$setResource__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_resources_client_ImageResource_2V(image, this$static.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_val$closedImage2);
}

function com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_DisclosurePanel$DefaultHeader$2__V(val$closedImage, val$openImage){
  this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_val$closedImage2 = val$closedImage;
  this.com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_val$openImage3 = val$openImage;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(272, 1, {}, com_google_gwt_user_client_ui_DisclosurePanel$DefaultHeader$2_DisclosurePanel$DefaultHeader$2__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DisclosurePanel$DefaultHeader$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DisclosurePanel/DefaultHeader/2', 272);
var com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator_disclosurePanelClosed, com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator_disclosurePanelOpen;
function com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator$disclosurePanelClosedInitializer_$clinit__V(){
  com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator$disclosurePanelClosedInitializer_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator_disclosurePanelClosed = new com_google_gwt_resources_client_impl_ImageResourcePrototype_ImageResourcePrototype__Ljava_lang_String_2Lcom_google_gwt_safehtml_shared_SafeUri_2IIIIZZV((com_google_gwt_safehtml_shared_UriUtils_$clinit__V() , new com_google_gwt_safehtml_shared_SafeUriString_SafeUriString__Ljava_lang_String_2V('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfklEQVR42mNgoDZITk4WosiAtLS0M6mpqb1Amp9cAy4B8X8gfpWenp5MiQEwfB6IbSgxAIaXArEcJQaA8Ddg+NQVFhZykmsADG8MDQ1lJseA5wQDFocBP0FRm5WVxUNOGGwEJi4VcmLhKtC5HuSkg8NA5+bjDCRCAG8UDUoAAIw8kVdwMG+3AAAAAElFTkSuQmCC')));
}

function com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator$disclosurePanelOpenInitializer_$clinit__V(){
  com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator$disclosurePanelOpenInitializer_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_ui_DisclosurePanel_1DefaultImages_1default_1InlineClientBundleGenerator_disclosurePanelOpen = new com_google_gwt_resources_client_impl_ImageResourcePrototype_ImageResourcePrototype__Ljava_lang_String_2Lcom_google_gwt_safehtml_shared_SafeUri_2IIIIZZV((com_google_gwt_safehtml_shared_UriUtils_$clinit__V() , new com_google_gwt_safehtml_shared_SafeUriString_SafeUriString__Ljava_lang_String_2V('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAjUlEQVR42mNgGD6gsLCQMy0t7TAQXyICn0lOThbCMCQ1NTUfKPmfEAaq68XqitDQUGaggqsEDHgFxPw4vZKenu6BzwCgfDLB8AAq3IjDgPNEBSgwgFSAin9iMcCG6FgBBRSa5qUkRWtWVhYPUNNzqOZvQCxHctoABRg02urITmCgAAUlMrINAKWNwZ2HAAhGkVd3k7/tAAAAAElFTkSuQmCC')));
}

function com_google_gwt_user_client_ui_DockPanel_$clinit__V(){
  com_google_gwt_user_client_ui_DockPanel_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_ui_DockPanel_CENTER = new com_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_DockPanel$DockLayoutConstant__V;
  com_google_gwt_user_client_ui_DockPanel_LINE_1START = new com_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_DockPanel$DockLayoutConstant__V;
  com_google_gwt_user_client_ui_DockPanel_LINE_1END = new com_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_DockPanel$DockLayoutConstant__V;
  com_google_gwt_user_client_ui_DockPanel_EAST = new com_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_DockPanel$DockLayoutConstant__V;
  com_google_gwt_user_client_ui_DockPanel_NORTH = new com_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_DockPanel$DockLayoutConstant__V;
  com_google_gwt_user_client_ui_DockPanel_SOUTH = new com_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_DockPanel$DockLayoutConstant__V;
  com_google_gwt_user_client_ui_DockPanel_WEST = new com_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_DockPanel$DockLayoutConstant__V;
}

function com_google_gwt_user_client_ui_DockPanel_$add__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_2V(this$static, widget, direction){
  var layout;
  if (direction == com_google_gwt_user_client_ui_DockPanel_CENTER) {
    if (widget == this$static.com_google_gwt_user_client_ui_DockPanel_center) {
      return;
    }
     else if (this$static.com_google_gwt_user_client_ui_DockPanel_center) {
      throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V('Only one CENTER widget may be added');
    }
  }
  com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(widget);
  com_google_gwt_user_client_ui_WidgetCollection_$add__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_google_gwt_user_client_ui_ComplexPanel_children, widget);
  direction == com_google_gwt_user_client_ui_DockPanel_CENTER && (this$static.com_google_gwt_user_client_ui_DockPanel_center = widget);
  layout = new com_google_gwt_user_client_ui_DockPanel$LayoutData_DockPanel$LayoutData__Lcom_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_2V(direction);
  widget.com_google_gwt_user_client_ui_Widget_layoutData = layout;
  com_google_gwt_user_client_ui_DockPanel_$setCellHorizontalAlignment__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(widget, this$static.com_google_gwt_user_client_ui_DockPanel_horzAlign);
  com_google_gwt_user_client_ui_DockPanel_$setCellVerticalAlignment__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V(widget, this$static.com_google_gwt_user_client_ui_DockPanel_vertAlign);
  com_google_gwt_user_client_ui_DockPanel_$realizeTable__Lcom_google_gwt_user_client_ui_DockPanel_2V(this$static);
  com_google_gwt_user_client_ui_Widget_$setParent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_Widget_2V(widget, this$static);
}

function com_google_gwt_user_client_ui_DockPanel_$realizeTable__Lcom_google_gwt_user_client_ui_DockPanel_2V(this$static){
  var bodyElem, centerTd, child, colCount, dir_0, i, it, it0, layout, logicalLeftCol, logicalRightCol, northRow, row, rowCount, rows_0, southRow, td;
  bodyElem = (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_CellPanel_body);
  while (com_google_gwt_user_client_impl_DOMImplStandard_$getChildCount__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2I(bodyElem) > 0) {
    com_google_gwt_dom_client_Node_$removeChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(bodyElem, com_google_gwt_user_client_impl_DOMImplStandard_$getChild__Lcom_google_gwt_user_client_impl_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2ILcom_google_gwt_dom_client_Element_2(bodyElem, 0));
  }
  rowCount = 1;
  colCount = 1;
  for (it0 = new com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_WidgetCollection$WidgetIterator__Lcom_google_gwt_user_client_ui_WidgetCollection_2V(this$static.com_google_gwt_user_client_ui_ComplexPanel_children); it0.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_index < it0.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_this$01.com_google_gwt_user_client_ui_WidgetCollection_size;) {
    child = com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_$next__Lcom_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_2Lcom_google_gwt_user_client_ui_Widget_2(it0);
    dir_0 = child.com_google_gwt_user_client_ui_Widget_layoutData.com_google_gwt_user_client_ui_DockPanel$LayoutData_direction;
    dir_0 == com_google_gwt_user_client_ui_DockPanel_NORTH || dir_0 == com_google_gwt_user_client_ui_DockPanel_SOUTH?++rowCount:(dir_0 == com_google_gwt_user_client_ui_DockPanel_EAST || dir_0 == com_google_gwt_user_client_ui_DockPanel_WEST || dir_0 == com_google_gwt_user_client_ui_DockPanel_LINE_1START || dir_0 == com_google_gwt_user_client_ui_DockPanel_LINE_1END) && ++colCount;
  }
  rows_0 = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DockPanel$TmpRow_12_1classLit, $intern_14, 100, rowCount, 0, 1);
  for (i = 0; i < rowCount; ++i) {
    rows_0[i] = new com_google_gwt_user_client_ui_DockPanel$TmpRow_DockPanel$TmpRow__V;
    rows_0[i].com_google_gwt_user_client_ui_DockPanel$TmpRow_tr = $doc.createElement('tr');
    com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(bodyElem, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(rows_0[i].com_google_gwt_user_client_ui_DockPanel$TmpRow_tr));
  }
  logicalLeftCol = 0;
  logicalRightCol = colCount - 1;
  northRow = 0;
  southRow = rowCount - 1;
  centerTd = null;
  for (it = new com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_WidgetCollection$WidgetIterator__Lcom_google_gwt_user_client_ui_WidgetCollection_2V(this$static.com_google_gwt_user_client_ui_ComplexPanel_children); it.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_index < it.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_this$01.com_google_gwt_user_client_ui_WidgetCollection_size;) {
    child = com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_$next__Lcom_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_2Lcom_google_gwt_user_client_ui_Widget_2(it);
    layout = child.com_google_gwt_user_client_ui_Widget_layoutData;
    td = $doc.createElement('td');
    layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_td = td;
    com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_td, 'align', layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_hAlign);
    com_google_gwt_dom_client_Style_$setPropertyImpl__Lcom_google_gwt_dom_client_Style_2Ljava_lang_String_2Ljava_lang_String_2V(layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_td.style, $intern_45, layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_vAlign);
    com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_td, $intern_49, layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_width);
    com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_td, $intern_48, layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_height);
    if (layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_direction == com_google_gwt_user_client_ui_DockPanel_NORTH) {
      com_google_gwt_user_client_DOM_insertChild__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(rows_0[northRow].com_google_gwt_user_client_ui_DockPanel$TmpRow_tr, td, rows_0[northRow].com_google_gwt_user_client_ui_DockPanel$TmpRow_center);
      com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(td, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(child.com_google_gwt_user_client_ui_UIObject_element));
      com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV(td, 'colSpan', logicalRightCol - logicalLeftCol + 1);
      ++northRow;
    }
     else if (layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_direction == com_google_gwt_user_client_ui_DockPanel_SOUTH) {
      com_google_gwt_user_client_DOM_insertChild__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(rows_0[southRow].com_google_gwt_user_client_ui_DockPanel$TmpRow_tr, td, rows_0[southRow].com_google_gwt_user_client_ui_DockPanel$TmpRow_center);
      com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(td, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(child.com_google_gwt_user_client_ui_UIObject_element));
      com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV(td, 'colSpan', logicalRightCol - logicalLeftCol + 1);
      --southRow;
    }
     else if (layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_direction == com_google_gwt_user_client_ui_DockPanel_CENTER) {
      centerTd = td;
    }
     else if (com_google_gwt_user_client_ui_DockPanel_$shouldAddToLogicalLeftOfTable__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_2Z(layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_direction)) {
      row = rows_0[northRow];
      com_google_gwt_user_client_DOM_insertChild__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(row.com_google_gwt_user_client_ui_DockPanel$TmpRow_tr, td, row.com_google_gwt_user_client_ui_DockPanel$TmpRow_center++);
      com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(td, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(child.com_google_gwt_user_client_ui_UIObject_element));
      com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV(td, 'rowSpan', southRow - northRow + 1);
      ++logicalLeftCol;
    }
     else if (com_google_gwt_user_client_ui_DockPanel_$shouldAddToLogicalRightOfTable__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_2Z(layout.com_google_gwt_user_client_ui_DockPanel$LayoutData_direction)) {
      row = rows_0[northRow];
      com_google_gwt_user_client_DOM_insertChild__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(row.com_google_gwt_user_client_ui_DockPanel$TmpRow_tr, td, row.com_google_gwt_user_client_ui_DockPanel$TmpRow_center);
      com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(td, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(child.com_google_gwt_user_client_ui_UIObject_element));
      com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV(td, 'rowSpan', southRow - northRow + 1);
      --logicalRightCol;
    }
  }
  if (this$static.com_google_gwt_user_client_ui_DockPanel_center) {
    row = rows_0[northRow];
    com_google_gwt_user_client_DOM_insertChild__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(row.com_google_gwt_user_client_ui_DockPanel$TmpRow_tr, centerTd, row.com_google_gwt_user_client_ui_DockPanel$TmpRow_center);
    com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(centerTd, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this$static.com_google_gwt_user_client_ui_DockPanel_center)));
  }
}

function com_google_gwt_user_client_ui_DockPanel_$setCellHorizontalAlignment__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(w, align_0){
  var data_0;
  data_0 = w.com_google_gwt_user_client_ui_Widget_layoutData;
  data_0.com_google_gwt_user_client_ui_DockPanel$LayoutData_hAlign = align_0.com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_textAlignString;
  !!data_0.com_google_gwt_user_client_ui_DockPanel$LayoutData_td && com_google_gwt_user_client_ui_CellPanel_$setCellHorizontalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(data_0.com_google_gwt_user_client_ui_DockPanel$LayoutData_td, align_0);
}

function com_google_gwt_user_client_ui_DockPanel_$setCellVerticalAlignment__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V(w, align_0){
  var data_0;
  data_0 = w.com_google_gwt_user_client_ui_Widget_layoutData;
  data_0.com_google_gwt_user_client_ui_DockPanel$LayoutData_vAlign = align_0.com_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_verticalAlignString;
  !!data_0.com_google_gwt_user_client_ui_DockPanel$LayoutData_td && com_google_gwt_user_client_ui_CellPanel_$setCellVerticalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V(data_0.com_google_gwt_user_client_ui_DockPanel$LayoutData_td, align_0);
}

function com_google_gwt_user_client_ui_DockPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this$static, align_0){
  this$static.com_google_gwt_user_client_ui_DockPanel_horzAlign = align_0;
}

function com_google_gwt_user_client_ui_DockPanel_$shouldAddToLogicalLeftOfTable__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_2Z(widgetDirection){
  if (widgetDirection == com_google_gwt_user_client_ui_DockPanel_LINE_1START) {
    return true;
  }
  return widgetDirection == com_google_gwt_user_client_ui_DockPanel_WEST;
}

function com_google_gwt_user_client_ui_DockPanel_$shouldAddToLogicalRightOfTable__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_2Z(widgetDirection){
  if (widgetDirection == com_google_gwt_user_client_ui_DockPanel_LINE_1END) {
    return true;
  }
  return widgetDirection == com_google_gwt_user_client_ui_DockPanel_EAST;
}

function com_google_gwt_user_client_ui_DockPanel_DockPanel__V(){
  com_google_gwt_user_client_ui_DockPanel_$clinit__V();
  com_google_gwt_user_client_ui_CellPanel_CellPanel__V.call(this);
  this.com_google_gwt_user_client_ui_DockPanel_horzAlign = (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1DEFAULT);
  this.com_google_gwt_user_client_ui_DockPanel_vertAlign = (com_google_gwt_user_client_ui_HasVerticalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasVerticalAlignment_ALIGN_1TOP);
  com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_CellPanel_table), $intern_46, 0);
  com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV(this.com_google_gwt_user_client_ui_CellPanel_table, $intern_50, 0);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(191, 99, $intern_43, com_google_gwt_user_client_ui_DockPanel_DockPanel__V);
_.remove__Lcom_google_gwt_user_client_ui_Widget_2Z = function com_google_gwt_user_client_ui_DockPanel_remove__Lcom_google_gwt_user_client_ui_Widget_2Z(w){
  var removed;
  removed = com_google_gwt_user_client_ui_ComplexPanel_$remove__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this, w);
  if (removed) {
    w == this.com_google_gwt_user_client_ui_DockPanel_center && (this.com_google_gwt_user_client_ui_DockPanel_center = null);
    com_google_gwt_user_client_ui_DockPanel_$realizeTable__Lcom_google_gwt_user_client_ui_DockPanel_2V(this);
  }
  return removed;
}
;
var com_google_gwt_user_client_ui_DockPanel_CENTER, com_google_gwt_user_client_ui_DockPanel_EAST, com_google_gwt_user_client_ui_DockPanel_LINE_1END, com_google_gwt_user_client_ui_DockPanel_LINE_1START, com_google_gwt_user_client_ui_DockPanel_NORTH, com_google_gwt_user_client_ui_DockPanel_SOUTH, com_google_gwt_user_client_ui_DockPanel_WEST;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DockPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DockPanel', 191);
function com_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_DockPanel$DockLayoutConstant__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(54, 1, {}, com_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_DockPanel$DockLayoutConstant__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DockPanel$DockLayoutConstant_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DockPanel/DockLayoutConstant', 54);
function com_google_gwt_user_client_ui_DockPanel$LayoutData_DockPanel$LayoutData__Lcom_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_2V(dir_0){
  this.com_google_gwt_user_client_ui_DockPanel$LayoutData_hAlign = (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1DEFAULT).com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_textAlignString;
  this.com_google_gwt_user_client_ui_DockPanel$LayoutData_vAlign = (com_google_gwt_user_client_ui_HasVerticalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasVerticalAlignment_ALIGN_1TOP).com_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_verticalAlignString;
  this.com_google_gwt_user_client_ui_DockPanel$LayoutData_direction = dir_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(192, 1, {}, com_google_gwt_user_client_ui_DockPanel$LayoutData_DockPanel$LayoutData__Lcom_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_2V);
_.com_google_gwt_user_client_ui_DockPanel$LayoutData_height = '';
_.com_google_gwt_user_client_ui_DockPanel$LayoutData_width = '';
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DockPanel$LayoutData_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DockPanel/LayoutData', 192);
function com_google_gwt_user_client_ui_DockPanel$TmpRow_DockPanel$TmpRow__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(100, 1, {100:1}, com_google_gwt_user_client_ui_DockPanel$TmpRow_DockPanel$TmpRow__V);
_.com_google_gwt_user_client_ui_DockPanel$TmpRow_center = 0;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1DockPanel$TmpRow_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'DockPanel/TmpRow', 100);
function com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, w){
  com_google_gwt_user_client_ui_ComplexPanel_$add__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2V(this$static, w, (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element));
}

function com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V(){
  com_google_gwt_user_client_ui_ComplexPanel_ComplexPanel__V.call(this);
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2V(this, $doc.createElement('div'));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(36, 96, $intern_44, com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V);
_.add__Lcom_google_gwt_user_client_ui_Widget_2V = function com_google_gwt_user_client_ui_FlowPanel_add__Lcom_google_gwt_user_client_ui_Widget_2V(w){
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this, w);
}
;
_.insert__Lcom_google_gwt_user_client_ui_Widget_2IV = function com_google_gwt_user_client_ui_FlowPanel_insert__Lcom_google_gwt_user_client_ui_Widget_2IV(w, beforeIndex){
  com_google_gwt_user_client_ui_ComplexPanel_$insert__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2IZV(this, w, (com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), beforeIndex, true);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1FlowPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'FlowPanel', 36);
function com_google_gwt_user_client_ui_LabelBase_LabelBase__Lcom_google_gwt_dom_client_Element_2ZV(element){
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2V(this, (com_google_gwt_user_client_DOM_$clinit__V() , element));
  this.com_google_gwt_user_client_ui_LabelBase_directionalTextHelper = new com_google_gwt_user_client_ui_DirectionalTextHelper_DirectionalTextHelper__Lcom_google_gwt_dom_client_Element_2ZV(this.com_google_gwt_user_client_ui_UIObject_element);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(84, 8, $intern_42);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1LabelBase_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'LabelBase', 84);
function com_google_gwt_user_client_ui_Label_Label__V(){
  com_google_gwt_user_client_ui_LabelBase_LabelBase__Lcom_google_gwt_dom_client_Element_2ZV.call(this, $doc.createElement('div'));
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), 'gwt-Label');
}

function com_google_gwt_user_client_ui_Label_Label__Lcom_google_gwt_dom_client_Element_2V(element){
  com_google_gwt_user_client_ui_LabelBase_LabelBase__Lcom_google_gwt_dom_client_Element_2ZV.call(this, element, java_lang_String_$equalsIgnoreCase__Ljava_lang_String_2Ljava_lang_String_2Z('span', element.tagName));
}

function com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V(text_0){
  com_google_gwt_user_client_ui_Label_Label__V.call(this);
  com_google_gwt_user_client_ui_DirectionalTextHelper_$setTextOrHtml__Lcom_google_gwt_user_client_ui_DirectionalTextHelper_2Ljava_lang_String_2ZV(this.com_google_gwt_user_client_ui_LabelBase_directionalTextHelper, text_0, false);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(24, 84, $intern_42, com_google_gwt_user_client_ui_Label_Label__V, com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Label_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'Label', 24);
function com_google_gwt_user_client_ui_HTML_HTML__Ljava_lang_String_2V(html){
  com_google_gwt_user_client_ui_Label_Label__Lcom_google_gwt_dom_client_Element_2V.call(this, $doc.createElement('div'));
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), 'gwt-HTML');
  com_google_gwt_user_client_ui_DirectionalTextHelper_$setTextOrHtml__Lcom_google_gwt_user_client_ui_DirectionalTextHelper_2Ljava_lang_String_2ZV(this.com_google_gwt_user_client_ui_LabelBase_directionalTextHelper, html, true);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(104, 24, $intern_42, com_google_gwt_user_client_ui_HTML_HTML__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1HTML_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'HTML', 104);
function com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V(){
  com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  new com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_HasHorizontalAlignment$HorizontalAlignmentConstant__Ljava_lang_String_2V((com_google_gwt_dom_client_Style$TextAlign_$clinit__V() , 'center'));
  new com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_HasHorizontalAlignment$HorizontalAlignmentConstant__Ljava_lang_String_2V('justify');
  com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1LEFT = new com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_HasHorizontalAlignment$HorizontalAlignmentConstant__Ljava_lang_String_2V('left');
  com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1RIGHT = new com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_HasHorizontalAlignment$HorizontalAlignmentConstant__Ljava_lang_String_2V('right');
  com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1LOCALE_1START = com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1LEFT;
  com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1DEFAULT = com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1LOCALE_1START;
}

var com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1DEFAULT, com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1LEFT, com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1LOCALE_1START, com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1RIGHT;
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(313, 1, {});
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1HasHorizontalAlignment$AutoHorizontalAlignmentConstant_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'HasHorizontalAlignment/AutoHorizontalAlignmentConstant', 313);
function com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_HasHorizontalAlignment$HorizontalAlignmentConstant__Ljava_lang_String_2V(textAlignString){
  this.com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_textAlignString = textAlignString;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(83, 313, {}, com_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_HasHorizontalAlignment$HorizontalAlignmentConstant__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1HasHorizontalAlignment$HorizontalAlignmentConstant_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'HasHorizontalAlignment/HorizontalAlignmentConstant', 83);
function com_google_gwt_user_client_ui_HasVerticalAlignment_$clinit__V(){
  com_google_gwt_user_client_ui_HasVerticalAlignment_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  new com_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_HasVerticalAlignment$VerticalAlignmentConstant__Ljava_lang_String_2V('bottom');
  com_google_gwt_user_client_ui_HasVerticalAlignment_ALIGN_1MIDDLE = new com_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_HasVerticalAlignment$VerticalAlignmentConstant__Ljava_lang_String_2V('middle');
  com_google_gwt_user_client_ui_HasVerticalAlignment_ALIGN_1TOP = new com_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_HasVerticalAlignment$VerticalAlignmentConstant__Ljava_lang_String_2V('top');
}

var com_google_gwt_user_client_ui_HasVerticalAlignment_ALIGN_1MIDDLE, com_google_gwt_user_client_ui_HasVerticalAlignment_ALIGN_1TOP;
function com_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_HasVerticalAlignment$VerticalAlignmentConstant__Ljava_lang_String_2V(verticalAlignString){
  this.com_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_verticalAlignString = verticalAlignString;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(101, 1, {}, com_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_HasVerticalAlignment$VerticalAlignmentConstant__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1HasVerticalAlignment$VerticalAlignmentConstant_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'HasVerticalAlignment/VerticalAlignmentConstant', 101);
function com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, w){
  var td;
  td = com_google_gwt_user_client_ui_HorizontalPanel_$createAlignedTd__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_dom_client_Element_2(this$static);
  com_google_gwt_user_client_DOM_$clinit__V();
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(this$static.com_google_gwt_user_client_ui_HorizontalPanel_tableRow, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(td));
  com_google_gwt_user_client_ui_ComplexPanel_$add__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2V(this$static, w, td);
}

function com_google_gwt_user_client_ui_HorizontalPanel_$createAlignedTd__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_dom_client_Element_2(this$static){
  var td;
  td = (com_google_gwt_user_client_DOM_$clinit__V() , $doc.createElement('td'));
  com_google_gwt_user_client_ui_CellPanel_$setCellHorizontalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(td, this$static.com_google_gwt_user_client_ui_HorizontalPanel_horzAlign);
  com_google_gwt_user_client_ui_CellPanel_$setCellVerticalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V(td, this$static.com_google_gwt_user_client_ui_HorizontalPanel_vertAlign);
  return td;
}

function com_google_gwt_user_client_ui_HorizontalPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this$static, align_0){
  this$static.com_google_gwt_user_client_ui_HorizontalPanel_horzAlign = align_0;
}

function com_google_gwt_user_client_ui_HorizontalPanel_$setVerticalAlignment__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V(this$static, align_0){
  this$static.com_google_gwt_user_client_ui_HorizontalPanel_vertAlign = align_0;
}

function com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V(){
  com_google_gwt_user_client_ui_CellPanel_CellPanel__V.call(this);
  this.com_google_gwt_user_client_ui_HorizontalPanel_horzAlign = (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1DEFAULT);
  this.com_google_gwt_user_client_ui_HorizontalPanel_vertAlign = (com_google_gwt_user_client_ui_HasVerticalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasVerticalAlignment_ALIGN_1TOP);
  this.com_google_gwt_user_client_ui_HorizontalPanel_tableRow = (com_google_gwt_user_client_DOM_$clinit__V() , $doc.createElement('tr'));
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(this.com_google_gwt_user_client_ui_CellPanel_body, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(this.com_google_gwt_user_client_ui_HorizontalPanel_tableRow));
  com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(this.com_google_gwt_user_client_ui_CellPanel_table, $intern_46, '0');
  com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(this.com_google_gwt_user_client_ui_CellPanel_table, $intern_50, '0');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(29, 99, $intern_44, com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V);
_.add__Lcom_google_gwt_user_client_ui_Widget_2V = function com_google_gwt_user_client_ui_HorizontalPanel_add__Lcom_google_gwt_user_client_ui_Widget_2V(w){
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this, w);
}
;
_.insert__Lcom_google_gwt_user_client_ui_Widget_2IV = function com_google_gwt_user_client_ui_HorizontalPanel_insert__Lcom_google_gwt_user_client_ui_Widget_2IV(w, beforeIndex){
  var td;
  com_google_gwt_user_client_ui_ComplexPanel_$checkIndexBoundsForInsertion__Lcom_google_gwt_user_client_ui_ComplexPanel_2IV(this, beforeIndex);
  td = com_google_gwt_user_client_ui_HorizontalPanel_$createAlignedTd__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_dom_client_Element_2(this);
  com_google_gwt_user_client_DOM_insertChild__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(this.com_google_gwt_user_client_ui_HorizontalPanel_tableRow, td, beforeIndex);
  com_google_gwt_user_client_ui_ComplexPanel_$insert__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2IZV(this, w, (com_google_gwt_user_client_DOM_$clinit__V() , td), beforeIndex, false);
}
;
_.remove__Lcom_google_gwt_user_client_ui_Widget_2Z = function com_google_gwt_user_client_ui_HorizontalPanel_remove__Lcom_google_gwt_user_client_ui_Widget_2Z(w){
  var removed, td;
  td = (com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_dom_client_DOMImpl_$getParentElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Element_2(w.com_google_gwt_user_client_ui_UIObject_element));
  removed = com_google_gwt_user_client_ui_ComplexPanel_$remove__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this, w);
  removed && com_google_gwt_dom_client_Node_$removeChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(this.com_google_gwt_user_client_ui_HorizontalPanel_tableRow, td);
  return removed;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1HorizontalPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'HorizontalPanel', 29);
function com_google_gwt_user_client_ui_Image_$clinit__V(){
  com_google_gwt_user_client_ui_Image_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  new java_util_HashMap_HashMap__V;
}

function com_google_gwt_user_client_ui_Image_$changeState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_user_client_ui_Image$State_2V(this$static, newState){
  this$static.com_google_gwt_user_client_ui_Image_state = newState;
}

function com_google_gwt_user_client_ui_Image_$getWidth__Lcom_google_gwt_user_client_ui_Image_2I(this$static){
  return (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element).width;
}

function com_google_gwt_user_client_ui_Image_$setResource__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_resources_client_ImageResource_2V(this$static, resource){
  com_google_gwt_user_client_ui_Image$UnclippedState_$setUrl__Lcom_google_gwt_user_client_ui_Image$UnclippedState_2Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_safehtml_shared_SafeUri_2IIV(this$static, resource.com_google_gwt_resources_client_impl_ImageResourcePrototype_url, resource.com_google_gwt_resources_client_impl_ImageResourcePrototype_width, resource.com_google_gwt_resources_client_impl_ImageResourcePrototype_height);
}

function com_google_gwt_user_client_ui_Image_Image__Lcom_google_gwt_resources_client_ImageResource_2V(resource){
  com_google_gwt_user_client_ui_Image_$clinit__V();
  com_google_gwt_user_client_ui_Image_$changeState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_user_client_ui_Image$State_2V(this, new com_google_gwt_user_client_ui_Image$UnclippedState_Image$UnclippedState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_safehtml_shared_SafeUri_2IIV(this, resource.com_google_gwt_resources_client_impl_ImageResourcePrototype_url, resource.com_google_gwt_resources_client_impl_ImageResourcePrototype_width, resource.com_google_gwt_resources_client_impl_ImageResourcePrototype_height));
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), 'gwt-Image');
}

function com_google_gwt_user_client_ui_Image_Image__Lcom_google_gwt_safehtml_shared_SafeUri_2V(url_0){
  com_google_gwt_user_client_ui_Image_$changeState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_user_client_ui_Image$State_2V(this, new com_google_gwt_user_client_ui_Image$UnclippedState_Image$UnclippedState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_safehtml_shared_SafeUri_2V(this, url_0));
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), 'gwt-Image');
}

function com_google_gwt_user_client_ui_Image_Image__Ljava_lang_String_2V(url_0){
  com_google_gwt_user_client_ui_Image_$clinit__V();
  com_google_gwt_user_client_ui_Image_Image__Lcom_google_gwt_safehtml_shared_SafeUri_2V.call(this, (com_google_gwt_safehtml_shared_UriUtils_$clinit__V() , new com_google_gwt_safehtml_shared_SafeUriString_SafeUriString__Ljava_lang_String_2V(url_0)));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(108, 8, $intern_42, com_google_gwt_user_client_ui_Image_Image__Lcom_google_gwt_resources_client_ImageResource_2V, com_google_gwt_user_client_ui_Image_Image__Ljava_lang_String_2V);
_.onBrowserEvent__Lcom_google_gwt_user_client_Event_2V = function com_google_gwt_user_client_ui_Image_onBrowserEvent__Lcom_google_gwt_user_client_Event_2V(event_0){
  com_google_gwt_user_client_DOM_$clinit__V();
  com_google_gwt_user_client_impl_DOMImpl_$eventGetTypeInt__Lcom_google_gwt_user_client_impl_DOMImpl_2Ljava_lang_String_2I(event_0.type) == 32768 && !!this.com_google_gwt_user_client_ui_Image_state && com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(this.com_google_gwt_user_client_ui_UIObject_element, $intern_39, '');
  com_google_gwt_user_client_ui_Widget_$onBrowserEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Event_2V(this, event_0);
}
;
_.onLoad__V = function com_google_gwt_user_client_ui_Image_onLoad__V(){
  com_google_gwt_user_client_ui_Image$State_$onLoad__Lcom_google_gwt_user_client_ui_Image$State_2Lcom_google_gwt_user_client_ui_Image_2V(this.com_google_gwt_user_client_ui_Image_state, this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Image_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'Image', 108);
function com_google_gwt_user_client_ui_Image$State_$onLoad__Lcom_google_gwt_user_client_ui_Image$State_2Lcom_google_gwt_user_client_ui_Image_2V(this$static, image){
  var unhandledEvent;
  unhandledEvent = com_google_gwt_dom_client_Element_$getPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2((com_google_gwt_user_client_DOM_$clinit__V() , image.com_google_gwt_user_client_ui_UIObject_element), $intern_39);
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_32, unhandledEvent) && (this$static.com_google_gwt_user_client_ui_Image$State_syntheticEventCommand = new com_google_gwt_user_client_ui_Image$State$1_Image$State$1__Lcom_google_gwt_user_client_ui_Image$State_2V(this$static, image) , com_google_gwt_core_client_impl_SchedulerImpl_$scheduleDeferred__Lcom_google_gwt_core_client_impl_SchedulerImpl_2Lcom_google_gwt_core_client_Scheduler$ScheduledCommand_2V((com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V() , com_google_gwt_core_client_impl_SchedulerImpl_INSTANCE), this$static.com_google_gwt_user_client_ui_Image$State_syntheticEventCommand));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(249, 1, {});
_.com_google_gwt_user_client_ui_Image$State_syntheticEventCommand = null;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Image$State_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'Image/State', 249);
function com_google_gwt_user_client_ui_Image$State$1_$execute__Lcom_google_gwt_user_client_ui_Image$State$1_2V(this$static){
  var evt, com_google_gwt_dom_client_DOMImplStandard_$createHtmlEvent__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2ZZLcom_google_gwt_dom_client_NativeEvent_2_evt_0;
  if (this$static.com_google_gwt_user_client_ui_Image$State$1_val$image2.com_google_gwt_user_client_ui_Image_state != this$static.com_google_gwt_user_client_ui_Image$State$1_this$11 || this$static != this$static.com_google_gwt_user_client_ui_Image$State$1_this$11.com_google_gwt_user_client_ui_Image$State_syntheticEventCommand) {
    return;
  }
  this$static.com_google_gwt_user_client_ui_Image$State$1_this$11.com_google_gwt_user_client_ui_Image$State_syntheticEventCommand = null;
  if (!this$static.com_google_gwt_user_client_ui_Image$State$1_val$image2.com_google_gwt_user_client_ui_Widget_attached) {
    com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(com_google_gwt_user_client_ui_Image$UnclippedState_$getImageElement__Lcom_google_gwt_user_client_ui_Image$UnclippedState_2Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_dom_client_ImageElement_2(this$static.com_google_gwt_user_client_ui_Image$State$1_val$image2), $intern_39, $intern_32);
    return;
  }
  evt = (com_google_gwt_dom_client_DOMImplStandard_$createHtmlEvent__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2ZZLcom_google_gwt_dom_client_NativeEvent_2_evt_0 = $doc.createEvent('HTMLEvents') , com_google_gwt_dom_client_DOMImplStandard_$createHtmlEvent__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2ZZLcom_google_gwt_dom_client_NativeEvent_2_evt_0.initEvent($intern_32, false, false) , com_google_gwt_dom_client_DOMImplStandard_$createHtmlEvent__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2ZZLcom_google_gwt_dom_client_NativeEvent_2_evt_0);
  com_google_gwt_dom_client_DOMImplStandard_$dispatchEvent__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_NativeEvent_2V(com_google_gwt_user_client_ui_Image$UnclippedState_$getImageElement__Lcom_google_gwt_user_client_ui_Image$UnclippedState_2Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_dom_client_ImageElement_2(this$static.com_google_gwt_user_client_ui_Image$State$1_val$image2), evt);
}

function com_google_gwt_user_client_ui_Image$State$1_Image$State$1__Lcom_google_gwt_user_client_ui_Image$State_2V(this$1, val$image){
  this.com_google_gwt_user_client_ui_Image$State$1_this$11 = this$1;
  this.com_google_gwt_user_client_ui_Image$State$1_val$image2 = val$image;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(250, 1, {}, com_google_gwt_user_client_ui_Image$State$1_Image$State$1__Lcom_google_gwt_user_client_ui_Image$State_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Image$State$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'Image/State/1', 250);
function com_google_gwt_user_client_ui_Image$UnclippedState_$getImageElement__Lcom_google_gwt_user_client_ui_Image$UnclippedState_2Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_dom_client_ImageElement_2(image){
  return com_google_gwt_user_client_DOM_$clinit__V() , image.com_google_gwt_user_client_ui_UIObject_element;
}

function com_google_gwt_user_client_ui_Image$UnclippedState_$setUrl__Lcom_google_gwt_user_client_ui_Image$UnclippedState_2Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_safehtml_shared_SafeUri_2IIV(image, url_0, width_0, height){
  !!image.com_google_gwt_user_client_ui_Image_state && com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , image.com_google_gwt_user_client_ui_UIObject_element), $intern_39, '');
  com_google_gwt_dom_client_ImageElement_$setSrc__Lcom_google_gwt_dom_client_ImageElement_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , image.com_google_gwt_user_client_ui_UIObject_element), url_0.com_google_gwt_safehtml_shared_SafeUriString_uri);
  com_google_gwt_dom_client_ImageElement_$setWidth__Lcom_google_gwt_dom_client_ImageElement_2IV(image.com_google_gwt_user_client_ui_UIObject_element, width_0);
  com_google_gwt_dom_client_ImageElement_$setHeight__Lcom_google_gwt_dom_client_ImageElement_2IV(image.com_google_gwt_user_client_ui_UIObject_element, height);
}

function com_google_gwt_user_client_ui_Image$UnclippedState_Image$UnclippedState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_safehtml_shared_SafeUri_2V(image, url_0){
  com_google_gwt_user_client_ui_Widget_$replaceElement__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_dom_client_Element_2V(image, $doc.createElement('img'));
  com_google_gwt_user_client_Event_sinkEvents__Lcom_google_gwt_dom_client_Element_2IV((com_google_gwt_user_client_DOM_$clinit__V() , image.com_google_gwt_user_client_ui_UIObject_element));
  image.com_google_gwt_user_client_ui_Widget_eventsToSink == -1?com_google_gwt_user_client_impl_DOMImplMozilla_$sinkEvents__Lcom_google_gwt_user_client_impl_DOMImplMozilla_2Lcom_google_gwt_dom_client_Element_2IV(image.com_google_gwt_user_client_ui_UIObject_element, 133398655 | (image.com_google_gwt_user_client_ui_UIObject_element.__eventBits || 0)):(image.com_google_gwt_user_client_ui_Widget_eventsToSink |= 133398655);
  !!image.com_google_gwt_user_client_ui_Image_state && com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(image.com_google_gwt_user_client_ui_UIObject_element, $intern_39, '');
  com_google_gwt_dom_client_ImageElement_$setSrc__Lcom_google_gwt_dom_client_ImageElement_2Ljava_lang_String_2V(image.com_google_gwt_user_client_ui_UIObject_element, url_0.com_google_gwt_safehtml_shared_SafeUriString_uri);
}

function com_google_gwt_user_client_ui_Image$UnclippedState_Image$UnclippedState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_safehtml_shared_SafeUri_2IIV(image, url_0, width_0, height){
  com_google_gwt_user_client_ui_Image$UnclippedState_Image$UnclippedState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_safehtml_shared_SafeUri_2V.call(this, image, url_0);
  com_google_gwt_dom_client_ImageElement_$setWidth__Lcom_google_gwt_dom_client_ImageElement_2IV((com_google_gwt_user_client_DOM_$clinit__V() , image.com_google_gwt_user_client_ui_UIObject_element), width_0);
  com_google_gwt_dom_client_ImageElement_$setHeight__Lcom_google_gwt_dom_client_ImageElement_2IV(image.com_google_gwt_user_client_ui_UIObject_element, height);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(91, 249, {}, com_google_gwt_user_client_ui_Image$UnclippedState_Image$UnclippedState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_safehtml_shared_SafeUri_2V, com_google_gwt_user_client_ui_Image$UnclippedState_Image$UnclippedState__Lcom_google_gwt_user_client_ui_Image_2Lcom_google_gwt_safehtml_shared_SafeUri_2IIV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Image$UnclippedState_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'Image/UnclippedState', 91);
function com_google_gwt_user_client_ui_ListBox_$addItem__Lcom_google_gwt_user_client_ui_ListBox_2Ljava_lang_String_2V(this$static, item_0){
  com_google_gwt_user_client_ui_ListBox_$insertItem__Lcom_google_gwt_user_client_ui_ListBox_2Ljava_lang_String_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2Ljava_lang_String_2IV(this$static, item_0, item_0, -1);
}

function com_google_gwt_user_client_ui_ListBox_$checkIndex__Lcom_google_gwt_user_client_ui_ListBox_2IV(this$static, index_0){
  if (index_0 < 0 || index_0 >= (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element).options.length) {
    throw new java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V;
  }
}

function com_google_gwt_user_client_ui_ListBox_$getValue__Lcom_google_gwt_user_client_ui_ListBox_2ILjava_lang_String_2(this$static, index_0){
  com_google_gwt_user_client_ui_ListBox_$checkIndex__Lcom_google_gwt_user_client_ui_ListBox_2IV(this$static, index_0);
  return (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element).options[index_0].value;
}

function com_google_gwt_user_client_ui_ListBox_$insertItem__Lcom_google_gwt_user_client_ui_ListBox_2Ljava_lang_String_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2Ljava_lang_String_2IV(this$static, item_0, value_0, index_0){
  var before, itemCount, option, select;
  select = (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element);
  option = $doc.createElement('option');
  option.text = item_0;
  com_google_gwt_dom_client_Element_$removeAttribute__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(option, 'bidiwrapped');
  option.value = value_0;
  itemCount = select.options.length;
  (index_0 < 0 || index_0 > itemCount) && (index_0 = itemCount);
  if (index_0 == itemCount) {
    com_google_gwt_dom_client_DOMImpl_$selectAdd__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_SelectElement_2Lcom_google_gwt_dom_client_OptionElement_2Lcom_google_gwt_dom_client_OptionElement_2V(select, option, null);
  }
   else {
    before = select.options[index_0];
    com_google_gwt_dom_client_DOMImpl_$selectAdd__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_SelectElement_2Lcom_google_gwt_dom_client_OptionElement_2Lcom_google_gwt_dom_client_OptionElement_2V(select, option, before);
  }
}

function com_google_gwt_user_client_ui_ListBox_ListBox__V(){
  com_google_gwt_user_client_ui_FocusWidget_FocusWidget__Lcom_google_gwt_dom_client_Element_2V.call(this, $doc.createElement('select'));
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), 'gwt-ListBox');
}

function com_google_gwt_user_client_ui_ListBox_ListBox__ZV(){
  com_google_gwt_user_client_ui_ListBox_ListBox__V.call(this);
  (com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element).multiple = false;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(103, 102, $intern_42, com_google_gwt_user_client_ui_ListBox_ListBox__V, com_google_gwt_user_client_ui_ListBox_ListBox__ZV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ListBox_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'ListBox', 103);
function com_google_gwt_user_client_ui_PotentialElement_$clinit__V(){
  com_google_gwt_user_client_ui_PotentialElement_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_ui_PotentialElement_declareShim__V();
}

function com_google_gwt_user_client_ui_PotentialElement_$setResolver__Lcom_google_gwt_user_client_ui_PotentialElement_2Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_dom_client_Element_2(this$static, resolver){
  com_google_gwt_user_client_ui_PotentialElement_$clinit__V();
  this$static.__gwt_resolve = com_google_gwt_user_client_ui_PotentialElement_buildResolveCallback__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(resolver);
}

function com_google_gwt_user_client_ui_PotentialElement_buildResolveCallback__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(resolver){
  return function(){
    this.__gwt_resolve = com_google_gwt_user_client_ui_PotentialElement_cannotResolveTwice__V;
    return resolver.resolvePotentialElement__Lcom_google_gwt_dom_client_Element_2();
  }
  ;
}

function com_google_gwt_user_client_ui_PotentialElement_cannotResolveTwice__V(){
  throw 'A PotentialElement cannot be resolved twice.';
}

function com_google_gwt_user_client_ui_PotentialElement_declareShim__V(){
  var shim = function(){
  }
  ;
  shim.prototype = {className:'', clientHeight:0, clientWidth:0, dir:'', getAttribute:function(name_0, value_0){
    return this[name_0];
  }
  , href:'', id:'', lang:'', nodeType:1, removeAttribute:function(name_0, value_0){
    this[name_0] = undefined;
  }
  , setAttribute:function(name_0, value_0){
    this[name_0] = value_0;
  }
  , src:'', style:{}, title:''};
  $wnd.GwtPotentialElementShim = shim;
}

function com_google_gwt_user_client_ui_RootPanel_$clinit__V(){
  com_google_gwt_user_client_ui_RootPanel_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_ui_RootPanel_maybeDetachCommand = new com_google_gwt_user_client_ui_RootPanel$1_RootPanel$1__V;
  com_google_gwt_user_client_ui_RootPanel_rootPanels = new java_util_HashMap_HashMap__V;
  com_google_gwt_user_client_ui_RootPanel_widgetsToDetach = new java_util_HashSet_HashSet__V;
}

function com_google_gwt_user_client_ui_RootPanel_RootPanel__Lcom_google_gwt_dom_client_Element_2V(elem){
  com_google_gwt_user_client_ui_ComplexPanel_ComplexPanel__V.call(this);
  com_google_gwt_user_client_ui_UIObject_$setElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2V(this, (com_google_gwt_user_client_DOM_$clinit__V() , elem));
  com_google_gwt_user_client_ui_Widget_$onAttach__Lcom_google_gwt_user_client_ui_Widget_2V(this);
}

function com_google_gwt_user_client_ui_RootPanel_detachNow__Lcom_google_gwt_user_client_ui_Widget_2V(widget){
  com_google_gwt_user_client_ui_RootPanel_$clinit__V();
  try {
    widget.onDetach__V();
  }
   finally {
    java_util_HashSet_$remove__Ljava_util_HashSet_2Ljava_lang_Object_2Z(com_google_gwt_user_client_ui_RootPanel_widgetsToDetach, widget);
  }
}

function com_google_gwt_user_client_ui_RootPanel_detachWidgets__V(){
  com_google_gwt_user_client_ui_RootPanel_$clinit__V();
  try {
    com_google_gwt_user_client_ui_AttachDetachException_tryCommand__Ljava_lang_Iterable_2Lcom_google_gwt_user_client_ui_AttachDetachException$Command_2V(com_google_gwt_user_client_ui_RootPanel_widgetsToDetach, com_google_gwt_user_client_ui_RootPanel_maybeDetachCommand);
  }
   finally {
    com_google_gwt_user_client_ui_RootPanel_widgetsToDetach.java_util_HashSet_map.clear__V();
    com_google_gwt_user_client_ui_RootPanel_rootPanels.clear__V();
  }
}

function com_google_gwt_user_client_ui_RootPanel_get__Ljava_lang_String_2Lcom_google_gwt_user_client_ui_RootPanel_2(){
  com_google_gwt_user_client_ui_RootPanel_$clinit__V();
  var elem, rp;
  rp = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_user_client_ui_RootPanel_rootPanels.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_51), 70);
  if (!(elem = $doc.getElementById($intern_51))) {
    return null;
  }
  if (rp) {
    if (!elem || (com_google_gwt_user_client_DOM_$clinit__V() , rp.com_google_gwt_user_client_ui_UIObject_element == elem)) {
      return rp;
    }
  }
  com_google_gwt_user_client_ui_RootPanel_rootPanels.size__I() == 0 && com_google_gwt_user_client_Window_addCloseHandler__Lcom_google_gwt_event_logical_shared_CloseHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(new com_google_gwt_user_client_ui_RootPanel$2_RootPanel$2__V);
  !elem?(rp = new com_google_gwt_user_client_ui_RootPanel$DefaultRootPanel_RootPanel$DefaultRootPanel__V):(rp = new com_google_gwt_user_client_ui_RootPanel_RootPanel__Lcom_google_gwt_dom_client_Element_2V(elem));
  com_google_gwt_user_client_ui_RootPanel_rootPanels.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2($intern_51, rp);
  java_util_HashSet_$add__Ljava_util_HashSet_2Ljava_lang_Object_2Z(com_google_gwt_user_client_ui_RootPanel_widgetsToDetach, rp);
  return rp;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(70, 158, $intern_52, com_google_gwt_user_client_ui_RootPanel_RootPanel__Lcom_google_gwt_dom_client_Element_2V);
var com_google_gwt_user_client_ui_RootPanel_maybeDetachCommand, com_google_gwt_user_client_ui_RootPanel_rootPanels, com_google_gwt_user_client_ui_RootPanel_widgetsToDetach;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1RootPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'RootPanel', 70);
function com_google_gwt_user_client_ui_RootPanel$1_RootPanel$1__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(160, 1, {}, com_google_gwt_user_client_ui_RootPanel$1_RootPanel$1__V);
_.execute__Lcom_google_gwt_user_client_ui_Widget_2V = function com_google_gwt_user_client_ui_RootPanel$1_execute__Lcom_google_gwt_user_client_ui_Widget_2V(w){
  w.isAttached__Z() && w.onDetach__V();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1RootPanel$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'RootPanel/1', 160);
function com_google_gwt_user_client_ui_RootPanel$2_RootPanel$2__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(161, 1, {287:1, 38:1}, com_google_gwt_user_client_ui_RootPanel$2_RootPanel$2__V);
_.onClose__Lcom_google_gwt_event_logical_shared_CloseEvent_2V = function com_google_gwt_user_client_ui_RootPanel$2_onClose__Lcom_google_gwt_event_logical_shared_CloseEvent_2V(closeEvent){
  com_google_gwt_user_client_ui_RootPanel_detachWidgets__V();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1RootPanel$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'RootPanel/2', 161);
function com_google_gwt_user_client_ui_RootPanel$DefaultRootPanel_RootPanel$DefaultRootPanel__V(){
  com_google_gwt_user_client_ui_RootPanel_RootPanel__Lcom_google_gwt_dom_client_Element_2V.call(this, $doc.body);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(159, 70, $intern_52, com_google_gwt_user_client_ui_RootPanel$DefaultRootPanel_RootPanel$DefaultRootPanel__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1RootPanel$DefaultRootPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'RootPanel/DefaultRootPanel', 159);
function com_google_gwt_user_client_ui_SimplePanel$1_$next__Lcom_google_gwt_user_client_ui_SimplePanel$1_2Lcom_google_gwt_user_client_ui_Widget_2(this$static){
  if (!this$static.com_google_gwt_user_client_ui_SimplePanel$1_hasElement || !this$static.com_google_gwt_user_client_ui_SimplePanel$1_this$01.com_google_gwt_user_client_ui_SimplePanel_widget) {
    throw new java_util_NoSuchElementException_NoSuchElementException__V;
  }
  this$static.com_google_gwt_user_client_ui_SimplePanel$1_hasElement = false;
  return this$static.com_google_gwt_user_client_ui_SimplePanel$1_this$01.com_google_gwt_user_client_ui_SimplePanel_widget;
}

function com_google_gwt_user_client_ui_SimplePanel$1_SimplePanel$1__Lcom_google_gwt_user_client_ui_SimplePanel_2V(this$0){
  this.com_google_gwt_user_client_ui_SimplePanel$1_this$01 = this$0;
  this.com_google_gwt_user_client_ui_SimplePanel$1_hasElement = !!this.com_google_gwt_user_client_ui_SimplePanel$1_this$01.com_google_gwt_user_client_ui_SimplePanel_widget;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(273, 1, {}, com_google_gwt_user_client_ui_SimplePanel$1_SimplePanel$1__Lcom_google_gwt_user_client_ui_SimplePanel_2V);
_.hasNext__Z = function com_google_gwt_user_client_ui_SimplePanel$1_hasNext__Z(){
  return this.com_google_gwt_user_client_ui_SimplePanel$1_hasElement;
}
;
_.next__Ljava_lang_Object_2 = function com_google_gwt_user_client_ui_SimplePanel$1_next__Ljava_lang_Object_2(){
  return com_google_gwt_user_client_ui_SimplePanel$1_$next__Lcom_google_gwt_user_client_ui_SimplePanel$1_2Lcom_google_gwt_user_client_ui_Widget_2(this);
}
;
_.com_google_gwt_user_client_ui_SimplePanel$1_hasElement = false;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1SimplePanel$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'SimplePanel/1', 273);
function com_google_gwt_user_client_ui_ValueBoxBase_$cancelKey__Lcom_google_gwt_user_client_ui_ValueBoxBase_2V(this$static){
  !!this$static.com_google_gwt_user_client_ui_ValueBoxBase_currentEvent && com_google_gwt_dom_client_DOMImplStandard_$eventPreventDefault__Lcom_google_gwt_dom_client_DOMImplStandard_2Lcom_google_gwt_dom_client_NativeEvent_2V(this$static.com_google_gwt_user_client_ui_ValueBoxBase_currentEvent);
}

function com_google_gwt_user_client_ui_ValueBoxBase_$getText__Lcom_google_gwt_user_client_ui_ValueBoxBase_2Ljava_lang_String_2(this$static){
  return com_google_gwt_dom_client_Element_$getPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), $intern_53);
}

function com_google_gwt_user_client_ui_ValueBoxBase_$setReadOnly__Lcom_google_gwt_user_client_ui_ValueBoxBase_2ZV(this$static, readOnly){
  (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element)['readOnly'] = readOnly;
  readOnly?com_google_gwt_user_client_ui_UIObject_$setStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2ZV(this$static, com_google_gwt_user_client_ui_UIObject_getStylePrimaryName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(this$static.com_google_gwt_user_client_ui_UIObject_element) + '-' + 'readonly', true):com_google_gwt_user_client_ui_UIObject_$setStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2ZV(this$static, com_google_gwt_user_client_ui_UIObject_getStylePrimaryName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2(this$static.com_google_gwt_user_client_ui_UIObject_element) + '-' + 'readonly', false);
}

function com_google_gwt_user_client_ui_ValueBoxBase_$setText__Lcom_google_gwt_user_client_ui_ValueBoxBase_2Ljava_lang_String_2V(this$static, text_0){
  (com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element)[$intern_53] = text_0 != null?text_0:'';
}

function com_google_gwt_user_client_ui_ValueBoxBase_ValueBoxBase__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_text_shared_Renderer_2Lcom_google_gwt_text_shared_Parser_2V(elem){
  com_google_gwt_user_client_ui_FocusWidget_FocusWidget__Lcom_google_gwt_dom_client_Element_2V.call(this, elem);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(251, 102, $intern_42);
_.onBrowserEvent__Lcom_google_gwt_user_client_Event_2V = function com_google_gwt_user_client_ui_ValueBoxBase_onBrowserEvent__Lcom_google_gwt_user_client_Event_2V(event_0){
  var type_0;
  type_0 = (com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_user_client_impl_DOMImpl_$eventGetTypeInt__Lcom_google_gwt_user_client_impl_DOMImpl_2Ljava_lang_String_2I(event_0.type));
  if ((type_0 & 896) != 0) {
    this.com_google_gwt_user_client_ui_ValueBoxBase_currentEvent = event_0;
    com_google_gwt_user_client_ui_Widget_$onBrowserEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Event_2V(this, event_0);
    this.com_google_gwt_user_client_ui_ValueBoxBase_currentEvent = null;
  }
   else {
    com_google_gwt_user_client_ui_Widget_$onBrowserEvent__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Event_2V(this, event_0);
  }
}
;
_.onLoad__V = function com_google_gwt_user_client_ui_ValueBoxBase_onLoad__V(){
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ValueBoxBase_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'ValueBoxBase', 251);
function com_google_gwt_user_client_ui_TextBoxBase_$clinit__V(){
  com_google_gwt_user_client_ui_TextBoxBase_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_$clinit__V();
}

function com_google_gwt_user_client_ui_TextBoxBase_TextBoxBase__Lcom_google_gwt_dom_client_Element_2V(elem){
  com_google_gwt_user_client_ui_ValueBoxBase_ValueBoxBase__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_text_shared_Renderer_2Lcom_google_gwt_text_shared_Parser_2V.call(this, elem, (!com_google_gwt_text_shared_testing_PassthroughRenderer_INSTANCE && (com_google_gwt_text_shared_testing_PassthroughRenderer_INSTANCE = new com_google_gwt_text_shared_testing_PassthroughRenderer_PassthroughRenderer__V) , !com_google_gwt_text_shared_testing_PassthroughParser_INSTANCE && (com_google_gwt_text_shared_testing_PassthroughParser_INSTANCE = new com_google_gwt_text_shared_testing_PassthroughParser_PassthroughParser__V)));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(141, 251, $intern_42);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1TextBoxBase_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'TextBoxBase', 141);
function com_google_gwt_user_client_ui_TextArea_$setVisibleLines__Lcom_google_gwt_user_client_ui_TextArea_2IV(this$static, lines){
  com_google_gwt_dom_client_TextAreaElement_$setRows__Lcom_google_gwt_dom_client_TextAreaElement_2IV((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), lines);
}

function com_google_gwt_user_client_ui_TextArea_TextArea__V(){
  com_google_gwt_user_client_ui_TextBoxBase_$clinit__V();
  com_google_gwt_user_client_ui_TextBoxBase_TextBoxBase__Lcom_google_gwt_dom_client_Element_2V.call(this, $doc.createElement('textarea'));
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), 'gwt-TextArea');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(111, 141, {14:1, 11:1, 13:1, 12:1, 15:1, 111:1, 10:1, 8:1}, com_google_gwt_user_client_ui_TextArea_TextArea__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1TextArea_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'TextArea', 111);
function com_google_gwt_user_client_ui_TextBox_$setMaxLength__Lcom_google_gwt_user_client_ui_TextBox_2IV(this$static, length_0){
  com_google_gwt_dom_client_InputElement_$setMaxLength__Lcom_google_gwt_dom_client_InputElement_2IV((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), length_0);
}

function com_google_gwt_user_client_ui_TextBox_$setVisibleLength__Lcom_google_gwt_user_client_ui_TextBox_2IV(this$static, length_0){
  com_google_gwt_dom_client_InputElement_$setSize__Lcom_google_gwt_dom_client_InputElement_2IV((com_google_gwt_user_client_DOM_$clinit__V() , this$static.com_google_gwt_user_client_ui_UIObject_element), length_0);
}

function com_google_gwt_user_client_ui_TextBox_TextBox__V(){
  var com_google_gwt_dom_client_DOMImpl_$createInputElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2Lcom_google_gwt_dom_client_InputElement_2_e_0;
  com_google_gwt_user_client_ui_TextBoxBase_$clinit__V();
  com_google_gwt_user_client_ui_TextBox_TextBox__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V.call(this, (com_google_gwt_dom_client_DOMImpl_$createInputElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2Lcom_google_gwt_dom_client_InputElement_2_e_0 = $doc.createElement('INPUT') , com_google_gwt_dom_client_DOMImpl_$createInputElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2Lcom_google_gwt_dom_client_InputElement_2_e_0.type = 'text' , com_google_gwt_dom_client_DOMImpl_$createInputElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Document_2Ljava_lang_String_2Lcom_google_gwt_dom_client_InputElement_2_e_0));
}

function com_google_gwt_user_client_ui_TextBox_TextBox__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V(element){
  com_google_gwt_user_client_ui_TextBoxBase_TextBoxBase__Lcom_google_gwt_dom_client_Element_2V.call(this, element);
  com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_UIObject_element), 'gwt-TextBox');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(37, 141, {14:1, 11:1, 13:1, 12:1, 15:1, 37:1, 10:1, 8:1}, com_google_gwt_user_client_ui_TextBox_TextBox__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1TextBox_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'TextBox', 37);
function com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_$clinit__V(){
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_CENTER = new com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$1_ValueBoxBase$TextAlignment$1__Ljava_lang_String_2IV;
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_JUSTIFY = new com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$2_ValueBoxBase$TextAlignment$2__Ljava_lang_String_2IV;
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_LEFT = new com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$3_ValueBoxBase$TextAlignment$3__Ljava_lang_String_2IV;
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_RIGHT = new com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$4_ValueBoxBase$TextAlignment$4__Ljava_lang_String_2IV;
}

function com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_ValueBoxBase$TextAlignment__Ljava_lang_String_2IV(enum$name, enum$ordinal){
  java_lang_Enum_Enum__Ljava_lang_String_2IV.call(this, enum$name, enum$ordinal);
}

function com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_values___3Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2(){
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_$clinit__V();
  return com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ValueBoxBase$TextAlignment_12_1classLit, 1), $intern_14, 40, 0, [com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_CENTER, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_JUSTIFY, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_LEFT, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_RIGHT]);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(40, 22, $intern_54);
var com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_CENTER, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_JUSTIFY, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_LEFT, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_RIGHT;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ValueBoxBase$TextAlignment_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_41, 'ValueBoxBase/TextAlignment', 40, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_values___3Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2);
function com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$1_ValueBoxBase$TextAlignment$1__Ljava_lang_String_2IV(){
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_ValueBoxBase$TextAlignment__Ljava_lang_String_2IV.call(this, 'CENTER', 0);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(252, 40, $intern_54, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$1_ValueBoxBase$TextAlignment$1__Ljava_lang_String_2IV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ValueBoxBase$TextAlignment$1_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_41, 'ValueBoxBase/TextAlignment/1', 252, null);
function com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$2_ValueBoxBase$TextAlignment$2__Ljava_lang_String_2IV(){
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_ValueBoxBase$TextAlignment__Ljava_lang_String_2IV.call(this, 'JUSTIFY', 1);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(253, 40, $intern_54, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$2_ValueBoxBase$TextAlignment$2__Ljava_lang_String_2IV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ValueBoxBase$TextAlignment$2_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_41, 'ValueBoxBase/TextAlignment/2', 253, null);
function com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$3_ValueBoxBase$TextAlignment$3__Ljava_lang_String_2IV(){
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_ValueBoxBase$TextAlignment__Ljava_lang_String_2IV.call(this, 'LEFT', 2);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(254, 40, $intern_54, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$3_ValueBoxBase$TextAlignment$3__Ljava_lang_String_2IV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ValueBoxBase$TextAlignment$3_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_41, 'ValueBoxBase/TextAlignment/3', 254, null);
function com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$4_ValueBoxBase$TextAlignment$4__Ljava_lang_String_2IV(){
  com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_ValueBoxBase$TextAlignment__Ljava_lang_String_2IV.call(this, 'RIGHT', 3);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(255, 40, $intern_54, com_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$4_ValueBoxBase$TextAlignment$4__Ljava_lang_String_2IV);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1ValueBoxBase$TextAlignment$4_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_41, 'ValueBoxBase/TextAlignment/4', 255, null);
function com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, w){
  var td, tr;
  tr = (com_google_gwt_user_client_DOM_$clinit__V() , $doc.createElement('tr'));
  td = com_google_gwt_user_client_ui_VerticalPanel_$createAlignedTd__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_dom_client_Element_2(this$static);
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(tr, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(td));
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(this$static.com_google_gwt_user_client_ui_CellPanel_body, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(tr));
  com_google_gwt_user_client_ui_ComplexPanel_$add__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2V(this$static, w, td);
}

function com_google_gwt_user_client_ui_VerticalPanel_$createAlignedTd__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_dom_client_Element_2(this$static){
  var td;
  td = (com_google_gwt_user_client_DOM_$clinit__V() , $doc.createElement('td'));
  com_google_gwt_user_client_ui_CellPanel_$setCellHorizontalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(td, this$static.com_google_gwt_user_client_ui_VerticalPanel_horzAlign);
  com_google_gwt_user_client_ui_CellPanel_$setCellVerticalAlignment__Lcom_google_gwt_user_client_ui_CellPanel_2Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V(td, this$static.com_google_gwt_user_client_ui_VerticalPanel_vertAlign);
  return td;
}

function com_google_gwt_user_client_ui_VerticalPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this$static, align_0){
  this$static.com_google_gwt_user_client_ui_VerticalPanel_horzAlign = align_0;
}

function com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V(){
  com_google_gwt_user_client_ui_CellPanel_CellPanel__V.call(this);
  this.com_google_gwt_user_client_ui_VerticalPanel_horzAlign = (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1DEFAULT);
  this.com_google_gwt_user_client_ui_VerticalPanel_vertAlign = (com_google_gwt_user_client_ui_HasVerticalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasVerticalAlignment_ALIGN_1TOP);
  com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , this.com_google_gwt_user_client_ui_CellPanel_table), $intern_46, '0');
  com_google_gwt_dom_client_Element_$setPropertyString__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V(this.com_google_gwt_user_client_ui_CellPanel_table, $intern_50, '0');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(34, 99, $intern_44, com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V);
_.add__Lcom_google_gwt_user_client_ui_Widget_2V = function com_google_gwt_user_client_ui_VerticalPanel_add__Lcom_google_gwt_user_client_ui_Widget_2V(w){
  com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this, w);
}
;
_.insert__Lcom_google_gwt_user_client_ui_Widget_2IV = function com_google_gwt_user_client_ui_VerticalPanel_insert__Lcom_google_gwt_user_client_ui_Widget_2IV(w, beforeIndex){
  var td, tr;
  com_google_gwt_user_client_ui_ComplexPanel_$checkIndexBoundsForInsertion__Lcom_google_gwt_user_client_ui_ComplexPanel_2IV(this, beforeIndex);
  tr = (com_google_gwt_user_client_DOM_$clinit__V() , $doc.createElement('tr'));
  td = com_google_gwt_user_client_ui_VerticalPanel_$createAlignedTd__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_dom_client_Element_2(this);
  com_google_gwt_dom_client_Node_$appendChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(tr, com_google_gwt_user_client_DOM_resolve__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2(td));
  com_google_gwt_user_client_DOM_insertChild__Lcom_google_gwt_dom_client_Element_2Lcom_google_gwt_dom_client_Element_2IV(this.com_google_gwt_user_client_ui_CellPanel_body, tr, beforeIndex);
  com_google_gwt_user_client_ui_ComplexPanel_$insert__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_Element_2IZV(this, w, td, beforeIndex, false);
}
;
_.remove__Lcom_google_gwt_user_client_ui_Widget_2Z = function com_google_gwt_user_client_ui_VerticalPanel_remove__Lcom_google_gwt_user_client_ui_Widget_2Z(w){
  var removed, td;
  td = (com_google_gwt_user_client_DOM_$clinit__V() , com_google_gwt_dom_client_DOMImpl_$getParentElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Element_2(w.com_google_gwt_user_client_ui_UIObject_element));
  removed = com_google_gwt_user_client_ui_ComplexPanel_$remove__Lcom_google_gwt_user_client_ui_ComplexPanel_2Lcom_google_gwt_user_client_ui_Widget_2Z(this, w);
  removed && com_google_gwt_dom_client_Node_$removeChild__Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Node_2(this.com_google_gwt_user_client_ui_CellPanel_body, com_google_gwt_dom_client_DOMImpl_$getParentElement__Lcom_google_gwt_dom_client_DOMImpl_2Lcom_google_gwt_dom_client_Node_2Lcom_google_gwt_dom_client_Element_2(td));
  return removed;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1VerticalPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'VerticalPanel', 34);
function com_google_gwt_user_client_ui_WidgetCollection_$add__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, w){
  com_google_gwt_user_client_ui_WidgetCollection_$insert__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2IV(this$static, w, this$static.com_google_gwt_user_client_ui_WidgetCollection_size);
}

function com_google_gwt_user_client_ui_WidgetCollection_$indexOf__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2I(this$static, w){
  var i;
  for (i = 0; i < this$static.com_google_gwt_user_client_ui_WidgetCollection_size; ++i) {
    if (this$static.com_google_gwt_user_client_ui_WidgetCollection_array[i] == w) {
      return i;
    }
  }
  return -1;
}

function com_google_gwt_user_client_ui_WidgetCollection_$insert__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2IV(this$static, w, beforeIndex){
  var i, i0, newArray;
  if (beforeIndex < 0 || beforeIndex > this$static.com_google_gwt_user_client_ui_WidgetCollection_size) {
    throw new java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V;
  }
  if (this$static.com_google_gwt_user_client_ui_WidgetCollection_size == this$static.com_google_gwt_user_client_ui_WidgetCollection_array.length) {
    newArray = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Widget_12_1classLit, $intern_14, 8, this$static.com_google_gwt_user_client_ui_WidgetCollection_array.length * 2, 0, 1);
    for (i0 = 0; i0 < this$static.com_google_gwt_user_client_ui_WidgetCollection_array.length; ++i0) {
      com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(newArray, i0, this$static.com_google_gwt_user_client_ui_WidgetCollection_array[i0]);
    }
    this$static.com_google_gwt_user_client_ui_WidgetCollection_array = newArray;
  }
  ++this$static.com_google_gwt_user_client_ui_WidgetCollection_size;
  for (i = this$static.com_google_gwt_user_client_ui_WidgetCollection_size - 1; i > beforeIndex; --i) {
    com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(this$static.com_google_gwt_user_client_ui_WidgetCollection_array, i, this$static.com_google_gwt_user_client_ui_WidgetCollection_array[i - 1]);
  }
  com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(this$static.com_google_gwt_user_client_ui_WidgetCollection_array, beforeIndex, w);
}

function com_google_gwt_user_client_ui_WidgetCollection_$remove__Lcom_google_gwt_user_client_ui_WidgetCollection_2IV(this$static, index_0){
  var i;
  if (index_0 < 0 || index_0 >= this$static.com_google_gwt_user_client_ui_WidgetCollection_size) {
    throw new java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V;
  }
  --this$static.com_google_gwt_user_client_ui_WidgetCollection_size;
  for (i = index_0; i < this$static.com_google_gwt_user_client_ui_WidgetCollection_size; ++i) {
    com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(this$static.com_google_gwt_user_client_ui_WidgetCollection_array, i, this$static.com_google_gwt_user_client_ui_WidgetCollection_array[i + 1]);
  }
  com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(this$static.com_google_gwt_user_client_ui_WidgetCollection_array, this$static.com_google_gwt_user_client_ui_WidgetCollection_size, null);
}

function com_google_gwt_user_client_ui_WidgetCollection_$remove__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, w){
  var index_0;
  index_0 = com_google_gwt_user_client_ui_WidgetCollection_$indexOf__Lcom_google_gwt_user_client_ui_WidgetCollection_2Lcom_google_gwt_user_client_ui_Widget_2I(this$static, w);
  if (index_0 == -1) {
    throw new java_util_NoSuchElementException_NoSuchElementException__V;
  }
  com_google_gwt_user_client_ui_WidgetCollection_$remove__Lcom_google_gwt_user_client_ui_WidgetCollection_2IV(this$static, index_0);
}

function com_google_gwt_user_client_ui_WidgetCollection_WidgetCollection__Lcom_google_gwt_user_client_ui_HasWidgets_2V(parent_0){
  this.com_google_gwt_user_client_ui_WidgetCollection_parent = parent_0;
  this.com_google_gwt_user_client_ui_WidgetCollection_array = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1Widget_12_1classLit, $intern_14, 8, 4, 0, 1);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(194, 1, {}, com_google_gwt_user_client_ui_WidgetCollection_WidgetCollection__Lcom_google_gwt_user_client_ui_HasWidgets_2V);
_.iterator__Ljava_util_Iterator_2 = function com_google_gwt_user_client_ui_WidgetCollection_iterator__Ljava_util_Iterator_2(){
  return new com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_WidgetCollection$WidgetIterator__Lcom_google_gwt_user_client_ui_WidgetCollection_2V(this);
}
;
_.com_google_gwt_user_client_ui_WidgetCollection_size = 0;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1WidgetCollection_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'WidgetCollection', 194);
function com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_$next__Lcom_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_2Lcom_google_gwt_user_client_ui_Widget_2(this$static){
  if (this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_index >= this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_this$01.com_google_gwt_user_client_ui_WidgetCollection_size) {
    throw new java_util_NoSuchElementException_NoSuchElementException__V;
  }
  this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_currentWidget = this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_this$01.com_google_gwt_user_client_ui_WidgetCollection_array[this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_index];
  ++this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_index;
  return this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_currentWidget;
}

function com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_$remove__Lcom_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_2V(this$static){
  if (!this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_currentWidget) {
    throw new java_lang_IllegalStateException_IllegalStateException__V;
  }
  this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_this$01.com_google_gwt_user_client_ui_WidgetCollection_parent.remove__Lcom_google_gwt_user_client_ui_Widget_2Z(this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_currentWidget);
  --this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_index;
  this$static.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_currentWidget = null;
}

function com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_WidgetCollection$WidgetIterator__Lcom_google_gwt_user_client_ui_WidgetCollection_2V(this$0){
  this.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(73, 1, {}, com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_WidgetCollection$WidgetIterator__Lcom_google_gwt_user_client_ui_WidgetCollection_2V);
_.hasNext__Z = function com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_hasNext__Z(){
  return this.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_index < this.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_this$01.com_google_gwt_user_client_ui_WidgetCollection_size;
}
;
_.next__Ljava_lang_Object_2 = function com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_next__Ljava_lang_Object_2(){
  return com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_$next__Lcom_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_2Lcom_google_gwt_user_client_ui_Widget_2(this);
}
;
_.com_google_gwt_user_client_ui_WidgetCollection$WidgetIterator_index = 0;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1WidgetCollection$WidgetIterator_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'WidgetCollection/WidgetIterator', 73);
function com_google_gwt_user_client_ui_WidgetIterators$1_$gotoNextIndex__Lcom_google_gwt_user_client_ui_WidgetIterators$1_2V(this$static){
  ++this$static.com_google_gwt_user_client_ui_WidgetIterators$1_index;
  while (this$static.com_google_gwt_user_client_ui_WidgetIterators$1_index < this$static.com_google_gwt_user_client_ui_WidgetIterators$1_val$contained1.length) {
    if (this$static.com_google_gwt_user_client_ui_WidgetIterators$1_val$contained1[this$static.com_google_gwt_user_client_ui_WidgetIterators$1_index]) {
      return;
    }
    ++this$static.com_google_gwt_user_client_ui_WidgetIterators$1_index;
  }
}

function com_google_gwt_user_client_ui_WidgetIterators$1_$next__Lcom_google_gwt_user_client_ui_WidgetIterators$1_2Lcom_google_gwt_user_client_ui_Widget_2(this$static){
  var w;
  if (this$static.com_google_gwt_user_client_ui_WidgetIterators$1_index >= this$static.com_google_gwt_user_client_ui_WidgetIterators$1_val$contained1.length) {
    throw new java_util_NoSuchElementException_NoSuchElementException__V;
  }
  w = this$static.com_google_gwt_user_client_ui_WidgetIterators$1_val$contained1[this$static.com_google_gwt_user_client_ui_WidgetIterators$1_index];
  com_google_gwt_user_client_ui_WidgetIterators$1_$gotoNextIndex__Lcom_google_gwt_user_client_ui_WidgetIterators$1_2V(this$static);
  return w;
}

function com_google_gwt_user_client_ui_WidgetIterators$1_WidgetIterators$1__V(val$contained){
  this.com_google_gwt_user_client_ui_WidgetIterators$1_val$contained1 = val$contained;
  com_google_gwt_user_client_ui_WidgetIterators$1_$gotoNextIndex__Lcom_google_gwt_user_client_ui_WidgetIterators$1_2V(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(280, 1, {}, com_google_gwt_user_client_ui_WidgetIterators$1_WidgetIterators$1__V);
_.hasNext__Z = function com_google_gwt_user_client_ui_WidgetIterators$1_hasNext__Z(){
  return this.com_google_gwt_user_client_ui_WidgetIterators$1_index < this.com_google_gwt_user_client_ui_WidgetIterators$1_val$contained1.length;
}
;
_.next__Ljava_lang_Object_2 = function com_google_gwt_user_client_ui_WidgetIterators$1_next__Ljava_lang_Object_2(){
  return com_google_gwt_user_client_ui_WidgetIterators$1_$next__Lcom_google_gwt_user_client_ui_WidgetIterators$1_2Lcom_google_gwt_user_client_ui_Widget_2(this);
}
;
_.com_google_gwt_user_client_ui_WidgetIterators$1_index = -1;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1ui_1WidgetIterators$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_41, 'WidgetIterators/1', 280);
function com_google_gwt_useragent_client_UserAgentAsserter_assertCompileTimeUserAgent__V(){
  var runtimeValue;
  runtimeValue = com_google_gwt_useragent_client_UserAgentImplGecko1_18_$getRuntimeValue__Lcom_google_gwt_useragent_client_UserAgentImplGecko1_18_2Ljava_lang_String_2();
  if (!java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_55, runtimeValue)) {
    throw new com_google_gwt_useragent_client_UserAgentAsserter$UserAgentAssertionError_UserAgentAsserter$UserAgentAssertionError__Ljava_lang_String_2Ljava_lang_String_2V(runtimeValue);
  }
}

function java_lang_Error_Error__Ljava_lang_String_2Ljava_lang_Throwable_2V(message, cause){
  java_lang_Throwable_Throwable__Ljava_lang_String_2Ljava_lang_Throwable_2V.call(this, message, cause);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(94, 5, $intern_8);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Error_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Error', 94);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(26, 94, $intern_8);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1AssertionError_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'AssertionError', 26);
function com_google_gwt_useragent_client_UserAgentAsserter$UserAgentAssertionError_UserAgentAsserter$UserAgentAssertionError__Ljava_lang_String_2Ljava_lang_String_2V(runtimeValue){
  java_lang_Error_Error__Ljava_lang_String_2Ljava_lang_Throwable_2V.call(this, '' + ($intern_56 + runtimeValue + ').\n' + $intern_57), com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($intern_56 + runtimeValue + ').\n' + $intern_57, 5)?com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2($intern_56 + runtimeValue + ').\n' + $intern_57, 5):null);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(146, 26, $intern_8, com_google_gwt_useragent_client_UserAgentAsserter$UserAgentAssertionError_UserAgentAsserter$UserAgentAssertionError__Ljava_lang_String_2Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1useragent_1client_1UserAgentAsserter$UserAgentAssertionError_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2('com.google.gwt.useragent.client', 'UserAgentAsserter/UserAgentAssertionError', 146);
function com_google_gwt_useragent_client_UserAgentImplGecko1_18_$getRuntimeValue__Lcom_google_gwt_useragent_client_UserAgentImplGecko1_18_2Ljava_lang_String_2(){
  var ua = navigator.userAgent.toLowerCase();
  var docMode = $doc.documentMode;
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('msie') != -1 && docMode >= 10 && docMode < 11;
  }
  ())
    return 'ie10';
  if (function(){
    return ua.indexOf('msie') != -1 && docMode >= 9 && docMode < 11;
  }
  ())
    return 'ie9';
  if (function(){
    return ua.indexOf('msie') != -1 && docMode >= 8 && docMode < 11;
  }
  ())
    return 'ie8';
  if (function(){
    return ua.indexOf('gecko') != -1 || docMode >= 11;
  }
  ())
    return $intern_55;
  return 'unknown';
}

function com_google_gwt_xhr_client_XMLHttpRequest_$clearOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(this$static){
  this$static.onreadystatechange = function(){
  }
  ;
}

function com_google_gwt_xhr_client_XMLHttpRequest_$open__Lcom_google_gwt_xhr_client_XMLHttpRequest_2Ljava_lang_String_2Ljava_lang_String_2V(this$static, httpMethod, url_0){
  this$static.open(httpMethod, url_0, true);
}

function com_google_gwt_xhr_client_XMLHttpRequest_$setOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2Lcom_google_gwt_xhr_client_ReadyStateChangeHandler_2V(this$static, handler){
  var _this = this$static;
  this$static.onreadystatechange = $entry(function(){
    handler.onReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(_this);
  }
  );
}

function com_google_gwt_xml_client_DOMException_DOMException__SLjava_lang_String_2V(message){
  java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V.call(this, message);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(130, 17, $intern_9);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1DOMException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2('com.google.gwt.xml.client', 'DOMException', 130);
function com_google_gwt_xml_client_XMLParser_$clinit__V(){
  com_google_gwt_xml_client_XMLParser_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_xml_client_XMLParser_impl = (com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V() , com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V() , com_google_gwt_xml_client_impl_XMLParserImpl_impl);
}

function com_google_gwt_xml_client_XMLParser_removeWhitespaceInner__Lcom_google_gwt_xml_client_Node_2Lcom_google_gwt_xml_client_Node_2V(n, parent_0){
  com_google_gwt_xml_client_XMLParser_$clinit__V();
  var childNode, childNode$iterator, i, length_0, t, toBeProcessed;
  if (!!parent_0 && com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(n, 145) && !com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(n, 327)) {
    t = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(n, 145);
    java_lang_String_$matches__Ljava_lang_String_2Ljava_lang_String_2Z(t.getData__Ljava_lang_String_2(), '[ \t\n]*') && parent_0.removeChild__Lcom_google_gwt_xml_client_Node_2Lcom_google_gwt_xml_client_Node_2(t);
  }
  if (n.hasChildNodes__Z()) {
    length_0 = n.getChildNodes__Lcom_google_gwt_xml_client_NodeList_2().getLength__I();
    toBeProcessed = new java_util_ArrayList_ArrayList__V;
    for (i = 0; i < length_0; i++) {
      java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(toBeProcessed, n.getChildNodes__Lcom_google_gwt_xml_client_NodeList_2().item__ILcom_google_gwt_xml_client_Node_2(i));
    }
    for (childNode$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(toBeProcessed); childNode$iterator.java_util_AbstractList$IteratorImpl_i < childNode$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
      childNode = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(childNode$iterator.java_util_AbstractList$IteratorImpl_i < childNode$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(childNode$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(childNode$iterator.java_util_AbstractList$IteratorImpl_i++), 45));
      com_google_gwt_xml_client_XMLParser_removeWhitespaceInner__Lcom_google_gwt_xml_client_Node_2Lcom_google_gwt_xml_client_Node_2V(childNode, n);
    }
  }
}

var com_google_gwt_xml_client_XMLParser_impl;
function com_google_gwt_xml_client_impl_DOMItem_DOMItem__Lcom_google_gwt_core_client_JavaScriptObject_2V(jso){
  this.com_google_gwt_xml_client_impl_DOMItem_jsObject = jso;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(20, 1, {20:1});
_.equals__Ljava_lang_Object_2Z$ = function com_google_gwt_xml_client_impl_DOMItem_equals__Ljava_lang_Object_2Z(o){
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(o, 20)) {
    return this.com_google_gwt_xml_client_impl_DOMItem_jsObject == com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(o, 20).com_google_gwt_xml_client_impl_DOMItem_jsObject;
  }
  return false;
}
;
_.package_private$com_google_gwt_xml_client_impl_DOMItem$getJsObject__Lcom_google_gwt_core_client_JavaScriptObject_2 = function com_google_gwt_xml_client_impl_DOMItem_getJsObject__Lcom_google_gwt_core_client_JavaScriptObject_2(){
  return this.com_google_gwt_xml_client_impl_DOMItem_jsObject;
}
;
_.hashCode__I$ = function com_google_gwt_xml_client_impl_DOMItem_hashCode__I(){
  return com_google_gwt_core_client_impl_Impl_getHashCode__Ljava_lang_Object_2I(this.com_google_gwt_xml_client_impl_DOMItem_jsObject);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1DOMItem_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'DOMItem', 20);
function com_google_gwt_xml_client_impl_NodeImpl_NodeImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(jso){
  com_google_gwt_xml_client_impl_DOMItem_DOMItem__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, jso);
}

function com_google_gwt_xml_client_impl_NodeImpl_build__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_xml_client_Node_2(node){
  var nodeType;
  if (!node) {
    return null;
  }
  nodeType = com_google_gwt_xml_client_impl_XMLParserImpl_getNodeType__Lcom_google_gwt_core_client_JavaScriptObject_2S(node);
  switch (nodeType) {
    case 2:
      return new com_google_gwt_xml_client_impl_AttrImpl_AttrImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(node);
    case 4:
      return new com_google_gwt_xml_client_impl_CDATASectionImpl_CDATASectionImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(node);
    case 8:
      return new com_google_gwt_xml_client_impl_CommentImpl_CommentImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(node);
    case 11:
      return new com_google_gwt_xml_client_impl_DocumentFragmentImpl_DocumentFragmentImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(node);
    case 9:
      return new com_google_gwt_xml_client_impl_DocumentImpl_DocumentImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(node);
    case 1:
      return new com_google_gwt_xml_client_impl_ElementImpl_ElementImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(node);
    case 7:
      return new com_google_gwt_xml_client_impl_ProcessingInstructionImpl_ProcessingInstructionImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(node);
    case 3:
      return new com_google_gwt_xml_client_impl_TextImpl_TextImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(node);
    default:return new com_google_gwt_xml_client_impl_NodeImpl_NodeImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(node);
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(58, 20, $intern_59, com_google_gwt_xml_client_impl_NodeImpl_NodeImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
_.getChildNodes__Lcom_google_gwt_xml_client_NodeList_2 = function com_google_gwt_xml_client_impl_NodeImpl_getChildNodes__Lcom_google_gwt_xml_client_NodeList_2(){
  return new com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(com_google_gwt_xml_client_impl_XMLParserImpl_getChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(this.com_google_gwt_xml_client_impl_DOMItem_jsObject));
}
;
_.hasChildNodes__Z = function com_google_gwt_xml_client_impl_NodeImpl_hasChildNodes__Z(){
  return com_google_gwt_xml_client_impl_XMLParserImpl_hasChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Z(this.com_google_gwt_xml_client_impl_DOMItem_jsObject);
}
;
_.removeChild__Lcom_google_gwt_xml_client_Node_2Lcom_google_gwt_xml_client_Node_2 = function com_google_gwt_xml_client_impl_NodeImpl_removeChild__Lcom_google_gwt_xml_client_Node_2Lcom_google_gwt_xml_client_Node_2(oldChild){
  var e, oldChildJs, removeChildResults;
  try {
    oldChildJs = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(oldChild, 20).com_google_gwt_xml_client_impl_DOMItem_jsObject;
    removeChildResults = com_google_gwt_xml_client_impl_XMLParserImpl_removeChild__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(this.com_google_gwt_xml_client_impl_DOMItem_jsObject, oldChildJs);
    return com_google_gwt_xml_client_impl_NodeImpl_build__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_xml_client_Node_2(removeChildResults);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 31)) {
      e = $e0;
      throw new com_google_gwt_xml_client_impl_DOMNodeException_DOMNodeException__SLjava_lang_Throwable_2Lcom_google_gwt_xml_client_impl_DOMItem_2V(e, this);
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
  }
}
;
_.toString__Ljava_lang_String_2$ = function com_google_gwt_xml_client_impl_NodeImpl_toString__Ljava_lang_String_2(){
  return com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V() , com_google_gwt_xml_client_impl_XMLParserImplStandard_$toStringImpl__Lcom_google_gwt_xml_client_impl_XMLParserImplStandard_2Lcom_google_gwt_xml_client_impl_NodeImpl_2Ljava_lang_String_2(this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1NodeImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'NodeImpl', 58);
function com_google_gwt_xml_client_impl_AttrImpl_AttrImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_NodeImpl_NodeImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(230, 58, $intern_59, com_google_gwt_xml_client_impl_AttrImpl_AttrImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1AttrImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'AttrImpl', 230);
function com_google_gwt_xml_client_impl_CharacterDataImpl_CharacterDataImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_NodeImpl_NodeImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(133, 58, $intern_59);
_.getData__Ljava_lang_String_2 = function com_google_gwt_xml_client_impl_CharacterDataImpl_getData__Ljava_lang_String_2(){
  return com_google_gwt_xml_client_impl_XMLParserImpl_getData__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(this.com_google_gwt_xml_client_impl_DOMItem_jsObject);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1CharacterDataImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'CharacterDataImpl', 133);
function com_google_gwt_xml_client_impl_TextImpl_TextImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_CharacterDataImpl_CharacterDataImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(134, 133, {45:1, 145:1, 20:1}, com_google_gwt_xml_client_impl_TextImpl_TextImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
_.toString__Ljava_lang_String_2$ = function com_google_gwt_xml_client_impl_TextImpl_toString__Ljava_lang_String_2(){
  var b, i, x_0;
  b = new java_lang_StringBuilder_StringBuilder__V;
  x_0 = java_lang_String_$split__Ljava_lang_String_2Ljava_lang_String_2I_3Ljava_lang_String_2(com_google_gwt_xml_client_impl_XMLParserImpl_getData__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(this.com_google_gwt_xml_client_impl_DOMItem_jsObject), '(?=[;&<>\'"])', -1);
  for (i = 0; i < x_0.length; i++) {
    if (java_lang_String_$startsWith__Ljava_lang_String_2Ljava_lang_String_2Z(x_0[i], ';')) {
      b.java_lang_AbstractStringBuilder_string += '&semi;';
      java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(x_0[i], 1));
    }
     else if (java_lang_String_$startsWith__Ljava_lang_String_2Ljava_lang_String_2Z(x_0[i], '&')) {
      b.java_lang_AbstractStringBuilder_string += '&amp;';
      java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(x_0[i], 1));
    }
     else if (java_lang_String_$startsWith__Ljava_lang_String_2Ljava_lang_String_2Z(x_0[i], '"')) {
      b.java_lang_AbstractStringBuilder_string += '&quot;';
      java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(x_0[i], 1));
    }
     else if (java_lang_String_$startsWith__Ljava_lang_String_2Ljava_lang_String_2Z(x_0[i], "'")) {
      b.java_lang_AbstractStringBuilder_string += '&apos;';
      java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(x_0[i], 1));
    }
     else if (java_lang_String_$startsWith__Ljava_lang_String_2Ljava_lang_String_2Z(x_0[i], '<')) {
      b.java_lang_AbstractStringBuilder_string += '&lt;';
      java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(x_0[i], 1));
    }
     else if (java_lang_String_$startsWith__Ljava_lang_String_2Ljava_lang_String_2Z(x_0[i], '>')) {
      b.java_lang_AbstractStringBuilder_string += '&gt;';
      java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(x_0[i], 1));
    }
     else {
      java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, x_0[i]);
    }
  }
  return b.java_lang_AbstractStringBuilder_string;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1TextImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'TextImpl', 134);
function com_google_gwt_xml_client_impl_CDATASectionImpl_CDATASectionImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_TextImpl_TextImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(231, 134, {327:1, 45:1, 145:1, 20:1}, com_google_gwt_xml_client_impl_CDATASectionImpl_CDATASectionImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
_.toString__Ljava_lang_String_2$ = function com_google_gwt_xml_client_impl_CDATASectionImpl_toString__Ljava_lang_String_2(){
  var b;
  b = new java_lang_StringBuilder_StringBuilder__Ljava_lang_String_2V('<![CDATA[');
  java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, com_google_gwt_xml_client_impl_XMLParserImpl_getData__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(this.com_google_gwt_xml_client_impl_DOMItem_jsObject));
  b.java_lang_AbstractStringBuilder_string += ']]>';
  return b.java_lang_AbstractStringBuilder_string;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1CDATASectionImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'CDATASectionImpl', 231);
function com_google_gwt_xml_client_impl_CommentImpl_CommentImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_CharacterDataImpl_CharacterDataImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(232, 133, $intern_59, com_google_gwt_xml_client_impl_CommentImpl_CommentImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
_.toString__Ljava_lang_String_2$ = function com_google_gwt_xml_client_impl_CommentImpl_toString__Ljava_lang_String_2(){
  var b;
  b = new java_lang_StringBuilder_StringBuilder__Ljava_lang_String_2V('<!--');
  java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, com_google_gwt_xml_client_impl_XMLParserImpl_getData__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(this.com_google_gwt_xml_client_impl_DOMItem_jsObject));
  b.java_lang_AbstractStringBuilder_string += '-->';
  return b.java_lang_AbstractStringBuilder_string;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1CommentImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'CommentImpl', 232);
function com_google_gwt_xml_client_impl_DOMNodeException_DOMNodeException__SLjava_lang_Throwable_2Lcom_google_gwt_xml_client_impl_DOMItem_2V(e, item_0){
  com_google_gwt_xml_client_DOMException_DOMException__SLjava_lang_String_2V.call(this, 'Error during DOM manipulation of: ' + com_google_gwt_xml_client_impl_DOMParseException_summarize__Ljava_lang_String_2Ljava_lang_String_2(item_0.toString__Ljava_lang_String_2$()));
  java_lang_Throwable_$initCause__Ljava_lang_Throwable_2Ljava_lang_Throwable_2Ljava_lang_Throwable_2(this, e);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(236, 130, $intern_9, com_google_gwt_xml_client_impl_DOMNodeException_DOMNodeException__SLjava_lang_Throwable_2Lcom_google_gwt_xml_client_impl_DOMItem_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1DOMNodeException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'DOMNodeException', 236);
function com_google_gwt_xml_client_impl_DOMParseException_DOMParseException__Ljava_lang_String_2Ljava_lang_Throwable_2V(contents, e){
  com_google_gwt_xml_client_DOMException_DOMException__SLjava_lang_String_2V.call(this, 'Failed to parse: ' + java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(contents, 0, java_lang_Math_min__III(contents.length, 128)));
  java_lang_Throwable_$initCause__Ljava_lang_Throwable_2Ljava_lang_Throwable_2Ljava_lang_Throwable_2(this, e);
}

function com_google_gwt_xml_client_impl_DOMParseException_summarize__Ljava_lang_String_2Ljava_lang_String_2(text_0){
  return java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(text_0, 0, java_lang_Math_min__III(text_0.length, 128));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(229, 130, $intern_9, com_google_gwt_xml_client_impl_DOMParseException_DOMParseException__Ljava_lang_String_2Ljava_lang_Throwable_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1DOMParseException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'DOMParseException', 229);
function com_google_gwt_xml_client_impl_DocumentFragmentImpl_DocumentFragmentImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_NodeImpl_NodeImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(233, 58, $intern_59, com_google_gwt_xml_client_impl_DocumentFragmentImpl_DocumentFragmentImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1DocumentFragmentImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'DocumentFragmentImpl', 233);
function com_google_gwt_xml_client_impl_DocumentImpl_DocumentImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_NodeImpl_NodeImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(234, 58, {326:1, 45:1, 20:1}, com_google_gwt_xml_client_impl_DocumentImpl_DocumentImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1DocumentImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'DocumentImpl', 234);
function com_google_gwt_xml_client_impl_ElementImpl_ElementImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_NodeImpl_NodeImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(105, 58, {44:1, 45:1, 20:1, 105:1}, com_google_gwt_xml_client_impl_ElementImpl_ElementImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1ElementImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'ElementImpl', 105);
function com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_DOMItem_DOMItem__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(43, 20, {20:1}, com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
_.getLength__I = function com_google_gwt_xml_client_impl_NodeListImpl_getLength__I(){
  return com_google_gwt_xml_client_impl_XMLParserImpl_getLength__Lcom_google_gwt_core_client_JavaScriptObject_2I(this.com_google_gwt_xml_client_impl_DOMItem_jsObject);
}
;
_.item__ILcom_google_gwt_xml_client_Node_2 = function com_google_gwt_xml_client_impl_NodeListImpl_item__ILcom_google_gwt_xml_client_Node_2(index_0){
  return com_google_gwt_xml_client_impl_NodeImpl_build__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_xml_client_Node_2(com_google_gwt_xml_client_impl_XMLParserImpl_item__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(this.com_google_gwt_xml_client_impl_DOMItem_jsObject, index_0));
}
;
_.toString__Ljava_lang_String_2$ = function com_google_gwt_xml_client_impl_NodeListImpl_toString__Ljava_lang_String_2(){
  var b, i;
  b = new java_lang_StringBuilder_StringBuilder__V;
  for (i = 0; i < this.getLength__I(); i++) {
    java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(b, this.item__ILcom_google_gwt_xml_client_Node_2(i).toString__Ljava_lang_String_2$());
  }
  return b.java_lang_AbstractStringBuilder_string;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1NodeListImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'NodeListImpl', 43);
function com_google_gwt_xml_client_impl_NamedNodeMapImpl_NamedNodeMapImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(237, 43, {20:1}, com_google_gwt_xml_client_impl_NamedNodeMapImpl_NamedNodeMapImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
_.getLength__I = function com_google_gwt_xml_client_impl_NamedNodeMapImpl_getLength__I(){
  return com_google_gwt_xml_client_impl_XMLParserImpl_getLength__Lcom_google_gwt_core_client_JavaScriptObject_2I(this.com_google_gwt_xml_client_impl_DOMItem_jsObject);
}
;
_.item__ILcom_google_gwt_xml_client_Node_2 = function com_google_gwt_xml_client_impl_NamedNodeMapImpl_item__ILcom_google_gwt_xml_client_Node_2(index_0){
  return com_google_gwt_xml_client_impl_NodeImpl_build__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_xml_client_Node_2(com_google_gwt_xml_client_impl_XMLParserImpl_item__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(this.com_google_gwt_xml_client_impl_DOMItem_jsObject, index_0));
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1NamedNodeMapImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'NamedNodeMapImpl', 237);
function com_google_gwt_xml_client_impl_ProcessingInstructionImpl_ProcessingInstructionImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(o){
  com_google_gwt_xml_client_impl_NodeImpl_NodeImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V.call(this, o);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(235, 58, $intern_59, com_google_gwt_xml_client_impl_ProcessingInstructionImpl_ProcessingInstructionImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V);
_.toString__Ljava_lang_String_2$ = function com_google_gwt_xml_client_impl_ProcessingInstructionImpl_toString__Ljava_lang_String_2(){
  return com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V() , com_google_gwt_xml_client_impl_XMLParserImplStandard_$toStringImpl__Lcom_google_gwt_xml_client_impl_XMLParserImplStandard_2Lcom_google_gwt_xml_client_impl_NodeImpl_2Ljava_lang_String_2(this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1ProcessingInstructionImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'ProcessingInstructionImpl', 235);
function com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V(){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_google_gwt_xml_client_impl_XMLParserImpl_impl = new com_google_gwt_xml_client_impl_XMLParserImplStandard_XMLParserImplStandard__V;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_$parse__Lcom_google_gwt_xml_client_impl_XMLParserImpl_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Document_2(this$static, contents){
  var e;
  try {
    return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_xml_client_impl_NodeImpl_build__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_xml_client_Node_2(com_google_gwt_xml_client_impl_XMLParserImplStandard_$parseImpl__Lcom_google_gwt_xml_client_impl_XMLParserImplStandard_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2(this$static, contents)), 326);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 31)) {
      e = $e0;
      throw new com_google_gwt_xml_client_impl_DOMParseException_DOMParseException__Ljava_lang_String_2Ljava_lang_Throwable_2V(contents, e);
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
  }
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getAttribute__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2Ljava_lang_String_2(o, name_0){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return o.getAttribute(name_0);
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getAttributes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(t){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return t.attributes;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(t){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return t.childNodes;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getData__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(o){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return o.data;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getDocumentElement__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(o){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return o.documentElement;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getLength__Lcom_google_gwt_core_client_JavaScriptObject_2I(o){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return o.length;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getNamespaceURI__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(jsObject){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return jsObject.namespaceURI;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getNodeName__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(o){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return o.nodeName;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getNodeType__Lcom_google_gwt_core_client_JavaScriptObject_2S(jsObject){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  var out = jsObject.nodeType;
  return out == null?-1:out;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getNodeValue__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(o){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return o.nodeValue;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_getParentNode__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(o){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return o.parentNode;
}

function com_google_gwt_xml_client_impl_XMLParserImpl_hasChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Z(jsObject){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return jsObject.hasChildNodes();
}

function com_google_gwt_xml_client_impl_XMLParserImpl_item__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(t, index_0){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  if (index_0 >= t.length) {
    return null;
  }
  return t.item(index_0);
}

function com_google_gwt_xml_client_impl_XMLParserImpl_removeChild__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(jsObject, oldChildJs){
  com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
  return jsObject.removeChild(oldChildJs);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(319, 1, {});
var com_google_gwt_xml_client_impl_XMLParserImpl_impl;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1XMLParserImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'XMLParserImpl', 319);
function com_google_gwt_xml_client_impl_XMLParserImplStandard_$getPrefixImpl__Lcom_google_gwt_xml_client_impl_XMLParserImplStandard_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(jsObject){
  var fullName;
  fullName = com_google_gwt_xml_client_impl_XMLParserImpl_getNodeName__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(jsObject);
  if (fullName != null && fullName.indexOf(':') != -1) {
    return java_lang_String_$split__Ljava_lang_String_2Ljava_lang_String_2I_3Ljava_lang_String_2(fullName, ':', 2)[0];
  }
  return null;
}

function com_google_gwt_xml_client_impl_XMLParserImplStandard_$parseImpl__Lcom_google_gwt_xml_client_impl_XMLParserImplStandard_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2(this$static, contents){
  var domParser = this$static.com_google_gwt_xml_client_impl_XMLParserImplStandard_domParser;
  var result = domParser.parseFromString(contents, 'text/xml');
  var roottag = result.documentElement;
  if (roottag.tagName == 'parsererror' && roottag.namespaceURI == 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
    throw new Error(roottag.firstChild.data);
  }
  return result;
}

function com_google_gwt_xml_client_impl_XMLParserImplStandard_$toStringImpl__Lcom_google_gwt_xml_client_impl_XMLParserImplStandard_2Lcom_google_gwt_xml_client_impl_NodeImpl_2Ljava_lang_String_2(node){
  var jsNode = node.package_private$com_google_gwt_xml_client_impl_DOMItem$getJsObject__Lcom_google_gwt_core_client_JavaScriptObject_2();
  return (new XMLSerializer).serializeToString(jsNode);
}

function com_google_gwt_xml_client_impl_XMLParserImplStandard_XMLParserImplStandard__V(){
  this.com_google_gwt_xml_client_impl_XMLParserImplStandard_domParser = new DOMParser;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(228, 319, {}, com_google_gwt_xml_client_impl_XMLParserImplStandard_XMLParserImplStandard__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1xml_1client_1impl_1XMLParserImplStandard_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_58, 'XMLParserImplStandard', 228);
function com_google_web_bindery_event_shared_SimpleEventBus$1_SimpleEventBus$1__Lcom_google_web_bindery_event_shared_SimpleEventBus_2V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(189, 1, {}, com_google_web_bindery_event_shared_SimpleEventBus$1_SimpleEventBus$1__Lcom_google_web_bindery_event_shared_SimpleEventBus_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1web_1bindery_1event_1shared_1SimpleEventBus$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_17, 'SimpleEventBus/1', 189);
function com_google_web_bindery_event_shared_SimpleEventBus$2_SimpleEventBus$2__Lcom_google_web_bindery_event_shared_SimpleEventBus_2V(this$0, val$type, val$handler){
  this.com_google_web_bindery_event_shared_SimpleEventBus$2_this$01 = this$0;
  this.com_google_web_bindery_event_shared_SimpleEventBus$2_val$type2 = val$type;
  this.com_google_web_bindery_event_shared_SimpleEventBus$2_val$source3 = null;
  this.com_google_web_bindery_event_shared_SimpleEventBus$2_val$handler4 = val$handler;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(190, 1, {325:1}, com_google_web_bindery_event_shared_SimpleEventBus$2_SimpleEventBus$2__Lcom_google_web_bindery_event_shared_SimpleEventBus_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1web_1bindery_1event_1shared_1SimpleEventBus$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_17, 'SimpleEventBus/2', 190);
function com_sensia_gwt_relaxNG_RNGParser_$clinit__V(){
  com_sensia_gwt_relaxNG_RNGParser_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_sensia_gwt_relaxNG_RNGParser_grammarCache = new java_util_HashMap_HashMap__V;
}

function com_sensia_gwt_relaxNG_RNGParser_$canonicalizeUrl__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2(baseUrl, url_0){
  var cleanUrl, i, newPath, part, part$iterator, path;
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(url_0.substr(0, 4), 'http') || (url_0 = baseUrl + url_0);
  path = java_lang_String_$split__Ljava_lang_String_2Ljava_lang_String_2I_3Ljava_lang_String_2(url_0, '/', 0);
  newPath = new java_util_ArrayList_ArrayList__V;
  for (i = 0; i < path.length; i++) {
    if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(path[i], '.'))
      continue;
    java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(path[i], '..') && newPath.java_util_ArrayList_array.length > 0?java_util_ArrayList_$remove__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(newPath, java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(newPath, newPath.java_util_ArrayList_array.length - 1)):java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(newPath, path[i]);
  }
  cleanUrl = new java_lang_StringBuilder_StringBuilder__V;
  for (part$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(newPath); part$iterator.java_util_AbstractList$IteratorImpl_i < part$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
    part = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(part$iterator.java_util_AbstractList$IteratorImpl_i < part$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(part$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(part$iterator.java_util_AbstractList$IteratorImpl_i++)));
    cleanUrl.java_lang_AbstractStringBuilder_string += part;
    cleanUrl.java_lang_AbstractStringBuilder_string += '/';
  }
  java_lang_StringBuilder_$deleteCharAt__Ljava_lang_StringBuilder_2ILjava_lang_StringBuilder_2(cleanUrl, cleanUrl.java_lang_AbstractStringBuilder_string.length - 1);
  return cleanUrl.java_lang_AbstractStringBuilder_string;
}

function com_sensia_gwt_relaxNG_RNGParser_$finishParsing__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Element_2V(this$static, grammarElt){
  com_sensia_gwt_relaxNG_RNGParser_$parsePatternsAndAddToGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGGrammar_2Lcom_google_gwt_xml_client_Element_2V(this$static, this$static.com_sensia_gwt_relaxNG_RNGParser_grammar, grammarElt);
  com_sensia_gwt_relaxNG_RNGParser_grammarCache.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_gwt_relaxNG_RNGParser_grammar.com_sensia_relaxNG_RNGTag_id, this$static.com_sensia_gwt_relaxNG_RNGParser_grammar);
  this$static.com_sensia_gwt_relaxNG_RNGParser_callback.onParseDone__Lcom_sensia_relaxNG_RNGGrammar_2V(this$static.com_sensia_gwt_relaxNG_RNGParser_grammar);
}

function com_sensia_gwt_relaxNG_RNGParser_$getLocalName__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(this$static, node){
  var qname;
  qname = com_sensia_gwt_relaxNG_RNGParser_$parseName__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_sensia_gwt_relaxNG_RNGParser$QName_2(this$static, com_google_gwt_xml_client_impl_XMLParserImpl_getNodeName__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject));
  return qname.com_sensia_gwt_relaxNG_RNGParser$QName_localName;
}

function com_sensia_gwt_relaxNG_RNGParser_$getTextValue__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(node){
  var textValue;
  if (!com_google_gwt_xml_client_impl_XMLParserImpl_hasChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Z(node.com_google_gwt_xml_client_impl_DOMItem_jsObject) || com_google_gwt_xml_client_impl_XMLParserImpl_getNodeType__Lcom_google_gwt_core_client_JavaScriptObject_2S((new com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(com_google_gwt_xml_client_impl_XMLParserImpl_getChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject))).item__ILcom_google_gwt_xml_client_Node_2(0).com_google_gwt_xml_client_impl_DOMItem_jsObject) != 3)
    return null;
  textValue = com_google_gwt_xml_client_impl_XMLParserImpl_getNodeValue__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2((new com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(com_google_gwt_xml_client_impl_XMLParserImpl_getChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject))).item__ILcom_google_gwt_xml_client_Node_2(0).com_google_gwt_xml_client_impl_DOMItem_jsObject);
  return textValue != null?java_lang_String_$replaceAll__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2(textValue, '\\\\s\\+', ' '):null;
}

function com_sensia_gwt_relaxNG_RNGParser_$parse__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_sensia_gwt_relaxNG_RNGParserCallback_2V(this$static, url_0, callback){
  var builder, e;
  this$static.com_sensia_gwt_relaxNG_RNGParser_callback = callback;
  this$static.com_sensia_gwt_relaxNG_RNGParser_grammar = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_gwt_relaxNG_RNGParser_grammarCache.get__Ljava_lang_Object_2Ljava_lang_Object_2(url_0), 75);
  if (this$static.com_sensia_gwt_relaxNG_RNGParser_grammar) {
    callback.onParseDone__Lcom_sensia_relaxNG_RNGGrammar_2V(this$static.com_sensia_gwt_relaxNG_RNGParser_grammar);
    return;
  }
  builder = new com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V((com_google_gwt_http_client_RequestBuilder_$clinit__V() , com_google_gwt_http_client_RequestBuilder_GET), (com_google_gwt_http_client_StringValidator_throwIfNull__Ljava_lang_String_2Ljava_lang_Object_2V('decodedURL', url_0) , encodeURI(url_0)));
  try {
    com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(builder, new com_sensia_gwt_relaxNG_RNGParser$1_RNGParser$1__Lcom_sensia_gwt_relaxNG_RNGParser_2V(this$static, url_0));
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 48)) {
      e = $e0;
      java_lang_Throwable_$printStackTrace__Ljava_lang_Throwable_2Ljava_io_PrintStream_2V(e);
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
  }
}

function com_sensia_gwt_relaxNG_RNGParser_$parse__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Ljava_lang_String_2Lcom_sensia_relaxNG_RNGGrammar_2(this$static, url_0, xml){
  var dom;
  dom = (com_google_gwt_xml_client_XMLParser_$clinit__V() , com_google_gwt_xml_client_impl_XMLParserImpl_$parse__Lcom_google_gwt_xml_client_impl_XMLParserImpl_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Document_2(com_google_gwt_xml_client_XMLParser_impl, xml));
  com_google_gwt_xml_client_XMLParser_removeWhitespaceInner__Lcom_google_gwt_xml_client_Node_2Lcom_google_gwt_xml_client_Node_2V(dom, null);
  com_sensia_gwt_relaxNG_RNGParser_$parseGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2Lcom_sensia_relaxNG_RNGGrammar_2(this$static, url_0, com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_xml_client_impl_NodeImpl_build__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_xml_client_Node_2(com_google_gwt_xml_client_impl_XMLParserImpl_getDocumentElement__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(dom.com_google_gwt_xml_client_impl_DOMItem_jsObject)), 44));
  return this$static.com_sensia_gwt_relaxNG_RNGParser_grammar;
}

function com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, parent_0, parentElt){
  var children, elt, eltName, i, node, nsUri, qname, ref, rngAtt, rngElt, tag, val;
  children = new com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(com_google_gwt_xml_client_impl_XMLParserImpl_getChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(parentElt.com_google_gwt_xml_client_impl_DOMItem_jsObject));
  for (i = 0; i < children.getLength__I(); i++) {
    node = children.item__ILcom_google_gwt_xml_client_Node_2(i);
    if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(node, 44))
      continue;
    elt = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(node, 44);
    eltName = com_sensia_gwt_relaxNG_RNGParser_$getLocalName__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(this$static, elt);
    nsUri = com_google_gwt_xml_client_impl_XMLParserImpl_getNamespaceURI__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject);
    nsUri != null && java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(nsUri, $intern_60) && java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, $intern_61) && com_sensia_relaxNG_RNGTag_$setAnnotation__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2V(parent_0, com_sensia_gwt_relaxNG_RNGParser_$getTextValue__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(node));
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(parent_0, 16)) {
      if (!java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(nsUri, $intern_62))
        continue;
      tag = null;
      if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'ref')) {
        ref = new com_sensia_relaxNG_RNGRef_RNGRef__V;
        com_sensia_relaxNG_RNGRef_$setParentGrammar__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGGrammar_2V(ref, this$static.com_sensia_gwt_relaxNG_RNGParser_grammar);
        com_sensia_relaxNG_RNGRef_$setPatternName__Lcom_sensia_relaxNG_RNGRef_2Ljava_lang_String_2V(ref, com_google_gwt_xml_client_impl_XMLParserImpl_getAttribute__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2Ljava_lang_String_2(elt.com_google_gwt_xml_client_impl_DOMItem_jsObject, $intern_63));
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, ref, elt);
        tag = ref;
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'element')) {
        rngElt = new com_sensia_relaxNG_RNGElement_RNGElement__V;
        qname = com_sensia_gwt_relaxNG_RNGParser_$parseRNGObjectName__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Element_2Lcom_sensia_gwt_relaxNG_RNGParser$QName_2(this$static, elt);
        com_sensia_relaxNG_RNGElement_$setName__Lcom_sensia_relaxNG_RNGElement_2Ljava_lang_String_2V(rngElt, qname.com_sensia_gwt_relaxNG_RNGParser$QName_localName);
        com_sensia_relaxNG_RNGElement_$setNamespace__Lcom_sensia_relaxNG_RNGElement_2Ljava_lang_String_2V(rngElt, qname.com_sensia_gwt_relaxNG_RNGParser$QName_namespaceURI);
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, rngElt, elt);
        tag = rngElt;
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'attribute')) {
        rngAtt = new com_sensia_relaxNG_RNGAttribute_RNGAttribute__V;
        qname = com_sensia_gwt_relaxNG_RNGParser_$parseRNGObjectName__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Element_2Lcom_sensia_gwt_relaxNG_RNGParser$QName_2(this$static, elt);
        com_sensia_relaxNG_RNGAttribute_$setName__Lcom_sensia_relaxNG_RNGAttribute_2Ljava_lang_String_2V(rngAtt, qname.com_sensia_gwt_relaxNG_RNGParser$QName_localName);
        com_sensia_relaxNG_RNGAttribute_$setNamespace__Lcom_sensia_relaxNG_RNGAttribute_2Ljava_lang_String_2V(rngAtt, qname.com_sensia_gwt_relaxNG_RNGParser$QName_namespaceURI);
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, rngAtt, elt);
        tag = rngAtt;
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'optional')) {
        tag = new com_sensia_relaxNG_RNGOptional_RNGOptional__V;
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, tag, elt);
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'choice')) {
        tag = new com_sensia_relaxNG_RNGChoice_RNGChoice__V;
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, tag, elt);
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'zeroOrMore')) {
        tag = new com_sensia_relaxNG_RNGZeroOrMore_RNGZeroOrMore__V;
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, tag, elt);
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'oneOrMore')) {
        tag = new com_sensia_relaxNG_RNGOneOrMore_RNGOneOrMore__V;
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, tag, elt);
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'group')) {
        tag = new com_sensia_relaxNG_RNGGroup_RNGGroup__V;
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, tag, elt);
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'list')) {
        tag = new com_sensia_relaxNG_RNGList_RNGList__V;
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, tag, elt);
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'text')) {
        tag = new com_sensia_relaxNG_RNGText_RNGText__V;
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, tag, elt);
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'data')) {
        tag = com_sensia_gwt_relaxNG_RNGParser_$parseDataType__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Element_2Lcom_sensia_relaxNG_RNGData_2(elt);
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, tag, elt);
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, $intern_53)) {
        val = new com_sensia_relaxNG_RNGValue_RNGValue__V;
        com_sensia_relaxNG_RNGValue_$setText__Lcom_sensia_relaxNG_RNGValue_2Ljava_lang_String_2V(val, com_sensia_gwt_relaxNG_RNGParser_$getTextValue__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(elt));
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, val, elt);
        tag = val;
      }
       else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, $intern_64)) {
        val = new com_sensia_relaxNG_RNGValue_RNGValue__V;
        com_sensia_relaxNG_RNGValue_$setText__Lcom_sensia_relaxNG_RNGValue_2Ljava_lang_String_2V(val, com_sensia_gwt_relaxNG_RNGParser_$getTextValue__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(elt));
        com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, val, elt);
        tag = val;
      }
      !!tag && com_sensia_relaxNG_RNGTagList_$add__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTag_2V(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(parent_0, 16), tag);
    }
  }
}

function com_sensia_gwt_relaxNG_RNGParser_$parseDataType__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Element_2Lcom_sensia_relaxNG_RNGData_2(elt){
  var data_0, dataType, i, name_0, paramElt, paramElts, value_0;
  dataType = com_google_gwt_xml_client_impl_XMLParserImpl_getAttribute__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2Ljava_lang_String_2(elt.com_google_gwt_xml_client_impl_DOMItem_jsObject, 'type');
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(dataType, 'boolean')?(data_0 = new com_sensia_relaxNG_XSDBoolean_XSDBoolean__V):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(dataType, 'dateTime')?(data_0 = new com_sensia_relaxNG_XSDDateTime_XSDDateTime__V):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(dataType, 'decimal')?(data_0 = new com_sensia_relaxNG_XSDDecimal_XSDDecimal__V):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(dataType, 'double')?(data_0 = new com_sensia_relaxNG_XSDDouble_XSDDouble__V):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(dataType, 'integer')?(data_0 = new com_sensia_relaxNG_XSDInteger_XSDInteger__V):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(dataType, $intern_1)?(data_0 = new com_sensia_relaxNG_XSDString_XSDString__V):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(dataType, 'anyURI')?(data_0 = new com_sensia_relaxNG_XSDAnyURI_XSDAnyURI__V):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(dataType, 'token')?(data_0 = new com_sensia_relaxNG_XSDToken_XSDToken__V):(data_0 = new com_sensia_relaxNG_RNGData_RNGData__V);
  paramElts = new com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V((com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V() , elt.com_google_gwt_xml_client_impl_DOMItem_jsObject.getElementsByTagNameNS('*', 'param')));
  for (i = 0; i < paramElts.getLength__I(); i++) {
    paramElt = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(paramElts.item__ILcom_google_gwt_xml_client_Node_2(i), 44);
    name_0 = com_google_gwt_xml_client_impl_XMLParserImpl_getAttribute__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2Ljava_lang_String_2(paramElt.com_google_gwt_xml_client_impl_DOMItem_jsObject, $intern_63);
    value_0 = com_sensia_gwt_relaxNG_RNGParser_$getTextValue__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(paramElt);
    data_0.com_sensia_relaxNG_RNGData_params.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(name_0, value_0);
  }
  data_0.com_sensia_relaxNG_RNGData_type = dataType;
  return data_0;
}

function com_sensia_gwt_relaxNG_RNGParser_$parseGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2Lcom_sensia_relaxNG_RNGGrammar_2(this$static, url_0, grammarElt){
  var atts, baseUrl, child, childName, children, i, i0, includeElt, includeElt$iterator, includeElts, lastSlash, node, prefix, uri_0, com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_url_0, com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_cleanUrl_0, com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_parser_0;
  this$static.com_sensia_gwt_relaxNG_RNGParser_grammar = new com_sensia_relaxNG_RNGGrammar_RNGGrammar__V;
  com_sensia_relaxNG_RNGTag_$setId__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2V(this$static.com_sensia_gwt_relaxNG_RNGParser_grammar, url_0);
  lastSlash = java_lang_String_$lastIndexOf__Ljava_lang_String_2Ljava_lang_String_2I(url_0, java_lang_String_fromCodePoint__ILjava_lang_String_2(47));
  baseUrl = lastSlash > 0?url_0.substr(0, lastSlash + 1):'';
  atts = new com_google_gwt_xml_client_impl_NamedNodeMapImpl_NamedNodeMapImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(com_google_gwt_xml_client_impl_XMLParserImpl_getAttributes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(grammarElt.com_google_gwt_xml_client_impl_DOMItem_jsObject));
  for (i0 = 0; i0 < com_google_gwt_xml_client_impl_XMLParserImpl_getLength__Lcom_google_gwt_core_client_JavaScriptObject_2I(atts.com_google_gwt_xml_client_impl_DOMItem_jsObject); i0++) {
    node = com_google_gwt_xml_client_impl_NodeImpl_build__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_xml_client_Node_2(com_google_gwt_xml_client_impl_XMLParserImpl_item__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(atts.com_google_gwt_xml_client_impl_DOMItem_jsObject, i0));
    com_google_gwt_xml_client_impl_XMLParserImpl_$clinit__V();
    if (com_google_gwt_xml_client_impl_XMLParserImplStandard_$getPrefixImpl__Lcom_google_gwt_xml_client_impl_XMLParserImplStandard_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject) != null && java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(com_google_gwt_xml_client_impl_XMLParserImplStandard_$getPrefixImpl__Lcom_google_gwt_xml_client_impl_XMLParserImplStandard_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject), 'xmlns')) {
      prefix = java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(com_google_gwt_xml_client_impl_XMLParserImpl_getNodeName__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject), java_lang_String_$indexOf__Ljava_lang_String_2Ljava_lang_String_2I(com_google_gwt_xml_client_impl_XMLParserImpl_getNodeName__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject), java_lang_String_fromCodePoint__ILjava_lang_String_2(58)) + 1);
      uri_0 = com_google_gwt_xml_client_impl_XMLParserImpl_getNodeValue__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject);
      if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(uri_0, $intern_62) || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(uri_0, $intern_60))
        continue;
      com_sensia_relaxNG_RNGGrammar_$addNamespace__Lcom_sensia_relaxNG_RNGGrammar_2Ljava_lang_String_2Ljava_lang_String_2V(this$static.com_sensia_gwt_relaxNG_RNGParser_grammar, prefix, uri_0);
    }
  }
  includeElts = new java_util_ArrayList_ArrayList__V;
  children = new com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(com_google_gwt_xml_client_impl_XMLParserImpl_getChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(grammarElt.com_google_gwt_xml_client_impl_DOMItem_jsObject));
  for (i = 0; i < children.getLength__I(); i++) {
    if (com_google_gwt_xml_client_impl_XMLParserImpl_getNodeType__Lcom_google_gwt_core_client_JavaScriptObject_2S(children.item__ILcom_google_gwt_xml_client_Node_2(i).com_google_gwt_xml_client_impl_DOMItem_jsObject) != 1)
      continue;
    child = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(children.item__ILcom_google_gwt_xml_client_Node_2(i), 44);
    childName = com_google_gwt_xml_client_impl_XMLParserImpl_getNodeName__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(child.com_google_gwt_xml_client_impl_DOMItem_jsObject);
    java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(childName, 'include') && (com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(includeElts.java_util_ArrayList_array, includeElts.java_util_ArrayList_array.length, child) , true);
  }
  this$static.com_sensia_gwt_relaxNG_RNGParser_numIncludes = includeElts.java_util_ArrayList_array.length;
  if (this$static.com_sensia_gwt_relaxNG_RNGParser_numIncludes == 0)
    com_sensia_gwt_relaxNG_RNGParser_$finishParsing__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Element_2V(this$static, grammarElt);
  else 
    for (includeElt$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(includeElts); includeElt$iterator.java_util_AbstractList$IteratorImpl_i < includeElt$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
      includeElt = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(includeElt$iterator.java_util_AbstractList$IteratorImpl_i < includeElt$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(includeElt$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(includeElt$iterator.java_util_AbstractList$IteratorImpl_i++), 44));
      com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_url_0 = com_google_gwt_xml_client_impl_XMLParserImpl_getAttribute__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2Ljava_lang_String_2(includeElt.com_google_gwt_xml_client_impl_DOMItem_jsObject, 'href');
      com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_cleanUrl_0 = com_sensia_gwt_relaxNG_RNGParser_$canonicalizeUrl__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2(baseUrl, com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_url_0);
      com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_parser_0 = new com_sensia_gwt_relaxNG_RNGParser_RNGParser__V;
      com_sensia_gwt_relaxNG_RNGParser_$parse__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_sensia_gwt_relaxNG_RNGParserCallback_2V(com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_parser_0, com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_cleanUrl_0, new com_sensia_gwt_relaxNG_RNGParser$2_RNGParser$2__Lcom_sensia_gwt_relaxNG_RNGParser_2V(this$static, includeElt, com_sensia_gwt_relaxNG_RNGParser_$parseIncludedGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_google_gwt_xml_client_Element_2V_cleanUrl_0));
    }
  return this$static.com_sensia_gwt_relaxNG_RNGParser_grammar;
}

function com_sensia_gwt_relaxNG_RNGParser_$parseName__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_sensia_gwt_relaxNG_RNGParser$QName_2(this$static, qname){
  var localName, nsUri, tokens;
  tokens = java_lang_String_$split__Ljava_lang_String_2Ljava_lang_String_2I_3Ljava_lang_String_2(qname, ':', 0);
  if (tokens.length == 1) {
    nsUri = null;
    localName = tokens[0];
  }
   else {
    nsUri = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(java_util_LinkedHashMap_$get__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_gwt_relaxNG_RNGParser_grammar.com_sensia_relaxNG_RNGGrammar_nsPrefixToUri, tokens[0]));
    localName = tokens[1];
  }
  return new com_sensia_gwt_relaxNG_RNGParser$QName_RNGParser$QName__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Ljava_lang_String_2V(nsUri, localName);
}

function com_sensia_gwt_relaxNG_RNGParser_$parsePatternsAndAddToGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGGrammar_2Lcom_google_gwt_xml_client_Element_2V(this$static, grammar, parentElt){
  var children, elt, eltName, i, node, nsUri, pattern, startPattern;
  children = new com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(com_google_gwt_xml_client_impl_XMLParserImpl_getChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(parentElt.com_google_gwt_xml_client_impl_DOMItem_jsObject));
  for (i = 0; i < children.getLength__I(); i++) {
    node = children.item__ILcom_google_gwt_xml_client_Node_2(i);
    if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(node, 44))
      continue;
    elt = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(node, 44);
    eltName = com_sensia_gwt_relaxNG_RNGParser_$getLocalName__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(this$static, elt);
    nsUri = com_google_gwt_xml_client_impl_XMLParserImpl_getNamespaceURI__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(node.com_google_gwt_xml_client_impl_DOMItem_jsObject);
    if (!java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(nsUri, $intern_62))
      continue;
    if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'define')) {
      pattern = new com_sensia_relaxNG_RNGDefine_RNGDefine__V;
      com_sensia_relaxNG_RNGTag_$setId__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2V(pattern, com_google_gwt_xml_client_impl_XMLParserImpl_getAttribute__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2Ljava_lang_String_2(elt.com_google_gwt_xml_client_impl_DOMItem_jsObject, $intern_63));
      com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, pattern, elt);
      java_util_LinkedHashMap_$put__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(grammar.com_sensia_relaxNG_RNGGrammar_patterns, pattern.com_sensia_relaxNG_RNGTag_id, pattern);
    }
     else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'start')) {
      startPattern = new com_sensia_relaxNG_RNGGroup_RNGGroup__V;
      com_sensia_gwt_relaxNG_RNGParser_$parseChildren__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_xml_client_Element_2V(this$static, startPattern, elt);
      grammar.com_sensia_relaxNG_RNGGrammar_startPattern = startPattern;
    }
  }
}

function com_sensia_gwt_relaxNG_RNGParser_$parseRNGObjectName__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Element_2Lcom_sensia_gwt_relaxNG_RNGParser$QName_2(this$static, elt){
  var children, i, localName, node, nsUri, qname;
  qname = com_google_gwt_xml_client_impl_XMLParserImpl_getAttribute__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2Ljava_lang_String_2(elt.com_google_gwt_xml_client_impl_DOMItem_jsObject, $intern_63);
  if (qname != null) {
    return com_sensia_gwt_relaxNG_RNGParser_$parseName__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_sensia_gwt_relaxNG_RNGParser$QName_2(this$static, qname);
  }
   else {
    children = new com_google_gwt_xml_client_impl_NodeListImpl_NodeListImpl__Lcom_google_gwt_core_client_JavaScriptObject_2V(com_google_gwt_xml_client_impl_XMLParserImpl_getChildNodes__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(elt.com_google_gwt_xml_client_impl_DOMItem_jsObject));
    for (i = 0; i < children.getLength__I(); i++) {
      node = children.item__ILcom_google_gwt_xml_client_Node_2(i);
      if (com_google_gwt_xml_client_impl_XMLParserImpl_getNodeType__Lcom_google_gwt_core_client_JavaScriptObject_2S(node.com_google_gwt_xml_client_impl_DOMItem_jsObject) == 1 && java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(com_sensia_gwt_relaxNG_RNGParser_$getLocalName__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(this$static, node), $intern_63)) {
        nsUri = com_google_gwt_xml_client_impl_XMLParserImpl_getAttribute__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2Ljava_lang_String_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(node, 44), 105).com_google_gwt_xml_client_impl_DOMItem_jsObject, 'ns');
        localName = com_sensia_gwt_relaxNG_RNGParser_$getTextValue__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Node_2Ljava_lang_String_2(elt);
        return new com_sensia_gwt_relaxNG_RNGParser$QName_RNGParser$QName__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Ljava_lang_String_2V(nsUri, localName);
      }
    }
  }
  return null;
}

function com_sensia_gwt_relaxNG_RNGParser_RNGParser__V(){
  com_sensia_gwt_relaxNG_RNGParser_$clinit__V();
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(119, 1, {}, com_sensia_gwt_relaxNG_RNGParser_RNGParser__V);
_.com_sensia_gwt_relaxNG_RNGParser_numIncludes = 0;
var com_sensia_gwt_relaxNG_RNGParser_grammarCache;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1gwt_1relaxNG_1RNGParser_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_65, 'RNGParser', 119);
function com_sensia_gwt_relaxNG_RNGParser$1_$onResponseReceived__Lcom_sensia_gwt_relaxNG_RNGParser$1_2Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(this$static, resp){
  var text_0;
  if (200 == resp.com_google_gwt_http_client_ResponseImpl_xmlHttpRequest.status) {
    text_0 = resp.com_google_gwt_http_client_ResponseImpl_xmlHttpRequest.responseText;
    com_sensia_gwt_relaxNG_RNGParser_$parse__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Ljava_lang_String_2Lcom_sensia_relaxNG_RNGGrammar_2(this$static.com_sensia_gwt_relaxNG_RNGParser$1_this$01, this$static.com_sensia_gwt_relaxNG_RNGParser$1_val$url2, text_0);
  }
}

function com_sensia_gwt_relaxNG_RNGParser$1_RNGParser$1__Lcom_sensia_gwt_relaxNG_RNGParser_2V(this$0, val$url){
  this.com_sensia_gwt_relaxNG_RNGParser$1_this$01 = this$0;
  this.com_sensia_gwt_relaxNG_RNGParser$1_val$url2 = val$url;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(166, 1, {}, com_sensia_gwt_relaxNG_RNGParser$1_RNGParser$1__Lcom_sensia_gwt_relaxNG_RNGParser_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1gwt_1relaxNG_1RNGParser$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_65, 'RNGParser/1', 166);
function com_sensia_gwt_relaxNG_RNGParser$2_RNGParser$2__Lcom_sensia_gwt_relaxNG_RNGParser_2V(this$0, val$includeElt, val$cleanUrl){
  this.com_sensia_gwt_relaxNG_RNGParser$2_this$01 = this$0;
  this.com_sensia_gwt_relaxNG_RNGParser$2_val$includeElt2 = val$includeElt;
  this.com_sensia_gwt_relaxNG_RNGParser$2_val$cleanUrl3 = val$cleanUrl;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(167, 1, {}, com_sensia_gwt_relaxNG_RNGParser$2_RNGParser$2__Lcom_sensia_gwt_relaxNG_RNGParser_2V);
_.onParseDone__Lcom_sensia_relaxNG_RNGGrammar_2V = function com_sensia_gwt_relaxNG_RNGParser$2_onParseDone__Lcom_sensia_relaxNG_RNGGrammar_2V(g){
  com_sensia_gwt_relaxNG_RNGParser_$parsePatternsAndAddToGrammar__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_sensia_relaxNG_RNGGrammar_2Lcom_google_gwt_xml_client_Element_2V(this.com_sensia_gwt_relaxNG_RNGParser$2_this$01, g, this.com_sensia_gwt_relaxNG_RNGParser$2_val$includeElt2);
  com_sensia_relaxNG_RNGGrammar_$setStartPattern__Lcom_sensia_relaxNG_RNGGrammar_2Lcom_sensia_relaxNG_RNGGroup_2V(this.com_sensia_gwt_relaxNG_RNGParser$2_this$01.com_sensia_gwt_relaxNG_RNGParser_grammar, g.com_sensia_relaxNG_RNGGrammar_startPattern);
  java_util_LinkedHashMap_$put__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this.com_sensia_gwt_relaxNG_RNGParser$2_this$01.com_sensia_gwt_relaxNG_RNGParser_grammar.com_sensia_relaxNG_RNGGrammar_includedGrammars, this.com_sensia_gwt_relaxNG_RNGParser$2_val$cleanUrl3, g);
  this.com_sensia_gwt_relaxNG_RNGParser$2_this$01.com_sensia_gwt_relaxNG_RNGParser_grammar.com_sensia_relaxNG_RNGGrammar_includedGrammars.java_util_LinkedHashMap_map.size__I() == this.com_sensia_gwt_relaxNG_RNGParser$2_this$01.com_sensia_gwt_relaxNG_RNGParser_numIncludes && com_sensia_gwt_relaxNG_RNGParser_$finishParsing__Lcom_sensia_gwt_relaxNG_RNGParser_2Lcom_google_gwt_xml_client_Element_2V(this.com_sensia_gwt_relaxNG_RNGParser$2_this$01, com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_xml_client_impl_NodeImpl_build__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_xml_client_Node_2(com_google_gwt_xml_client_impl_XMLParserImpl_getParentNode__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(this.com_sensia_gwt_relaxNG_RNGParser$2_val$includeElt2.com_google_gwt_xml_client_impl_DOMItem_jsObject)), 44));
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1gwt_1relaxNG_1RNGParser$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_65, 'RNGParser/2', 167);
function com_sensia_gwt_relaxNG_RNGParser$QName_RNGParser$QName__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Ljava_lang_String_2V(ns, name_0){
  this.com_sensia_gwt_relaxNG_RNGParser$QName_namespaceURI = ns;
  this.com_sensia_gwt_relaxNG_RNGParser$QName_localName = name_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(120, 1, {}, com_sensia_gwt_relaxNG_RNGParser$QName_RNGParser$QName__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1gwt_1relaxNG_1RNGParser$QName_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_65, 'RNGParser/QName', 120);
function com_sensia_relaxNG_RNGTag_$clone__Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_relaxNG_RNGTag_2(this$static){
  var tag;
  tag = this$static.newInstance__Lcom_sensia_relaxNG_RNGTag_2();
  tag.com_sensia_relaxNG_RNGTag_id = this$static.com_sensia_relaxNG_RNGTag_id;
  tag.com_sensia_relaxNG_RNGTag_annotation = this$static.com_sensia_relaxNG_RNGTag_annotation;
  tag.com_sensia_relaxNG_RNGTag_disabled = this$static.com_sensia_relaxNG_RNGTag_disabled;
  return tag;
}

function com_sensia_relaxNG_RNGTag_$setAnnotation__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2V(this$static, annotation){
  this$static.com_sensia_relaxNG_RNGTag_annotation = annotation;
}

function com_sensia_relaxNG_RNGTag_$setId__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2V(this$static, id_0){
  this$static.com_sensia_relaxNG_RNGTag_id = id_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(7, 1, {7:1, 3:1});
_.clone__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGTag_clone__Lcom_sensia_relaxNG_RNGTag_2(){
  return com_sensia_relaxNG_RNGTag_$clone__Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_relaxNG_RNGTag_2(this);
}
;
_.com_sensia_relaxNG_RNGTag_disabled = false;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGTag_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGTag', 7);
function com_sensia_relaxNG_RNGTagList_$add__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTag_2V(this$static, tag){
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static.com_sensia_relaxNG_RNGTagList_children, tag);
}

function com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this$static){
  var child, child$iterator, childClone, newChildren, newTagList;
  newTagList = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTag_$clone__Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_relaxNG_RNGTag_2(this$static), 16);
  newChildren = new java_util_ArrayList_ArrayList__V;
  for (child$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this$static.com_sensia_relaxNG_RNGTagList_children); child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
    child = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_i++), 7));
    childClone = child.clone__Lcom_sensia_relaxNG_RNGTag_2();
    com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(newChildren.java_util_ArrayList_array, newChildren.java_util_ArrayList_array.length, childClone);
  }
  newTagList.com_sensia_relaxNG_RNGTagList_children = newChildren;
  return newTagList;
}

function com_sensia_relaxNG_RNGTagList_$getChildAttribute__Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2Lcom_sensia_relaxNG_RNGAttribute_2(this$static){
  var tag, tag$iterator;
  for (tag$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this$static.com_sensia_relaxNG_RNGTagList_children); tag$iterator.java_util_AbstractList$IteratorImpl_i < tag$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
    tag = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(tag$iterator.java_util_AbstractList$IteratorImpl_i < tag$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(tag$iterator.java_util_AbstractList$IteratorImpl_i++), 7));
    if (com_sensia_relaxNG_RNGTagList_$isAttributeWithName__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2Z(tag))
      return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 35);
  }
  return null;
}

function com_sensia_relaxNG_RNGTagList_$getChildValue__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGValue_2(this$static){
  var tag, tag$iterator;
  for (tag$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this$static.com_sensia_relaxNG_RNGTagList_children); tag$iterator.java_util_AbstractList$IteratorImpl_i < tag$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
    tag = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(tag$iterator.java_util_AbstractList$IteratorImpl_i < tag$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(tag$iterator.java_util_AbstractList$IteratorImpl_i++), 7));
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 42))
      return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 42);
  }
  return null;
}

function com_sensia_relaxNG_RNGTagList_$isAttributeWithName__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2Z(tag){
  var att;
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 35)) {
    att = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 35);
    if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(att.com_sensia_relaxNG_RNGAttribute_name, $intern_63))
      return true;
  }
  return false;
}

function com_sensia_relaxNG_RNGTagList_RNGTagList__V(){
  this.com_sensia_relaxNG_RNGTagList_children = new java_util_ArrayList_ArrayList__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(16, 7, {7:1, 16:1, 3:1});
_.clone__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGTagList_clone__Lcom_sensia_relaxNG_RNGTag_2(){
  return this.clone__Lcom_sensia_relaxNG_RNGTagList_2();
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGTagList_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  return com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGTagList_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGTagList', 16);
function com_sensia_relaxNG_RNGAttribute_$setName__Lcom_sensia_relaxNG_RNGAttribute_2Ljava_lang_String_2V(this$static, name_0){
  this$static.com_sensia_relaxNG_RNGAttribute_name = name_0;
}

function com_sensia_relaxNG_RNGAttribute_$setNamespace__Lcom_sensia_relaxNG_RNGAttribute_2Ljava_lang_String_2V(this$static, namespace){
  this$static.com_sensia_relaxNG_RNGAttribute_namespace = namespace;
}

function com_sensia_relaxNG_RNGAttribute_RNGAttribute__V(){
  com_sensia_relaxNG_RNGTagList_RNGTagList__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(35, 16, {35:1, 7:1, 16:1, 3:1}, com_sensia_relaxNG_RNGAttribute_RNGAttribute__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGAttribute_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  visitor.visit__Lcom_sensia_relaxNG_RNGAttribute_2V(this);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGAttribute_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  var com_sensia_relaxNG_RNGAttribute_$clone__Lcom_sensia_relaxNG_RNGAttribute_2Lcom_sensia_relaxNG_RNGAttribute_2_newTag_0;
  return com_sensia_relaxNG_RNGAttribute_$clone__Lcom_sensia_relaxNG_RNGAttribute_2Lcom_sensia_relaxNG_RNGAttribute_2_newTag_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 35) , com_sensia_relaxNG_RNGAttribute_$clone__Lcom_sensia_relaxNG_RNGAttribute_2Lcom_sensia_relaxNG_RNGAttribute_2_newTag_0.com_sensia_relaxNG_RNGAttribute_name = this.com_sensia_relaxNG_RNGAttribute_name , com_sensia_relaxNG_RNGAttribute_$clone__Lcom_sensia_relaxNG_RNGAttribute_2Lcom_sensia_relaxNG_RNGAttribute_2_newTag_0.com_sensia_relaxNG_RNGAttribute_namespace = this.com_sensia_relaxNG_RNGAttribute_namespace , com_sensia_relaxNG_RNGAttribute_$clone__Lcom_sensia_relaxNG_RNGAttribute_2Lcom_sensia_relaxNG_RNGAttribute_2_newTag_0;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGAttribute_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGAttribute_RNGAttribute__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGAttribute_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGAttribute', 35);
function com_sensia_relaxNG_RNGChoice_$setSelectedIndex__Lcom_sensia_relaxNG_RNGChoice_2IV(this$static, item_0){
  this$static.com_sensia_relaxNG_RNGChoice_selectedIndex = item_0;
}

function com_sensia_relaxNG_RNGChoice_RNGChoice__V(){
  com_sensia_relaxNG_RNGTagList_RNGTagList__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(87, 16, {87:1, 7:1, 16:1, 3:1}, com_sensia_relaxNG_RNGChoice_RNGChoice__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGChoice_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  visitor.visit__Lcom_sensia_relaxNG_RNGChoice_2V(this);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGChoice_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  var com_sensia_relaxNG_RNGChoice_$clone__Lcom_sensia_relaxNG_RNGChoice_2Lcom_sensia_relaxNG_RNGChoice_2_newTag_0;
  return com_sensia_relaxNG_RNGChoice_$clone__Lcom_sensia_relaxNG_RNGChoice_2Lcom_sensia_relaxNG_RNGChoice_2_newTag_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 87) , com_sensia_relaxNG_RNGChoice_$clone__Lcom_sensia_relaxNG_RNGChoice_2Lcom_sensia_relaxNG_RNGChoice_2_newTag_0.com_sensia_relaxNG_RNGChoice_selectedIndex = this.com_sensia_relaxNG_RNGChoice_selectedIndex , com_sensia_relaxNG_RNGChoice_$clone__Lcom_sensia_relaxNG_RNGChoice_2Lcom_sensia_relaxNG_RNGChoice_2_newTag_0;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGChoice_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGChoice_RNGChoice__V;
}
;
_.com_sensia_relaxNG_RNGChoice_selectedIndex = -1;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGChoice_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGChoice', 87);
function com_sensia_relaxNG_RNGData_$setConfirmed__Lcom_sensia_relaxNG_RNGData_2ZV(this$static, confirmed){
  this$static.com_sensia_relaxNG_RNGData_confirmed = confirmed;
}

function com_sensia_relaxNG_RNGData_$setStringValue__Lcom_sensia_relaxNG_RNGData_2Ljava_lang_String_2V(this$static, value_0){
  this$static.com_sensia_relaxNG_RNGData_value = value_0;
}

function com_sensia_relaxNG_RNGData_RNGData__V(){
  this.com_sensia_relaxNG_RNGData_params = new java_util_HashMap_HashMap__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(21, 7, $intern_67, com_sensia_relaxNG_RNGData_RNGData__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGData_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  var com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGData_2V_widget_0;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGData_2V_widget_0 = new com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_RNGDataWidget__Lcom_sensia_relaxNG_RNGData_2V(this);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(visitor.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGData_2V_widget_0);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGData_clone__Lcom_sensia_relaxNG_RNGTag_2(){
  var com_sensia_relaxNG_RNGData_$clone__Lcom_sensia_relaxNG_RNGData_2Lcom_sensia_relaxNG_RNGData_2_newTag_0;
  return com_sensia_relaxNG_RNGData_$clone__Lcom_sensia_relaxNG_RNGData_2Lcom_sensia_relaxNG_RNGData_2_newTag_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTag_$clone__Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_relaxNG_RNGTag_2(this), 21) , com_sensia_relaxNG_RNGData_$clone__Lcom_sensia_relaxNG_RNGData_2Lcom_sensia_relaxNG_RNGData_2_newTag_0.com_sensia_relaxNG_RNGData_value = this.com_sensia_relaxNG_RNGData_value , com_sensia_relaxNG_RNGData_$clone__Lcom_sensia_relaxNG_RNGData_2Lcom_sensia_relaxNG_RNGData_2_newTag_0.com_sensia_relaxNG_RNGData_type = this.com_sensia_relaxNG_RNGData_type , com_sensia_relaxNG_RNGData_$clone__Lcom_sensia_relaxNG_RNGData_2Lcom_sensia_relaxNG_RNGData_2_newTag_0.com_sensia_relaxNG_RNGData_params = this.com_sensia_relaxNG_RNGData_params , com_sensia_relaxNG_RNGData_$clone__Lcom_sensia_relaxNG_RNGData_2Lcom_sensia_relaxNG_RNGData_2_newTag_0;
}
;
_.isValid__Ljava_lang_String_2Z = function com_sensia_relaxNG_RNGData_isValid__Ljava_lang_String_2Z(val){
  return true;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGData_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGData_RNGData__V;
}
;
_.com_sensia_relaxNG_RNGData_confirmed = false;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGData_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGData', 21);
function com_sensia_relaxNG_RNGDefine_$accept__Lcom_sensia_relaxNG_RNGDefine_2Lcom_sensia_relaxNG_RNGTagVisitor_2V(this$static, visitor){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(visitor, this$static.com_sensia_relaxNG_RNGTagList_children);
}

function com_sensia_relaxNG_RNGDefine_RNGDefine__V(){
  com_sensia_relaxNG_RNGTagList_RNGTagList__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(49, 16, {49:1, 7:1, 16:1, 3:1}, com_sensia_relaxNG_RNGDefine_RNGDefine__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGDefine_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  com_sensia_relaxNG_RNGDefine_$accept__Lcom_sensia_relaxNG_RNGDefine_2Lcom_sensia_relaxNG_RNGTagVisitor_2V(this, visitor);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGDefine_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 49);
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGDefine_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGDefine_RNGDefine__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGDefine_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGDefine', 49);
function com_sensia_relaxNG_RNGElement_$setName__Lcom_sensia_relaxNG_RNGElement_2Ljava_lang_String_2V(this$static, name_0){
  this$static.com_sensia_relaxNG_RNGElement_name = name_0;
}

function com_sensia_relaxNG_RNGElement_$setNamespace__Lcom_sensia_relaxNG_RNGElement_2Ljava_lang_String_2V(this$static, namespace){
  this$static.com_sensia_relaxNG_RNGElement_namespace = namespace;
}

function com_sensia_relaxNG_RNGElement_RNGElement__V(){
  com_sensia_relaxNG_RNGTagList_RNGTagList__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(28, 16, {28:1, 7:1, 16:1, 3:1}, com_sensia_relaxNG_RNGElement_RNGElement__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGElement_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  visitor.visit__Lcom_sensia_relaxNG_RNGElement_2V(this);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGElement_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  var com_sensia_relaxNG_RNGElement_$clone__Lcom_sensia_relaxNG_RNGElement_2Lcom_sensia_relaxNG_RNGElement_2_newTag_0;
  return com_sensia_relaxNG_RNGElement_$clone__Lcom_sensia_relaxNG_RNGElement_2Lcom_sensia_relaxNG_RNGElement_2_newTag_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 28) , com_sensia_relaxNG_RNGElement_$clone__Lcom_sensia_relaxNG_RNGElement_2Lcom_sensia_relaxNG_RNGElement_2_newTag_0.com_sensia_relaxNG_RNGElement_name = this.com_sensia_relaxNG_RNGElement_name , com_sensia_relaxNG_RNGElement_$clone__Lcom_sensia_relaxNG_RNGElement_2Lcom_sensia_relaxNG_RNGElement_2_newTag_0.com_sensia_relaxNG_RNGElement_namespace = this.com_sensia_relaxNG_RNGElement_namespace , com_sensia_relaxNG_RNGElement_$clone__Lcom_sensia_relaxNG_RNGElement_2Lcom_sensia_relaxNG_RNGElement_2_newTag_0;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGElement_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGElement_RNGElement__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGElement_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGElement', 28);
function com_sensia_relaxNG_RNGGrammar_$addNamespace__Lcom_sensia_relaxNG_RNGGrammar_2Ljava_lang_String_2Ljava_lang_String_2V(this$static, prefix, uri_0){
  java_util_LinkedHashMap_$put__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGGrammar_nsPrefixToUri, prefix, uri_0);
  java_util_LinkedHashMap_$put__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGGrammar_nsUriToPrefix, uri_0, prefix);
}

function com_sensia_relaxNG_RNGGrammar_$findPattern__Lcom_sensia_relaxNG_RNGGrammar_2Ljava_lang_String_2ZLcom_sensia_relaxNG_RNGDefine_2(this$static, name_0){
  var def, grammar, grammar$iterator;
  def = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_LinkedHashMap_$get__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGGrammar_patterns, name_0), 49);
  if (!def) {
    for (grammar$iterator = java_util_AbstractMap$2_$iterator__Ljava_util_AbstractMap$2_2Ljava_util_Iterator_2(new java_util_AbstractMap$2_AbstractMap$2__Ljava_util_AbstractMap_2V(this$static.com_sensia_relaxNG_RNGGrammar_includedGrammars)); java_util_LinkedHashMap$EntrySet$EntryIterator_$hasNext__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Z(grammar$iterator.java_util_AbstractMap$2$1_val$outerIter2);) {
      grammar = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_AbstractMap$2$1_$next__Ljava_util_AbstractMap$2$1_2Ljava_lang_Object_2(grammar$iterator), 75);
      def = com_sensia_relaxNG_RNGGrammar_$findPattern__Lcom_sensia_relaxNG_RNGGrammar_2Ljava_lang_String_2ZLcom_sensia_relaxNG_RNGDefine_2(grammar, name_0);
      if (def)
        return def;
    }
  }
  return def;
}

function com_sensia_relaxNG_RNGGrammar_$setStartPattern__Lcom_sensia_relaxNG_RNGGrammar_2Lcom_sensia_relaxNG_RNGGroup_2V(this$static, startPattern){
  this$static.com_sensia_relaxNG_RNGGrammar_startPattern = startPattern;
}

function com_sensia_relaxNG_RNGGrammar_RNGGrammar__V(){
  this.com_sensia_relaxNG_RNGGrammar_includedGrammars = new java_util_LinkedHashMap_LinkedHashMap__V;
  this.com_sensia_relaxNG_RNGGrammar_nsPrefixToUri = new java_util_LinkedHashMap_LinkedHashMap__V;
  this.com_sensia_relaxNG_RNGGrammar_nsUriToPrefix = new java_util_LinkedHashMap_LinkedHashMap__V;
  this.com_sensia_relaxNG_RNGGrammar_patterns = new java_util_LinkedHashMap_LinkedHashMap__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(75, 7, {75:1, 7:1, 3:1}, com_sensia_relaxNG_RNGGrammar_RNGGrammar__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGGrammar_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  visitor.visit__Lcom_sensia_relaxNG_RNGGrammar_2V(this);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGGrammar_clone__Lcom_sensia_relaxNG_RNGTag_2(){
  return null;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGGrammar_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGGrammar_RNGGrammar__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGGrammar_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGGrammar', 75);
function com_sensia_relaxNG_RNGGroup_$accept__Lcom_sensia_relaxNG_RNGGroup_2Lcom_sensia_relaxNG_RNGTagVisitor_2V(this$static, visitor){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(visitor, this$static.com_sensia_relaxNG_RNGTagList_children);
}

function com_sensia_relaxNG_RNGGroup_RNGGroup__V(){
  com_sensia_relaxNG_RNGTagList_RNGTagList__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(65, 16, {65:1, 7:1, 16:1, 3:1}, com_sensia_relaxNG_RNGGroup_RNGGroup__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGGroup_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  com_sensia_relaxNG_RNGGroup_$accept__Lcom_sensia_relaxNG_RNGGroup_2Lcom_sensia_relaxNG_RNGTagVisitor_2V(this, visitor);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGGroup_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 65);
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGGroup_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGGroup_RNGGroup__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGGroup_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGGroup', 65);
function com_sensia_relaxNG_RNGList_RNGList__V(){
  com_sensia_relaxNG_RNGTagList_RNGTagList__V.call(this);
  this.com_sensia_relaxNG_RNGTagList_children = new java_util_ArrayList_ArrayList__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(88, 16, {88:1, 7:1, 16:1, 3:1}, com_sensia_relaxNG_RNGList_RNGList__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGList_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGList_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 88);
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGList_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGList_RNGList__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGList_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGList', 88);
function com_sensia_relaxNG_RNGZeroOrMore_$newOccurence__Lcom_sensia_relaxNG_RNGZeroOrMore_2Ljava_util_List_2(this$static){
  var child, child$iterator, childClone, newChildren;
  newChildren = new java_util_ArrayList_ArrayList__V;
  for (child$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this$static.com_sensia_relaxNG_RNGTagList_children); child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
    child = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_i++), 7));
    childClone = child.clone__Lcom_sensia_relaxNG_RNGTag_2();
    com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(newChildren.java_util_ArrayList_array, newChildren.java_util_ArrayList_array.length, childClone);
  }
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static.com_sensia_relaxNG_RNGZeroOrMore_patternInstances, newChildren);
  return newChildren;
}

function com_sensia_relaxNG_RNGZeroOrMore_RNGZeroOrMore__V(){
  com_sensia_relaxNG_RNGTagList_RNGTagList__V.call(this);
  this.com_sensia_relaxNG_RNGZeroOrMore_patternInstances = new java_util_ArrayList_ArrayList__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(51, 16, {7:1, 16:1, 51:1, 3:1}, com_sensia_relaxNG_RNGZeroOrMore_RNGZeroOrMore__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGZeroOrMore_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  visitor.visit__Lcom_sensia_relaxNG_RNGZeroOrMore_2V(this);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGZeroOrMore_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  return this.clone__Lcom_sensia_relaxNG_RNGZeroOrMore_2();
}
;
_.clone__Lcom_sensia_relaxNG_RNGZeroOrMore_2 = function com_sensia_relaxNG_RNGZeroOrMore_clone__Lcom_sensia_relaxNG_RNGZeroOrMore_2(){
  return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 51);
}
;
_.getPatternInstances__Ljava_util_List_2 = function com_sensia_relaxNG_RNGZeroOrMore_getPatternInstances__Ljava_util_List_2(){
  return this.com_sensia_relaxNG_RNGZeroOrMore_patternInstances;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGZeroOrMore_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGZeroOrMore_RNGZeroOrMore__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGZeroOrMore_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGZeroOrMore', 51);
function com_sensia_relaxNG_RNGOneOrMore_RNGOneOrMore__V(){
  com_sensia_relaxNG_RNGZeroOrMore_RNGZeroOrMore__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(66, 51, {66:1, 7:1, 16:1, 51:1, 3:1}, com_sensia_relaxNG_RNGOneOrMore_RNGOneOrMore__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGOneOrMore_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  visitor.visit__Lcom_sensia_relaxNG_RNGZeroOrMore_2V(this);
}
;
_.clone__Lcom_sensia_relaxNG_RNGZeroOrMore_2 = function com_sensia_relaxNG_RNGOneOrMore_clone__Lcom_sensia_relaxNG_RNGZeroOrMore_2(){
  return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 51), 66);
}
;
_.getPatternInstances__Ljava_util_List_2 = function com_sensia_relaxNG_RNGOneOrMore_getPatternInstances__Ljava_util_List_2(){
  this.com_sensia_relaxNG_RNGZeroOrMore_patternInstances.java_util_ArrayList_array.length == 0 && com_sensia_relaxNG_RNGZeroOrMore_$newOccurence__Lcom_sensia_relaxNG_RNGZeroOrMore_2Ljava_util_List_2(this);
  return this.com_sensia_relaxNG_RNGZeroOrMore_patternInstances;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGOneOrMore_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGOneOrMore_RNGOneOrMore__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGOneOrMore_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGOneOrMore', 66);
function com_sensia_relaxNG_RNGOptional_$setSelected__Lcom_sensia_relaxNG_RNGOptional_2ZV(this$static, selected){
  this$static.com_sensia_relaxNG_RNGOptional_selected = selected;
}

function com_sensia_relaxNG_RNGOptional_RNGOptional__V(){
  com_sensia_relaxNG_RNGTagList_RNGTagList__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(76, 16, {76:1, 7:1, 16:1, 3:1}, com_sensia_relaxNG_RNGOptional_RNGOptional__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGOptional_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  visitor.visit__Lcom_sensia_relaxNG_RNGOptional_2V(this);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGOptional_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  var com_sensia_relaxNG_RNGOptional_$clone__Lcom_sensia_relaxNG_RNGOptional_2Lcom_sensia_relaxNG_RNGOptional_2_newTag_0;
  return com_sensia_relaxNG_RNGOptional_$clone__Lcom_sensia_relaxNG_RNGOptional_2Lcom_sensia_relaxNG_RNGOptional_2_newTag_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 76) , com_sensia_relaxNG_RNGOptional_$clone__Lcom_sensia_relaxNG_RNGOptional_2Lcom_sensia_relaxNG_RNGOptional_2_newTag_0.com_sensia_relaxNG_RNGOptional_selected = this.com_sensia_relaxNG_RNGOptional_selected , com_sensia_relaxNG_RNGOptional_$clone__Lcom_sensia_relaxNG_RNGOptional_2Lcom_sensia_relaxNG_RNGOptional_2_newTag_0;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGOptional_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGOptional_RNGOptional__V;
}
;
_.com_sensia_relaxNG_RNGOptional_selected = false;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGOptional_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGOptional', 76);
function com_sensia_relaxNG_RNGRef_$getPattern__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGDefine_2(this$static){
  !this$static.com_sensia_relaxNG_RNGRef_pattern && com_sensia_relaxNG_RNGRef_$lookupPattern__Lcom_sensia_relaxNG_RNGRef_2ZV(this$static);
  return this$static.com_sensia_relaxNG_RNGRef_pattern;
}

function com_sensia_relaxNG_RNGRef_$lookupPattern__Lcom_sensia_relaxNG_RNGRef_2ZV(this$static){
  var def;
  def = com_sensia_relaxNG_RNGGrammar_$findPattern__Lcom_sensia_relaxNG_RNGGrammar_2Ljava_lang_String_2ZLcom_sensia_relaxNG_RNGDefine_2(this$static.com_sensia_relaxNG_RNGRef_parentGrammar, this$static.com_sensia_relaxNG_RNGRef_patternName);
  !!def && (this$static.com_sensia_relaxNG_RNGRef_pattern = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(def), 49));
}

function com_sensia_relaxNG_RNGRef_$setParentGrammar__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGGrammar_2V(this$static, parentGrammar){
  this$static.com_sensia_relaxNG_RNGRef_parentGrammar = parentGrammar;
}

function com_sensia_relaxNG_RNGRef_$setPatternName__Lcom_sensia_relaxNG_RNGRef_2Ljava_lang_String_2V(this$static, patternName){
  this$static.com_sensia_relaxNG_RNGRef_patternName = patternName;
}

function com_sensia_relaxNG_RNGRef_RNGRef__V(){
  com_sensia_relaxNG_RNGTagList_RNGTagList__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(50, 16, {50:1, 7:1, 16:1, 3:1}, com_sensia_relaxNG_RNGRef_RNGRef__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGRef_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGRef_2V(visitor, this);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTagList_2 = function com_sensia_relaxNG_RNGRef_clone__Lcom_sensia_relaxNG_RNGTagList_2(){
  var com_sensia_relaxNG_RNGRef_$clone__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGRef_2_newTag_0;
  return com_sensia_relaxNG_RNGRef_$clone__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGRef_2_newTag_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this), 50) , com_sensia_relaxNG_RNGRef_$clone__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGRef_2_newTag_0.com_sensia_relaxNG_RNGRef_parentGrammar = this.com_sensia_relaxNG_RNGRef_parentGrammar , com_sensia_relaxNG_RNGRef_$clone__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGRef_2_newTag_0.com_sensia_relaxNG_RNGRef_patternName = this.com_sensia_relaxNG_RNGRef_patternName , !!this.com_sensia_relaxNG_RNGRef_pattern && (com_sensia_relaxNG_RNGRef_$clone__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGRef_2_newTag_0.com_sensia_relaxNG_RNGRef_pattern = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTagList_$clone__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGTagList_2(this.com_sensia_relaxNG_RNGRef_pattern), 49)) , com_sensia_relaxNG_RNGRef_$clone__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGRef_2_newTag_0;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGRef_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGRef_RNGRef__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGRef_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGRef', 50);
function com_sensia_relaxNG_RNGText_RNGText__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(89, 7, {7:1, 89:1, 3:1}, com_sensia_relaxNG_RNGText_RNGText__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGText_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  var com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGText_2V_widget_0;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGText_2V_widget_0 = new com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_RNGTextWidget__Lcom_sensia_relaxNG_RNGText_2V(this);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(visitor.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGText_2V_widget_0);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGText_clone__Lcom_sensia_relaxNG_RNGTag_2(){
  var com_sensia_relaxNG_RNGText_$clone__Lcom_sensia_relaxNG_RNGText_2Lcom_sensia_relaxNG_RNGText_2_newTag_0;
  return com_sensia_relaxNG_RNGText_$clone__Lcom_sensia_relaxNG_RNGText_2Lcom_sensia_relaxNG_RNGText_2_newTag_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTag_$clone__Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_relaxNG_RNGTag_2(this), 89) , com_sensia_relaxNG_RNGText_$clone__Lcom_sensia_relaxNG_RNGText_2Lcom_sensia_relaxNG_RNGText_2_newTag_0.com_sensia_relaxNG_RNGText_text = this.com_sensia_relaxNG_RNGText_text , com_sensia_relaxNG_RNGText_$clone__Lcom_sensia_relaxNG_RNGText_2Lcom_sensia_relaxNG_RNGText_2_newTag_0;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGText_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGText_RNGText__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGText_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGText', 89);
function com_sensia_relaxNG_RNGValue_$setText__Lcom_sensia_relaxNG_RNGValue_2Ljava_lang_String_2V(this$static, text_0){
  this$static.com_sensia_relaxNG_RNGValue_text = text_0;
}

function com_sensia_relaxNG_RNGValue_RNGValue__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(42, 7, {7:1, 42:1, 3:1}, com_sensia_relaxNG_RNGValue_RNGValue__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_RNGValue_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  var com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGValue_2V_widget_0;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGValue_2V_widget_0 = new com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_RNGValueWidget__Lcom_sensia_relaxNG_RNGValue_2V(this);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(visitor.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGValue_2V_widget_0);
}
;
_.clone__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGValue_clone__Lcom_sensia_relaxNG_RNGTag_2(){
  var com_sensia_relaxNG_RNGValue_$clone__Lcom_sensia_relaxNG_RNGValue_2Lcom_sensia_relaxNG_RNGValue_2_newTag_0;
  return com_sensia_relaxNG_RNGValue_$clone__Lcom_sensia_relaxNG_RNGValue_2Lcom_sensia_relaxNG_RNGValue_2_newTag_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_relaxNG_RNGTag_$clone__Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_relaxNG_RNGTag_2(this), 42) , com_sensia_relaxNG_RNGValue_$clone__Lcom_sensia_relaxNG_RNGValue_2Lcom_sensia_relaxNG_RNGValue_2_newTag_0.com_sensia_relaxNG_RNGValue_text = this.com_sensia_relaxNG_RNGValue_text , com_sensia_relaxNG_RNGValue_$clone__Lcom_sensia_relaxNG_RNGValue_2Lcom_sensia_relaxNG_RNGValue_2_newTag_0;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_RNGValue_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_RNGValue_RNGValue__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1RNGValue_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'RNGValue', 42);
function com_sensia_relaxNG_XSDString_$getLength__Lcom_sensia_relaxNG_XSDString_2I(this$static){
  var length_0;
  length_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2('length'));
  return length_0 != null?java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(length_0):-1;
}

function com_sensia_relaxNG_XSDString_$getMaxLength__Lcom_sensia_relaxNG_XSDString_2I(this$static){
  var maxLength;
  maxLength = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2('maxLength'));
  return maxLength != null?java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(maxLength):-1;
}

function com_sensia_relaxNG_XSDString_$isValid__Lcom_sensia_relaxNG_XSDString_2Ljava_lang_String_2Z(this$static, val){
  var length_0, maxLength, minLength, regex, textLength, valid, com_sensia_relaxNG_XSDString_$getMinLength__Lcom_sensia_relaxNG_XSDString_2I_minLength_0;
  if (val == null)
    return false;
  valid = true;
  length_0 = com_sensia_relaxNG_XSDString_$getLength__Lcom_sensia_relaxNG_XSDString_2I(this$static);
  minLength = (com_sensia_relaxNG_XSDString_$getMinLength__Lcom_sensia_relaxNG_XSDString_2I_minLength_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2('minLength')) , com_sensia_relaxNG_XSDString_$getMinLength__Lcom_sensia_relaxNG_XSDString_2I_minLength_0 != null?java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(com_sensia_relaxNG_XSDString_$getMinLength__Lcom_sensia_relaxNG_XSDString_2I_minLength_0):-1);
  maxLength = com_sensia_relaxNG_XSDString_$getMaxLength__Lcom_sensia_relaxNG_XSDString_2I(this$static);
  regex = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2('pattern'));
  textLength = val.length;
  maxLength > 0 && textLength > maxLength?(valid = false):minLength > 0 && textLength < minLength?(valid = false):length_0 > 0 && textLength != length_0?(valid = false):regex != null && !java_lang_String_$matches__Ljava_lang_String_2Ljava_lang_String_2Z(val, regex) && (valid = false);
  return valid;
}

function com_sensia_relaxNG_XSDString_XSDString__V(){
  com_sensia_relaxNG_RNGData_RNGData__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(90, 21, $intern_67, com_sensia_relaxNG_XSDString_XSDString__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_XSDString_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDString_2V(visitor, this);
}
;
_.isValid__Ljava_lang_String_2Z = function com_sensia_relaxNG_XSDString_isValid__Ljava_lang_String_2Z(val){
  return com_sensia_relaxNG_XSDString_$isValid__Lcom_sensia_relaxNG_XSDString_2Ljava_lang_String_2Z(this, val);
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_XSDString_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_XSDString_XSDString__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1XSDString_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'XSDString', 90);
function com_sensia_relaxNG_XSDAnyURI_XSDAnyURI__V(){
  com_sensia_relaxNG_XSDString_XSDString__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(139, 90, $intern_67, com_sensia_relaxNG_XSDAnyURI_XSDAnyURI__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_XSDAnyURI_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  var com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDAnyURI_2V_widget_0;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDAnyURI_2V_widget_0 = new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_XSDAnyURIWidget__Lcom_sensia_relaxNG_XSDAnyURI_2V(this);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(visitor.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDAnyURI_2V_widget_0);
}
;
_.isValid__Ljava_lang_String_2Z = function com_sensia_relaxNG_XSDAnyURI_isValid__Ljava_lang_String_2Z(val){
  if (!com_sensia_relaxNG_XSDString_$isValid__Lcom_sensia_relaxNG_XSDString_2Ljava_lang_String_2Z(this, val))
    return false;
  return java_lang_String_$matches__Ljava_lang_String_2Ljava_lang_String_2Z(val, com_sensia_relaxNG_XSDAnyURI_urnRegex) || java_lang_String_$matches__Ljava_lang_String_2Ljava_lang_String_2Z(val, com_sensia_relaxNG_XSDAnyURI_urlRegex);
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_XSDAnyURI_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_XSDAnyURI_XSDAnyURI__V;
}
;
var com_sensia_relaxNG_XSDAnyURI_urlRegex = '^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]$', com_sensia_relaxNG_XSDAnyURI_urnRegex = "^urn:[a-zA-Z0-9][a-zA-Z0-9-]{0,31}:[a-zA-Z0-9()+,\\-.:=@;$_!*'%/?#]+$";
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1XSDAnyURI_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'XSDAnyURI', 139);
function com_sensia_relaxNG_XSDBoolean_XSDBoolean__V(){
  com_sensia_relaxNG_RNGData_RNGData__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(135, 21, $intern_67, com_sensia_relaxNG_XSDBoolean_XSDBoolean__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_XSDBoolean_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
}
;
_.isValid__Ljava_lang_String_2Z = function com_sensia_relaxNG_XSDBoolean_isValid__Ljava_lang_String_2Z(val){
  if (val == null)
    return false;
  try {
    java_lang_Boolean_$clinit__V();
    java_lang_String_$equalsIgnoreCase__Ljava_lang_String_2Ljava_lang_String_2Z('true', val);
    return true;
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 9)) {
      return false;
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
  }
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_XSDBoolean_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_XSDBoolean_XSDBoolean__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1XSDBoolean_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'XSDBoolean', 135);
function com_sensia_relaxNG_XSDDateTime_XSDDateTime__V(){
  com_sensia_relaxNG_RNGData_RNGData__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(136, 21, $intern_67, com_sensia_relaxNG_XSDDateTime_XSDDateTime__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_XSDDateTime_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  var com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDDateTime_2V_widget_0;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDDateTime_2V_widget_0 = new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDDateTimeWidget_XSDDateTimeWidget__Lcom_sensia_relaxNG_XSDDateTime_2V(this);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(visitor.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDDateTime_2V_widget_0);
}
;
_.isValid__Ljava_lang_String_2Z = function com_sensia_relaxNG_XSDDateTime_isValid__Ljava_lang_String_2Z(val){
  if (val == null)
    return false;
  try {
    new java_util_Date_Date__V;
    return true;
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 9)) {
      return false;
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
  }
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_XSDDateTime_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_XSDDateTime_XSDDateTime__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1XSDDateTime_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'XSDDateTime', 136);
function com_sensia_relaxNG_XSDDecimal_$isValid__Lcom_sensia_relaxNG_XSDDecimal_2Ljava_lang_Double_2Z(this$static, val){
  var com_sensia_relaxNG_XSDDecimal_$getMaxExclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0, com_sensia_relaxNG_XSDDecimal_$getMaxInclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0, com_sensia_relaxNG_XSDDecimal_$getMinExclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0, com_sensia_relaxNG_XSDDecimal_$getMinInclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0;
  if (val.java_lang_Double_value >= (com_sensia_relaxNG_XSDDecimal_$getMaxExclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_68)) , com_sensia_relaxNG_XSDDecimal_$getMaxExclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0 == null?Infinity:java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(com_sensia_relaxNG_XSDDecimal_$getMaxExclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0)))
    return false;
  if (val.java_lang_Double_value > (com_sensia_relaxNG_XSDDecimal_$getMaxInclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_69)) , com_sensia_relaxNG_XSDDecimal_$getMaxInclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0 == null?Infinity:java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(com_sensia_relaxNG_XSDDecimal_$getMaxInclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0)))
    return false;
  if (val.java_lang_Double_value <= (com_sensia_relaxNG_XSDDecimal_$getMinExclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_70)) , com_sensia_relaxNG_XSDDecimal_$getMinExclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0 == null?-Infinity:java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(com_sensia_relaxNG_XSDDecimal_$getMinExclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0)))
    return false;
  if (val.java_lang_Double_value < (com_sensia_relaxNG_XSDDecimal_$getMinInclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_71)) , com_sensia_relaxNG_XSDDecimal_$getMinInclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0 == null?-Infinity:java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(com_sensia_relaxNG_XSDDecimal_$getMinInclusive__Lcom_sensia_relaxNG_XSDDecimal_2D_val_0)))
    return false;
  return true;
}

function com_sensia_relaxNG_XSDDecimal_XSDDecimal__V(){
  com_sensia_relaxNG_RNGData_RNGData__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(106, 21, $intern_67, com_sensia_relaxNG_XSDDecimal_XSDDecimal__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_XSDDecimal_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  var com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDDecimal_2V_widget_0;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDDecimal_2V_widget_0 = new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDDecimalWidget_XSDDecimalWidget__Lcom_sensia_relaxNG_RNGData_2V(this);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(visitor.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDDecimal_2V_widget_0);
}
;
_.isValid__Ljava_lang_String_2Z = function com_sensia_relaxNG_XSDDecimal_isValid__Ljava_lang_String_2Z(val){
  var dVal;
  if (val == null)
    return false;
  try {
    dVal = java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(val);
    return com_sensia_relaxNG_XSDDecimal_$isValid__Lcom_sensia_relaxNG_XSDDecimal_2Ljava_lang_Double_2Z(this, new java_lang_Double_Double__DV(dVal));
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 52)) {
      return false;
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
  }
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_XSDDecimal_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_XSDDecimal_XSDDecimal__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1XSDDecimal_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'XSDDecimal', 106);
function com_sensia_relaxNG_XSDDouble_XSDDouble__V(){
  com_sensia_relaxNG_XSDDecimal_XSDDecimal__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(137, 106, $intern_67, com_sensia_relaxNG_XSDDouble_XSDDouble__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_XSDDouble_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  var com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDDouble_2V_widget_0;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDDouble_2V_widget_0 = new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDDoubleWidget_XSDDoubleWidget__Lcom_sensia_relaxNG_XSDDouble_2V(this);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(visitor.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDDouble_2V_widget_0);
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_XSDDouble_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_XSDDouble_XSDDouble__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1XSDDouble_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'XSDDouble', 137);
function com_sensia_relaxNG_XSDInteger_$getTotalDigits__Lcom_sensia_relaxNG_XSDInteger_2I(this$static){
  var val;
  val = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2('totalDigits'));
  return val == null?-1:java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(val);
}

function com_sensia_relaxNG_XSDInteger_$isValid__Lcom_sensia_relaxNG_XSDInteger_2Ljava_lang_Integer_2Z(this$static, val){
  var com_sensia_relaxNG_XSDInteger_$getMaxExclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0, com_sensia_relaxNG_XSDInteger_$getMaxInclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0, com_sensia_relaxNG_XSDInteger_$getMinExclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0, com_sensia_relaxNG_XSDInteger_$getMinInclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0;
  if (val.java_lang_Integer_value >= (com_sensia_relaxNG_XSDInteger_$getMaxExclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_68)) , com_sensia_relaxNG_XSDInteger_$getMaxExclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0 == null?$intern_2:java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(com_sensia_relaxNG_XSDInteger_$getMaxExclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0)))
    return false;
  if (val.java_lang_Integer_value > (com_sensia_relaxNG_XSDInteger_$getMaxInclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_69)) , com_sensia_relaxNG_XSDInteger_$getMaxInclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0 == null?$intern_2:java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(com_sensia_relaxNG_XSDInteger_$getMaxInclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0)))
    return false;
  if (val.java_lang_Integer_value <= (com_sensia_relaxNG_XSDInteger_$getMinExclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_70)) , com_sensia_relaxNG_XSDInteger_$getMinExclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0 == null?$intern_72:java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(com_sensia_relaxNG_XSDInteger_$getMinExclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0)))
    return false;
  if (val.java_lang_Integer_value < (com_sensia_relaxNG_XSDInteger_$getMinInclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0 = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_relaxNG_RNGData_params.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_71)) , com_sensia_relaxNG_XSDInteger_$getMinInclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0 == null?$intern_72:java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(com_sensia_relaxNG_XSDInteger_$getMinInclusive__Lcom_sensia_relaxNG_XSDInteger_2I_val_0)))
    return false;
  return true;
}

function com_sensia_relaxNG_XSDInteger_XSDInteger__V(){
  com_sensia_relaxNG_RNGData_RNGData__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(138, 21, $intern_67, com_sensia_relaxNG_XSDInteger_XSDInteger__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_XSDInteger_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  var com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDInteger_2V_widget_0;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDInteger_2V_widget_0 = new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_XSDIntegerWidget__Lcom_sensia_relaxNG_XSDInteger_2V(this);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(visitor.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDInteger_2V_widget_0);
}
;
_.isValid__Ljava_lang_String_2Z = function com_sensia_relaxNG_XSDInteger_isValid__Ljava_lang_String_2Z(val){
  var iVal, numDigits, totalDigits;
  if (val == null)
    return false;
  try {
    iVal = java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(val);
    totalDigits = com_sensia_relaxNG_XSDInteger_$getTotalDigits__Lcom_sensia_relaxNG_XSDInteger_2I(this);
    if (totalDigits > 0) {
      numDigits = val.length;
      iVal < 0 && --numDigits;
      if (numDigits != totalDigits)
        return false;
    }
    return com_sensia_relaxNG_XSDInteger_$isValid__Lcom_sensia_relaxNG_XSDInteger_2Ljava_lang_Integer_2Z(this, java_lang_Integer_valueOf__ILjava_lang_Integer_2(iVal));
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_wrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z($e0, 52)) {
      return false;
    }
     else 
      throw com_google_gwt_lang_Exceptions_unwrap__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
  }
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_XSDInteger_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_XSDInteger_XSDInteger__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1XSDInteger_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'XSDInteger', 138);
function com_sensia_relaxNG_XSDToken_XSDToken__V(){
  com_sensia_relaxNG_XSDString_XSDString__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(140, 90, $intern_67, com_sensia_relaxNG_XSDToken_XSDToken__V);
_.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V = function com_sensia_relaxNG_XSDToken_accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(visitor){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDString_2V(visitor, this);
}
;
_.isValid__Ljava_lang_String_2Z = function com_sensia_relaxNG_XSDToken_isValid__Ljava_lang_String_2Z(val){
  if (!com_sensia_relaxNG_XSDString_$isValid__Lcom_sensia_relaxNG_XSDString_2Ljava_lang_String_2Z(this, val))
    return false;
  return val.indexOf('  ') == -1;
}
;
_.newInstance__Lcom_sensia_relaxNG_RNGTag_2 = function com_sensia_relaxNG_XSDToken_newInstance__Lcom_sensia_relaxNG_RNGTag_2(){
  return new com_sensia_relaxNG_XSDToken_XSDToken__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1relaxNG_1XSDToken_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_66, 'XSDToken', 140);
function com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_$SMLtoNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2Ljava_lang_String_2Ljava_lang_String_2(name_0){
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(name_0, 'id')?(name_0 = 'Local ID'):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(name_0, $intern_73)?(name_0 = 'Begin'):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(name_0, $intern_74) && (name_0 = 'End');
  return com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(name_0);
}

function com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V(name_0){
  this.com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_name = name_0;
}

function com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(name_0){
  var b, c, i, label_0, space, com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toCamelCase__Ljava_lang_String_2Ljava_lang_String_2_s1_0;
  label_0 = java_lang_String_$replace__Ljava_lang_String_2CCLjava_lang_String_2((com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toCamelCase__Ljava_lang_String_2Ljava_lang_String_2_s1_0 = name_0.substr(0, 1).toUpperCase() , name_0.length > 1 && (com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toCamelCase__Ljava_lang_String_2Ljava_lang_String_2_s1_0 += java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(name_0, 1, name_0.length - 1)) , com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toCamelCase__Ljava_lang_String_2Ljava_lang_String_2_s1_0), 95, 32);
  b = new java_lang_StringBuilder_StringBuilder__Ljava_lang_String_2V(label_0);
  if (label_0.length > 1) {
    space = true;
    for (i = 1; i < b.java_lang_AbstractStringBuilder_string.length; i++) {
      c = java_lang_String_$charAt__Ljava_lang_String_2IC(b.java_lang_AbstractStringBuilder_string, i);
      if (!space && java_lang_Character_toUpperCase__CC(c) == c && java_lang_Character_isLetter__CZ(c) && java_lang_Character_isLowerCase__CZ(java_lang_String_$charAt__Ljava_lang_String_2IC(b.java_lang_AbstractStringBuilder_string, i - 1))) {
        b.java_lang_AbstractStringBuilder_string = java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(b.java_lang_AbstractStringBuilder_string, 0, i) + ' ' + java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(b.java_lang_AbstractStringBuilder_string, i);
        space = true;
        ++i;
      }
       else 
        c == 32?(space = true):(space = false);
    }
  }
  return b.java_lang_AbstractStringBuilder_string;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(4, 1, $intern_75);
_.addPanel__Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V = function com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_addPanel__Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(widget){
  this.getPanel__Lcom_google_gwt_user_client_ui_Panel_2().add__Lcom_google_gwt_user_client_ui_Widget_2V(widget.getPanel__Lcom_google_gwt_user_client_ui_Panel_2());
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1AbstractSensorWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'AbstractSensorWidget', 4);
function com_sensia_swetools_editors_sensorml_client_RNGProcessorSML_$parse__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2Ljava_lang_String_2V(this$static, url_0){
  var parser;
  parser = new com_sensia_gwt_relaxNG_RNGParser_RNGParser__V;
  com_sensia_gwt_relaxNG_RNGParser_$parse__Lcom_sensia_gwt_relaxNG_RNGParser_2Ljava_lang_String_2Lcom_sensia_gwt_relaxNG_RNGParserCallback_2V(parser, url_0, new com_sensia_swetools_editors_sensorml_client_RNGProcessorSML$1_RNGProcessorSML$1__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V(this$static));
}

function com_sensia_swetools_editors_sensorml_client_RNGProcessorSML_RNGProcessorSML__V(){
  this.com_sensia_swetools_editors_sensorml_client_RNGProcessorSML_observers = new java_util_ArrayList_ArrayList__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(174, 1, {}, com_sensia_swetools_editors_sensorml_client_RNGProcessorSML_RNGProcessorSML__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGProcessorSML_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGProcessorSML', 174);
function com_sensia_swetools_editors_sensorml_client_RNGProcessorSML$1_RNGProcessorSML$1__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V(this$0){
  this.com_sensia_swetools_editors_sensorml_client_RNGProcessorSML$1_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(175, 1, {}, com_sensia_swetools_editors_sensorml_client_RNGProcessorSML$1_RNGProcessorSML$1__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V);
_.onParseDone__Lcom_sensia_relaxNG_RNGGrammar_2V = function com_sensia_swetools_editors_sensorml_client_RNGProcessorSML$1_onParseDone__Lcom_sensia_relaxNG_RNGGrammar_2V(grammar){
  var observer, observer$iterator, renderer, com_sensia_swetools_editors_sensorml_client_RNGRenderer_$getWidgets__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2_top_0;
  renderer = new com_sensia_swetools_editors_sensorml_client_RNGRendererSML_RNGRendererSML__V;
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGGrammar_2V(renderer, grammar);
  for (observer$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this.com_sensia_swetools_editors_sensorml_client_RNGProcessorSML$1_this$01.com_sensia_swetools_editors_sensorml_client_RNGProcessorSML_observers); observer$iterator.java_util_AbstractList$IteratorImpl_i < observer$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
    observer = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(observer$iterator.java_util_AbstractList$IteratorImpl_i < observer$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(observer$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(observer$iterator.java_util_AbstractList$IteratorImpl_i++), 288));
    observer.parseDone__Ljava_util_List_2V((com_sensia_swetools_editors_sensorml_client_RNGRenderer_$getWidgets__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2_top_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(renderer.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6) , com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$getWidgets__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2_top_0.get__ILjava_lang_Object_2(0), 85) && (com_sensia_swetools_editors_sensorml_client_RNGRenderer_$getWidgets__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2_top_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_sensia_swetools_editors_sensorml_client_RNGRenderer_$getWidgets__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2_top_0.get__ILjava_lang_Object_2(0), 85).com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_sections) , com_sensia_swetools_editors_sensorml_client_RNGRenderer_$getWidgets__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2_top_0));
  }
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGProcessorSML$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGProcessorSML/1', 175);
function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$addWidgetsToWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this$static, widget){
  var w, w$iterator, wList;
  wList = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6);
  for (w$iterator = wList.iterator__Ljava_util_Iterator_2(); w$iterator.hasNext__Z();) {
    w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(w$iterator.next__Ljava_lang_Object_2(), 4);
    widget.addPanel__Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(w);
  }
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(widget);
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$findLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(this$static, tag){
  var annot, children, def;
  annot = tag.com_sensia_relaxNG_RNGTag_annotation;
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 28)) {
    return this$static.toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 28).com_sensia_relaxNG_RNGElement_name);
  }
   else if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 35)) {
    return this$static.toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 35).com_sensia_relaxNG_RNGAttribute_name);
  }
   else if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 21)) {
    return annot;
  }
   else if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 49) || com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 65) || com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 76) || com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 51) || com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 66)) {
    if (annot != null)
      return annot;
    children = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 16).com_sensia_relaxNG_RNGTagList_children;
    if (children.java_util_ArrayList_array.length == 1)
      return this$static.findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2((com_google_gwt_core_shared_impl_InternalPreconditions_checkElementIndex__IIV(0, children.java_util_ArrayList_array.length) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(children.java_util_ArrayList_array[0], 7)));
  }
   else if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 50)) {
    if (annot != null)
      return annot;
    def = com_sensia_relaxNG_RNGRef_$getPattern__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGDefine_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 50));
    if (def)
      return this$static.findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(def);
  }
  return null;
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static){
  var wList;
  wList = new java_util_ArrayList_ArrayList__V;
  java_util_Stack_$push__Ljava_util_Stack_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets, wList);
  return wList;
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$onPatternChanged__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, tag, oldWidget){
  var newWidget, newWidgets, oldIndex, parentWidget;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static);
  tag.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(this$static);
  newWidgets = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6);
  newWidget = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(newWidgets.get__ILjava_lang_Object_2(0), 4);
  parentWidget = oldWidget.com_google_gwt_user_client_ui_Widget_parent;
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(parentWidget, 60)) {
    com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(oldWidget);
    com_google_gwt_user_client_ui_SimplePanel_$add__Lcom_google_gwt_user_client_ui_SimplePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(parentWidget, 60), newWidget.getWidget__Lcom_google_gwt_user_client_ui_Widget_2());
  }
   else if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(parentWidget, 61)) {
    oldIndex = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(parentWidget, 61).getWidgetIndex__Lcom_google_gwt_user_client_ui_Widget_2I(oldWidget);
    com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(oldWidget);
    com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(parentWidget, 61).insert__Lcom_google_gwt_user_client_ui_Widget_2IV(newWidget.getWidget__Lcom_google_gwt_user_client_ui_Widget_2(), oldIndex);
  }
   else 
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V("Panel doesn't support insert");
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$toNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_lang_String_2Ljava_lang_String_2(name_0){
  var b, c, i, label_0, space, com_sensia_swetools_editors_sensorml_client_RNGRenderer_$toCamelCase__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_lang_String_2Ljava_lang_String_2_s1_0;
  label_0 = java_lang_String_$replace__Ljava_lang_String_2CCLjava_lang_String_2((com_sensia_swetools_editors_sensorml_client_RNGRenderer_$toCamelCase__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_lang_String_2Ljava_lang_String_2_s1_0 = name_0.substr(0, 1).toUpperCase() , name_0.length > 1 && (com_sensia_swetools_editors_sensorml_client_RNGRenderer_$toCamelCase__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_lang_String_2Ljava_lang_String_2_s1_0 += java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(name_0, 1, name_0.length - 1)) , com_sensia_swetools_editors_sensorml_client_RNGRenderer_$toCamelCase__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_lang_String_2Ljava_lang_String_2_s1_0), 95, 32);
  b = new java_lang_StringBuilder_StringBuilder__Ljava_lang_String_2V(label_0);
  if (label_0.length > 1) {
    space = true;
    for (i = 1; i < b.java_lang_AbstractStringBuilder_string.length; i++) {
      c = java_lang_String_$charAt__Ljava_lang_String_2IC(b.java_lang_AbstractStringBuilder_string, i);
      if (!space && java_lang_Character_toUpperCase__CC(c) == c && java_lang_Character_isLetter__CZ(c) && java_lang_Character_isLowerCase__CZ(java_lang_String_$charAt__Ljava_lang_String_2IC(b.java_lang_AbstractStringBuilder_string, i - 1))) {
        b.java_lang_AbstractStringBuilder_string = java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(b.java_lang_AbstractStringBuilder_string, 0, i) + ' ' + java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(b.java_lang_AbstractStringBuilder_string, i);
        space = true;
        ++i;
      }
       else 
        c == 32?(space = true):(space = false);
    }
  }
  return b.java_lang_AbstractStringBuilder_string;
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGChoice_2V(this$static, choice){
  var widget;
  widget = new com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_RNGRenderer$RNGChoiceWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGChoice_2V(this$static, choice);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(widget);
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGElement_2V(this$static, elt){
  var widget;
  widget = new com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_RNGElementWidget__Lcom_sensia_relaxNG_RNGElement_2V(elt);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$static, elt.com_sensia_relaxNG_RNGTagList_children);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$addWidgetsToWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this$static, widget);
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGGrammar_2V(this$static, grammar){
  if (!grammar.com_sensia_relaxNG_RNGGrammar_startPattern)
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V("Grammar has no 'start' pattern and cannot be used to create a new instance");
  com_sensia_relaxNG_RNGGroup_$accept__Lcom_sensia_relaxNG_RNGGroup_2Lcom_sensia_relaxNG_RNGTagVisitor_2V(grammar.com_sensia_relaxNG_RNGGrammar_startPattern, this$static);
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGOptional_2V(this$static, optional){
  var widget;
  widget = new com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_RNGRenderer$RNGOptionalWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGOptional_2V(this$static, optional);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(widget);
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGRef_2V(this$static, ref){
  var widget;
  !ref.com_sensia_relaxNG_RNGRef_pattern && com_sensia_relaxNG_RNGRef_$lookupPattern__Lcom_sensia_relaxNG_RNGRef_2ZV(ref);
  if (ref.com_sensia_relaxNG_RNGRef_pattern) {
    com_sensia_relaxNG_RNGDefine_$accept__Lcom_sensia_relaxNG_RNGDefine_2Lcom_sensia_relaxNG_RNGTagVisitor_2V((!ref.com_sensia_relaxNG_RNGRef_pattern && com_sensia_relaxNG_RNGRef_$lookupPattern__Lcom_sensia_relaxNG_RNGRef_2ZV(ref) , ref.com_sensia_relaxNG_RNGRef_pattern), this$static);
  }
   else {
    widget = new com_sensia_swetools_editors_sensorml_client_panels_elements_RNGRefWidget_RNGRefWidget__Lcom_sensia_relaxNG_RNGRef_2V(ref);
    com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(widget);
  }
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGZeroOrMore_2V(this$static, zeroOrMore){
  var widget;
  widget = new com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_RNGRenderer$RNGZeroOrMoreWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGZeroOrMore_2V(this$static, zeroOrMore);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(widget);
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_XSDString_2V(this$static, data_0){
  var widget;
  widget = new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_XSDStringWidget__Lcom_sensia_relaxNG_XSDString_2V(data_0);
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(widget);
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$static, tags){
  var tag, tag$iterator;
  for (tag$iterator = tags.iterator__Ljava_util_Iterator_2(); tag$iterator.hasNext__Z();) {
    tag = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag$iterator.next__Ljava_lang_Object_2(), 7);
    !!tag && tag.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(this$static);
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(212, 1, {});
_.findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2 = function com_sensia_swetools_editors_sensorml_client_RNGRenderer_findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(tag){
  return com_sensia_swetools_editors_sensorml_client_RNGRenderer_$findLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(this, tag);
}
;
_.toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2 = function com_sensia_swetools_editors_sensorml_client_RNGRenderer_toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(name_0){
  return com_sensia_swetools_editors_sensorml_client_RNGRenderer_$toNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_lang_String_2Ljava_lang_String_2(name_0);
}
;
_.visit__Lcom_sensia_relaxNG_RNGAttribute_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer_visit__Lcom_sensia_relaxNG_RNGAttribute_2V(attribute){
  var widget;
  widget = new com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_RNGAttributeWidget__Lcom_sensia_relaxNG_RNGAttribute_2V(attribute);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this, attribute.com_sensia_relaxNG_RNGTagList_children);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$addWidgetsToWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this, widget);
}
;
_.visit__Lcom_sensia_relaxNG_RNGChoice_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer_visit__Lcom_sensia_relaxNG_RNGChoice_2V(choice){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGChoice_2V(this, choice);
}
;
_.visit__Lcom_sensia_relaxNG_RNGElement_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer_visit__Lcom_sensia_relaxNG_RNGElement_2V(elt){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGElement_2V(this, elt);
}
;
_.visit__Lcom_sensia_relaxNG_RNGGrammar_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer_visit__Lcom_sensia_relaxNG_RNGGrammar_2V(grammar){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGGrammar_2V(this, grammar);
}
;
_.visit__Lcom_sensia_relaxNG_RNGOptional_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer_visit__Lcom_sensia_relaxNG_RNGOptional_2V(optional){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGOptional_2V(this, optional);
}
;
_.visit__Lcom_sensia_relaxNG_RNGZeroOrMore_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer_visit__Lcom_sensia_relaxNG_RNGZeroOrMore_2V(zeroOrMore){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGZeroOrMore_2V(this, zeroOrMore);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRenderer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRenderer', 212);
function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_RNGRenderer$RNGChoiceWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGChoice_2V(this$0, choice){
  var b, combo, contentPanel, label_0, panel, tag, tag$iterator, w, w$iterator;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_this$01 = this$0;
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_container = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
  if (choice.com_sensia_relaxNG_RNGChoice_selectedIndex >= 0 && choice.com_sensia_relaxNG_RNGChoice_selectedIndex < choice.com_sensia_relaxNG_RNGTagList_children.java_util_ArrayList_array.length) {
    panel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
    contentPanel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$0);
    (choice.com_sensia_relaxNG_RNGChoice_selectedIndex >= 0 && choice.com_sensia_relaxNG_RNGChoice_selectedIndex < choice.com_sensia_relaxNG_RNGTagList_children.java_util_ArrayList_array.length?com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(choice.com_sensia_relaxNG_RNGTagList_children, choice.com_sensia_relaxNG_RNGChoice_selectedIndex), 7):null).accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(this$0);
    for (w$iterator = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$0.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).iterator__Ljava_util_Iterator_2(); w$iterator.hasNext__Z();) {
      w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(w$iterator.next__Ljava_lang_Object_2(), 4);
      com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(contentPanel, w.getWidget__Lcom_google_gwt_user_client_ui_Widget_2());
    }
    com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(panel, contentPanel);
    b = new com_google_gwt_user_client_ui_Label_Label__V;
    (com_google_gwt_user_client_DOM_$clinit__V() , b.com_google_gwt_user_client_ui_UIObject_element).style[$intern_49] = '16px';
    b.com_google_gwt_user_client_ui_UIObject_element.style[$intern_48] = '16px';
    com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV(b.com_google_gwt_user_client_ui_UIObject_element, 'rng-choice-change', true);
    com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(panel, b);
    com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(b, new com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_RNGRenderer$RNGChoiceWidget$1__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_2V(this, choice, panel), (com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_TYPE));
    com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_container, panel);
  }
   else {
    combo = new com_google_gwt_user_client_ui_ListBox_ListBox__V;
    (com_google_gwt_user_client_DOM_$clinit__V() , combo.com_google_gwt_user_client_ui_UIObject_element).size = 1;
    com_google_gwt_user_client_ui_ListBox_$insertItem__Lcom_google_gwt_user_client_ui_ListBox_2Ljava_lang_String_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2Ljava_lang_String_2IV(combo, '----', 'none', -1);
    com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV(combo.com_google_gwt_user_client_ui_UIObject_element, $intern_77, true);
    for (tag$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(choice.com_sensia_relaxNG_RNGTagList_children); tag$iterator.java_util_AbstractList$IteratorImpl_i < tag$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
      tag = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(tag$iterator.java_util_AbstractList$IteratorImpl_i < tag$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(tag$iterator.java_util_AbstractList$IteratorImpl_i++), 7));
      if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 42)) {
        com_google_gwt_user_client_ui_ListBox_$addItem__Lcom_google_gwt_user_client_ui_ListBox_2Ljava_lang_String_2V(combo, com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 42).com_sensia_relaxNG_RNGValue_text);
      }
       else {
        label_0 = this$0.findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(tag);
        label_0 == null?(label_0 = 'Unlabeled choice'):java_lang_String_$equalsIgnoreCase__Ljava_lang_String_2Ljava_lang_String_2Z(label_0, 'href') && (label_0 = 'By Reference');
        com_google_gwt_user_client_ui_ListBox_$insertItem__Lcom_google_gwt_user_client_ui_ListBox_2Ljava_lang_String_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2Ljava_lang_String_2IV(combo, label_0, label_0, -1);
      }
    }
    com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(combo, new com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_RNGRenderer$RNGChoiceWidget$2__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_2V(this, combo, choice), (com_google_gwt_event_dom_client_ChangeEvent_$clinit__V() , com_google_gwt_event_dom_client_ChangeEvent_$clinit__V() , com_google_gwt_event_dom_client_ChangeEvent_TYPE));
    com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_container, combo);
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(217, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_RNGRenderer$RNGChoiceWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGChoice_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_container;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRenderer$RNGChoiceWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRenderer/RNGChoiceWidget', 217);
function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_RNGRenderer$RNGChoiceWidget$1__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_2V(this$1, val$choice, val$panel){
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_this$11 = this$1;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_val$choice2 = val$choice;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_val$panel3 = val$panel;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(221, 1, $intern_78, com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_RNGRenderer$RNGChoiceWidget$1__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_2V);
_.onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V(event_0){
  com_sensia_relaxNG_RNGChoice_$setSelectedIndex__Lcom_sensia_relaxNG_RNGChoice_2IV(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_val$choice2, -1);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$onPatternChanged__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_this$11.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_this$01, this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_val$choice2, this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$1_val$panel3);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRenderer$RNGChoiceWidget$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRenderer/RNGChoiceWidget/1', 221);
function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_RNGRenderer$RNGChoiceWidget$2__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_2V(this$1, val$combo, val$choice){
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_this$11 = this$1;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_val$combo2 = val$combo;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_val$choice3 = val$choice;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(222, 1, $intern_79, com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_RNGRenderer$RNGChoiceWidget$2__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_2V);
_.onChange__Lcom_google_gwt_event_dom_client_ChangeEvent_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_onChange__Lcom_google_gwt_event_dom_client_ChangeEvent_2V(event_0){
  var selected;
  selected = com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_val$combo2).selectedIndex;
  com_sensia_relaxNG_RNGChoice_$setSelectedIndex__Lcom_sensia_relaxNG_RNGChoice_2IV(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_val$choice3, selected - 1);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$onPatternChanged__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_this$11.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget_this$01, this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_val$choice3, this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGChoiceWidget$2_val$combo2);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRenderer$RNGChoiceWidget$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRenderer/RNGChoiceWidget/2', 222);
function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_RNGRenderer$RNGOptionalWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGOptional_2V(this$0, optional){
  var b, contentPanel, label_0, w, w$iterator;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_this$01 = this$0;
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_panel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  b = new com_google_gwt_user_client_ui_Label_Label__V;
  com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , b.com_google_gwt_user_client_ui_UIObject_element), $intern_77, true);
  com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(b, new com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_RNGRenderer$RNGOptionalWidget$1__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_2V(this, optional), (com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_TYPE));
  if (!optional.com_sensia_relaxNG_RNGTag_disabled) {
    if (optional.com_sensia_relaxNG_RNGOptional_selected) {
      contentPanel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
      com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$0);
      com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$0, optional.com_sensia_relaxNG_RNGTagList_children);
      for (w$iterator = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$0.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).iterator__Ljava_util_Iterator_2(); w$iterator.hasNext__Z();) {
        w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(w$iterator.next__Ljava_lang_Object_2(), 4);
        com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(contentPanel, w.getWidget__Lcom_google_gwt_user_client_ui_Widget_2());
      }
      com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_panel, contentPanel);
      com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_panel, b);
      com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV(b.com_google_gwt_user_client_ui_UIObject_element, $intern_80, true);
    }
     else {
      com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_panel, b);
      com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV(b.com_google_gwt_user_client_ui_UIObject_element, $intern_81, true);
      label_0 = this$0.findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(optional);
      label_0 == null && (label_0 = 'Optional Content');
      com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_panel, new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V('Add ' + label_0));
    }
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(216, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_RNGRenderer$RNGOptionalWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGOptional_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_panel;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_panel;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRenderer$RNGOptionalWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRenderer/RNGOptionalWidget', 216);
function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_RNGRenderer$RNGOptionalWidget$1__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_2V(this$1, val$optional){
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_this$11 = this$1;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_val$optional2 = val$optional;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(220, 1, $intern_78, com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_RNGRenderer$RNGOptionalWidget$1__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_2V);
_.onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V(event_0){
  com_sensia_relaxNG_RNGOptional_$setSelected__Lcom_sensia_relaxNG_RNGOptional_2ZV(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_val$optional2, !this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_val$optional2.com_sensia_relaxNG_RNGOptional_selected);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$onPatternChanged__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGTag_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_this$11.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_this$01, this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_val$optional2, this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget$1_this$11.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGOptionalWidget_panel);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRenderer$RNGOptionalWidget$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRenderer/RNGOptionalWidget/1', 220);
function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_$renderOccurence__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_2Lcom_sensia_relaxNG_RNGZeroOrMore_2Ljava_util_List_2Ljava_lang_String_2ZLcom_google_gwt_user_client_ui_Panel_2(this$static, zeroOrMore, tags, allowRemove){
  var b, contentPanel, itemPanel, w, w$iterator;
  itemPanel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  contentPanel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(itemPanel, contentPanel);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_this$01);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_this$01, tags);
  for (w$iterator = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_this$01.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).iterator__Ljava_util_Iterator_2(); w$iterator.hasNext__Z();) {
    w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(w$iterator.next__Ljava_lang_Object_2(), 4);
    com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(contentPanel, w.getPanel__Lcom_google_gwt_user_client_ui_Panel_2());
  }
  if (allowRemove) {
    b = new com_google_gwt_user_client_ui_Label_Label__V;
    com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , b.com_google_gwt_user_client_ui_UIObject_element), $intern_80, true);
    com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(b, new com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_RNGRenderer$RNGZeroOrMoreWidget$2__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_2V(zeroOrMore, tags, itemPanel), (com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_TYPE));
    com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(itemPanel, b);
  }
  return itemPanel;
}

function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_RNGRenderer$RNGZeroOrMoreWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGZeroOrMore_2V(this$0, zeroOrMore){
  var allowRemove, b, i, itemPanel, label_0, morePanel, tags, tags$iterator;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_this$01 = this$0;
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_mainPanel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
  label_0 = this$0.findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(zeroOrMore);
  i = 0;
  for (tags$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(zeroOrMore.getPatternInstances__Ljava_util_List_2()); tags$iterator.java_util_AbstractList$IteratorImpl_i < tags$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
    tags = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(tags$iterator.java_util_AbstractList$IteratorImpl_i < tags$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tags$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(tags$iterator.java_util_AbstractList$IteratorImpl_i++), 6));
    allowRemove = !(com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(zeroOrMore, 66) && i == 0);
    itemPanel = com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_$renderOccurence__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_2Lcom_sensia_relaxNG_RNGZeroOrMore_2Ljava_util_List_2Ljava_lang_String_2ZLcom_google_gwt_user_client_ui_Panel_2(this, zeroOrMore, tags, allowRemove);
    com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_mainPanel, itemPanel);
    ++i;
  }
  morePanel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_mainPanel, morePanel);
  b = new com_google_gwt_user_client_ui_Label_Label__V;
  com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , b.com_google_gwt_user_client_ui_UIObject_element), $intern_81, true);
  com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(b, new com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_RNGRenderer$RNGZeroOrMoreWidget$1__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_2V(this, zeroOrMore, morePanel), (com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_TYPE));
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(morePanel, b);
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(morePanel, new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V(label_0));
  com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_mainPanel, $intern_77);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(215, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_RNGRenderer$RNGZeroOrMoreWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGZeroOrMore_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_mainPanel;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_mainPanel;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRenderer$RNGZeroOrMoreWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRenderer/RNGZeroOrMoreWidget', 215);
function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_RNGRenderer$RNGZeroOrMoreWidget$1__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_2V(this$1, val$zeroOrMore, val$morePanel){
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_this$11 = this$1;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_val$zeroOrMore2 = val$zeroOrMore;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_val$morePanel4 = val$morePanel;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(218, 1, $intern_78, com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_RNGRenderer$RNGZeroOrMoreWidget$1__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_2V);
_.onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V(event_0){
  var itemPanel, tags;
  tags = com_sensia_relaxNG_RNGZeroOrMore_$newOccurence__Lcom_sensia_relaxNG_RNGZeroOrMore_2Ljava_util_List_2(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_val$zeroOrMore2);
  itemPanel = com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_$renderOccurence__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_2Lcom_sensia_relaxNG_RNGZeroOrMore_2Ljava_util_List_2Ljava_lang_String_2ZLcom_google_gwt_user_client_ui_Panel_2(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_this$11, this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_val$zeroOrMore2, tags, true);
  com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_val$morePanel4);
  com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_this$11.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_mainPanel, itemPanel);
  com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_this$11.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_mainPanel, this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$1_val$morePanel4);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRenderer$RNGZeroOrMoreWidget$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRenderer/RNGZeroOrMoreWidget/1', 218);
function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_RNGRenderer$RNGZeroOrMoreWidget$2__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_2V(val$zeroOrMore, val$tags, val$itemPanel){
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_val$zeroOrMore2 = val$zeroOrMore;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_val$tags3 = val$tags;
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_val$itemPanel4 = val$itemPanel;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(219, 1, $intern_78, com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_RNGRenderer$RNGZeroOrMoreWidget$2__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget_2V);
_.onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V = function com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V(event_0){
  java_util_ArrayList_$remove__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_val$zeroOrMore2.getPatternInstances__Ljava_util_List_2(), this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_val$tags3);
  com_google_gwt_user_client_ui_Widget_$removeFromParent__Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer$RNGZeroOrMoreWidget$2_val$itemPanel4);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRenderer$RNGZeroOrMoreWidget$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRenderer/RNGZeroOrMoreWidget/2', 219);
function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$findLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(this$static, tag){
  var eltName, nameAtt, val;
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 28)) {
    eltName = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 28).com_sensia_relaxNG_RNGElement_name;
    if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'field') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'item')) {
      nameAtt = com_sensia_relaxNG_RNGTagList_$getChildAttribute__Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2Lcom_sensia_relaxNG_RNGAttribute_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 28));
      val = com_sensia_relaxNG_RNGTagList_$getChildValue__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGValue_2(nameAtt);
      if (val)
        return val.com_sensia_relaxNG_RNGValue_text + ' ' + this$static.toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(eltName);
    }
  }
  return com_sensia_swetools_editors_sensorml_client_RNGRenderer_$findLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(this$static, tag);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderDataComponentProperty__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this$static, elt){
  var child, child$iterator, dataComponentPropertyWidget, w, w$iterator;
  dataComponentPropertyWidget = new com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentPropertyWidget_SWEDataComponentPropertyWidget__Lcom_sensia_relaxNG_RNGElement_2V;
  for (child$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(elt.com_sensia_relaxNG_RNGTagList_children); child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
    child = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_i++), 7));
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static);
    child.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(this$static);
    if (com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).size__I() > 0 && java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(com_google_gwt_user_client_ui_UIObject_$getTitle__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).get__ILjava_lang_Object_2(0), 4).getWidget__Lcom_google_gwt_user_client_ui_Widget_2()), $intern_82)) {
      w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).get__ILjava_lang_Object_2(0), 4);
      w.getWidget__Lcom_google_gwt_user_client_ui_Widget_2();
    }
     else {
      for (w$iterator = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).iterator__Ljava_util_Iterator_2(); w$iterator.hasNext__Z();) {
        w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(w$iterator.next__Ljava_lang_Object_2(), 4);
        com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(dataComponentPropertyWidget.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentPropertyWidget_container, w.getWidget__Lcom_google_gwt_user_client_ui_Widget_2());
      }
    }
  }
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(dataComponentPropertyWidget);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderIdentifierPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this$static, elt){
  var child, child$iterator, w, w$iterator, widget;
  widget = new com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_RNGIdentifierWidget__V;
  for (child$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(elt.com_sensia_relaxNG_RNGTagList_children); child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
    child = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_i++), 7));
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static);
    child.accept__Lcom_sensia_relaxNG_RNGTagVisitor_2V(this$static);
    for (w$iterator = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).iterator__Ljava_util_Iterator_2(); w$iterator.hasNext__Z();) {
      w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(w$iterator.next__Ljava_lang_Object_2(), 4);
      com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_$addPanel__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(widget, w);
    }
  }
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(widget);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderLabeledField__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2V(this$static, tagList){
  var widget;
  widget = new com_sensia_swetools_editors_sensorml_client_panels_elements_SWELabeledFieldWidget_SWELabeledFieldWidget__Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2V;
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$static, tagList.com_sensia_relaxNG_RNGTagList_children);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$addWidgetsToWidget__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this$static, widget);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderPropertyPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this$static, elt){
  var propertyPanel, w, w$iterator;
  propertyPanel = new com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_SWEPropertyWidget__Lcom_sensia_relaxNG_RNGElement_2V(elt);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$static, elt.com_sensia_relaxNG_RNGTagList_children);
  for (w$iterator = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).iterator__Ljava_util_Iterator_2(); w$iterator.hasNext__Z();) {
    w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(w$iterator.next__Ljava_lang_Object_2(), 4);
    java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(com_google_gwt_user_client_ui_UIObject_$getTitle__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2(w.getWidget__Lcom_google_gwt_user_client_ui_Widget_2()), $intern_82)?com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_$addHeader__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_2Lcom_google_gwt_user_client_ui_Widget_2V(propertyPanel, w.getWidget__Lcom_google_gwt_user_client_ui_Widget_2()):com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_$addContent__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_2Lcom_google_gwt_user_client_ui_Widget_2V(propertyPanel, w.getWidget__Lcom_google_gwt_user_client_ui_Widget_2());
  }
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(propertyPanel);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGAttribute_2V(this$static, att){
  var attName, widget;
  attName = att.com_sensia_relaxNG_RNGAttribute_name;
  if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(attName, $intern_63)) {
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$static, att.com_sensia_relaxNG_RNGTagList_children);
  }
   else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(attName, 'code')) {
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$static, att.com_sensia_relaxNG_RNGTagList_children);
  }
   else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(attName, 'definition')) {
    widget = new com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_RNGAttributeDefinitionWidget__Lcom_sensia_relaxNG_RNGAttribute_2V(att);
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static);
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$static, att.com_sensia_relaxNG_RNGTagList_children);
    com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6);
    com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(widget);
  }
   else {
    com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderLabeledField__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2V(this$static, att, this$static.toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(att.com_sensia_relaxNG_RNGAttribute_name));
  }
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this$static, elt){
  var eltName, com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderDataComponent__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V_widget_0;
  eltName = elt.com_sensia_relaxNG_RNGElement_name;
  if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName.substr(0, 7), 'Boolean') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName.substr(0, 8), 'Quantity') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName.substr(0, 5), 'Count') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName.substr(0, 8), 'Category') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName.substr(0, 4), 'Time') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'Text') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'DataRecord') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'Vector') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'DataArray') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'Matrix') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'DataChoice') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'DataStream')) {
    com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderDataComponent__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V_widget_0 = new com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_SWEDataComponentWidget__Lcom_sensia_relaxNG_RNGElement_2V(elt);
    com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderDataComponent__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V_widget_0);
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this$static, elt.com_sensia_relaxNG_RNGTagList_children);
  }
   else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'field') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'coordinate') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'elementType') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'item') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'quality') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'encoding')) {
    com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderDataComponentProperty__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this$static, elt);
    com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderPropertyPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this$static, elt);
  }
   else 
    java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, $intern_83) || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'label') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'description') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'uom') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, $intern_53) || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, $intern_64)?com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderLabeledField__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2V(this$static, elt, this$static.toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(elt.com_sensia_relaxNG_RNGElement_name)):com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGElement_2V(this$static, elt);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(213, 212, {});
_.findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2 = function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(tag){
  return com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$findLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(this, tag);
}
;
_.visit__Lcom_sensia_relaxNG_RNGAttribute_2V = function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_visit__Lcom_sensia_relaxNG_RNGAttribute_2V(att){
  com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGAttribute_2V(this, att);
}
;
_.visit__Lcom_sensia_relaxNG_RNGElement_2V = function com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_visit__Lcom_sensia_relaxNG_RNGElement_2V(elt){
  com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this, elt);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRendererSWE_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRendererSWE', 213);
function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$addWidgetsToSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this$static, section){
  var w, w$iterator, wList;
  wList = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6);
  for (w$iterator = wList.iterator__Ljava_util_Iterator_2(); w$iterator.hasNext__Z();) {
    w = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(w$iterator.next__Ljava_lang_Object_2(), 4);
    section.addPanel__Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(w);
  }
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$findSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this$static, tag){
  var att, child, child$iterator, elt, name_0, section, sectionName, tagList;
  name_0 = null;
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 28)) {
    elt = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 28);
    name_0 = elt.com_sensia_relaxNG_RNGElement_name;
  }
   else if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 35)) {
    att = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 35);
    name_0 = att.com_sensia_relaxNG_RNGAttribute_name;
  }
   else if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 50)) {
    return com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$findSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this$static, com_sensia_relaxNG_RNGRef_$getPattern__Lcom_sensia_relaxNG_RNGRef_2Lcom_sensia_relaxNG_RNGDefine_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 50)));
  }
   else if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 16)) {
    tagList = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 16);
    for (child$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(tagList.com_sensia_relaxNG_RNGTagList_children); child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I();) {
      child = (com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(child$iterator.java_util_AbstractList$IteratorImpl_i < child$iterator.java_util_AbstractList$IteratorImpl_this$01.size__I()) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(child$iterator.java_util_AbstractList$IteratorImpl_i++), 7));
      section = com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$findSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this$static, child);
      if (section)
        return section;
    }
  }
  if (name_0 != null) {
    sectionName = com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.get__Ljava_lang_Object_2Ljava_lang_Object_2(name_0));
    if (sectionName != null)
      return com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$getSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Ljava_lang_String_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this$static, sectionName);
  }
  return null;
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$getSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Ljava_lang_String_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this$static, sectionName){
  var section;
  if (!this$static.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_tabs.containsKey__Ljava_lang_Object_2Z(sectionName)) {
    java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(sectionName, 'Title')?(section = new com_sensia_swetools_editors_sensorml_client_panels_elements_TitleSectionWidget_TitleSectionWidget__Ljava_lang_String_2V(sectionName)):(section = new com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_SectionWidget__Ljava_lang_String_2V(sectionName));
    com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_$add__Lcom_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this$static.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_rootPanel, section);
    this$static.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_tabs.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(sectionName, section);
  }
  return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_tabs.get__Ljava_lang_Object_2Ljava_lang_Object_2(sectionName), 4);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$toNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Ljava_lang_String_2Ljava_lang_String_2(this$static, name_0){
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(name_0, 'id')?(name_0 = 'Local ID'):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(name_0, $intern_73)?(name_0 = 'Begin'):java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(name_0, $intern_74) && (name_0 = 'End');
  return com_sensia_swetools_editors_sensorml_client_RNGRenderer_$toNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_lang_String_2Ljava_lang_String_2(name_0);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGGrammar_2V(this$static, grammar){
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this$static);
  this$static.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_rootPanel = new com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_SectionsWidget__V;
  com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(this$static.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_rootPanel);
  com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGGrammar_2V(this$static, grammar);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_RNGRendererSML__V(){
  this.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets = new java_util_Stack_Stack__V;
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_tabs = new java_util_HashMap_HashMap__V;
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName = new java_util_HashMap_HashMap__V;
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('id', $intern_84);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2($intern_83, $intern_84);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2($intern_63, $intern_84);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('keywords', $intern_84);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('identification', $intern_84);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('classification', $intern_84);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('method', $intern_84);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('validTime', $intern_85);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('securityConstraint', $intern_85);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('legalConstraint', $intern_85);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('characteristics', $intern_86);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('capabilities', $intern_86);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('contact', 'Contacts');
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2($intern_61, 'Documentation');
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('inputs', $intern_87);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('outputs', $intern_87);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToSectionName.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('parameters', $intern_87);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType = new java_util_HashMap_HashMap__V;
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('ProcessModel', (com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_$clinit__V() , com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP));
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('Component', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('IdentifierList', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('ClassifierList', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('InputList', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('OutputList', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('ParameterList', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('Document', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('Term', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2($intern_88, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('Security', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('member', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2($intern_88, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('phone', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('address', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('input', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('output', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('parameter', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2($intern_83, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_IDENTIFIER_1PANEL);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('classifier', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2($intern_63, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_LABELED_1FIELD);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('http://www.opengis.net/gmlidentifier', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_LABELED_1FIELD);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('http://www.opengis.net/gmlname', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_LABELED_1FIELD);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('http://www.opengis.net/gmldescription', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_LABELED_1FIELD);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('http://www.opengis.net/gmlbeginPosition', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_LABELED_1FIELD);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('http://www.opengis.net/gmlendPosition', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_LABELED_1FIELD);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('ResponsibleParty', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_OBJECT_1TYPE);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('Person', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_OBJECT_1TYPE);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('ContactList', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_OBJECT_1TYPE);
  this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2('DocumentList', com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_OBJECT_1TYPE);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(214, 213, {}, com_sensia_swetools_editors_sensorml_client_RNGRendererSML_RNGRendererSML__V);
_.findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2 = function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_findLabel__Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(tag){
  var eltName, nameAtt, val;
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(tag, 28)) {
    eltName = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 28).com_sensia_relaxNG_RNGElement_name;
    if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'input') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'output') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'parameter') || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(eltName, 'member')) {
      nameAtt = com_sensia_relaxNG_RNGTagList_$getChildAttribute__Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2Lcom_sensia_relaxNG_RNGAttribute_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(tag, 28));
      if (nameAtt) {
        val = com_sensia_relaxNG_RNGTagList_$getChildValue__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGValue_2(nameAtt);
        if (val)
          return val + ' ' + com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$toNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Ljava_lang_String_2Ljava_lang_String_2(this, eltName);
      }
    }
  }
  return com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$findLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGTag_2Ljava_lang_String_2(this, tag);
}
;
_.toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2 = function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(name_0){
  return com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$toNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Ljava_lang_String_2Ljava_lang_String_2(this, name_0);
}
;
_.visit__Lcom_sensia_relaxNG_RNGAttribute_2V = function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_visit__Lcom_sensia_relaxNG_RNGAttribute_2V(att){
  var section;
  section = com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$findSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this, att);
  if (!section || this.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets.java_util_Vector_arrayList.java_util_ArrayList_array.length > 1)
    com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGAttribute_2V(this, att);
  else {
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this);
    com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGAttribute_2V(this, att);
    com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$addWidgetsToSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this, section);
  }
}
;
_.visit__Lcom_sensia_relaxNG_RNGChoice_2V = function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_visit__Lcom_sensia_relaxNG_RNGChoice_2V(choice){
  var section;
  section = com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$findSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this, choice);
  if (!section || this.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets.java_util_Vector_arrayList.java_util_ArrayList_array.length > 1)
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGChoice_2V(this, choice);
  else {
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this);
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGChoice_2V(this, choice);
    com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$addWidgetsToSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this, section);
  }
}
;
_.visit__Lcom_sensia_relaxNG_RNGElement_2V = function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_visit__Lcom_sensia_relaxNG_RNGElement_2V(elt){
  var eltName, isTopLevel, nameKey, nsUri, numChildren, renderType, section, widget;
  eltName = elt.com_sensia_relaxNG_RNGElement_name;
  nsUri = elt.com_sensia_relaxNG_RNGElement_namespace;
  if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(nsUri, 'http://www.opengis.net/swe/1.0.1')) {
    com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this, elt);
    return;
  }
  isTopLevel = this.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets.java_util_Vector_arrayList.java_util_ArrayList_array.length == 1;
  section = com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$findSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this, elt);
  isTopLevel && !!section && com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this);
  nameKey = java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(nsUri, 'http://www.opengis.net/sensorML/1.0.1')?eltName:nsUri + eltName;
  renderType = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this.com_sensia_swetools_editors_sensorml_client_RNGRendererSML_eltNamesToRenderType.get__Ljava_lang_Object_2Ljava_lang_Object_2(nameKey), 41);
  !!section && !renderType && (renderType = (com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_$clinit__V() , com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL));
  if (renderType) {
    switch (renderType.java_lang_Enum_ordinal) {
      case 0:
        com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this, elt.com_sensia_relaxNG_RNGTagList_children);
        break;
      case 1:
        com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderPropertyPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this, elt);
        break;
      case 3:
        widget = new com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_ObjectTypeWidget__Lcom_sensia_relaxNG_RNGElement_2V(elt);
        com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets), 6).add__Ljava_lang_Object_2Z(widget);
        com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visitChildren__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2V(this, elt.com_sensia_relaxNG_RNGTagList_children);
        break;
      case 2:
        com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderLabeledField__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2V(this, elt, com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$toNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Ljava_lang_String_2Ljava_lang_String_2(this, eltName));
        break;
      case 5:
        com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderIdentifierPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this, elt);
    }
  }
   else {
    numChildren = elt.com_sensia_relaxNG_RNGTagList_children.java_util_ArrayList_array.length;
    numChildren == 1 && !com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(elt.com_sensia_relaxNG_RNGTagList_children, 0), 16)?com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$renderLabeledField__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2V(this, elt, com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$toNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Ljava_lang_String_2Ljava_lang_String_2(this, eltName)):com_sensia_swetools_editors_sensorml_client_RNGRendererSWE_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSWE_2Lcom_sensia_relaxNG_RNGElement_2V(this, elt);
  }
  isTopLevel && !!section && com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$addWidgetsToSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this, section);
}
;
_.visit__Lcom_sensia_relaxNG_RNGGrammar_2V = function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_visit__Lcom_sensia_relaxNG_RNGGrammar_2V(grammar){
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGGrammar_2V(this, grammar);
}
;
_.visit__Lcom_sensia_relaxNG_RNGOptional_2V = function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_visit__Lcom_sensia_relaxNG_RNGOptional_2V(optional){
  var section;
  section = com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$findSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this, optional);
  if (!section || this.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets.java_util_Vector_arrayList.java_util_ArrayList_array.length > 1)
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGOptional_2V(this, optional);
  else {
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this);
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGOptional_2V(this, optional);
    com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$addWidgetsToSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this, section);
  }
}
;
_.visit__Lcom_sensia_relaxNG_RNGZeroOrMore_2V = function com_sensia_swetools_editors_sensorml_client_RNGRendererSML_visit__Lcom_sensia_relaxNG_RNGZeroOrMore_2V(zeroOrMore){
  var section;
  section = com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$findSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_relaxNG_RNGTag_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2(this, zeroOrMore);
  if (!section || this.com_sensia_swetools_editors_sensorml_client_RNGRenderer_widgets.java_util_Vector_arrayList.java_util_ArrayList_array.length > 1)
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGZeroOrMore_2V(this, zeroOrMore);
  else {
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$newWidgetList__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Ljava_util_List_2(this);
    com_sensia_swetools_editors_sensorml_client_RNGRenderer_$visit__Lcom_sensia_swetools_editors_sensorml_client_RNGRenderer_2Lcom_sensia_relaxNG_RNGZeroOrMore_2V(this, zeroOrMore);
    com_sensia_swetools_editors_sensorml_client_RNGRendererSML_$addWidgetsToSection__Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this, section);
  }
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRendererSML_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'RNGRendererSML', 214);
function com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_$clinit__V(){
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP = new com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_RNGRendererSML$RenderType__Ljava_lang_String_2IV('SKIP', 0);
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL = new com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_RNGRendererSML$RenderType__Ljava_lang_String_2IV('DECORATED_PANEL', 1);
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_LABELED_1FIELD = new com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_RNGRendererSML$RenderType__Ljava_lang_String_2IV('LABELED_FIELD', 2);
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_OBJECT_1TYPE = new com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_RNGRendererSML$RenderType__Ljava_lang_String_2IV('OBJECT_TYPE', 3);
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_TITLE = new com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_RNGRendererSML$RenderType__Ljava_lang_String_2IV('TITLE', 4);
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_IDENTIFIER_1PANEL = new com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_RNGRendererSML$RenderType__Ljava_lang_String_2IV('IDENTIFIER_PANEL', 5);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_RNGRendererSML$RenderType__Ljava_lang_String_2IV(enum$name, enum$ordinal){
  java_lang_Enum_Enum__Ljava_lang_String_2IV.call(this, enum$name, enum$ordinal);
}

function com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_values___3Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_2(){
  com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_$clinit__V();
  return com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRendererSML$RenderType_12_1classLit, 1), $intern_14, 41, 0, [com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_LABELED_1FIELD, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_OBJECT_1TYPE, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_TITLE, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_IDENTIFIER_1PANEL]);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(41, 22, {41:1, 3:1, 25:1, 22:1}, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_RNGRendererSML$RenderType__Ljava_lang_String_2IV);
var com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_DECORATED_1PANEL, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_IDENTIFIER_1PANEL, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_LABELED_1FIELD, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_OBJECT_1TYPE, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_SKIP, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_TITLE;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1RNGRendererSML$RenderType_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_76, 'RNGRendererSML/RenderType', 41, com_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_values___3Lcom_sensia_swetools_editors_sensorml_client_RNGRendererSML$RenderType_2);
function com_sensia_swetools_editors_sensorml_client_SensorMLEditor_SensorMLEditor__V(){
  var sgmlEditorProcessor;
  sgmlEditorProcessor = new com_sensia_swetools_editors_sensorml_client_RNGProcessorSML_RNGProcessorSML__V;
  this.com_sensia_swetools_editors_sensorml_client_SensorMLEditor_centerPanel = new com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_CenterPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V(sgmlEditorProcessor);
  new com_sensia_swetools_editors_sensorml_client_panels_NavigationPanel_NavigationPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V(sgmlEditorProcessor);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(165, 1, {}, com_sensia_swetools_editors_sensorml_client_SensorMLEditor_SensorMLEditor__V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1SensorMLEditor_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_76, 'SensorMLEditor', 165);
function com_sensia_swetools_editors_sensorml_client_SensorMLModule_$onModuleLoad__Lcom_sensia_swetools_editors_sensorml_client_SensorMLModule_2V(){
  var editor, root, com_sensia_swetools_editors_sensorml_client_SensorMLEditor_$getViewer__Lcom_sensia_swetools_editors_sensorml_client_SensorMLEditor_2Lcom_google_gwt_user_client_ui_Widget_2_dock_0;
  com_sensia_gwt_relaxNG_RNGParser_$clinit__V();
  com_sensia_gwt_relaxNG_RNGParser_grammarCache.clear__V();
  root = com_google_gwt_user_client_ui_RootPanel_get__Ljava_lang_String_2Lcom_google_gwt_user_client_ui_RootPanel_2();
  if (root) {
    editor = new com_sensia_swetools_editors_sensorml_client_SensorMLEditor_SensorMLEditor__V;
    com_google_gwt_user_client_ui_AbsolutePanel_$add__Lcom_google_gwt_user_client_ui_AbsolutePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(root, (com_sensia_swetools_editors_sensorml_client_SensorMLEditor_$getViewer__Lcom_sensia_swetools_editors_sensorml_client_SensorMLEditor_2Lcom_google_gwt_user_client_ui_Widget_2_dock_0 = new com_google_gwt_user_client_ui_DockPanel_DockPanel__V , com_google_gwt_dom_client_Element_$setClassName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , com_sensia_swetools_editors_sensorml_client_SensorMLEditor_$getViewer__Lcom_sensia_swetools_editors_sensorml_client_SensorMLEditor_2Lcom_google_gwt_user_client_ui_Widget_2_dock_0.com_google_gwt_user_client_ui_UIObject_element), 'cw-DockPanel') , com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV(com_sensia_swetools_editors_sensorml_client_SensorMLEditor_$getViewer__Lcom_sensia_swetools_editors_sensorml_client_SensorMLEditor_2Lcom_google_gwt_user_client_ui_Widget_2_dock_0.com_google_gwt_user_client_ui_CellPanel_table, $intern_46, 4) , com_google_gwt_user_client_ui_DockPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(com_sensia_swetools_editors_sensorml_client_SensorMLEditor_$getViewer__Lcom_sensia_swetools_editors_sensorml_client_SensorMLEditor_2Lcom_google_gwt_user_client_ui_Widget_2_dock_0, (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1LEFT)) , com_google_gwt_user_client_ui_DockPanel_$add__Lcom_google_gwt_user_client_ui_DockPanel_2Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_user_client_ui_DockPanel$DockLayoutConstant_2V(com_sensia_swetools_editors_sensorml_client_SensorMLEditor_$getViewer__Lcom_sensia_swetools_editors_sensorml_client_SensorMLEditor_2Lcom_google_gwt_user_client_ui_Widget_2_dock_0, editor.com_sensia_swetools_editors_sensorml_client_SensorMLEditor_centerPanel, (com_google_gwt_user_client_ui_DockPanel_$clinit__V() , com_google_gwt_user_client_ui_DockPanel_CENTER)) , com_sensia_swetools_editors_sensorml_client_SensorMLEditor_$getViewer__Lcom_sensia_swetools_editors_sensorml_client_SensorMLEditor_2Lcom_google_gwt_user_client_ui_Widget_2_dock_0));
  }
}

function com_sensia_swetools_editors_sensorml_client_listeners_LoadButtonClickListener_LoadButtonClickListener__Lcom_google_gwt_user_client_ui_ListBox_2Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V(profileListBox, sgmlEditorProcessor){
  this.com_sensia_swetools_editors_sensorml_client_listeners_LoadButtonClickListener_profileListBox = profileListBox;
  this.com_sensia_swetools_editors_sensorml_client_listeners_LoadButtonClickListener_sgmlEditorProcessor = sgmlEditorProcessor;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(202, 1, $intern_78, com_sensia_swetools_editors_sensorml_client_listeners_LoadButtonClickListener_LoadButtonClickListener__Lcom_google_gwt_user_client_ui_ListBox_2Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V);
_.onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V = function com_sensia_swetools_editors_sensorml_client_listeners_LoadButtonClickListener_onClick__Lcom_google_gwt_event_dom_client_ClickEvent_2V(event_0){
  var url_0, value_0;
  value_0 = com_google_gwt_user_client_ui_ListBox_$getValue__Lcom_google_gwt_user_client_ui_ListBox_2ILjava_lang_String_2(this.com_sensia_swetools_editors_sensorml_client_listeners_LoadButtonClickListener_profileListBox, com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(this.com_sensia_swetools_editors_sensorml_client_listeners_LoadButtonClickListener_profileListBox).selectedIndex);
  if (value_0 != null && !!value_0.length) {
    url_0 = 'rng1.0/profiles/CSM/' + value_0 + '.rng';
    com_sensia_swetools_editors_sensorml_client_RNGProcessorSML_$parse__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_listeners_LoadButtonClickListener_sgmlEditorProcessor, url_0);
  }
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1listeners_1LoadButtonClickListener_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2('com.sensia.swetools.editors.sensorml.client.listeners', 'LoadButtonClickListener', 202);
function com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_CenterPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V(sgmlEditorProcessor){
  var load, panel, profile, profile$array, profile$index, profile$max, profileListBox, title_0, verticalPanel;
  this.com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_LIST_1PROFILES = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1String_12_1classLit, 1), $intern_14, 2, 4, ['anemometer', 'frame-sensor-model', 'csm-common', 'optical-sensor-parameters', 'pushbroom-sensor-model', 'scanner-sensor-parameters', 'whiskbroom-sensor-model']);
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(sgmlEditorProcessor.com_sensia_swetools_editors_sensorml_client_RNGProcessorSML_observers, this);
  panel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  com_google_gwt_dom_client_Element_$setPropertyInt__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2IV(panel.com_google_gwt_user_client_ui_CellPanel_table, $intern_46, 20);
  com_google_gwt_user_client_ui_HorizontalPanel_$setVerticalAlignment__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2V(panel, (com_google_gwt_user_client_ui_HasVerticalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasVerticalAlignment_ALIGN_1MIDDLE));
  profileListBox = new com_google_gwt_user_client_ui_ListBox_ListBox__ZV;
  com_google_gwt_user_client_ui_ListBox_$insertItem__Lcom_google_gwt_user_client_ui_ListBox_2Ljava_lang_String_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2Ljava_lang_String_2IV(profileListBox, '', '', -1);
  for (profile$array = this.com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_LIST_1PROFILES , profile$index = 0 , profile$max = profile$array.length; profile$index < profile$max; ++profile$index) {
    profile = profile$array[profile$index];
    com_google_gwt_user_client_ui_ListBox_$insertItem__Lcom_google_gwt_user_client_ui_ListBox_2Ljava_lang_String_2Lcom_google_gwt_i18n_client_HasDirection$Direction_2Ljava_lang_String_2IV(profileListBox, profile, profile, -1);
  }
  title_0 = new com_google_gwt_user_client_ui_HTML_HTML__Ljava_lang_String_2V('<b>Profiles:<\/b>');
  load = new com_google_gwt_user_client_ui_Button_Button__Ljava_lang_String_2V;
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(panel, title_0);
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(panel, profileListBox);
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(panel, load);
  this.com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_dynamicCenterPanel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
  verticalPanel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
  com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(verticalPanel, panel);
  com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(verticalPanel, this.com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_dynamicCenterPanel);
  com_google_gwt_user_client_ui_Composite_$initWidget__Lcom_google_gwt_user_client_ui_Composite_2Lcom_google_gwt_user_client_ui_Widget_2V(this, verticalPanel);
  com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(load, new com_sensia_swetools_editors_sensorml_client_listeners_LoadButtonClickListener_LoadButtonClickListener__Lcom_google_gwt_user_client_ui_ListBox_2Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V(profileListBox, sgmlEditorProcessor), (com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_$clinit__V() , com_google_gwt_event_dom_client_ClickEvent_TYPE));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(195, 314, $intern_89, com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_CenterPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V);
_.parseDone__Ljava_util_List_2V = function com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_parseDone__Ljava_util_List_2V(topElements){
  var section, section$iterator;
  com_google_gwt_user_client_ui_Panel_$clear__Lcom_google_gwt_user_client_ui_Panel_2V(this.com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_dynamicCenterPanel);
  for (section$iterator = topElements.iterator__Ljava_util_Iterator_2(); section$iterator.hasNext__Z();) {
    section = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(section$iterator.next__Ljava_lang_Object_2(), 4);
    com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_CenterPanel_dynamicCenterPanel, section.getWidget__Lcom_google_gwt_user_client_ui_Widget_2());
  }
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1CenterPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_90, 'CenterPanel', 195);
function com_sensia_swetools_editors_sensorml_client_panels_NavigationPanel_NavigationPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V(sgmlEditorProcessor){
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(sgmlEditorProcessor.com_sensia_swetools_editors_sensorml_client_RNGProcessorSML_observers, this);
  this.com_sensia_swetools_editors_sensorml_client_panels_NavigationPanel_verticalPanel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
  com_google_gwt_user_client_ui_CellPanel_$setSpacing__Lcom_google_gwt_user_client_ui_CellPanel_2IV(this.com_sensia_swetools_editors_sensorml_client_panels_NavigationPanel_verticalPanel, 50);
  com_google_gwt_user_client_ui_Composite_$initWidget__Lcom_google_gwt_user_client_ui_Composite_2Lcom_google_gwt_user_client_ui_Widget_2V(this, this.com_sensia_swetools_editors_sensorml_client_panels_NavigationPanel_verticalPanel);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(196, 314, $intern_89, com_sensia_swetools_editors_sensorml_client_panels_NavigationPanel_NavigationPanel__Lcom_sensia_swetools_editors_sensorml_client_RNGProcessorSML_2V);
_.parseDone__Ljava_util_List_2V = function com_sensia_swetools_editors_sensorml_client_panels_NavigationPanel_parseDone__Ljava_util_List_2V(topElements){
  var section, section$iterator;
  com_google_gwt_user_client_ui_Panel_$clear__Lcom_google_gwt_user_client_ui_Panel_2V(this.com_sensia_swetools_editors_sensorml_client_panels_NavigationPanel_verticalPanel);
  for (section$iterator = topElements.iterator__Ljava_util_Iterator_2(); section$iterator.hasNext__Z();) {
    section = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(section$iterator.next__Ljava_lang_Object_2(), 4);
    com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_NavigationPanel_verticalPanel, new com_google_gwt_user_client_ui_HTML_HTML__Ljava_lang_String_2V('<a href="">' + section.com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_name + '<\/a>'));
  }
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1NavigationPanel_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_90, 'NavigationPanel', 196);
function com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_$add__Lcom_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this$static, section){
  if (!this$static.com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_sections) {
    this$static.com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_sections = new java_util_ArrayList_ArrayList__V;
    this$static.com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_container = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
  }
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static.com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_sections, section);
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_container, section.getWidget__Lcom_google_gwt_user_client_ui_Widget_2());
}

function com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_SectionsWidget__V(){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(85, 4, {4:1, 85:1}, com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_SectionsWidget__V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_SectionsWidget_container;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1SectionsWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_90, 'SectionsWidget', 85);
function com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_ObjectTypeWidget__Lcom_sensia_relaxNG_RNGElement_2V(elt){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, elt.com_sensia_relaxNG_RNGElement_name);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_label = new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V('Type: ' + com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_$SMLtoNiceLabel__Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2Ljava_lang_String_2Ljava_lang_String_2(elt.com_sensia_relaxNG_RNGElement_name));
  com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_label, $intern_91);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_container = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_container, this.com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_label);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(240, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_ObjectTypeWidget__Lcom_sensia_relaxNG_RNGElement_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_ObjectTypeWidget_label;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1ObjectTypeWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'ObjectTypeWidget', 240);
function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_RNGAttributeDefinitionWidget__Lcom_sensia_relaxNG_RNGAttribute_2V(attribute){
  var def, defImage, com_google_gwt_core_client_impl_Impl_getModuleBaseURL__Ljava_lang_String_2_global_0, com_google_gwt_core_client_impl_Impl_getModuleBaseURL__Ljava_lang_String_2_key_0;
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  def = com_sensia_relaxNG_RNGTagList_$getChildValue__Lcom_sensia_relaxNG_RNGTagList_2Lcom_sensia_relaxNG_RNGValue_2(attribute).com_sensia_relaxNG_RNGValue_text;
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_container = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  com_google_gwt_user_client_ui_HorizontalPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_container, (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1RIGHT));
  defImage = new com_google_gwt_user_client_ui_Image_Image__Ljava_lang_String_2V((com_google_gwt_core_client_impl_Impl_getModuleBaseURL__Ljava_lang_String_2_key_0 = '__gwtDevModeHook:' + $moduleName + ':moduleBase' , com_google_gwt_core_client_impl_Impl_getModuleBaseURL__Ljava_lang_String_2_global_0 = $wnd || self , com_google_gwt_core_client_impl_Impl_getModuleBaseURL__Ljava_lang_String_2_global_0[com_google_gwt_core_client_impl_Impl_getModuleBaseURL__Ljava_lang_String_2_key_0] || $moduleBase) + 'images/icon_info.png');
  def == null || def.length == 0?com_google_gwt_dom_client_Element_$removeAttribute__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , defImage.com_google_gwt_user_client_ui_UIObject_element), 'title'):com_google_gwt_dom_client_Element_$setAttribute__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2Ljava_lang_String_2V((com_google_gwt_user_client_DOM_$clinit__V() , defImage.com_google_gwt_user_client_ui_UIObject_element), 'title', def);
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_container, defImage);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(107, 4, {4:1, 107:1}, com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_RNGAttributeDefinitionWidget__Lcom_sensia_relaxNG_RNGAttribute_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeDefinitionWidget_container;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1RNGAttributeDefinitionWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'RNGAttributeDefinitionWidget', 107);
function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_RNGAttributeWidget__Lcom_sensia_relaxNG_RNGAttribute_2V(attribute){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(attribute.com_sensia_relaxNG_RNGAttribute_name) + ':');
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_panel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  com_google_gwt_user_client_ui_CellPanel_$setSpacing__Lcom_google_gwt_user_client_ui_CellPanel_2IV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_panel, 5);
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_panel, new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_name));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(241, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_RNGAttributeWidget__Lcom_sensia_relaxNG_RNGAttribute_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_panel;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGAttributeWidget_panel;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1RNGAttributeWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'RNGAttributeWidget', 241);
function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_RNGDataWidget__Lcom_sensia_relaxNG_RNGData_2V(data_0){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_textBox = new com_google_gwt_user_client_ui_TextBox_TextBox__V;
  com_google_gwt_user_client_ui_TextBox_$setVisibleLength__Lcom_google_gwt_user_client_ui_TextBox_2IV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_textBox, 30);
  data_0.com_sensia_relaxNG_RNGData_value != null && com_google_gwt_user_client_ui_ValueBoxBase_$setText__Lcom_google_gwt_user_client_ui_ValueBoxBase_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_textBox, data_0.com_sensia_relaxNG_RNGData_value);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_container = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_container, this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_textBox);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(256, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_RNGDataWidget__Lcom_sensia_relaxNG_RNGData_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGDataWidget_textBox;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1RNGDataWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'RNGDataWidget', 256);
function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_RNGElementWidget__Lcom_sensia_relaxNG_RNGElement_2V(elt){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(elt.com_sensia_relaxNG_RNGElement_name));
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_panel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
  com_google_gwt_user_client_ui_VerticalPanel_$add__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_panel, new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_name));
  com_google_gwt_user_client_ui_VerticalPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_VerticalPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_panel, (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1RIGHT));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(239, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_RNGElementWidget__Lcom_sensia_relaxNG_RNGElement_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_panel;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGElementWidget_panel;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1RNGElementWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'RNGElementWidget', 239);
function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_$addPanel__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this$static, widget){
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(widget, 107)) {
    com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_defPanel, widget.getWidget__Lcom_google_gwt_user_client_ui_Widget_2());
  }
   else {
    if (this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_first) {
      this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_first = false;
    }
     else {
      (com_google_gwt_user_client_ui_UIObject_$getElement__Lcom_google_gwt_user_client_ui_UIObject_2Lcom_google_gwt_user_client_Element_2(widget.getPanel__Lcom_google_gwt_user_client_ui_Panel_2()).offsetWidth || 0) | 0;
      com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_contentPanel, new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V(com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_$getNormalizedLabel__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_2ILjava_lang_String_2()));
    }
    com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_contentPanel, widget.getPanel__Lcom_google_gwt_user_client_ui_Panel_2());
  }
}

function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_$getNormalizedLabel__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_2ILjava_lang_String_2(){
  var i, newValue;
  newValue = '';
  for (i = 0; i < 70; i++) {
    newValue += '.';
  }
  return newValue;
}

function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_RNGIdentifierWidget__V(){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_container = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_contentPanel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_defPanel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  com_google_gwt_user_client_ui_HorizontalPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_container, (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1RIGHT));
  com_google_gwt_user_client_ui_HorizontalPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_contentPanel, com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1RIGHT);
  com_google_gwt_user_client_ui_HorizontalPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_defPanel, com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1RIGHT);
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_container, this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_contentPanel);
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_container, this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_defPanel);
  com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_contentPanel, $intern_77);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(248, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_RNGIdentifierWidget__V);
_.addPanel__Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_addPanel__Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(widget){
  com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_$addPanel__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_2Lcom_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_2V(this, widget);
}
;
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_container;
}
;
_.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGIdentifierWidget_first = true;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1RNGIdentifierWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'RNGIdentifierWidget', 248);
function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGRefWidget_RNGRefWidget__Lcom_sensia_relaxNG_RNGRef_2V(ref){
  var label_0;
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, 'Error fetching referenced pattern: ' + ref.com_sensia_relaxNG_RNGRef_patternName);
  label_0 = new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_name);
  com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , label_0.com_google_gwt_user_client_ui_UIObject_element), 'rng-error', true);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGRefWidget_container = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGRefWidget_container, label_0);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(238, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_RNGRefWidget_RNGRefWidget__Lcom_sensia_relaxNG_RNGRef_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGRefWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGRefWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGRefWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGRefWidget_label;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1RNGRefWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'RNGRefWidget', 238);
function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_RNGTextWidget__Lcom_sensia_relaxNG_RNGText_2V(text_0){
  var textStr;
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  textStr = '';
  text_0.com_sensia_relaxNG_RNGText_text != null && (textStr = text_0.com_sensia_relaxNG_RNGText_text);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_textBox = new com_google_gwt_user_client_ui_TextBox_TextBox__V;
  com_google_gwt_user_client_ui_TextBox_$setVisibleLength__Lcom_google_gwt_user_client_ui_TextBox_2IV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_textBox, 10);
  com_google_gwt_user_client_ui_ValueBoxBase_$setText__Lcom_google_gwt_user_client_ui_ValueBoxBase_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_textBox, textStr);
  com_google_gwt_user_client_ui_FocusWidget_$setEnabled__Lcom_google_gwt_user_client_ui_FocusWidget_2ZV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_textBox, false);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_container = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_container, this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_textBox);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(242, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_RNGTextWidget__Lcom_sensia_relaxNG_RNGText_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGTextWidget_textBox;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1RNGTextWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'RNGTextWidget', 242);
function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_RNGValueWidget__Lcom_sensia_relaxNG_RNGValue_2V(val){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, val.com_sensia_relaxNG_RNGValue_text);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_panel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  com_google_gwt_user_client_ui_HorizontalPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_panel, (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1RIGHT));
  com_google_gwt_user_client_ui_CellPanel_$setSpacing__Lcom_google_gwt_user_client_ui_CellPanel_2IV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_panel, 10);
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_panel, new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V(val.com_sensia_relaxNG_RNGValue_text));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(243, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_RNGValueWidget__Lcom_sensia_relaxNG_RNGValue_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_panel;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_RNGValueWidget_panel;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1RNGValueWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'RNGValueWidget', 243);
function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentPropertyWidget_SWEDataComponentPropertyWidget__Lcom_sensia_relaxNG_RNGElement_2V(){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentPropertyWidget_container = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(245, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentPropertyWidget_SWEDataComponentPropertyWidget__Lcom_sensia_relaxNG_RNGElement_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentPropertyWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentPropertyWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentPropertyWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentPropertyWidget_container;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1SWEDataComponentPropertyWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'SWEDataComponentPropertyWidget', 245);
function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_SWEDataComponentWidget__Lcom_sensia_relaxNG_RNGElement_2V(elt){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_label = new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V('Type: ' + com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(elt.com_sensia_relaxNG_RNGElement_name));
  com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_label, $intern_91);
  com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_label, $intern_77);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_container = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_container, this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_label);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(244, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_SWEDataComponentWidget__Lcom_sensia_relaxNG_RNGElement_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEDataComponentWidget_label;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1SWEDataComponentWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'SWEDataComponentWidget', 244);
function com_sensia_swetools_editors_sensorml_client_panels_elements_SWELabeledFieldWidget_SWELabeledFieldWidget__Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2V(){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWELabeledFieldWidget_panel = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(247, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_SWELabeledFieldWidget_SWELabeledFieldWidget__Lcom_sensia_relaxNG_RNGTagList_2Ljava_lang_String_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SWELabeledFieldWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWELabeledFieldWidget_panel;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SWELabeledFieldWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWELabeledFieldWidget_panel;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1SWELabeledFieldWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'SWELabeledFieldWidget', 247);
function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_$addContent__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, content){
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_container, content);
}

function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_$addHeader__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static, widget){
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_container, widget);
}

function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_SWEPropertyWidget__Lcom_sensia_relaxNG_RNGElement_2V(elt){
  var label_0, title_0;
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, elt.com_sensia_relaxNG_RNGElement_name);
  title_0 = com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_toNiceLabel__Ljava_lang_String_2Ljava_lang_String_2(elt.com_sensia_relaxNG_RNGElement_name);
  label_0 = new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V(title_0);
  com_google_gwt_user_client_ui_UIObject_setStyleName__Lcom_google_gwt_dom_client_Element_2Ljava_lang_String_2ZV((com_google_gwt_user_client_DOM_$clinit__V() , label_0.com_google_gwt_user_client_ui_UIObject_element), $intern_93, true);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_container = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(246, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_SWEPropertyWidget__Lcom_sensia_relaxNG_RNGElement_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SWEPropertyWidget_container;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1SWEPropertyWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'SWEPropertyWidget', 246);
function com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_SectionWidget__Ljava_lang_String_2V(name_0){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, name_0);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_hidePanel = new com_google_gwt_user_client_ui_DisclosurePanel_DisclosurePanel__Ljava_lang_String_2V(name_0);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_hidePanel.com_google_gwt_user_client_ui_DisclosurePanel_isAnimationEnabled = true;
  com_google_gwt_user_client_ui_DisclosurePanel_$setOpen__Lcom_google_gwt_user_client_ui_DisclosurePanel_2ZV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_hidePanel, true);
  com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_hidePanel, 'swe-section-panel');
  com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_hidePanel.com_google_gwt_user_client_ui_DisclosurePanel_header.com_google_gwt_user_client_ui_SimplePanel_widget, $intern_93);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_contentPanel = new com_google_gwt_user_client_ui_VerticalPanel_VerticalPanel__V;
  com_google_gwt_user_client_ui_DisclosurePanel_$setContent__Lcom_google_gwt_user_client_ui_DisclosurePanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_hidePanel, this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_contentPanel);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_container = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_container, this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_hidePanel);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(268, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_SectionWidget__Ljava_lang_String_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_contentPanel;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_SectionWidget_container;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1SectionWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'SectionWidget', 268);
function com_sensia_swetools_editors_sensorml_client_panels_elements_TitleSectionWidget_TitleSectionWidget__Ljava_lang_String_2V(name_0){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, name_0);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_TitleSectionWidget_decorator = new com_google_gwt_user_client_ui_FlowPanel_FlowPanel__V;
  com_google_gwt_user_client_ui_FlowPanel_$add__Lcom_google_gwt_user_client_ui_FlowPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_TitleSectionWidget_decorator, new com_google_gwt_user_client_ui_Label_Label__Ljava_lang_String_2V(name_0));
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(267, 4, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_TitleSectionWidget_TitleSectionWidget__Ljava_lang_String_2V);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_TitleSectionWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_TitleSectionWidget_decorator;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_TitleSectionWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_TitleSectionWidget_decorator;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1TitleSectionWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'TitleSectionWidget', 267);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_XSDWidget__Lcom_sensia_relaxNG_RNGData_2ILjava_lang_String_2V(data_0, length_0, allowedChars){
  com_sensia_swetools_editors_sensorml_client_AbstractSensorWidget_AbstractSensorWidget__Ljava_lang_String_2Ljava_lang_String_2V.call(this, '');
  if (length_0 < 0) {
    this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox = new com_google_gwt_user_client_ui_TextBox_TextBox__V;
    com_google_gwt_user_client_ui_TextBox_$setVisibleLength__Lcom_google_gwt_user_client_ui_TextBox_2IV(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, 37), 50);
  }
   else if (length_0 <= 60) {
    this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox = new com_google_gwt_user_client_ui_TextBox_TextBox__V;
    com_google_gwt_user_client_ui_TextBox_$setVisibleLength__Lcom_google_gwt_user_client_ui_TextBox_2IV(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, 37), length_0);
    com_google_gwt_user_client_ui_TextBox_$setMaxLength__Lcom_google_gwt_user_client_ui_TextBox_2IV(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, 37), length_0);
  }
   else {
    this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox = new com_google_gwt_user_client_ui_TextArea_TextArea__V;
    com_google_gwt_user_client_ui_TextArea_$setVisibleLines__Lcom_google_gwt_user_client_ui_TextArea_2IV(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, 111), ~~(length_0 / 50));
  }
  if (data_0.com_sensia_relaxNG_RNGData_value != null) {
    com_google_gwt_user_client_ui_ValueBoxBase_$setText__Lcom_google_gwt_user_client_ui_ValueBoxBase_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, data_0.com_sensia_relaxNG_RNGData_value);
    data_0.com_sensia_relaxNG_RNGData_confirmed && com_google_gwt_user_client_ui_ValueBoxBase_$setReadOnly__Lcom_google_gwt_user_client_ui_ValueBoxBase_2ZV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, true);
  }
  com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$1_XSDWidget$1__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V(this, data_0), (com_google_gwt_event_dom_client_DoubleClickEvent_$clinit__V() , com_google_gwt_event_dom_client_DoubleClickEvent_$clinit__V() , com_google_gwt_event_dom_client_DoubleClickEvent_TYPE));
  com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_XSDWidget$2__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V(this, allowedChars), (com_google_gwt_event_dom_client_KeyPressEvent_$clinit__V() , com_google_gwt_event_dom_client_KeyPressEvent_$clinit__V() , com_google_gwt_event_dom_client_KeyPressEvent_TYPE));
  com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_XSDWidget$3__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V(this, data_0), (com_google_gwt_event_dom_client_KeyUpEvent_$clinit__V() , com_google_gwt_event_dom_client_KeyUpEvent_$clinit__V() , com_google_gwt_event_dom_client_KeyUpEvent_TYPE));
  com_google_gwt_user_client_ui_Widget_$addDomHandler__Lcom_google_gwt_user_client_ui_Widget_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_dom_client_DomEvent$Type_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, new com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_XSDWidget$4__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V(this, data_0), (com_google_gwt_event_dom_client_ChangeEvent_$clinit__V() , com_google_gwt_event_dom_client_ChangeEvent_$clinit__V() , com_google_gwt_event_dom_client_ChangeEvent_TYPE));
  com_google_gwt_user_client_ui_TextBox_$setVisibleLength__Lcom_google_gwt_user_client_ui_TextBox_2IV(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, 37), 15);
  com_google_gwt_user_client_ui_FocusWidget_$setEnabled__Lcom_google_gwt_user_client_ui_FocusWidget_2ZV(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, 37), false);
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_container = new com_google_gwt_user_client_ui_HorizontalPanel_HorizontalPanel__V;
  com_google_gwt_user_client_ui_HorizontalPanel_$setHorizontalAlignment__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_HasHorizontalAlignment$HorizontalAlignmentConstant_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_container, (com_google_gwt_user_client_ui_HasHorizontalAlignment_$clinit__V() , com_google_gwt_user_client_ui_HasHorizontalAlignment_ALIGN_1RIGHT));
  com_google_gwt_user_client_ui_HorizontalPanel_$add__Lcom_google_gwt_user_client_ui_HorizontalPanel_2Lcom_google_gwt_user_client_ui_Widget_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_container, this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox);
  com_google_gwt_user_client_ui_CellPanel_$setSpacing__Lcom_google_gwt_user_client_ui_CellPanel_2IV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_container, 10);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(67, 4, $intern_75);
_.getPanel__Lcom_google_gwt_user_client_ui_Panel_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_getPanel__Lcom_google_gwt_user_client_ui_Panel_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_container;
}
;
_.getWidget__Lcom_google_gwt_user_client_ui_Widget_2 = function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_getWidget__Lcom_google_gwt_user_client_ui_Widget_2(){
  return this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDWidget', 67);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_XSDAnyURIWidget__Lcom_sensia_relaxNG_XSDAnyURI_2V(data_0){
  var com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_length_0, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_fixedLength_0, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_maxLength_0;
  com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_XSDWidget__Lcom_sensia_relaxNG_RNGData_2ILjava_lang_String_2V.call(this, data_0, (com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_length_0 = 60 , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_fixedLength_0 = com_sensia_relaxNG_XSDString_$getLength__Lcom_sensia_relaxNG_XSDString_2I(data_0) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_fixedLength_0 > 0 && (com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_length_0 = com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_fixedLength_0) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_maxLength_0 = com_sensia_relaxNG_XSDString_$getMaxLength__Lcom_sensia_relaxNG_XSDString_2I(data_0) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_maxLength_0 > 0 && (com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_length_0 = com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_maxLength_0) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_getLength__Lcom_sensia_relaxNG_XSDAnyURI_2I_length_0), null);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(266, 67, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDAnyURIWidget_XSDAnyURIWidget__Lcom_sensia_relaxNG_XSDAnyURI_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDAnyURIWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDAnyURIWidget', 266);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDDateTimeWidget_XSDDateTimeWidget__Lcom_sensia_relaxNG_XSDDateTime_2V(data_0){
  com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_XSDWidget__Lcom_sensia_relaxNG_RNGData_2ILjava_lang_String_2V.call(this, data_0, 28, null);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(261, 67, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDDateTimeWidget_XSDDateTimeWidget__Lcom_sensia_relaxNG_XSDDateTime_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDDateTimeWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDDateTimeWidget', 261);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDDecimalWidget_XSDDecimalWidget__Lcom_sensia_relaxNG_RNGData_2V(data_0){
  com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_XSDWidget__Lcom_sensia_relaxNG_RNGData_2ILjava_lang_String_2V.call(this, data_0, 10, '.-+0123456789');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(262, 67, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDDecimalWidget_XSDDecimalWidget__Lcom_sensia_relaxNG_RNGData_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDDecimalWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDDecimalWidget', 262);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDDoubleWidget_XSDDoubleWidget__Lcom_sensia_relaxNG_XSDDouble_2V(data_0){
  com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_XSDWidget__Lcom_sensia_relaxNG_RNGData_2ILjava_lang_String_2V.call(this, data_0, 10, '.-+e0123456789');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(263, 67, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDDoubleWidget_XSDDoubleWidget__Lcom_sensia_relaxNG_XSDDouble_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDDoubleWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDDoubleWidget', 263);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_XSDIntegerWidget__Lcom_sensia_relaxNG_XSDInteger_2V(data_0){
  var com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_getLength__Lcom_sensia_relaxNG_XSDInteger_2I_length_0, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_getLength__Lcom_sensia_relaxNG_XSDInteger_2I_fixedLength_0;
  com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_XSDWidget__Lcom_sensia_relaxNG_RNGData_2ILjava_lang_String_2V.call(this, data_0, (com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_getLength__Lcom_sensia_relaxNG_XSDInteger_2I_length_0 = 10 , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_getLength__Lcom_sensia_relaxNG_XSDInteger_2I_fixedLength_0 = com_sensia_relaxNG_XSDInteger_$getTotalDigits__Lcom_sensia_relaxNG_XSDInteger_2I(data_0) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_getLength__Lcom_sensia_relaxNG_XSDInteger_2I_fixedLength_0 > 0 && (com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_getLength__Lcom_sensia_relaxNG_XSDInteger_2I_length_0 = com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_getLength__Lcom_sensia_relaxNG_XSDInteger_2I_fixedLength_0 + 1) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_getLength__Lcom_sensia_relaxNG_XSDInteger_2I_length_0), '-+0123456789');
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(264, 67, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDIntegerWidget_XSDIntegerWidget__Lcom_sensia_relaxNG_XSDInteger_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDIntegerWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDIntegerWidget', 264);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_XSDStringWidget__Lcom_sensia_relaxNG_XSDString_2V(data_0){
  var com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_length_0, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_fixedLength_0, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_maxLength_0;
  com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_XSDWidget__Lcom_sensia_relaxNG_RNGData_2ILjava_lang_String_2V.call(this, data_0, (com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_length_0 = -1 , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_fixedLength_0 = com_sensia_relaxNG_XSDString_$getLength__Lcom_sensia_relaxNG_XSDString_2I(data_0) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_fixedLength_0 > 0 && (com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_length_0 = com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_fixedLength_0) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_maxLength_0 = com_sensia_relaxNG_XSDString_$getMaxLength__Lcom_sensia_relaxNG_XSDString_2I(data_0) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_maxLength_0 > 0 && (com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_length_0 = com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_maxLength_0) , com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_getLength__Lcom_sensia_relaxNG_XSDString_2I_length_0), null);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(265, 67, $intern_75, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDStringWidget_XSDStringWidget__Lcom_sensia_relaxNG_XSDString_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDStringWidget_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDStringWidget', 265);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$1_XSDWidget$1__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V(this$0, val$data){
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$1_this$01 = this$0;
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$1_val$data2 = val$data;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(257, 1, {329:1, 38:1}, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$1_XSDWidget$1__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDWidget$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDWidget/1', 257);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_$onKeyPress__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_2Lcom_google_gwt_event_dom_client_KeyPressEvent_2V(this$static, event_0){
  var c;
  c = (event_0.com_google_gwt_event_dom_client_DomEvent_nativeEvent.charCode || 0) & 65535;
  if (c <= 13)
    return;
  if (this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_val$allowedChars2 != null && java_lang_String_$indexOf__Ljava_lang_String_2Ljava_lang_String_2I(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_val$allowedChars2, java_lang_String_fromCodePoint__ILjava_lang_String_2(c)) < 0) {
    com_google_gwt_user_client_ui_ValueBoxBase_$cancelKey__Lcom_google_gwt_user_client_ui_ValueBoxBase_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox);
    return;
  }
}

function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_XSDWidget$2__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V(this$0, val$allowedChars){
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_this$01 = this$0;
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_val$allowedChars2 = val$allowedChars;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(258, 1, {330:1, 38:1}, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$2_XSDWidget$2__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDWidget$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDWidget/2', 258);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_$onKeyUp__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_2Lcom_google_gwt_event_dom_client_KeyUpEvent_2V(this$static){
  if (this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_val$data2.isValid__Ljava_lang_String_2Z(com_google_gwt_user_client_ui_ValueBoxBase_$getText__Lcom_google_gwt_user_client_ui_ValueBoxBase_2Ljava_lang_String_2(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox))) {
    com_google_gwt_user_client_ui_UIObject_$removeStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, $intern_94);
    com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, $intern_95);
    com_sensia_relaxNG_RNGData_$setStringValue__Lcom_sensia_relaxNG_RNGData_2Ljava_lang_String_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_val$data2, com_google_gwt_user_client_ui_ValueBoxBase_$getText__Lcom_google_gwt_user_client_ui_ValueBoxBase_2Ljava_lang_String_2(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox));
  }
   else {
    com_google_gwt_user_client_ui_UIObject_$removeStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, $intern_95);
    com_google_gwt_user_client_ui_UIObject_$addStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this$static.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, $intern_94);
  }
}

function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_XSDWidget$3__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V(this$0, val$data){
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_this$01 = this$0;
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_val$data2 = val$data;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(259, 1, {328:1, 38:1}, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$3_XSDWidget$3__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDWidget$3_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDWidget/3', 259);
function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_XSDWidget$4__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V(this$0, val$data){
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_this$01 = this$0;
  this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_val$data2 = val$data;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(260, 1, $intern_79, com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_XSDWidget$4__Lcom_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_2V);
_.onChange__Lcom_google_gwt_event_dom_client_ChangeEvent_2V = function com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_onChange__Lcom_google_gwt_event_dom_client_ChangeEvent_2V(event_0){
  if (this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_val$data2.isValid__Ljava_lang_String_2Z(com_google_gwt_user_client_ui_ValueBoxBase_$getText__Lcom_google_gwt_user_client_ui_ValueBoxBase_2Ljava_lang_String_2(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox))) {
    com_sensia_relaxNG_RNGData_$setConfirmed__Lcom_sensia_relaxNG_RNGData_2ZV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_val$data2, true);
    com_google_gwt_user_client_ui_UIObject_$removeStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, $intern_95);
    com_google_gwt_user_client_ui_UIObject_$removeStyleName__Lcom_google_gwt_user_client_ui_UIObject_2Ljava_lang_String_2V(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, $intern_94);
    com_google_gwt_user_client_ui_ValueBoxBase_$setReadOnly__Lcom_google_gwt_user_client_ui_ValueBoxBase_2ZV(this.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget$4_this$01.com_sensia_swetools_editors_sensorml_client_panels_elements_XSDWidget_textBox, true);
  }
}
;
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1sensia_1swetools_1editors_1sensorml_1client_1panels_1elements_1XSDWidget$4_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_92, 'XSDWidget/4', 260);
function java_lang_AbstractStringBuilder_AbstractStringBuilder__Ljava_lang_String_2V(string){
  this.java_lang_AbstractStringBuilder_string = string;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(115, 1, {});
_.toString__Ljava_lang_String_2$ = function java_lang_AbstractStringBuilder_toString__Ljava_lang_String_2(){
  return this.java_lang_AbstractStringBuilder_string;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1AbstractStringBuilder_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'AbstractStringBuilder', 115);
function java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

function java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__Ljava_lang_String_2V(message){
  java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V.call(this, message);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(56, 17, $intern_9, java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V, java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1IndexOutOfBoundsException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'IndexOutOfBoundsException', 56);
function java_lang_ArrayIndexOutOfBoundsException_ArrayIndexOutOfBoundsException__V(){
  java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(226, 56, $intern_9, java_lang_ArrayIndexOutOfBoundsException_ArrayIndexOutOfBoundsException__V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1ArrayIndexOutOfBoundsException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'ArrayIndexOutOfBoundsException', 226);
function java_lang_ArrayStoreException_ArrayStoreException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(79, 17, $intern_9, java_lang_ArrayStoreException_ArrayStoreException__V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1ArrayStoreException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'ArrayStoreException', 79);
function java_lang_Boolean_$clinit__V(){
  java_lang_Boolean_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  new java_lang_Boolean_Boolean__ZV(false);
  new java_lang_Boolean_Boolean__ZV(true);
}

function java_lang_Boolean_Boolean__ZV(value_0){
  this.java_lang_Boolean_value = value_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(69, 1, {3:1, 69:1, 25:1}, java_lang_Boolean_Boolean__ZV);
_.equals__Ljava_lang_Object_2Z$ = function java_lang_Boolean_equals__Ljava_lang_Object_2Z(o){
  return com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(o, 69) && com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(o, 69).java_lang_Boolean_value == this.java_lang_Boolean_value;
}
;
_.hashCode__I$ = function java_lang_Boolean_hashCode__I(){
  return this.java_lang_Boolean_value?1231:1237;
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Boolean_toString__Ljava_lang_String_2(){
  return '' + this.java_lang_Boolean_value;
}
;
_.java_lang_Boolean_value = false;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Boolean_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Boolean', 69);
function java_lang_Character_digit__CII(c){
  if (c >= 48 && c < 58) {
    return c - 48;
  }
  if (c >= 97 && c < 97) {
    return c - 97 + 10;
  }
  if (c >= 65 && c < 65) {
    return c - 65 + 10;
  }
  return -1;
}

function java_lang_Character_isLetter__CZ(c){
  return null != String.fromCharCode(c).match(/[A-Z]/i);
}

function java_lang_Character_isLowerCase__CZ(c){
  return String.fromCharCode(c).toLowerCase().charCodeAt(0) == c && java_lang_Character_isLetter__CZ(c);
}

function java_lang_Character_toUpperCase__CC(c){
  return String.fromCharCode(c).toUpperCase().charCodeAt(0);
}

function java_lang_ClassCastException_ClassCastException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(62, 17, $intern_9, java_lang_ClassCastException_ClassCastException__V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1ClassCastException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'ClassCastException', 62);
function java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(s){
  var java_lang_Number__1_1isValidDouble__Ljava_lang_String_2Z_floatRegex_0;
  if (!(java_lang_Number__1_1isValidDouble__Ljava_lang_String_2Z_floatRegex_0 = java_lang_Number_floatRegex , !java_lang_Number__1_1isValidDouble__Ljava_lang_String_2Z_floatRegex_0 && (java_lang_Number__1_1isValidDouble__Ljava_lang_String_2Z_floatRegex_0 = java_lang_Number_floatRegex = /^\s*[+-]?(NaN|Infinity|((\d+\.?\d*)|(\.\d+))([eE][+-]?\d+)?[dDfF]?)\s*$/) , java_lang_Number__1_1isValidDouble__Ljava_lang_String_2Z_floatRegex_0.test(s))) {
    throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V($intern_96 + s + '"');
  }
  return parseFloat(s);
}

function java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(s){
  var i, isTooLow, length_0, startIndex, toReturn;
  if (s == null) {
    throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V('null');
  }
  length_0 = s.length;
  startIndex = length_0 > 0 && (s.charCodeAt(0) == 45 || s.charCodeAt(0) == 43)?1:0;
  for (i = startIndex; i < length_0; i++) {
    if (java_lang_Character_digit__CII(s.charCodeAt(i)) == -1) {
      throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V($intern_96 + s + '"');
    }
  }
  toReturn = parseInt(s, 10);
  isTooLow = toReturn < $intern_72;
  if (isNaN(toReturn)) {
    throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V($intern_96 + s + '"');
  }
   else if (isTooLow || toReturn > $intern_2) {
    throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V($intern_96 + s + '"');
  }
  return toReturn;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(95, 1, {3:1, 95:1});
var java_lang_Number_floatRegex;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Number_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Number', 95);
function java_lang_Double_Double__DV(value_0){
  this.java_lang_Double_value = value_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(80, 95, {3:1, 25:1, 80:1, 95:1}, java_lang_Double_Double__DV);
_.equals__Ljava_lang_Object_2Z$ = function java_lang_Double_equals__Ljava_lang_Object_2Z(o){
  return com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(o, 80) && com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(o, 80).java_lang_Double_value == this.java_lang_Double_value;
}
;
_.hashCode__I$ = function java_lang_Double_hashCode__I(){
  return com_google_gwt_lang_Cast_round_1int__DI(this.java_lang_Double_value);
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Double_toString__Ljava_lang_String_2(){
  return '' + this.java_lang_Double_value;
}
;
_.java_lang_Double_value = 0;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Double_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Double', 80);
function java_lang_IllegalArgumentException_IllegalArgumentException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

function java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V(message){
  java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V.call(this, message);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(53, 17, $intern_9, java_lang_IllegalArgumentException_IllegalArgumentException__V, java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1IllegalArgumentException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'IllegalArgumentException', 53);
function java_lang_IllegalStateException_IllegalStateException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

function java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V(s){
  java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V.call(this, s);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(33, 17, $intern_9, java_lang_IllegalStateException_IllegalStateException__V, java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1IllegalStateException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'IllegalStateException', 33);
function java_lang_Integer_Integer__IV(value_0){
  this.java_lang_Integer_value = value_0;
}

function java_lang_Integer_toUnsignedRadixString__IILjava_lang_String_2(value_0, radix){
  return (value_0 >>> 0).toString(radix);
}

function java_lang_Integer_valueOf__ILjava_lang_Integer_2(i){
  var rebase, result;
  if (i > -129 && i < 128) {
    rebase = i + 128;
    result = (java_lang_Integer$BoxedValues_$clinit__V() , java_lang_Integer$BoxedValues_boxedValues)[rebase];
    !result && (result = java_lang_Integer$BoxedValues_boxedValues[rebase] = new java_lang_Integer_Integer__IV(i));
    return result;
  }
  return new java_lang_Integer_Integer__IV(i);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(63, 95, {3:1, 25:1, 63:1, 95:1}, java_lang_Integer_Integer__IV);
_.equals__Ljava_lang_Object_2Z$ = function java_lang_Integer_equals__Ljava_lang_Object_2Z(o){
  return com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(o, 63) && com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(o, 63).java_lang_Integer_value == this.java_lang_Integer_value;
}
;
_.hashCode__I$ = function java_lang_Integer_hashCode__I(){
  return this.java_lang_Integer_value;
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Integer_toString__Ljava_lang_String_2(){
  return '' + this.java_lang_Integer_value;
}
;
_.java_lang_Integer_value = 0;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Integer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'Integer', 63);
function java_lang_Integer$BoxedValues_$clinit__V(){
  java_lang_Integer$BoxedValues_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  java_lang_Integer$BoxedValues_boxedValues = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Integer_12_1classLit, $intern_14, 63, 256, 0, 1);
}

var java_lang_Integer$BoxedValues_boxedValues;
function java_lang_Math_max__III(y_0){
  return 5 > y_0?5:y_0;
}

function java_lang_Math_min__III(x_0, y_0){
  return x_0 < y_0?x_0:y_0;
}

function java_lang_NullPointerException_NullPointerException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

function java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V(message){
  java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V.call(this, message);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(47, 17, $intern_9, java_lang_NullPointerException_NullPointerException__V, java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1NullPointerException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'NullPointerException', 47);
function java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V(message){
  java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V.call(this, message);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(52, 53, {3:1, 9:1, 52:1, 5:1}, java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1NumberFormatException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'NumberFormatException', 52);
function java_lang_StackTraceElement_StackTraceElement__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2IV(methodName, fileName, lineNumber){
  this.java_lang_StackTraceElement_className = $intern_13;
  this.java_lang_StackTraceElement_methodName = methodName;
  this.java_lang_StackTraceElement_fileName = fileName;
  this.java_lang_StackTraceElement_lineNumber = lineNumber;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(46, 1, {3:1, 46:1}, java_lang_StackTraceElement_StackTraceElement__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2IV);
_.equals__Ljava_lang_Object_2Z$ = function java_lang_StackTraceElement_equals__Ljava_lang_Object_2Z(other){
  var st;
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(other, 46)) {
    st = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(other, 46);
    return this.java_lang_StackTraceElement_lineNumber == st.java_lang_StackTraceElement_lineNumber && java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(this.java_lang_StackTraceElement_methodName, st.java_lang_StackTraceElement_methodName) && java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(this.java_lang_StackTraceElement_className, st.java_lang_StackTraceElement_className) && java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(this.java_lang_StackTraceElement_fileName, st.java_lang_StackTraceElement_fileName);
  }
  return false;
}
;
_.hashCode__I$ = function java_lang_StackTraceElement_hashCode__I(){
  return java_util_Arrays_hashCode___3Ljava_lang_Object_2I(com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Object_12_1classLit, 1), $intern_14, 1, 3, [java_lang_Integer_valueOf__ILjava_lang_Integer_2(this.java_lang_StackTraceElement_lineNumber), this.java_lang_StackTraceElement_className, this.java_lang_StackTraceElement_methodName, this.java_lang_StackTraceElement_fileName]));
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_StackTraceElement_toString__Ljava_lang_String_2(){
  return this.java_lang_StackTraceElement_className + '.' + this.java_lang_StackTraceElement_methodName + '(' + (this.java_lang_StackTraceElement_fileName != null?this.java_lang_StackTraceElement_fileName:'Unknown Source') + (this.java_lang_StackTraceElement_lineNumber >= 0?':' + this.java_lang_StackTraceElement_lineNumber:'') + ')';
}
;
_.java_lang_StackTraceElement_lineNumber = 0;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1StackTraceElement_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'StackTraceElement', 46);
function java_lang_String_$charAt__Ljava_lang_String_2IC(this$static, index_0){
  return this$static.charCodeAt(index_0);
}

function java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(this$static, other){
  return this$static === other;
}

function java_lang_String_$equalsIgnoreCase__Ljava_lang_String_2Ljava_lang_String_2Z(this$static, other){
  if (other == null) {
    return false;
  }
  if (this$static == other) {
    return true;
  }
  return this$static.length == other.length && this$static.toLowerCase() == other.toLowerCase();
}

function java_lang_String_$indexOf__Ljava_lang_String_2Ljava_lang_String_2I(this$static, str){
  return this$static.indexOf(str);
}

function java_lang_String_$lastIndexOf__Ljava_lang_String_2Ljava_lang_String_2I(this$static, str){
  return this$static.lastIndexOf(str);
}

function java_lang_String_$lastIndexOf__Ljava_lang_String_2Ljava_lang_String_2II(this$static, str, start_0){
  return this$static.lastIndexOf(str, start_0);
}

function java_lang_String_$matches__Ljava_lang_String_2Ljava_lang_String_2Z(this$static, regex){
  return (new RegExp('^(' + regex + ')$')).test(this$static);
}

function java_lang_String_$replace__Ljava_lang_String_2CCLjava_lang_String_2(this$static, from, to){
  var hex = java_lang_Integer_toUnsignedRadixString__IILjava_lang_String_2(from, 16);
  var regex = '\\u' + '0000'.substring(hex.length) + hex;
  return this$static.replace(RegExp(regex, 'g'), String.fromCharCode(to));
}

function java_lang_String_$replaceAll__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2(this$static, regex, replace){
  replace = java_lang_String__1_1translateReplaceString__Ljava_lang_String_2Ljava_lang_String_2(replace);
  return this$static.replace(RegExp(regex, 'g'), replace);
}

function java_lang_String_$split__Ljava_lang_String_2Ljava_lang_String_2I_3Ljava_lang_String_2(this$static, regex, maxMatch){
  var compiled = new RegExp(regex, 'g');
  var out = [];
  var count = 0;
  var trail = this$static;
  var lastTrail = null;
  while (true) {
    var matchObj = compiled.exec(trail);
    if (matchObj == null || trail == '' || count == maxMatch - 1 && maxMatch > 0) {
      out[count] = trail;
      break;
    }
     else {
      out[count] = trail.substring(0, matchObj.index);
      trail = trail.substring(matchObj.index + matchObj[0].length, trail.length);
      compiled.lastIndex = 0;
      if (lastTrail == trail) {
        out[count] = trail.substring(0, 1);
        trail = trail.substring(1);
      }
      lastTrail = trail;
      count++;
    }
  }
  if (maxMatch == 0 && this$static.length > 0) {
    var lastNonEmpty = out.length;
    while (lastNonEmpty > 0 && out[lastNonEmpty - 1] == '') {
      --lastNonEmpty;
    }
    lastNonEmpty < out.length && out.splice(lastNonEmpty, out.length - lastNonEmpty);
  }
  var jr = java_lang_String__1_1createArray__I_3Ljava_lang_String_2(out.length);
  for (var i = 0; i < out.length; ++i) {
    jr[i] = out[i];
  }
  return jr;
}

function java_lang_String_$startsWith__Ljava_lang_String_2Ljava_lang_String_2Z(this$static, prefix){
  return java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(this$static, 0, prefix.length), prefix);
}

function java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(this$static, beginIndex){
  return java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(this$static, beginIndex, this$static.length - beginIndex);
}

function java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(this$static){
  if (this$static.length == 0 || this$static[0] > ' ' && this$static[this$static.length - 1] > ' ') {
    return this$static;
  }
  return this$static.replace(/^[\u0000-\u0020]*|[\u0000-\u0020]*$/g, '');
}

function java_lang_String__1_1createArray__I_3Ljava_lang_String_2(numElements){
  return com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1String_12_1classLit, $intern_14, 2, numElements, 4, 1);
}

function java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(str, beginIndex, len){
  return str.substr(beginIndex, len);
}

function java_lang_String__1_1translateReplaceString__Ljava_lang_String_2Ljava_lang_String_2(replaceStr){
  var pos;
  pos = 0;
  while (0 <= (pos = replaceStr.indexOf('\\', pos))) {
    replaceStr.charCodeAt(pos + 1) == 36?(replaceStr = replaceStr.substr(0, pos) + '$' + java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(replaceStr, ++pos)):(replaceStr = replaceStr.substr(0, pos) + java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(replaceStr, ++pos));
  }
  return replaceStr;
}

function java_lang_String_fromCodePoint__ILjava_lang_String_2(codePoint){
  var hiSurrogate, loSurrogate;
  if (codePoint >= $intern_33) {
    hiSurrogate = 55296 + (codePoint - $intern_33 >> 10 & 1023) & 65535;
    loSurrogate = 56320 + (codePoint - $intern_33 & 1023) & 65535;
    return java_lang_String_valueOf__CLjava_lang_String_2(hiSurrogate) + java_lang_String_valueOf__CLjava_lang_String_2(loSurrogate);
  }
   else {
    return String.fromCharCode(codePoint & 65535);
  }
}

function java_lang_String_valueOf__CLjava_lang_String_2(x_0){
  return String.fromCharCode(x_0);
}

var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1String_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'String', 2);
function java_lang_String$HashCache_$clinit__V(){
  java_lang_String$HashCache_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  java_lang_String$HashCache_back = {};
  java_lang_String$HashCache_front = {};
}

function java_lang_String$HashCache_compute__Ljava_lang_String_2I(str){
  var hashCode, i, n, nBatch;
  hashCode = 0;
  n = str.length;
  nBatch = n - 4;
  i = 0;
  while (i < nBatch) {
    hashCode = str.charCodeAt(i + 3) + 31 * (str.charCodeAt(i + 2) + 31 * (str.charCodeAt(i + 1) + 31 * (str.charCodeAt(i) + 31 * hashCode)));
    hashCode = ~~hashCode;
    i += 4;
  }
  while (i < n) {
    hashCode = hashCode * 31 + java_lang_String_$charAt__Ljava_lang_String_2IC(str, i++);
  }
  hashCode = ~~hashCode;
  return hashCode;
}

function java_lang_String$HashCache_getHashCode__Ljava_lang_String_2I(str){
  java_lang_String$HashCache_$clinit__V();
  var key = ':' + str;
  var result = java_lang_String$HashCache_front[key];
  if (result != null) {
    return result;
  }
  result = java_lang_String$HashCache_back[key];
  result == null && (result = java_lang_String$HashCache_compute__Ljava_lang_String_2I(str));
  java_lang_String$HashCache_increment__V();
  return java_lang_String$HashCache_front[key] = result;
}

function java_lang_String$HashCache_increment__V(){
  if (java_lang_String$HashCache_count == 256) {
    java_lang_String$HashCache_back = java_lang_String$HashCache_front;
    java_lang_String$HashCache_front = {};
    java_lang_String$HashCache_count = 0;
  }
  ++java_lang_String$HashCache_count;
}

var java_lang_String$HashCache_back, java_lang_String$HashCache_count = 0, java_lang_String$HashCache_front;
function java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(this$static, x_0){
  this$static.java_lang_AbstractStringBuilder_string += x_0;
  return this$static;
}

function java_lang_StringBuilder_$deleteCharAt__Ljava_lang_StringBuilder_2ILjava_lang_StringBuilder_2(this$static, start_0){
  this$static.java_lang_AbstractStringBuilder_string = java_lang_String__1_1substr__Ljava_lang_String_2IILjava_lang_String_2(this$static.java_lang_AbstractStringBuilder_string, 0, start_0) + '' + java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(this$static.java_lang_AbstractStringBuilder_string, start_0 + 1);
  return this$static;
}

function java_lang_StringBuilder_StringBuilder__V(){
  java_lang_AbstractStringBuilder_AbstractStringBuilder__Ljava_lang_String_2V.call(this, '');
}

function java_lang_StringBuilder_StringBuilder__Ljava_lang_String_2V(s){
  java_lang_AbstractStringBuilder_AbstractStringBuilder__Ljava_lang_String_2V.call(this, s);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(32, 115, {324:1}, java_lang_StringBuilder_StringBuilder__V, java_lang_StringBuilder_StringBuilder__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1StringBuilder_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'StringBuilder', 32);
function java_lang_UnsupportedOperationException_UnsupportedOperationException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

function java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V(message){
  java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V.call(this, message);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(81, 17, $intern_9, java_lang_UnsupportedOperationException_UnsupportedOperationException__V, java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1UnsupportedOperationException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_3, 'UnsupportedOperationException', 81);
function java_util_AbstractCollection_$advanceToFind__Ljava_util_AbstractCollection_2Ljava_lang_Object_2ZZ(this$static, o){
  var e, iter;
  for (iter = this$static.iterator__Ljava_util_Iterator_2(); iter.hasNext__Z();) {
    e = iter.next__Ljava_lang_Object_2();
    if (com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(o) === com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(e) || o != null && java_lang_Object_equals_1Ljava_1lang_1Object_1_1Z_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(o, e)) {
      return true;
    }
  }
  return false;
}

function java_util_AbstractCollection_$containsAll__Ljava_util_AbstractCollection_2Ljava_util_Collection_2Z(this$static, c){
  var e, e$iterator;
  com_google_gwt_core_shared_impl_InternalPreconditions_checkNotNull__Ljava_lang_Object_2Ljava_lang_Object_2(c);
  for (e$iterator = c.iterator__Ljava_util_Iterator_2(); e$iterator.hasNext__Z();) {
    e = e$iterator.next__Ljava_lang_Object_2();
    if (!this$static.contains__Ljava_lang_Object_2Z(e)) {
      return false;
    }
  }
  return true;
}

function java_util_AbstractCollection_$toString__Ljava_util_AbstractCollection_2Ljava_lang_String_2(this$static){
  var comma, e, e$iterator, sb;
  sb = new java_lang_StringBuilder_StringBuilder__Ljava_lang_String_2V('[');
  comma = false;
  for (e$iterator = this$static.iterator__Ljava_util_Iterator_2(); e$iterator.hasNext__Z();) {
    e = e$iterator.next__Ljava_lang_Object_2();
    comma?(sb.java_lang_AbstractStringBuilder_string += ', ' , sb):(comma = true);
    sb.java_lang_AbstractStringBuilder_string += e === this$static?'(this Collection)':'' + e;
  }
  sb.java_lang_AbstractStringBuilder_string += ']';
  return sb.java_lang_AbstractStringBuilder_string;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(305, 1, {});
_.contains__Ljava_lang_Object_2Z = function java_util_AbstractCollection_contains__Ljava_lang_Object_2Z(o){
  return java_util_AbstractCollection_$advanceToFind__Ljava_util_AbstractCollection_2Ljava_lang_Object_2ZZ(this, o);
}
;
_.toString__Ljava_lang_String_2$ = function java_util_AbstractCollection_toString__Ljava_lang_String_2(){
  return java_util_AbstractCollection_$toString__Ljava_util_AbstractCollection_2Ljava_lang_String_2(this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractCollection_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractCollection', 305);
function java_util_AbstractMap_$containsEntry__Ljava_util_AbstractMap_2Ljava_util_Map$Entry_2Z(this$static, entry){
  var key, ourValue, value_0;
  key = entry.getKey__Ljava_lang_Object_2();
  value_0 = entry.getValue__Ljava_lang_Object_2();
  ourValue = this$static.get__Ljava_lang_Object_2Ljava_lang_Object_2(key);
  if (!(com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(value_0) === com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(ourValue) || value_0 != null && java_lang_Object_equals_1Ljava_1lang_1Object_1_1Z_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(value_0, ourValue))) {
    return false;
  }
  if (ourValue == null && !this$static.containsKey__Ljava_lang_Object_2Z(key)) {
    return false;
  }
  return true;
}

function java_util_AbstractMap_$implFindEntry__Ljava_util_AbstractMap_2Ljava_lang_Object_2ZLjava_util_Map$Entry_2(this$static, key){
  var entry, iter, k;
  for (iter = this$static.entrySet__Ljava_util_Set_2().iterator__Ljava_util_Iterator_2(); iter.hasNext__Z();) {
    entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(iter.next__Ljava_lang_Object_2(), 18);
    k = entry.getKey__Ljava_lang_Object_2();
    if (com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(key) === com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(k) || key != null && java_lang_Object_equals_1Ljava_1lang_1Object_1_1Z_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(key, k)) {
      return entry;
    }
  }
  return null;
}

function java_util_AbstractMap_$toString__Ljava_util_AbstractMap_2Ljava_lang_Object_2Ljava_lang_String_2(this$static, o){
  return o === this$static?'(this Map)':'' + o;
}

function java_util_AbstractMap_getEntryValueOrNull__Ljava_util_Map$Entry_2Ljava_lang_Object_2(entry){
  return !entry?null:entry.getValue__Ljava_lang_Object_2();
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(304, 1, {68:1});
_.containsKey__Ljava_lang_Object_2Z = function java_util_AbstractMap_containsKey__Ljava_lang_Object_2Z(key){
  return !!java_util_AbstractMap_$implFindEntry__Ljava_util_AbstractMap_2Ljava_lang_Object_2ZLjava_util_Map$Entry_2(this, key);
}
;
_.equals__Ljava_lang_Object_2Z$ = function java_util_AbstractMap_equals__Ljava_lang_Object_2Z(obj){
  var entry, entry$iterator, otherMap;
  if (obj === this) {
    return true;
  }
  if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(obj, 68)) {
    return false;
  }
  otherMap = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(obj, 68);
  if (this.size__I() != otherMap.size__I()) {
    return false;
  }
  for (entry$iterator = otherMap.entrySet__Ljava_util_Set_2().iterator__Ljava_util_Iterator_2(); entry$iterator.hasNext__Z();) {
    entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(entry$iterator.next__Ljava_lang_Object_2(), 18);
    if (!java_util_AbstractMap_$containsEntry__Ljava_util_AbstractMap_2Ljava_util_Map$Entry_2Z(this, entry)) {
      return false;
    }
  }
  return true;
}
;
_.get__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractMap_get__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  return java_util_AbstractMap_getEntryValueOrNull__Ljava_util_Map$Entry_2Ljava_lang_Object_2(java_util_AbstractMap_$implFindEntry__Ljava_util_AbstractMap_2Ljava_lang_Object_2ZLjava_util_Map$Entry_2(this, key));
}
;
_.hashCode__I$ = function java_util_AbstractMap_hashCode__I(){
  return java_util_Collections_hashCode__Ljava_lang_Iterable_2I(this.entrySet__Ljava_util_Set_2());
}
;
_.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractMap_put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(key, value_0){
  throw new java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V('Put not supported on this map');
}
;
_.size__I = function java_util_AbstractMap_size__I(){
  return this.entrySet__Ljava_util_Set_2().size__I();
}
;
_.toString__Ljava_lang_String_2$ = function java_util_AbstractMap_toString__Ljava_lang_String_2(){
  var comma, entry, entry$iterator, sb;
  sb = new java_lang_StringBuilder_StringBuilder__Ljava_lang_String_2V('{');
  comma = false;
  for (entry$iterator = this.entrySet__Ljava_util_Set_2().iterator__Ljava_util_Iterator_2(); entry$iterator.hasNext__Z();) {
    entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(entry$iterator.next__Ljava_lang_Object_2(), 18);
    comma?(sb.java_lang_AbstractStringBuilder_string += ', ' , sb):(comma = true);
    java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(sb, java_util_AbstractMap_$toString__Ljava_util_AbstractMap_2Ljava_lang_Object_2Ljava_lang_String_2(this, entry.getKey__Ljava_lang_Object_2()));
    sb.java_lang_AbstractStringBuilder_string += '=';
    java_lang_StringBuilder_$append__Ljava_lang_StringBuilder_2Ljava_lang_String_2Ljava_lang_StringBuilder_2(sb, java_util_AbstractMap_$toString__Ljava_util_AbstractMap_2Ljava_lang_Object_2Ljava_lang_String_2(this, entry.getValue__Ljava_lang_Object_2()));
  }
  sb.java_lang_AbstractStringBuilder_string += '}';
  return sb.java_lang_AbstractStringBuilder_string;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractMap', 304);
function java_util_AbstractHashMap_$elementAdded__Ljava_util_AbstractHashMap_2V(this$static){
  ++this$static.java_util_AbstractHashMap_size;
  java_util_ConcurrentModificationDetector_structureChanged__Ljava_lang_Object_2V(this$static);
}

function java_util_AbstractHashMap_$elementRemoved__Ljava_util_AbstractHashMap_2V(this$static){
  --this$static.java_util_AbstractHashMap_size;
  java_util_ConcurrentModificationDetector_structureChanged__Ljava_lang_Object_2V(this$static);
}

function java_util_AbstractHashMap_$reset__Ljava_util_AbstractHashMap_2V(this$static){
  java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_$clinit__V();
  this$static.java_util_AbstractHashMap_hashCodeMap = java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_delegate.createJsHashCodeMap__Ljava_util_InternalJsHashCodeMap_2();
  this$static.java_util_AbstractHashMap_hashCodeMap.java_util_InternalJsHashCodeMap_host = this$static;
  this$static.java_util_AbstractHashMap_stringMap = java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_delegate.createJsStringMap__Ljava_util_InternalJsStringMap_2();
  this$static.java_util_AbstractHashMap_stringMap.java_util_InternalJsStringMap_host = this$static;
  this$static.java_util_AbstractHashMap_size = 0;
  java_util_ConcurrentModificationDetector_structureChanged__Ljava_lang_Object_2V(this$static);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(150, 304, {68:1});
_.clear__V = function java_util_AbstractHashMap_clear__V(){
  java_util_AbstractHashMap_$reset__Ljava_util_AbstractHashMap_2V(this);
}
;
_.containsKey__Ljava_lang_Object_2Z = function java_util_AbstractHashMap_containsKey__Ljava_lang_Object_2Z(key){
  return com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(key)?key == null?!!java_util_InternalJsHashCodeMap_$getEntry__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_util_Map$Entry_2(this.java_util_AbstractHashMap_hashCodeMap, null):!(this.java_util_AbstractHashMap_stringMap.get__Ljava_lang_String_2Ljava_lang_Object_2(key) === undefined):!!java_util_InternalJsHashCodeMap_$getEntry__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_util_Map$Entry_2(this.java_util_AbstractHashMap_hashCodeMap, key);
}
;
_.entrySet__Ljava_util_Set_2 = function java_util_AbstractHashMap_entrySet__Ljava_util_Set_2(){
  return new java_util_AbstractHashMap$EntrySet_AbstractHashMap$EntrySet__Ljava_util_AbstractHashMap_2V(this);
}
;
_.get__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractHashMap_get__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  return com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(key)?key == null?java_util_AbstractMap_getEntryValueOrNull__Ljava_util_Map$Entry_2Ljava_lang_Object_2(java_util_InternalJsHashCodeMap_$getEntry__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_util_Map$Entry_2(this.java_util_AbstractHashMap_hashCodeMap, null)):this.java_util_AbstractHashMap_stringMap.get__Ljava_lang_String_2Ljava_lang_Object_2(key):java_util_AbstractMap_getEntryValueOrNull__Ljava_util_Map$Entry_2Ljava_lang_Object_2(java_util_InternalJsHashCodeMap_$getEntry__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_util_Map$Entry_2(this.java_util_AbstractHashMap_hashCodeMap, key));
}
;
_.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractHashMap_put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(key, value_0){
  return com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(key)?key == null?java_util_InternalJsHashCodeMap_$put__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this.java_util_AbstractHashMap_hashCodeMap, null, value_0):this.java_util_AbstractHashMap_stringMap.put__Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(key, value_0):java_util_InternalJsHashCodeMap_$put__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this.java_util_AbstractHashMap_hashCodeMap, key, value_0);
}
;
_.remove__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractHashMap_remove__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  return com_google_gwt_lang_Cast_isJavaString__Ljava_lang_Object_2Z(key)?key == null?java_util_InternalJsHashCodeMap_$remove__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this.java_util_AbstractHashMap_hashCodeMap, null):this.java_util_AbstractHashMap_stringMap.remove__Ljava_lang_String_2Ljava_lang_Object_2(key):java_util_InternalJsHashCodeMap_$remove__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this.java_util_AbstractHashMap_hashCodeMap, key);
}
;
_.size__I = function java_util_AbstractHashMap_size__I(){
  return this.java_util_AbstractHashMap_size;
}
;
_.java_util_AbstractHashMap_size = 0;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractHashMap', 150);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(306, 305, $intern_98);
_.equals__Ljava_lang_Object_2Z$ = function java_util_AbstractSet_equals__Ljava_lang_Object_2Z(o){
  var other;
  if (o === this) {
    return true;
  }
  if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(o, 78)) {
    return false;
  }
  other = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(o, 78);
  if (other.size__I() != this.size__I()) {
    return false;
  }
  return java_util_AbstractCollection_$containsAll__Ljava_util_AbstractCollection_2Ljava_util_Collection_2Z(this, other);
}
;
_.hashCode__I$ = function java_util_AbstractSet_hashCode__I(){
  return java_util_Collections_hashCode__Ljava_lang_Iterable_2I(this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractSet_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractSet', 306);
function java_util_AbstractHashMap$EntrySet_$contains__Ljava_util_AbstractHashMap$EntrySet_2Ljava_lang_Object_2Z(this$static, o){
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(o, 18)) {
    return java_util_AbstractMap_$containsEntry__Ljava_util_AbstractMap_2Ljava_util_Map$Entry_2Z(this$static.java_util_AbstractHashMap$EntrySet_this$01, com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(o, 18));
  }
  return false;
}

function java_util_AbstractHashMap$EntrySet_AbstractHashMap$EntrySet__Ljava_util_AbstractHashMap_2V(this$0){
  this.java_util_AbstractHashMap$EntrySet_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(151, 306, $intern_98, java_util_AbstractHashMap$EntrySet_AbstractHashMap$EntrySet__Ljava_util_AbstractHashMap_2V);
_.contains__Ljava_lang_Object_2Z = function java_util_AbstractHashMap$EntrySet_contains__Ljava_lang_Object_2Z(o){
  return java_util_AbstractHashMap$EntrySet_$contains__Ljava_util_AbstractHashMap$EntrySet_2Ljava_lang_Object_2Z(this, o);
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_AbstractHashMap$EntrySet_iterator__Ljava_util_Iterator_2(){
  return new java_util_AbstractHashMap$EntrySetIterator_AbstractHashMap$EntrySetIterator__Ljava_util_AbstractHashMap_2V(this.java_util_AbstractHashMap$EntrySet_this$01);
}
;
_.size__I = function java_util_AbstractHashMap$EntrySet_size__I(){
  return this.java_util_AbstractHashMap$EntrySet_this$01.size__I();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$EntrySet_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractHashMap/EntrySet', 151);
function java_util_AbstractHashMap$EntrySetIterator_$hasNext__Ljava_util_AbstractHashMap$EntrySetIterator_2Z(this$static){
  if (this$static.java_util_AbstractHashMap$EntrySetIterator_current.hasNext__Z()) {
    return true;
  }
  if (this$static.java_util_AbstractHashMap$EntrySetIterator_current != this$static.java_util_AbstractHashMap$EntrySetIterator_stringMapEntries) {
    return false;
  }
  this$static.java_util_AbstractHashMap$EntrySetIterator_current = this$static.java_util_AbstractHashMap$EntrySetIterator_this$01.java_util_AbstractHashMap_hashCodeMap.entries__Ljava_util_Iterator_2();
  return this$static.java_util_AbstractHashMap$EntrySetIterator_current.hasNext__Z();
}

function java_util_AbstractHashMap$EntrySetIterator_AbstractHashMap$EntrySetIterator__Ljava_util_AbstractHashMap_2V(this$0){
  this.java_util_AbstractHashMap$EntrySetIterator_this$01 = this$0;
  this.java_util_AbstractHashMap$EntrySetIterator_stringMapEntries = this.java_util_AbstractHashMap$EntrySetIterator_this$01.java_util_AbstractHashMap_stringMap.entries__Ljava_util_Iterator_2();
  this.java_util_AbstractHashMap$EntrySetIterator_current = this.java_util_AbstractHashMap$EntrySetIterator_stringMapEntries;
  java_util_ConcurrentModificationDetector_setModCount__Ljava_lang_Object_2IV(this, this$0._gwt_modCount);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(152, 1, {}, java_util_AbstractHashMap$EntrySetIterator_AbstractHashMap$EntrySetIterator__Ljava_util_AbstractHashMap_2V);
_.hasNext__Z = function java_util_AbstractHashMap$EntrySetIterator_hasNext__Z(){
  return java_util_AbstractHashMap$EntrySetIterator_$hasNext__Ljava_util_AbstractHashMap$EntrySetIterator_2Z(this);
}
;
_.next__Ljava_lang_Object_2 = function java_util_AbstractHashMap$EntrySetIterator_next__Ljava_lang_Object_2(){
  return java_util_ConcurrentModificationDetector_checkStructuralChange__Ljava_lang_Object_2Ljava_util_Iterator_2V(this.java_util_AbstractHashMap$EntrySetIterator_this$01, this) , com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(java_util_AbstractHashMap$EntrySetIterator_$hasNext__Ljava_util_AbstractHashMap$EntrySetIterator_2Z(this)) , com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this.java_util_AbstractHashMap$EntrySetIterator_current.next__Ljava_lang_Object_2(), 18);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$EntrySetIterator_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractHashMap/EntrySetIterator', 152);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(308, 305, {6:1});
_.add__ILjava_lang_Object_2V = function java_util_AbstractList_add__ILjava_lang_Object_2V(index_0, element){
  throw new java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V('Add not supported on this list');
}
;
_.add__Ljava_lang_Object_2Z = function java_util_AbstractList_add__Ljava_lang_Object_2Z(obj){
  this.add__ILjava_lang_Object_2V(this.size__I(), obj);
  return true;
}
;
_.equals__Ljava_lang_Object_2Z$ = function java_util_AbstractList_equals__Ljava_lang_Object_2Z(o){
  var elem, elem$iterator, elemOther, iterOther, other;
  if (o === this) {
    return true;
  }
  if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(o, 6)) {
    return false;
  }
  other = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(o, 6);
  if (this.size__I() != other.size__I()) {
    return false;
  }
  iterOther = other.iterator__Ljava_util_Iterator_2();
  for (elem$iterator = this.iterator__Ljava_util_Iterator_2(); elem$iterator.hasNext__Z();) {
    elem = elem$iterator.next__Ljava_lang_Object_2();
    elemOther = iterOther.next__Ljava_lang_Object_2();
    if (!(com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(elem) === com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(elemOther) || elem != null && java_lang_Object_equals_1Ljava_1lang_1Object_1_1Z_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(elem, elemOther))) {
      return false;
    }
  }
  return true;
}
;
_.hashCode__I$ = function java_util_AbstractList_hashCode__I(){
  return java_util_Collections_hashCode__Ljava_util_List_2I(this);
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_AbstractList_iterator__Ljava_util_Iterator_2(){
  return new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this);
}
;
_.listIterator__Ljava_util_ListIterator_2 = function java_util_AbstractList_listIterator__Ljava_util_ListIterator_2(){
  return new java_util_AbstractList$ListIteratorImpl_AbstractList$ListIteratorImpl__Ljava_util_AbstractList_2IV(this, 0);
}
;
_.listIterator__ILjava_util_ListIterator_2 = function java_util_AbstractList_listIterator__ILjava_util_ListIterator_2(from){
  return new java_util_AbstractList$ListIteratorImpl_AbstractList$ListIteratorImpl__Ljava_util_AbstractList_2IV(this, from);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractList_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractList', 308);
function java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this$0){
  this.java_util_AbstractList$IteratorImpl_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(23, 1, {}, java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V);
_.hasNext__Z = function java_util_AbstractList$IteratorImpl_hasNext__Z(){
  return this.java_util_AbstractList$IteratorImpl_i < this.java_util_AbstractList$IteratorImpl_this$01.size__I();
}
;
_.next__Ljava_lang_Object_2 = function java_util_AbstractList$IteratorImpl_next__Ljava_lang_Object_2(){
  return com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(this.java_util_AbstractList$IteratorImpl_i < this.java_util_AbstractList$IteratorImpl_this$01.size__I()) , this.java_util_AbstractList$IteratorImpl_this$01.get__ILjava_lang_Object_2(this.java_util_AbstractList$IteratorImpl_i++);
}
;
_.java_util_AbstractList$IteratorImpl_i = 0;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractList$IteratorImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractList/IteratorImpl', 23);
function java_util_AbstractList$ListIteratorImpl_AbstractList$ListIteratorImpl__Ljava_util_AbstractList_2IV(this$0, start_0){
  this.java_util_AbstractList$ListIteratorImpl_this$01 = this$0;
  java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V.call(this, this$0);
  com_google_gwt_core_shared_impl_InternalPreconditions_checkPositionIndex__IIV(start_0, this$0.size__I());
  this.java_util_AbstractList$IteratorImpl_i = start_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(121, 23, {}, java_util_AbstractList$ListIteratorImpl_AbstractList$ListIteratorImpl__Ljava_util_AbstractList_2IV);
_.hasPrevious__Z = function java_util_AbstractList$ListIteratorImpl_hasPrevious__Z(){
  return this.java_util_AbstractList$IteratorImpl_i > 0;
}
;
_.previous__Ljava_lang_Object_2 = function java_util_AbstractList$ListIteratorImpl_previous__Ljava_lang_Object_2(){
  com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(this.java_util_AbstractList$IteratorImpl_i > 0);
  return this.java_util_AbstractList$ListIteratorImpl_this$01.get__ILjava_lang_Object_2(--this.java_util_AbstractList$IteratorImpl_i);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractList$ListIteratorImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractList/ListIteratorImpl', 121);
function java_util_AbstractMap$1_$iterator__Ljava_util_AbstractMap$1_2Ljava_util_Iterator_2(this$static){
  var outerIter;
  outerIter = this$static.java_util_AbstractMap$1_this$01.entrySet__Ljava_util_Set_2().iterator__Ljava_util_Iterator_2();
  return new java_util_AbstractMap$1$1_AbstractMap$1$1__Ljava_util_AbstractMap$1_2V(outerIter);
}

function java_util_AbstractMap$1_AbstractMap$1__Ljava_util_AbstractMap_2V(this$0){
  this.java_util_AbstractMap$1_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(117, 306, $intern_98, java_util_AbstractMap$1_AbstractMap$1__Ljava_util_AbstractMap_2V);
_.contains__Ljava_lang_Object_2Z = function java_util_AbstractMap$1_contains__Ljava_lang_Object_2Z(key){
  return this.java_util_AbstractMap$1_this$01.containsKey__Ljava_lang_Object_2Z(key);
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_AbstractMap$1_iterator__Ljava_util_Iterator_2(){
  return java_util_AbstractMap$1_$iterator__Ljava_util_AbstractMap$1_2Ljava_util_Iterator_2(this);
}
;
_.size__I = function java_util_AbstractMap$1_size__I(){
  return this.java_util_AbstractMap$1_this$01.size__I();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractMap/1', 117);
function java_util_AbstractMap$1$1_AbstractMap$1$1__Ljava_util_AbstractMap$1_2V(val$outerIter){
  this.java_util_AbstractMap$1$1_val$outerIter2 = val$outerIter;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(154, 1, {}, java_util_AbstractMap$1$1_AbstractMap$1$1__Ljava_util_AbstractMap$1_2V);
_.hasNext__Z = function java_util_AbstractMap$1$1_hasNext__Z(){
  return this.java_util_AbstractMap$1$1_val$outerIter2.hasNext__Z();
}
;
_.next__Ljava_lang_Object_2 = function java_util_AbstractMap$1$1_next__Ljava_lang_Object_2(){
  var entry;
  entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this.java_util_AbstractMap$1$1_val$outerIter2.next__Ljava_lang_Object_2(), 18);
  return entry.getKey__Ljava_lang_Object_2();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$1$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractMap/1/1', 154);
function java_util_AbstractMap$2_$iterator__Ljava_util_AbstractMap$2_2Ljava_util_Iterator_2(this$static){
  var outerIter;
  outerIter = new java_util_LinkedHashMap$EntrySet$EntryIterator_LinkedHashMap$EntrySet$EntryIterator__Ljava_util_LinkedHashMap$EntrySet_2V(new java_util_LinkedHashMap$EntrySet_LinkedHashMap$EntrySet__Ljava_util_LinkedHashMap_2V(this$static.java_util_AbstractMap$2_this$01));
  return new java_util_AbstractMap$2$1_AbstractMap$2$1__Ljava_util_AbstractMap$2_2V(outerIter);
}

function java_util_AbstractMap$2_AbstractMap$2__Ljava_util_AbstractMap_2V(this$0){
  this.java_util_AbstractMap$2_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(155, 305, {}, java_util_AbstractMap$2_AbstractMap$2__Ljava_util_AbstractMap_2V);
_.contains__Ljava_lang_Object_2Z = function java_util_AbstractMap$2_contains__Ljava_lang_Object_2Z(value_0){
  return java_util_LinkedHashMap_$containsValue__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Z(this.java_util_AbstractMap$2_this$01, value_0);
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_AbstractMap$2_iterator__Ljava_util_Iterator_2(){
  return java_util_AbstractMap$2_$iterator__Ljava_util_AbstractMap$2_2Ljava_util_Iterator_2(this);
}
;
_.size__I = function java_util_AbstractMap$2_size__I(){
  return this.java_util_AbstractMap$2_this$01.java_util_LinkedHashMap_map.size__I();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractMap/2', 155);
function java_util_AbstractMap$2$1_$next__Ljava_util_AbstractMap$2$1_2Ljava_lang_Object_2(this$static){
  var entry;
  entry = java_util_LinkedHashMap$EntrySet$EntryIterator_$next__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Ljava_lang_Object_2(this$static.java_util_AbstractMap$2$1_val$outerIter2);
  return entry.java_util_AbstractMap$AbstractEntry_value;
}

function java_util_AbstractMap$2$1_AbstractMap$2$1__Ljava_util_AbstractMap$2_2V(val$outerIter){
  this.java_util_AbstractMap$2$1_val$outerIter2 = val$outerIter;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(156, 1, {}, java_util_AbstractMap$2$1_AbstractMap$2$1__Ljava_util_AbstractMap$2_2V);
_.hasNext__Z = function java_util_AbstractMap$2$1_hasNext__Z(){
  return java_util_LinkedHashMap$EntrySet$EntryIterator_$hasNext__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Z(this.java_util_AbstractMap$2$1_val$outerIter2);
}
;
_.next__Ljava_lang_Object_2 = function java_util_AbstractMap$2$1_next__Ljava_lang_Object_2(){
  return java_util_AbstractMap$2$1_$next__Ljava_util_AbstractMap$2$1_2Ljava_lang_Object_2(this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$2$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractMap/2/1', 156);
function java_util_AbstractMap$AbstractEntry_$setValue__Ljava_util_AbstractMap$AbstractEntry_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, value_0){
  var oldValue;
  oldValue = this$static.java_util_AbstractMap$AbstractEntry_value;
  this$static.java_util_AbstractMap$AbstractEntry_value = value_0;
  return oldValue;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(153, 1, $intern_99);
_.equals__Ljava_lang_Object_2Z$ = function java_util_AbstractMap$AbstractEntry_equals__Ljava_lang_Object_2Z(other){
  var entry;
  if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(other, 18)) {
    return false;
  }
  entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(other, 18);
  return java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(this.java_util_AbstractMap$AbstractEntry_key, entry.getKey__Ljava_lang_Object_2()) && java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(this.java_util_AbstractMap$AbstractEntry_value, entry.getValue__Ljava_lang_Object_2());
}
;
_.getKey__Ljava_lang_Object_2 = function java_util_AbstractMap$AbstractEntry_getKey__Ljava_lang_Object_2(){
  return this.java_util_AbstractMap$AbstractEntry_key;
}
;
_.getValue__Ljava_lang_Object_2 = function java_util_AbstractMap$AbstractEntry_getValue__Ljava_lang_Object_2(){
  return this.java_util_AbstractMap$AbstractEntry_value;
}
;
_.hashCode__I$ = function java_util_AbstractMap$AbstractEntry_hashCode__I(){
  return java_util_Objects_hashCode__Ljava_lang_Object_2I(this.java_util_AbstractMap$AbstractEntry_key) ^ java_util_Objects_hashCode__Ljava_lang_Object_2I(this.java_util_AbstractMap$AbstractEntry_value);
}
;
_.setValue__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractMap$AbstractEntry_setValue__Ljava_lang_Object_2Ljava_lang_Object_2(value_0){
  return java_util_AbstractMap$AbstractEntry_$setValue__Ljava_util_AbstractMap$AbstractEntry_2Ljava_lang_Object_2Ljava_lang_Object_2(this, value_0);
}
;
_.toString__Ljava_lang_String_2$ = function java_util_AbstractMap$AbstractEntry_toString__Ljava_lang_String_2(){
  return this.java_util_AbstractMap$AbstractEntry_key + '=' + this.java_util_AbstractMap$AbstractEntry_value;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$AbstractEntry_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractMap/AbstractEntry', 153);
function java_util_AbstractMap$SimpleEntry_AbstractMap$SimpleEntry__Ljava_lang_Object_2Ljava_lang_Object_2V(key, value_0){
  this.java_util_AbstractMap$AbstractEntry_key = key;
  this.java_util_AbstractMap$AbstractEntry_value = value_0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(116, 153, $intern_99, java_util_AbstractMap$SimpleEntry_AbstractMap$SimpleEntry__Ljava_lang_Object_2Ljava_lang_Object_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$SimpleEntry_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractMap/SimpleEntry', 116);
com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(309, 1, $intern_99);
_.equals__Ljava_lang_Object_2Z$ = function java_util_AbstractMapEntry_equals__Ljava_lang_Object_2Z(other){
  var entry;
  if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(other, 18)) {
    return false;
  }
  entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(other, 18);
  return java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(this.getKey__Ljava_lang_Object_2(), entry.getKey__Ljava_lang_Object_2()) && java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(this.getValue__Ljava_lang_Object_2(), entry.getValue__Ljava_lang_Object_2());
}
;
_.hashCode__I$ = function java_util_AbstractMapEntry_hashCode__I(){
  return java_util_Objects_hashCode__Ljava_lang_Object_2I(this.getKey__Ljava_lang_Object_2()) ^ java_util_Objects_hashCode__Ljava_lang_Object_2I(this.getValue__Ljava_lang_Object_2());
}
;
_.toString__Ljava_lang_String_2$ = function java_util_AbstractMapEntry_toString__Ljava_lang_String_2(){
  return this.getKey__Ljava_lang_Object_2() + '=' + this.getValue__Ljava_lang_Object_2();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMapEntry_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'AbstractMapEntry', 309);
function java_util_ArrayList_$add__Ljava_util_ArrayList_2ILjava_lang_Object_2V(this$static, index_0, o){
  com_google_gwt_core_shared_impl_InternalPreconditions_checkPositionIndex__IIV(index_0, this$static.java_util_ArrayList_array.length);
  java_util_ArrayList_splice___3Ljava_lang_Object_2IILjava_lang_Object_2V(this$static.java_util_ArrayList_array, index_0, 0, o);
}

function java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static, o){
  com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(this$static.java_util_ArrayList_array, this$static.java_util_ArrayList_array.length, o);
  return true;
}

function java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(this$static, index_0){
  com_google_gwt_core_shared_impl_InternalPreconditions_checkElementIndex__IIV(index_0, this$static.java_util_ArrayList_array.length);
  return this$static.java_util_ArrayList_array[index_0];
}

function java_util_ArrayList_$indexOf__Ljava_util_ArrayList_2Ljava_lang_Object_2II(this$static, o, index_0){
  for (; index_0 < this$static.java_util_ArrayList_array.length; ++index_0) {
    if (java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(o, this$static.java_util_ArrayList_array[index_0])) {
      return index_0;
    }
  }
  return -1;
}

function java_util_ArrayList_$remove__Ljava_util_ArrayList_2ILjava_lang_Object_2(this$static, index_0){
  var previous;
  previous = (com_google_gwt_core_shared_impl_InternalPreconditions_checkElementIndex__IIV(index_0, this$static.java_util_ArrayList_array.length) , this$static.java_util_ArrayList_array[index_0]);
  java_util_ArrayList_splice___3Ljava_lang_Object_2IIV(this$static.java_util_ArrayList_array, index_0, 1);
  return previous;
}

function java_util_ArrayList_$remove__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static, o){
  var i;
  i = java_util_ArrayList_$indexOf__Ljava_util_ArrayList_2Ljava_lang_Object_2II(this$static, o, 0);
  if (i == -1) {
    return false;
  }
  this$static.remove__ILjava_lang_Object_2(i);
  return true;
}

function java_util_ArrayList_$toArray__Ljava_util_ArrayList_2_3Ljava_lang_Object_2_3Ljava_lang_Object_2(this$static, out){
  var i, size_0, com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_result_0;
  size_0 = this$static.java_util_ArrayList_array.length;
  out.length < size_0 && (out = (com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_result_0 = com_google_gwt_lang_Array_initializeArrayElementsWithDefaults__IILjava_lang_Object_2(0, size_0) , com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(java_lang_Object_getClass_1_1Ljava_1lang_1Class_1_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Class_2(out), out.java_lang_Object_castableTypeMap$, out.__elementTypeId$, out.__elementTypeCategory$, com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_result_0) , com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_result_0));
  for (i = 0; i < size_0; ++i) {
    com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(out, i, this$static.java_util_ArrayList_array[i]);
  }
  out.length > size_0 && com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(out, size_0, null);
  return out;
}

function java_util_ArrayList_ArrayList__V(){
  this.java_util_ArrayList_array = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Object_12_1classLit, $intern_14, 1, 0, 3, 1);
}

function java_util_ArrayList_splice___3Ljava_lang_Object_2IIV(array, index_0, deleteCount){
  array.splice(index_0, deleteCount);
}

function java_util_ArrayList_splice___3Ljava_lang_Object_2IILjava_lang_Object_2V(array, index_0, deleteCount, value_0){
  array.splice(index_0, deleteCount, value_0);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(19, 308, $intern_100, java_util_ArrayList_ArrayList__V);
_.add__ILjava_lang_Object_2V = function java_util_ArrayList_add__ILjava_lang_Object_2V(index_0, o){
  java_util_ArrayList_$add__Ljava_util_ArrayList_2ILjava_lang_Object_2V(this, index_0, o);
}
;
_.add__Ljava_lang_Object_2Z = function java_util_ArrayList_add__Ljava_lang_Object_2Z(o){
  return java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this, o);
}
;
_.contains__Ljava_lang_Object_2Z = function java_util_ArrayList_contains__Ljava_lang_Object_2Z(o){
  return java_util_ArrayList_$indexOf__Ljava_util_ArrayList_2Ljava_lang_Object_2II(this, o, 0) != -1;
}
;
_.get__ILjava_lang_Object_2 = function java_util_ArrayList_get__ILjava_lang_Object_2(index_0){
  return java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(this, index_0);
}
;
_.remove__ILjava_lang_Object_2 = function java_util_ArrayList_remove__ILjava_lang_Object_2(index_0){
  return java_util_ArrayList_$remove__Ljava_util_ArrayList_2ILjava_lang_Object_2(this, index_0);
}
;
_.size__I = function java_util_ArrayList_size__I(){
  return this.java_util_ArrayList_array.length;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1ArrayList_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'ArrayList', 19);
function java_util_Arrays_hashCode___3Ljava_lang_Object_2I(a){
  var e, e$index, e$max, hashCode;
  hashCode = 1;
  for (e$index = 0 , e$max = a.length; e$index < e$max; ++e$index) {
    e = a[e$index];
    hashCode = 31 * hashCode + (e != null?java_lang_Object_hashCode_1_1I_1_1devirtual$__Ljava_lang_Object_2I(e):0);
    hashCode = ~~hashCode;
  }
  return hashCode;
}

function java_util_Collections_$clinit__V(){
  java_util_Collections_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  java_util_Collections_EMPTY_1LIST = new java_util_Collections$EmptyList_Collections$EmptyList__V;
}

function java_util_Collections_hashCode__Ljava_lang_Iterable_2I(collection){
  java_util_Collections_$clinit__V();
  var e, e$iterator, hashCode;
  hashCode = 0;
  for (e$iterator = collection.iterator__Ljava_util_Iterator_2(); e$iterator.hasNext__Z();) {
    e = e$iterator.next__Ljava_lang_Object_2();
    hashCode = hashCode + (e != null?java_lang_Object_hashCode_1_1I_1_1devirtual$__Ljava_lang_Object_2I(e):0);
    hashCode = ~~hashCode;
  }
  return hashCode;
}

function java_util_Collections_hashCode__Ljava_util_List_2I(list){
  java_util_Collections_$clinit__V();
  var e, e$iterator, hashCode;
  hashCode = 1;
  for (e$iterator = list.iterator__Ljava_util_Iterator_2(); e$iterator.hasNext__Z();) {
    e = e$iterator.next__Ljava_lang_Object_2();
    hashCode = 31 * hashCode + (e != null?java_lang_Object_hashCode_1_1I_1_1devirtual$__Ljava_lang_Object_2I(e):0);
    hashCode = ~~hashCode;
  }
  return hashCode;
}

var java_util_Collections_EMPTY_1LIST;
function java_util_Collections$EmptyList_Collections$EmptyList__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(168, 308, $intern_100, java_util_Collections$EmptyList_Collections$EmptyList__V);
_.contains__Ljava_lang_Object_2Z = function java_util_Collections$EmptyList_contains__Ljava_lang_Object_2Z(object){
  return false;
}
;
_.get__ILjava_lang_Object_2 = function java_util_Collections$EmptyList_get__ILjava_lang_Object_2(location_0){
  com_google_gwt_core_shared_impl_InternalPreconditions_checkElementIndex__IIV(location_0, 0);
  return null;
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_Collections$EmptyList_iterator__Ljava_util_Iterator_2(){
  return java_util_Collections_$clinit__V() , java_util_Collections$EmptyListIterator_$clinit__V() , java_util_Collections$EmptyListIterator_INSTANCE;
}
;
_.listIterator__Ljava_util_ListIterator_2 = function java_util_Collections$EmptyList_listIterator__Ljava_util_ListIterator_2(){
  return java_util_Collections_$clinit__V() , java_util_Collections$EmptyListIterator_$clinit__V() , java_util_Collections$EmptyListIterator_INSTANCE;
}
;
_.size__I = function java_util_Collections$EmptyList_size__I(){
  return 0;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Collections$EmptyList_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'Collections/EmptyList', 168);
function java_util_Collections$EmptyListIterator_$clinit__V(){
  java_util_Collections$EmptyListIterator_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  java_util_Collections$EmptyListIterator_INSTANCE = new java_util_Collections$EmptyListIterator_Collections$EmptyListIterator__V;
}

function java_util_Collections$EmptyListIterator_Collections$EmptyListIterator__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(169, 1, {}, java_util_Collections$EmptyListIterator_Collections$EmptyListIterator__V);
_.hasNext__Z = function java_util_Collections$EmptyListIterator_hasNext__Z(){
  return false;
}
;
_.hasPrevious__Z = function java_util_Collections$EmptyListIterator_hasPrevious__Z(){
  return false;
}
;
_.next__Ljava_lang_Object_2 = function java_util_Collections$EmptyListIterator_next__Ljava_lang_Object_2(){
  throw new java_util_NoSuchElementException_NoSuchElementException__V;
}
;
_.previous__Ljava_lang_Object_2 = function java_util_Collections$EmptyListIterator_previous__Ljava_lang_Object_2(){
  throw new java_util_NoSuchElementException_NoSuchElementException__V;
}
;
var java_util_Collections$EmptyListIterator_INSTANCE;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Collections$EmptyListIterator_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'Collections/EmptyListIterator', 169);
function java_util_ConcurrentModificationDetector_checkStructuralChange__Ljava_lang_Object_2Ljava_util_Iterator_2V(host, iterator){
  if (iterator._gwt_modCount != host._gwt_modCount) {
    throw new java_util_ConcurrentModificationException_ConcurrentModificationException__V;
  }
}

function java_util_ConcurrentModificationDetector_recordLastKnownStructure__Ljava_lang_Object_2Ljava_util_Iterator_2V(host, iterator){
  java_util_ConcurrentModificationDetector_setModCount__Ljava_lang_Object_2IV(iterator, host._gwt_modCount);
}

function java_util_ConcurrentModificationDetector_setModCount__Ljava_lang_Object_2IV(o, modCount){
  o._gwt_modCount = modCount;
}

function java_util_ConcurrentModificationDetector_structureChanged__Ljava_lang_Object_2V(map_0){
  var modCount;
  modCount = map_0._gwt_modCount | 0;
  java_util_ConcurrentModificationDetector_setModCount__Ljava_lang_Object_2IV(map_0, modCount + 1);
}

function java_util_ConcurrentModificationException_ConcurrentModificationException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(206, 17, $intern_9, java_util_ConcurrentModificationException_ConcurrentModificationException__V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1ConcurrentModificationException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'ConcurrentModificationException', 206);
function java_util_Date_Date__V(){
  this.java_util_Date_jsdate = new Date;
}

function java_util_Date_padTwo__ILjava_lang_String_2(number){
  return number < 10?'0' + number:'' + number;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(92, 1, {3:1, 25:1, 92:1}, java_util_Date_Date__V);
_.equals__Ljava_lang_Object_2Z$ = function java_util_Date_equals__Ljava_lang_Object_2Z(obj){
  return com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(obj, 92) && com_google_gwt_lang_LongLib_eq__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(this.java_util_Date_jsdate.getTime()), com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(obj, 92).java_util_Date_jsdate.getTime()));
}
;
_.hashCode__I$ = function java_util_Date_hashCode__I(){
  var time;
  time = com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(this.java_util_Date_jsdate.getTime());
  return com_google_gwt_lang_LongLib_toInt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(com_google_gwt_lang_LongLib_xor__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(time, com_google_gwt_lang_LongLib_shru__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(time, 32)));
}
;
_.toString__Ljava_lang_String_2$ = function java_util_Date_toString__Ljava_lang_String_2(){
  var hourOffset, minuteOffset, offset;
  offset = -this.java_util_Date_jsdate.getTimezoneOffset();
  hourOffset = (offset >= 0?'+':'') + ~~(offset / 60);
  minuteOffset = (offset < 0?-offset:offset) % 60 < 10?'0' + (offset < 0?-offset:offset) % 60:'' + (offset < 0?-offset:offset) % 60;
  return (java_util_Date$StringData_$clinit__V() , java_util_Date$StringData_DAYS)[this.java_util_Date_jsdate.getDay()] + ' ' + java_util_Date$StringData_MONTHS[this.java_util_Date_jsdate.getMonth()] + ' ' + java_util_Date_padTwo__ILjava_lang_String_2(this.java_util_Date_jsdate.getDate()) + ' ' + java_util_Date_padTwo__ILjava_lang_String_2(this.java_util_Date_jsdate.getHours()) + ':' + java_util_Date_padTwo__ILjava_lang_String_2(this.java_util_Date_jsdate.getMinutes()) + ':' + java_util_Date_padTwo__ILjava_lang_String_2(this.java_util_Date_jsdate.getSeconds()) + ' GMT' + hourOffset + minuteOffset + ' ' + this.java_util_Date_jsdate.getFullYear();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Date_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'Date', 92);
function java_util_Date$StringData_$clinit__V(){
  java_util_Date$StringData_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  java_util_Date$StringData_DAYS = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1String_12_1classLit, 1), $intern_14, 2, 4, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  java_util_Date$StringData_MONTHS = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_Object_2Ljava_lang_Object_2(com_google_gwt_lang_Array_getClassLiteralForArray__Ljava_lang_Class_2ILjava_lang_Class_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1String_12_1classLit, 1), $intern_14, 2, 4, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
}

var java_util_Date$StringData_DAYS, java_util_Date$StringData_MONTHS;
function java_util_EmptyStackException_EmptyStackException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(129, 17, $intern_9, java_util_EmptyStackException_EmptyStackException__V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1EmptyStackException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'EmptyStackException', 129);
function java_util_HashMap_HashMap__V(){
  java_util_AbstractHashMap_$reset__Ljava_util_AbstractHashMap_2V(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(27, 150, {3:1, 68:1}, java_util_HashMap_HashMap__V);
_.package_private$java_util_AbstractHashMap$equals__Ljava_lang_Object_2Ljava_lang_Object_2Z = function java_util_HashMap_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(value1, value2){
  return com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(value1) === com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(value2) || value1 != null && java_lang_Object_equals_1Ljava_1lang_1Object_1_1Z_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(value1, value2);
}
;
_.package_private$java_util_AbstractHashMap$getHashCode__Ljava_lang_Object_2I = function java_util_HashMap_getHashCode__Ljava_lang_Object_2I(key){
  var hashCode;
  hashCode = java_lang_Object_hashCode_1_1I_1_1devirtual$__Ljava_lang_Object_2I(key);
  return ~~hashCode;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1HashMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'HashMap', 27);
function java_util_HashSet_$add__Ljava_util_HashSet_2Ljava_lang_Object_2Z(this$static, o){
  var old;
  old = this$static.java_util_HashSet_map.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(o, this$static);
  return old == null;
}

function java_util_HashSet_$contains__Ljava_util_HashSet_2Ljava_lang_Object_2Z(this$static, o){
  return this$static.java_util_HashSet_map.containsKey__Ljava_lang_Object_2Z(o);
}

function java_util_HashSet_$remove__Ljava_util_HashSet_2Ljava_lang_Object_2Z(this$static, o){
  return this$static.java_util_HashSet_map.remove__Ljava_lang_Object_2Ljava_lang_Object_2(o) != null;
}

function java_util_HashSet_HashSet__V(){
  this.java_util_HashSet_map = new java_util_HashMap_HashMap__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(98, 306, {3:1, 78:1}, java_util_HashSet_HashSet__V);
_.contains__Ljava_lang_Object_2Z = function java_util_HashSet_contains__Ljava_lang_Object_2Z(o){
  return java_util_HashSet_$contains__Ljava_util_HashSet_2Ljava_lang_Object_2Z(this, o);
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_HashSet_iterator__Ljava_util_Iterator_2(){
  return java_util_AbstractMap$1_$iterator__Ljava_util_AbstractMap$1_2Ljava_util_Iterator_2(new java_util_AbstractMap$1_AbstractMap$1__Ljava_util_AbstractMap_2V(this.java_util_HashSet_map));
}
;
_.size__I = function java_util_HashSet_size__I(){
  return this.java_util_HashSet_map.size__I();
}
;
_.toString__Ljava_lang_String_2$ = function java_util_HashSet_toString__Ljava_lang_String_2(){
  return java_util_AbstractCollection_$toString__Ljava_util_AbstractCollection_2Ljava_lang_String_2(new java_util_AbstractMap$1_AbstractMap$1__Ljava_util_AbstractMap_2V(this.java_util_HashSet_map));
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1HashSet_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'HashSet', 98);
function java_util_InternalJsHashCodeMap_$ensureChain__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_String_2_3Ljava_util_Map$Entry_2(this$static, hashCode){
  var map_0 = this$static.java_util_InternalJsHashCodeMap_backingMap;
  return map_0[hashCode] || (map_0[hashCode] = []);
}

function java_util_InternalJsHashCodeMap_$getChain__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_String_2_3Ljava_util_Map$Entry_2(this$static, hashCode){
  return this$static.java_util_InternalJsHashCodeMap_backingMap[hashCode];
}

function java_util_InternalJsHashCodeMap_$getChainOrEmpty__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_String_2_3Ljava_util_Map$Entry_2(this$static, hashCode){
  return this$static.java_util_InternalJsHashCodeMap_backingMap[hashCode] || [];
}

function java_util_InternalJsHashCodeMap_$getEntry__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_util_Map$Entry_2(this$static, key){
  var entry, entry$array, entry$index, entry$max;
  for (entry$array = java_util_InternalJsHashCodeMap_$getChainOrEmpty__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_String_2_3Ljava_util_Map$Entry_2(this$static, key == null?'0':'' + this$static.java_util_InternalJsHashCodeMap_host.package_private$java_util_AbstractHashMap$getHashCode__Ljava_lang_Object_2I(key)) , entry$index = 0 , entry$max = entry$array.length; entry$index < entry$max; ++entry$index) {
    entry = entry$array[entry$index];
    if (this$static.java_util_InternalJsHashCodeMap_host.package_private$java_util_AbstractHashMap$equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(key, entry.getKey__Ljava_lang_Object_2())) {
      return entry;
    }
  }
  return null;
}

function java_util_InternalJsHashCodeMap_$keys__Ljava_util_InternalJsHashCodeMap_2_3Ljava_lang_String_2(this$static){
  return Object.getOwnPropertyNames(this$static.java_util_InternalJsHashCodeMap_backingMap);
}

function java_util_InternalJsHashCodeMap_$put__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key, value_0){
  var chain, entry, entry$index, entry$max;
  chain = java_util_InternalJsHashCodeMap_$ensureChain__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_String_2_3Ljava_util_Map$Entry_2(this$static, key == null?'0':'' + this$static.java_util_InternalJsHashCodeMap_host.package_private$java_util_AbstractHashMap$getHashCode__Ljava_lang_Object_2I(key));
  for (entry$index = 0 , entry$max = chain.length; entry$index < entry$max; ++entry$index) {
    entry = chain[entry$index];
    if (this$static.java_util_InternalJsHashCodeMap_host.package_private$java_util_AbstractHashMap$equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(key, entry.getKey__Ljava_lang_Object_2())) {
      return entry.setValue__Ljava_lang_Object_2Ljava_lang_Object_2(value_0);
    }
  }
  com_google_gwt_lang_Array_setCheck__Ljava_lang_Object_2ILjava_lang_Object_2Ljava_lang_Object_2(chain, chain.length, new java_util_AbstractMap$SimpleEntry_AbstractMap$SimpleEntry__Ljava_lang_Object_2Ljava_lang_Object_2V(key, value_0));
  java_util_AbstractHashMap_$elementAdded__Ljava_util_AbstractHashMap_2V(this$static.java_util_InternalJsHashCodeMap_host);
  return null;
}

function java_util_InternalJsHashCodeMap_$remove__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key){
  var chain, entry, hashCode, i;
  hashCode = key == null?'0':'' + this$static.java_util_InternalJsHashCodeMap_host.package_private$java_util_AbstractHashMap$getHashCode__Ljava_lang_Object_2I(key);
  chain = java_util_InternalJsHashCodeMap_$getChainOrEmpty__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_String_2_3Ljava_util_Map$Entry_2(this$static, hashCode);
  for (i = 0; i < chain.length; i++) {
    entry = chain[i];
    if (this$static.java_util_InternalJsHashCodeMap_host.package_private$java_util_AbstractHashMap$equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(key, entry.getKey__Ljava_lang_Object_2())) {
      chain.length == 1?(delete this$static.java_util_InternalJsHashCodeMap_backingMap[hashCode] , undefined):(chain.splice(i, 1) , undefined);
      java_util_AbstractHashMap_$elementRemoved__Ljava_util_AbstractHashMap_2V(this$static.java_util_InternalJsHashCodeMap_host);
      return entry.getValue__Ljava_lang_Object_2();
    }
  }
  return null;
}

function java_util_InternalJsHashCodeMap_InternalJsHashCodeMap__V(){
  this.java_util_InternalJsHashCodeMap_backingMap = this.package_private$java_util_InternalJsHashCodeMap$createMap__Lcom_google_gwt_core_client_JavaScriptObject_2();
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(123, 1, {}, java_util_InternalJsHashCodeMap_InternalJsHashCodeMap__V);
_.package_private$java_util_InternalJsHashCodeMap$createMap__Lcom_google_gwt_core_client_JavaScriptObject_2 = function java_util_InternalJsHashCodeMap_createMap__Lcom_google_gwt_core_client_JavaScriptObject_2(){
  return Object.create(null);
}
;
_.entries__Ljava_util_Iterator_2 = function java_util_InternalJsHashCodeMap_entries__Ljava_util_Iterator_2(){
  return new java_util_InternalJsHashCodeMap$1_InternalJsHashCodeMap$1__Ljava_util_InternalJsHashCodeMap_2V(this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsHashCodeMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsHashCodeMap', 123);
function java_util_InternalJsHashCodeMap$1_$hasNext__Ljava_util_InternalJsHashCodeMap$1_2Z(this$static){
  if (this$static.java_util_InternalJsHashCodeMap$1_itemIndex < this$static.java_util_InternalJsHashCodeMap$1_chain.length) {
    return true;
  }
  if (this$static.java_util_InternalJsHashCodeMap$1_chainIndex < this$static.java_util_InternalJsHashCodeMap$1_keys.length - 1) {
    this$static.java_util_InternalJsHashCodeMap$1_chain = java_util_InternalJsHashCodeMap_$getChain__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_String_2_3Ljava_util_Map$Entry_2(this$static.java_util_InternalJsHashCodeMap$1_this$01, this$static.java_util_InternalJsHashCodeMap$1_keys[++this$static.java_util_InternalJsHashCodeMap$1_chainIndex]);
    this$static.java_util_InternalJsHashCodeMap$1_itemIndex = 0;
    return true;
  }
  return false;
}

function java_util_InternalJsHashCodeMap$1_InternalJsHashCodeMap$1__Ljava_util_InternalJsHashCodeMap_2V(this$0){
  this.java_util_InternalJsHashCodeMap$1_this$01 = this$0;
  this.java_util_InternalJsHashCodeMap$1_keys = java_util_InternalJsHashCodeMap_$keys__Ljava_util_InternalJsHashCodeMap_2_3Ljava_lang_String_2(this.java_util_InternalJsHashCodeMap$1_this$01);
  this.java_util_InternalJsHashCodeMap$1_chain = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILjava_lang_Object_2(com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Map$Entry_12_1classLit, $intern_14, 18, 0, 0, 1);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(181, 1, {}, java_util_InternalJsHashCodeMap$1_InternalJsHashCodeMap$1__Ljava_util_InternalJsHashCodeMap_2V);
_.hasNext__Z = function java_util_InternalJsHashCodeMap$1_hasNext__Z(){
  return java_util_InternalJsHashCodeMap$1_$hasNext__Ljava_util_InternalJsHashCodeMap$1_2Z(this);
}
;
_.next__Ljava_lang_Object_2 = function java_util_InternalJsHashCodeMap$1_next__Ljava_lang_Object_2(){
  return com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(java_util_InternalJsHashCodeMap$1_$hasNext__Ljava_util_InternalJsHashCodeMap$1_2Z(this)) , this.java_util_InternalJsHashCodeMap$1_lastEntry = this.java_util_InternalJsHashCodeMap$1_chain[this.java_util_InternalJsHashCodeMap$1_itemIndex++] , this.java_util_InternalJsHashCodeMap$1_lastEntry;
}
;
_.java_util_InternalJsHashCodeMap$1_chainIndex = -1;
_.java_util_InternalJsHashCodeMap$1_itemIndex = 0;
_.java_util_InternalJsHashCodeMap$1_lastEntry = null;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsHashCodeMap$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsHashCodeMap/1', 181);
function java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy__V(){
  java_util_InternalJsHashCodeMap_InternalJsHashCodeMap__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(179, 123, {}, java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy__V);
_.package_private$java_util_InternalJsHashCodeMap$createMap__Lcom_google_gwt_core_client_JavaScriptObject_2 = function java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_createMap__Lcom_google_gwt_core_client_JavaScriptObject_2(){
  return {};
}
;
_.entries__Ljava_util_Iterator_2 = function java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_entries__Ljava_util_Iterator_2(){
  var list = this.private$java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$newEntryList__Ljava_util_ArrayList_2();
  var map_0 = this.java_util_InternalJsHashCodeMap_backingMap;
  for (var hashCode in map_0) {
    if (hashCode == parseInt(hashCode, 10)) {
      var array = map_0[hashCode];
      for (var i = 0, c = array.length; i < c; ++i) {
        list.add__Ljava_lang_Object_2Z(array[i]);
      }
    }
  }
  return list.iterator__Ljava_util_Iterator_2();
}
;
_.private$java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$newEntryList__Ljava_util_ArrayList_2 = function java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_newEntryList__Ljava_util_ArrayList_2(){
  return new java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1__Ljava_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_2V(this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsHashCodeMap/InternalJsHashCodeMapLegacy', 179);
function java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1__Ljava_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_2V(this$1){
  this.java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_this$11 = this$1;
  java_util_ArrayList_ArrayList__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(180, 19, $intern_100, java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1__Ljava_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_2V);
_.remove__ILjava_lang_Object_2 = function java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_remove__ILjava_lang_Object_2(index_0){
  var java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_$remove__Ljava_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_2ILjava_util_Map$Entry_2_removed_0;
  return java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_$remove__Ljava_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_2ILjava_util_Map$Entry_2_removed_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_ArrayList_$remove__Ljava_util_ArrayList_2ILjava_lang_Object_2(this, index_0), 18) , java_util_InternalJsHashCodeMap_$remove__Ljava_util_InternalJsHashCodeMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this.java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_this$11, java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_$remove__Ljava_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_2ILjava_util_Map$Entry_2_removed_0.getKey__Ljava_lang_Object_2()) , java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_$remove__Ljava_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_2ILjava_util_Map$Entry_2_removed_0;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsHashCodeMap/InternalJsHashCodeMapLegacy/1', 180);
function java_util_InternalJsMapFactory_InternalJsMapFactory__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(176, 1, {}, java_util_InternalJsMapFactory_InternalJsMapFactory__V);
_.createJsHashCodeMap__Ljava_util_InternalJsHashCodeMap_2 = function java_util_InternalJsMapFactory_createJsHashCodeMap__Ljava_util_InternalJsHashCodeMap_2(){
  return new java_util_InternalJsHashCodeMap_InternalJsHashCodeMap__V;
}
;
_.createJsStringMap__Ljava_util_InternalJsStringMap_2 = function java_util_InternalJsMapFactory_createJsStringMap__Ljava_util_InternalJsStringMap_2(){
  return new java_util_InternalJsStringMap_InternalJsStringMap__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsMapFactory_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsMapFactory', 176);
function java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_$clinit__V(){
  java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_$clinit__V = com_google_gwt_lang_JavaClassHierarchySetupUtil_emptyMethod__V;
  java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_delegate = java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_createFactory__Ljava_util_InternalJsMapFactory_2();
}

function java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_canHandleProto__Z(){
  var protoField = $intern_101;
  var map_0 = Object.create(null);
  if (map_0[protoField] !== undefined) {
    return false;
  }
  var keys_0 = Object.getOwnPropertyNames(map_0);
  if (keys_0.length != 0) {
    return false;
  }
  map_0[protoField] = 42;
  if (map_0[protoField] !== 42) {
    return false;
  }
  return true;
}

function java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_createFactory__Ljava_util_InternalJsMapFactory_2(){
  var java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_needsKeysWorkaround__Z_map_0;
  if (Object.create && Object.getOwnPropertyNames && java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_canHandleProto__Z()) {
    return (java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_needsKeysWorkaround__Z_map_0 = Object.create(null) , java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_needsKeysWorkaround__Z_map_0[$intern_101] = 42 , Object.getOwnPropertyNames(java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_needsKeysWorkaround__Z_map_0).length == 0)?new java_util_InternalJsMapFactory$KeysWorkaroundJsMapFactory_InternalJsMapFactory$KeysWorkaroundJsMapFactory__V:new java_util_InternalJsMapFactory_InternalJsMapFactory__V;
  }
  return new java_util_InternalJsMapFactory$LegacyInternalJsMapFactory_InternalJsMapFactory$LegacyInternalJsMapFactory__V;
}

var java_util_InternalJsMapFactory$BackwardCompatibleJsMapFactory_delegate;
function java_util_InternalJsMapFactory$KeysWorkaroundJsMapFactory_InternalJsMapFactory$KeysWorkaroundJsMapFactory__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(178, 176, {}, java_util_InternalJsMapFactory$KeysWorkaroundJsMapFactory_InternalJsMapFactory$KeysWorkaroundJsMapFactory__V);
_.createJsStringMap__Ljava_util_InternalJsStringMap_2 = function java_util_InternalJsMapFactory$KeysWorkaroundJsMapFactory_createJsStringMap__Ljava_util_InternalJsStringMap_2(){
  return new java_util_InternalJsStringMap$InternalJsStringMapWithKeysWorkaround_InternalJsStringMap$InternalJsStringMapWithKeysWorkaround__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsMapFactory$KeysWorkaroundJsMapFactory_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsMapFactory/KeysWorkaroundJsMapFactory', 178);
function java_util_InternalJsMapFactory$LegacyInternalJsMapFactory_InternalJsMapFactory$LegacyInternalJsMapFactory__V(){
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(177, 176, {}, java_util_InternalJsMapFactory$LegacyInternalJsMapFactory_InternalJsMapFactory$LegacyInternalJsMapFactory__V);
_.createJsHashCodeMap__Ljava_util_InternalJsHashCodeMap_2 = function java_util_InternalJsMapFactory$LegacyInternalJsMapFactory_createJsHashCodeMap__Ljava_util_InternalJsHashCodeMap_2(){
  return new java_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy__V;
}
;
_.createJsStringMap__Ljava_util_InternalJsStringMap_2 = function java_util_InternalJsMapFactory$LegacyInternalJsMapFactory_createJsStringMap__Ljava_util_InternalJsStringMap_2(){
  return new java_util_InternalJsStringMap$InternalJsStringMapLegacy_InternalJsStringMap$InternalJsStringMapLegacy__V;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsMapFactory$LegacyInternalJsMapFactory_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsMapFactory/LegacyInternalJsMapFactory', 177);
function java_util_InternalJsStringMap_$keys__Ljava_util_InternalJsStringMap_2_3Ljava_lang_String_2(this$static){
  return Object.getOwnPropertyNames(this$static.java_util_InternalJsStringMap_backingMap);
}

function java_util_InternalJsStringMap_$put__Ljava_util_InternalJsStringMap_2Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key, value_0){
  var oldValue;
  oldValue = this$static.java_util_InternalJsStringMap_backingMap[key];
  oldValue === undefined && java_util_AbstractHashMap_$elementAdded__Ljava_util_AbstractHashMap_2V(this$static.java_util_InternalJsStringMap_host);
  java_util_InternalJsStringMap_$set__Ljava_util_InternalJsStringMap_2Ljava_lang_String_2Ljava_lang_Object_2V(this$static, key, value_0 === undefined?null:value_0);
  return oldValue;
}

function java_util_InternalJsStringMap_$remove__Ljava_util_InternalJsStringMap_2Ljava_lang_String_2Ljava_lang_Object_2(this$static, key){
  var value_0;
  value_0 = this$static.java_util_InternalJsStringMap_backingMap[key];
  if (!(value_0 === undefined)) {
    delete this$static.java_util_InternalJsStringMap_backingMap[key];
    java_util_AbstractHashMap_$elementRemoved__Ljava_util_AbstractHashMap_2V(this$static.java_util_InternalJsStringMap_host);
  }
  return value_0;
}

function java_util_InternalJsStringMap_$set__Ljava_util_InternalJsStringMap_2Ljava_lang_String_2Ljava_lang_Object_2V(this$static, key, value_0){
  this$static.java_util_InternalJsStringMap_backingMap[key] = value_0;
}

function java_util_InternalJsStringMap_InternalJsStringMap__V(){
  this.java_util_InternalJsStringMap_backingMap = this.package_private$java_util_InternalJsStringMap$createMap__Lcom_google_gwt_core_client_JavaScriptObject_2();
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(97, 1, {}, java_util_InternalJsStringMap_InternalJsStringMap__V);
_.package_private$java_util_InternalJsStringMap$createMap__Lcom_google_gwt_core_client_JavaScriptObject_2 = function java_util_InternalJsStringMap_createMap__Lcom_google_gwt_core_client_JavaScriptObject_2(){
  return Object.create(null);
}
;
_.entries__Ljava_util_Iterator_2 = function java_util_InternalJsStringMap_entries__Ljava_util_Iterator_2(){
  var keys_0;
  keys_0 = this.keys___3Ljava_lang_String_2();
  return new java_util_InternalJsStringMap$1_InternalJsStringMap$1__Ljava_util_InternalJsStringMap_2V(this, keys_0);
}
;
_.get__Ljava_lang_String_2Ljava_lang_Object_2 = function java_util_InternalJsStringMap_get__Ljava_lang_String_2Ljava_lang_Object_2(key){
  return this.java_util_InternalJsStringMap_backingMap[key];
}
;
_.keys___3Ljava_lang_String_2 = function java_util_InternalJsStringMap_keys___3Ljava_lang_String_2(){
  return java_util_InternalJsStringMap_$keys__Ljava_util_InternalJsStringMap_2_3Ljava_lang_String_2(this);
}
;
_.newMapEntry__Ljava_lang_String_2Ljava_util_Map$Entry_2 = function java_util_InternalJsStringMap_newMapEntry__Ljava_lang_String_2Ljava_util_Map$Entry_2(key){
  return new java_util_InternalJsStringMap$2_InternalJsStringMap$2__Ljava_util_InternalJsStringMap_2V(this, key);
}
;
_.put__Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_InternalJsStringMap_put__Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(key, value_0){
  return java_util_InternalJsStringMap_$put__Ljava_util_InternalJsStringMap_2Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(this, key, value_0);
}
;
_.remove__Ljava_lang_String_2Ljava_lang_Object_2 = function java_util_InternalJsStringMap_remove__Ljava_lang_String_2Ljava_lang_Object_2(key){
  return java_util_InternalJsStringMap_$remove__Ljava_util_InternalJsStringMap_2Ljava_lang_String_2Ljava_lang_Object_2(this, key);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsStringMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsStringMap', 97);
function java_util_InternalJsStringMap$1_InternalJsStringMap$1__Ljava_util_InternalJsStringMap_2V(this$0, val$keys){
  this.java_util_InternalJsStringMap$1_this$01 = this$0;
  this.java_util_InternalJsStringMap$1_val$keys2 = val$keys;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(173, 1, {}, java_util_InternalJsStringMap$1_InternalJsStringMap$1__Ljava_util_InternalJsStringMap_2V);
_.hasNext__Z = function java_util_InternalJsStringMap$1_hasNext__Z(){
  return this.java_util_InternalJsStringMap$1_i < this.java_util_InternalJsStringMap$1_val$keys2.length;
}
;
_.next__Ljava_lang_Object_2 = function java_util_InternalJsStringMap$1_next__Ljava_lang_Object_2(){
  return com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(this.java_util_InternalJsStringMap$1_i < this.java_util_InternalJsStringMap$1_val$keys2.length) , new java_util_InternalJsStringMap$2_InternalJsStringMap$2__Ljava_util_InternalJsStringMap_2V(this.java_util_InternalJsStringMap$1_this$01, this.java_util_InternalJsStringMap$1_val$keys2[this.java_util_InternalJsStringMap$1_i++]);
}
;
_.java_util_InternalJsStringMap$1_i = 0;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsStringMap$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsStringMap/1', 173);
function java_util_InternalJsStringMap$2_InternalJsStringMap$2__Ljava_util_InternalJsStringMap_2V(this$0, val$key){
  this.java_util_InternalJsStringMap$2_this$01 = this$0;
  this.java_util_InternalJsStringMap$2_val$key2 = val$key;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(122, 309, $intern_99, java_util_InternalJsStringMap$2_InternalJsStringMap$2__Ljava_util_InternalJsStringMap_2V);
_.getKey__Ljava_lang_Object_2 = function java_util_InternalJsStringMap$2_getKey__Ljava_lang_Object_2(){
  return this.java_util_InternalJsStringMap$2_val$key2;
}
;
_.getValue__Ljava_lang_Object_2 = function java_util_InternalJsStringMap$2_getValue__Ljava_lang_Object_2(){
  return this.java_util_InternalJsStringMap$2_this$01.get__Ljava_lang_String_2Ljava_lang_Object_2(this.java_util_InternalJsStringMap$2_val$key2);
}
;
_.setValue__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_InternalJsStringMap$2_setValue__Ljava_lang_Object_2Ljava_lang_Object_2(object){
  return this.java_util_InternalJsStringMap$2_this$01.put__Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(this.java_util_InternalJsStringMap$2_val$key2, object);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsStringMap$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsStringMap/2', 122);
function java_util_InternalJsStringMap$InternalJsStringMapLegacy_InternalJsStringMap$InternalJsStringMapLegacy__V(){
  java_util_InternalJsStringMap_InternalJsStringMap__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(170, 97, {}, java_util_InternalJsStringMap$InternalJsStringMapLegacy_InternalJsStringMap$InternalJsStringMapLegacy__V);
_.package_private$java_util_InternalJsStringMap$createMap__Lcom_google_gwt_core_client_JavaScriptObject_2 = function java_util_InternalJsStringMap$InternalJsStringMapLegacy_createMap__Lcom_google_gwt_core_client_JavaScriptObject_2(){
  return {};
}
;
_.entries__Ljava_util_Iterator_2 = function java_util_InternalJsStringMap$InternalJsStringMapLegacy_entries__Ljava_util_Iterator_2(){
  var list = this.private$java_util_InternalJsStringMap$InternalJsStringMapLegacy$newEntryList__Ljava_util_ArrayList_2();
  for (var key in this.java_util_InternalJsStringMap_backingMap) {
    if (key.charCodeAt(0) == 58) {
      var entry = this.newMapEntry__Ljava_lang_String_2Ljava_util_Map$Entry_2(key.substring(1));
      list.add__Ljava_lang_Object_2Z(entry);
    }
  }
  return list.iterator__Ljava_util_Iterator_2();
}
;
_.get__Ljava_lang_String_2Ljava_lang_Object_2 = function java_util_InternalJsStringMap$InternalJsStringMapLegacy_get__Ljava_lang_String_2Ljava_lang_Object_2(key){
  return this.java_util_InternalJsStringMap_backingMap[':' + key];
}
;
_.private$java_util_InternalJsStringMap$InternalJsStringMapLegacy$newEntryList__Ljava_util_ArrayList_2 = function java_util_InternalJsStringMap$InternalJsStringMapLegacy_newEntryList__Ljava_util_ArrayList_2(){
  return new java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_InternalJsStringMap$InternalJsStringMapLegacy$1__Ljava_util_InternalJsStringMap$InternalJsStringMapLegacy_2V(this);
}
;
_.put__Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_InternalJsStringMap$InternalJsStringMapLegacy_put__Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(key, value_0){
  return java_util_InternalJsStringMap_$put__Ljava_util_InternalJsStringMap_2Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(this, ':' + key, value_0);
}
;
_.remove__Ljava_lang_String_2Ljava_lang_Object_2 = function java_util_InternalJsStringMap$InternalJsStringMapLegacy_remove__Ljava_lang_String_2Ljava_lang_Object_2(key){
  return java_util_InternalJsStringMap_$remove__Ljava_util_InternalJsStringMap_2Ljava_lang_String_2Ljava_lang_Object_2(this, ':' + key);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsStringMap$InternalJsStringMapLegacy_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsStringMap/InternalJsStringMapLegacy', 170);
function java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_InternalJsStringMap$InternalJsStringMapLegacy$1__Ljava_util_InternalJsStringMap$InternalJsStringMapLegacy_2V(this$1){
  this.java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_this$11 = this$1;
  java_util_ArrayList_ArrayList__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(172, 19, $intern_100, java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_InternalJsStringMap$InternalJsStringMapLegacy$1__Ljava_util_InternalJsStringMap$InternalJsStringMapLegacy_2V);
_.remove__ILjava_lang_Object_2 = function java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_remove__ILjava_lang_Object_2(index_0){
  var java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_$remove__Ljava_util_InternalJsStringMap$InternalJsStringMapLegacy$1_2ILjava_util_Map$Entry_2_removed_0;
  return java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_$remove__Ljava_util_InternalJsStringMap$InternalJsStringMapLegacy$1_2ILjava_util_Map$Entry_2_removed_0 = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(java_util_ArrayList_$remove__Ljava_util_ArrayList_2ILjava_lang_Object_2(this, index_0), 18) , java_util_InternalJsStringMap_$remove__Ljava_util_InternalJsStringMap_2Ljava_lang_String_2Ljava_lang_Object_2(this.java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_this$11, ':' + com_google_gwt_lang_Cast_dynamicCastToString__Ljava_lang_Object_2Ljava_lang_Object_2(java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_$remove__Ljava_util_InternalJsStringMap$InternalJsStringMapLegacy$1_2ILjava_util_Map$Entry_2_removed_0.getKey__Ljava_lang_Object_2())) , java_util_InternalJsStringMap$InternalJsStringMapLegacy$1_$remove__Ljava_util_InternalJsStringMap$InternalJsStringMapLegacy$1_2ILjava_util_Map$Entry_2_removed_0;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsStringMap$InternalJsStringMapLegacy$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsStringMap/InternalJsStringMapLegacy/1', 172);
function java_util_InternalJsStringMap$InternalJsStringMapWithKeysWorkaround_InternalJsStringMap$InternalJsStringMapWithKeysWorkaround__V(){
  java_util_InternalJsStringMap_InternalJsStringMap__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(171, 97, {}, java_util_InternalJsStringMap$InternalJsStringMapWithKeysWorkaround_InternalJsStringMap$InternalJsStringMapWithKeysWorkaround__V);
_.keys___3Ljava_lang_String_2 = function java_util_InternalJsStringMap$InternalJsStringMapWithKeysWorkaround_keys___3Ljava_lang_String_2(){
  var keys_0;
  keys_0 = java_util_InternalJsStringMap_$keys__Ljava_util_InternalJsStringMap_2_3Ljava_lang_String_2(this);
  !(this.java_util_InternalJsStringMap_backingMap[$intern_101] === undefined) && (keys_0[keys_0.length] = $intern_101);
  return keys_0;
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1InternalJsStringMap$InternalJsStringMapWithKeysWorkaround_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'InternalJsStringMap/InternalJsStringMapWithKeysWorkaround', 171);
function java_util_LinkedHashMap_$containsValue__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Z(this$static, value_0){
  var node;
  node = this$static.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_next;
  while (node != this$static.java_util_LinkedHashMap_head) {
    if (java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(node.java_util_AbstractMap$AbstractEntry_value, value_0)) {
      return true;
    }
    node = node.java_util_LinkedHashMap$ChainEntry_next;
  }
  return false;
}

function java_util_LinkedHashMap_$get__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key){
  var entry;
  entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this$static.java_util_LinkedHashMap_map.get__Ljava_lang_Object_2Ljava_lang_Object_2(key), 59);
  if (entry) {
    java_util_LinkedHashMap_$recordAccess__Ljava_util_LinkedHashMap_2Ljava_util_LinkedHashMap$ChainEntry_2V(this$static, entry);
    return entry.java_util_AbstractMap$AbstractEntry_value;
  }
  return null;
}

function java_util_LinkedHashMap_$put__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key, value_0){
  var newEntry, old, oldValue;
  old = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this$static.java_util_LinkedHashMap_map.get__Ljava_lang_Object_2Ljava_lang_Object_2(key), 59);
  if (!old) {
    newEntry = new java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2V(this$static, key, value_0);
    this$static.java_util_LinkedHashMap_map.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(key, newEntry);
    java_util_LinkedHashMap$ChainEntry_$addToEnd__Ljava_util_LinkedHashMap$ChainEntry_2V(newEntry);
    return null;
  }
   else {
    oldValue = java_util_AbstractMap$AbstractEntry_$setValue__Ljava_util_AbstractMap$AbstractEntry_2Ljava_lang_Object_2Ljava_lang_Object_2(old, value_0);
    java_util_LinkedHashMap_$recordAccess__Ljava_util_LinkedHashMap_2Ljava_util_LinkedHashMap$ChainEntry_2V(this$static, old);
    return oldValue;
  }
}

function java_util_LinkedHashMap_$recordAccess__Ljava_util_LinkedHashMap_2Ljava_util_LinkedHashMap$ChainEntry_2V(this$static, entry){
  if (this$static.java_util_LinkedHashMap_accessOrder) {
    java_util_LinkedHashMap$ChainEntry_$remove__Ljava_util_LinkedHashMap$ChainEntry_2V(entry);
    java_util_LinkedHashMap$ChainEntry_$addToEnd__Ljava_util_LinkedHashMap$ChainEntry_2V(entry);
  }
}

function java_util_LinkedHashMap_$remove__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key){
  var entry;
  entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(this$static.java_util_LinkedHashMap_map.remove__Ljava_lang_Object_2Ljava_lang_Object_2(key), 59);
  if (entry) {
    java_util_LinkedHashMap$ChainEntry_$remove__Ljava_util_LinkedHashMap$ChainEntry_2V(entry);
    return entry.java_util_AbstractMap$AbstractEntry_value;
  }
  return null;
}

function java_util_LinkedHashMap_LinkedHashMap__V(){
  java_util_HashMap_HashMap__V.call(this);
  this.java_util_LinkedHashMap_head = new java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2V(this);
  this.java_util_LinkedHashMap_map = new java_util_HashMap_HashMap__V;
  this.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_prev = this.java_util_LinkedHashMap_head;
  this.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_next = this.java_util_LinkedHashMap_head;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(86, 27, {3:1, 68:1}, java_util_LinkedHashMap_LinkedHashMap__V);
_.clear__V = function java_util_LinkedHashMap_clear__V(){
  this.java_util_LinkedHashMap_map.clear__V();
  this.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_prev = this.java_util_LinkedHashMap_head;
  this.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_next = this.java_util_LinkedHashMap_head;
}
;
_.containsKey__Ljava_lang_Object_2Z = function java_util_LinkedHashMap_containsKey__Ljava_lang_Object_2Z(key){
  return this.java_util_LinkedHashMap_map.containsKey__Ljava_lang_Object_2Z(key);
}
;
_.entrySet__Ljava_util_Set_2 = function java_util_LinkedHashMap_entrySet__Ljava_util_Set_2(){
  return new java_util_LinkedHashMap$EntrySet_LinkedHashMap$EntrySet__Ljava_util_LinkedHashMap_2V(this);
}
;
_.get__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_LinkedHashMap_get__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  return java_util_LinkedHashMap_$get__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this, key);
}
;
_.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_LinkedHashMap_put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(key, value_0){
  return java_util_LinkedHashMap_$put__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this, key, value_0);
}
;
_.remove__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_LinkedHashMap_remove__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  return java_util_LinkedHashMap_$remove__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this, key);
}
;
_.size__I = function java_util_LinkedHashMap_size__I(){
  return this.java_util_LinkedHashMap_map.size__I();
}
;
_.java_util_LinkedHashMap_accessOrder = false;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'LinkedHashMap', 86);
function java_util_LinkedHashMap$ChainEntry_$addToEnd__Ljava_util_LinkedHashMap$ChainEntry_2V(this$static){
  var tail;
  tail = this$static.java_util_LinkedHashMap$ChainEntry_this$01.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_prev;
  this$static.java_util_LinkedHashMap$ChainEntry_prev = tail;
  this$static.java_util_LinkedHashMap$ChainEntry_next = this$static.java_util_LinkedHashMap$ChainEntry_this$01.java_util_LinkedHashMap_head;
  tail.java_util_LinkedHashMap$ChainEntry_next = this$static.java_util_LinkedHashMap$ChainEntry_this$01.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_prev = this$static;
}

function java_util_LinkedHashMap$ChainEntry_$remove__Ljava_util_LinkedHashMap$ChainEntry_2V(this$static){
  this$static.java_util_LinkedHashMap$ChainEntry_next.java_util_LinkedHashMap$ChainEntry_prev = this$static.java_util_LinkedHashMap$ChainEntry_prev;
  this$static.java_util_LinkedHashMap$ChainEntry_prev.java_util_LinkedHashMap$ChainEntry_next = this$static.java_util_LinkedHashMap$ChainEntry_next;
  this$static.java_util_LinkedHashMap$ChainEntry_next = this$static.java_util_LinkedHashMap$ChainEntry_prev = null;
}

function java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2V(this$0){
  java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2V.call(this, this$0, null, null);
}

function java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2V(this$0, key, value_0){
  this.java_util_LinkedHashMap$ChainEntry_this$01 = this$0;
  java_util_AbstractMap$SimpleEntry_AbstractMap$SimpleEntry__Ljava_lang_Object_2Ljava_lang_Object_2V.call(this, key, value_0);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(59, 116, {59:1, 18:1}, java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2V, java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap$ChainEntry_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'LinkedHashMap/ChainEntry', 59);
function java_util_LinkedHashMap$EntrySet_$contains__Ljava_util_LinkedHashMap$EntrySet_2Ljava_lang_Object_2Z(this$static, o){
  if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Z(o, 18)) {
    return java_util_AbstractMap_$containsEntry__Ljava_util_AbstractMap_2Ljava_util_Map$Entry_2Z(this$static.java_util_LinkedHashMap$EntrySet_this$01, com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Object_2(o, 18));
  }
  return false;
}

function java_util_LinkedHashMap$EntrySet_LinkedHashMap$EntrySet__Ljava_util_LinkedHashMap_2V(this$0){
  this.java_util_LinkedHashMap$EntrySet_this$01 = this$0;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(131, 306, $intern_98, java_util_LinkedHashMap$EntrySet_LinkedHashMap$EntrySet__Ljava_util_LinkedHashMap_2V);
_.contains__Ljava_lang_Object_2Z = function java_util_LinkedHashMap$EntrySet_contains__Ljava_lang_Object_2Z(o){
  return java_util_LinkedHashMap$EntrySet_$contains__Ljava_util_LinkedHashMap$EntrySet_2Ljava_lang_Object_2Z(this, o);
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_LinkedHashMap$EntrySet_iterator__Ljava_util_Iterator_2(){
  return new java_util_LinkedHashMap$EntrySet$EntryIterator_LinkedHashMap$EntrySet$EntryIterator__Ljava_util_LinkedHashMap$EntrySet_2V(this);
}
;
_.size__I = function java_util_LinkedHashMap$EntrySet_size__I(){
  return this.java_util_LinkedHashMap$EntrySet_this$01.java_util_LinkedHashMap_map.size__I();
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap$EntrySet_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'LinkedHashMap/EntrySet', 131);
function java_util_LinkedHashMap$EntrySet$EntryIterator_$hasNext__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Z(this$static){
  return this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next != this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_this$11.java_util_LinkedHashMap$EntrySet_this$01.java_util_LinkedHashMap_head;
}

function java_util_LinkedHashMap$EntrySet$EntryIterator_$next__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Ljava_lang_Object_2(this$static){
  return java_util_ConcurrentModificationDetector_checkStructuralChange__Ljava_lang_Object_2Ljava_util_Iterator_2V(this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_this$11.java_util_LinkedHashMap$EntrySet_this$01.java_util_LinkedHashMap_map, this$static) , com_google_gwt_core_shared_impl_InternalPreconditions_checkCriticalElement__ZV(this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next != this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_this$11.java_util_LinkedHashMap$EntrySet_this$01.java_util_LinkedHashMap_head) , this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_last = this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next , this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next = this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next.java_util_LinkedHashMap$ChainEntry_next , this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_last;
}

function java_util_LinkedHashMap$EntrySet$EntryIterator_LinkedHashMap$EntrySet$EntryIterator__Ljava_util_LinkedHashMap$EntrySet_2V(this$1){
  this.java_util_LinkedHashMap$EntrySet$EntryIterator_this$11 = this$1;
  this.java_util_LinkedHashMap$EntrySet$EntryIterator_next = this$1.java_util_LinkedHashMap$EntrySet_this$01.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_next;
  java_util_ConcurrentModificationDetector_recordLastKnownStructure__Ljava_lang_Object_2Ljava_util_Iterator_2V(this$1.java_util_LinkedHashMap$EntrySet_this$01.java_util_LinkedHashMap_map, this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(132, 1, {}, java_util_LinkedHashMap$EntrySet$EntryIterator_LinkedHashMap$EntrySet$EntryIterator__Ljava_util_LinkedHashMap$EntrySet_2V);
_.hasNext__Z = function java_util_LinkedHashMap$EntrySet$EntryIterator_hasNext__Z(){
  return java_util_LinkedHashMap$EntrySet$EntryIterator_$hasNext__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Z(this);
}
;
_.next__Ljava_lang_Object_2 = function java_util_LinkedHashMap$EntrySet$EntryIterator_next__Ljava_lang_Object_2(){
  return java_util_LinkedHashMap$EntrySet$EntryIterator_$next__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Ljava_lang_Object_2(this);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap$EntrySet$EntryIterator_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'LinkedHashMap/EntrySet/EntryIterator', 132);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Map$Entry_12_1classLit = java_lang_Class_createForInterface__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2($intern_97, 'Map/Entry');
function java_util_NoSuchElementException_NoSuchElementException__V(){
  java_lang_RuntimeException_RuntimeException__V.call(this);
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(57, 17, $intern_9, java_util_NoSuchElementException_NoSuchElementException__V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1NoSuchElementException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'NoSuchElementException', 57);
function java_util_Objects_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(a, b){
  return com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(a) === com_google_gwt_lang_Cast_maskUndefined__Ljava_lang_Object_2Ljava_lang_Object_2(b) || a != null && java_lang_Object_equals_1Ljava_1lang_1Object_1_1Z_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(a, b);
}

function java_util_Objects_hashCode__Ljava_lang_Object_2I(o){
  return o != null?java_lang_Object_hashCode_1_1I_1_1devirtual$__Ljava_lang_Object_2I(o):0;
}

function java_util_Vector_checkArrayElementIndex__IIV(index_0, size_0){
  if (index_0 < 0 || index_0 >= size_0) {
    throw new java_lang_ArrayIndexOutOfBoundsException_ArrayIndexOutOfBoundsException__V;
  }
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(224, 308, $intern_100);
_.add__ILjava_lang_Object_2V = function java_util_Vector_add__ILjava_lang_Object_2V(index_0, o){
  java_util_Vector_checkArrayElementIndex__IIV(index_0, this.java_util_Vector_arrayList.java_util_ArrayList_array.length + 1);
  java_util_ArrayList_$add__Ljava_util_ArrayList_2ILjava_lang_Object_2V(this.java_util_Vector_arrayList, index_0, o);
}
;
_.add__Ljava_lang_Object_2Z = function java_util_Vector_add__Ljava_lang_Object_2Z(o){
  return java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this.java_util_Vector_arrayList, o);
}
;
_.contains__Ljava_lang_Object_2Z = function java_util_Vector_contains__Ljava_lang_Object_2Z(elem){
  return java_util_ArrayList_$indexOf__Ljava_util_ArrayList_2Ljava_lang_Object_2II(this.java_util_Vector_arrayList, elem, 0) != -1;
}
;
_.get__ILjava_lang_Object_2 = function java_util_Vector_get__ILjava_lang_Object_2(index_0){
  return java_util_Vector_checkArrayElementIndex__IIV(index_0, this.java_util_Vector_arrayList.java_util_ArrayList_array.length) , java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(this.java_util_Vector_arrayList, index_0);
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_Vector_iterator__Ljava_util_Iterator_2(){
  return new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this.java_util_Vector_arrayList);
}
;
_.size__I = function java_util_Vector_size__I(){
  return this.java_util_Vector_arrayList.java_util_ArrayList_array.length;
}
;
_.toString__Ljava_lang_String_2$ = function java_util_Vector_toString__Ljava_lang_String_2(){
  return java_util_AbstractCollection_$toString__Ljava_util_AbstractCollection_2Ljava_lang_String_2(this.java_util_Vector_arrayList);
}
;
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Vector_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'Vector', 224);
function java_util_Stack_$peek__Ljava_util_Stack_2Ljava_lang_Object_2(this$static){
  var sz;
  sz = this$static.java_util_Vector_arrayList.java_util_ArrayList_array.length;
  if (sz > 0) {
    return java_util_Vector_checkArrayElementIndex__IIV(sz - 1, this$static.java_util_Vector_arrayList.java_util_ArrayList_array.length) , java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(this$static.java_util_Vector_arrayList, sz - 1);
  }
   else {
    throw new java_util_EmptyStackException_EmptyStackException__V;
  }
}

function java_util_Stack_$pop__Ljava_util_Stack_2Ljava_lang_Object_2(this$static){
  var sz;
  sz = this$static.java_util_Vector_arrayList.java_util_ArrayList_array.length;
  if (sz > 0) {
    return java_util_Vector_checkArrayElementIndex__IIV(sz - 1, this$static.java_util_Vector_arrayList.java_util_ArrayList_array.length) , this$static.java_util_Vector_arrayList.remove__ILjava_lang_Object_2(sz - 1);
  }
   else {
    throw new java_util_EmptyStackException_EmptyStackException__V;
  }
}

function java_util_Stack_$push__Ljava_util_Stack_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, o){
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static.java_util_Vector_arrayList, o);
  return o;
}

function java_util_Stack_Stack__V(){
  this.java_util_Vector_arrayList = new java_util_ArrayList_ArrayList__V;
}

com_google_gwt_lang_JavaClassHierarchySetupUtil_defineClass__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(225, 224, $intern_100, java_util_Stack_Stack__V);
var com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Stack_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_97, 'Stack', 225);
var com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1lang_1CollapsedPropertyHolder_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_102, 'CollapsedPropertyHolder', 293), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1lang_1JavaClassHierarchySetupUtil_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_102, 'JavaClassHierarchySetupUtil', 295), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1lang_1LongLibBase$LongEmul_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_102, 'LongLibBase/LongEmul', null), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1lang_1ModuleUtils_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_102, 'ModuleUtils', 298), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Map$Entry_12_1classLit = java_lang_Class_createForInterface__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2($intern_97, 'Map/Entry');
var $entry = com_google_gwt_lang_ModuleUtils_registerEntry__Lcom_google_gwt_core_client_JavaScriptObject_2();
var gwtOnLoad = gwtOnLoad = com_google_gwt_lang_ModuleUtils_gwtOnLoad__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2V;
com_google_gwt_lang_ModuleUtils_addInitFunctions__V(com_google_gwt_lang_com_100046sensia_100046swetools_100046editors_100046sensorml_100046SensorMLEditor_1_1EntryMethodHolder_init__V);
com_google_gwt_lang_ModuleUtils_setGwtProperty__Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2V('permProps', [[['locale', 'default'], ['user.agent', $intern_55]]]);
$sendStats('moduleStartup', 'moduleEvalEnd');
gwtOnLoad(__gwtModuleFunction.__errFn, __gwtModuleFunction.__moduleName, __gwtModuleFunction.__moduleBase, __gwtModuleFunction.__softPermutationId,__gwtModuleFunction.__computePropValue);
$sendStats('moduleStartup', 'end');
$gwt && $gwt.permProps && __gwtModuleFunction.__moduleStartupDone($gwt.permProps);
//# sourceURL=sml_editor-0.js

