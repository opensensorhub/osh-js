package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Widget;

public class GenericValuePanel extends AbstractSensorMLPanel{

	private static final String CSS_CLASS = "";
	
	private Label label;
	public GenericValuePanel(final String text) {
		super();
		setName("");
		label = new Label(text);
		//label.addStyleName(CSS_CLASS);
	}

	@Override
	public Widget getWidget() {
		return label;
	}
}