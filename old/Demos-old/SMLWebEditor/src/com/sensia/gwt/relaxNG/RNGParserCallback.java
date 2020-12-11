/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.gwt.relaxNG;

import com.sensia.relaxNG.RNGGrammar;


public interface RNGParserCallback
{
    public void onParseDone(RNGGrammar grammar);
}
