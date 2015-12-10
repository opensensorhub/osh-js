package com.sensia.swetools.editors.sensorml.client.v2.panels.base;

import com.google.gwt.core.shared.GWT;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;

/**
 * Generic horizontal container
 * @author mathieu dhainaut
 *
 */
public class SensorGenericVerticalContainerWidget extends AbstractSensorElementWidget{

	protected VerticalPanel container;
	
	public SensorGenericVerticalContainerWidget(String name, TAG_DEF def, TAG_TYPE type) {
		super(name, def, type);
		container = new VerticalPanel();
		//container.addStyleName("swe-property-panel");
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		container.add(widget.getPanel());
		GWT.log("Widget : "+getName()+" added "+widget.getName()+ " widget");
	}

}
