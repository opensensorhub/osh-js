package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGValue;
import com.sensia.swetools.editors.sensorml.client.AbstractWidget;

/**
 * Create the generic panel for RNG Attribute
 * @author mathieu dhainaut
 */
public class RNGValueWidget extends AbstractWidget{

	private HorizontalPanel panel;
	
	public RNGValueWidget(RNGValue val) {
		super(val.getText(),"");
		panel = new HorizontalPanel();
        panel.setSpacing(5);
        panel.add(new Label(val.getText()));
	}
	
	@Override
	public Widget getWidget() {
		return panel;
	}

	@Override
	public Panel getPanel() {
		return panel;
	}

}
