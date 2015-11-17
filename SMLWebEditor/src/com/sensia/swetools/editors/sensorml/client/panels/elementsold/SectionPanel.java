package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.DecoratorPanel;
import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.Widget;

public class SectionPanel extends AbstractSensorMLPanel{

	private DisclosurePanel contentPanel;
	private DecoratorPanel decPanel;
	
	private static final String CSS_CLASS = "swe-section-panel";
	
	public SectionPanel(final String name) {
		super();
		setName(name);
		
		decPanel = new DecoratorPanel();
	    
		contentPanel = new DisclosurePanel(name);
		contentPanel.setAnimationEnabled(true);
		contentPanel.setOpen(false);
		contentPanel.addStyleName(CSS_CLASS);
        decPanel.setWidget(contentPanel);
	}

	@Override
	public Widget getWidget() {
		return decPanel;
	}
}
