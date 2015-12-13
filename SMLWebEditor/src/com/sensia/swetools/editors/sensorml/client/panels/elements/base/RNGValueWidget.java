package com.sensia.swetools.editors.sensorml.client.panels.elements.base;

import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGValue;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

/**
 * Create the generic panel for RNG Attribute
 * @author mathieu dhainaut
 */
public class RNGValueWidget extends AbstractSensorWidget{

	private HorizontalPanel panel;
	
	public RNGValueWidget(RNGValue val) {
		super(val.getText(),"");
		panel = new HorizontalPanel();
		panel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
        panel.setSpacing(10);
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
