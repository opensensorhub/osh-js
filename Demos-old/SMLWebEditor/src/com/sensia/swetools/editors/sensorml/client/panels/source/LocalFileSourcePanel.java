package com.sensia.swetools.editors.sensorml.client.panels.source;

import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.CheckBox;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;
import com.sensia.swetools.editors.sensorml.client.panels.FileUploadPanel;

public class LocalFileSourcePanel extends AbstractSourcePanel{

	private FileUploadPanel fileUploadPanel;
	
	public LocalFileSourcePanel(RNGProcessorSML smlEditorProcessor,final CheckBox editBox) {
		super(smlEditorProcessor,editBox);
		this.fileUploadPanel = new FileUploadPanel();
	}

	@Override
	public void parseContent() {
		final String fileContent = fileUploadPanel.getContents();
		if(fileContent != null && !fileContent.trim().isEmpty()){
			try {
				smlEditorProcessor.parse(fileUploadPanel.getFileName(), fileContent);
			} catch (Exception e) {
				Window.alert("An error occured while parsing the file. Check that it is a valid XML file");
			}
			checkEditButton();
		} else {
			Window.alert("The content seems empty or invalid");
		}
	}

	@Override
	public Panel getPanel() {
		return fileUploadPanel.getPanel();
	}

}
