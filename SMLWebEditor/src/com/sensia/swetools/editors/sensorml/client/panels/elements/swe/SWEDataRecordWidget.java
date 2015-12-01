package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGAttributeWidget;

public class SWEDataRecordWidget extends AbstractSensorWidget{

	private Panel container;
	
	public SWEDataRecordWidget() {
		super("", "");
		container = new VerticalPanel();
		container.addStyleName("swe-property-panel");
	}

	@Override
	public Widget getWidget() {
		return container;
	}

	@Override
	public Panel getPanel() {
		return container;
	}

}
