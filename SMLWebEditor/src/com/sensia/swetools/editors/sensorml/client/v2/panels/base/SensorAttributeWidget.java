package com.sensia.swetools.editors.sensorml.client.v2.panels.base;


public class SensorAttributeWidget extends SensorGenericHorizontalContainerWidget{

	public SensorAttributeWidget(String name) {
		super(name, TAG_DEF.RNG, TAG_TYPE.ATTRIBUTE);
	}
	
	public SensorAttributeWidget(String name,TAG_DEF def, TAG_TYPE type) {
		super(name, def, type);
	}
}
