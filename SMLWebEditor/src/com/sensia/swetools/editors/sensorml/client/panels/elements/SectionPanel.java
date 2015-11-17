package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.DecoratorPanel;
import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractWidget;

public class SectionPanel extends AbstractWidget{

	private DecoratorPanel decorator;
	private DisclosurePanel hidePanel;
	
	private static final String CSS_CLASS = "swe-section-panel";
	
	public SectionPanel(final String name) {
		super();
		setName(name);
		
		decorator = new DecoratorPanel();
        hidePanel = new DisclosurePanel(name);
        hidePanel.setAnimationEnabled(true);
        hidePanel.setOpen(true);
        hidePanel.addStyleName(CSS_CLASS);
        decorator.setWidget(hidePanel);
        
        hidePanel.getHeader().addStyleName("swe-section-title");
        /*HorizontalPanel header = new HorizontalPanel();
        header.addStyleName("swe-section-header");
        hidePanel.setHeader(header);*/
        
       /* // title in header
        Label label = new Label(name);
        label.addStyleName("swe-section-title");
        header.add(label);*/
	}

	@Override
	public Widget getWidget() {
		return decorator;
	}
	
	public void addWidget(Widget widget){
		hidePanel.setContent(widget);
	}
	
	
}
