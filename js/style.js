/******rem *******/
(function(win){
    var remCalc = {};
    var docEl = win.document.documentElement,
        tid,
        hasRem = true;
    hasZoom = true;
    designWidth = 750;
    function refresh(){
        var width = docEl.getBoundingClientRect().width;
        if(hasRem){
            var rem = width/10;
            docEl.style.fontSize = rem + "px";
            remCalc.rem = rem;
            var actualSize = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);
            if(actualSize!== rem && actualSize>0 && Math.abs(actualSize-rem)>1){
                var remScaled = rem*rem/actualSize;
                docEl.style.fontSize = remScaled + "px";
            }
        }
        if(hasZoom){
            var style = document.getElementById('y_style');
            if(!style){
                style = document.createElement('style');
                style.id = 'y_style';
            }
            style.innerHTML = '._z{zoom:'+ width/designWidth + '}';
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }
    function dbcRefresh(){
        clearTimeout(tid);
        tid = setTimeout(refresh,100);
    }
    win.addEventListener("resize",function(){
        dbcRefresh()
    },false);
    win.addEventListener("pageshow",function(e){
        if(e.persisted){
            dbcRefresh()
        }
    },false);
    refresh();
    if(hasRem){
        remCalc.refresh = refresh;
        remCalc.rem2px = function(d){
            var val = parseFloat(d)/this.rem;
            if(typeof d==="string" && d.match(/px$/)){
                val+="rem";
            }
            return val
        };
        win.remCalc = remCalc;
    }
})(window);

