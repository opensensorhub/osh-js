---
title: DataSenderController
---

# DataSenderController

<a name="DataSenderController"></a>

## DataSenderController
This class is in charge of send command to the server

**Kind**: global class  

* [DataSenderController](#DataSenderController)
    * [new DataSenderController(options)](#new_DataSenderController_new)
    * [.addDataSource(datasource)](#DataSenderController+addDataSource)
    * [.sendRequest(dataSourceId, properties, onSuccess, onError)](#DataSenderController+sendRequest)

<a name="new_DataSenderController_new"></a>

### new DataSenderController(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

<a name="DataSenderController+addDataSource"></a>

### dataSenderController.addDataSource(datasource)
Adds a datasource to the list of datasources to process

**Kind**: instance method of [<code>DataSenderController</code>](#DataSenderController)  

| Param | Type | Description |
| --- | --- | --- |
| datasource | <code>Object</code> | the datasource to add |

<a name="DataSenderController+sendRequest"></a>

### dataSenderController.sendRequest(dataSourceId, properties, onSuccess, onError)
Sends request to the server

**Kind**: instance method of [<code>DataSenderController</code>](#DataSenderController)  

| Param | Type | Description |
| --- | --- | --- |
| dataSourceId | <code>String</code> | the datasource id to process |
| properties | <code>Object</code> | the properties to use |
| onSuccess | <code>function</code> | the onSucess function |
| onError | <code>function</code> | the onError function |

