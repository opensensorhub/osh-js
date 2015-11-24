/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.swetools.editors.sensorml.client;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gwt.user.client.ui.Panel;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGChoice;
import com.sensia.relaxNG.RNGElement;
import com.sensia.relaxNG.RNGGrammar;
import com.sensia.relaxNG.RNGOptional;
import com.sensia.relaxNG.RNGRef;
import com.sensia.relaxNG.RNGTag;
import com.sensia.relaxNG.RNGTagList;
import com.sensia.relaxNG.RNGTagVisitor;
import com.sensia.relaxNG.RNGValue;
import com.sensia.relaxNG.RNGZeroOrMore;
import com.sensia.swetools.editors.sensorml.client.panels.SectionWidget;
import com.sensia.swetools.editors.sensorml.client.panels.SectionsWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.ObjectTypeWidget;


/**
 * <p><b>Title:</b>
 * RNGRenderer
 * </p>
 *
 * <p><b>Description:</b><br/>
 * Renders content of an RNG grammar using GWT widgets
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Aug 27, 2011
 */
public class RNGRendererSML extends RNGRendererSWE implements RNGTagVisitor
{
    protected final static String ID_TAB = "Identification";
    protected final static String CONSTRAINTS_TAB = "Constraints";
    protected final static String CAPS_TAB = "Characteristics";
    protected final static String CONTACTS_TAB = "Contacts";
    protected final static String DOCS_TAB = "Documentation";
    protected final static String IO_TAB = "I/O Signals";
    protected final static String SML_NS = "http://www.opengis.net/sensorML/1.0.1";
    protected final static String GML_NS = "http://www.opengis.net/gml";
    
    protected SectionsWidget rootPanel;
    protected Map<String, AbstractWidget> tabs;
    protected Map<String, String> eltNamesToSectionName;
    protected Map<String, RenderType> eltNamesToRenderType;
    
    
    enum RenderType
    {
        SKIP, DECORATED_PANEL, LABELED_FIELD, OBJECT_TYPE
    }
    

