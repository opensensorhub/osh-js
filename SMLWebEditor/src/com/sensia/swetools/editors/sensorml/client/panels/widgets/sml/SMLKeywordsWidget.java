package com.sensia.swetools.editors.sensorml.client.panels.widgets.sml;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SMLKeywordsWidget extends AbstractSensorElementWidget {

	private HorizontalPanel container;
	private HTML codeSpace;
	private HTML keywords;
	
	public SMLKeywordsWidget() {
		super("KeywordList", TAG_DEF.SML, TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		codeSpace = new HTML();
		keywords = new HTML();
		
		container.add(new HTML("Keywords &nbsp;"));
		container.add(codeSpace);
		container.add(keywords);
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
		if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("codeSpace")) {
			codeSpace.setHTML("("+widget.getValue("href")+"):&nbsp;");
		} else if(widget.getName().equals("keyword")) {
			keywords.setHTML(keywords.getHTML()+"&nbsp;&nbsp;"+widget.getValue("keyword"));
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SMLKeywordsWidget();
	}

}
