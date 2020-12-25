/*基础JS扩展*/
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
} 
function arrIndexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) return i;
    }
    return -1;
};
function arrUnique(arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (arrIndexOf(array, arr[i]) == -1) {
            array.push(arr[i])
        }
    }
    return array;
};
/*日期时间相关*/
function getDaysBetween(dateString1, dateString2) {
    var startDate = Date.parse(dateString1);
    var endDate = Date.parse(dateString2);
    var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    // alert(days);
    return days;
}
/**
 * 在Date原型上绑定Format方法
 * 年(Y)可以用 1-4 个占位符，
 * 月(M)、日(D)、小时(h)、分(m)、秒(s) 可以用 1-2 个占位符， 
 * 毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 */
Date.prototype.Format = function (style) {
    var formatTime = '';
    var timeObj = {
        "M+": this.getMonth() + 1, //月份 
        "D+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(Y+)/.test(style)) {
        formatTime = style.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in timeObj) {
        if (new RegExp("(" + k + ")").test(formatTime)) {
            formatTime = formatTime.replace(RegExp.$1, (RegExp.$1.length == 1) ? (timeObj[k]) : (("00" + timeObj[k]).substr(("" + timeObj[k]).length)));
        }
    }
    return formatTime;
}

function toJSON(o) {
    if (typeof o == 'string') {
        try {
            var obj = JSON.parse(o);
            return obj;

        } catch (e) {
            console.log('error：' + str + '!!!' + e); 
        }
    }
    return o;
}
/*以下多为界面响应*/
$(document).ready(function () {

    // Toggle Left Menu
    jQuery('.leftpanel .nav-parent > a').click(function () {

        var parent = jQuery(this).parent();
        var sub = parent.find('> ul');

        // Dropdown works only when leftpanel is not collapsed
        if (!jQuery('body').hasClass('leftpanel-collapsed')) {
            if (sub.is(':visible')) {
                sub.slideUp(200, function () {
                    parent.removeClass('nav-active');
                    //jQuery('.mainpanel').css({height: ''});
                    //adjustmainpanelheight();
                });
            } else {
                closeVisibleSubMenu();
                parent.addClass('nav-active');
                sub.slideDown(200);
            }
            $('.leftpanelinner').height($(window).height() - 250);
        }
        return false;
    });

    function closeVisibleSubMenu() {
        jQuery('.leftpanel .nav-parent').each(function () {
            var t = jQuery(this);
            if (t.hasClass('nav-active')) {
                t.find('> ul').slideUp(200, function () {
                    t.removeClass('nav-active');
                });
            }
        });
    }
    function InitSize() {
        var lhei = ($(window).height());
        var mhei = $('.mainpanel').height();
        //alert(mhei + "/" + lhei);
        if (lhei < mhei)
            $('.leftpanel').height(mhei);
        else
            $('.leftpanel').height(lhei);

        $('.btn-search').click(function () {
            $('.Page' + $(this).attr("ids")).val("1");
        })
    }
    $(function () {
        InitSize();
    })
    window.onresize = function () {
        InitSize();
    }



    // Menu Toggle
    jQuery('.menutoggle').click(function () {

        var body = jQuery('body');
        var bodypos = body.css('position');

        if (bodypos != 'relative') {
            if (!body.hasClass('leftpanel-collapsed')) {
                body.addClass('leftpanel-collapsed');
                jQuery('.nav-bracket ul').attr('style', '');

                jQuery(this).addClass('menu-collapsed');

            } else {
                body.removeClass('leftpanel-collapsed chat-view');
                jQuery('.nav-bracket li.active ul').css({ display: 'block' });

                jQuery(this).removeClass('menu-collapsed');

            }
        } else {

            if (body.hasClass('leftpanel-show'))
                body.removeClass('leftpanel-show');
            else
                body.addClass('leftpanel-show');

            adjustmainpanelheight();
        }

    });
    //右侧层，置于mask至上

});


// Add class everytime a mouse pointer hover over it
jQuery('.nav-bracket > li').hover(function () {
    jQuery(this).addClass('nav-hover');
}, function () {
    jQuery(this).removeClass('nav-hover');
});


window.onscroll = function () {

    //面板跟随滚动
    var h_scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚动的距离
    var topValue = 50 - h_scrollTop;
    if (topValue < 0) topValue = 0;
    //$('.leftpanel').css("top", topValue + "px");
}




/*
各类弹窗
*/
function MyAlert(con) {
    layer.alert(con);
}


/**
	 * 动态生成文字居中的Bootstrap ProgressBar
	 * @return {string} 返回包含progressBar的HTML string
	 * @param {string} str - 需要显示的文字
	 * @param {string} width - 进度条占比,CSS代码
	 * @param {string} type - 进度条类型['danger'|'warning'|'info'|'success']
	 * @param {Boolean} striped - 是否有条纹
	 * @param {Boolean} active - 是否有动画
	 */
function GetProgressHtml(str, width, type, striped, active) {

    var result = '<div class="progress"><div class="progress-placeholder">{str}</div><div class="progress-text">{str}</div><div class="progress-bar{type}{striped}{active}" style="width: {width};"></div></div>';
    result = result.replace(/{str}/g, str);
    result = result.replace(/{width}/, width);
    result = result.replace(/{type}/, ' progress-bar-' + type);
    result = result.replace(/{striped}/, striped == 1 ? ' progress-bar-striped' : '');
    result = result.replace(/{active}/, active == 1 ? ' active' : '');
    return result;
}
function RenderProgressBar() {

    $('.ProgressBar').each(function () {
        var val = parseInt($(this).attr("val"));
        var tit = $(this).attr("tit");
        var type = $(this).attr('type');
        var striped = $(this).attr('striped');
        var active = $(this).attr('active');
        if (typeof (val) == 'undefined' || val == "") {
            val = 0;
        }
        if (typeof (tit) == 'undefined') {
            tit = "";
        }
        if (typeof (type) == 'undefined' || type == "") {
            type = "warning";
        }
        if (typeof (striped) == 'undefined' || striped == "") {
            striped = 1;
        }
        if (typeof (active) == 'undefined' || active == "") {
            active = 1;
        }
        $(this).html(GetProgressHtml(tit, val + '%', type, striped, active));
    });
}
function HideOver() {
    $('.right-sidebar').width(300);//还原默认宽度
    $('.right-sidebar').removeClass("open");

    $('.right-sidebar').html('');
    $('.overlaymask').fadeOut(200);
    return false;
}
function ShowOverForm(view, swith) {
    try {
        //var view = $(this).attr('href');
        //var swith = $(this).attr('sideWidth');
        if (typeof (view) == "undefined" || view == "") {
            return false;
        }
        if (typeof (swith) == "undefined" || swith == "") {
            swith = 380;
        }
        if (view.indexOf("?") > 0)
            view += "&random=" + Math.random();
        else
            view += "?random=" + Math.random();
        $('.overlaymask').show();
        //$('.overlaymask').html('<div style="font-size:16px;padding:20px 0px;text-align:center">正在加载...</div>');
        $('.right-sidebar').width(swith);
        $('.right-sidebar').height($(window).height());
        $('.right-sidebar').load(view);
        $('.right-sidebar').addClass("open");
        return false;
    } catch (e) {
        return false
    }
}

 
