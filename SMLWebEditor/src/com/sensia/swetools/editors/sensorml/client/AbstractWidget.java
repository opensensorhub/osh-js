package com.sensia.swetools.editors.sensorml.client;

import com.google.gwt.user.client.ui.Widget;

public class AbstractWidget{

	private String name;
	
	private String description;

	private Widget widget;
	
	public Widget getWidget() {
		return widget;
	}

	public void setWidget(Widget widget) {
		this.widget = widget;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
