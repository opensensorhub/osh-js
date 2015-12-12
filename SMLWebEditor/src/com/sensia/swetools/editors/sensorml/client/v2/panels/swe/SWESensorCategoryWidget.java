package com.sensia.swetools.editors.sensorml.client.v2.panels.swe;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget.TAG_TYPE;

public class SWESensorCategoryWidget extends AbstractSensorElementWidget{

	private HorizontalPanel namePanel;
	private HorizontalPanel categoryPanel;
	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HTML dotSeparatorLabel;
	
	public SWESensorCategoryWidget() {
		super("Category", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		namePanel = new HorizontalPanel();
		categoryPanel = new HorizontalPanel();
		dotSeparatorLabel = new HTML(getDotsLine());
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		namePanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		categoryPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		container.add(namePanel);
		container.add(dotSeparatorLabel);
		container.add(categoryPanel);
		container.add(defPanel);
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void activeMode(MODE mode) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("definition")){
			defPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("name")){
			namePanel.add(widget.getPanel());
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

}
