package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.core.client.GWT;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SWESensorDataRecordWidget extends AbstractSensorElementWidget{

	private Panel container;
	private Panel linePanel;
	private Panel labelPanel;
	private Panel defPanel;
	
	private Panel innerContainer;
	
	private boolean hasLabel= false;
	public SWESensorDataRecordWidget() {
		super("DataRecord", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		container = new VerticalPanel();
		linePanel = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		labelPanel = new HorizontalPanel();
		innerContainer = new VerticalPanel();
		
		linePanel.add(labelPanel);
		linePanel.add(defPanel);
		
		container.add(linePanel);
		container.add(innerContainer);
		
		//innerContainer.addStyleName("swe-dataRecord-vertical-panel");
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void activeMode(MODE mode) {
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getName().equals("label") && widget.getDef() == TAG_DEF.SWE) {
			if(!widget.getElements().isEmpty()) {
				widget.getElements().get(0).getPanel().addStyleName("font-bold");
			}
			labelPanel.add(widget.getPanel());
			hasLabel = true;
		} else if(widget.getName().equals("definition") && widget.getType() == TAG_TYPE.ATTRIBUTE) { 
			defPanel.add(widget.getPanel());
		} else if(widget.getName().equals("field")){
			//container.add(widget.getPanel());
			//find every fields and display it
			List<ISensorWidget> children = widget.getElements();
			
			boolean foundDataRecord = false;
			for(ISensorWidget child : children){
				if(child.getName().equals("DataRecord")) {
					foundDataRecord = true;
					break;
				} 
			}
			
			if(!foundDataRecord) {
				innerContainer.add(widget.getPanel());
			} else {
				for(ISensorWidget child : children){
					if(child.getName().equals("DataRecord")) {
						//skip DataRecord element
						for(ISensorWidget dataRecordChild : child.getElements()) {
							addSensorWidget(dataRecordChild);
						}
					} else {
						//TBD: add intermediate DataRecord name?
						//innerContainer.add(child.getPanel());
					}
				}
			}
			
			if(hasLabel) {
				innerContainer.addStyleName("swe-dataRecord-vertical-panel");
			} else {
				innerContainer.addStyleName("swe-dataRecord-nolabel-vertical-panel");
			}
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorDataRecordWidget();
	}
	
	public APPENDER appendTo() {
		return APPENDER.OVERRIDE_LINE;
	}
}
