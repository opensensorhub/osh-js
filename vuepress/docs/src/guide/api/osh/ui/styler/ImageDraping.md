---
title: ImageDraping
---

# ImageDraping

<a name="ImageDraping"></a>

## ImageDraping ⇐ <code>Styler</code>
**Kind**: global class  
**Extends**: <code>Styler</code>  
<a name="new_ImageDraping_new"></a>

### new ImageDraping(properties, properties)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| properties | <code>Object</code> |  |  |
| properties.location | <code>Array.&lt;Number&gt;</code> |  | [x,y] |
| properties.orientation | <code>Object</code> |  | - |
| properties.gimbalOrientation | <code>Object</code> |  | - |
| properties.cameraModel | <code>Object</code> |  | - |
| properties.cameraModel.camProj | <code>Matrix3</code> |  | - |
| properties.cameraModel.camDistR | <code>Cartesian3</code> |  | - |
| properties.cameraModel.camDistT | <code>Cartesian2</code> |  | - |
| properties.icon | <code>String</code> |  | - |
| [properties.iconAnchor] | <code>Array.&lt;Number&gt;</code> | <code>[16,16]</code> | - |
| properties.imageSrc | <code>HTMLElement</code> |  | source canvas |
| properties.platformLocationFunc | <code>function</code> |  | - |
| properties.platformOrientationFunc | <code>function</code> |  | - |
| properties.gimbalOrientationFunc | <code>function</code> |  | - |
| properties.cameraModelFunc | <code>function</code> |  | - |
| properties.snapshotFunc | <code>function</code> |  | - |
| properties |  |  |  |

**Example**  
```js
import ImageDraping from 'osh/ui/styler/ImageDraping.js';

 let imageDrapingMarker = new ImageDraping({
      platformLocationFunc: {
        dataSourceIds: [platformLocationDataSource.getId()],
        handler: function (rec) {
          return {
            x: rec.loc.lon,
            y: rec.loc.lat,
            z: rec.loc.alt - 184
          };
        }
      },
      platformOrientationFunc: {
        dataSourceIds: [platformOrientationDataSource.getId()],
        handler: function (rec) {
          return {
            heading : rec.attitude.yaw,
            pitch: rec.attitude.pitch,
            roll: rec.attitude.roll
          };
        }
      },
      gimbalOrientationFunc: {
        dataSourceIds: [gimbalOrientationDataSource.getId()],
        handler: function (rec) {
          return {
            heading : rec.attitude.yaw,
            pitch: rec.attitude.pitch,
            roll: rec.attitude.roll
          };
        }
      },
      cameraModel: {
        camProj: new Matrix3(747.963/1280.,     0.0,       650.66/1280.,
          0.0,        769.576/738.,  373.206/738.,
          0.0,            0.0,          1.0),
        camDistR: new Cartesian3(-2.644e-01, 8.4e-02, 0.0),
        camDistT: new Cartesian2(-8.688e-04, 6.123e-04)
      },
      icon: 'images/car-location.png',
      iconAnchor: [16, 40],
      imageSrc: videoCanvas
    });
```
