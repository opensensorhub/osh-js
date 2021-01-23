# SosGetFois

SosGetResultJson is a specific DataSource to parse FOIs response from GetFeatureOfInterest request.

The class inherits directly from [DataSource](general.md).

## Parser

The parser parses the XML response from the server. The response is normalized according to the specifications of the
OGC `GetFeatureOfInterestResponse` standard.

The parser will return an array of `featureMember`.

<ins>From Server</ins>:

The request looks like an XML response of this type:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<sos:GetFeatureOfInterestResponse xmlns:sos="http://www.opengis.net/sos/2.0"
                                  xmlns:gml="http://www.opengis.net/gml/3.2"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  xmlns:sams="http://www.opengis.net/samplingSpatial/2.0"
                                  xmlns:sf="http://www.opengis.net/sampling/2.0">
    <sos:featureMember>
        <sams:SF_SpatialSamplingFeature gml:id="01200000">
            <gml:description>TENMILE RIVER NEAR GAYLORDSVILLE, CT</gml:description>
            <gml:identifier codeSpace="uid">urn:usgs:water:site:01200000</gml:identifier>
            <gml:name>USGS Water Site #01200000</gml:name>
            <sf:type xlink:href="http://www.opengis.net/def/samplingFeatureType/OGC-OM/2.0/SF_SamplingPoint"/>
            <sams:shape>
                <gml:Point gml:id="G1" srsName="http://www.opengis.net/def/crs/EPSG/0/5498" srsDimension="3">
                    <gml:pos>41.65876389 -73.5286833 304.0</gml:pos>
                </gml:Point>
            </sams:shape>
            <sf:sampledFeature xlink:href="urn:usgs:water:region:NY"/>
        </sams:SF_SpatialSamplingFeature>
    </sos:featureMember>
</sos:GetFeatureOfInterestResponse>
```

<ins>After parsing</ins>:

```json
[{
  "type": "SF_SpatialSamplingFeature",
  "id": "01200000",
  "description": "TENMILE RIVER NEAR GAYLORDSVILLE, CT",
  "identifier": "urn:usgs:water:site:01200000",
  "name": "USGS Water Site #01200000",
  "shape": {
    "type": "Point",
    "id": "G1",
    "srsName": "http://www.opengis.net/def/crs/EPSG/0/5498",
    "srsDimension": "3",
    "pos": "41.65876389 -73.5286833 304.0"
  },
  "sampledFeature": {
    "href": "urn:usgs:water:region:NY"
  }
}]
```

<DocumentationLoad path="/guide/api/SosGetFois.html"/>

## Example

<<< @/../../showcase/examples/cesium-fois/cesium-fois.js#snippet_cesium_fois

<hr class="demo-hr"/>

<Example path="/showcase/cesium-fois.html" style="border:none;width:100%;height: 500px" />
