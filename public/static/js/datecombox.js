function binddropdownliClick(){
	var root=$(this).parent().parent().parent().parent();
	var dropdown=$(".dropdown",$(this).parent().parent().parent());
	dropdown.text($(this).text());
	dropdown.attr("value",$(this).attr("value"));
	var year=$(".yearselect .dropdown",root).attr("value");
	var month=$(".monthselect .dropdown",root).attr("value");
	var day=$(".dayselect .dropdown",root).attr("value");
	if(root.hasClass("lunardate")){
		var lunarDays=LunarCalendar.getLunarMonthDays(year,month-1);
		if(lunarDays<day){
			$(".dayselect .dropdown",root).text("廿九");
			$(".dayselect .dropdown",root).attr("value",lunarDays);
		}
	}else{
		var calendar=LunarCalendar.solarCalendar(year,month);
		if(calendar.monthDays<day){
			$(".dayselect .dropdown",root).text(calendar.monthDays+"日");
			$(".dayselect .dropdown",root).attr("value",calendar.monthDays);
		}
	}
}
(function(){
	for (var i = 1891; i <= 2100; i++) {
		var yearli = $("<li value=\"" + i + "\">" + i + "年</li>");
		$(".yearselect .dropdownlist ul").append(yearli);
	}
	$("html").click(function (event) {
		$(".dropdownlist").hide();
		$(".colorpanel").hide();
	});
	$(".dayselect .dropdown").click(function(){
		var root=$(this).parent().parent();
		var year=$(".yearselect .dropdown",root).attr("value");
		var month=$(".monthselect .dropdown",root).attr("value");
		var calendar=LunarCalendar.solarCalendar(year,month);
		var monthDays=calendar.monthDays;
		$(".dayselect .dropdownlist ul",root).empty();
		for(var i=1;i<=monthDays;i++){
			var dayli=$("<li value=\""+i+"\">"+i+"日</li>");
			dayli.click(binddropdownliClick);
			$(".dayselect .dropdownlist ul",root).append(dayli);
		}
	});
	$(".dropdownlist li").click(binddropdownliClick);
	$(".dropdown").click(function(event){
		var $dropdownlist = $(".dropdownlist",$(this).parent());
		if ($dropdownlist.is(":visible")) {
			$dropdownlist.hide();
		} else {
			$(".dropdownlist").hide();
			$dropdownlist.show();
		}
		var wrapheight = $dropdownlist.get(0).offsetHeight;
		var listheight = $("ul", $dropdownlist).get(0).offsetHeight;
		if (listheight>wrapheight) {
			var current = $(this).attr("value");
			var currentYearLi = $("li[value='" + current + "']", $dropdownlist);
			var offsetTop=currentYearLi.get(0).offsetTop;
			$dropdownlist.scrollTop(offsetTop-wrapheight/2);
		}
		var width=$(this).innerWidth();
		if($dropdownlist.width()<width){
			$dropdownlist.width(width);
		}
		event.stopPropagation();
	});
	if(!$(".yearselect .dropdown").attr("value")||$(".yearselect .dropdown").attr("value")==""){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		$(".yearselect .dropdown").text(year + "年");
		$(".yearselect .dropdown").attr("value",year);
		$(".monthselect .dropdown").text(month + "月");
		$(".monthselect .dropdown").attr("value" ,month);
		$(".dayselect .dropdown").text(day + "日");
		$(".dayselect .dropdown").attr("value" , day);
	}
})()