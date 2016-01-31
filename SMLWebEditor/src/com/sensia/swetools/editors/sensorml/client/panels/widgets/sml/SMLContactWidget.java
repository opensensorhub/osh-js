package com.sensia.swetools.editors.sensorml.client.panels.widgets.sml;

import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.SimplePanel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SMLContactWidget extends AbstractSensorElementWidget{

	private static final String PHONE_NAME = "voice";
	private static final String ORGANISATION_NAME = "organisationName";
	private VerticalPanel container;
	private SimplePanel organisationPanel;
	
	//phone
	private SimplePanel voicePanel;
	
	//address
	private HorizontalPanel deliveryPointPanel;
	private HorizontalPanel cityPanel;
	private HorizontalPanel postalCodePanel;
	private HorizontalPanel countryPanel;
	private HorizontalPanel administrativeAreaPanel;
	private HorizontalPanel electronicMailAddressPanel;
	
	public SMLContactWidget() {
		super("contact", TAG_DEF.SML,TAG_TYPE.ELEMENT);
		container = new VerticalPanel();
		
		organisationPanel = new SimplePanel();
		voicePanel = new SimplePanel();
		
		deliveryPointPanel = new HorizontalPanel();
		cityPanel = new HorizontalPanel();
		postalCodePanel = new HorizontalPanel();
		countryPanel = new HorizontalPanel();
		administrativeAreaPanel = new HorizontalPanel();
		electronicMailAddressPanel = new HorizontalPanel();;
		
		HorizontalPanel subAddress = new HorizontalPanel();
		subAddress.add(cityPanel);
		subAddress.add(administrativeAreaPanel);
		subAddress.add(postalCodePanel);
		
		VerticalPanel addressPanel = new VerticalPanel();
		addressPanel.addStyleName("sub-address-panel");
		
		addressPanel.add(deliveryPointPanel);
		addressPanel.add(subAddress);
		addressPanel.add(countryPanel);
		addressPanel.add(electronicMailAddressPanel);
		
		container.add(organisationPanel);
		container.add(addressPanel);
		container.add(voicePanel);
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void activeMode(MODE mode) {
		
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getType() == TAG_TYPE.ELEMENT && widget.getDef() == TAG_DEF.GMD) {
			if(widget.getName().equals(ORGANISATION_NAME)) {
				organisationPanel.add(widget.getPanel());
			} else if(widget.getName().equals(PHONE_NAME)) {
				voicePanel.add(widget.getPanel());
			} else if(widget.getName().equals("deliveryPoint")) {
				deliveryPointPanel.add(widget.getPanel());
			} else if(widget.getName().equals("city")) {
				cityPanel.add(widget.getPanel());
				
				HTML countrySeparator = new HTML(",");
				countrySeparator.setStyleName("sub-address-country-separator");
				cityPanel.add(countrySeparator);
			} else if(widget.getName().equals("administrativeArea")) {
				administrativeAreaPanel.add(widget.getPanel());
			} else if(widget.getName().equals("postalCode")) {
				postalCodePanel.add(widget.getPanel());
			} else if(widget.getName().equals("country")) {
				countryPanel.add(widget.getPanel());
			} else if(widget.getName().equals("electronicMailAddress")) {
				electronicMailAddressPanel.add(widget.getPanel());
			}
		}
		//skip others
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SMLContactWidget();
	}

}
