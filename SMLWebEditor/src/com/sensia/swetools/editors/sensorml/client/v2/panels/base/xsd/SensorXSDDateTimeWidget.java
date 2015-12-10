package com.sensia.swetools.editors.sensorml.client.v2.panels.base.xsd;

import com.sensia.relaxNG.XSDDateTime;

public class SensorXSDDateTimeWidget extends SensorXSDWidget{

	private static final int LENGTH = 28;
	
	public SensorXSDDateTimeWidget(XSDDateTime data) {
		super(data,LENGTH,null);
	}
}
