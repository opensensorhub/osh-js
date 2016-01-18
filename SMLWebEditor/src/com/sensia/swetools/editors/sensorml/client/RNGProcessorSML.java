package com.sensia.swetools.editors.sensorml.client;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.core.client.GWT;
import com.google.gwt.xml.client.Document;
import com.sensia.gwt.relaxNG.RNGInstanceWriter;
import com.sensia.gwt.relaxNG.RNGParser;
import com.sensia.gwt.relaxNG.RNGParserCallback;
import com.sensia.gwt.relaxNG.XMLSensorMLParser;
import com.sensia.gwt.relaxNG.XMLSerializer;
import com.sensia.relaxNG.RNGGrammar;
import com.sensia.swetools.editors.sensorml.client.renderer.RNGRendererSML;

public class RNGProcessorSML {

	private List<IParsingObserver> observers;
	private RNGGrammar loadedGrammar;
	
	public RNGProcessorSML(){
		this.observers = new ArrayList<IParsingObserver>();
	}
	
	public void addObserver(final IParsingObserver observer) {
		this.observers.add(observer);
	}
	
	public void parse(final String url) {
		if(url.toLowerCase().endsWith(".rng")) {
			final RNGParser parser = new RNGParser();
			parser.parse(url, new RNGParserCallback() {
				@Override
				public void onParseDone(final RNGGrammar grammar) {
					loadedGrammar = grammar;
					RNGRendererSML renderer = new RNGRendererSML();
					renderer.visit(grammar);
					for(final IParsingObserver observer : observers) {
						observer.parseDone(renderer.getRoot());
					}
				}
			});
		} else if(url.toLowerCase().endsWith(".xml")) {
		
			final XMLSensorMLParser parser = new XMLSensorMLParser();
			parser.parse(url, new RNGParserCallback() {
				
				@Override
				public void onParseDone(final RNGGrammar grammar) {
					RNGInstanceWriter instanceWriter = new RNGInstanceWriter();
					GWT.log("Parsing done");
					Document dom = instanceWriter.writeInstance(grammar);
					
					GWT.log(XMLSerializer.serialize(dom));
					loadedGrammar = grammar;
					RNGRendererSML renderer = new RNGRendererSML();
					renderer.visit(grammar);
					for(final IParsingObserver observer : observers) {
						observer.parseDone(renderer.getRoot());
					}
				}
			});
		}
	}
}
