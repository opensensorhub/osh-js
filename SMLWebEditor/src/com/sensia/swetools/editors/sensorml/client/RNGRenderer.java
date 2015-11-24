/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.swetools.editors.sensorml.client;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import com.google.gwt.event.dom.client.ChangeEvent;
import com.google.gwt.event.dom.client.ChangeHandler;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.FlowPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.InsertPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.SimplePanel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGChoice;
import com.sensia.relaxNG.RNGData;
import com.sensia.relaxNG.RNGDefine;
import com.sensia.relaxNG.RNGElement;
import com.sensia.relaxNG.RNGGrammar;
import com.sensia.relaxNG.RNGGroup;
import com.sensia.relaxNG.RNGInterleave;
import com.sensia.relaxNG.RNGList;
import com.sensia.relaxNG.RNGOneOrMore;
import com.sensia.relaxNG.RNGOptional;
import com.sensia.relaxNG.RNGRef;
import com.sensia.relaxNG.RNGTag;
import com.sensia.relaxNG.RNGTagList;
import com.sensia.relaxNG.RNGTagVisitor;
import com.sensia.relaxNG.RNGText;
import com.sensia.relaxNG.RNGValue;
import com.sensia.relaxNG.RNGZeroOrMore;
import com.sensia.relaxNG.XSDAnyURI;
import com.sensia.relaxNG.XSDBoolean;
import com.sensia.relaxNG.XSDDateTime;
import com.sensia.relaxNG.XSDDecimal;
import com.sensia.relaxNG.XSDDouble;
import com.sensia.relaxNG.XSDInteger;
import com.sensia.relaxNG.XSDString;
import com.sensia.swetools.editors.sensorml.client.panels.SectionsWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.GenericContainerWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGAttributeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGDataWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGRefWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGTextWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.RNGValueWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.XSDAnyURIWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.XSDDateTimeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.XSDDecimalWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.XSDDoubleWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.XSDIntegerWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.XSDStringWidget;
import com.sensia.swetools.editors.sensorml.client.panels.elements.XSDWidget;


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
public abstract class RNGRenderer implements RNGTagVisitor
{
    protected Stack<List<AbstractWidget>> widgets;
        

    public RNGRenderer()
    {
        widgets = new Stack<List<AbstractWidget>>();
    }


    public List<AbstractWidget> getWidgets()
    {
    	List<AbstractWidget> top = widgets.peek();
    	if(top.get(0) instanceof SectionsWidget) {
    		top = ((SectionsWidget)top.get(0)).getSections();
    	} 
    	return top;
    	
    }
    
    
    protected List<AbstractWidget> newWidgetList()
    {
        List<AbstractWidget> wList = new ArrayList<AbstractWidget>();
        widgets.push(wList);
        return wList;
    }    
    
    
    protected void visitChildren(List<RNGTag> tags)
    {
        for (RNGTag tag: tags)
            if (tag != null)
                tag.accept(this);
    }
    
    
    protected void addWidgetsToPanel(AbstractWidget panel)
    {
        List<AbstractWidget> wList = widgets.pop();
        for (AbstractWidget w: wList){
            panel.getPanel().add(w.getWidget());
        }
        
        widgets.peek().add(panel);
    }


    @Override
    public void visit(RNGGrammar grammar)
    {
        if (grammar.getStartPattern() == null)
            throw new IllegalStateException("Grammar has no 'start' pattern and cannot be used to create a new instance");
        
        grammar.getStartPattern().accept(this);
    }


	@Override
	public void visit(RNGDefine define) {
		this.visitChildren(define.getChildren());
	}

	@Override
	public void visit(RNGElement elt) {
		RNGElementWidget widget = new RNGElementWidget(elt);
		newWidgetList();
		this.visitChildren(elt.getChildren());
		addWidgetsToPanel(widget);
	}


	@Override
	public void visit(RNGAttribute attribute) {
		RNGAttributeWidget widget = new RNGAttributeWidget(attribute);
		newWidgetList();
		this.visitChildren(attribute.getChildren());
		addWidgetsToPanel(widget);
	}


