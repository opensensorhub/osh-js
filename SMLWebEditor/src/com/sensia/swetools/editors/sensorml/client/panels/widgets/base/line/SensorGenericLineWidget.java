package com.sensia.swetools.editors.sensorml.client.panels.widgets.base.line;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.FocusPanel;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_DEF;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;

public class SensorGenericLineWidget extends AbstractSensorElementWidget{
	
	protected VerticalPanel multiLinesPanel;
	protected HorizontalPanel linePanel;
	protected Panel labelPanel;
	protected HTML dotSeparatorLabel;
	protected Panel optPanel;
	protected Panel defPanel;
	
	private boolean isLabelProvided = false;
	
	public SensorGenericLineWidget() {
		super("", TAG_DEF.RNG,TAG_TYPE.ELEMENT);
		linePanel = new HorizontalPanel();
		labelPanel = new HorizontalPanel();
		dotSeparatorLabel = new HTML(getDotsLine());
		optPanel = new HorizontalPanel();
		multiLinesPanel = new VerticalPanel();
		
		//for generic ones
		defPanel = new HorizontalPanel();
		
		//order elements
		linePanel.add(labelPanel);
		linePanel.add(dotSeparatorLabel);
		linePanel.add(optPanel);
		linePanel.add(defPanel);
		
		multiLinesPanel.add(linePanel);
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("name")){
			//provide name as label only if label does not exist
			if(!isLabelProvided) {
				//get the associated value
				ISensorWidget valueWidget = widget.getElements().get(0);
				labelPanel.add(new HTML(splitAndCapitalize(valueWidget.getName())));
			}
		} 
		//handle generic panel like identifier
		else if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("definition")){
			defPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.VALUE ){
			optPanel.add(widget.getPanel());
		} else {
			//looking for label
			//prior display for label if exists
			for(ISensorWidget child : widget.getElements()) {
				//for <element name="swe:label"> or <element name="gml:name">
				if(child.getType() == TAG_TYPE.ELEMENT && (child.getName().equals("label") || child.getName().equals("name"))) {
					labelPanel.clear();
					labelPanel.add(child.getPanel());
					isLabelProvided=true;
					break;
				}
			}
			optPanel.add(widget.getPanel());
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SensorGenericLineWidget();
	}

	@Override
	public Panel getPanel() {
		return multiLinesPanel;
	}

	@Override
	protected void activeMode(MODE mode) {
	}

}
