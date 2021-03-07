# TimeController

The TimeController is a component allowing the visualization and temporal control of the Toolkit's DataSources.
Thus it allows to go back to archive data at specific periods or to switch to real time.

<DocumentationLoad path="/guide/api/module-osh-vue_TimeController.html"/>

## Properties configuration

The control can be done either by passing a DataSource object or a DataSynchronizer object containing several DataSources. 

The `skipTimeStep` parameter is used to define the period of time you want to go forward or backward. 
The value can be expressed in seconds or as a percentage.

The `replaySpeedStep` parameter is used to define the speed of acceleration or deceleration of the DataSource. 
It will act directly on the `replaySpeed` value of the DataSource object.

The `debounce` parameter is used to set the measured waiting time between two actions.
For example, if we press `forward` several times, this value will allow to take into account either
the first or both actions.

Example: if we click twice on forward at 300ms interval and the `debounce` value is 500ms, 
then the second `forward' will be ignored. On the other hand, if the debounce value was less than or equal to 300ms,
the second action would also be executed.

The `parseTime` parameter allows you to define a function that will customize the time display next to the action buttons. 
This can be useful if we want to display the time in ISO UTC or local time for example, or if we want to display 
only hours:minutes or also seconds, months etc.

::: warning
For each forward, backward, replay speed and slide action of the slider, a reconnection is 
automatically performed and an event is launched with the name of the action that has just been performed as the value.

When switching to real time, the reconnection is also automatic. On the other hand, when switching from real time to
replay, the last replay parameters are reloaded but the reconnection is not automatic.
It is then necessary either to perform an action or to click on the play button.
:::

## Example

<<< @/../../showcase/examples/chart-archive-realtime/src/App.vue

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/chart-archive-realtime.html" style="border:none;width:100%;height: 500px" />

