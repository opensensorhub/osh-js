package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SWESensorCategoryWidget extends AbstractSensorElementWidget{

	private HorizontalPanel categoryPanel;
	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	
	public SWESensorCategoryWidget() {
		super("Category", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		categoryPanel = new HorizontalPanel();
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		categoryPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		container.add(categoryPanel);
		container.add(defPanel);
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	protected Panel getEditPanel() {
		return null;
	}
	
	@Override
	protected void activeMode(MODE mode) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("definition")){
			defPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("value")){
			categoryPanel.add(widget.getPanel());
		} else {
			categoryPanel.add(widget.getPanel());
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorCategoryWidget();
	}
	
	@Override
	public boolean appendToLine() {
		return true;
	}

}
