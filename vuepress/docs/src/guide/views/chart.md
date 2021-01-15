# Chart

The Chart view allows the data to be displayed as a Chart using the [Chart.js](https://www.chartjs.org/) library.

For the moment, the view only supports the [Line](https://www.chartjs.org/docs/latest/charts/line.html) chart type.

<br/>
<DocumentationLoad path="/guide/api/ChartJsView.html"/>

## Properties configuration

The ***datasetsOpts*** allows to modify the native [datasets properties](https://www.chartjs.org/docs/latest/charts/line.html#dataset-properties)

It is possible de modify setup axis behaviour by passing ***gridLinesOpts***, ***scaleLabelOpts***  and/or ***tickOpts***.

There are related to [Cartesian Axes](https://www.chartjs.org/docs/latest/axes/cartesian/#cartesian-axes).

The [grid line](https://www.chartjs.org/docs/latest/axes/styling.html#grid-line-configuration) configuration is nested under the scale configuration in the gridLines key. It defines options for the grid lines that run perpendicular to the axis.

The [scale label](https://www.chartjs.org/docs/latest/axes/labelling.html#scale-title-configuration) configuration is nested under the scale configuration in the scaleLabel key. It defines options for the scale title. Note that this only applies to cartesian axes.

The [tick options](https://www.chartjs.org/docs/latest/axes/cartesian/#tick-configuration) are common to all cartesian axes but do not apply to other axes.

The [legend options](https://www.chartjs.org/docs/latest/configuration/legend.html?h=legend) displays data about the datasets that are appearing on the chart.

The ***maxPoint*** property will shift the data over the time so that the maximum number of points displayed on the graph is <= maxPoint.

When you pass one of these options to the ChartView, the properties will be merged with the defaults.

## Supported layers

The view supports type layers:
- curve

## Example

<<< @/../../showcase/examples/chart/chart.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/chart.html" style="border:none;width:100%;height: 500px" />

