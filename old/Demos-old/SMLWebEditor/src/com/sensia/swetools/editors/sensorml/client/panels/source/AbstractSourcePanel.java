package com.sensia.swetools.editors.sensorml.client.panels.source;

import com.google.gwt.user.client.ui.CheckBox;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;

public abstract class AbstractSourcePanel implements ISourcePanel{

	protected RNGProcessorSML smlEditorProcessor;
	private CheckBox edit;
	
	public AbstractSourcePanel(final RNGProcessorSML smlEditorProcessor,final CheckBox edit) {
		this.smlEditorProcessor = smlEditorProcessor;
		this.edit = edit;
	}
	
	public void checkEditButton() {
		if(edit != null) {
			edit.setVisible(true);
			edit.setChecked(false);
		}
	}
}
