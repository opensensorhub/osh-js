package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGValueWidget;

public class SWEDataRecordNameWidget extends AbstractSensorWidget{

	private Panel container;
	
	private Label value;
	
	public SWEDataRecordNameWidget() {
		super("","");
		container = new HorizontalPanel();
		value = new Label("");
		
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
		if(widget instanceof RNGValueWidget) {
			value.setText(widget.getName());
		}  else {
			super.addPanel(widget);
		}
	}

}
