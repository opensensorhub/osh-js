package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Widget;

public class SWELabeledFieldPanel extends AbstractSensorMLPanel{

	private static final String [] CSS_CLASS = {"swe-object-type","swe-property-panel"};
	
	private HorizontalPanel panel;
	
	public SWELabeledFieldPanel(final String name,final String label) {
		super();
		setName("");
		
		panel = new HorizontalPanel();
		panel.addStyleName("swe-simple-field");
		panel.addStyleName("swe-property-panel");
		if (name != null) {
			panel.setTitle(name);
		}

		if (name != null){
			panel.add(new Label(label + ":"));
		}
	}

	@Override
	public Widget getWidget() {
		return panel;
	}

}
