package com.sensia.swetools.editors.sensorml.client.panels.widgets.sml;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SensorSectionsWidget extends AbstractSensorElementWidget{

	private Panel container;
	private Panel namePanel;
	private Panel descriptionPanel;
	
	private Panel endPanel;
	private Panel startPanel;
	
	public SensorSectionsWidget() {
		super("", TAG_DEF.SML, TAG_TYPE.ELEMENT);
		
		container = new VerticalPanel();
		container.setWidth("1024px");
		namePanel = new HorizontalPanel();
		descriptionPanel = new HorizontalPanel();
		
		container.add(namePanel);
		//draw horizontal line
		container.add(new HTML("<hr  style=\"width:100%;\" />"));
		container.add(descriptionPanel);
		
		container.add(new HTML("<h2>Specifications</h2>"));
		container.add(new HTML("<hr  style=\"width:100%;\" />"));
		
		startPanel = new VerticalPanel();
		container.add(startPanel);
		
		endPanel = new VerticalPanel();
		container.add(endPanel);
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getDef() == TAG_DEF.GML) {
			if(widget.getName().equals("name")){
				namePanel.add(widget.getPanel());
			} else if(widget.getName().equals("description")) {
				descriptionPanel.add(widget.getPanel());
			}
		} else if(widget.getType() == TAG_TYPE.ZERO_OR_MORE){
			endPanel.add(widget.getPanel());
		} else {
			startPanel.add(widget.getPanel());
		}
	}

	@Override
	protected void activeMode(MODE mode) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SensorSectionsWidget();
	}
}
