package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGText;
import com.sensia.swetools.editors.sensorml.client.AbstractWidget;

/**
 * Create the generic panel for RNG Text
 * @author mathieu dhainaut
 */
public class RNGTextWidget extends AbstractWidget{

	private TextBox textBox;
	private FlowPanel container;
	
	public RNGTextWidget(final RNGText text) {
		super("", "");
		
		String textStr = "";
        if (text.getText() != null) {
        	textStr = text.getText();
        }
        
		textBox = new TextBox();
        textBox.setVisibleLength(30);
        textBox.setText(textStr);
        
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
