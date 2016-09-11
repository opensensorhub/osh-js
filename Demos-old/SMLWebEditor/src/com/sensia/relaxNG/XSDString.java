/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


/**
 * <p><b>Title:</b>
 * XSDString
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO XSDString type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class XSDString extends RNGData<String>
{
    private static final long serialVersionUID = 1849819895968538034L;
    

    public int getLength()
    {
        String length = this.getParam("length");
        if (length != null)
            return Integer.parseInt(length);
        else
            return -1;
    }
    
    
    public int getMinLength()
    {
        String minLength = this.getParam("minLength");
        if (minLength != null)
            return Integer.parseInt(minLength);
        else
            return -1;
    }
    
    
    public int getMaxLength()
    {
        String maxLength = this.getParam("maxLength");
        if (maxLength != null)
            return Integer.parseInt(maxLength);
        else
            return -1;
    }
    
    
    public String getPattern()
    {
        return this.getParam("pattern");
    }
    
    
    @Override
    public boolean isValid(String val)
    {
        if (val == null)
            return false;
        
        boolean valid = true;
        int length = getLength();
        int minLength = getMinLength();
        int maxLength = getMaxLength();
        String regex = getPattern();
        int textLength = val.length();
        
        if (maxLength > 0 && textLength > maxLength)
            valid = false;
        
        else if (minLength > 0 && textLength < minLength)
            valid = false;
        
        else if (length > 0 && textLength != length)
            valid = false;
        
        else if (regex != null && !val.matches(regex))
            valid = false;
        
        return valid;
    }


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }

    @Override
    protected RNGTag newInstance()
    {
        return new XSDString();
    }
    
}
