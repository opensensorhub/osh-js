package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGElement;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class ObjectTypeWidget extends AbstractSensorWidget {

	private Label label;
	private Panel container;
	
	public ObjectTypeWidget(final RNGElement elt) {
		super(elt.getName(), "");

		label = new Label("Type: " + SMLtoNiceLabel(elt.getName()));
		label.addStyleName("swe-object-type");
		
		container = new FlowPanel();
		container.add(label);
	}

	@Override
	public Widget getWidget() {
		return label;
	}

	@Override
	public Panel getPanel() {
		return container;
	}
}
