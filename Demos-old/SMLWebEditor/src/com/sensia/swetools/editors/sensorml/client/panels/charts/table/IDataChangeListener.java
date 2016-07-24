package com.sensia.swetools.editors.sensorml.client.panels.charts.table;

public interface IDataChangeListener {

	void notifyAddChanges(Number[][] values);
	void notifyRemoveChanges(Number[][] values);
}
