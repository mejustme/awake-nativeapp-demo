/**--------返回“0,1,2,3”分别对应着“左，上，右，下”---------**/
function judgeDir(target,e){

    var w = $(target).width();
    var h = $(target).height();
    //原生target.offsetLeft是相对于非static父元素的
    //此处必须要相对于文档，可以用getBoundingClientRect(), 或者 jquery.offset() 他们都是相对于文档
    //console.log(target.getBoundingClientRect())
    //console.log($(target).offset())
    var offset = $(target).offset();
    //var x = (e.pageX - target.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
    //var y = (e.pageY - target.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
    var x = (e.pageX - offset.left - (w / 2)) * (w > h ? (h / w) : 1);
    var y = (e.pageY - offset.top - (h / 2)) * (h > w ? (w / h) : 1);
    //Math.atan2(y, x) * (180 / Math.PI)  由于页面中坐标y正方向向下，故 算出来的 下面是0至180  上面是 0至-180
    // +180 变成 0至360，
    //通过 /90 分成四个区 0 - 1 - 2 - 3 - 4
    //通过 Math.round() 巧妙将 [0.5 - 1.5]=> 变成1 并且是左右45度角，此时1是上边
    //通过 %4  将 0与4 都变成 0 因为取整后 0 和 4 为左侧边
    var direction = Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90)  % 4;
    return direction;
}

function doEnter(event) {
    $mask = $(this).find('div');
    $mask.removeClass('transition-div');
    var dir = judgeDir(this,event);
    //进行过渡效果前要先将div移动到相应入口位置，因为之前离开和后来进入不一定是逆方向。
    var positionPreArr = [{'left':'-100%','top':0},{'left':'0','top':'-100%'},{'left':'100%','top':0},{'left':'0','top':'100%'}]
    var positionArr = [{'left':'0'},{'top':'0'},{'left':'0'},{'top':'0'}];
    $mask.css(positionPreArr[dir]);
    //.css({'top':'0'}) .css( ["width", "height", "color", "background-color"] )
    //.prop() .attr()也支持对象但不支持名称数组
    //因为css效果展现较慢，当先执行css，后在增加transition效果，还是会有影响，故延迟下
    setTimeout(function(){
        $mask.addClass('transition-div')
        $mask.css(positionArr[dir]);
    },20)

}

function doLeave(event) {
    $mask = $(this).find('div');
    var dir = judgeDir(this,event);
    //仅仅起隐藏作用
    var positionArr = [{'left':'-100%'},{'top':'-100%'},{'left':'100%'},{'top':'100%'}];
    $mask.css(positionArr[dir]);
}

$('ul li').on("mouseenter",doEnter).on("mouseleave",doLeave);