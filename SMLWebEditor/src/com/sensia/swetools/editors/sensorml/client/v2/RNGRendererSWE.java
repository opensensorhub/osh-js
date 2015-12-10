/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
 ******************************* END LICENSE BLOCK ***************************/

package com.sensia.swetools.editors.sensorml.client.v2;

import java.util.List;
import java.util.Map;

import com.google.gwt.core.shared.GWT;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGElement;
import com.sensia.relaxNG.RNGTag;
import com.sensia.relaxNG.RNGTagList;
import com.sensia.relaxNG.RNGTagVisitor;
import com.sensia.relaxNG.RNGValue;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGAttributeDefinitionWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGAttributeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.base.RNGValueWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.sml.SMLIdentifierWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEDataCategoryWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEDataComponentPropertyWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEDataComponentWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEDataFieldWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEDataQuantityRangeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEDataQuantityWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEDataRecordNameWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEDataRecordUOMWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEDataRecordWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWELabeledFieldWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.swe.SWEPropertyWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget.TAG_DEF;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget.TAG_TYPE;
import com.sensia.swetools.editors.sensorml.client.v2.panels.base.SensorGenericVerticalContainerWidget;

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

	public RNGRendererSWE() {
	}

	@Override
	public void visit(RNGElement elt) {
		if(elt.getName().equals("DataRecord")) {
			pushAndVisitChildren(new SensorGenericVerticalContainerWidget(elt.getName(), TAG_DEF.SWE, TAG_TYPE.ELEMENT), elt.getChildren());
		} else if(elt.getName().equals("field")){
			
		} else {
			super.visit(elt);
		}
	}

	@Override
	public void visit(RNGAttribute att) {
		super.visit(att);
	}

}