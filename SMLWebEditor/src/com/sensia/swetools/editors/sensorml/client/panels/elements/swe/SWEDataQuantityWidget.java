package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.RNGRenderer.RNGChoiceWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGAttributeDefinitionWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGValueWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.XSDWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.sml.SMLLabelWidget;

public class SWEDataQuantityWidget extends AbstractSensorWidget{

	private Panel namePanel;
	private Panel quantityPanel;
	
	private Panel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel uomPanel;
	private Label dotSeparatorLabel;
	
	public SWEDataQuantityWidget() {
		super("", "");
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		namePanel = new HorizontalPanel();
		quantityPanel = new HorizontalPanel();
		uomPanel = new HorizontalPanel();
		dotSeparatorLabel = new Label(getNormalizedLabel(110));
		
		container.add(namePanel);
		container.add(dotSeparatorLabel);
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
			dotSeparatorLabel.setText(getNormalizedLabel(0));
		} else if (widget instanceof RNGValueWidget || widget instanceof XSDWidget || widget instanceof RNGChoiceWidget){
			quantityPanel.add(widget.getWidget());
		} else if(widget instanceof SWEDataRecordUOMWidget){
			uomPanel.add(widget.getWidget());
		} else {	
			super.addPanel(widget);
		}
	}
}