$(document).ready(function(){
   $('.go-rule').click(function(){
       $('.page-02').show();
       $('.page-01').hide();
   });
    $('#closePage').click(function(){
       $('.page-02').hide();
        $('.page-01').show();
    });
    $('.go-game').click(function(){
        $('.page-03').show();
        $('.page-02').hide();

        Game.init();
    });
    var initData = {
        chosedNum:0,//答了多少题
        QArr:[//题目和答案类容：id:题目序号，title：题目，right:真答案，error:假答案，inner:配图，answer:题目答案，1表示right对，0表示error对
            {
                id:1,
                title:'老婆在追孙俪的那年花开，结果看着看着就跑偏了，竟迷恋起了邓超…',
                right:'邓超的微博堪称孙俪的广告位，实力宠妻太吸粉了',
                error:'别慌，没有DX3搞不定的老婆，买一辆它就成假新闻了',
                inner:'img/title01.png',
                answer:0
            },
            {
                id:2,
                title:'女同事上班看极限挑战被领导撞见，以为会被diss，没成想却是让她去联系张艺兴',
                right:'啊~~~东南DX3要请我老公来做代言了！！！',
                error:'真会搞事情，老太太不服就服你！这要是真的我直播跪榴莲',
                inner:'img/title02.png',
                answer:1
            },
            {
                id:3,
                title:'自从战狼破了55亿票房奇迹后，老板都快瘦成东南吴彦祖了',
                right:'当初拒绝了战狼的投资请求，要是我早哭的像个3百斤的孩子了',
                error:'一看就是中央戏精学院毕业的，直接给DX3打广告不好吗！我不介意',
                inner:'img/title03.png',
                answer:0
            },
            {
                id:4,
                title:'一男子觉得自己月月水逆，然后一狠心花了十万块钱去找大师破解，然并卵…',
                right:'明明不努力，偏要怪水逆！十万足够买辆DX3了，从此成为有志青年',
                error:'大师肯定是骗子，免费破水逆，加微…（微不了了！此处严禁贴小广告）',
                inner:'img/title04.png',
                answer:1
            },
            {
                id:5,
                title:'女孩在男乘客衣服上误留唇印，在网上向“大嫂”解释：太挤了，口误哈',
                right:'哈哈哈…掐指一算，大哥回家必有一难！远离这种尴尬你只需一辆DX3',
                error:'然后有无数大哥跟老婆说：你看吧，人家小妹妹都在网上向你解释了',
                inner:'img/title05.png',
                answer:1
            },
            {
                id:6,
                title:'张先生自驾去野生动物园惨遭老虎围攻，最后凭借超强的加速度突出重围，自救成功',
                right:'朋友们，这是一道送分题啊！因为他开的是…',
                error:'开的是东南DX3是吧？哼哼，这点套路，我都会抢答了',
                inner:'img/title06.png',
                answer:0
            },
            {
                id:7,
                title:'都说没拿过奖的人生是不完美的人生，无论什么奖…',
                right:'这还不简单，谁还没得过几朵小红花似的',
                error:'这么说不公平！车生亦如此好伐，DX3拿奖到手软~',
                inner:'img/title07.png',
                answer:0
            },
            {
                id:8,
                title:'我女朋友买了DX3的“真心橙”后就想和我分手，说我名字不对…',
                right:'不…不会是我们东南总经理惹的祸吧，他名字谐音真心橙（捂脸）',
                error:'都是借口！真相只有一个，有了DX3她会停车了！',
                inner:'img/title08.png',
                answer:0
            },
            {
                id:9,
                title:'一朋友哭着说：路边的蔬菜你不要捡！否则就会发展出一个丈母娘，最后还让你买套房…',
                right:'套路太深，防不胜防啊…教你一招，开着DX3没房丈母娘也喜欢~',
                error:'捡把蔬菜就能赠个媳妇，还有这种好事？！在哪捡的我也蹲点去',
                inner:'img/title09.png',
                answer:1
            },
            {
                id:10,
                title:'有一位奇葩的相亲女说：长江以北全是农村，我不要！',
                right:'我要回农村，城市套路深！',
                error:'我是东南的，我就不这样，我们的DX3想和全国人民交朋友',
                inner:'img/title10.png',
                answer:0
            },
            {
                id:11,
                title:'一位资深球迷在看完那场赢了比赛却输了世界杯的直播后，哭着喊了一句：国足牛B，这次是站着死的！',
                right:'向前跑，不再有冷眼和嘲笑~9月，DX3与你一起，为国足喝彩！',
                error:'你会不会忽然的出线，也许在未来的很多年，我都等着看！',
                inner:'img/title11.png',
                answer:1
            },
            {
                id:12,
                title:'一位初入职场的小哥总被自己有车的领导蹭车，怕被潜规则就辞职了',
                right:'哈哈哈，看过后续报道，人家蹭车只是想给儿子也买一辆DX3而已',
                error:'现在的年轻人都这么嚣张了吗，刚工作就有车…我不信！！！（人家不贵好吧）',
                inner:'img/title12.png',
                answer:1
            },
            {
                id:13,
                title:'胡歌说自己的处女座原则：我可以脏乱但你一定要干净（连霸道都这么迷人）',
                right:'你长得好看你说什么都对（微笑）',
                error:'这可能是个假处女座…不是该力求完美吗，比如汽车中的处女座DX3',
                inner:'img/title13.png',
                answer:0
            },
            {
                id:14,
                title:'听说一小学生拿父母手机给女主播打call，狠刷十几万的礼物',
                right:'俗话说养娃不遛娃，不是好爸爸！DX3赐给你光辉家长的力量！',
                error:'吓得我攥紧了自己只剩100块的卡，哎…忘了自己还没对象呢',
                inner:'img/title14.png',
                answer:1
            },
            {
                id:15,
                title:'以前是女朋友追着喊：选我还是选游戏，现在成男友求她放下农药远离手机',
                right:'小乔李白我们走，有了农药谁还稀罕蓝朋友！',
                error:'那是你没有一辆DX3，兜风耍帅让你瞬间两米八，农药算个啥！',
                inner:'img/title15.png',
                answer:0
            }
        ],
        chosed:false,//是否按了对错按钮
        resultArr:[//结果展示
           'img/0fen.png',//0分
           'img/20fen.png',//20分
           'img/40fen.png',//40分
           'img/60fen.png',//60分
           'img/80fen.png',//80分
           'img/100fen.png'//100分
        ],
        score:0,//当前的分数
        randNum:null,//随机的index
        nowNum:['第一题','第二题','第三题','第四题','第五题'],//第多少题了
        ranAnimate:['page-03-an01','page-03-an02','page-03-an03','page-03-an04','page-03-an05'],
        item:null,//随机抽取的题目
        firstInit:true,
        answerNow:null
    };
    var Game = {
        data:{},
        init:function(){//初始化数据
            Game.data = JSON.parse(JSON.stringify(initData));
            Game.pageInit();
            Game.handle();
        },
        rand:function(n){//随机抽题
            return Math.floor(Math.random()*n)
        },
        pageInit:function(){//更换题目
            Game.data.chosed = false;
            Game.data.randNum = Game.rand(Game.data.QArr.length);
            Game.data.item = Game.data.QArr[Game.data.randNum];
            //console.log(Game.data.score);
            $('#change-Q').show();
            $('#next-Q').hide();
            $('#answer-a').removeClass('yes').removeClass('no');
            $('#answer-b').removeClass('no').removeClass('yes');
            
            $('#inner img').attr('src',Game.data.item.inner);
            $('#title span').html(Game.data.item.title);
            $('#answer-a p span').html(Game.data.item.right);
            $('#answer-b p span').html(Game.data.item.error);
            $('.page-03').addClass(Game.data.ranAnimate[Game.rand(5)]);
                        
            console.log('已答题'+Game.data.chosedNum,Game.data.item.id,Game.data.score);
        },
        handle:function(){//操作
            $('#answer-a').click(function(){
                console.log('222')
                $('#answer-b').removeClass('yes');
                if(!$('#answer-a').hasClass('yes')){
                    $('#answer-a').addClass('yes');
                    Game.data.answerNow = 1;
                }
                $('#change-Q').hide();
                if(Game.data.chosedNum>=4){
                    $('#result-Q').show();
                }else{
                    $('#next-Q').show();
                }
            });
            $('#answer-b').click(function(){
                console.log('8888')
                $('#answer-a').removeClass('yes');
                if(!$('#answer-b').hasClass('yes')){
                    $('#answer-b').addClass('yes');
                    Game.data.answerNow = 0;
                }
                $('#change-Q').hide();
                if(Game.data.chosedNum>=4){
                    $('#result-Q').show();
                }else{
                    $('#next-Q').show();
                }
            });      
            $('#result-Q').click(function(){//查看结果
               Game.getAnswer();
                console.log('完成答题'+Game.data.chosedNum,Game.data.item.id,Game.data.score);
                $('#score').attr('src',Game.data.resultArr[Game.data.score]);
                var timer02 = setTimeout(function(){
                    $('.page-03-02').hide();
                    $('.page-03-03').show();
                    clearTimeout(timer02);
                },1000);

                var timer = setTimeout(function(){
                    $('.page-03').hide();
                    $('.page-03-03').hide();
                    $('.page-04').show();
                    if(Game.data.score>=3){
                        sresultMic.play();
                    }else{
                        eresultMic.play();
                    }
                    clearTimeout(timer);
                },2500);
            });          
            $('#toShare').click(function(){
                $('.shareBg').show();
            });
            $('.shareBg').click(function(){
                $('.shareBg').hide();
            })
        },
        next: function() { // 下一题
            getAnswer();
            var timer = setTimeout(function(){
                $('.page-03-02').hide();
                Game.pageInit();
                clearTimeout(timer);
            },1000);
        },
        getAnswer: function(){
            if(!Game.data.chosed&&Game.data.chosedNum<=5){
                Game.data.chosedNum++;
                if(Game.data.item.answer== Game.data.answerNow){
                    sucMic.currentTime = 0;
                    sucMic.play();
                    $('.shou-true').show();
                    Game.data.score+=1;
                }else{
                    errMic.currentTime = 0;
                    $('.shou-wrong').show();
                    errMic.play();
                }
                Game.data.chosed = true;
                Game.data.QArr.splice(Game.data.randNum,1);
                console.log('第几题多少分',Game.data.chosedNum,Game.data.score);
            }
        }
    }
});
function ImgLoadingByFile(imgArray,loadPageID,loadTxtID,showpageID){
    function complete(long){
        var timer = setTimeout(function(){
            $('#'+loadPageID).hide();
            $('#'+showpageID).show();
            $('.btn-music').show();
            musicStar.play();
            
            //音乐
            clearTimeout(timer);
        },long);
    }
    if(sessionStorage.getItem("pageloaded")){
        $('#'+loadTxtID).addClass('zhizhenShow');
        complete(1300);
    }else{
        var imgLoad = 0;
        var btime = new Date();
        if(imgArray.length>0){
            var imgTotal = imgArray.length;
            var percent = 0;
            var img = [];
            for(var i = 0;i<imgArray.length;i++){
                img[i] = new Image();
                img[i].src=imgArray[i];
                img[i].onload = function(){
                    imgLoad++;
                    percent = parseInt(imgLoad/imgTotal*90);
                    $('#'+loadTxtID).css('transform','rotate('+(-45+percent)+'deg)');
                    console.log(percent);

                    if(percent>=90){
                        var etime = new Date();
                        console.log(etime-btime);
                        if(etime-1000>btime){
                            complete(100);
                        }else{
                            complete(200);
                        }
                        //alert(etime-btime);

                        sessionStorage.setItem("pageloaded", "true");

                    }
                }
            }
        }
    }
}

