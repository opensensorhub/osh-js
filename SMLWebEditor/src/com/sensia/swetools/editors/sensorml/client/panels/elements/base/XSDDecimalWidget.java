package com.sensia.swetools.editors.sensorml.client.panels.elements.base;

import com.sensia.relaxNG.RNGData;

public class XSDDecimalWidget extends XSDWidget{

	private static final int LENGTH = 10;
	private static final String ALLOWED_CHARS = ".-+0123456789";
	
	public XSDDecimalWidget(RNGData<?> data) {
		super(data,LENGTH,ALLOWED_CHARS);
	}
}
