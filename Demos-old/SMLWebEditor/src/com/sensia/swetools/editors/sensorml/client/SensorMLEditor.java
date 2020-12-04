package com.sensia.swetools.editors.sensorml.client;

import com.google.gwt.user.client.ui.DockPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.panels.CenterPanel;
import com.sensia.swetools.editors.sensorml.client.panels.NavigationPanel;

/**
 * <p>
 * <b>Title:</b> SensorML Editor
 * </p>
 *
 * <p>
 * <b>Description:</b><br/>
 * Class implementing a full SensorML editor
 * </p>
 *
 * <p>
 * Copyright (c) 2010
 * </p>
 * 
 * @author Alexandre Robin
 * @date Sep 24, 2011
 */
public class SensorMLEditor {

	private Widget navigationPanel;
	private Widget centerPanel;
	
	public SensorMLEditor() {
		RNGProcessorSML sgmlEditorProcessor = new RNGProcessorSML();
		initPanels(sgmlEditorProcessor);
	}

	private void initPanels(final RNGProcessorSML sgmlEditorProcessor) {
		initCenterPanel(sgmlEditorProcessor);
		initNavigationPanel(sgmlEditorProcessor);
	}
	
	public void open(Panel parent) {
		parent.add(getViewer());
	}

	private Widget getViewer(){
		// Create a Dock Panel
	    DockPanel dock = new DockPanel();
	    dock.setStyleName("cw-DockPanel");
	    dock.setSpacing(4);
	    dock.setHorizontalAlignment(DockPanel.ALIGN_LEFT);
	    // Add text all around
	    
	    //dock.add(navigationPanel, DockPanel.WEST);
	    dock.add(centerPanel, DockPanel.CENTER);

	    // Return the content
	    dock.ensureDebugId("cwDockPanel");
	    return dock;
	}
	

	//------ INIT DIFFERENT PARTS -----//
	private void initCenterPanel(final RNGProcessorSML sgmlEditorProcessor) {
		centerPanel = new CenterPanel(sgmlEditorProcessor);
	}
	
	private void initNavigationPanel(final RNGProcessorSML sgmlEditorProcessor) {
		navigationPanel = new NavigationPanel(sgmlEditorProcessor);
	}
}
