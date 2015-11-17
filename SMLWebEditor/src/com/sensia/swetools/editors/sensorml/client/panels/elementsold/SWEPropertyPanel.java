package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Widget;

public class SWEPropertyPanel extends AbstractSensorMLPanel{

	private static final String [] CSS_CLASS = {};
	
	private DisclosurePanel hidePanel;
	private HorizontalPanel header;
	private FlowPanel contentPanel;
	
	public SWEPropertyPanel(final String name) {
		super();
		setName(name);
		
		hidePanel = new DisclosurePanel();
		hidePanel.setAnimationEnabled(true);
		hidePanel.setOpen(false);
		hidePanel.addStyleName("swe-property-panel");

		// header section
		header = new HorizontalPanel();
		header.addStyleName("swe-section-header");
		hidePanel.setHeader(header);

		// title in header
		Label label = new Label(name);
		label.addStyleName("swe-section-title");
		header.add(label);

		// content section
		FlowPanel contentPanel = new FlowPanel();
		hidePanel.setContent(contentPanel);
	}

	@Override
	public Widget getWidget() {
		return hidePanel;
	}
	
	public HorizontalPanel getHeader(){
		return header;
	}
	
	public void addContent(Widget widget){
		contentPanel.add(widget);
	}

}
