<!-- Hide this script from old browsers -->

if (!document.layers&&!document.all)
event="test"
function showtip2(current,e,text,index){
	if (document.all&&document.readyState=="complete"){
		eval("var tooltip=document.all.tooltip" + index + ";")
		//tooltip.innerHTML='<marquee style="border:1px solid black">'+text+'</marquee>'
		tooltip.innerHTML='' + text + '</TABLE>'
		tooltip.style.pixelLeft=event.clientX+document.body.scrollLeft+10
		tooltip.style.pixelTop=event.clientY+document.body.scrollTop+10
		tooltip.style.visibility="visible"
	}
	else if (document.layers){
		eval("var tooltip=document.tooltip" + index + ";")
		eval("var nstip=document.tooltip" + index + ".document.nstip" + index + ";")
		nstip.document.write('<b>'+text+'</b>')
		nstip.document.close()
		nstip.left=0
		//currentscroll=setInterval("scrolltip(" + index + ")",100)
		tooltip.left=e.pageX+10
		tooltip.top=e.pageY+10
		tooltip.visibility="show"
	}
}

function hidetip2(index){
	if (document.all)
		eval("document.all.tooltip" + index + ".style.visibility='hidden';");
	else if (document.layers){
		//clearInterval(currentscroll)
		eval("document.tooltip" + index + ".visibility='hidden';")
	}
}

function scrolltip(index){
	eval("var nstip=document.tooltip" + index + ".document.nstip" + index + ";")
	if (nstip.left>=-nstip.document.width)
		nstip.left-=5
	else
		nstip.left=150
}

function montharr(m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11)
{
	this[0] = m0;
	this[1] = m1;
	this[2] = m2;
	this[3] = m3;
	this[4] = m4;
	this[5] = m5;
	this[6] = m6;
	this[7] = m7;
	this[8] = m8;
	this[9] = m9;
	this[10] = m10;
	this[11] = m11;
}

var CalendarOuterHTML = '';
var Today = new Date();
var DaysPerMonth = 0;

