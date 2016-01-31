package com.sensia.swetools.editors.sensorml.client.panels.widgets;

import java.util.List;

import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;

public interface ISensorWidget {

	public enum MODE {
		VIEW,
		EDIT
	}
	
	public enum TAG_DEF {
		SML,
		GML,
		SWE,
		GMD,
		GCO,
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
	
	ISensorWidget getParent();
	
	void setParent(ISensorWidget parent);
	
	List<String> getValues(String parentName);
	
	String getValue(String parentName);
	
	void setValues(String elementName,List<String> values);
	
	void setValue(String elementName,String value);
	
	void refresh();
	
	boolean appendToLine();
	
	void getAdvancedPanel(Panel container);
}
