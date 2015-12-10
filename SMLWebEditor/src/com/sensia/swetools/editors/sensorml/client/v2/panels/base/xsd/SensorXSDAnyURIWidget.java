package com.sensia.swetools.editors.sensorml.client.v2.panels.base.xsd;

import com.sensia.relaxNG.XSDAnyURI;

public class SensorXSDAnyURIWidget extends SensorXSDWidget{
	
	public SensorXSDAnyURIWidget(final XSDAnyURI data) {
		super(data,getLength(data),null);
	}
	
	private static int getLength(XSDAnyURI data){
		int length = 60;
        
        int fixedLength = data.getLength();
        if (fixedLength > 0)
            length = fixedLength;
        
        int maxLength = data.getMaxLength();
        if (maxLength > 0)
            length = maxLength;
        
        return length;
	}
}
