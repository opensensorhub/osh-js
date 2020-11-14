---
title: OrientationQuaternion
---

# OrientationQuaternion

<a name="OrientationQuaternion"></a>

## OrientationQuaternion ⇐ <code>DataSource</code>
This datasource provides parsing to Orientation Quaternion.
Data: ISODATE,Qx,Qy,Qz,Qw.

**Kind**: global class  
**Extends**: <code>DataSource</code>  

* [OrientationQuaternion](#OrientationQuaternion) ⇐ <code>DataSource</code>
    * [.parseTimeStamp(data)](#OrientationQuaternion+parseTimeStamp) ⇒ <code>Number</code>
    * [.parseData(data)](#OrientationQuaternion+parseData) ⇒ <code>Object</code>

<a name="OrientationQuaternion+parseTimeStamp"></a>

### orientationQuaternion.parseTimeStamp(data) ⇒ <code>Number</code>
Extracts timestamp from the message. The timestamp is the first token got from split(',')

**Kind**: instance method of [<code>OrientationQuaternion</code>](#OrientationQuaternion)  
**Returns**: <code>Number</code> - the extracted timestamp  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | the data to parse |

<a name="OrientationQuaternion+parseData"></a>

### orientationQuaternion.parseData(data) ⇒ <code>Object</code>
Extracts data from the message. The data are got such as:<p><ul><li>qx: tokens[1]</li><li>qy: tokens [2]</li><li>qz: tokens[3]</li><li>qw: tokens[4]</li></ul></p>.

**Kind**: instance method of [<code>OrientationQuaternion</code>](#OrientationQuaternion)  
**Returns**: <code>Object</code> - the parsed data  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data to parse |

**Example**  
```js
{
  pitch:10,
  roll: 11,
  heading:12
}
```
