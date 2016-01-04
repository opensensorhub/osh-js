package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.core.shared.GWT;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;

public class SWESensorElementTypeWidget extends AbstractSensorElementWidget{

	private HorizontalPanel container;
	
	public SWESensorElementTypeWidget() {
		super("elementType", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
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
		if(widget.getDef() == TAG_DEF.SWE && widget.getName().equals("DataRecord")) {
			//remove attribute from elementType
			container.clear();
			container.add(widget.getPanel());
		} else {
			container.add(widget.getPanel());
		}
			
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorElementTypeWidget();
	}
}
