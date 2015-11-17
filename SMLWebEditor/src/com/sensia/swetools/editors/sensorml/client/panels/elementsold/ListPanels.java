package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;

public class ListPanels implements ISensorMLPanel{

	private List<ISensorMLPanel> panels;
	private VerticalPanel verticalPanel;
	
	public ListPanels() {
		panels = new ArrayList<ISensorMLPanel>();
		verticalPanel = new VerticalPanel();
	}
	
	@Override
	public void add(final ISensorMLPanel sensorPanel){
		panels.add(sensorPanel);
		verticalPanel.add(sensorPanel.getWidget());
	}
	
	public List<ISensorMLPanel> getPanels() {
		return panels;
	}

	@Override
	public Widget getWidget() {
		return verticalPanel;
	}

	@Override
	public String getName() {
		return "";
	}

	@Override
	public String getDescription() {
		return "";
	}
}
