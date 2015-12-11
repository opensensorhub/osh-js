package com.sensia.swetools.editors.sensorml.client.v2.panels.base.xsd;

import com.sensia.relaxNG.XSDDateTime;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;

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
