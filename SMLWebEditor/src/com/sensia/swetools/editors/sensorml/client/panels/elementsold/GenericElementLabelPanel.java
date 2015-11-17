package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;


public class GenericElementLabelPanel extends AbstractSensorMLPanel{

	private static final String CSS_CLASS = "";
	
	private VerticalPanel verticalPanel;
	
	public GenericElementLabelPanel(final String name) {
		super();
		setName(name);
		verticalPanel = new VerticalPanel();
		verticalPanel.add(new Label(name));
		//verticalPanel.addStyleName(CSS_CLASS);
	}

	@Override
	public Widget getWidget() {
		return verticalPanel;
	}

}
