/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2016 DHAINAUT.
 All Rights Reserved.
 
 Contributor(s): 
    Mathieu DHAINAUT <mathieu.dhainaut@gmail.com>
 
 ******************************* END LICENSE BLOCK ***************************/

package com.sensia.swetools.editors.sensorml.client.panels;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.CheckBox;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasVerticalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.IParsingObserver;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;
import com.sensia.swetools.editors.sensorml.client.listeners.LoadButtonClickListener;
import com.sensia.swetools.editors.sensorml.client.listeners.ViewAsXMLButtonClickListener;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.MODE;

public class CenterPanel extends Composite implements IParsingObserver{
	private static final long serialVersionUID = -7684111574093800909L;

	private VerticalPanel dynamicCenterPanel;
	private CheckBox edit;
	private ISensorWidget root;
	private RNGProcessorSML sgmlEditorProcessor;
	
	private static Map<String,String> profiles = new HashMap<String,String>();
	
	static {
		profiles.put("Anemometer","rng1.0/profiles/CSM/anemometer.rng");
		profiles.put("Thermometer","rng1.0/profiles/CSM/thermometer-minimal-view.rng");
		
	}
	
	public CenterPanel(final RNGProcessorSML sgmlEditorProcessor){
		sgmlEditorProcessor.addObserver(this);
		this.sgmlEditorProcessor = sgmlEditorProcessor;

		Panel profilePanel = getProfilePanel();
		Panel viewXmlPanel = getXMLViewPanel();
		

		//add View as XML button
		Button viewAsXML = new Button("View as XML");
		viewAsXML.addClickHandler(new ViewAsXMLButtonClickListener(sgmlEditorProcessor));
		
		HorizontalPanel panel = new HorizontalPanel();
		panel.add(viewXmlPanel);
		panel.add(profilePanel);
		panel.add(viewAsXML);
		
		dynamicCenterPanel = new VerticalPanel();
		
		
		final VerticalPanel verticalPanel = new VerticalPanel();
		verticalPanel.add(panel);
		verticalPanel.add(dynamicCenterPanel);
		initWidget(verticalPanel);
		
	}

	private Panel getXMLViewPanel() {
		final HorizontalPanel panel = new HorizontalPanel();
		panel.setSpacing(20);
		panel.setVerticalAlignment(HasVerticalAlignment.ALIGN_MIDDLE);
		
		HTML titleProfile = new HTML("<b>SensorML XML:</b>");
		FileUploadPanel fileUploadPanel = new FileUploadPanel();
		
		Button load = new Button("Load");
		
		panel.add(titleProfile);
		panel.add(fileUploadPanel.getPanel());
		panel.add(load);
		
		//add listener to handle event
		load.addClickHandler(new LoadButtonClickListener(fileUploadPanel, sgmlEditorProcessor,edit));
		
		return panel;
	}
	
	private Panel getProfilePanel() {
		final HorizontalPanel panel = new HorizontalPanel();
		panel.setSpacing(20);
		panel.setVerticalAlignment(HasVerticalAlignment.ALIGN_MIDDLE);
		
		final ListBox profileListBox = new ListBox(false);
		
		profileListBox.addItem("");
		for(final String profileName : profiles.keySet()) {
			profileListBox.addItem(profileName);
		}
		
		HTML titleProfile = new HTML("<b>Profiles:</b>");
		
		Button load = new Button("Load");
		edit = new CheckBox("Edit");
		
		panel.add(titleProfile);
		panel.add(profileListBox);
		panel.add(load);
		panel.add(edit);
		
		edit.setVisible(false);
		
		edit.addClickHandler(new ClickHandler() {
			
			@Override
			public void onClick(ClickEvent event) {
				if(root != null){
					MODE mode = (edit.isChecked()) ? MODE.EDIT : MODE.VIEW;
					root.switchMode(mode);
				}
			}
		});
		
		load.addClickHandler(new LoadButtonClickListener(profileListBox,profiles, sgmlEditorProcessor,edit));
		
		return panel;
	}
	/*
	 * (non-Javadoc)
	 * @see com.sensia.swetools.editors.sensorml.client.IParsingObserver#parseDone(com.sensia.swetools.editors.sensorml.client.panels.model.INodeWidget)
	 */
	@Override
	public void parseDone(final ISensorWidget topElement) {
		dynamicCenterPanel.clear();
		dynamicCenterPanel.add(topElement.getPanel());
		root = topElement;
	}
}
