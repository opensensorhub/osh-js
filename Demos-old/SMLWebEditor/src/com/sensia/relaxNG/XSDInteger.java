/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


/**
 * <p><b>Title:</b>
 * XSDDecimal
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO XSDDecimal type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class XSDInteger extends RNGData<Integer>
{
    private static final long serialVersionUID = 5512131299509524776L;


    public int getTotalDigits()
    {
        String val = this.getParam("totalDigits");
        if (val == null)
            return -1;
        else
            return Integer.parseInt(val);
    }
    
    
    public int getMinInclusive()
    {
        String val = this.getParam("minInclusive");
        if (val == null)
            return Integer.MIN_VALUE;
        else
            return Integer.parseInt(val);
    }
    
    
    public int getMaxInclusive()
    {
        String val = this.getParam("maxInclusive");
        if (val == null)
            return Integer.MAX_VALUE;
        else
            return Integer.parseInt(val);
    }
    
    
    public int getMinExclusive()
    {
        String val = this.getParam("minExclusive");
        if (val == null)
            return Integer.MIN_VALUE;
        else
            return Integer.parseInt(val);
    }
    
    
    public int getMaxExclusive()
    {
        String val = this.getParam("maxExclusive");
        if (val == null)
            return Integer.MAX_VALUE;
        else
            return Integer.parseInt(val);
    }
    
    
    @Override
    public boolean isValid(Integer val)
    {
        if (val >= getMaxExclusive())
            return false;                
        
        if (val > getMaxInclusive())
            return false;                
        
        if (val <= getMinExclusive())
            return false;
        
        if (val < getMinInclusive())
            return false;
        
        return true;
    }
    
    
    @Override
    public boolean isValid(String val)
    {
        if (val == null)
            return false;
        
        try
        {
            int iVal = Integer.parseInt(val);
            
            int totalDigits = getTotalDigits();
            if (totalDigits > 0)
            {
                int numDigits = val.length();
                if (iVal < 0) numDigits--;
                if (numDigits != totalDigits)
                    return false;
            }
            
            return isValid(iVal);
        }
        catch (NumberFormatException e)
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
        return new XSDInteger();
    }
}