    public RNGRendererSML()
    {
        tabs = new HashMap<String, AbstractWidget>();        
        
        // assign top level elements to tabs
        eltNamesToSectionName = new HashMap<String, String>();
        eltNamesToSectionName.put("id", ID_TAB);
        eltNamesToSectionName.put("identifier", ID_TAB);
        eltNamesToSectionName.put("name", ID_TAB);
        eltNamesToSectionName.put("description", ID_TAB);
        eltNamesToSectionName.put("keywords", ID_TAB);
        eltNamesToSectionName.put("identification", ID_TAB);
        eltNamesToSectionName.put("classification", ID_TAB);
        eltNamesToSectionName.put("method", ID_TAB);
        eltNamesToSectionName.put("validTime", CONSTRAINTS_TAB);
        eltNamesToSectionName.put("securityConstraint", CONSTRAINTS_TAB);
        eltNamesToSectionName.put("legalConstraint", CONSTRAINTS_TAB);
        eltNamesToSectionName.put("characteristics", CAPS_TAB);
        eltNamesToSectionName.put("capabilities", CAPS_TAB);
        eltNamesToSectionName.put("contact", CONTACTS_TAB);
        eltNamesToSectionName.put("documentation", DOCS_TAB);
        eltNamesToSectionName.put("inputs", IO_TAB);
        eltNamesToSectionName.put("outputs", IO_TAB);
        eltNamesToSectionName.put("parameters", IO_TAB);
        
        // assign element names to rendering types
        eltNamesToRenderType = new HashMap<String, RenderType>();
        eltNamesToRenderType.put("ProcessModel", RenderType.SKIP);
        eltNamesToRenderType.put("IdentifierList", RenderType.SKIP);
        eltNamesToRenderType.put("ClassifierList", RenderType.SKIP);
        eltNamesToRenderType.put("InputList", RenderType.SKIP);
        eltNamesToRenderType.put("OutputList", RenderType.SKIP);
        eltNamesToRenderType.put("ParameterList", RenderType.SKIP);        
        eltNamesToRenderType.put("Document", RenderType.SKIP);
        eltNamesToRenderType.put("Term", RenderType.SKIP);
        eltNamesToRenderType.put("contactInfo", RenderType.SKIP);
        eltNamesToRenderType.put("Security", RenderType.SKIP);
        eltNamesToRenderType.put("member", RenderType.DECORATED_PANEL);
        eltNamesToRenderType.put("contactInfo", RenderType.DECORATED_PANEL);
        eltNamesToRenderType.put("phone", RenderType.DECORATED_PANEL);
        eltNamesToRenderType.put("address", RenderType.DECORATED_PANEL);
        eltNamesToRenderType.put("input", RenderType.DECORATED_PANEL);
        eltNamesToRenderType.put("output", RenderType.DECORATED_PANEL);
        eltNamesToRenderType.put("parameter", RenderType.DECORATED_PANEL);
        eltNamesToRenderType.put("identifier", RenderType.DECORATED_PANEL);
        eltNamesToRenderType.put("classifier", RenderType.DECORATED_PANEL);
        eltNamesToRenderType.put("name", RenderType.LABELED_FIELD);
        eltNamesToRenderType.put(GML_NS + "identifier", RenderType.LABELED_FIELD);
        eltNamesToRenderType.put(GML_NS + "name", RenderType.LABELED_FIELD);
        eltNamesToRenderType.put(GML_NS + "description", RenderType.LABELED_FIELD);
        eltNamesToRenderType.put(GML_NS + "beginPosition", RenderType.LABELED_FIELD);
        eltNamesToRenderType.put(GML_NS + "endPosition", RenderType.LABELED_FIELD);
        eltNamesToRenderType.put("ResponsibleParty", RenderType.OBJECT_TYPE);
        eltNamesToRenderType.put("Person", RenderType.OBJECT_TYPE);
        eltNamesToRenderType.put("ContactList", RenderType.OBJECT_TYPE);
        eltNamesToRenderType.put("DocumentList", RenderType.OBJECT_TYPE);
    }


    @Override
    public void visit(RNGGrammar grammar)
    {
        newWidgetList();
        //rootPanel = new TabLayoutPanel(2.5, Unit.EM);
        //rootPanel.setAnimationDuration(1000);
        //rootPanel.setAnimationVertical(true);
        //widgets.peek().add(rootPanel);
        rootPanel = new SectionsWidget();
        widgets.peek().add(rootPanel);
        super.visit(grammar);
    }
    
    
    protected void addWidgetsToTab(Panel tab)
    {
        List<AbstractWidget> wList = widgets.pop();
        for (AbstractWidget w: wList)
            tab.add(w.getWidget());
    }


