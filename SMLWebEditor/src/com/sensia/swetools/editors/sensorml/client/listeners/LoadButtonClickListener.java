package com.sensia.swetools.editors.sensorml.client.listeners;

import java.util.Map;

import com.google.gwt.core.shared.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.CheckBox;
import com.google.gwt.user.client.ui.ListBox;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;
import com.sensia.swetools.editors.sensorml.client.panels.FileUploadPanel;

public class LoadButtonClickListener implements ClickHandler{

	private ListBox profileListBox;
	private FileUploadPanel fileUploadPanel;
	private RNGProcessorSML sgmlEditorProcessor;
	private CheckBox edit;
	private Map<String,String> profiles;
	
	public LoadButtonClickListener(final ListBox profileListBox,final Map<String,String> profiles,final RNGProcessorSML sgmlEditorProcessor,CheckBox edit) {
		this.profileListBox = profileListBox;
		this.sgmlEditorProcessor = sgmlEditorProcessor;
		this.edit = edit;
		this.profiles = profiles;
	}
	
	public LoadButtonClickListener(final FileUploadPanel fileUploadPanel,final RNGProcessorSML sgmlEditorProcessor,CheckBox edit) {
		this.sgmlEditorProcessor = sgmlEditorProcessor;
		this.fileUploadPanel = fileUploadPanel;
		this.edit = edit;
	}
	
	@Override
	public void onClick(ClickEvent event) {
		boolean isValid = false;
		
		if(profileListBox != null) {
			isValid = true;
			String key = profileListBox.getValue(profileListBox.getSelectedIndex());
			
			if(key != null && !key.isEmpty()){
				sgmlEditorProcessor.parse(profiles.get(key));
			}
		} else if(fileUploadPanel != null) {
			final String fileContent = fileUploadPanel.getContents();
			if(fileContent != null && !fileContent.trim().isEmpty()){
				isValid = true;
				sgmlEditorProcessor.parse(fileUploadPanel.getFileName(), fileContent);
			}
		} else {
			Window.alert("The content seems empty or invalid");
		}
		
		if(isValid && edit != null) {
			edit.setVisible(true);
			edit.setChecked(false);
		}
	}

}
