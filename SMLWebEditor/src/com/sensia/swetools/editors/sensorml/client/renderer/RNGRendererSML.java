/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
 ******************************* END LICENSE BLOCK ***************************/

package com.sensia.swetools.editors.sensorml.client.renderer;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGElement;
import com.sensia.relaxNG.RNGGrammar;
import com.sensia.relaxNG.RNGTagVisitor;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_DEF;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.gml.GMLSensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.sml.SMLSensorAttributeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.sml.SMLSensorIdentifierWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.sml.SensorSectionWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.sml.SensorSectionsWidget;

/**
 * <p>
 * <b>Title:</b> RNGRenderer
 * </p>
 *
 * <p>
 * <b>Description:</b><br/>
 * Renders content of an RNG grammar using GWT widgets
 * </p>
 *
 * <p>
 * Copyright (c) 2011
 * </p>
 * 
 * @author Alexandre Robin
 * @date Aug 27, 2011
 */
public class RNGRendererSML extends RNGRendererSWE implements RNGTagVisitor {

	private Map<String,String> renderSectionsList = new HashMap<String,String>();
	private Map<String,RENDER_TYPE> renderElementList = new HashMap<String,RENDER_TYPE>();
	private Set<String> skipList = new HashSet<String>();
	
	protected final static String SML_NS = "http://www.opengis.net/sensorML/1.0.1";
	protected final static String GML_NS = "http://www.opengis.net/gml";
	
	enum RENDER_TYPE {
		GENERIC_HORIZONTAL,
		GENERIC_VERTICAL
	}
	
	public RNGRendererSML() {
		//render section names
		renderSectionsList.put("identification","Identification");
		renderSectionsList.put("characteristics","Custom");
		renderSectionsList.put("outputs", "Outputs");
		renderSectionsList.put("inputs", "Inputs");
		renderSectionsList.put("localReferenceFrame", "Local Reference Frame");
		renderSectionsList.put("parameters", "Parameters");
		renderSectionsList.put("method", "Method");
		
		//render default defined elements
		
		renderElementList.put("OutputList", RENDER_TYPE.GENERIC_VERTICAL);
		renderElementList.put("DataRecord", RENDER_TYPE.GENERIC_VERTICAL);
		renderElementList.put("InputList", RENDER_TYPE.GENERIC_VERTICAL);
		renderElementList.put("IdentifierList", RENDER_TYPE.GENERIC_VERTICAL);
		renderElementList.put("ClassifierList", RENDER_TYPE.GENERIC_VERTICAL);
		
		//skip list
		skipList.add("Component");
		skipList.add("ProcessModel");
		skipList.add("Document");
		skipList.add("Term");
		skipList.add("contactInfo");
		skipList.add("Security");
		skipList.add("ParameterList");
	}

	@Override
	public void visit(RNGGrammar grammar) { 
		//create top root element
		push(new SensorSectionsWidget());
		super.visit(grammar);
	}

	@Override
	public void visit(RNGElement elt) {
		String eltName = elt.getName();
		String nsUri = elt.getNamespace();

		if (nsUri.equals(SWE_NS)) {
			super.visit(elt);
			return;
		}
		
		//skip the element and visit children
		if(skipList.contains(eltName)) {
			visitChildren(elt.getChildren());
			return;
		}
		
		//if element is a section
		if(getStackSize() == 1) {
		
			ISensorWidget widget = null;
			//Add Name / Description
			if(nsUri.equals(GML_NS)) {
				widget = new GMLSensorWidget(elt);
			} else {
				//it is a non listed section
				//add default name
				String sectionName = "No Supported Name";
				
				if(renderSectionsList.containsKey(eltName)) {
					//for custom is to get section name from attribute->value children
					//lets the renderer find them and add to the section
					sectionName = renderSectionsList.get(eltName);
				} 
				widget = new SensorSectionWidget(sectionName);
			}
			pushAndVisitChildren(widget,elt.getChildren());
		} else if(renderElementList.containsKey(eltName)) { 
			RENDER_TYPE type = renderElementList.get(eltName);
			
			ISensorWidget widget = null;
			switch(type) {
				case GENERIC_VERTICAL : widget = renderVerticalWidget(eltName, TAG_DEF.SML, TAG_TYPE.ELEMENT);break;
				case GENERIC_HORIZONTAL : widget = renderHorizontalWidget(eltName, TAG_DEF.SML, TAG_TYPE.ELEMENT);break;
				default:break;
			}
			pushAndVisitChildren(widget, elt.getChildren());
		} else {
			//it is a sub element
			if(nsUri.equals(GML_NS)) {
				//TODO: default = skip ??
				//visitChildren(elt.getChildren());
				super.visit(elt);
			} else if(nsUri.equals(SML_NS)) {
				ISensorWidget widget = null;
				//TODO: to be completed : identifier, Value, classification, validTime, securityConstraint,
				if(eltName.equals("identifier")){
					widget = new SMLSensorIdentifierWidget();
				} 
				
				if(widget == null) {
					super.visit(elt);
				} else {
					pushAndVisitChildren(widget, elt.getChildren());
				}
			} else {
				super.visit(elt);
			}
		}
	}

	@Override
	public void visit(RNGAttribute att) {
		if(att.getName().equals("definition") || att.getName().equals("name")) {
			pushAndVisitChildren(new SMLSensorAttributeWidget(att), att.getChildren());
		} else {
			super.visit(att);
		}
	}
}
