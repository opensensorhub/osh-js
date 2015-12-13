package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGAttributeDefinitionWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGValueWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.XSDWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.sml.SMLLabelWidget;

public class SWEDataQuantityRangeWidget extends AbstractSensorWidget{

	private Panel namePanel;
	
	private Panel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel uomPanel;
	private HorizontalPanel minPanel;
	private HorizontalPanel maxPanel;
	
	private boolean hasMinValue = false;
	
	public SWEDataQuantityRangeWidget() {
		super("", "");
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		namePanel = new HorizontalPanel();
		uomPanel = new HorizontalPanel();
		minPanel = new HorizontalPanel();
		maxPanel = new HorizontalPanel();
		
		container.add(namePanel);
		container.add(new Label(getNormalizedLabel(110)));
		container.add(minPanel);
		container.add(new HTML("&nbsp;&nbsp;to&nbsp;&nbsp;"));
		container.add(maxPanel);
		container.add(uomPanel);
		container.add(defPanel);
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
		 if (widget instanceof RNGAttributeDefinitionWidget){
			defPanel.add(widget.getWidget());
		} else if (widget instanceof SMLLabelWidget){
			namePanel.add(widget.getWidget());
		} else if (widget instanceof RNGValueWidget || widget instanceof XSDWidget){
			if(!hasMinValue) {
				minPanel.add(widget.getWidget());
				hasMinValue = true;
			} else {
				maxPanel.add(widget.getWidget());
			}
		} else if(widget instanceof SWEDataRecordUOMWidget){
			uomPanel.add(widget.getWidget());
		} else {	
			super.addPanel(widget);
		}
	}
}
