package com.sensia.swetools.editors.sensorml.client.v2;

import java.util.List;

import com.google.gwt.user.client.ui.Panel;

public interface ISensorWidget {

	public enum MODE {
		VIEW,
		EDIT
	}
	
	public enum TAG_DEF {
		SML,
		GML,
		SWE,
		RNG
	}
	
	public enum TAG_TYPE {
		ATTRIBUTE,
		VALUE,
		ELEMENT,
		ZERO_OR_MORE,
		DATA,
		CHOICE
	}
	
	String getName();
	
	void setName(String name);
	
	void switchMode(MODE mode);
	
	TAG_DEF getDef();
	
	TAG_TYPE getType();
	
	List<ISensorWidget> getElements();
	
	void addElement(ISensorWidget element);
	
	Panel getPanel();
	
	ISensorWidget cloneSensorWidget();
}
