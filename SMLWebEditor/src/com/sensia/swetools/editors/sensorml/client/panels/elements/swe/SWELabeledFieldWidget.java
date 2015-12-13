package com.sensia.swetools.editors.sensorml.client.panels.elements.swe;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGTagList;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class SWELabeledFieldWidget extends AbstractSensorWidget{

	private HorizontalPanel panel;
	
	public SWELabeledFieldWidget(RNGTagList tagList, String label) {
		super("", "");
		
		panel = new HorizontalPanel();
        //panel.addStyleName("swe-simple-field");
        //panel.addStyleName("swe-property-panel");
        String tooltip = tagList.getAnnotation();
        /*if (tooltip != null)
            panel.setTitle(tooltip);
        
        if (label != null)
            panel.add(new Label(label + ":"));*/
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
