package com.sensia.swetools.editors.sensorml.client.panels.widgets.sml;

import java.util.LinkedList;
import java.util.ListIterator;
import java.util.Map;
import java.util.Queue;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Image;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.xml.client.Document;
import com.google.gwt.xml.client.Element;
import com.google.gwt.xml.client.Node;
import com.google.gwt.xml.client.NodeList;
import com.google.gwt.xml.client.XMLParser;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGValue;
import com.sensia.swetools.editors.sensorml.client.listeners.ILoadFiledCallback;
import com.sensia.swetools.editors.sensorml.client.panels.Utils;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorAttributeWidget;

public class SMLSensorAttributeWidget extends SensorAttributeWidget{

	private Image defImage;
	private RNGAttribute attribute;
	
	public SMLSensorAttributeWidget(RNGAttribute attribute) {
		super(attribute.getName(),TAG_DEF.SML,TAG_TYPE.ATTRIBUTE);
		
		this.attribute = attribute;
		container = new HorizontalPanel();
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
	}
	
	@Override
	protected void addSensorWidget(final ISensorWidget widget) {
		if(getName().equals("definition") && widget.getType() == TAG_TYPE.VALUE) {
			defImage = new Image(GWT.getModuleBaseURL()+"images/icon_info.png");
			defImage.setTitle(widget.getName());
			defImage.addClickHandler(new ClickHandler() {
				
				@Override
				public void onClick(ClickEvent event) {
					 //Window.open(widget.getName(),"","");
					/*OntologyPanel ontologyPanel = new OntologyPanel();
					final DialogBox dialogBox = Utils.createDialogBox(ontologyPanel.getPanel(),"SWE Ontology",null);
					dialogBox.show();*/
					Window.open(widget.getName(),"","");
					
				}
			});
			
			defImage.addStyleName("graphic-icon");
			container.add(defImage);
		} else {
			super.addSensorWidget(widget);
		}
	}
	
	@Override
	public void setValue(String elementName,String value) {
		if(getName().equals(elementName)) {
			defImage.setTitle(value);
			RNGValue rngValue = attribute.getChildValue();
			if(value != null) {
				rngValue.setText(value);
			}
		}
	}
	
	@Override
	public void refresh() {
		super.refresh();
		RNGValue rngValue = attribute.getChildValue();
		defImage.setTitle(rngValue.getText());
		setName(rngValue.getText());
	}
	
	@Override
	public APPENDER appendTo() {
		return (getName().equals("definition")) ? APPENDER.HORIZONTAL:APPENDER.NONE;
	}
	
	private final class OntologyPanel {
		public VerticalPanel ontologyPanel;
		
		public OntologyPanel(){
			ontologyPanel = new VerticalPanel();
			
			final HTML test = new HTML();
			ontologyPanel.add(test);
			
			ILoadFiledCallback cb = new ILoadFiledCallback() {
				@Override
				public void onLoad(String content) {
					Document ontologyRoot = XMLParser.parse(content);
					parseOntology(ontologyRoot.getDocumentElement());
				}
			};
			
			Utils.getFile("ontologies/ont.swe", cb);
		}
		
		private void parseOntology(Element element){
			NodeList children = element.getChildNodes();
			for (int i = 0; i < children.getLength(); i++) {
				Node node = children.item(i);
				if(node.getNodeType() == Node.ELEMENT_NODE) {
					Element elt = (Element) node;
					if(elt.getNodeName().equals("rdf")){
						//ontologyPanel.add(new HTML(node.getNodeName()));
					}
					parseOntology((Element) node);
				}
			}
		}
		
		public Panel getPanel() {
			return ontologyPanel;
		}
		
		//ALGO PART
		
	}
	

}
