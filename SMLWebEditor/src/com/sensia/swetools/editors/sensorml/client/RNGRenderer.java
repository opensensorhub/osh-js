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
import com.google.gwt.event.dom.client.DoubleClickEvent;
import com.google.gwt.event.dom.client.DoubleClickHandler;
import com.google.gwt.event.dom.client.KeyPressEvent;
import com.google.gwt.event.dom.client.KeyPressHandler;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.InsertPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.SimplePanel;
import com.google.gwt.user.client.ui.TextArea;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.TextBoxBase;
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
    
    
    protected void addWidgetsToPanel(Panel panel)
    {
        List<AbstractWidget> wList = widgets.pop();
        for (AbstractWidget w: wList)
            panel.add(w.getWidget());
        
        AbstractWidget w = new AbstractWidget();
        w.setWidget(panel);
        widgets.peek().add(w);
    }


    @Override
    public void visit(RNGGrammar grammar)
    {
        if (grammar.getStartPattern() == null)
            throw new IllegalStateException("Grammar has no 'start' pattern and cannot be used to create a new instance");
        
        grammar.getStartPattern().accept(this);
    }


    @Override
    public void visit(RNGDefine define)
    {
        this.visitChildren(define.getChildren());
    }


    @Override
    public void visit(RNGElement elt)
    {
        VerticalPanel panel = new VerticalPanel();
        panel.add(new Label(toNiceLabel(elt.getName())));
        newWidgetList();
        this.visitChildren(elt.getChildren());
        addWidgetsToPanel(panel);
    }


    @Override
    public void visit(RNGAttribute attribute)
    {
        HorizontalPanel panel = new HorizontalPanel();
        panel.setSpacing(5);
        panel.add(new Label(toNiceLabel(attribute.getName()) + ":"));
        newWidgetList();
        this.visitChildren(attribute.getChildren());
        addWidgetsToPanel(panel);
    }


    @Override
    public void visit(RNGRef ref)
    {
        if (ref.getPattern() != null)
            ref.getPattern().accept(this);
        else
        {
            Label label = new Label("Error fetching referenced pattern: " + ref.getPatternName());
            label.addStyleName("rng-error");
            AbstractWidget w = new AbstractWidget();
            w.setWidget(label);
            widgets.peek().add(w);
        }
    }
    
    
    @Override
    public void visit(final RNGChoice choice)
    {
        // if an entry has been selected
        if (choice.isSelected())
        {
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
            AbstractWidget w = new AbstractWidget();
            w.setWidget(panel);
            widgets.peek().add(w);
        }
        
        // if nothing is selected, show a combo
        else
        {
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
            AbstractWidget w = new AbstractWidget();
            w.setWidget(combo);
            widgets.peek().add(w);
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
        
        AbstractWidget w = new AbstractWidget();
        w.setWidget(panel);
        widgets.peek().add(w);
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
        
        AbstractWidget w = new AbstractWidget();
        mainPanel.addStyleName("swe-property-panel");
        w.setWidget(mainPanel);
        widgets.peek().add(w);
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
    public void visit(RNGText text)
    {
        TextBox textBox = new TextBox();
        textBox.setVisibleLength(30);

        if (text.getText() != null)
            textBox.setText(text.getText());
        
        AbstractWidget w = new AbstractWidget();
        w.setWidget(textBox);
        widgets.peek().add(w);
    }
    
    
    @Override
    public void visit(RNGValue val)
    {
    	AbstractWidget w = new AbstractWidget();
    	w.setWidget(new Label(val.getText()));
        widgets.peek().add(w);
    }


    @Override
    public void visit(RNGList list)
    {

    }


    @Override
    public void visit(RNGData<?> data)
    {
        TextBox textBox = new TextBox();
        textBox.setVisibleLength(30);

        if (data.getValue() != null)
            textBox.setText(data.getValue().toString());
        
        AbstractWidget w = new AbstractWidget();
        w.setWidget(textBox);
        widgets.peek().add(w);
    }
    
    
    @Override
    public void visit(final XSDString data)
    {
        int length = -1;
        
        int fixedLength = data.getLength();
        if (fixedLength > 0)
            length = fixedLength;
        
        int maxLength = data.getMaxLength();
        if (maxLength > 0)
            length = maxLength;
        
        renderTextInput(data, length, null);
    }


    @Override
    public void visit(final XSDBoolean data)
    {
        
    }
    
    
    @Override
    public void visit(XSDDecimal data)
    {
        int length = 10;
        renderTextInput(data, length, ".-+0123456789");
    }


    @Override
    public void visit(final XSDDouble data)
    {
        int length = 10;
        renderTextInput(data, length, ".-+e0123456789");
    }


    @Override
    public void visit(final XSDInteger data)
    {
        int length = 10;
        
        int fixedLength = data.getTotalDigits();
        if (fixedLength > 0)
            length = fixedLength + 1;
        
        renderTextInput(data, length, "-+0123456789");
    }
    
    
    @Override
    public void visit(XSDAnyURI data)
    {
        int length = 60;
        
        int fixedLength = data.getLength();
        if (fixedLength > 0)
            length = fixedLength;
        
        int maxLength = data.getMaxLength();
        if (maxLength > 0)
            length = maxLength;
        
        renderTextInput(data, length, null);
    }


    @Override
    public void visit(XSDDateTime data)
    {
        int length = 28;
        renderTextInput(data, length, null);
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
    
    
    /**
     * Renders the validating text box for any RNG/XSD datatype
     * @param data
     * @param length
     * @param allowedChars
     * @param regex
     */
    protected void renderTextInput(final RNGData<?> data, final int length, final String allowedChars)
    {
        final TextBoxBase textBox;
        
        if (length < 0)
        {
            textBox = new TextBox();
            ((TextBox)textBox).setVisibleLength(50);
        }
        else if (length <= 60)
        {
            textBox = new TextBox();
            ((TextBox)textBox).setVisibleLength(length);
            ((TextBox)textBox).setMaxLength(length);
        }
        else
        {
            textBox = new TextArea();
            ((TextArea)textBox).setVisibleLines(length/50);
        }
        
        // put saved value in text box
        if (data.getValue() != null)
        {
            textBox.setText(data.getValue().toString());
            if (data.isConfirmed())
                textBox.setReadOnly(true);
        }
        
        // double click handler for changing after confirm
        textBox.addDoubleClickHandler(new DoubleClickHandler() {
            @Override
            public void onDoubleClick(DoubleClickEvent event)
            {
                data.setConfirmed(false);
                textBox.setReadOnly(false);
            }
        });
        
        // validating keypress handler
        textBox.addKeyPressHandler(new KeyPressHandler() {
            @Override
            public void onKeyPress(KeyPressEvent event)
            {
                char c = event.getCharCode();
                if (c <= 13)
                    return;
                
                // check what was just typed                
                if ((allowedChars != null && allowedChars.indexOf(c) < 0))
                {
                    textBox.cancelKey();
                    return;
                }
            }
        });
        
        // validating keyup handler
        textBox.addKeyUpHandler(new KeyUpHandler() {
            @Override
            public void onKeyUp(KeyUpEvent event)
            {
                if (data.isValid(textBox.getText()))
                {
                    textBox.removeStyleName("invalid-value");
                    textBox.addStyleName("valid-value");
                    data.setStringValue(textBox.getText());
                }
                else
                {
                    textBox.removeStyleName("valid-value");
                    textBox.addStyleName("invalid-value");
                }
            }
        });
        
        // validating change handler
        textBox.addChangeHandler(new ChangeHandler() {
            @Override
            public void onChange(ChangeEvent event)
            {
                if (data.isValid(textBox.getText()))
                {
                    data.setConfirmed(true);                    
                    textBox.removeStyleName("valid-value");
                    textBox.removeStyleName("invalid-value");
                    textBox.setReadOnly(true);
                }
            }        
        });
        AbstractWidget w = new AbstractWidget();
        w.setWidget(textBox);
        widgets.peek().add(w);
    }
    
    
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