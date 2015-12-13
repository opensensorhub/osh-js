package com.sensia.swetools.editors.sensorml.client.v2.panels.base.xsd;

import com.sensia.relaxNG.XSDInteger;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;

public class SensorXSDIntegerWidget extends SensorXSDWidget{

	private static final String ALLOWED_CHARS = "-+0123456789";
	private XSDInteger data;
	
	public SensorXSDIntegerWidget(final XSDInteger data) {
		super(data,getLength(data),ALLOWED_CHARS);
		this.data = data;
	}
	
	private static int getLength(XSDInteger data){
		 int length = 10;
	        
	        int fixedLength = data.getTotalDigits();
	        if (fixedLength > 0)
	            length = fixedLength + 1;
        
        return length;
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		// TODO Auto-generated method stub
		return new SensorXSDIntegerWidget(data);
	}
}
