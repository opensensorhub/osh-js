package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGElement;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class SWEDataComponentPropertyWidget extends AbstractSensorWidget{

	//private VerticalPanel contentPanel;
	private Panel container;
	//private DisclosurePanel hidePanel;
	
	public SWEDataComponentPropertyWidget(final RNGElement elt) {
		super("", "");
		//hidePanel = new DisclosurePanel();
        //hidePanel.setAnimationEnabled(true);
        //hidePanel.setOpen(false);
        
		container = new VerticalPanel();
        //hidePanel.setContent(contentPanel);
        //contentPanel.setSpacing(10);
        
        //container = new FlowPanel();
        //container.add(hidePanel);
	}

	public void setHeader(final Widget header) {
		//hidePanel.setHeader(header);
	}
	
	public Panel getContentPanel() {
		return container;
	}
	
	@Override
	public Widget getWidget() {
		return container;
	}

	@Override
	public Panel getPanel() {
		return container;
	}

}
