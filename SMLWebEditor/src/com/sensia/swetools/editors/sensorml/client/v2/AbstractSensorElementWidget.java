package com.sensia.swetools.editors.sensorml.client.v2;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.core.shared.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGData;
import com.sensia.relaxNG.RNGDefine;
import com.sensia.relaxNG.RNGElement;
import com.sensia.relaxNG.RNGGroup;
import com.sensia.relaxNG.RNGOneOrMore;
import com.sensia.relaxNG.RNGOptional;
import com.sensia.relaxNG.RNGRef;
import com.sensia.relaxNG.RNGTag;
import com.sensia.relaxNG.RNGTagList;
import com.sensia.relaxNG.RNGZeroOrMore;
import com.sensia.swetools.editors.sensorml.client.panels.Utils;
import com.sensia.swetools.editors.sensorml.client.v2.panels.listeners.IAddCallback;

public abstract class AbstractSensorElementWidget implements ISensorWidget{

	
	private String name;
	private TAG_DEF def;
	private TAG_TYPE type;
	private List<ISensorWidget> elements = new ArrayList<ISensorWidget>(); 
	private MODE editorMode = MODE.VIEW;
	private ISensorWidget parent;
	
	private static final int NORMALIZE_DOT_SEPARATOR_SIZE = 70;
	
	protected AbstractSensorElementWidget(String name, TAG_DEF def, TAG_TYPE type){
		this.name = name;
		this.def = def;
		this.type = type;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void switchMode(MODE mode) {
		editorMode = mode;
		activeMode(mode);
		
		//propagate edit mode
		for(final ISensorWidget sensorWidget : elements) {
			sensorWidget.switchMode(mode);
		}
	}
	
	protected abstract void activeMode(MODE mode);
	
	protected MODE getMode() {
		return editorMode;
	}
	
	public TAG_DEF getDef() {
		return def;
	}
	
	public TAG_TYPE getType(){
		return type;
	}
	
	public List<ISensorWidget> getElements() {
		return elements;
	}
	
	public ISensorWidget getParent() {
		return parent;
	}

	public void setParent(ISensorWidget parent) {
		this.parent = parent;
	}

	protected abstract void addSensorWidget(ISensorWidget widget);	
	
	public void addElement(ISensorWidget element) {
		addSensorWidget(element);
		elements.add(element);
	}
	
	protected String getDotsLine() {
		String newValue = "";
		for(int i=0;i < NORMALIZE_DOT_SEPARATOR_SIZE;i++) {
			newValue += ".";
		}
		return newValue;
	}

	@Override
	public String toString() {
		return getClass().toString()+" [name=" + name + ", def=" + def + ", type=" + type + "]";
	}
	
	protected String findLabel(RNGTag tag) {
		String annot = tag.getAnnotation();

		if (tag instanceof RNGElement) {
			return toNiceLabel(((RNGElement) tag).getName());
		}

		else if (tag instanceof RNGAttribute) {
			return toNiceLabel(((RNGAttribute) tag).getName());
		}

		else if (tag instanceof RNGData) {
			return annot;
		}

		else if (tag instanceof RNGDefine || tag instanceof RNGGroup || tag instanceof RNGOptional || tag instanceof RNGZeroOrMore
				|| tag instanceof RNGOneOrMore) {
			if (annot != null)
				return annot;

			List<RNGTag> children = ((RNGTagList) tag).getChildren();
			if (children.size() == 1)
				return findLabel(children.get(0));
		}

		else if (tag instanceof RNGRef) {
			if (annot != null)
				return annot;

			// try to get label from referenced pattern
			RNGDefine def = ((RNGRef) tag).getPattern();
			if (def != null)
				return findLabel(def);
		}

		return null;
	}

	protected String toNiceLabel(String name) {
		String label = toCamelCase(name).replace('_', ' ');
		StringBuilder b = new StringBuilder(label);

		if (label.length() > 1) {
			boolean space = true;

			for (int i = 1; i < b.length(); i++) {
				char c = b.charAt(i);
				if (!space && Character.isUpperCase(c) && Character.isLowerCase(b.charAt(i - 1))) {
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

	protected String toCamelCase(String s) {
		String s1 = s.substring(0, 1).toUpperCase();
		if (s.length() > 1)
			s1 += s.substring(1);
		return s1;
	}
	
	@Override
	public ISensorWidget cloneSensorWidget(){
		AbstractSensorElementWidget clone = newInstance();
		
		for(final ISensorWidget element : getElements()) {
			ISensorWidget cloneChild = element.cloneSensorWidget();
			if(cloneChild != null) {
				clone.addElement(cloneChild);
			}
		}
		
		return clone;
	}
	
	protected abstract AbstractSensorElementWidget newInstance();
	
	protected Panel getAddButtonPanel(String annotation,final String label) {
		
		Label addButton = new Label(annotation);
		addButton.addStyleName("rng-optional-select");
		
		addButton.addClickHandler(new ClickHandler() {
			
			@Override
			public void onClick(ClickEvent event) {
				if(!getElements().isEmpty() && getMode() == MODE.EDIT) {
					//concatenates every panels
					VerticalPanel allEditPanels = new VerticalPanel();
					final List<ISensorWidget> clones = new ArrayList<ISensorWidget>();
					
					for(final ISensorWidget panelToAdd : getElements()) {
						ISensorWidget clone = panelToAdd.cloneSensorWidget();
						if(clone != null) {
							clone.switchMode(getMode());
							clones.add(clone);
							allEditPanels.add(clone.getPanel());	
						} else {
							GWT.log("Clone method is not implemented yet for class : "+panelToAdd.getClass().toString());
						}
						
					}
					
					final DialogBox dialogBox = Utils.createAddDialogBox(allEditPanels, "Add "+label,new IAddCallback() {
						
						@Override
						public void onClick() {
							for(ISensorWidget clone : clones) {
								getParent().addElement(clone);
							}
						}
					});
					dialogBox.show();
				}
			}
		});
		
		final HorizontalPanel panel = new HorizontalPanel();
		panel.add(addButton);
		panel.add(new HTML(label));
		
		return panel;
	}
	
}
