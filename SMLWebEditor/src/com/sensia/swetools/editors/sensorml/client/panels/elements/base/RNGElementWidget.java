package com.sensia.swetools.editors.sensorml.client.panels.elements.base;

import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGElement;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

/**
 * Create the generic panel for RNG Element
 * @author mathieu dhainaut
 *
 */
public class RNGElementWidget extends AbstractSensorWidget{

	private VerticalPanel panel;
	
	public RNGElementWidget(final RNGElement elt){
		super(toNiceLabel(elt.getName()),"");
		panel = new VerticalPanel();
        panel.add(new Label(getName()));
        panel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
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
