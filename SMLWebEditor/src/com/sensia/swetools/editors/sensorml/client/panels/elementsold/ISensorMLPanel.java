package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.Widget;


public interface ISensorMLPanel {

	Widget getWidget();
	
	String getName();
	
	String getDescription();
	
	void add(ISensorMLPanel sensorPanel);
	
}
