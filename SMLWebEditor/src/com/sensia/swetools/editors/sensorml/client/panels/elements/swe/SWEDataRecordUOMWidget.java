package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGAttributeWidget;

public class SWEDataRecordUOMWidget extends AbstractSensorWidget{

	private Panel container;
	private Label value;
	
	public SWEDataRecordUOMWidget() {
		super("", "");
		container = new HorizontalPanel();
		value = new Label();
		
		container.add(value);
		
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
		if(widget instanceof RNGAttributeWidget){
			value.setText(((RNGAttributeWidget) widget).getValue());
		} else {
			super.addPanel(widget);
		}
	}
}
