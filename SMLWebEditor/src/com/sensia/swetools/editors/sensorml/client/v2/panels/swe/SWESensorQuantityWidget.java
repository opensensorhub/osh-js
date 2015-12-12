package com.sensia.swetools.editors.sensorml.client.v2.panels.swe;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;

public class SWESensorQuantityWidget extends AbstractSensorElementWidget{

	private HorizontalPanel namePanel;
	private HorizontalPanel quantityPanel;
	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel uomPanel;
	private HTML dotSeparatorLabel;
	
	
	public SWESensorQuantityWidget() {
		super("Quantity",TAG_DEF.SWE,TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		namePanel = new HorizontalPanel();
		quantityPanel = new HorizontalPanel();
		uomPanel = new HorizontalPanel();
		dotSeparatorLabel = new HTML(getDotsLine());
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		uomPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		namePanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		quantityPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		container.add(namePanel);
		container.add(dotSeparatorLabel);
		container.add(quantityPanel);
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
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("name")){
			namePanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("uom")){
			uomPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("value")){
			quantityPanel.add(widget.getPanel());
		} else {
			uomPanel.add(widget.getPanel());
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorQuantityWidget();
	}

}
