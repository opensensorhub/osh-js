package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.TextBoxBase;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGChoice;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;
import com.sensia.swetools.editors.sensorml.client.RNGRenderer.RNGChoiceWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGAttributeDefinitionWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGAttributeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGValueWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.XSDWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.sml.SMLLabelWidget;

public class SWEDataCategoryWidget extends AbstractSensorWidget{

	private Panel namePanel;
	private Panel quantityPanel;
	
	private Panel container;
	private HorizontalPanel defPanel;
	private Label dotSeparatorLabel;
	
	public SWEDataCategoryWidget() {
		super("", "");
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		namePanel = new HorizontalPanel();
		quantityPanel = new HorizontalPanel();
		dotSeparatorLabel = new Label(getNormalizedLabel(110));
		
		container.add(namePanel);
		container.add(dotSeparatorLabel);
		container.add(quantityPanel);
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
		} else {	
			super.addPanel(widget);
		}
	}
}
