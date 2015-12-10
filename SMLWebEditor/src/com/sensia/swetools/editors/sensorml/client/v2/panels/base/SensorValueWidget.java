package com.sensia.swetools.editors.sensorml.client.v2.panels.base;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;


public class SensorValueWidget extends AbstractSensorElementWidget{

	private Panel container;
	
	public SensorValueWidget(String value) {
		super(value, TAG_DEF.RNG, TAG_TYPE.VALUE);
		
		container = new HorizontalPanel();
		container.add(new HTML(value));
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) { 
		//do nothing
	}
}
