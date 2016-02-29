package com.sensia.swetools.editors.sensorml.client;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.xml.client.Document;
import com.sensia.gwt.relaxNG.RNGParser;
import com.sensia.gwt.relaxNG.RNGParserCallback;
import com.sensia.gwt.relaxNG.RNGWriter;
import com.sensia.gwt.relaxNG.XMLSensorMLParser;
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
					parseRNG(grammar);
				}
			});
		} else if(url.toLowerCase().endsWith(".xml")) {
		
			//transform XML document into RNG profile
			final XMLSensorMLParser parser = new XMLSensorMLParser();
			parser.parse(url, new RNGParserCallback() {
				
				@Override
				public void onParseDone(final RNGGrammar grammar) {
					parseRNG(grammar);
				}
			});
		}
	}

	public void parse(final String fileName,final String xmlContent) {
		//transform XML document into RNG profile
		final XMLSensorMLParser parser = new XMLSensorMLParser();
		final RNGGrammar grammar = parser.parse(fileName, xmlContent);
		parseRNG(grammar);
	}
	
	private void parseRNG(final RNGGrammar grammar) {
		RNGWriter rngWriter = new RNGWriter();
		Document doc = rngWriter.writeSchema(grammar, true);
		setLoadedGrammar(grammar);
		RNGRendererSML renderer = new RNGRendererSML();
		renderer.visit(grammar);
		for(final IParsingObserver observer : observers) {
			observer.parseDone(renderer.getRoot());
		}
	}
	
	public RNGGrammar getLoadedGrammar() {
		return loadedGrammar;
	}

	public void setLoadedGrammar(RNGGrammar loadedGrammar) {
		this.loadedGrammar = loadedGrammar;
	}
}
