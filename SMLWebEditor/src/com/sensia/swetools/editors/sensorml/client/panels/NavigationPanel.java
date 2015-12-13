package com.sensia.swetools.editors.sensorml.client.panels;

import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.IParsingObserver;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;

public class NavigationPanel extends Composite implements IParsingObserver{
	
	private static final long serialVersionUID = -1961950089785510298L;

	private VerticalPanel verticalPanel;
	
	public NavigationPanel(final RNGProcessorSML sgmlEditorProcessor){
		sgmlEditorProcessor.addObserver(this);
		verticalPanel = new VerticalPanel();
		verticalPanel.setSpacing(50);
		initWidget(verticalPanel);
	}

	@Override
	public void parseDone(final ISensorWidget topElement) {
		verticalPanel.clear();
		//for(final AbstractSensorWidget section : topElements) {
		//	verticalPanel.add(new HTML("<a href=\"\">"+section.getName()+"</a>"));
		//}
	}
}
