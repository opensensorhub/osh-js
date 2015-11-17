package com.sensia.swetools.editors.sensorml.client.panels;

import java.util.ArrayList;
import java.util.List;

import com.sensia.swetools.editors.sensorml.client.AbstractWidget;

public class SectionsWidget extends AbstractWidget{

	private List<AbstractWidget> sections;
	
	public void add(AbstractWidget section) {
		if(sections == null) {
			this.sections = new ArrayList<AbstractWidget>();
		}
		sections.add(section);
	}
	
	public List<AbstractWidget> getSections(){
		return sections;
	}
}