    @Override
    public void visit(RNGRef ref) {
        if (ref.getPattern() != null) {
            ref.getPattern().accept(this);
        } else {
        	RNGRefWidget widget = new RNGRefWidget(ref);
            widgets.peek().add(widget);
        }
    }
    
    
    @Override
    public void visit(final RNGChoice choice)
    {
        // if an entry has been selected
        if (choice.isSelected()) {
            final HorizontalPanel panel = new HorizontalPanel();
            
            // aggregate content widgets
            // TODO no need for additional panel if only one widget
            VerticalPanel contentPanel = new VerticalPanel();
            newWidgetList();
            choice.getSelectedPattern().accept(this);
            for (AbstractWidget w: widgets.pop())
                contentPanel.add(w.getWidget());
            panel.add(contentPanel);
            
            // create change button
            Label b = new Label();
            b.setPixelSize(16, 16);
            b.addStyleName("rng-choice-change");
            panel.add(b);
            
            // button handler
            b.addClickHandler(new ClickHandler(){
                @Override
                public void onClick(ClickEvent event)
                {
                    choice.setSelectedIndex(-1);
                    onPatternChanged(choice, panel);           
                }
            });
            GenericContainerWidget widget = new GenericContainerWidget();
            widget.setPanel(panel);
            widget.setWidget(panel);
            widgets.peek().add(widget);
        } else {
        // if nothing is selected, show a combo
            final ListBox combo = new ListBox();
            combo.setVisibleItemCount(1);
            combo.addItem("----", "none");
            combo.addStyleName("swe-property-panel");
            // get label from children annotations
            for (RNGTag tag: choice.getItems())
            {
                if (tag instanceof RNGValue)
                {
                    combo.addItem(((RNGValue)tag).getText());
                }
                else
                {
                    String label = findLabel(tag);
                    if (label == null)
                        label = "Unlabeled choice";
                    else if (label.equalsIgnoreCase("href"))
                        label = "By Reference";
                    combo.addItem(label);
                }
            }
            
            // associate handler
            combo.addChangeHandler(new ChangeHandler() {
                @Override
                public void onChange(ChangeEvent event)
                {
                    int selected = combo.getSelectedIndex();
                    //if (selected == 0)
                    //    return;
                    
                    choice.setSelectedIndex(selected-1);
                    onPatternChanged(choice, combo);
                }
            });
            GenericContainerWidget widget = new GenericContainerWidget();
            widget.setWidget(combo);
            widget.setPanel(new FlowPanel());
            widgets.peek().add(widget);
        }
    }


    @Override
    public void visit(final RNGOptional optional)
    {
        final HorizontalPanel panel = new HorizontalPanel();
        
        // create add/remove button
        Label b = new Label();
        b.addStyleName("swe-property-panel");
        b.addClickHandler(new ClickHandler() {
            @Override
            public void onClick(ClickEvent event)
            {
                optional.setSelected(!optional.isSelected());
                onPatternChanged(optional, panel);
            }
        });
        
        if (!optional.isDisabled())
        {
            if (optional.isSelected())
            {
                // aggregate content widgets
                VerticalPanel contentPanel = new VerticalPanel();
                newWidgetList();
                this.visitChildren(optional.getChildren());
                for (AbstractWidget w: widgets.pop()){
                    contentPanel.add(w.getWidget());
                }
                panel.add(contentPanel);
                
                // show remove button on right
                panel.add(b);
                b.addStyleName("rng-optional-unselect");
            }
            else
            {
                // show add button on left
                panel.add(b);
                b.addStyleName("rng-optional-select");
                
                // get a nice label
                String label = findLabel(optional);
                if (label == null)
                    label = "Optional Content";
                panel.add(new Label("Add " + label));
            }
        }
        
        GenericContainerWidget widget = new GenericContainerWidget();
        widget.setPanel(panel);
        widget.setWidget(panel);
        widgets.peek().add(widget);
    }


    @Override
    public void visit(RNGOneOrMore oneOrMore)
    {
        this.visit((RNGZeroOrMore)oneOrMore);
    }


