package com.sensia.swetools.editors.sensorml.client.panels.elementsold;


public abstract class AbstractSensorMLPanel implements ISensorMLPanel{

	private String name;
	private String description;
	
	protected AbstractSensorMLPanel() {
		this.name = "";
		this.description = "";
	}
	
	@Override
	public String getName() {
		return name;
	}
	@Override
	public String getDescription() {
		return description;
	}
	
	public void setName(final String name) {
		this.name = name;
	}
	
	public void setDescription(final String description) {
		this.description = description;
	}
	
	public void add(ISensorMLPanel sensorPanel) {}
	
}
