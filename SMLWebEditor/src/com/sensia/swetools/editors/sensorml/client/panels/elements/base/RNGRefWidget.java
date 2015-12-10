package com.sensia.swetools.editors.sensorml.client.panels.elements.base;

import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGRef;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

/**
 * Create the generic panel for RNG Ref
 * @author mathieu dhainaut
 */
public class RNGRefWidget extends AbstractSensorWidget{

	private Label label;
	private Panel container;
	
	public RNGRefWidget(final RNGRef ref){
		super("Error fetching referenced pattern: " + ref.getPatternName(),"");
		//widget part
		Label label = new Label(getName());
        label.addStyleName("rng-error");
        
        //panel part
        container = new FlowPanel();
        container.add(label);
	}
	@Override
	public Widget getWidget() {
		return label;
	}

	@Override
	public Panel getPanel() {
		return container;
	}

}
