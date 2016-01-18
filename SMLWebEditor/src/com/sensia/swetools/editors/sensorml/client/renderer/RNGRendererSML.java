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

import com.google.gwt.core.shared.GWT;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGElement;
import com.sensia.relaxNG.RNGGrammar;
import com.sensia.relaxNG.RNGTagVisitor;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_DEF;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorGenericHorizontalContainerWidget;
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
	private Map<String,RENDER_LIST_TYPE> renderElementList = new HashMap<String,RENDER_LIST_TYPE>();
	private Map<String,RENDER_ELEMENT_TYPE> renderElements= new HashMap<String,RENDER_ELEMENT_TYPE>();
	
	private Set<String> skipList = new HashSet<String>();
	
	protected final static String SML_NS_1 = "http://www.opengis.net/sensorML/1.0.1";
	protected final static String SML_NS_2 = "http://www.opengis.net/sensorML/2.0";
	
	protected final static String GML_NS_1 = "http://www.opengis.net/gml";
	protected final static String GML_NS_2 = "http://www.opengis.net/gml/3.2";
	
	
	enum RENDER_LIST_TYPE {
		GENERIC_HORIZONTAL,
		GENERIC_VERTICAL
	}
	
	enum RENDER_ELEMENT_TYPE {
		LINE
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
		
		//render default defined list elements
		renderElementList.put("OutputList", RENDER_LIST_TYPE.GENERIC_VERTICAL);
		renderElementList.put("InputList", RENDER_LIST_TYPE.GENERIC_VERTICAL);
		renderElementList.put("IdentifierList", RENDER_LIST_TYPE.GENERIC_VERTICAL);
		renderElementList.put("ClassifierList", RENDER_LIST_TYPE.GENERIC_VERTICAL);
		renderElementList.put("ParameterList", RENDER_LIST_TYPE.GENERIC_VERTICAL);
		
		//render default defined elements
		renderElements.put("input",RENDER_ELEMENT_TYPE.LINE);
		renderElements.put("output",RENDER_ELEMENT_TYPE.LINE);
		renderElements.put("parameter", RENDER_ELEMENT_TYPE.LINE);
		renderElements.put("field", RENDER_ELEMENT_TYPE.LINE);
		renderElements.put("identifier", RENDER_ELEMENT_TYPE.LINE);
		renderElements.put("elementCount", RENDER_ELEMENT_TYPE.LINE);
		
		//skip list
		skipList.add("Component");
		skipList.add("ProcessModel");
		skipList.add("Document");
		skipList.add("Term");
		skipList.add("contactInfo");
		skipList.add("Security");
		skipList.add("ParameterList");
		skipList.add("PhysicalComponent");
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

		//skip the element and visit children
		if(skipList.contains(eltName)) {
			visitChildren(elt.getChildren());
			return;
		}
		
		//if element is a section
		if(getStackSize() == 1) {
		
			ISensorWidget widget = null;
			//Add Name / Description
			//TODO: may add SWE/SML support?
			if(nsUri.equals(GML_NS_1) || nsUri.equals(GML_NS_2)) {
				widget = new GMLSensorWidget(elt);
			} else {
				//it is a non pre-defined section
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
		} else {
			//get ns
			TAG_DEF ns = TAG_DEF.RNG;
			
			if (nsUri.equals(SML_NS_1) || nsUri.equals(SML_NS_2)) {
				ns = TAG_DEF.SML;
			} else if (nsUri.equals(SWE_NS_1) || nsUri.equals(SWE_NS_2)) {
				ns = TAG_DEF.SWE;
			} else if (nsUri.equals(GML_NS_1) || nsUri.equals(GML_NS_2)) {
				ns = TAG_DEF.GML;
			} 
			
			if(renderElementList.containsKey(eltName)) { 
				RENDER_LIST_TYPE type = renderElementList.get(eltName);
				
				ISensorWidget widget = null;
				
				
				switch(type) {
					case GENERIC_VERTICAL : widget = renderVerticalWidget(eltName, ns, TAG_TYPE.ELEMENT);break;
					case GENERIC_HORIZONTAL : widget = renderHorizontalWidget(eltName, ns, TAG_TYPE.ELEMENT);break;
					default:break;
				}
				pushAndVisitChildren(widget, elt.getChildren());
			}  else if(renderElements.containsKey(eltName)) { 
				RENDER_ELEMENT_TYPE type = renderElements.get(eltName);
				
				ISensorWidget widget = null;
				switch(type) {
					case LINE : widget = renderLineWidget(eltName, ns, TAG_TYPE.ELEMENT);break;
					default:break;
				}
				pushAndVisitChildren(widget, elt.getChildren());
			} else {
				if(nsUri.equals(GML_NS_1) || nsUri.equals(GML_NS_2)) {
					pushAndVisitChildren(new SensorGenericHorizontalContainerWidget(elt.getName(), TAG_DEF.GML, TAG_TYPE.ELEMENT), elt.getChildren());
				} else if (nsUri.equals(SML_NS_1) || nsUri.equals(SML_NS_2)) {
					pushAndVisitChildren(new SensorGenericHorizontalContainerWidget(elt.getName(), TAG_DEF.SML, TAG_TYPE.ELEMENT), elt.getChildren());
				} else {
					super.visit(elt);
				}
				
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
