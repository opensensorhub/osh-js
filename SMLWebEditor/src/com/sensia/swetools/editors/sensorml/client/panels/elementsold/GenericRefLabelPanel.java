package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Widget;


public class GenericRefLabelPanel extends AbstractSensorMLPanel{

	private static final String CSS_CLASS = "rng-error";
	
	private Label label;
	
	public GenericRefLabelPanel(final String name) {
		super();
		setName(name);
		label = new Label(name);
		label.addStyleName(CSS_CLASS);
	}

	@Override
	public Widget getWidget() {
		return label;
	}

}
