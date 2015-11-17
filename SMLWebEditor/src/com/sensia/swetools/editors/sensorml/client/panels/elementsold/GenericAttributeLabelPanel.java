package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Widget;


public class GenericAttributeLabelPanel extends AbstractSensorMLPanel{

	private static final String CSS_CLASS = "";
	
	private HorizontalPanel horizontal;
	
	public GenericAttributeLabelPanel(final String name) {
		super();
		setName(name);
		horizontal = new HorizontalPanel();
		horizontal.add(new Label(name));
		//horizontal.addStyleName(CSS_CLASS);
		horizontal.setSpacing(5);
	}

	@Override
	public Widget getWidget() {
		return horizontal;
	}

}
