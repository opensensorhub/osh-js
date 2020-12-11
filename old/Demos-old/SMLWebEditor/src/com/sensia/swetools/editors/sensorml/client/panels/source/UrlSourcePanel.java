/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2016 DHAINAUT.
 All Rights Reserved.
 
 Contributor(s): 
    Mathieu DHAINAUT <mathieu.dhainaut@gmail.com>
 
 ******************************* END LICENSE BLOCK ***************************/
package com.sensia.swetools.editors.sensorml.client.panels.source;

import com.google.gwt.user.client.ui.CheckBox;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.SimplePanel;
import com.google.gwt.user.client.ui.TextBox;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;

/**
 * The Class UrlSourcePanel.
 */
public class UrlSourcePanel extends AbstractSourcePanel {

	
	private SimplePanel container;
	private TextBox urlBox;
	
	public UrlSourcePanel(final RNGProcessorSML smlEditorProcessor,final CheckBox editBox) {
		super(smlEditorProcessor,editBox);
		this.container = new SimplePanel();
		this.urlBox = new TextBox();
		
		urlBox.setStyleName("file-download");
		container.add(urlBox);
	}
	
	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	public void parseContent() {
		smlEditorProcessor.parse(urlBox.getText());
	}
}
