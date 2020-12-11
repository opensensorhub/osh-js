package com.sensia.swetools.editors.sensorml.client.panels.widgets.base.xsd;

import com.sensia.relaxNG.XSDAnyURI;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;

public class SensorXSDAnyURIWidget extends SensorXSDWidget{
	
	private XSDAnyURI data;
	
	public SensorXSDAnyURIWidget(final XSDAnyURI data) {
		super(data,getLength(data),null);
		this.data = data;
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

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SensorXSDAnyURIWidget(data);
	}
}
