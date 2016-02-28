package com.sensia.swetools.editors.sensorml.client.panels.widgets.base;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

/**
 * Generic horizontal container
 * @author mathieu dhainaut
 *
 */
public class SensorGenericHorizontalContainerWidget extends AbstractSensorElementWidget{

	protected HorizontalPanel container;
	
	public SensorGenericHorizontalContainerWidget(String name, TAG_DEF def, TAG_TYPE type) {
		super(name, def, type);
		container = new HorizontalPanel();
		//container.setSpacing(5);
		container.addStyleName("swe-generic-horizontal-panel");
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget instanceof SensorGenericHorizontalContainerWidget) {
			for(ISensorWidget child : widget.getElements()) {
				container.add(child.getPanel());
			}
		}else {
			container.add(widget.getPanel());
		}
		container.add(new HTML("&nbsp;&nbsp;"));
	}

	@Override
	protected void activeMode(MODE mode) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SensorGenericHorizontalContainerWidget(getName(),getDef(),getType());
	}
}
