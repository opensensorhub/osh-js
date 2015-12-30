package com.sensia.swetools.editors.sensorml.client.panels.widgets.sml;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SMLSensorIdentifierWidget extends AbstractSensorElementWidget{

	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel contentPanel;
	
	public SMLSensorIdentifierWidget(){
		super("identifier",TAG_DEF.SML,TAG_TYPE.ELEMENT);
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
		if(widget.getDef() == TAG_DEF.SML && widget.getType() == TAG_TYPE.ATTRIBUTE 
				&& widget.getName().equals("definition")){
			defPanel.add(widget.getPanel());
		} else if(widget.getDef() == TAG_DEF.SML && widget.getType() == TAG_TYPE.ATTRIBUTE
			&& widget.getName().equals("name")){
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
		return new SMLSensorIdentifierWidget();
	}
}
