


function parseDate(str){

    if(str.match(/^\d{4}[\-\/\s+]\d{1,2}[\-\/\s+]\d{1,2}$/)){
	
        return new Date(str.replace(/[\-\/\s+]/i,'/'));
    }
    else if(str.match(/^\d{8}$/)){
	
        return new Date(str.substring(0,4)+'/'+str.substring(4,6)+'/'+str.substring(6));
    }
    else{
        return ('日期格式不准确');
    }
}
function GetAgeByBrithday(birthday){
 var age=-1;
 var today=new Date();
 var todayYear=today.getFullYear();
 var todayMonth=today.getMonth()+1;
 var todayDay=today.getDate();
 var birthday=parseDate(birthday);

 if(birthday!='日期格式不准确')
		{   
			 birthdayYear=birthday.getFullYear();
			 birthdayMonth=birthday.getMonth();
			 birthdayDay=birthday.getDate();
			 if(todayYear-birthdayYear<0)
					 {
							alert("日期格式不准确!");
					 }
			 else
					 {
							if(todayMonth*1-birthdayMonth*1<0)
							{
								   age = (todayYear*1-birthdayYear*1);
							}
							else
							{
								   if(todayDay-birthdayDay>=0)
								   {//alert(thisDay+'-'+brithd+"_ddd");
										  age = (todayYear*1-birthdayYear*1);
								   }
								   else
								   {
										  age = (todayYear*1-birthdayYear*1)-1;
								   }
							}
					 }
					 
		 return age*1;
		 }
 else
 { 
   return -1;
 }
}

function signs(month,date) {

if (month == 1 && date >=20 || month == 2 && date <=18) {value = "水瓶座";}
if (month == 2 && date >=19 || month == 3 && date <=20) {value = "双鱼座";}
if (month == 3 && date >=21 || month == 4 && date <=19) {value = "白羊座";}
if (month == 4 && date >=20 || month == 5 && date <=20) {value = "金牛座";}
if (month == 5 && date >=21 || month == 6 && date <=21) {value = "双子座";}
if (month == 6 && date >=22 || month == 7 && date <=22) {value = "巨蟹座";}
if (month == 7 && date >=23 || month == 8 && date <=22) {value = "狮子座";}
if (month == 8 && date >=23 || month == 9 && date <=22) {value = "室女座";}
if (month == 9 && date >=23 || month == 10 && date <=22) {value = "天秤座";}
if (month == 10 && date >=23 || month == 11 && date <=21) {value = "天蝎座";}
if (month == 11 && date >=22 || month == 12 && date <=21) {value = "人马座";}
if (month == 12 && date >=22 || month == 1 && date <=19) {value = "摩羯座";}

return value;
}


function get_sx(birthyear)
{
var start = 1901;
x = (start - birthyear) % 12
if (x == 1 || x == -11) {value = "老鼠";}
if (x == 0) {value = "牛";}
if (x == 11 || x == -1) {value = "虎";}
if (x == 10 || x == -2) {value = "兔";}
if (x == 9 || x == -3)  {value = "龙";}
if (x == 8 || x == -4)  {value ="蛇";}
if (x == 7 || x == -5)  {value = "马";}
if (x == 6 || x == -6)  {value = "羊";}
if (x == 5 || x == -7)  {value = "猴";}
if (x == 4 || x == -8)  {value = "鸡";}
if (x == 3 || x == -9)  {value = "狗";}
if (x == 2 || x == -10)  {value = "猪";}


return value;
}

function get_xusui(byear)
{
var mydate=new Date();
var nonglitoday=CalConv(0,mydate.getFullYear(),mydate.getMonth(),mydate.getDate())
nongliyear=nonglitoday.substring(0,4)
return nongliyear-byear+1;

}
function get_tianshu(birthday)
{
var mydate=new Date();
birthday=new Date(birthday);
var days= mydate.getTime() -birthday.getTime(); 
var time = parseInt(days / (1000 * 60 * 60 * 24));
return time;
}

function get_xcshengri(birthday){
birthday=new Date(birthday);
mydate=new Date();
var mydate_year=mydate.getFullYear();
nbirthday_month=birthday.getMonth()+1;


var nongli=CalConv(0,mydate_year,nbirthday_month,birthday.getDate());

if (nongli==3 )
{	nbirthday_month=nbirthday_month+1;
	nbirthday=mydate_year+"/"+nbirthday_month+"/01";}
else
{
nbirthday=mydate_year+"/"+nbirthday_month+"/"+birthday.getDate();
}


var time1 = new Date(nbirthday).getTime();
var time2 = new Date().getTime();	
if(time1 >= time2){
nbirthday=nbirthday;
}
else
{
nbirthday=mydate_year+1+"/"+nbirthday_month+"/"+birthday.getDate();
}
var days=-1*get_tianshu(nbirthday);
var xq=new Date(nbirthday).getDay();
if (xq ==0) {xq = "星期天";}
if (xq ==1) {xq = "星期一";}
if (xq ==2) {xq = "星期二";}
if (xq ==3) {xq = "星期三";}
if (xq ==4) {xq = "星期四";}
if (xq ==5) {xq = "星期五";}
if (xq ==6) {xq = "星期六";}
return "距离下一次生日（"+nbirthday+"）还有："+days+"天，那天是"+xq;



}
//init(); 

//e2c(); 
//GetDateString(); 
//GetcDateString(); 

