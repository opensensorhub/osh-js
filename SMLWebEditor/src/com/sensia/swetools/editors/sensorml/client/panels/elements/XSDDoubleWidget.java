package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.sensia.relaxNG.XSDDouble;

public class XSDDoubleWidget extends XSDWidget{

	private static final int LENGTH = 10;
	private static final String ALLOWED_CHARS = ".-+e0123456789";
	
	public XSDDoubleWidget(XSDDouble data) {
		super(data,LENGTH,ALLOWED_CHARS);
	}
}
