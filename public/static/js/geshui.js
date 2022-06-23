var _income = 0, _insure = 0, _baseLine = 0,_special=0;
$(document).ready(function () {
    $("#txtIncomeNew").focus();

    document.getElementById("lblDetail").innerHTML = "查看详细计算过程";
    document.getElementById("linkDetail").innerHTML = "";
    document.getElementById("linkDetail").style.display = "none";
    document.getElementById("linkDetail").href = "#";
});

function btnReset_onClick() {
    _income = 0, _insure = 0, _baseLine = 0 ,_special=0;

    $("#txtIncome").focus();
    $("#txtIncome").val("");

    $("#txtInsure").val("0");
    $("#txtSpecial").val("0");
    $("#txtBaseLine").val(5000);

    $("#txtTaxableIncome").val("");
    $("#txtRate").val("");
    $("#txtDeduct").val("");
    $("#txtTax").val("");
    $("#txtIncomeAT").val("");

    document.getElementById("lblDetail").innerHTML = "查看详细计算过程";
    document.getElementById("linkDetail").innerHTML = "";
    document.getElementById("linkDetail").style.display = "none";
    document.getElementById("linkDetail").href = "#";
    clearMessages();
}

function clearMessages() {
    $("#lblMsgIncome")[0].innerHTML = "";
    $("#lblMsgInsure")[0].innerHTML = "";
    $("#lblMsgTax")[0].innerHTML = "";
    $("#lblMsgSpecial")[0].innerHTML = "";
    $("#lblMsgIncomeAT")[0].innerHTML = "";
    $("#lblMsgBaseLine")[0].innerHTML = "";
}

//点击计算按钮
function btnCalc_onClick() {
    clearMessages();

    //税前收入 验证
    var income = getTextBoxValue("txtIncome");
    if (income < 0) { zyyAlert("税前收入", "txtIncome", "lblMsgIncome", income); return; }

    //五险一金 验证
    var insure = getInsureValue();
    if (insure < 0) { zyyAlert("五险一金", "txtInsure", "lblMsgInsure", insure); return; }
    //专项附加 验证
    var special = getTextBoxValue("txtSpecial");
    if (special < 0) { zyyAlert("专项扣除", "txtSpecial", "lblMsgSpecial", special); return; }
    //个税起征点
    var baseLine = getTextBoxValue("txtBaseLine");
    if (baseLine < 0) { zyyAlert("个税起征点", "txtBaseLine", "lblMsgBaseLine", baseLine); return; }
    //去执行吧
    var result = calculationSalaryAct(0,income, insure, baseLine,special);

    submitSuccess(result)
}

//输入应纳税额点击反算按钮
function btnAntiTax_onClick() {
    clearMessages();
    //税前收入 验证
    var tax = getTextBoxValue("txtTax");
    if (tax < 0) { zyyAlert("应纳税额", "txtTax", "lblMsgTax", tax); return; }

    //五险一金 验证
    var insure = getInsureValue();
    if (insure < 0) { zyyAlert("五险一金", "txtInsure", "lblMsgInsure", insure); return; }

    //专项附加 验证
    var special = getTextBoxValue("txtSpecial");
    if (special < 0) { zyyAlert("专项扣除", "txtSpecial", "lblMsgSpecial", special); return; }

    //个税起征点
    var baseLine = getTextBoxValue("txtBaseLine");
    if (baseLine < 0) { zyyAlert("个税起征点", "txtBaseLine", "lblMsgBaseLine", baseLine); return; }
    //去执行吧
    var result = calculationSalaryTax(tax, insure, baseLine,special);
    submitSuccess(result)
}
//输入税后工资点击反算按钮
function btnIncomeAT_onClick() {
    clearMessages();
    //税前收入 验证
    var incomeAT = getTextBoxValue("txtIncomeAT");
    if (incomeAT < 0) { zyyAlert("税后工资", "txtIncomeAT", "lblMsgIncomeAT", incomeAT); return; }

    //五险一金 验证
    var insure = getInsureValue();
    if (insure < 0) { zyyAlert("五险一金", "txtInsure", "lblMsgInsure", insure); return; }

    //专项附加 验证
    var special = getTextBoxValue("txtSpecial");
    if (special < 0) { zyyAlert("专项扣除", "txtSpecial", "lblMsgSpecial", special); return; }

    //个税起征点
    var baseLine = getTextBoxValue("txtBaseLine");
    if (baseLine < 0) { zyyAlert("个税起征点", "txtBaseLine", "lblMsgBaseLine", baseLine); return; }
    //去执行吧
    var result = calculationSalaryAct(1,incomeAT, insure, baseLine,special)

    submitSuccess(result)
}
//将计算结果通过此方法回填到页面
function submitSuccess(result) {
    var obj = result;
    $("#txtIncome").val(fc(obj.Income));
    $("#txtInsure").val(fc(obj.Insure));
    $("#txtSpecial").val(fc(obj.Special));

    $("#txtTaxableIncome").val(fc(obj.TaxableIncome));
    $("#txtRate").val(obj.Rate * 100);
    $("#txtDeduct").val(fc(obj.Deduct));
    $("#txtTax").val(fc(obj.Tax));
    $("#txtIncomeAT").val(fc(obj.IncomeAT));

    _income = obj.Income, _insure = obj.Insure, _baseLine = obj.BaseLine,_special = obj.Special;

    document.getElementById("lblDetail").innerHTML = "";
    document.getElementById("linkDetail").innerHTML = "查看详细计算过程";
    document.getElementById("linkDetail").style.display = "";
}



function AccurateAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
//减法
function AccurateSubtract(arg1, arg2) {
    return this.AccurateAdd(arg1, -arg2);
}

//乘法
function AccurateMultiply(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//除法
function AccurateVivide(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

//保留两位小数
function getFloor(num) {
    return (num.toFixed(2));
}

//正推得到税率和速算扣除数（工资,年终奖）
function getTax(preTax) {
    var taxRate, deduction;
    if (preTax >= 0 && preTax <= 1500) {
        taxRate = 0.03;
        deduction = 0;
    } else if (preTax > 1500 && preTax <= 4500) {
        taxRate = 0.1;
        deduction = 105;
    } else if (preTax > 4500 && preTax <= 9000) {
        taxRate = 0.2;
        deduction = 555;
    } else if (preTax > 9000 && preTax <= 35000) {
        taxRate = 0.25;
        deduction = 1005;
    } else if (preTax > 35000 && preTax <= 55000) {
        taxRate = 0.3;
        deduction = 2755;
    } else if (preTax > 55000 && preTax <= 80000) {
        taxRate = 0.35;
        deduction = 5505;
    } else if (preTax > 80000) {
        taxRate = 0.45;
        deduction = 13505;
    }
    return {"taxRate": taxRate, "deduction": deduction};
}

//反推得到税率和速算扣除数（工资）
function getRelativeTax(preTax) {
    var taxRate, deduction;
    if (preTax > 0 && preTax <= 1455) {
        taxRate = 0.03;
        deduction = 0;
    } else if (preTax > 1455 && preTax <= 4155) {
        taxRate = 0.1;
        deduction = 105;
    } else if (preTax > 4155 && preTax <= 7755) {
        taxRate = 0.2;
        deduction = 555;
    } else if (preTax > 7755 && preTax <= 27255) {
        taxRate = 0.25;
        deduction = 1005;
    } else if (preTax > 27255 && preTax <= 41255) {
        taxRate = 0.3;
        deduction = 2755;
    } else if (preTax > 41255 && preTax <= 57505) {
        taxRate = 0.35;
        deduction = 5505;
    } else if (preTax > 57505) {
        taxRate = 0.45;
        deduction = 13505;
    }
    return {"taxRate": taxRate, "deduction": deduction};
}

//正推得到税率和速算扣除数（工资,年终奖） NEW
function getTaxNew(preTax) {
    var taxRate, deduction,rankIndex;
    if (preTax >= 0 && preTax <= 3000) {
        taxRate = 0.03;
        deduction = 0;
        rankIndex = 1;
    } else if (preTax > 3000 && preTax <= 12000) {
        taxRate = 0.1;
        deduction = 210;
        rankIndex = 2;
    } else if (preTax > 12000 && preTax <= 25000) {
        taxRate = 0.2;
        deduction = 1410;
        rankIndex = 3;
    } else if (preTax > 25000 && preTax <= 35000) {
        taxRate = 0.25;
        deduction = 2660;
        rankIndex = 4;
    } else if (preTax > 35000 && preTax <= 55000) {
        taxRate = 0.3;
        deduction = 4410;
        rankIndex = 5;
    } else if (preTax > 55000 && preTax <= 80000) {
        taxRate = 0.35;
        deduction = 7160;
        rankIndex = 6;
    } else if (preTax > 80000) {
        taxRate = 0.45;
        deduction = 15160;
        rankIndex = 7;
    }
    return { "taxRate": taxRate, "deduction": deduction,"rankIndex":rankIndex};
}

//反推得到税率和速算扣除数（工资,年终奖） NEW
function getRelativeTaxNew(preTax) {
    var taxRate, deduction,rankIndex;
    if (preTax >= 0 && preTax <= 2910) {
        taxRate = 0.03;
        deduction = 0;
        rankIndex = 1;
    } else if (preTax > 2910 && preTax <= 11010) {
        taxRate = 0.1;
        deduction = 210;
        rankIndex = 2;
    } else if (preTax > 11010 && preTax <= 21410) {
        taxRate = 0.2;
        deduction = 1410;
        rankIndex = 3;
    } else if (preTax > 21410 && preTax <= 28910) {
        taxRate = 0.25;
        deduction = 2660;
        rankIndex = 4;
    } else if (preTax > 28910 && preTax <= 42910) {
        taxRate = 0.3;
        deduction = 4410;
        rankIndex = 5;
    } else if (preTax > 42910 && preTax <= 59160) {
        taxRate = 0.35;
        deduction = 7160;
        rankIndex = 6;
    } else if (preTax > 59160) {
        taxRate = 0.45;
        deduction = 15160;
        rankIndex = 7;
    }
    return { "taxRate": taxRate, "deduction": deduction,"rankIndex":rankIndex};
}

//根据缴纳的个税得到税率和速算扣除数
function getPretaxNew(tax) {
    var taxRate, deduction,rankIndex;
    if (tax >= 0 && tax <= 90) {
        taxRate = 0.03;
        deduction = 0;
        rankIndex = 1;
    } else if (tax > 90 && tax <= 990) {
        taxRate = 0.1;
        deduction = 210;
        rankIndex = 2;
    } else if (tax > 990 && tax <= 3590) {
        taxRate = 0.2;
        deduction = 1410;
        rankIndex = 3;
    } else if (tax > 3590 && tax <= 6090) {
        taxRate = 0.25;
        deduction = 2660;
        rankIndex = 4;
    } else if (tax > 6090 && tax <= 12090) {
        taxRate = 0.3;
        deduction = 4410;
        rankIndex = 5;
    } else if (tax > 12090 && tax <= 20840) {
        taxRate = 0.35;
        deduction = 7160;
        rankIndex = 6;
    } else if (tax > 20840) {
        taxRate = 0.45;
        deduction = 15160;
        rankIndex = 7;
    }
    return { "taxRate": taxRate, "deduction": deduction,"rankIndex":rankIndex};
}
//计算工资
function calculationSalaryAct(type,income, five, rangeTemp,special) {
    var preTax = 0;//应纳税所得额
    var money = null;//税后工资
    var preTaxMoney = null;
    var tax = 0; //应纳税额
    var taxRate = 0;//税率
    var rankIndex = 0;//处于第几档
    var deduction = 0;//速算扣除数
    var range = rangeTemp;
    var taxObj = null;
    var specialTemp = special || 0;
    var temp1 = null;
    var sumTemp = 0;
    if (type == 0) {
        preTaxMoney = income;
        //五险一金
        sumTemp = this.AccurateAdd(range, five);
        sumTemp = this.AccurateAdd(sumTemp, specialTemp);
        if (preTaxMoney <= sumTemp) {
            return {
                "TaxableIncome": this.getFloor(preTax),
                "Rate": taxRate,
                "Deduct": deduction,
                "IncomeAT": this.getFloor(this.AccurateSubtract(preTaxMoney, five)),
                "Tax": this.getFloor(tax),
                "Income": this.getFloor(preTaxMoney),
                "Insure":five,
                "Special":specialTemp,
                "rankIndex":rankIndex,
                "BaseLine":rangeTemp
            }
        }
        temp1 = this.AccurateAdd(range, five); //税前 - 五险一金
        preTax = this.AccurateSubtract(preTaxMoney, temp1); //税前 - 五险一金 - 范围
        preTax = this.AccurateSubtract(preTax, specialTemp); //税前 - 五险一金 - 范围 - 特殊扣除项
        if (range==5000){
            taxObj = this.getTaxNew(preTax); //得到税率和扣除数
        }else{
            taxObj = this.getTax(preTax); //得到税率和扣除数
        }
        taxRate = taxObj.taxRate;
        deduction = taxObj.deduction;
        rankIndex = taxObj.rankIndex;
        tax = this.AccurateMultiply(preTax, taxRate);
        tax = this.AccurateSubtract(tax, deduction)
        temp1 = this.AccurateAdd(tax, five);
        money = this.AccurateSubtract(income, temp1);//再减去五险一金
    } else {
        //输入税后工资 税前工资 = （税后工资 - 起征点*税率 - 速算扣除数）/(1-税率) + 五险一金
        var temp = 0;
        var rateTemp = 0;
        money = income;
        //（五险 + 专项 + 起征点）
        temp = this.AccurateAdd(specialTemp, range);
        if (money <= temp) {
            return {
                "TaxableIncome": this.getFloor(preTax),
                "Rate": taxRate,
                "Deduct": deduction,
                "IncomeAT": this.getFloor(money),
                "Tax": this.getFloor(tax),
                "Income": this.getFloor(this.AccurateAdd(money, five)),
                "Insure":five,
                "Special":specialTemp,
                "rankIndex":rankIndex,
                "BaseLine":rangeTemp
            }
        }
        if (range == 5000){
            taxObj = this.getRelativeTaxNew(this.AccurateSubtract(money, temp)); //得到税率和扣除数
        }else{
            taxObj = this.getRelativeTax(this.AccurateSubtract(money, temp)); //得到税率和扣除数
        }
        taxRate = taxObj.taxRate;
        deduction = taxObj.deduction;
        rankIndex = taxObj.rankIndex;
        temp = this.AccurateAdd(five, temp);
        //（五险+专项+起征点）*税率
        temp = this.AccurateMultiply(temp, taxRate);
        //税后+五险
        rateTemp = this.AccurateAdd(money, five);
        //税后+五险-（五险+专项+起征点）*税率
        rateTemp = this.AccurateSubtract(rateTemp, temp);
        //（税后+五险-（五险+专项+起征点）*税率-速算）
        temp = this.AccurateSubtract(rateTemp, deduction);
        //（1-税率）
        rateTemp = this.AccurateSubtract(1, taxRate);
        //税前收入=（税后+五险-（五险+专项+起征点）*税率-速算）/（1-税率）
        preTaxMoney = this.AccurateVivide(temp, rateTemp);
        tax = this.AccurateSubtract(preTaxMoney, money);
        tax = this.AccurateSubtract(tax, five);
        preTax = this.AccurateAdd(money, tax);
        //报错的信息
        temp = this.AccurateAdd(specialTemp, range);
        preTax =this.AccurateSubtract(preTax, temp);
    }

    return {
        "TaxableIncome": this.getFloor(preTax),
        "Rate": taxRate,
        "Deduct": deduction,
        "IncomeAT": this.getFloor(money),
        "Tax": this.getFloor(tax),
        "Income": this.getFloor(preTaxMoney),
        "Insure":five,
        "Special":specialTemp,
        "rankIndex":rankIndex,
        "BaseLine":rangeTemp
    }
}
//通过应纳税额，计算结果 税前工资=（个税+速算扣除数）/税率+起征点+五险一金+专项扣除
function calculationSalaryTax(tax, five, rangeTemp,special) {
    var preTax = 0;//应纳税所得额
    var money = null;//税后工资
    var preTaxMoney = null;//税前工资
    var taxRate = 0;//税率
    var rankIndex = 0;//处于第几档
    var deduction = 0;//速算扣除数
    var range = rangeTemp;
    var specialTemp = special || 0;
    var taxObj = null;
    var temp = null;
    var fiveRangeTemp = null;
    taxObj = this.getPretaxNew(tax); //得到税率和扣除数
    taxRate = taxObj.taxRate;
    deduction = taxObj.deduction;
    rankIndex = taxObj.rankIndex;
    temp = this.AccurateAdd(tax, deduction); //（个税+速算扣除数）
    temp = this.AccurateVivide(temp, taxRate);//个税+速算扣除数）/税率
    fiveRangeTemp = this.AccurateAdd(five, range);//(起征点+五险一金)
    fiveRangeTemp = this.AccurateAdd(fiveRangeTemp, specialTemp);//(起征点+五险一金+专项扣除)
    preTaxMoney = this.AccurateAdd(temp, fiveRangeTemp);//个税+速算扣除数）/税率+起征点+五险一金+专项扣除
    preTax = this.AccurateSubtract(preTaxMoney, fiveRangeTemp);//应纳个税所得额 = 税前工资 - （五险一金 +起征点+专项扣除)
    temp = this.AccurateSubtract(preTaxMoney, five);
    money = this.AccurateSubtract(temp, tax);//税后工资 = 税前工资 - 五险一金-缴纳的税额
    return {
        "TaxableIncome": this.getFloor(preTax),
        "Rate": taxRate,
        "Deduct": deduction,
        "IncomeAT": this.getFloor(money),
        "Tax": this.getFloor(tax),
        "Income": this.getFloor(preTaxMoney),
        "Insure":five,
        "Special":specialTemp,
        "rankIndex":rankIndex
    }
}


function enterToCalc(evt) {
    evt = (evt) ? evt : ((window.event) ? window.event : "") //兼容IE和Firefox获得keyBoardEvent对象
    var key = evt.keyCode ? evt.keyCode : evt.which; //兼容IE和Firefox获得keyBoardEvent对象的键值
    if (key == 13) { //判断是否是回车事件。
        $("#btnCalc").click();
        return false;   //return false是为了停止表单提交，如果return true或者不写的话，表单照样是会提交的。
    }
}

function selCalcType_onchange() {
    if (document.all.selCalcType.value == 0) {
        location = location.href;
        return;
    }
    location = document.all.selCalcType.value;
}

function JTrim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
}







/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function fc(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}

function initRateTableColor(lineName, rowsCount) {
    for (var i = 1; i <= rowsCount; i++) {
        var obj = document.getElementById(lineName + i);
        obj.style.color = "black";
        obj.style.backgroundColor = "white";
    }
}

function setRateTableSelectedColor(lineName, rowsCount, index) {
    initRateTableColor(lineName, rowsCount)
    if (index == 0) return;
    var obj = document.getElementById(lineName + index);
    obj.style.color = "blue";
    obj.style.backgroundColor = "lightgray";
}
function getInsureValue() {
    var result = 0;
    var textBox = document.getElementById("txtInsure");
    var strIncome = textBox.value;

    if (JTrim(strIncome) == "") {
        textBox.value = 0;
        return 0;
    }
    strIncome = strIncome.replace(",", "");
    income = parseFloat(strIncome);
    if (isNaN(income)) {
        return -2;//-2表示数据无效
    }

    if (income < 0) {
        return -3;//-3表示不能小于0
    }
    return income;
}


function getTextBoxValue(textBoxID) {

    var result = 0;
    var textBox = document.getElementById(textBoxID);
    var strIncome = textBox.value;

    if (JTrim(strIncome) == "") {
        return -1;//-1表示为空
    }
    strIncome = strIncome.replace(",", "");

    income = parseFloat(strIncome);
    if (isNaN(income)) {
        return -2;//-2表示数据无效
    }

    //数据可以为0，但不能小于0
    if (income < 0) {
        return -3;//-3表示不能小于0
    }
    return income;
}


function zyyAlert(section, textBoxID, lblMsgID, id) {
    var lblMsg = document.getElementById(lblMsgID);
    if (id == -1) lblMsg.innerHTML = section + " 不能为空";
    else if (id == -2) lblMsg.innerHTML = section + " 数据无效";
    else if (id == -3) lblMsg.innerHTML = section + " 不能小于零";

    var textBox = document.getElementById(textBoxID);
    textBox.focus();
    textBox.select();
}