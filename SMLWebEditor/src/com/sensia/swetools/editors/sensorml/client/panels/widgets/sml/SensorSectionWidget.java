package com.sensia.swetools.editors.sensorml.client.panels.widgets.sml;

import java.util.List;

import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.HasText;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.SimplePanel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SensorSectionWidget extends AbstractSensorElementWidget{

	private static final String CSS_CLASS = "swe-section-panel";
	private DisclosurePanel hidePanel;
	private VerticalPanel contentPanel;
	private Panel container;
	
	private ISensorWidget nameWidget;
	private ISensorWidget labelWidget;
	
	private HasText currentHeader;
	
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
        
        currentHeader = hidePanel.getHeaderTextAccessor();
		
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(getName().equals("Characteristics") || getName().equals("Capabilities")) {
			
			// 3 cases:
			// 1) it's the name attribute
			// 2) it's the CharacteristicList/CapabilityList with/without definition
			// 3) the List contains a label
			
			String valueHeader = getName();
			//case 1 : it's the name attribute
			
			//TODO:May be handled by a separator ISensorWidget?
			if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("name")) {
				nameWidget = widget;
				valueHeader += " ("+toNiceLabel(widget.getValue(widget.getName()))+")";
				currentHeader.setText(valueHeader);
			} else if(widget.getName().equals("CharacteristicList") || widget.getName().equals("CapabilityList")) {
				//looking for definition and label
				List<ISensorWidget> children = widget.getElements();
				for(ISensorWidget child : children) {
					if(child.getType() == TAG_TYPE.ATTRIBUTE && child.getName().equals("definition")) {
						
						child.getPanel().removeFromParent();
						
						HorizontalPanel headerPanel = new HorizontalPanel();
						Widget currentHeader = hidePanel.getHeader();
						headerPanel.add(currentHeader);
						headerPanel.add(child.getPanel());
						
						child.getPanel().addStyleName("icon-def-section-header");
						hidePanel.setHeader(headerPanel);
					} else if(child.getType() == TAG_TYPE.ELEMENT && child.getName().equals("label")) {
						valueHeader += " ("+toNiceLabel(child.getValue(child.getName()))+")";
						currentHeader.setText(valueHeader);
						labelWidget = child;
						child.getPanel().removeFromParent();
						break;
					}
				}
				contentPanel.add(widget.getPanel());
			} else {
				contentPanel.add(widget.getPanel());
			}
		} else if(widget.getType() == TAG_TYPE.ATTRIBUTE) {
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
