package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.core.client.GWT;
import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGElement;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class SWEPropertyWidget extends AbstractSensorWidget{

	//private DisclosurePanel hidePanel;
	//private HorizontalPanel header;
	//private FlowPanel contentPanel;
	
	private FlowPanel container;
	
	public SWEPropertyWidget(final RNGElement elt) {
		super(elt.getName(), "");
		
		String title = toNiceLabel(elt.getName());
        
        // title in header
        Label label = new Label(title);
        label.addStyleName("swe-section-title");
        
        container = new FlowPanel();
        //container.addStyleName("swe-property-panel");
	}

	@Override
	public Widget getWidget() {
		return container;
	}

	@Override
	public Panel getPanel() {
		return container;
	}
	
	public void addHeader(Widget widget){
		container.add(widget);
	}
	
	public void addContent(Widget content) {
		container.add(content);
	}
}
