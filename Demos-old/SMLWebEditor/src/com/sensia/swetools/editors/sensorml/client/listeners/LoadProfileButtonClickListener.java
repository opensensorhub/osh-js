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
import com.sensia.swetools.editors.sensorml.client.panels.source.ISourcePanel;

public class LoadProfileButtonClickListener implements ClickHandler{

	private ListBox profileListBox;
	private RNGProcessorSML smlEditorProcessor;
	private Map<String,String> profiles;
	
	public LoadProfileButtonClickListener(final ListBox profileListBox,final Map<String,String> profiles,final RNGProcessorSML smlEditorProcessor) {
		this.profileListBox = profileListBox;
		this.smlEditorProcessor = smlEditorProcessor;
		this.profiles = profiles;
	}
	
	@Override
	public void onClick(ClickEvent event) {
		if(profileListBox != null) {
			String key = profileListBox.getValue(profileListBox.getSelectedIndex());
			
			if(key != null && !key.isEmpty()){
				smlEditorProcessor.parse(profiles.get(key));
			}
		} else {
			Window.alert("The content seems empty or invalid");
		}
	}

}
