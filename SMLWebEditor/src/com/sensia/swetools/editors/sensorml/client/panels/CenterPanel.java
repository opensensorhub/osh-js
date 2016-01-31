package com.sensia.swetools.editors.sensorml.client.panels;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.thirdparty.guava.common.io.Files;
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
	private static Map<String,String> xmlViews = new TreeMap<String,String>();
	
	static {
		profiles.put("Anemometer","rng1.0/profiles/CSM/anemometer.rng");
		profiles.put("Thermometer","rng1.0/profiles/CSM/thermometer-minimal-view.rng");
		
		xmlViews.put("Gamma 2070", "sensorML/gamma2070.xml");
		xmlViews.put("Davis_7817_complete", "sensorML/Davis_7817_complete.xml");
		xmlViews.put("Davis_7817_min", "sensorML/Davis_7817_min.xml");
		xmlViews.put("characteristics", "sensorML/characteristics.xml");
		xmlViews.put("csmFrame", "sensorML/csmFrame.xml");
		xmlViews.put("description", "sensorML/description.xml");
		xmlViews.put("disparateNetwork", "sensorML/disparateNetwork.xml");
		xmlViews.put("friendlyProcess", "sensorML/friendlyProcess.xml");
		xmlViews.put("identifiers", "sensorML/identifiers.xml");
		xmlViews.put("iotSimple", "sensorML/iotSimple.xml");
		xmlViews.put("locDescription", "sensorML/locDescription.xml");
		xmlViews.put("locDynamic", "sensorML/locDynamic.xml");
		xmlViews.put("locGML", "sensorML/locGML.xml");
		xmlViews.put("locOrientation", "sensorML/locOrientation.xml");
		xmlViews.put("locOutput", "sensorML/locOutput.xml");
		xmlViews.put("locStatic", "sensorML/locStatic.xml");
		xmlViews.put("metadata", "sensorML/metadata.xml");
		xmlViews.put("outputsParameters", "sensorML/outputsParameters.xml");
		xmlViews.put("outputsPosition", "sensorML/outputsPosition.xml");
		xmlViews.put("simpleMultiplex", "sensorML/simpleMultiplex.xml");
		xmlViews.put("simpleNetwork", "sensorML/simpleNetwork.xml");
		xmlViews.put("simpleProcess", "sensorML/simpleProcess.xml");
		xmlViews.put("streamRTP", "sensorML/streamRTP.xml");
		xmlViews.put("streamSimple", "sensorML/streamSimple.xml");
		xmlViews.put("streamingCBRNE", "sensorML/streamingCBRNE.xml");
		xmlViews.put("streamingNav", "sensorML/streamingNav.xml");
		xmlViews.put("weatherStation", "sensorML/weatherStation.xml");
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
		
		final ListBox viewXmlListBox = new ListBox(false);
		
		viewXmlListBox.addItem("");
		for(final String xmlView : xmlViews.keySet()) {
			viewXmlListBox.addItem(xmlView);
		}
		
		HTML titleProfile = new HTML("<b>SensorML XML:</b>");
		
		Button load = new Button("Load");
		
		panel.add(titleProfile);
		panel.add(viewXmlListBox);
		panel.add(load);
		
		load.addClickHandler(new LoadButtonClickListener(viewXmlListBox,xmlViews, sgmlEditorProcessor,edit));
		
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
