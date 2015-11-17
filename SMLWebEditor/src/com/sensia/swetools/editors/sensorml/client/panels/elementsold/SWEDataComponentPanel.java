package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Widget;

public class SWEDataComponentPanel extends AbstractSensorMLPanel{

	private static final String [] CSS_CLASS = {"swe-object-type","swe-property-panel"};
	
	private Label label;
	
	public SWEDataComponentPanel(final String name) {
		super();
		setName("");
		label = new Label(name);
		for(final String css : CSS_CLASS) {
			label.addStyleName(css);
		}
	}

	@Override
	public Widget getWidget() {
		return label;
	}

}