//横屏
function landscape(){
    //var w = window.innerWidth;
    //var h = window.innerHeight;
    var w = window.Utils.windowW();
    var h = window.Utils.windowH();
    $("body").css({"width":w,"height":h});
    $('#page-landscape').css({"width":w,"height":h}).show();
    $('#page-portrait').css({"width":w,"height":h});
    //$('#page-landscape').show();

}
var firstInit = true;
//竖屏
function portrait(){

    var w = window.Utils.windowW();
    var h = window.Utils.windowH();
    $('body').on('touchmove',function(e){
        e.preventDefault();
    });
    //初始化加载
    if(firstInit){
        $("body").css({"width":w,"height":h});
        $('#page-portrait').css({"width":w,'height':h}).show();
        $('#page-portrait').show();
        $('#page-landscape').hide();

        var imgFile = [
            "img/bg.png",
            "img/zhen02.png",
            "img/zhen03.png",
            "img/zhizhen.png",
            "img/button-begin.png",
            "img/change.png",
            "img/gfdg.png",
            "img/goon.png",
            "img/if-true.png",
            "img/if-wrong.png",
            "img/jiaojuan.png",
            "img/jisuanloading02.gif",
            "img/kaishi.png",
            "img/kuang-true.png",
            "img/kuang-wrong.png",
            "img/line.png",
            "img/mouse.png",
            "img/music-close.png",
            "img/music-open.png",
            "img/one-bg.png",
            "img/phone.png",
            "img/result-again.png",
            "img/result-share.png",
            "img/share.jpg",
            "img/shareBg.png",
            "img/tanchuang02.png",
            "img/shou-true02.png",
            "img/shou-wrong02.png",
            "img/title01.png",
            "img/title02.png",
            "img/title03.png",
            "img/title04.png",
            "img/title05.png",
            "img/title06.png",
            "img/title07.png",
            "img/title08.png",
            "img/title09.png",
            "img/title10.png",
            "img/title11.png",
            "img/title12.png",
            "img/title13.png",
            "img/title14.png",
            "img/title15.png",
            "img/0fen.png",
            "img/20fen.png",
            "img/40fen.png",
            "img/60fen.png",
            "img/80fen.png",
            "img/100fen.png"
        ];
        ImgLoadingByFile(imgFile,'loadingPage','zhizhen','pageContainer');
        firstInit = false;
    }else {
        //$('#page-portrait').show();
        //$('#page-landscape').hide();
        $("body").css({"width":w,"height":h});
        $('#page-portrait').css({"width":w,'height':h}).show();
        $('#page-landscape').hide();
    }
    $('.btn-music').click(function(){
        if(musicStar.paused){
            musicStar.play();
            _hmt.push(['_trackEvent', 'bgmusic', 'play', 'user']);
            $('.open').show();
            $('.clock').hide();
        }else{
            musicStar.pause();
            _hmt.push(['_trackEvent', 'bgmusic', 'pause', 'user']);
            $('.open').hide();
            $('.clock').show();
        }
    });

}

