package com.sensia.swetools.editors.sensorml.client.panels.widgets.sml;

import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SensorSectionWidget extends AbstractSensorElementWidget{

	private static final String CSS_CLASS = "swe-section-panel";
	private DisclosurePanel hidePanel;
	private VerticalPanel contentPanel;
	private Panel container;
	
	public SensorSectionWidget(String name) {
		super(name,TAG_DEF.SML ,TAG_TYPE.ELEMENT);
		
		hidePanel = new DisclosurePanel(name);
        hidePanel.setAnimationEnabled(true);
        hidePanel.setOpen(true);
        hidePanel.addStyleName(CSS_CLASS);
        hidePanel.getHeader().addStyleName("swe-section-title");
        
        contentPanel = new VerticalPanel();	
        hidePanel.setContent(contentPanel);
        
        container = new FlowPanel();
        container.add(hidePanel);
        
        contentPanel.addStyleName("swe-property-panel");
		
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getDef() == TAG_DEF.SML) {
			//get header from child value
			if(!widget.getElements().isEmpty()) {
				//the first one should be a value widget
				String value = widget.getElements().get(0).getName();
				//set header
				hidePanel.getHeaderTextAccessor().setText(value);
			}
			
		} else {
			contentPanel.add(widget.getPanel());
		}
	}

	@Override
	protected void activeMode(MODE mode) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SensorSectionWidget(getName());
	}

}
