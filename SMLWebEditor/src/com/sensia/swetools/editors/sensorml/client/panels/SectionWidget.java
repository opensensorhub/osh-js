package com.sensia.swetools.editors.sensorml.client.panels;

import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class SectionWidget extends AbstractSensorWidget{

	private Panel section;
	
	public SectionWidget(String name, String description) {
		super(name, description);
		section = new FlowPanel();
	}

	@Override
	public Widget getWidget() {
		return section;
	}

	@Override
	public Panel getPanel() {
		return section;
	}

}
