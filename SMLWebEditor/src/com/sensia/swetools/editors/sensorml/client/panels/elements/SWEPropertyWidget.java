package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGElement;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class SWEPropertyWidget extends AbstractSensorWidget{

	private DisclosurePanel hidePanel;
	private HorizontalPanel header;
	private FlowPanel contentPanel;
	
	private FlowPanel container;
	
	public SWEPropertyWidget(final RNGElement elt) {
		super("", "");
		
		String title = toNiceLabel(elt.getName());
        
       // DecoratorPanel decorator = new DecoratorPanel();
        hidePanel = new DisclosurePanel();
        hidePanel.setAnimationEnabled(true);
        hidePanel.setOpen(false);
        hidePanel.addStyleName("swe-property-panel");
        //decorator.add(hidePanel);
        
        // header section
        header = new HorizontalPanel();
        header.addStyleName("swe-section-header");
        hidePanel.setHeader(header);
        
        // title in header
        Label label = new Label(title);
        label.addStyleName("swe-section-title");
        header.add(label);
        
        // content section
        contentPanel = new FlowPanel();
        hidePanel.setContent(contentPanel);
        
        container = new FlowPanel();
        container.add(hidePanel);
	}

	@Override
	public Widget getWidget() {
		return container;
	}

	@Override
	public Panel getPanel() {
		return container;
	}
	
	public Panel getContentPanel() {
		return contentPanel;
	}
	
	public Panel getHeaderPanel() {
		return header;
	}
	
	public DisclosurePanel DisclosurePanel() {
		return hidePanel;
	}

}
