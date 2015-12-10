package com.sensia.swetools.editors.sensorml.client.panels.elements.sml;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGElement;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGAttributeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGValueWidget;

public class SMLLabelWidget extends AbstractSensorWidget{

	private Panel container;
	private Label value;
	
	public SMLLabelWidget(final RNGElement element) {
		super(element.getName(), "");
		container = new HorizontalPanel();
		value = new Label(element.getName());
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
	
	public void addPanel(AbstractSensorWidget widget) {
		//SWE or GML
		if(widget instanceof RNGValueWidget) {
			value.setText(widget.getName());
		} else if (widget instanceof RNGAttributeWidget) {
			value.setText(((SMLAttributeWidget) widget).getValue());
		} else {
			super.addPanel(widget);
		}
	}

}
