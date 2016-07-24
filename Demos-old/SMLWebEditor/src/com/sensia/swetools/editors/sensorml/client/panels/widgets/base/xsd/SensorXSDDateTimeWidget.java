package com.sensia.swetools.editors.sensorml.client.panels.widgets.base.xsd;

import com.sensia.relaxNG.XSDDateTime;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;

public class SensorXSDDateTimeWidget extends SensorXSDWidget{

	private static final int LENGTH = 28;
	private XSDDateTime data;
	
	public SensorXSDDateTimeWidget(XSDDateTime data) {
		super(data,LENGTH,null);
		this.data = data;
	}
	
	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SensorXSDDateTimeWidget(data);
	}
}
