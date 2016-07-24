/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


/**
 * <p><b>Title:</b>
 * XSDAnyURI
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO XSDAnyURI type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class XSDAnyURI extends XSDString
{
    private static final long serialVersionUID = -3379631597101289329L;
    private static String urnRegex = "^urn:[a-zA-Z0-9][a-zA-Z0-9-]{0,31}:[a-zA-Z0-9()+,\\-.:=@;$_!*'%/?#]+$";
    private static String urlRegex = "^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]$";
    
    
    @Override
    public boolean isValid(String val)
    {
        if (!super.isValid(val))
            return false;
        
        return val.matches(urnRegex) || val.matches(urlRegex);
    }
    
    
    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }

    
    @Override
    protected RNGTag newInstance()
    {
        return new XSDAnyURI();
    }
}
