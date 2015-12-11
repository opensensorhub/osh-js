package com.sensia.swetools.editors.sensorml.client.v2.panels.base.xsd;

import com.sensia.relaxNG.XSDString;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;

public class SensorXSDStringWidget extends SensorXSDWidget{
	private XSDString data;
	
	public SensorXSDStringWidget(final XSDString data) {
		super(data,getLength(data),null);
		this.data = data;
	}
	
	private static int getLength(XSDString data){
		int length = -1;
		int fixedLength = data.getLength();
        if (fixedLength > 0)
            length = fixedLength;
        
        int maxLength = data.getMaxLength();
        if (maxLength > 0)
            length = maxLength;
        
        return length;
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SensorXSDStringWidget(data);
	}
}
