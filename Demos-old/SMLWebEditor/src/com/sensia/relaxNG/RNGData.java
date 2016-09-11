/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

import java.util.HashMap;
import java.util.Map;


public class RNGData<DataType> extends RNGTag
{
    private static final long serialVersionUID = -9076437581144319942L;
    protected String value;
    protected boolean confirmed;
    protected String type;
    protected Map<String, String> params;
    
    
    public RNGData()
    {
        params = new HashMap<String, String>();
    }
    
    
    public DataType getValue()
    {
        return (DataType)value;
    }
    
    
    public String getStringValue()
    {
        return value;
    }


    public void setValue(DataType value)
    {
        this.value = value.toString();
    }
    
    
    public void setStringValue(String value)
    {
        this.value = value;
    }


    public boolean isConfirmed()
    {
        return confirmed;
    }


    public void setConfirmed(boolean confirmed)
    {
        this.confirmed = confirmed;
    }


    public String getType()
    {
        return type;
    }


    public void setType(String type)
    {
        this.type = type;
    }


    public Map<String, String> getParams()
    {
        return params;
    }
    
    
    public String getParam(String param)
    {
        return params.get(param);
    }
    
    
    public void setParam(String param, String value)
    {
        params.put(param, value);
    }
    
    
    public boolean isValid(DataType val)
    {
        return true;
    }
    
    
    public boolean isValid(String val)
    {
        return true;
    }


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }
    
    
    @Override
    public RNGData<DataType> clone()
    {
        RNGData<DataType> newTag = (RNGData<DataType>)super.clone();
        newTag.value = this.value;
        newTag.type = this.type;
        newTag.params = this.params;
        return newTag;
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGData<DataType>();
    }
}
