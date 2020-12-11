package com.sensia.swetools.editors.sensorml.client.listeners;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.ScrollPanel;
import com.google.gwt.xml.client.Document;
import com.sensia.gwt.relaxNG.RNGInstanceWriter;
import com.sensia.gwt.relaxNG.XMLSerializer;
import com.sensia.relaxNG.RNGGrammar;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;
import com.sensia.swetools.editors.sensorml.client.utils.Utils;

public class ViewAsXMLButtonClickListener implements ClickHandler{

	private RNGProcessorSML sgmlEditorProcessor;
	
	public ViewAsXMLButtonClickListener(final RNGProcessorSML sgmlEditorProcessor) {
		this.sgmlEditorProcessor = sgmlEditorProcessor;
	}
	
	@Override
	public void onClick(ClickEvent event) {
		RNGGrammar grammar = sgmlEditorProcessor.getLoadedGrammar();
		if(grammar != null) {
			RNGInstanceWriter instanceWriter = new RNGInstanceWriter();
			Document dom = instanceWriter.writeInstance(grammar);
			
			String xml = XMLSerializer.serialize(dom);
			
			String xmlText = xml.replaceAll("<", "&#60;");
	        xmlText = xmlText.replaceAll(">", "&#62;");
	        Label labelXml = new HTML("<pre>" + xmlText + "</pre>", false);
			
	        ScrollPanel panel = new ScrollPanel(labelXml);
			panel.setHeight("768px");
			panel.setWidth("1024px");
			
			Utils.createDialogBox(panel, "Sensor ML document",new IButtonCallback() {
				
				@Override
				public void onClick() {
					// TODO Auto-generated method stub
					
				}
			});
		}
	}

}
