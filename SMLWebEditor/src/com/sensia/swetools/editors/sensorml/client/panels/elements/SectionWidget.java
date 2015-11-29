package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class SectionWidget extends AbstractSensorWidget{
	private static final String CSS_CLASS = "swe-section-panel";
	private DisclosurePanel hidePanel;
	private Panel contentPanel;
	private Panel container;
	
	public SectionWidget(final String name) {
		super(name,"");
		hidePanel = new DisclosurePanel(name);
        hidePanel.setAnimationEnabled(true);
        hidePanel.setOpen(true);
        hidePanel.addStyleName(CSS_CLASS);
        hidePanel.getHeader().addStyleName("swe-section-title");
        
        contentPanel = new VerticalPanel();
        hidePanel.setContent(contentPanel);
        
        container = new FlowPanel();
        container.add(hidePanel);
        
	}

	@Override
	public Widget getWidget() {
		return container;
	}
	
	public void addWidget(Widget widget){
		contentPanel.add(widget);
	}

	@Override
	public Panel getPanel() {
		return contentPanel;
	}
	
	
}
