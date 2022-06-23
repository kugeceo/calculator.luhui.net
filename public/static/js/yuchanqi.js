(function(){

    var $period = DOMUtil.getElementById("iperiod");
    var $year = DOMUtil.getElementById("iyear");
    var $month = DOMUtil.getElementById("imonth");
    var $day = DOMUtil.getElementById("iday");
    var $btn = DOMUtil.getElementById("submit");
    var $des =  DOMUtil.getElementById("des");
    var $result = DOMUtil.getElementsByClassName("result")[0];
    var $result_date = $result.getElementsByTagName("strong")[0];
    var $result_week = $result.getElementsByTagName("strong")[1];
    var $overTime = DOMUtil.getElementsByClassName("overtime")[0];

    var date = new Date();
    $year.value = date.getFullYear();
    $month.value = date.getMonth()+1;
    $day.value = date.getDate();

    function predictDate(iperiod,iyear,imonth,iday){
        //预产期
        var period = 280+iperiod-28;
        var preday = addDate(imonth+'/'+iday+'/'+iyear,period);
        var yy = preday.getFullYear();
        var mm = checkDdate(parseInt(preday.getMonth())+1);
        var dd = checkDdate(preday.getDate());
        //怀孕周期
        var today = new Date();
        var toDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var ov = addDate(imonth+'/'+iday+'/'+iyear,iperiod-28);
        var ovDate = ov.getFullYear()+'-'+(ov.getMonth()+1) +'-'+ ov.getDate();
        var dueDate = preday.getFullYear()+'-'+(preday.getMonth()+1)+'-'+preday.getDate();
        var weeksBetween = daysBetween(dueDate,toDate);
        if(weeksBetween>0){
            var weeks = parseInt(daysBetween(toDate,ovDate)/7)+1;
            $des.style.display = 'none';
            $result.style.display = 'block';
            var $week = $result.getElementsByTagName("p")[1];
            if($overTime.style){
                $overTime.removeAttribute('style');
            }
            $result_date.innerHTML = yy+'-'+mm+'-'+dd;
            if(weeks>0){
                if($week.style){
                    $week.removeAttribute('style');
                }
                $result_week.innerHTML = weeks;
            }else{
                $week.style.display = 'none';
            }
            
        }else{
            $des.style.display = 'none';
            $result.style.display = 'none';
            if($result.style){
                $result.removeAttribute('style');
            }
            $overTime.style.display = 'block';
        }
    }
    function addDate(time,Number){
        return new Date(Date.parse(time) + (86400000 * Number));
    }
    function checkDdate(date){
        if(date<10){
            date = "0"+date;
        }
        return date;
    }
    function daysBetween(dateOne,dateTwo){
        var oneYear = parseInt(dateOne.split('-')[0]);
        var oneMonth = parseInt(dateOne.split('-')[1]);
        var oneDay = parseInt(dateOne.split('-')[2]);
        var twoYear = parseInt(dateTwo.split('-')[0]);
        var twoMonth = parseInt(dateTwo.split('-')[1]);
        var twoDay = parseInt(dateTwo.split('-')[2]);
        dateOne =  Date.parse(oneMonth+'/'+oneDay+'/'+oneYear);
        dateTwo = Date.parse(twoMonth+'/'+twoDay+'/'+twoYear);
        var week = (dateOne-dateTwo)/86400000;
        return week;
    }
    $btn.onclick = function(){
        var $this = this;
        var iperiod = parseInt($period.value);
        var iyear = parseInt($year.value);
        var imonth = parseInt($month.value);
        var iday = parseInt($day.value);
        if(iperiod && iyear && imonth && iday){
            predictDate(iperiod,iyear,imonth,iday);
        }
    }

})();