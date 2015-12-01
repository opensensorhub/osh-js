package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.TextBoxBase;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGAttributeDefinitionWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGAttributeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGValueWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.SMLLabelWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.XSDWidget;

public class SWEDataQuantityWidget extends AbstractSensorWidget{

	private Panel namePanel;
	private Panel quantityPanel;
	
	private Panel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel uomPanel;
	
	public SWEDataQuantityWidget() {
		super("", "");
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		namePanel = new HorizontalPanel();
		quantityPanel = new HorizontalPanel();
		uomPanel = new HorizontalPanel();
		
		container.add(namePanel);
		container.add(new Label(getNormalizedLabel(70)));
		container.add(quantityPanel);
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
			quantityPanel.add(widget.getWidget());
		} else if(widget instanceof SWEDataRecordUOMWidget){
			uomPanel.add(widget.getWidget());
		} else {	
			super.addPanel(widget);
		}
	}

	private String getNormalizedLabel(int value) {
		int normValue = 70;
		String newValue = "";
		
		for(int i=0;i < normValue;i++) {
			newValue += ".";
		}
		return newValue;
	}

}
