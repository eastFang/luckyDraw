//抽奖人员名单 张耀心 => 替换成了 琳琳
// var allPersonList = ["龚幸伟", "黄一鸣", "尤翔远", "郭浩", "张晓", "李晓纯", "孙国洋", "周杰", "方镇东", "戴雯", "项羽墨", "谷俊", "何远", "曹文浩", "郑秦越", "郑琳琳", "杨德宏", "孙赛", "厉高远", "王国民", "杨坤", "陈启健", "何龙艳", "刘秀", "屈志艳", "管祥祥", "许璐", "姚鹏辉", "张琪", "许锋锋", "高云", "张卓尔", "陈雪婧", "梅明康", "曾妮", "高彤彤", "郑怡萍", "向雅云", "李姝琳", "郭亮", "赵曦纯", "贡燕", "刘会中", "谢发涛", "赖玲珍", "周建新", "岳嘉", "熊家民", "王欣新", "封君", "张存义", "邹飞", "杜娱宁", "刘天旗", "王玮", "刘晓丛", "翁婷婷", "戚佳郴", "杜林林", "林玲玲", "胡翠婷", "陈蓉蓉", "陈小环", "施晓璟", "左璇", "陈鹤育", "龚笑燕", "章丽华", "宋辞", "孙宇辰", "韩婷", "陈哲乾", "李一夫", "顾泽良"]
var allPersonList = [
    "王国成",
    "赵志江",
    "陈哲乾",
    "李一夫",
    "顾泽良",
    "赵洲",
    "孙国洋",
    "管祥祥",
    "方镇东",
    "周杰",
    "项羽墨",
    "谷俊",
    "何远",
    "戴雯",
    "郑秦越",
    "王国民",
    "杨德宏",
    "孙赛",
    "厉高远",
    "杨坤",
    "张耀心",
    "陈启健",
    // "刘鑫",
    "刘秀",
    "蒋鹏程",
    "刘荣康",
    "陈记红",
    "葛琼",
    "龚幸伟",
    "李立峰",
    "沈铭章",
    "梅朝阳",
    "周夏伟",
    "黄一鸣",
    "李洁",
    "郭浩",
    "傅婷云",
    "陈龙宇",
    "虞赵阳",
    "许璐",
    "许锋锋",
    "张琪",
    "朱喆琪",
    "赵俊",
    "张英童",
    "高云",
    "庄泽",
    "牛伟杰",
    "方伟君",
    "蔡文芝",
    "李晓纯",
    "刘冰泉",
    "张琳威",
    "陈群",
    "陈哲如",
    "刘晓丛",
    "翁婷婷",
    "胡翠婷",
    "贾慧雯",
    "杜林林",
    "徐柳琴",
    "吴迪",
    "赵杜岑",
    "林玲玲",
    "张悦然",
    "陈小环",
    "朱诗怡",
    "高彤彤",
    "张士东",
    "宋承天",
    "向雅云",
    "郑怡萍",
    "李姝琳",
    "沈彤",
    "刘艺文",
    "龚嘉慧",
    "倪洁洁",
    "孙琪瑜",
    "康睿",
    "蔡嘉利",
    "陈厚志",
    "韩祥宇",
    "曾妮",
    "沈申婷",
    "吴博",
    "章科杰",
    "裴梓安",
    "邹飞",
    "彭坤",
    "杜娱宁",
    "张存义",
    "罗立立",
    "李江艇",
    "颜笋",
    "曾益乾",
    "刘天旗",
    "彭亚楠",
    "刘志远",
    "臧洪远",
    "滕越",
    "李世琴",
    "周龙飞",
    "杨爽",
    "王云飞",
    "盛高",
    "干红南",
    "章天杭",
    "邓文贝",
    "赖玲珍",
    "洪强",
    "韩腾龙",
    "邱波",
    "王晨晓",
    "熊家民",
    "王欣新",
    "詹培飞",
    "顾欣悦",
    "孙晶茹",
    "曹文浩",
    "康振奇",
    "孙清",
    "丁丹翔",
    "姜伟昊",
    "王宁",
    "施晓璟",
    "陈鹤育",
    "左璇",
    "岑雪琳",
    "潘慧嵘",
    "杨钦妃",
    "张蕾",
    "孙宇辰",
    "韩婷",
    "章丽华",
    "刘玉梅",
    "刘凝颖",
    "游晓媛",
    "孙志宏",
    "汪俊",
    "王书舒"
]
var allPerson = allPersonList.join(";");
//领导人员名单
var leaderArr = []  
//中奖人员名单
var luckyMan = [];
try {
    luckyMan = localStorage.getItem('luckyMan').split(','); // 中奖名单存本地
} catch (err) {
}
//未中奖人员名单
// var remainPerson = allPerson.toString().split(";");
var remainPerson = allPersonList.filter(it => luckyMan.indexOf(it) === -1);

var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名
$(function () {
    $("#txtNum").attr("placeholder", "输入中奖人数(" + remainPerson.length + ")");
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
            localStorage.removeItem('luckyMan')
            luckyMan = []
            //中奖人数框置空
            $("#txtNum").attr("placeholder", "输入中奖人数(" + remainPerson.length + ")");
            // $("#txtNum").val("").attr("placeholder", "请输入中奖人数");
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
    localStorage.setItem('luckyMan', luckyMan.join(','))
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
