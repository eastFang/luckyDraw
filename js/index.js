//抽奖人员名单
var allPersonList = [
    '赵洲',
    '赵志江',
    '庄越挺',
    '刘泽民',
    '张竹',
    '陈哲乾',
    '潘博远',
    '龚笑燕',
    '孔鸣',
    '肖舒文',
    '王禹潼',
    '薛弘扬',
    '叶珍权',
    '顾泽良',
    '冯美丽',
    '傅巧巧',
    '李一夫',
    '孙宇辰',
    '高师',
    '章丽华',
    '郑济元',
    '占涵冰',
    '陈凌昊',
    '熊隆祥',
    '夏春阳',
    '朱睿',
    '范金生',
    '邹飞',
    '封君',
    '杜娱宁',
    '熊家民',
    '刘晓丛',
    '李恩超',
    '曹文浩',
    '林志杰',
    '高云',
    '郑秦越',
    '顾茅',
    '张耀心',
    '邓振健',
    '倪追风',
    '许璐',
    '沈锴',
    '张子健',
    '杨德宏',
    '孙睿洋',
    '蒋文娟',
    '张珍妮',
    '沈星',
    '施方平',
    '左璇',
    '邹静',
    '沈铭章',
    '翁颖琦',
    '金韦克',
    '马晓锋',
    '尤翔远',
    '李立峰',
    '周杰',
    '高方洪',
    '翁婷婷',
    '戚佳郴',
    '张存义',
    '聂笑茹',
    '梅朝阳',
    '徐叶琛',
    '俞雪峰',
    '黄一鸣',
    '方镇东',
    '蒋欢欢',
    '陈飞扬',
    '孙赛',
    '梁国平',
    '张铠',
    '厉高远',
    '黎卓',
    '许锋锋',
    '郑琳琳',
    '蒋胜',
    '孙国洋',
    '陈小环',
    '刘天旗',
    '肖潼',
    '王国民',
    '杜林林',
    '刘少韦华',
    '贡燕',
    '来右琪',
    '郭兆宇',
    '李鹏',
    '章罻',
    '施鹏威',
    '程立谢',
    '陈文斌',
    '王滔明',
    '梅天文',
    '张妙静',
    '林震宇',
    '关扬帅',
    '朱建林',
    '王崇',
    '龚礼虹',
    '马贤敏',
    '王蓬',
    '郑琳',
    '邢元娜',
    '孙怡琳'
]
var allPerson = allPersonList.join(";");
//领导人员名单
// var leaderArr = ["方林", "宋浩", "叶辰", "田力玮", "樊清华", "张勇", "蒋明", "官鑫", "李国庆", "赖礼通", "石浩", "杨广霞"];
var leaderArr = []
//未中奖人员名单
var remainPerson = allPerson.toString().split(";");
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名
$(function () {
    iconAnimation();
    //开始抽奖
    $("#btnStart").on("click", function () {
        //判断是开始还是结束
        if ($("#btnStart").text() === "开始") {
            if (!$("#txtNum").val()) {
                showDialog("请输入中奖人数");
                return false;
            }
            if ($("#txtNum").val() > 49) {
                showDialog("一次最多只能输入49人");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>" + $("#txtNum").val() + "</b>人,奖池人数：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            $("#result").fadeOut();
            //显示动画框，隐藏中奖框
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");
        }
        else {
            $("#btnStart").text("开始");//设置按钮文本为开始
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//抽奖开始

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止输入框动画展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//隐藏输入框，显示中奖框
            $("#bgLuckyDrawEnd").addClass("bg");//添加中奖背景光辉
            $("#txtNum").attr("placeholder", "输入中奖人数(" + remainPerson.length + ")");
        }
    });

    $("#btnReset").on("click", function () {
        //确认重置对话框
        var confirmReset = false;
        showConfirm("确认重置吗？所有已中奖的人会重新回到抽奖池！", function () {
            //熏置未中奖人员名单
            remainPerson = allPerson.toString().split(";");
            //中奖人数框置空
            $("#txtNum").val("").attr("placeholder", "请输入中奖人数");
            $("#showName").val("");
            //隐藏中奖名单,然后显示抽奖框
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光辉
            times++;
            console.log(times);

        });
    });
});

//抽奖主程序
function startLuckDraw() {
    //抽奖人数
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("抽奖人数大于奖池人数！请修改人数。或者点重置开始将新一轮抽奖！");
        return false;
    }
    //随机中奖人
    var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
    var tempHtml = "";
    $.each(randomPerson, function (i, person) {
        if (leaderArr.indexOf(person) > -1 && times == 1) {
            tempHtml += "<span><b>" + person + "</b></span>";
        }
        else {
            tempHtml += "<span>" + person + "</span>";
        }
    });
    $("#result>div").html(tempHtml);
    //剩余人数剔除已中奖名单
    remainPerson = remainPerson.delete(randomPerson);
    //中奖人员
    luckyMan = luckyMan.concat(randomPerson);
    //设置抽奖人数框数字为空
    $("#txtNum").val("");
}

//参考这篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳动的数字
function move() {
    var $showName = $("#showName"); //显示内容的input的ID
    var interTime = 30;//设置间隔时间
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//输入框赋值
    }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
    var interTime = 200;//设置间隔时间
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//输入框赋值
    }, interTime);

}
