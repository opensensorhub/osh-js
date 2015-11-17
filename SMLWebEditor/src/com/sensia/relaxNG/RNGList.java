/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

import java.util.ArrayList;


/**
 * <p><b>Title:</b>
 * RNGList
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO RNGList type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class RNGList extends RNGTagList
{
    private static final long serialVersionUID = 4569089727532598655L;


    public RNGList()
    {
        children = new ArrayList<RNGTag>();
    }
    
    
    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }
    
    
    @Override
    public RNGList clone()
    {
        return (RNGList)super.clone();
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGList();
    }    
}
