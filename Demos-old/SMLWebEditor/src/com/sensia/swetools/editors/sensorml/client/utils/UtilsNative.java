package com.sensia.swetools.editors.sensorml.client.utils;

public class UtilsNative {

	public static native void consoleLog( String message) /*-{
		console.log( message );
	}-*/;
}
