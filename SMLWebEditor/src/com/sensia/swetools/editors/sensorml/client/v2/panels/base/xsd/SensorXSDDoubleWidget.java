package com.sensia.swetools.editors.sensorml.client.v2.panels.base.xsd;

import com.sensia.relaxNG.XSDDouble;

public class SensorXSDDoubleWidget extends SensorXSDWidget{

	private static final int LENGTH = 10;
	private static final String ALLOWED_CHARS = ".-+e0123456789";
	
	public SensorXSDDoubleWidget(XSDDouble data) {
		super(data,LENGTH,ALLOWED_CHARS);
	}
}
