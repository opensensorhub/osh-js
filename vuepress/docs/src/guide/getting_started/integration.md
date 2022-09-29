---
id: integration
title: Integration
sidebar_label: Integration
---

# Integration 

osh-js can be integrated with plain JavaScript or with different module loaders. The examples below show how to load osh-js in different systems.

```html

<script src="path/to/osh-js/dist/osh-js.js"></script>
<script>
    const dataSource = new Datasource({...});
</script>
```

### Common JS

```javascript 1.8
const DataSource = require('osh-js.js');
const dataSource = new DataSource({...});
```

### Bundlers (Webpack, Rollup, etc.)

```javascript
import { DataSource } from 'osh-js.js';

const dataSource = new DataSource({...});
```
