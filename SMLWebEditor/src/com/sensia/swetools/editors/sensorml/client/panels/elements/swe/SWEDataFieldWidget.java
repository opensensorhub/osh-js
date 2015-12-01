package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGAttributeWidget;

public class SWEDataFieldWidget extends AbstractSensorWidget{

	private Panel container;
	
	public SWEDataFieldWidget() {
		super("", "");
		container = new HorizontalPanel();
	}

	@Override
	public Widget getWidget() {
		return container;
	}

	@Override
	public Panel getPanel() {
		return container;
	}
	
	
	@Override
	public void addPanel(AbstractSensorWidget widget) {
		//skip attribute name
		if(!(widget instanceof RNGAttributeWidget)){
			super.addPanel(widget);
		}
	}

}
