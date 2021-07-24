# File

The File DataSource can be used to read the content of a file.

It uses loaders.gl, which makes it possible to support the reading of a large number of file types.

It is very useful to read external data that you would like to aggregate in your application.

The loaders.gl parser is used and automatically detects the type of file according to several criteria: its extension, 
its content, its mime-type  [https://loaders.gl/modules/core/docs/api-reference/select-loader](https://loaders.gl/modules/core/docs/api-reference/select-loader)

## Parser

By default, this DataSource does not parse the timestamp or the data. This implies that the data is returned in the
state in which it is read. This implies that it is not compatible with the DataSynchronizer for the moment.

It uses a File connector that creates a ReadableStream which is then passed to the loaders.gl parser:
[https://loaders.gl/modules/core/docs/api-reference/parse#parsedata-response--arraybuffer--string-loaders-object--object-options-object--promiseany](https://loaders.gl/modules/core/docs/api-reference/parse#parsedata-response--arraybuffer--string-loaders-object--object-options-object--promiseany)

<DocumentationLoad path="/guide/api/File.html"/>

## Example
```js
import File from 'osh-js/core/datasource/File';

new File('Example',{
  name: 'Example',
  paths: ['http://opensensorhub.github.io/osh-js/dev/demos/earthquakes/data/earthquakes.1.csv']
});
```
*Note: By default, the DataSource File object defines the 'file' protocol.
It is therefore not necessary to define it in its properties.*
