package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.DecoratorPanel;
import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class SectionPanel extends AbstractSensorWidget{

	private DecoratorPanel decorator;
	private DisclosurePanel hidePanel;
	
	private static final String CSS_CLASS = "swe-section-panel";
	
	public SectionPanel(final String name) {
		super(name,"");
		
		decorator = new DecoratorPanel();
        hidePanel = new DisclosurePanel(name);
        hidePanel.setAnimationEnabled(true);
        hidePanel.setOpen(true);
        hidePanel.addStyleName(CSS_CLASS);
        decorator.setWidget(hidePanel);
        
        hidePanel.getHeader().addStyleName("swe-section-title");
	}

	@Override
	public Widget getWidget() {
		return decorator;
	}
	
	public void addWidget(Widget widget){
		hidePanel.setContent(widget);
	}

	@Override
	public Panel getPanel() {
		return decorator;
	}
	
	
}
