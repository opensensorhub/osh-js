package com.sensia.gwt.relaxNG;

public class QName {

	public String namespaceURI;
	public String localName;

	public QName(String ns, String name) {
		this.namespaceURI = ns;
		this.localName = name;
	}
}
