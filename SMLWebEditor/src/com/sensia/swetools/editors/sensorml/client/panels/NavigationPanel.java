package com.sensia.swetools.editors.sensorml.client.panels;

import java.util.List;

import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.AbstractWidget;
import com.sensia.swetools.editors.sensorml.client.IParsingObserver;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;

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
	public void parseDone(final List<AbstractWidget> topElements) {
		verticalPanel.clear();
		for(final AbstractWidget section : topElements) {
			verticalPanel.add(new HTML("<a href=\"\">"+section.getName()+"</a>"));
		}
	}
}
