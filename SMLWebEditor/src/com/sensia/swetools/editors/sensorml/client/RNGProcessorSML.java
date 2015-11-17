package com.sensia.swetools.editors.sensorml.client;

import java.util.ArrayList;
import java.util.List;

import com.sensia.gwt.relaxNG.RNGParser;
import com.sensia.gwt.relaxNG.RNGParserCallback;
import com.sensia.relaxNG.RNGGrammar;

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
		final RNGParser parser = new RNGParser();
		parser.parse(url, new RNGParserCallback() {
			@Override
			public void onParseDone(final RNGGrammar grammar) {
				loadedGrammar = grammar;
				RNGRendererSML renderer = new RNGRendererSML();
				renderer.visit(grammar);
				for(final IParsingObserver observer : observers) {
					observer.parseDone(renderer.getWidgets());
				}
			}
		});
	}
}
