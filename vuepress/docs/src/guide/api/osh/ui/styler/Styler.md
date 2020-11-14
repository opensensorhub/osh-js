---
title: Styler
---

# Styler

<a name="Styler"></a>

## Styler
This class is in charge of defining a Styler object.

**Kind**: global class  

* [Styler](#Styler)
    * [new Styler(jsonProperties)](#new_Styler_new)
    * [.clear()](#Styler+clear)
    * [.getId()](#Styler+getId) ⇒ <code>String</code>
    * [.select(dataSourceIds)](#Styler+select)
    * [.addFn(dataSourceIds, fn)](#Styler+addFn)
    * [.setData(dataSourceId, rec, view, options)](#Styler+setData) ⇒ <code>Boolean</code>
    * [.getDataSourcesIds()](#Styler+getDataSourcesIds) ⇒ <code>Array.&lt;String&gt;</code>
    * [.init()](#Styler+init)

<a name="new_Styler_new"></a>

### new Styler(jsonProperties)

| Param | Type | Description |
| --- | --- | --- |
| jsonProperties | <code>Array.&lt;Object&gt;</code> | contains a list of Functions |

<a name="Styler+clear"></a>

### styler.clear()
Clear the styler.

**Kind**: instance method of [<code>Styler</code>](#Styler)  
<a name="Styler+getId"></a>

### styler.getId() ⇒ <code>String</code>
Gets the styler id.

**Kind**: instance method of [<code>Styler</code>](#Styler)  
**Returns**: <code>String</code> - the styler id  
<a name="Styler+select"></a>

### styler.select(dataSourceIds)
Selects the datasource contained into the list

**Kind**: instance method of [<code>Styler</code>](#Styler)  

| Param | Type | Description |
| --- | --- | --- |
| dataSourceIds | <code>Array</code> | the list of datasources |

<a name="Styler+addFn"></a>

### styler.addFn(dataSourceIds, fn)
Adds a function associated to a list of dataSource ids

**Kind**: instance method of [<code>Styler</code>](#Styler)  

| Param | Type | Description |
| --- | --- | --- |
| dataSourceIds | <code>Array.&lt;String&gt;</code> | the list of datasources |
| fn | <code>function</code> | the function to add |

<a name="Styler+setData"></a>

### styler.setData(dataSourceId, rec, view, options) ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>Styler</code>](#Styler)  

| Param |
| --- |
| dataSourceId | 
| rec | 
| view | 
| options | 

<a name="Styler+getDataSourcesIds"></a>

### styler.getDataSourcesIds() ⇒ <code>Array.&lt;String&gt;</code>
**Kind**: instance method of [<code>Styler</code>](#Styler)  
**Returns**: <code>Array.&lt;String&gt;</code> - The list of dataSource ids  
<a name="Styler+init"></a>

### styler.init()
Inits the styler.

**Kind**: instance method of [<code>Styler</code>](#Styler)  
