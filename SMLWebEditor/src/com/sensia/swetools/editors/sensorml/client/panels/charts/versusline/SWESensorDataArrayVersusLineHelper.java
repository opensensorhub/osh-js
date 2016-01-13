package com.sensia.swetools.editors.sensorml.client.panels.charts.versusline;

import com.sensia.swetools.editors.sensorml.client.panels.Utils;
import com.sensia.swetools.editors.sensorml.client.panels.charts.ISensorChart;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_DEF;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;

public class SWESensorDataArrayVersusLineHelper {

	//versus chart builder
	public static ISensorChart create1LineVersusChart(AbstractSensorElementWidget root,ISensorWidget data1,
			ISensorWidget data2,String values,String tokenSeparator,String blockSeparator) {
		
		//handle data 1
		ISensorWidget quantity = AbstractSensorElementWidget.findWidget(data1, "Quantity", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		//if Quantity found
		//TODO: add other tags if needed
		String label1 = getLabel(quantity);
		String uom1   = getUOM(quantity);
		
		//handle data 2
		quantity = AbstractSensorElementWidget.findWidget(data2, "Quantity", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		//if Quantity found
		//TODO: add other tags if needed
		String label2 = getLabel(quantity);
		String uom2   = getUOM(quantity);
		
		String[] tokens = values.split(tokenSeparator);
		
		ISensorChart chart = null;
		
		if (tokens != null && tokens.length > 0) {
			Number [][] valuesArr = new Number[tokens.length][2];
			
			int pos = 0;
			for (String token : tokens) {
				String[] block = token.split(blockSeparator);
				if (block != null && block.length == 2) {
					valuesArr[pos][0] = Double.parseDouble(block[1]);
					valuesArr[pos][1] = Double.parseDouble(block[0]);
				} 
				pos++;
			}
			chart = new VersusLineChart(label2+" vs. "+label1, Utils.getUOMSymbol(uom2),Utils.getUOMSymbol(uom1), valuesArr);
		}
		
		return chart;
	}
	
	
	public static void updateChart(ISensorChart chart,ISensorWidget data1,
			ISensorWidget data2,String values,String tokenSeparator,String blockSeparator) {
		//handle data 1
		ISensorWidget quantity = AbstractSensorElementWidget.findWidget(data1, "Quantity", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		//if Quantity found
		//TODO: add other tags if needed
		String label1 = getLabel(quantity);
		String uom1   = getUOM(quantity);
		
		//handle data 2
		quantity = AbstractSensorElementWidget.findWidget(data2, "Quantity", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		//if Quantity found
		//TODO: add other tags if needed
		String label2 = getLabel(quantity);
		String uom2   = getUOM(quantity);
		
		chart.update(label2+" vs. "+label1,Utils.getUOMSymbol(uom2),Utils.getUOMSymbol(uom1));
	}
	
	private static String getLabel(ISensorWidget quantity) {
		//if Quantity found
		//TODO: add other tags if needed
		String label = "No supported label";
		
		if(quantity != null) {
			label = quantity.getValue("label");
			if(label == null) {
				label = quantity.getValue("name");
			}
		}
		
		return label;
	}
	
	private static String getUOM(ISensorWidget quantity) {
		String uomStr = "No supported uom";
		
		if(quantity != null) {
			ISensorWidget uom = AbstractSensorElementWidget.findWidget(quantity, "uom", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
			if(uom != null) {
				String uomValue = uom.getValue("code");
				if(uomValue != null) {
					uomStr = uomValue;
				}
			}
		}
		
		return uomStr;
	}
	
	
}
