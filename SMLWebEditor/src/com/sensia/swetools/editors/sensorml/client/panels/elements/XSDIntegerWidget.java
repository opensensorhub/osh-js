package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.sensia.relaxNG.XSDInteger;

public class XSDIntegerWidget extends XSDWidget{

	private static final String ALLOWED_CHARS = "-+0123456789";
	
	public XSDIntegerWidget(final XSDInteger data) {
		super(data,getLength(data),ALLOWED_CHARS);
	}
	
	private static int getLength(XSDInteger data){
		 int length = 10;
	        
	        int fixedLength = data.getTotalDigits();
	        if (fixedLength > 0)
	            length = fixedLength + 1;
        
        return length;
	}
	
}
