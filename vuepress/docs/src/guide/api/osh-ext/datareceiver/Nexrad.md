---
title: Nexrad
---

# Nexrad

<a name="Nexrad"></a>

## Nexrad ⇐ <code>DataSource</code>
This datasource provides parsing to DataSource Nexrad.

**Kind**: global class  
**Extends**: <code>DataSource</code>  

* [Nexrad](#Nexrad) ⇐ <code>DataSource</code>
    * [.parseTimeStamp(data)](#Nexrad+parseTimeStamp) ⇒ <code>number</code>
    * [.parseData(data)](#Nexrad+parseData) ⇒ <code>Object</code>

<a name="Nexrad+parseTimeStamp"></a>

### nexrad.parseTimeStamp(data) ⇒ <code>number</code>
Extracts timestamp from the message. The timestamp is the first token got from split(',')

**Kind**: instance method of [<code>Nexrad</code>](#Nexrad)  
**Returns**: <code>number</code> - the extracted timestamp  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | the data to parse |

<a name="Nexrad+parseData"></a>

### nexrad.parseData(data) ⇒ <code>Object</code>
Extracts data from the message.

**Kind**: instance method of [<code>Nexrad</code>](#Nexrad)  
**Returns**: <code>Object</code> - the parsed data  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data to parse |

