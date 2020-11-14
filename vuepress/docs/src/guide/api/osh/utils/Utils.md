---
title: Utils
---

# Utils

<a name="module_Utils"></a>

## Utils

* [Utils](#module_Utils)
    * [.MAX_LONG](#module_Utils.MAX_LONG)
    * [.isDefined()](#module_Utils.isDefined)
    * [.hasValue()](#module_Utils.hasValue)
    * [.hasType()](#module_Utils.hasType)
    * [.isObject()](#module_Utils.isObject)
    * [.isArray()](#module_Utils.isArray)
    * [.isFunction()](#module_Utils.isFunction)
    * [.assertDefined()](#module_Utils.assertDefined)
    * [.assertType()](#module_Utils.assertType)
    * [.assertBoolean()](#module_Utils.assertBoolean)
    * [.assertString()](#module_Utils.assertString)
    * [.assertNumber()](#module_Utils.assertNumber)
    * [.assertPositive()](#module_Utils.assertPositive)
    * [.assertObject()](#module_Utils.assertObject)
    * [.assertArray()](#module_Utils.assertArray)
    * [.assertFunction()](#module_Utils.assertFunction)
    * [.assertHasValue()](#module_Utils.assertHasValue)
    * [.randomUUID()](#module_Utils.randomUUID) ⇒ <code>String</code>
    * [.stampUUID()](#module_Utils.stampUUID) ⇒ <code>String</code>
    * [.ParseBytes(buffer, offset, type)](#module_Utils.ParseBytes) ⇒ <code>\*</code>
    * [.ReadData(struct, data, offsetBytes)](#module_Utils.ReadData) ⇒ <code>\*</code>
    * [.GetResultObject(resultStructure)](#module_Utils.GetResultObject) ⇒ <code>Object</code>
    * [.isOpera()](#module_Utils.isOpera) ⇒ <code>boolean</code>
    * [.isFirefox()](#module_Utils.isFirefox) ⇒ <code>boolean</code>
    * [.isSafari()](#module_Utils.isSafari) ⇒ <code>boolean</code>
    * [.isChrome()](#module_Utils.isChrome) ⇒ <code>boolean</code>
    * [.isBlink()](#module_Utils.isBlink) ⇒ <code>\*</code> \| <code>boolean</code>
    * [.isArrayIntersect(a, b)](#module_Utils.isArrayIntersect) ⇒ <code>boolean</code>
    * [.isElement(o)](#module_Utils.isElement) ⇒ <code>boolean</code>
    * [.isWebWorker()](#module_Utils.isWebWorker) ⇒ <code>\*</code>
    * [.takeScreenShot(div)](#module_Utils.takeScreenShot)
    * [.removeCss(div, css)](#module_Utils.removeCss)
    * [.addCss(div, css)](#module_Utils.addCss)
    * [.removeLastCharIfExist(value)](#module_Utils.removeLastCharIfExist) ⇒ <code>string</code>

<a name="module_Utils.MAX_LONG"></a>

### Utils.MAX\_LONG
Maximum value of a long

**Kind**: static constant of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.isDefined"></a>

### Utils.isDefined()
Global helper method to test if a letiable or object attribute is defined

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.hasValue"></a>

### Utils.hasValue()
Global helper method to test if a letiable or object attribute has a value,
 that is it is defined and non null

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.hasType"></a>

### Utils.hasType()
Global helper method to test if a letiable or object attribute is of a particular type

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.isObject"></a>

### Utils.isObject()
Global helper method to test if a letiable or object attribute is an object

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.isArray"></a>

### Utils.isArray()
Global helper method to test if a letiable or object attribute is an array

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.isFunction"></a>

### Utils.isFunction()
Global helper method to test if a letiable or object attribute is a function

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertDefined"></a>

### Utils.assertDefined()
Assert that a letiable or object attribute is defined

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertType"></a>

### Utils.assertType()
Assert that a letiable or object attribute is defined and non-null

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertBoolean"></a>

### Utils.assertBoolean()
Assert that a letiable or object attribute is a string

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertString"></a>

### Utils.assertString()
Assert that a letiable or object attribute is a string

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertNumber"></a>

### Utils.assertNumber()
Assert that a letiable or object attribute is a number

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertPositive"></a>

### Utils.assertPositive()
Assert that a letiable or object attribute is a number

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertObject"></a>

### Utils.assertObject()
Assert that a letiable or object attribute is an object

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertArray"></a>

### Utils.assertArray()
Assert that a letiable or object attribute is an object

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertFunction"></a>

### Utils.assertFunction()
Assert that a letiable or object attribute is a function

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.assertHasValue"></a>

### Utils.assertHasValue()
Assert that a letiable or object attribute is defined and non-null

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.randomUUID"></a>

### Utils.randomUUID() ⇒ <code>String</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.stampUUID"></a>

### Utils.stampUUID() ⇒ <code>String</code>
This function stamps/embeds a UUID into an object and returns the UUID generated for it

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.ParseBytes"></a>

### Utils.ParseBytes(buffer, offset, type) ⇒ <code>\*</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  

| Param |
| --- |
| buffer | 
| offset | 
| type | 

<a name="module_Utils.ReadData"></a>

### Utils.ReadData(struct, data, offsetBytes) ⇒ <code>\*</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  

| Param |
| --- |
| struct | 
| data | 
| offsetBytes | 

<a name="module_Utils.GetResultObject"></a>

### Utils.GetResultObject(resultStructure) ⇒ <code>Object</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  

| Param |
| --- |
| resultStructure | 

<a name="module_Utils.isOpera"></a>

### Utils.isOpera() ⇒ <code>boolean</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.isFirefox"></a>

### Utils.isFirefox() ⇒ <code>boolean</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.isSafari"></a>

### Utils.isSafari() ⇒ <code>boolean</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.isChrome"></a>

### Utils.isChrome() ⇒ <code>boolean</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.isBlink"></a>

### Utils.isBlink() ⇒ <code>\*</code> \| <code>boolean</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.isArrayIntersect"></a>

### Utils.isArrayIntersect(a, b) ⇒ <code>boolean</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  

| Param |
| --- |
| a | 
| b | 

<a name="module_Utils.isElement"></a>

### Utils.isElement(o) ⇒ <code>boolean</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  

| Param |
| --- |
| o | 

<a name="module_Utils.isWebWorker"></a>

### Utils.isWebWorker() ⇒ <code>\*</code>
**Kind**: static method of [<code>Utils</code>](#module_Utils)  
<a name="module_Utils.takeScreenShot"></a>

### Utils.takeScreenShot(div)
**Kind**: static method of [<code>Utils</code>](#module_Utils)  

| Param |
| --- |
| div | 

<a name="module_Utils.removeCss"></a>

### Utils.removeCss(div, css)
Remove a css class from a the div given as argument.

**Kind**: static method of [<code>Utils</code>](#module_Utils)  

| Param | Description |
| --- | --- |
| div | the div to remove the class from |
| css | the css class to remove |

<a name="module_Utils.addCss"></a>

### Utils.addCss(div, css)
Add a css class to a the div given as argument.

**Kind**: static method of [<code>Utils</code>](#module_Utils)  

| Param | Description |
| --- | --- |
| div | the div to add the class to |
| css | the css class to add |

<a name="module_Utils.removeLastCharIfExist"></a>

### Utils.removeLastCharIfExist(value) ⇒ <code>string</code>
Removes the last character of a {string} object.

**Kind**: static method of [<code>Utils</code>](#module_Utils)  
**Returns**: <code>string</code> - The value without the last character  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The input {string} |

