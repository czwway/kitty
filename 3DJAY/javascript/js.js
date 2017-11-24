var specialimgs = [
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2243190015.webp',
            title:'《Jay》同名专辑2000-11-13'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184395860.webp',
            title:'《范特西》2001-09-20'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184392722.webp',
            title:'《八度空间》2002-07-18'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184392781.webp',
            title:'《叶惠美》2003-07-31'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184389417.webp',
            title:'《七里香》2004-08-03'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184389461.webp',
            title:'《11月的萧邦》2005-11-01'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184389487.webp',
            title:'《依然范特西》2006-09-01'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184389511.webp',
            title:'《我很忙》2007-11-01'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184389522.webp',
            title:'《魔杰座》2008-10-15'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184389532.webp',
            title:'《跨时代》2010-05-18'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184389541.webp',
            title:'《惊叹号》2011-11-11'
        },
        {
            imgurl:'https://img3.doubanio.com/view/photo/photo/public/p2184389546.webp',
            title:'《12新作》2012-12-28'
        },
        {
            imgurl:'https://img3.doubanio.com/lpic/s27969915.jpg',
            title:'《哎呦，不错哦》2014-12-26'
        },
        {
            imgurl:'https://img3.doubanio.com/lpic/s28836865.jpg',
            title:' 《周杰伦的床边故事》2016-06-24'
        },
    ];
var allimgs = [
        {
            imgurl:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3447632000,513882655&fm=27&gp=0.jpg',
            title:''
        }
    ]
