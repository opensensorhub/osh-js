package com.sensia.swetools.editors.sensorml.client.panels.elements.sml;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.RNGRenderer.RNGChoiceWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGAttributeDefinitionWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGValueWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.XSDWidget;

public class SMLOutputWidget extends AbstractSensorWidget{

	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private Label dotSeparatorLabel;
	private Panel namePanel;
	private Panel contentPanel;
	
	public SMLOutputWidget() {
		super("", "");
		container = new HorizontalPanel();
		contentPanel = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		namePanel = new HorizontalPanel();
		
		container.add(namePanel);
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
		if (widget instanceof RNGAttributeDefinitionWidget){
			defPanel.add(widget.getWidget());
		} else if (widget instanceof SMLLabelWidget){
			namePanel.add(widget.getWidget());
		} else if (widget instanceof RNGValueWidget || widget instanceof XSDWidget || widget instanceof RNGChoiceWidget){
			contentPanel.add(widget.getWidget());
		} else {	
			super.addPanel(widget);
		}
	}	
}
