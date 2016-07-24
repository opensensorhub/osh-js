/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

import java.util.Date;


/**
 * <p><b>Title:</b>
 * XSDDateTime
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO XSDDateTime type description
 * TODO need to parse dates properly with a solution that works both on server and client
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 01, 2011
 */
public class XSDDateTime extends RNGData<Date>
{
    private static final long serialVersionUID = -7648936123552120227L;
    protected static String isoDatePattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ";
    //protected static DateFormat formatter;
    protected double timeZoneOffset;
    
    interface IDateTimeFormat
    {
        public Date parse(String date);
    }
    
    
    /*static
    {
        if (GWT.isClient())
            gwtFormatter = com.google.gwt.i18n.client.DateTimeFormat.getFormat(isoDatePattern);
        else
            formatter = new SimpleDateFormat(isoDatePattern);
    }*/
    
    
    public double getTimeZoneOffset()
    {
        return timeZoneOffset;
    }


    public void setTimeZoneOffset(double timeZoneOffset)
    {
        this.timeZoneOffset = timeZoneOffset;
    }
    
    
    @Override
    public boolean isValid(Date val)
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
            Date date = parseDate(val);
            
            // TODO compare to min/max dates
            
            return true;
        }
        catch (Exception e)
        {
            return false;
        }        
    }
    
    
    protected Date parseDate(String val) throws Exception
    {
        return new Date();//GWT.isClient() ? gwtFormatter.parse(val) : formatter.parse(val);
    }


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);
    }
    
    
    @Override
    protected RNGTag newInstance()
    {
        return new XSDDateTime();
    }
}
