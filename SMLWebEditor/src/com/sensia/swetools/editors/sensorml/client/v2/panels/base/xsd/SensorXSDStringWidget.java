package com.sensia.swetools.editors.sensorml.client.v2.panels.base.xsd;

import com.sensia.relaxNG.XSDString;

public class SensorXSDStringWidget extends SensorXSDWidget{

	public SensorXSDStringWidget(final XSDString data) {
		super(data,getLength(data),null);
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
}
