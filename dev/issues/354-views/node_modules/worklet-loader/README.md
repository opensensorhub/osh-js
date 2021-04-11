# Worklet Loader
This loader loads imported scripts as a URL pointing to (or containing) a compiled module. That URL can be used to add worklet modules.

**NOTE! At the moment, this is basically just a fork of [`worker-loader`](https://github.com/webpack-contrib/worker-loader) and *probably shouldn't be used*. It's possible that, at some point, `worker-loader` will support worklets and this loader will be obsolete. It's also possible that there are worker-specific things that this package does that breaks worklets for one reason or another. So be careful!**

## Install

```bash
npm i -D worklet-loader
```

## [Usage](https://webpack.js.org/concepts/loaders)

### `Inlined`

**App.js**
```js
import workletUrl from 'worklet-loader!./Worklet.js';
```

### `Config`

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.worklet\.js$/,
        use: { loader: 'worklet-loader' }
      }
    ]
  }
}
```

**App.js**
```js
import workletUrl from './file.worklet.js';

const audioCtx = new AudioContext();

audioCtx.audioWorklet.addModule(workletUrl).then(() => {
  // Do stuff with the now-registered processor
});
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|[**`name`**](#name)|`{String}`|`[hash].worklet.js`|Set a custom name for the output script|
|[**`inline`**](#inline)|`{Boolean}`|`false`|Inline the worklet as a Blob|
|[**`publicPath`**](#publicPath)|`{String}`|`null`|Override the path from which worklet scripts are downloaded|

### `name`

To set a custom name for the output script, use the `name` parameter. The name may contain the string `[hash]`, which will be replaced with a content dependent hash for caching purposes. When using `name` alone `[hash]` is omitted.

*webpack.config.js**
```js
{
  loader: 'worklet-loader',
  options: { name: 'WorkerName.[hash].js' }
}
```

### `inline`

Inline the worklet as a `Blob` with the `inline` parameter

**webpack.config.js**
```js
{
  loader: 'worklet-loader',
  options: { inline: true }
}
```

### `publicPath`

Overrides the path from which worklet scripts are downloaded. If not specified, the same public path used for other
webpack assets is used

**webpack.config.js**
```js
{
  loader: 'worklet-loader'
  options: { publicPath: '/scripts/worklets/' }
}
```

## Examples

### Integrating with TypeScript

You will need to define a custom module for the exports of your worklet files

**typings/custom.d.ts**
```typescript
declare module "*.worklet.ts" {
  const exportString: string;
  export default exportString;
}
```

**App.ts**
```typescript
import fooBarWorkletUrl from 'worlet-loader!./fooBar.worklet.ts'

const audioCtx = new AudioContext();

// @ts-ignore: AudioContext.audioWorklet is not available as a type yet
audioCtx.audioWorklet.addModule(fooBarWorkletUrl).then(() => {
  // Do stuff with the now-registered processor
});
```
