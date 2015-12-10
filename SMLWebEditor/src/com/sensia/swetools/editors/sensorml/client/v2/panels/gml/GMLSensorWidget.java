package com.sensia.swetools.editors.sensorml.client.v2.panels.gml;

import com.sensia.relaxNG.RNGElement;
import com.sensia.swetools.editors.sensorml.client.v2.panels.base.SensorGenericHorizontalContainerWidget;

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
