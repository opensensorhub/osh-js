# Batch & Replay

## Batch
When the DataSource connects to the server, it starts retrieving data from the remote stream. Each data is then parsed 
and sent to the BroadcastChannel for later retrieval, either manually or by the DataSynchronizer or Views.

It is possible to perform this process for a single data or for a batch of data. Thus, by specifying the **BATCH** mode 
parameter of a DataSource, we will recover not one but a batch of data.

This parameter can be very useful if you want to load archive data at once, for example, which you do not need to see 
the evolution of, such as to create a chart with the temperature data of a given year.

## Replay

This property allows to modify the same frequency of reception of archive data compared to their original frequency.

Thus, if you specify the following values:
 
 - **replaySpeed** = 1 => receives the data at the original frequency
 - **replaySpeed** = 2 => receives data 2X faster
 - **replaySpeed** = 10 => receives data 10X faster
 - **replaySpeed** = 0.5 => receives data 2X slower

REPLAY is a mode to set either to DataSource or DataSynchronizer.
