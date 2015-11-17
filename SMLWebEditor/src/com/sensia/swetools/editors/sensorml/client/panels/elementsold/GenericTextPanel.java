package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.core.shared.GWT;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.Widget;

public class GenericTextPanel extends AbstractSensorMLPanel{

	private static final String CSS_CLASS = "";
	
	private TextBox textBox;
	public GenericTextPanel(final String text) {
		super();
		setName("");
		textBox = new TextBox();
        textBox.setVisibleLength(30);
        if (text != null) {
            textBox.setText(text);
        }
		//textBox.addStyleName(CSS_CLASS);
	}

	@Override
	public Widget getWidget() {
		return textBox;
	}
}