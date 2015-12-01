package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class TitleSectionWidget extends AbstractSensorWidget{

	private FlowPanel decorator;
	
	private static final String CSS_CLASS = "swe-section-panel";
	
	public TitleSectionWidget(final String name) {
		super(name,"");
        decorator = new FlowPanel();
        decorator.add(new Label(name));
	}

	@Override
	public Widget getWidget() {
		return decorator;
	}
	
	public void addWidget(Widget widget){
		decorator.add(widget);
	}

	@Override
	public Panel getPanel() {
		return decorator;
	}
}
