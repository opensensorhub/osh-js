package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;

public class SWEDataComponentPropertyPanel extends AbstractSensorMLPanel{

	private static final String [] CSS_CLASS = {"swe-object-type","swe-property-panel"};
	
	private DisclosurePanel hidePanel;
	
	public SWEDataComponentPropertyPanel() {
		super();
		setName("");
		hidePanel = new DisclosurePanel();
		hidePanel.setAnimationEnabled(true);
		hidePanel.setOpen(false);

		VerticalPanel panel = new VerticalPanel();
		hidePanel.setContent(panel);
		panel.setSpacing(10);
	}

	@Override
	public Widget getWidget() {
		return hidePanel;
	}
	
	public void setHeader(Widget widget){
		hidePanel.setHeader(widget);
	}

}
