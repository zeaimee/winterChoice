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
    // 开始答题
    $('.page-01').on('click', '#go-game',function(){
        console.log('gogame')
        $('.page-03').show();
        $('.page-01').hide();
        Game.init();
        if(musicStar.paused){
            musicStar.play();
            $('.open').show();
            $('.clock').hide();
        }
    });
    // 查看轮播图
    var swiper = null
    $('#otherResult').click(function(){
        $('.allResult-box').show()
        var depth = window.innerWidth/750*550
        var stretch = window.innerWidth/750*120
        swiper = new Swiper('#swiper-container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            slidesPerView: 'auto',
            loopedSlides:3,
            loopAdditionalSlides: 0,
            coverflow: {
                rotate: 0,
                stretch: stretch,
                depth: depth,
                modifier: 1,
                slideShadows : true
            } 
        });
        
    })
    // 轮播图控制
    $('.swiper-button-left').click(function(){
        swiper.slideNext()
    })
    $('.swiper-button-right').click(function(){
        swiper.slidePrev()
    })
    // 关闭轮播图
    $('#allResult-close').click(function(){
        swiper.destroy()
        $('.allResult-box').hide()
    })
    $('.allResult-box').on('click', '.go-result-detail', function(){
        var code = $(this).data('result')
        console.log('9---------',code)
        $('.allResult-box').hide()
        $('.resultD').hide()
        $('.resultJ').hide()
        $('.resultT').hide()
        var classname = Game.data.resultObj[code].classname
        $(classname).show()
        Game.data.shareObj.bg = Game.data.resultObj[code].url
    })
    // 生成海报分享
    $('#goResult').click(function(){
        drawImg(Game.data.shareObj)
    })
    //  查看视频
    $('#videobtn').click(function(){

    })
    var getPixelRatio = function(context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    };
    function drawImg (obj) {
        var canvas = document.createElement('canvas')//画布
        var ctx = canvas.getContext("2d");
        var ratio = getPixelRatio(ctx);
        canvas.width = window.innerWidth*ratio;
        canvas.height = window.innerHeight*ratio;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        
        var head = new Image()
        head.crossOrigin = "*";
        head.src = obj.head
        head.onload = function() {
            //画头像
            ctx.drawImage(head, 0, 0, head.width, head.height, 37/750*canvas.width, 1203/1450*canvas.height, 100/750*canvas.width, 100/750*canvas.width);
            var bg = new Image()
            bg.crossOrigin = "*";
            bg.src = obj.bg
            bg.onload = function() {
                 //画结果图
                ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, canvas.width, canvas.height);
                var erwm = new Image()
                erwm.crossOrigin = "*";
                erwm.src = obj.erwm
                erwm.onload = function () {
                      //画二维码
                    ctx.drawImage(erwm, 0, 0, erwm.width, erwm.height, 610/750*canvas.width, 1203/1450*canvas.height, 110/750*canvas.width, 110/750*canvas.width);
                     //画用户昵称
                    ctx.font = '14px';
                    ctx.fillStyle = '#4b9eee';
                    ctx.fillText('@'+ obj.username, 37/750*canvas.width, 1272/1450*canvas.height)
                    // 画发现我的精神图腾
                    ctx.font = '20px';
                    ctx.fillStyle = '#fff';
                    ctx.fillText('发现我的精神图腾', 37/750*canvas.width, 1230/1450*canvas.height)
                    //img 数据，可传给后台数据库
                    var imgData = canvas.toDataURL()
                    $('.result-share-img').attr('src', imgData)
                    $('.resultToShare').show()
                }
            }  
        }   
    }

    var initData = {
        QArr:[//题目和答案类容：id:题目序号，title：题目，right:真答案，error:假答案，inner:配图，answer:题目答案，1表示right对，0表示error对
            {
                id:1,
                title:'w1.png',
                a:'w1-a.png',
                b:'w1-b.png'
            },
            {
                id:2,
                title:'w2.png',
                a:'w2-a.png',
                b:'w2-b.png'
            },
            {
                id:3,
                title:'w3.png',
                a:'w3-a.png',
                b:'w3-b.png'
            },
            {
                id:4,
                title:'w4.png',
                a:'w4-a.png',
                b:'w4-b.png'
            },
            {
                id:5,
                title:'w5.png',
                a:'w5-a.png',
                b:'w5-b.png'
            },
            {
                id:6,
                title:'w6.png',
                a:'w6-a.png',
                b:'w6-b.png'
            }
        ],
        chosed:false,//是否按了对错按钮
        resultCode:{//结果展示
           tansuo: 4,
           hezuo: 3,
           jianchi: 2
        },
        resultObj:{
            4: {
                classname: '.resultT',
                url: 'img/T/T-saveimg.jpg'
            },
            3: {
                classname: '.resultD',
                url: 'img/D/D-saveimg.jpg'
            },
            2: {
                classname: '.resultJ',
                url: 'img/J/J-saveimg.jpg'
            }
        },
        score:0,//当前的分数 
        ranAnimate:['page-03-an01','page-03-an02','page-03-an03','page-03-an04','page-03-an05', 'page-03-an01'],
        item:null,//随机抽取的题目
        firstInit:true,
        commonpath: 'img/answerall/',
        index: 0,
        randclass: null,
        shareObj: {
            head: 'img/ball2.png',
            username: '123',
            bg: '',
            erwm: 'img/ball.png'
        }
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
            Game.data.item = Game.data.QArr[Game.data.index];
            $('.page-03').removeClass(Game.data.randclass)
            $('#answer-a, #answer-b').removeClass('yes');
            $('#title img').attr('src',Game.data.commonpath+Game.data.item.title);
            $('#answer-a .answer-inner').attr('src', Game.data.commonpath+Game.data.item.a);
            $('#answer-b .answer-inner').attr('src', Game.data.commonpath+Game.data.item.b);
            Game.data.randclass = Game.data.ranAnimate[Game.data.index]
            $('.page-03').addClass(Game.data.randclass);                           
        },
        handle:function(){//操作
            $('#answer-b').click(function(){
                console.log('8888')
                $('#answer-b').removeClass('yes');
                if(!$('#answer-b').hasClass('yes')){
                    $('#answer-b').addClass('yes');
                } 
                Game.next()
                          
            });   
            $('#answer-a').click(function(){
                console.log('222')
                $('#answer-b').removeClass('yes');
                if(!$('#answer-a').hasClass('yes')){
                    $('#answer-a').addClass('yes');
                }
                Game.data.score++  
                Game.next()         
            });   
                     
            $('#toShare').click(function(){
                $('.shareBg').show();
            });
            $('.shareBg').click(function(){
                $('.shareBg').hide();
            })
        },
        next: function() { // 下一题  
            sucMic.currentTime = 0;
            sucMic.play();
            // $('.shou-true').show();                        
            // console.log('第几题多少分',Game.data.score);
            console.log('已答题'+(Game.data.index+1), Game.data.score);
            var timer = setTimeout(function(){
                // $('.page-03-02').hide();
                if(Game.data.index<5){
                    Game.data.index++
                    Game.pageInit();
                    clearTimeout(timer);
                } else {
                    $('.page-03-03').show();
                    var timer02 = setTimeout(function(){
                        $('.page-03').hide();
                        $('.page-03-03').hide();
                        $('.page-04').show();
                        sresultMic.play();
                        var code = null
                        var resultclass = null
                        if (Game.data.score >= Game.data.resultCode.tansuo) {
                            console.log('>=4')
                           code = Game.data.resultCode.tansuo
                        } else if (Game.data.score == Game.data.resultCode.hezuo) {
                            code = Game.data.resultCode.hezuo
                            console.log('==3')
                        } else {
                            code = Game.data.resultCode.jianchi
                            console.log('<=2')
                        }
                        Game.data.shareObj.bg = Game.data.resultObj[code].url
                        resultclass = Game.data.resultObj[code].classname
                        $(resultclass).show()
                        clearTimeout(timer02);
                    }, 1500)
                }
            },500);
        },
        getResult: function (){
            console.log('完成答题'+Game.data.chosedNum,Game.data.item.id,Game.data.score);
            // $('#score').attr('src',Game.data.resultArr[Game.data.score]);
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
            'img/beginbg.jpg',
            "img/music-close.png",
            "img/music-open.png"
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