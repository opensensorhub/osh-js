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
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorGenericVerticalContainerWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.swe.SWESensorCategoryWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.swe.SWESensorFieldWidget;
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
	protected final static String SWE_NS = "http://www.opengis.net/swe/1.0.1";

	public RNGRendererSWE() {}

	@Override
	public void visit(RNGElement elt) {
		if(elt.getName().equals("DataRecord")) {
			pushAndVisitChildren(new SensorGenericVerticalContainerWidget(elt.getName(), TAG_DEF.SWE, TAG_TYPE.ELEMENT), elt.getChildren());
		} else if(elt.getName().equals("field")){
			pushAndVisitChildren(new SWESensorFieldWidget(), elt.getChildren());
		} else if(elt.getName().equals("Quantity")){
			pushAndVisitChildren(new SWESensorQuantityWidget(), elt.getChildren());
		} else if(elt.getName().equals("QuantityRange")){
			pushAndVisitChildren(new SWESensorQuantityRangeWidget(), elt.getChildren());
		}else if(elt.getName().equals("Category")){
			pushAndVisitChildren(new SWESensorCategoryWidget(), elt.getChildren());
		}else {
			super.visit(elt);
		}
	}
}