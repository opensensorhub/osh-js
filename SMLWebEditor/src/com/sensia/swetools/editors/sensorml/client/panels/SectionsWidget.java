package com.sensia.swetools.editors.sensorml.client.panels;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

public class SectionsWidget extends AbstractSensorWidget{

	public SectionsWidget() {
		super("", "");
	}

	private List<AbstractSensorWidget> sections;
	
	private Panel container;
	
	public void add(AbstractSensorWidget section) {
		if(sections == null) {
			this.sections = new ArrayList<AbstractSensorWidget>();
			container = new FlowPanel();
		}
		sections.add(section);
		container.add(section.getWidget());
	}
	
	public List<AbstractSensorWidget> getSections(){
		return sections;
	}

	@Override
	public Widget getWidget() {
		return container;
	}

	@Override
	public Panel getPanel() {
		return container;
	}
}
