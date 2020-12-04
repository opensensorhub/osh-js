package com.sensia.swetools.editors.sensorml.client.panels.widgets.base;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SensorChoiceWidget extends AbstractSensorElementWidget{

	private ListBox choices;
	private HorizontalPanel container;
	
	public SensorChoiceWidget() {
		super("choice", TAG_DEF.RNG, TAG_TYPE.CHOICE);
		
		choices = new ListBox();
		container = new HorizontalPanel();
		
		container.add(choices);
		
		container.setSpacing(5);
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void activeMode(MODE mode) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getType() == TAG_TYPE.VALUE) {
			choices.addItem(widget.getName());
		} else {
			container.add(widget.getPanel());
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SensorChoiceWidget();
	}
}
