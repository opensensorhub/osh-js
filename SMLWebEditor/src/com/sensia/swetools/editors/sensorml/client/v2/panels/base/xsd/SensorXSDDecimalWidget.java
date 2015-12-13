package com.sensia.swetools.editors.sensorml.client.v2.panels.base.xsd;

import com.sensia.relaxNG.RNGData;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;

public class SensorXSDDecimalWidget extends SensorXSDWidget{

	private static final int LENGTH = 10;
	private static final String ALLOWED_CHARS = ".-+0123456789";
	private RNGData<?> data;
	
	public SensorXSDDecimalWidget(RNGData<?> data) {
		super(data,LENGTH,ALLOWED_CHARS);
		this.data = data;
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		// TODO Auto-generated method stub
		return new SensorXSDDecimalWidget(data);
	}
}
