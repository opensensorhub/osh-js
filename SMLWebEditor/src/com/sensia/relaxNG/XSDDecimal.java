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
public class XSDDecimal extends RNGData<Double>
{
    private static final long serialVersionUID = 1961478317235071417L;


    public int getTotalDigits()
    {
        String val = this.getParam("totalDigits");
        if (val == null)
            return -1;
        else
            return Integer.parseInt(val);
    }
    
    
    public int getFractionDigits()
    {
        String val = this.getParam("fractionDigits");
        if (val == null)
            return -1;
        else
            return Integer.parseInt(val);
    }
    
    
    public double getMinInclusive()
    {
        String val = this.getParam("minInclusive");
        if (val == null)
            return Double.NEGATIVE_INFINITY;
        else
            return Double.parseDouble(val);
    }
    
    
    public double getMaxInclusive()
    {
        String val = this.getParam("maxInclusive");
        if (val == null)
            return Double.POSITIVE_INFINITY;
        else
            return Double.parseDouble(val);
    }
    
    
    public double getMinExclusive()
    {
        String val = this.getParam("minExclusive");
        if (val == null)
            return Double.NEGATIVE_INFINITY;
        else
            return Double.parseDouble(val);
    }
    
    
    public double getMaxExclusive()
    {
        String val = this.getParam("maxExclusive");
        if (val == null)
            return Double.POSITIVE_INFINITY;
        else
            return Double.parseDouble(val);
    }
    
    
    @Override
    public boolean isValid(Double val)
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
            double dVal = Double.parseDouble(val);
            return isValid(dVal);
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
        return new XSDDecimal();
    }
}