    @Override
    public void visit(final RNGZeroOrMore zeroOrMore)
    {
        final VerticalPanel mainPanel = new VerticalPanel();
        
        // get a nice label
        final String label = findLabel(zeroOrMore);
        
        // added occurences
        int i = 0;
        for (final List<RNGTag> tags: zeroOrMore.getPatternInstances())
        {
            boolean allowRemove = !(zeroOrMore instanceof RNGOneOrMore && i == 0);
            Panel itemPanel = renderOccurence(zeroOrMore, tags, label, allowRemove);
            mainPanel.add(itemPanel);
            i++;
        }
        
        final HorizontalPanel morePanel = new HorizontalPanel();
        mainPanel.add(morePanel);
        
        // add button on left
        Label b = new Label();
        b.addStyleName("rng-optional-select");
        b.addClickHandler(new ClickHandler() {
            @Override
            public void onClick(ClickEvent event)
            {
                List<RNGTag> tags = zeroOrMore.newOccurence();
                Panel itemPanel = renderOccurence(zeroOrMore, tags, label, true);
                morePanel.removeFromParent();
                mainPanel.add(itemPanel);
                mainPanel.add(morePanel);
            }
        });
        morePanel.add(b);
        morePanel.add(new Label(label));
        mainPanel.addStyleName("swe-property-panel");
        
        GenericContainerWidget  widget = new GenericContainerWidget();
        widget.setPanel(mainPanel);
        widget.setWidget(mainPanel);
        widgets.peek().add(widget);
    }
    
    
    protected Panel renderOccurence(final RNGZeroOrMore zeroOrMore, final List<RNGTag> tags, String label, boolean allowRemove)
    {
        final HorizontalPanel itemPanel = new HorizontalPanel();
        
        /*DisclosurePanel hidePanel = new DisclosurePanel();
        hidePanel.setAnimationEnabled(true);
        hidePanel.setHeader(new Label(label));
        itemPanel.add(hidePanel);*/
        
        VerticalPanel contentPanel = new VerticalPanel();
        //hidePanel.setContent(contentPanel);
        itemPanel.add(contentPanel);
                    
        newWidgetList();
        this.visitChildren(tags);
        for (AbstractWidget w: widgets.pop())
            contentPanel.add(w.getWidget());
        
        if (allowRemove)
        {
            // delete button
            Label b = new Label();
            b.addStyleName("rng-optional-unselect");
            b.addClickHandler(new ClickHandler() {
                @Override
                public void onClick(ClickEvent event)
                {
                    zeroOrMore.getPatternInstances().remove(tags);
                    itemPanel.removeFromParent();
                }
            });
            itemPanel.add(b);
        }
        
        return itemPanel;
    }


    @Override
    public void visit(RNGGroup group)
    {
        this.visitChildren(group.getChildren());
    }
    
    
    @Override
    public void visit(RNGInterleave interleave)
    {
        this.visitChildren(interleave.getChildren());
    }


    @Override
    public void visit(RNGText text) {
        RNGTextWidget widget = new RNGTextWidget(text);
        widgets.peek().add(widget);
    }
    
    
	@Override
	public void visit(RNGValue val) {
		RNGValueWidget widget = new RNGValueWidget(val);
		widgets.peek().add(widget);
	}


    @Override
    public void visit(RNGList list)
    {

    }


	@Override
	public void visit(RNGData<?> data) {
		RNGDataWidget widget = new RNGDataWidget(data);
		widgets.peek().add(widget);
	}
    
    
	@Override
	public void visit(final XSDString data) {
		XSDWidget widget = new XSDStringWidget(data);
		widgets.peek().add(widget);
	}


    @Override
    public void visit(final XSDBoolean data)
    {
        
    }
    
    
	@Override
	public void visit(XSDDecimal data) {
		XSDWidget widget = new XSDDecimalWidget(data);
		widgets.peek().add(widget);
	}


	@Override
	public void visit(final XSDDouble data) {
		XSDWidget widget = new XSDDoubleWidget(data);
		widgets.peek().add(widget);
	}


