package com.sensia.swetools.editors.sensorml.client.panels.elements;

import javax.swing.JLabel;

import com.google.gwt.core.shared.GWT;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.IsWidget;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class RNGIdentifierWidget extends AbstractSensorWidget{

	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel contentPanel;
	
	private boolean first = true;
	
	public RNGIdentifierWidget() {
		super("", "");
		container = new HorizontalPanel();
		contentPanel = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_RIGHT);
		contentPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_RIGHT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_RIGHT);
		
		container.add(contentPanel);
		container.add(defPanel);
		
		contentPanel.addStyleName("swe-property-panel");
	}

	@Override
	public Widget getWidget() {
		return container;
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	public void addPanel(AbstractSensorWidget widget) {
		if(widget instanceof RNGAttributeDefinitionWidget) {
			defPanel.add(widget.getWidget());
		} else {
			if(first) {
				first = false;
			}else {
				//TODO determine panel width
				int offset = widget.getPanel().getElement().getOffsetWidth();
				contentPanel.add(new Label(getNormalizedLabel(offset)));
			}
			contentPanel.add(widget.getPanel());
		}
	}
	
	private String getNormalizedLabel(int value) {
		GWT.log("Offset : "+value+"");
		int normValue = 70;
		String newValue = "";
		
		for(int i=0;i < normValue;i++) {
			newValue += ".";
		}
		return newValue;
	}

}
