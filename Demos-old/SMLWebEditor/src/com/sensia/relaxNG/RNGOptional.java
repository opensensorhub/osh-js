/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


/**
 * <p><b>Title:</b>
 * RNGOptional
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO RNGOptional type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class RNGOptional extends RNGTagList
{
    private static final long serialVersionUID = 5940016433974397022L;
    protected boolean selected;
    
    
    public boolean isSelected()
    {
        return selected;
    }


    public void setSelected(boolean selected)
    {
        this.selected = selected;
    }


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }
    
    
    @Override
    public RNGOptional clone()
    {
        RNGOptional newTag = (RNGOptional)super.clone();
        newTag.selected = this.selected;
        return newTag;
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGOptional();
    }    
}
