/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
 ******************************* END LICENSE BLOCK ***************************/

package com.sensia.swetools.editors.sensorml.client.renderer;

import com.sensia.relaxNG.RNGElement;
import com.sensia.relaxNG.RNGTagVisitor;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_DEF;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorGenericHorizontalContainerWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.swe.SWESensorCategoryWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.swe.SWESensorCondtionWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.swe.SWESensorCurveWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.swe.SWESensorDataArrayWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.swe.SWESensorDataRecordWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.swe.SWESensorQuantityRangeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.swe.SWESensorQuantityWidget;

/**
 * <p>
 * <b>Title:</b> RNGRenderer
 * </p>
 *
 * <p>
 * <b>Description:</b><br/>
 * Renders content of an RNG grammar describing SWE Common data components using
 * GWT widgets
 * </p>
 *
 * <p>
 * Copyright (c) 2011
 * </p>
 * 
 * @author Alexandre Robin
 * @date Aug 27, 2011
 */
public class RNGRendererSWE extends RNGRenderer implements RNGTagVisitor {
	protected final static String SWE_NS_1 = "http://www.opengis.net/swe/1.0.1";
	protected final static String SWE_NS_2 = "http://www.opengis.net/swe/2.0";

	public RNGRendererSWE() {}

	@Override
	public void visit(RNGElement elt) {
		 if(elt.getName().equals("Quantity")){
			pushAndVisitChildren(new SWESensorQuantityWidget(), elt.getChildren());
		} else if(elt.getName().equals("QuantityRange")){
			pushAndVisitChildren(new SWESensorQuantityRangeWidget(), elt.getChildren());
		} else if(elt.getName().equals("Category")){
			pushAndVisitChildren(new SWESensorCategoryWidget(), elt.getChildren());
		} else if(elt.getName().equals("DataArray")){
			pushAndVisitChildren(new SWESensorDataArrayWidget(), elt.getChildren());
		} else if(elt.getName().equals("Curve")){
			pushAndVisitChildren(new SWESensorCurveWidget(), elt.getChildren());
		} else if(elt.getName().equals("DataRecord")){
			pushAndVisitChildren(new SWESensorDataRecordWidget(), elt.getChildren());
		} else if(elt.getName().equals("condition")){
			pushAndVisitChildren(new SWESensorCondtionWidget(), elt.getChildren());
		} else if(elt.getNamespace().equals(SWE_NS_1) || elt.getNamespace().equals(SWE_NS_2)) {
			pushAndVisitChildren(new SensorGenericHorizontalContainerWidget(elt.getName(), TAG_DEF.SWE, TAG_TYPE.ELEMENT), elt.getChildren());
		} else {
			super.visit(elt);
		}
	}
}