//Get the number of day in some month
function GetDayPerMonth(year,month)
{
	var monthDays = new montharr(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
		monthDays[1] = 29;
	DaysPerMonth = monthDays[month];	
}

function GetCalendarOuterHTML(CalendarIndex,HaveLayer)
{
	CalendarOuterHTML = '';		
	var thisYear = frmInput.txtYear.value;
	var thisMonth = parseInt(frmInput.txtMonth.value) +  CalendarIndex - 1 ;

	//title of the calendar
	CalendarOuterHTML = CalendarOuterHTML + "<table width='100%' align='center' border=0 cellspacing=0 cellpadding=3 id=Calendar" + CalendarIndex + ">";
	CalendarOuterHTML = CalendarOuterHTML + "<TR bgcolor=#FFCCCC><TD colspan=7 class=p2 align=center>";
	CalendarOuterHTML = CalendarOuterHTML + thisYear+' 年 ';
	CalendarOuterHTML = CalendarOuterHTML + thisMonth +' 月';
	CalendarOuterHTML = CalendarOuterHTML + "<TR bgcolor=#DADADA><TD  class=p2>日<TD  class=p2>一<TD  class=p2>二<TD  class=p2>三<TD  class=p2>四<TD  class=p2>五<TD  class=p2>六";
	CalendarOuterHTML = CalendarOuterHTML + "<TR bgcolor=#FFFFFF>";
	//Get the day of the first Day
	var firstDay = new Date(Date.UTC(frmInput.txtYear.value,(parseInt(frmInput.txtMonth.value)-2+CalendarIndex),1));
	testMe = firstDay.getDate();
	if (testMe == 2)
		firstDay.setDate(0); 
	startDay = firstDay.getDay();
		
    //display empty cells  before the first day of the month                
    column = 0;
	for (i=0; i<startDay; i++)
	{
		CalendarOuterHTML = CalendarOuterHTML + "<TD  class=p2>";
		column++;
	}
	
	//display the grids in the calendar
	var Lastday = new Date(Date.UTC(frmInput.txtYear.value,(parseInt(frmInput.txtMonth.value)-1),frmInput.txtDay.value))	
	GetDayPerMonth(thisYear,thisMonth-1)	
	
	for (i=1; i<=DaysPerMonth; i++)
	{
		CalendarOuterHTML = CalendarOuterHTML + "<TD  class=p2>";
		var color = "#FF9900";		//default color without layer displayed
		
		//Get layer HTML
		if (HaveLayer)
		{		
			var ThisDay = new Date(Date.UTC(thisYear,thisMonth-1,i))
		
			var msPerDay = 24 * 60 * 60 * 1000 ;
			var mensesCyc = parseInt(frmInput.txtMinMensesCyc.value);		//Min menses Cycle
			var msDiff = ThisDay.getTime() - Lastday.getTime();
			dayDiff = Math.floor(msDiff / msPerDay);						//get the days between thisday and lastday
			dayRemainder =	(dayDiff % mensesCyc + mensesCyc) % mensesCyc;
			//if (i<2)	{alert(ThisDay.toLocaleString()); alert(Lastday.toLocaleString()); alert(dayDiff);alert(dayRemainder);}
	
			var tooltips ="";		//content of layer
		
			if (dayRemainder>=0 && dayRemainder<=4)
			{	color = "#FF9900";qixian="<br /><span style='background: #FF9900;color:#fff;'>月经期</span>";
			}
			if (dayRemainder>=frmInput.txttianshu.value && dayRemainder<=(mensesCyc-20))
			{	color = "#009933";qixian="<br /><span style='background: #009933;color:#fff;'>安全期</span>";
			}
			if (dayRemainder>=(mensesCyc-19) && dayRemainder<=(mensesCyc-10))
			{	color = "#FF3300";qixian="<br /><span style='background: #FF3300;color:#fff;'>排卵期</span>";
			}
			if (dayRemainder>=(mensesCyc-9) && dayRemainder<=(mensesCyc-1))	
			{	color = "#009933";qixian="<br /><span style='background: #009933;color:#fff;'>安全期</span>";
		
			}
		
			iLayerIndex = 40*CalendarIndex + i ;		//index of layer

			
						
			CalendarOuterHTML = CalendarOuterHTML + "<div id=\"tooltip" + iLayerIndex + "\" style=\"position:absolute;visibility:hidden;clip:rect(0 150 150 0);width:180px;background-color:seashell\">";
			CalendarOuterHTML = CalendarOuterHTML + "<layer name=\"nstip" + iLayerIndex + "\" width=\"1000px\" bgColor=\"seashell\" height=\"500px\"></layer></div>";
		}
		
		CalendarOuterHTML = CalendarOuterHTML + "<FONT COLOR=\"" + color + "\">" + i + "</FONT>"+ qixian;
		
		column++;
		
		if (column == 7)
		{
			CalendarOuterHTML = CalendarOuterHTML + "<TR bgcolor=#FFFFFF>"; 
			column = 0;
		}
	}
	
	//display empty cells  after the final day of the month    
	var FinalDay = new Date(Date.UTC(frmInput.txtYear.value,(parseInt(frmInput.txtMonth.value)-2+CalendarIndex),DaysPerMonth));
	testMe = FinalDay.getDate();
	if (testMe == 2)
		FinalDay.setDate(0); 
	EndDay = FinalDay.getDay();
	for (i=EndDay; i<6; i++)
	{
		CalendarOuterHTML = CalendarOuterHTML + "<TD  class=p2>";
	}
	
	CalendarOuterHTML = CalendarOuterHTML + "</TABLE>";

}

//to check input errors and display both calendars
function DisplayCalendar()
{
	//check whether the date is legal
	if (frmInput.txtYear.value<1900||isNaN(frmInput.txtYear.value))
	{
		alert("请输入合法年份！")
		frmInput.txtYear.focus();
		return false;
	}
	if (isNaN(frmInput.txtMonth.value) || frmInput.txtMonth.value<1 || frmInput.txtMonth.value>12)
	{
		alert("请输入合法月份！")
		frmInput.txtMonth.focus();
		return false;
	}
	GetDayPerMonth(frmInput.txtYear.value,frmInput.txtMonth.value-1)
	if (isNaN(frmInput.txtDay.value) || frmInput.txtDay.value<1 || frmInput.txtDay.value>DaysPerMonth)
	{
		alert("请输入合法日期！")
		frmInput.txtDay.focus();
		return false;
	}
	var Lastday = new Date(Date.UTC(frmInput.txtYear.value,(parseInt(frmInput.txtMonth.value)-1),frmInput.txtDay.value))	
	if ((Today.getTime() - Lastday.getTime())<0)
	{
		alert("请输入正确的上次月经时间(不能早于当前时间)！")
		frmInput.txtYear.focus();
		return false;
	}	
	//check input
	if(isNaN(frmInput.txtMinMensesCyc.value))
	{
		alert("请输入数字！")
		frmInput.txtMinMensesCyc.focus();
		return false;
	}
	if(parseInt(frmInput.txtMinMensesCyc.value)>40 || parseInt(frmInput.txtMinMensesCyc.value)<24 )
	{
		alert("您输入的最短月经周期与标准月经周期相差太大，生理期在24-40天之间，请仔细核对。\n\n如输入确无问题请咨询医生！")
		frmInput.txtMinMensesCyc.focus();
		return false;
	}
	
	if(isNaN(frmInput.txtMaxMensesCyc.value) || parseInt(frmInput.txtMaxMensesCyc.value)<parseInt(frmInput.txtMinMensesCyc.value))
	{
		alert("输入错误，请仔细核对您的输入周期！");
		frmInput.txtMaxMensesCyc.focus();
		return false;
	}
	//display calendars
	GetCalendarOuterHTML(1,1);
	document.all.Calendar1.outerHTML = CalendarOuterHTML;
	GetCalendarOuterHTML(2,1);
	document.all.Calendar2.outerHTML = CalendarOuterHTML;	
}

//Initialize
function InitialCalendar()
{
	//Initialize the date input boxes
	frmInput.txtYear.value = Today.getYear();
	frmInput.txtMonth.value = Today.getMonth()+1;
	frmInput.txtDay.value = Today.getDate();
	
	//Initialize the calendars
	GetCalendarOuterHTML(1,0);
	document.all.Calendar1.outerHTML = CalendarOuterHTML;
	GetCalendarOuterHTML(2,0);
	document.all.Calendar2.outerHTML = CalendarOuterHTML;
	
	//Set focus
	frmInput.btnCalculate.focus();
}