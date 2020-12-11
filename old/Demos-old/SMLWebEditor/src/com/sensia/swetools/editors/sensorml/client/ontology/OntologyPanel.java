package com.sensia.swetools.editors.sensorml.client.ontology;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.cell.client.TextCell;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.KeyPressEvent;
import com.google.gwt.event.dom.client.KeyPressHandler;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;
import com.google.gwt.event.logical.shared.ValueChangeEvent;
import com.google.gwt.event.logical.shared.ValueChangeHandler;
import com.google.gwt.safehtml.shared.SafeHtml;
import com.google.gwt.user.cellview.client.CellTable;
import com.google.gwt.user.cellview.client.Column;
import com.google.gwt.user.cellview.client.SafeHtmlHeader;
import com.google.gwt.user.cellview.client.SimplePager;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HasVerticalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.ScrollPanel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.view.client.ListDataProvider;
import com.google.gwt.xml.client.Document;
import com.google.gwt.xml.client.Element;
import com.google.gwt.xml.client.NamedNodeMap;
import com.google.gwt.xml.client.Node;
import com.google.gwt.xml.client.NodeList;
import com.google.gwt.xml.client.XMLParser;
import com.sensia.gwt.relaxNG.QName;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGValue;
import com.sensia.swetools.editors.sensorml.client.SensorConstants;
import com.sensia.swetools.editors.sensorml.client.listeners.ILoadFiledCallback;
import com.sensia.swetools.editors.sensorml.client.panels.charts.table.XYCoordinatesModel;
import com.sensia.swetools.editors.sensorml.client.utils.Utils;

public class OntologyPanel {
	public VerticalPanel ontologyPanel;
	private static List<String> sources = new ArrayList<String>();
	private SensorMLOntology sensorMLOntology;
	
	static {
		sources.add("SensorML");
	}
	
	public OntologyPanel(){
		ontologyPanel = new VerticalPanel();
		ontologyPanel.setStyleName("ontology-panel");
		//create list of sources url pointing to the ontology server
		final ListBox sourcesBox = new ListBox();
		for(final String source : sources) {
			sourcesBox.addItem(source);
		}
		sourcesBox.setStyleName("ontology-sourcesBox");
		
		final TextBox searchBox = new TextBox();
		
		//default use SensorML ontology
		sensorMLOntology = new SensorMLOntology();
		
		Panel resultTablePanel = sensorMLOntology.createTable();
		
		final HorizontalPanel hPanel = new HorizontalPanel();
		hPanel.add(new HTML("Source :"+SensorConstants.HTML_SPACE+SensorConstants.HTML_SPACE));
		hPanel.add(sourcesBox);
		hPanel.add(new HTML("Search :"+SensorConstants.HTML_SPACE+SensorConstants.HTML_SPACE));
		hPanel.add(searchBox);
		
		final VerticalPanel vPanel = new VerticalPanel();
		vPanel.add(hPanel);
		vPanel.add(resultTablePanel);
		
		ontologyPanel.add(vPanel);
		
		//load ontology 
		sensorMLOntology.loadOntology();
		
		//add key listener on searchBox
		searchBox.addKeyUpHandler(new KeyUpHandler() {
			
			@Override
			public void onKeyUp(KeyUpEvent event) {
				sensorMLOntology.setFilter(searchBox.getText());
				
			}
		});
	}
	
	public String getSelectedValue() {
		return sensorMLOntology.getSelectedValue();
	}
	
	public Panel getPanel() {
		return ontologyPanel;
	}
	
	
	//ALGO PART
}
