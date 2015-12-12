package com.sensia.swetools.editors.sensorml.client.panels;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;

public class Utils {

	private Utils(){}
	
	public static final DialogBox createDialogBox(Panel panel){
		final DialogBox dialogBox = new DialogBox();
		dialogBox.setGlassEnabled(true);
		dialogBox.setAnimationEnabled(true);
		
		//create Panel
		Panel main = new VerticalPanel();
		
		Button close = new Button("Close");
		close.addClickHandler(new ClickHandler() {
           public void onClick(ClickEvent event) {
        	   dialogBox.hide();
           }
        });
        
		main.add(panel);
		main.add(close);
		
		dialogBox.add(main);
		
		dialogBox.center();
         
		return dialogBox;
	}
}
