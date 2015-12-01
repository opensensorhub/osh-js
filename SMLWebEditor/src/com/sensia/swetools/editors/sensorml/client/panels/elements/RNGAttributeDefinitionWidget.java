package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.core.client.GWT;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Image;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class RNGAttributeDefinitionWidget extends AbstractSensorWidget{

	private HorizontalPanel container;
	
	public RNGAttributeDefinitionWidget(RNGAttribute attribute) {
		super("","");
		String def = attribute.getChildValue().getText();
		container = new HorizontalPanel();
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		Image defImage = new Image(GWT.getModuleBaseURL()+"images/icon_info.png");
		defImage.setTitle(def);
		container.add(defImage);
	}

	@Override
	public Widget getWidget() {
		return container;
	}

	@Override
	public Panel getPanel() {
		return container;
	}

}
