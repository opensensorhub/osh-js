/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


/**
 * <p><b>Title:</b>
 * XSDDouble
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO XSDDouble type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 01, 2011
 */
public class XSDBoolean extends RNGData<Boolean>
{
    private static final long serialVersionUID = -3036779990946574967L;


    @Override
    public boolean isValid(Boolean val)
    {
        return true;
    }
    
    
    @Override
    public boolean isValid(String val)
    {
        if (val == null)
            return false;
        
        try
        {
            boolean bVal = Boolean.parseBoolean(val);
            return isValid(bVal);
        }
        catch (Exception e)
        {
            return false;
        }
    }
    
    
    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }
    
    
    @Override
    protected RNGTag newInstance()
    {
        return new XSDBoolean();
    }
}
