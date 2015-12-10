package com.sensia.swetools.editors.sensorml.client.panels.elements.base;

import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGData;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

/**
 * Create the generic panel for RNG data
 * @author mathieu dhainaut
 */
public class RNGDataWidget extends AbstractSensorWidget{

	private TextBox textBox;
	private Panel container;
	
	public RNGDataWidget(RNGData<?> data) {
		super("", "");
		
		textBox = new TextBox();
        textBox.setVisibleLength(30);
        
        if (data.getValue() != null) {
            textBox.setText(data.getValue().toString());
        }
        
        container = new FlowPanel();
        container.add(textBox);
	}

	@Override
	public Widget getWidget() {
		return textBox;
	}

	@Override
	public Panel getPanel() {
		return container;
	}

}
