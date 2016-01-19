package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SWESensorQuantityRangeWidget extends AbstractSensorElementWidget{

	private HorizontalPanel minPanel;
	private HorizontalPanel maxPanel;
	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel uomPanel;
	
	private VerticalPanel advancedPanel;
	
	public SWESensorQuantityRangeWidget() {
		super("QuantityRange",TAG_DEF.SWE,TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		minPanel = new HorizontalPanel();
		maxPanel = new HorizontalPanel();
		uomPanel = new HorizontalPanel();
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		uomPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		minPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		maxPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		container.add(minPanel);
		container.add(new HTML("&nbsp;&nbsp;to&nbsp;&nbsp;"));
		container.add(maxPanel);
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
		} else if(widget.getName().equals("value") && widget.getType() == TAG_TYPE.ELEMENT && widget.getDef() == TAG_DEF.SWE){
			if(widget.getElements().size() >= 1) {
				minPanel.add(widget.getElements().get(0).getPanel());
			}
			if(widget.getElements().size() >= 2) {
				maxPanel.add(widget.getElements().get(1).getPanel());
			}
		} else {
			uomPanel.add(widget.getPanel());
		}
		
		//add advanced panel
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorQuantityRangeWidget();
	}
	
	@Override
	public boolean appendToLine() {
		return true;
	}
}
