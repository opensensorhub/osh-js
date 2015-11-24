package com.sensia.swetools.editors.sensorml.client.panels;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractWidget;

public class SectionsWidget extends AbstractWidget{

	public SectionsWidget() {
		super("", "");
	}

	private List<AbstractWidget> sections;
	
	private Panel container;
	
	public void add(AbstractWidget section) {
		if(sections == null) {
			this.sections = new ArrayList<AbstractWidget>();
			container = new FlowPanel();
		}
		sections.add(section);
		container.add(section.getWidget());
	}
	
	public List<AbstractWidget> getSections(){
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