(function() {
    "use strict";

    function Utils() {
    }

    Utils.isWeiXin = function(){
        return navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/);
    };
    Utils.isQQ = function(){
        return navigator.userAgent.ua.match(/QQ\/([\d\.]+)/);
    };
    Utils.isQZone = function(){
        return navigator.userAgent.ua.indexOf("Qzone/") !== -1;
    };

    Utils.isIos = function() {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    };
    Utils.isIPhone = function() {
        return navigator.userAgent.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1;
    };
    Utils.isIpad = function() {
        return navigator.userAgent.indexOf('iPad') > -1;
    };
    Utils.isAndroid = function() {
        var u = navigator.userAgent;
        return navigator.userAgent.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    };
    Utils.isMobile = function() {
        // var u = navigator.userAgent;
        return navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i) != null;
    };

    // ## 屏幕方向
    Utils.isPortrait = function() {
        if (!Utils.isMobile()) {
            //alert(111);
            return true;

        }
        // 安卓版 微信里面 只用判断 width 和 height
        if (Utils.isAndroid() && Utils.isWeiXin()) {
            if (Utils.windowW() < Utils.windowH()) {
                //alert(22);
                return true;

            } else {
                //alert(331);
                return false;

            }
        }
        var orientation = window['orientation'];
        if (orientation||orientation==0) {
            if (orientation == 90 || orientation == -90) {
                //alert(4442);
                return false;

            }else{
                //alert(555111);
                return true;

            }
        } else {
            if (Utils.windowW() < Utils.windowH()) {
                //alert(666111);
                return true;

            } else {
                //alert(777111);
                return false;

            }
        }
    };
    // ## jquery 获取 window 的宽度
    Utils.windowW = function() {
        // var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        return $(window).width();
    };
    // ## jquery 获取 window 的高度
    Utils.windowH = function() {
        return $(window).height();
    };
    window.Utils = Utils;
}());
$(function(){
    onResize();
    if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", onResize, false);
    }else{
        window.addEventListener( "resize", onResize, false);
    }
});

function  onResize() {

    if(Utils.isPortrait()){
        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

            var timer = setTimeout(function(){
                portrait();

                clearTimeout(timer);
            },100);
        }else{
            portrait();
        }
    } else {
        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            var timer = setTimeout(function(){
                landscape();
                clearTimeout(timer);
            },100);
        }else{
            landscape();
        }
    }
}