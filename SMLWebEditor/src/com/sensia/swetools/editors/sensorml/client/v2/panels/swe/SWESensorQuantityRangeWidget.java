package com.sensia.swetools.editors.sensorml.client.v2.panels.swe;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;

public class SWESensorQuantityRangeWidget extends AbstractSensorElementWidget{

	private HorizontalPanel namePanel;
	private HorizontalPanel minPanel;
	private HorizontalPanel maxPanel;
	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel uomPanel;
	private HTML dotSeparatorLabel;
	
	public SWESensorQuantityRangeWidget() {
		super("QuantityRange",TAG_DEF.SWE,TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		namePanel = new HorizontalPanel();
		minPanel = new HorizontalPanel();
		maxPanel = new HorizontalPanel();
		uomPanel = new HorizontalPanel();
		dotSeparatorLabel = new HTML(getDotsLine());
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		uomPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		namePanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		minPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		maxPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		container.add(namePanel);
		container.add(dotSeparatorLabel);
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
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("name")){
			namePanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("uom")){
			uomPanel.add(widget.getPanel());
		} else if(widget.getName().equals("value") && widget.getType() == TAG_TYPE.ELEMENT && widget.getDef() == TAG_DEF.RNG){
			if(widget.getElements().size() >= 1) {
				minPanel.add(widget.getElements().get(0).getPanel());
			}
			if(widget.getElements().size() >= 2) {
				maxPanel.add(widget.getElements().get(1).getPanel());
			}
		} else {
			uomPanel.add(widget.getPanel());
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorQuantityRangeWidget();
	}

}