	@Override
	public void visit(final XSDInteger data) {
		XSDWidget widget = new XSDIntegerWidget(data);
		widgets.peek().add(widget);
	}
    
    
	@Override
	public void visit(XSDAnyURI data) {
		XSDWidget widget = new XSDAnyURIWidget(data);
		widgets.peek().add(widget);
	}


	@Override
	public void visit(XSDDateTime data) {
		XSDWidget widget = new XSDDateTimeWidget(data);
		widgets.peek().add(widget);
	}
    
    
    /*protected void renderConfirmedValue(final RNGData<?> data)
    {
        final HorizontalPanel panel = new HorizontalPanel();
        
        // value as label
        Label l = new Label(data.getValue().toString());
        l.addStyleName("rng-confirmed-value");
        panel.add(l);
        
        // add change button
        Label b = new Label();
        b.addStyleName("rng-choice-change");
        b.addClickHandler(new ClickHandler() {
            @Override
            public void onClick(ClickEvent event)
            {
                data.setConfirmed(false);
                onPatternChanged(data, panel);
            }
        });
        panel.add(b);
        
        widgets.peek().add(l);
    }*/
    
    protected void onPatternChanged(RNGTag tag, Widget oldWidget)
    {
        // regenerate widgets
        newWidgetList();
        tag.accept(this);
        List<AbstractWidget> newWidgets = widgets.pop();
        
        // add to parent widget temporarily
        AbstractWidget newWidget = newWidgets.get(0);
        Widget parentWidget = oldWidget.getParent();
        
        if (parentWidget instanceof SimplePanel)
        {
            oldWidget.removeFromParent();
            ((SimplePanel)parentWidget).add(newWidget.getWidget());
        }
        else if (parentWidget instanceof InsertPanel)
        {
            int oldIndex = ((InsertPanel)parentWidget).getWidgetIndex(oldWidget);
            oldWidget.removeFromParent();
            ((InsertPanel)parentWidget).insert(newWidget.getWidget(), oldIndex);
        }
        else
            throw new IllegalStateException("Panel doesn't support insert");
    }
    
    
    protected String findLabel(RNGTag tag)
    {
        String annot = tag.getAnnotation();
        
        if (tag instanceof RNGElement)
        {
            return toNiceLabel(((RNGElement)tag).getName());
        }
        
        else if (tag instanceof RNGAttribute)
        {
            return toNiceLabel(((RNGAttribute)tag).getName());
        }
        
        else if (tag instanceof RNGData)
        {
            return annot;
        }
        
        else if (tag instanceof RNGDefine ||
                 tag instanceof RNGGroup ||
                 tag instanceof RNGOptional ||
                 tag instanceof RNGZeroOrMore ||
                 tag instanceof RNGOneOrMore)
        {
            if (annot != null)
                return annot;
                
            List<RNGTag> children = ((RNGTagList)tag).getChildren();
            if (children.size() == 1)
                return findLabel(children.get(0));
        }
        
        else if (tag instanceof RNGRef)
        {
            if (annot != null)
                return annot;
                
            // try to get label from referenced pattern
            RNGDefine def = ((RNGRef)tag).getPattern();
            if (def != null)
                return findLabel(def);
        }
        
        return null;
    }
    
    
    protected String toNiceLabel(String name)
    {
        String label = toCamelCase(name).replace('_', ' ');
        StringBuilder b = new StringBuilder(label);
        
        if (label.length() > 1)
        {
            boolean space = true;
            
            for (int i = 1; i < b.length(); i++)
            {
                char c = b.charAt(i);
                if (!space && Character.isUpperCase(c) && Character.isLowerCase(b.charAt(i-1)))
                {
                    b.insert(i, ' ');
                    space = true;
                    i++;
                }
                
                else if (c == ' ')
                    space = true;
                
                else
                    space = false;
            }
        }
        
        return b.toString();
    }
        
    
    protected String toCamelCase(String s)
    {
        String s1 = s.substring(0, 1).toUpperCase();
        if (s.length() > 1)
            s1 += s.substring(1);
        return s1;
    }
}