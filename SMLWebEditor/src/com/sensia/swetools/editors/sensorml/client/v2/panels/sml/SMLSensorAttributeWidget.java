package com.sensia.swetools.editors.sensorml.client.v2.panels.sml;

import com.google.gwt.core.client.GWT;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Image;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.v2.panels.base.SensorAttributeWidget;

public class SMLSensorAttributeWidget extends SensorAttributeWidget{

	public SMLSensorAttributeWidget(RNGAttribute attribute) {
		super(attribute.getName(),TAG_DEF.SML,TAG_TYPE.ATTRIBUTE);
		
		container = new HorizontalPanel();
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
	}
	
	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(getName().equals("definition") && widget.getType() == TAG_TYPE.VALUE) {
			Image defImage = new Image(GWT.getModuleBaseURL()+"images/icon_info.png");
			defImage.setTitle(widget.getName());
			container.add(defImage);
		} else {
			super.addSensorWidget(widget);
		}
	}
}
