# Batch & ReplaySpeed

## Batch
When the DataSource connects to the server, it starts retrieving data from the remote stream. Each data is then parsed 
and sent to the BroadcastChannel for later retrieval, either manually or by the DataSynchronizer or Views.

It is possible to perform this process for a single data or for a batch of data. Thus, by specifying the **batchSize** 
parameter of a DataSource, we will recover not one but a batch of data whose size is specified by the parameter.

For example:
- **batchSize** = 1 => we recover a single piece of data
- **batchSize** = 1000 => we get 1000 data at once

If you don't specify **batchSize** or **replaySpeed**, you will get the whole data at once.

This parameter can be very useful if you want to load archive data at once, for example, which you do not need to see 
the evolution of, such as to create a chart with the temperature data of a given year.

## ReplaySpeed

This property allows to modify the same frequency of reception of archive data compared to their original frequency.

Thus, if you specify the following values:
 
 - **replaySpeed** = 1 => receives the data at the original frequency
 - **replaySpeed** = 2 => receives data 2X faster
 - **replaySpeed** = 10 => receives data 10X faster
 - **replaySpeed** = 0.5 => receives data 2X slower

## Case of Real time data

In the case of real time, these parameters will be ignored even if they are specified. 

## Example

<<< @/../../showcase/examples/chart-batch/chart-batch.js#snippet_chart_batch

<hr class="demo-hr"/>
<br/><br/><br/>
<Example path="/showcase/chart-batch.html" style="border:none;width:100%;height: 1000px" />