allimgs.push.apply(allimgs,specialimgs);



    //文档加载完成
    window.onload = function (){
        creatView();
        getImg();
        setTimePrint();
        storyapply()
    }
    //点击导航栏
    navul.onclick = function(ev){
        //当前处于第几屏
        var viewHeight = document.documentElement.clientHeight;
        var nowIndex = Math.floor(((document.body.scrollTop - 60) / viewHeight) + 1);
        // console.log("当前第几屏："+nowIndex);
        //获取想到达的屏数
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        var index = target.innerHTML;
        // console.log("要去第几屏："+index);
        // if(nowIndex == index){
        //     return;
        // }
        var setScrollTop = 60 + (index - 1) * viewHeight;
        //向上或向下
        var goup = (nowIndex - index) >= 0 ?true :false
        //开始滚动
        var IntervalID = setInterval(function(){
            var iii = document.body.scrollTop - setScrollTop;
            if(iii<10&&iii>-10){
                document.body.scrollTop = setScrollTop;
                clearInterval(IntervalID);
                return;
            }
            if(goup){
                document.body.scrollTop = document.body.scrollTop - 10;
            }else{
                document.body.scrollTop = document.body.scrollTop + 10;
            }
            
        },10)
    }
    //滚动条
    window.onscroll = function(){
        //当前屏幕
        var viewHeight = document.documentElement.clientHeight;
        var nowIndex = Math.floor(((document.body.scrollTop - 60) / viewHeight) + 1);
        if(nowIndex == 0){return;}
        var childrenlength = navul.children.length;
        for(let i = 0;i<childrenlength;i++){
            navul.children[i].children[0].style.backgroundColor = "transparent";
        }
            navul.children[nowIndex -1 ].children[0].style.backgroundColor = "#fff";
    }



    //生成旋转界面
    function creatView(){
        let divNum = specialimgs.length;//div个数
        let divDeg = 360 / divNum;//div旋转角度
        let html = '';
        for(let i =0; i<divNum;i++){
            let deg = divDeg * i;
            let imgurl = specialimgs[i].imgurl;
            let title = specialimgs[i].title;
            html += '<div class="item" style="transform: rotateY(' + deg+ 'deg) translateZ(600px)"><img src="'+ imgurl +'" alt="" /><p>'+ title +'</p></div>';
        }
        items.innerHTML = html;
    }

    //缓存图片
    function getImg() { 
        let len = allimgs.length,
            count = 0;

        allimgs.forEach(function (value,index){
            var img = new Image();
            img.onload = function () {
                progress.innerHTML = '图片已加载' + Math.round((count / len )* 100)  + '%';
                if( count == len-1 ){
                    loding.style.display = "none";
                }
                count = count+1;
            }
            img.src=allimgs[index].imgurl;
        } )
    }

    //故事会
    function storyapply(){
        var len = storylist.children.length;
        console.log("len:"+len)
        for(var i = 0;i<len;i++){
            storylist.children[i].style.top = i * 10 + 'px';
            if( i < len/2){
                storylist.children[i].style.left = '-' + i * 20 + 'px';
            }else{

                storylist.children[i].style.left = '-' + Math.abs(len-i) * 20 + 'px';
            }
            
        }
    }


    //隐藏 故事列表
    function hide(t){
        t.parentNode.parentNode.classList.add("hide");
        // t.parentNode.parentNode.style.display = "none"
        setTimeout(function(){
            var text = `<div class="story">
                <p>hahahahahaaahahahahahaahahahahahahhahaahahaah，</p>
                <div class="storyinfo">
                    2017-09-12 12:12:12 | 陈志伟
                </div>
                <div class="storyicon">
                    <a href="javascript:void(0);" onclick="hide(this)"></a>
                    <a href="javascript:void(0);" onclick="good(this)"></a>
                </div>
            </div>`
            storylist.removeChild(t.parentNode.parentNode);
            storylist.insertAdjacentHTML("afterBegin", text);
            storyapply();
        },1000)
    }

    //隐藏输入面板
    function hideInputBox(){
        storyfrom.classList.add("hideInputBox");
        storyfrom.classList.remove('showInputBox');
    }
    //显示输入面板
    function showInputBox(){
        storyfrom.classList.add("showInputBox");
        storyfrom.classList.remove("hideInputBox");
    }










    //逐字打印
    function setTimePrint() {
        var text = `
<p>hello,大家好，我是<strong>周杰伦</strong></p>
<p>你们有多久没有听到虫鸣鸟叫的声音呢？</p>

<p>“什么时候开始听周杰伦？”</p>
<p>“在我6岁的时候，2000，周杰伦发行了自己的第一张专辑《JAY 同名专辑》，向世界推出了周杰伦三个字。到初三那年，我有机会听了《七里香》，我才认识到，原来这个人就是周杰伦，原来我在街头巷尾听到的好听的歌都是他的。因此，我有点愧疚没能更早的有机会好好听周杰伦。”;</p>
<p>“为什么喜欢周杰伦？”</p>
<p>“周杰伦”，一个从害羞青涩不喜欢说话的少年，大胆尝试，变成如今30多岁喜欢演唱会喜欢粉丝的小公举；一个被多少人误会谩骂的青年，坚持自我，变成多少人渴望回首的青春时代。说“周青春”，歌曲的前奏一想起，当年青涩的自己无知的自己遗憾的自己狂妄的自己，仿佛就在面前，甚至会笑他，却也只能笑笑而已。</p>

<p>“什么时候开始听周杰伦？”</p>
<p>“在我6岁的时候，2000，周杰伦发行了自己的第一张专辑《JAY 同名专辑》，向世界推出了周杰伦三个字。到初三那年，我有机会听了《七里香》，我才认识到，原来这个人就是周杰伦，原来我在街头巷尾听到的好听的歌都是他的。因此，我有点愧疚没能更早的有机会好好听周杰伦。”;</p>
<p>“为什么喜欢周杰伦？”</p>
<p>“周杰伦”，一个从害羞青涩不喜欢说话的少年，大胆尝试，变成如今30多岁喜欢演唱会喜欢粉丝的小公举；一个被多少人误会谩骂的青年，坚持自我，变成多少人渴望回首的青春时代。说“周青春”，歌曲的前奏一想起，当年青涩的自己无知的自己遗憾的自己狂妄的自己，仿佛就在面前，甚至会笑他，却也只能笑笑而已。</p>

<p>“什么时候开始听周杰伦？”</p>
<p>“在我6岁的时候，2000，周杰伦发行了自己的第一张专辑《JAY 同名专辑》，向世界推出了周杰伦三个字。到初三那年，我有机会听了《七里香》，我才认识到，原来这个人就是周杰伦，原来我在街头巷尾听到的好听的歌都是他的。因此，我有点愧疚没能更早的有机会好好听周杰伦。”;</p>
<p>“为什么喜欢周杰伦？”</p>
<p>“周杰伦”，一个从害羞青涩不喜欢说话的少年，大胆尝试，变成如今30多岁喜欢演唱会喜欢粉丝的小公举；一个被多少人误会谩骂的青年，坚持自我，变成多少人渴望回首的青春时代。说“周青春”，歌曲的前奏一想起，当年青涩的自己无知的自己遗憾的自己狂妄的自己，仿佛就在面前，甚至会笑他，却也只能笑笑而已。</p>
`
    var testLength = text.length;
    var i = 1;
    var IntervalID = setInterval(function(){
            inforight.scrollTop = pre.clientHeight;
            if( i > testLength){
                clearInterval(IntervalID);
                return;
            }
            pre.innerHTML =  text.substring(0,i) ;
            i++;
        },50);
    }