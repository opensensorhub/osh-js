/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.swetools.editors.sensorml.client;

import java.util.Map;

import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGElement;
import com.sensia.relaxNG.RNGTag;
import com.sensia.relaxNG.RNGTagList;
import com.sensia.relaxNG.RNGTagVisitor;
import com.sensia.relaxNG.RNGValue;
import com.sensia.swetools.editors.sensorml.client.panels.elements.GenericContainerWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.SWEDataComponentWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.SWELabeledFieldWidget;


/**
 * <p><b>Title:</b>
 * RNGRenderer
 * </p>
 *
 * <p><b>Description:</b><br/>
 * Renders content of an RNG grammar describing SWE Common data components
 * using GWT widgets
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Aug 27, 2011
 */
public class RNGRendererSWE extends RNGRenderer implements RNGTagVisitor
{
    protected final static String STYLE_HREF = "xlink";
    protected final static String STYLE_OBJ = "swe-obj";
    protected final static String SWE_NS = "http://www.opengis.net/swe/1.0.1";
    
    protected Map<String, String> softTypedProperties;
    
    
    public RNGRendererSWE()
    {        
    }


    @Override
    public void visit(RNGElement elt)
    {
        String eltName = elt.getName();
               
        if (eltName.startsWith("Boolean") ||
            eltName.startsWith("Quantity") ||
            eltName.startsWith("Count") ||
            eltName.startsWith("Category") ||
            eltName.startsWith("Time") ||
            eltName.equals("Text") ||
            eltName.equals("DataRecord") ||
            eltName.equals("Vector") ||
            eltName.equals("DataArray") ||
            eltName.equals("Matrix") ||
            eltName.equals("DataChoice") ||
            eltName.equals("DataStream"))
        {
            renderDataComponent(elt);
        }
        
        else if (eltName.equals("field") ||
                 eltName.equals("coordinate") ||
                 eltName.equals("elementType") ||
                 eltName.equals("item") ||
                 eltName.equals("quality") ||
                 eltName.equals("encoding"))
        {
            renderDataComponentProperty(elt);
            renderPropertyPanel(elt);
        }
        
        else if (eltName.equals("identifier") ||
                 eltName.equals("label") ||
                 eltName.equals("description") ||
                 eltName.equals("uom") ||
                 eltName.equals("value"))
        {
            renderLabeledField(elt, toNiceLabel(elt.getName())); 
        }
        
        else
        {
            super.visit(elt);
        }
    }
    
    
    @Override
    public void visit(RNGAttribute att)
    {
        String attName = att.getName();
        
        if (attName.equals("name"))
        {
            visitChildren(att.getChildren());
            widgets.peek().get(0).getWidget().setTitle("Enter name");
        }
        
        else if (attName.equals("code"))
        {
            visitChildren(att.getChildren());
        }
        
        else
        {
            renderLabeledField(att, toNiceLabel(att.getName())); 
        }
    }
    
    //TODO : create panel
    protected void renderPropertyPanel(RNGElement elt)
    {
        String title = toNiceLabel(elt.getName());
        
       // DecoratorPanel decorator = new DecoratorPanel();
        DisclosurePanel hidePanel = new DisclosurePanel();
        hidePanel.setAnimationEnabled(true);
        hidePanel.setOpen(false);
        hidePanel.addStyleName("swe-property-panel");
        //decorator.add(hidePanel);
        
        // header section
        HorizontalPanel header = new HorizontalPanel();
        header.addStyleName("swe-section-header");
        hidePanel.setHeader(header);
        
        // title in header
        Label label = new Label(title);
        label.addStyleName("swe-section-title");
        header.add(label);
        
        // content section
        //VerticalPanel contentPanel = new VerticalPanel();
        FlowPanel contentPanel = new FlowPanel();
        hidePanel.setContent(contentPanel);
        
        newWidgetList();
        visitChildren(elt.getChildren());
        for (AbstractWidget w: widgets.pop())
        {
            if (w.getWidget().getTitle().equals("Enter name"))
                header.add(w.getWidget());
            else
                contentPanel.add(w.getWidget());
        }
        
        GenericContainerWidget widget = new GenericContainerWidget();
        widget.setWidget(hidePanel);
        
        FlowPanel container = new FlowPanel();
        container.add(hidePanel);
        widget.setPanel(container);
        widgets.peek().add(widget);
    }
    
    
    protected void renderDataComponentProperty(RNGElement elt)
    {
        DisclosurePanel hidePanel = new DisclosurePanel();
        hidePanel.setAnimationEnabled(true);
        hidePanel.setOpen(false);
        
        VerticalPanel panel = new VerticalPanel();
        hidePanel.setContent(panel);
        panel.setSpacing(10);
        // name attribute
        for (RNGTag child: elt.getChildren())
        {
            newWidgetList();
            child.accept(this);
            
            if (widgets.peek().size() > 0 && widgets.peek().get(0).getWidget().getTitle().equals("Enter name"))
            {
                // assign name attribute widget to header
            	AbstractWidget w = widgets.pop().get(0);
                hidePanel.setHeader(w.getWidget());
            }
            else
            {
                for (AbstractWidget w: widgets.pop())
                    panel.add(w.getWidget());
            }
        }
        
        GenericContainerWidget widget = new GenericContainerWidget();
        widget.setWidget(hidePanel);
        
        FlowPanel container = new FlowPanel();
        container.add(hidePanel);
        widget.setPanel(container);
        widgets.peek().add(widget);
    }
    
    
    protected void renderDataComponent(RNGElement elt)
    {
        AbstractWidget widget = new SWEDataComponentWidget(elt);
        widgets.peek().add(widget);
        visitChildren(elt.getChildren());
    }
    
    
    protected void renderLabeledField(RNGTagList tagList, String label)
    {
        AbstractWidget widget = new SWELabeledFieldWidget(tagList, label);
        newWidgetList();
        this.visitChildren(tagList.getChildren());
        addWidgetsToPanel(widget);
    }
    
    
    @Override
    protected String findLabel(RNGTag tag)
    {
        if (tag instanceof RNGElement)
        {
            String eltName = ((RNGElement)tag).getName();            
            if (eltName.equals("field") ||
                eltName.equals("item"))
            {
                RNGAttribute nameAtt = ((RNGElement)tag).getChildAttribute("name");
                RNGValue val = nameAtt.getChildValue();
                if (val != null)
                    return val.getText() + " " + toNiceLabel(eltName);
            }
        }
            
        return super.findLabel(tag);
    }
}
