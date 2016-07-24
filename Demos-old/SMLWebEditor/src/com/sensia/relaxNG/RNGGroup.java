/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

/**
 * <p><b>Title:</b>
 * RNGDefine
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO RNGDefine type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class RNGGroup extends RNGTagList
{
    private static final long serialVersionUID = 450744564603521038L;


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);
    }
    
    
    @Override
    public RNGGroup clone()
    {
        return (RNGGroup)super.clone();
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGGroup();
    }
}
