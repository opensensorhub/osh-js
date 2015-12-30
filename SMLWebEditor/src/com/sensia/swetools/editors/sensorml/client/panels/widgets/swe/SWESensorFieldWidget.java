package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

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
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getDef() == TAG_DEF.SML && widget.getType() == TAG_TYPE.ATTRIBUTE
				&& widget.getName().equals("name")) {
			//skip name attribute
			return;
		}
		contentPanel.add(widget.getPanel());
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