    @Override
    public void visit(RNGElement elt)
    {
        String eltName = elt.getName();
        String nsUri = elt.getNamespace();
        
        if (nsUri.equals(SWE_NS))
        {
            super.visit(elt);
            return;
        }
        
        // determine tab to render to
        // only for top level elements
        boolean isTopLevel = widgets.size() == 1;
        Panel tab = findTab(elt);
        if (isTopLevel && tab != null)
            newWidgetList();
        
        // determine render type
        String nameKey = nsUri.equals(SML_NS) ? eltName : nsUri + eltName;
        RenderType renderType = eltNamesToRenderType.get(nameKey);
        if (tab != null && renderType == null)
            renderType = RenderType.DECORATED_PANEL;
        
        // render element
        if (renderType != null)
        {
            switch (renderType)
            {
                case SKIP:
                    visitChildren(elt.getChildren());
                    break;
                    
                case DECORATED_PANEL:
                    renderPropertyPanel(elt);
                    break;
                    
                case OBJECT_TYPE:
                    AbstractWidget widget = new ObjectTypeWidget(elt);
                    widgets.peek().add(widget);
                    visitChildren(elt.getChildren());
                    break;
                
                case LABELED_FIELD:
                    renderLabeledField(elt, toNiceLabel(eltName));
                    break;
            }
        }
        else
        {
            int numChildren = elt.getChildren().size();
            if (numChildren == 1 && !(elt.getChildren().get(0) instanceof RNGTagList))
                renderLabeledField(elt, toNiceLabel(eltName));
            else
                super.visit(elt);
        }
        
        if (isTopLevel && tab != null)
            addWidgetsToTab(tab);
    }
    
    
    @Override
    public void visit(RNGAttribute att)
    {
        Panel tab = findTab(att);
        if (tab == null || widgets.size() > 1)
            super.visit(att);
        else
        {
            newWidgetList();
            super.visit(att);
            addWidgetsToTab(tab);
        }
    }
    
    
    @Override
    public void visit(RNGOptional optional)
    {
        Panel tab = findTab(optional);       
        if (tab == null || widgets.size() > 1)
            super.visit(optional);
        else
        {
            newWidgetList();
            super.visit(optional);
            addWidgetsToTab(tab);
        }
    }
    
    
    @Override
    public void visit(RNGChoice choice)
    {
        Panel tab = findTab(choice);       
        if (tab == null || widgets.size() > 1)
            super.visit(choice);
        else
        {
            newWidgetList();
            super.visit(choice);
            addWidgetsToTab(tab);
        }
    }
    
    
    @Override
    public void visit(RNGZeroOrMore zeroOrMore)
    {
        Panel tab = findTab(zeroOrMore);        
        if (tab == null || widgets.size() > 1)
            super.visit(zeroOrMore);
        else
        {
            newWidgetList();
            super.visit(zeroOrMore);
            addWidgetsToTab(tab);
        }
    }
    
    
    protected Panel findTab(RNGTag tag)
    {
        String name = null;
        //String nsUri = null;
        
        if (tag instanceof RNGElement)
        {
            RNGElement elt = (RNGElement)tag;
            //nsUri = elt.getNamespace();
            name = elt.getName();
        }
        
        else if (tag instanceof RNGAttribute)
        {
            RNGAttribute att = (RNGAttribute)tag;
            //nsUri = att.getNamespace();
            name = att.getName();
        }
        
        else if (tag instanceof RNGRef)
        {
            return findTab(((RNGRef)tag).getPattern());
        }
        
        else if (tag instanceof RNGTagList)
        {
            RNGTagList tagList = (RNGTagList)tag;
            for (RNGTag child: tagList.getChildren())
            {
                Panel panel = findTab(child);
                if (panel != null)
                    return panel;
            }
        }
        
        if (name != null)
        {            
            String sectionName = eltNamesToSectionName.get(name);
            if (sectionName != null)
                return getMainTab(sectionName);
        }
        
        return null;
    }
    
    
    //TODO: returns AbstractWidget instead
	protected Panel getMainTab(String sectionName) {
		if(!tabs.containsKey(sectionName)) {
			AbstractWidget section = new SectionWidget(sectionName,"");
			rootPanel.add(section);
			tabs.put(sectionName, section);
		}

		return tabs.get(sectionName).getPanel();
	}
    
    
    @Override
    protected String findLabel(RNGTag tag)
    {
        if (tag instanceof RNGElement)
        {
            String eltName = ((RNGElement)tag).getName();            
            if (eltName.equals("input") ||
                eltName.equals("output") ||
                eltName.equals("parameter") ||
                eltName.equals("member"))
            {
                RNGAttribute nameAtt = ((RNGElement)tag).getChildAttribute("name");
                if (nameAtt != null)
                {
                    RNGValue val = nameAtt.getChildValue();
                    if (val != null)
                        return val + " " + toNiceLabel(eltName);
                }
            }
        }
            
        return super.findLabel(tag);
    }
  
    
    @Override
    protected String toNiceLabel(String name)
    {
        // special cases
        if (name.equals("id"))
            name = "Local ID";
        else if (name.equals("beginPosition"))
            name = "Begin";
        else if (name.equals("endPosition"))
            name = "End";
                
        return super.toNiceLabel(name);
    }
}
