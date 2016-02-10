package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SWESensorQuantityWidget extends AbstractSensorElementWidget{

	private HorizontalPanel quantityPanel;
	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel uomPanel;
	private HorizontalPanel constraintPanel;
	
	public SWESensorQuantityWidget() {
		super("Quantity",TAG_DEF.SWE,TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		quantityPanel = new HorizontalPanel();
		uomPanel = new HorizontalPanel();
		constraintPanel = new HorizontalPanel();
		//advancedPanel = new HorizontalPanel();
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		uomPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		quantityPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		constraintPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		container.add(quantityPanel);
		container.add(constraintPanel);
		container.add(uomPanel);
		container.add(defPanel);
		
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
		if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("definition")){
			defPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("uom")){
			uomPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("value")){
			quantityPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("constraint")){
			constraintPanel.add(widget.getPanel());
		}else {
			uomPanel.add(widget.getPanel());
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorQuantityWidget();
	}

	@Override
	public APPENDER appendTo() {
		return APPENDER.HORIZONTAL;
	}
}
