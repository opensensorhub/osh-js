package com.sensia.swetools.editors.sensorml.client.panels.widgets.gml;

import com.sensia.relaxNG.RNGElement;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorGenericHorizontalContainerWidget;

/**
 * Corresponding to : <element name="gml:description">
 * @author mathieu dhainaut
 *
 */
public class GMLSensorWidget extends SensorGenericHorizontalContainerWidget{

	public GMLSensorWidget(final RNGElement elt) {
		super(elt.getName(), TAG_DEF.GML, TAG_TYPE.ELEMENT);
	}
}
