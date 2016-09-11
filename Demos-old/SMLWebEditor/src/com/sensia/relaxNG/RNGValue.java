/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


public class RNGValue extends RNGTag
{
    private static final long serialVersionUID = 1984861488694524366L;
    protected String text;
    
    
    public String getText()
    {
        return text;
    }


    public void setText(String text)
    {
        this.text = text;
    }


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }
    
    
    @Override
    public RNGValue clone()
    {
        RNGValue newTag = (RNGValue)super.clone();
        newTag.text = this.text;
        return newTag;
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGValue();
    }    
}
