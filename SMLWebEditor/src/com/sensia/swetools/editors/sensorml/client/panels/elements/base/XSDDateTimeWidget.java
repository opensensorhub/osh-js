package com.sensia.swetools.editors.sensorml.client.panels.elements.base;

import com.sensia.relaxNG.XSDDateTime;

public class XSDDateTimeWidget extends XSDWidget{

	private static final int LENGTH = 28;
	
	public XSDDateTimeWidget(XSDDateTime data) {
		super(data,LENGTH,null);
	}
}
