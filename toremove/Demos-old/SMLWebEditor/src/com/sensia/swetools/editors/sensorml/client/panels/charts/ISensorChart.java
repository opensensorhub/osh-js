package com.sensia.swetools.editors.sensorml.client.panels.charts;

import org.moxieapps.gwt.highcharts.client.Chart;

import com.google.gwt.user.client.ui.Composite;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.MODE;

public interface ISensorChart {

	public enum CHART_TYPE {
		VERSUS_LINE
	}
	/**
	 * Get the chart.
	 * @return the generated chart
	 */
	Chart getChart();
	
	/**
	 * Get the table corresponding to the chart.
	 * @return the data table
	 */
	Composite getTable();
	
	void update(String...args);
	
	CHART_TYPE getType();
	
	void switchMode(MODE mode);
}
