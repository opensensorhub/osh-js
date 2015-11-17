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
public class RNGDefine extends RNGTagList
{
    private static final long serialVersionUID = 38991989429294816L;


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);
    }
    
    
    @Override
    public RNGDefine clone()
    {
        return (RNGDefine)super.clone();
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGDefine();
    }
}
