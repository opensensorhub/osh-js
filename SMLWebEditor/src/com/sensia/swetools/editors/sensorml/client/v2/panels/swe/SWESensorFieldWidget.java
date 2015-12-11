package com.sensia.swetools.editors.sensorml.client.v2.panels.swe;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;

public class SWESensorFieldWidget extends AbstractSensorElementWidget{

	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel contentPanel;
	
	public SWESensorFieldWidget(){
		super("field",TAG_DEF.SWE,TAG_TYPE.ELEMENT);
		container = new HorizontalPanel();
		contentPanel = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		contentPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		container.add(contentPanel);
		container.add(defPanel);
		container.setSpacing(5);
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getDef() == TAG_DEF.SWE && widget.getType() == TAG_TYPE.ATTRIBUTE
				&& widget.getName().equals("name")) {
			//skip name attribute
			return;
		}
		
		if(widget.getDef() == TAG_DEF.SWE && widget.getType() == TAG_TYPE.ELEMENT 
				&& (widget.getName().equals("Quantity") || (widget.getName().equals("QuantityRange")))){
			
			contentPanel.add(widget.getPanel());
			contentPanel.add(new HTML(getDotsLine()));	
		} else {
			contentPanel.add(widget.getPanel());
		}
	}

	@Override
	protected void activeMode(MODE mode) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorFieldWidget();
	}
}
