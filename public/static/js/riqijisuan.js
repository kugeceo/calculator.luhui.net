
var hzWeek= new Array("日","一","二","三","四","五","六","日");function cweekday(wday){return hzWeek[wday];}
function cala()
{
y=document.getElementById("SY").value;
m=document.getElementById("SM").value;
d=document.getElementById("SD").value;
ddd=document.getElementById("decday").value;

ttt=new Date(y,m-1,d).getTime()+ddd*24000*3600;

theday=new Date();
theday.setTime(ttt);
document.getElementById("result1").innerHTML=theday.getFullYear()+"年"+(1+theday.getMonth())+"月"+theday.getDate()+"日 "+"星期"+cweekday(theday.getDay());
}
function calb()
{

y2=document.getElementById("SY2").value;
m2=document.getElementById("SM2").value;
d2=document.getElementById("SD2").value;


y3=document.getElementById("SY3").value;
m3=document.getElementById("SM3").value;
d3=document.getElementById("SD3").value;


day2=new Date(y2,m2-1,d2);
day3=new Date(y3,m3-1,d3);

document.getElementById("result2").innerHTML=(day3-day2)/86400000+"天";


}