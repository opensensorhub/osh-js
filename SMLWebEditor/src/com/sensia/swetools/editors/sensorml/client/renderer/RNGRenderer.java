/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
 ******************************* END LICENSE BLOCK ***************************/

package com.sensia.swetools.editors.sensorml.client.renderer;

import java.util.List;
import java.util.Stack;

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
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_DEF;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorAttributeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorChoiceWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorGenericHorizontalContainerWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorGenericVerticalContainerWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorValueWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorZeroOrMoreWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.xsd.SensorXSDAnyURIWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.xsd.SensorXSDDateTimeWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.xsd.SensorXSDDecimalWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.xsd.SensorXSDDoubleWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.xsd.SensorXSDIntegerWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.xsd.SensorXSDStringWidget;

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
public abstract class RNGRenderer implements RNGTagVisitor {
	
	private Stack<ISensorWidget> stack;
	
	public RNGRenderer() {
		stack = new Stack<ISensorWidget>();
	}

	public void push(ISensorWidget element) {
		stack.push(element);
	}
	
	public ISensorWidget peek() {
		return stack.peek();
	}
	
	public ISensorWidget pop() {
		return stack.pop();
	}
	
	public ISensorWidget getRoot() {
		return stack.peek();
	}
	
	protected int getStackSize() {
		return stack.size();
	}
	
	@Override
	public void visit(RNGGrammar grammar) {
		if (grammar.getStartPattern() == null) {
			throw new IllegalStateException("Grammar has no 'start' pattern and cannot be used to create a new instance");
		}
		grammar.getStartPattern().accept(this);
	}

	@Override
	public void visit(RNGElement elt) {
		pushAndVisitChildren(new SensorGenericHorizontalContainerWidget(elt.getName(), TAG_DEF.RNG, TAG_TYPE.ELEMENT), elt.getChildren());
	}

	@Override
	public void visit(RNGChoice choice) {
		pushAndVisitChildren(new SensorChoiceWidget(), choice.getChildren());
	}

	@Override
	public void visit(RNGOptional optional) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void visit(RNGAttribute attribute) {
		ISensorWidget widget = new SensorAttributeWidget(attribute.getName());
		pushAndVisitChildren(widget, attribute.getChildren());
	}

	@Override
	public void visit(RNGRef ref) {
		if (ref.getPattern() != null) {
			ref.getPattern().accept(this);
		}
	}

	@Override
	public void visit(RNGDefine pattern) {
		this.visitChildren(pattern.getChildren());
	}

	@Override
	public void visit(RNGOneOrMore oneOrMore) {
		this.visit((RNGZeroOrMore) oneOrMore);
	}

	@Override
	public void visit(RNGZeroOrMore zeroOrMore) {
		ISensorWidget widget = new SensorZeroOrMoreWidget(zeroOrMore);
		pushAndVisitChildren(widget, zeroOrMore.getChildren());
		
	}

	@Override
	public void visit(RNGGroup group) {
		this.visitChildren(group.getChildren());
	}

	@Override
	public void visit(RNGInterleave interleave) {
		this.visitChildren(interleave.getChildren());
	}

	@Override
	public void visit(RNGText text) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void visit(RNGValue val) {
		push(new SensorValueWidget(val.getText()));
	}

	@Override
	public void visit(RNGList list) {
		visitChildren(list.getChildren());
	}

	@Override
	public void visit(RNGData<?> data) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void visit(XSDString data) {
		push(new SensorXSDStringWidget(data));
		
	}

	@Override
	public void visit(XSDBoolean data) {
	}

	@Override
	public void visit(XSDDecimal data) {
		push(new SensorXSDDecimalWidget(data));
	}

	@Override
	public void visit(XSDDouble data) {
		push(new SensorXSDDoubleWidget(data));
	}

	@Override
	public void visit(XSDInteger data) {
		push(new SensorXSDIntegerWidget(data));
		
	}

	@Override
	public void visit(XSDAnyURI data) {
		push(new SensorXSDAnyURIWidget(data));
	}

	@Override
	public void visit(XSDDateTime data) {
		push(new SensorXSDDateTimeWidget(data));
		
	}
	
	protected void visitChildren(List<RNGTag> tags) {
		int stackSize = getStackSize();
		ISensorWidget peek = peek();
		
		for (RNGTag tag : tags) {
			if (tag != null) {
				tag.accept(this);
			}
			if(stackSize < getStackSize()){
				ISensorWidget child = pop();
				child.setParent(peek);
				peek.addElement(child);
			}
		}
	}
	
	protected void pushAndVisitChildren(ISensorWidget widget, List<RNGTag> tags) {
		push(widget);
		int stackSize = getStackSize();
		
		for (RNGTag tag : tags) {
			if (tag != null) {
				tag.accept(this);
			}
			if(stackSize < getStackSize()){
				ISensorWidget child = pop();
				child.setParent(widget);
				widget.addElement(child);
			}
		}
	}
	
	protected ISensorWidget renderVerticalWidget(String name, TAG_DEF def, TAG_TYPE type) {
		return new SensorGenericVerticalContainerWidget(name, def, type);
	}
	
	protected ISensorWidget renderHorizontalWidget(String name, TAG_DEF def, TAG_TYPE type) {
		return new SensorGenericHorizontalContainerWidget(name, def, type);
	}
}