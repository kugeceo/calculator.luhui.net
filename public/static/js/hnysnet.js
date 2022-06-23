$(document).ready(function() {
	$("#mnav").click(function() {
		$("#navul").fadeToggle(500);
        $(".search").fadeOut();
		 $(".callkf").fadeOut();
	});
	$("#msearch").click(function() {
		$(".search").fadeToggle(500);
         $("#navul").fadeOut();
		 $(".callkf").fadeOut();
	});
		$("#mcall").click(function() {
		$(".callkf").fadeToggle(500);
         $("#navul").fadeOut();
		 $(".search").fadeOut();
	});
	
});
$(document).ready(function() {
	var A = document.location;
	$("#navul a").each(function() {
		if (this.href == A.toString().split("#")[0]) {
			$(this).addClass("cur");
			return false;
		}
	});
});
$(document).ready(function() {
	var A = document.location;
	$(".lower a").each(function() {
		if (this.href == A.toString().split("#")[0]) {
			$(this).addClass("cur");
			return false;
		}
	});
});
$(function() {
	var nav = $(".navbg");
	var win = $(window);
	var sc = $(document);
	win.scroll(function() {
		if (sc.scrollTop() >= 100) {
			nav.addClass("fixednav");
		} else {
			nav.removeClass("fixednav");
		}
	})
});

$(function(){  
        //页面初始化的时候，获取滚动条的高度（上次高度）  
        var start_height = $(document).scrollTop();  
        //获取导航栏的高度(包含 padding 和 border)  
        var fixednav_height = $('.fixednav').outerHeight();  
        $(window).scroll(function() {  
            //触发滚动事件后，滚动条的高度（本次高度）  
            var end_height = $(document).scrollTop();  
            //触发后的高度 与 元素的高度对比  
            if (end_height > fixednav_height){  
                $('.fixednav').addClass('hide');  
            }else {  
                $('.fixednav').removeClass('hide');  
            }  
            //触发后的高度 与 上次触发后的高度  
            if (end_height < start_height){  
                $('.fixednav').removeClass('hide');  
            }  
            //再次获取滚动条的高度，用于下次触发事件后的对比  
            start_height = $(document).scrollTop();  
        });  
    });  

$(function() {
	var nav = $("header");
	var win = $(window);
	var sc = $(document);
	win.scroll(function() {
		if (sc.scrollTop() >= 100) {
			nav.addClass("head_pf");
		} else {
			nav.removeClass("head_pf");
		}
	})
});

$(function(){  
        //页面初始化的时候，获取滚动条的高度（上次高度）  
        var start_height = $(document).scrollTop();  
        //获取导航栏的高度(包含 padding 和 border)  
        var head_pf_height = $('.head_pf').outerHeight();  
        $(window).scroll(function() {  
            //触发滚动事件后，滚动条的高度（本次高度）  
            var end_height = $(document).scrollTop();  
            //触发后的高度 与 元素的高度对比  
            if (end_height > head_pf_height){  
                $('.head_pf').addClass('head_hide');  
            }else {  
                $('.head_pf').removeClass('head_hide');  
            }  
            //触发后的高度 与 上次触发后的高度  
            if (end_height < start_height){  
                $('.head_pf').removeClass('head_hide');  
            }  
            //再次获取滚动条的高度，用于下次触发事件后的对比  
            start_height = $(document).scrollTop();  
        });  
    });  
