/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


/**
 * <p><b>Title:</b>
 * XSDToken
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO XSDToken type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class XSDToken extends XSDString
{
    private static final long serialVersionUID = -2965383137398379435L;


    @Override
    public boolean isValid(String val)
    {
        if (!super.isValid(val))
            return false;
        
        return !val.contains("  ");
    }
    
    
    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }

    
    @Override
    protected RNGTag newInstance()
    {
        return new XSDToken();
    }
}
