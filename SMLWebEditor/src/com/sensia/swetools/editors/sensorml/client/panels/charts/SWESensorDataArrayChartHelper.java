package com.sensia.swetools.editors.sensorml.client.panels.charts;

import java.util.List;

import com.sensia.swetools.editors.sensorml.client.panels.charts.ISensorChart.CHART_TYPE;
import com.sensia.swetools.editors.sensorml.client.panels.charts.versusline.SWESensorDataArrayVersusLineHelper;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_DEF;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;

public class SWESensorDataArrayChartHelper {

	public static ISensorChart createChart(AbstractSensorElementWidget root,String values,String tokenSeparator,String blockSeparator) {
		//find fields
		List<ISensorWidget> fields = AbstractSensorElementWidget.findWidgets(root, "field", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		ISensorChart chart = null;
		if(fields.size() == 2) {
			chart = SWESensorDataArrayVersusLineHelper.create1LineVersusChart(root,fields.get(0), fields.get(1),values,tokenSeparator,blockSeparator);
		}
		
		return chart;
	}
	
	public static void updateChart(ISensorChart chart,AbstractSensorElementWidget root,String values,String tokenSeparator,String blockSeparator) {
		if(chart.getType() == CHART_TYPE.VERSUS_LINE){
			List<ISensorWidget> fields = AbstractSensorElementWidget.findWidgets(root, "field", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
			SWESensorDataArrayVersusLineHelper.updateChart(chart, fields.get(0), fields.get(1),values, tokenSeparator, blockSeparator);
		}
	}
	
}
