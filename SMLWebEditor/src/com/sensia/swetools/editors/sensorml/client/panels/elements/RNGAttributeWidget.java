package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.swetools.editors.sensorml.client.AbstractWidget;

/**
 * Create the generic panel for RNG Attribute
 * @author mathieu dhainaut
 */
public class RNGAttributeWidget extends AbstractWidget{

	private HorizontalPanel panel;
	
	public RNGAttributeWidget(final RNGAttribute attribute) {
		super(toNiceLabel(attribute.getName()) + ":","");
		panel = new HorizontalPanel();
        panel.setSpacing(5);
        panel.add(new Label(getName()));
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
