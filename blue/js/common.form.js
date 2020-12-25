/***********************
 * 表单UI操作
 ******************/
function pageFormMessage(formResultDto, winLevel, func) {
    if (winLevel === undefined || winLevel == "") {
        winLevel = window.top;
    }
    if (func === undefined || func == "") { 
        func = function () {
            if (formResultDto.Jump != '' && typeof (formResultDto.Jump) != 'undefined' && formResultDto.Jump != null) {
                if (formResultDto.Jump == 'reload') {
                    winLevel.location.reload();
                }
                else {
                    winLevel.location.href = unescape(formResultDto.Jump);
                }
            }
        }
    }
    var ic = '<span class="iconfont" >&#xe68c;</span>';
    if (formResultDto.Success) {
        ic = '<span class="iconfont" >&#xe635;</span>';
    }
    
    var index = window.top.layer.msg(ic + " " + formResultDto.Message, {
        time: 1500,
        end: func
    }); 
    if (formResultDto.Success) { 
        layer.style(index, {
            background: '#309D30'
        });
    } else {
        layer.style(index, {
            background: '#E70808'
        });
    }
}
/**
 *  表单基础
 */
//获取选中checkbox
function getCheckBox(selector) {
    var spCodesTemp = '';
    $('.' + selector + ':checked').each(function (i) {
        if ($(this).val() != '') {
            if (0 == i) {
                spCodesTemp = $(this).val();
            } else {
                spCodesTemp += ("," + $(this).val());
            }
        }
    });
    return spCodesTemp;
}


function pageDefaultFormAction(selector, func) {
    var $form = $(selector).ajaxForm();
    $.validator.unobtrusive.parse(selector)
    var $formSetting = $form.data("validator");
    if ($formSetting) {
        $formSetting.settings.submitHandler = function () {
            $form.ajaxSubmit({
                success: function (result) {
                    var json = toJSON(result);
                    pageFormMessage(json);
                }
            });
            return false;
        };
    }
}


$(function () {
    if ($(".pageDefaultForm").length > 0) {
        pageDefaultFormAction($(".pageDefaultForm"));
    }
});








function DlgForm(url, stitle, swidth, sheight) {
    if (!stitle) {
        stitle = "操作窗口";
    }
    if (!swidth) {
        swidth = '880px';
    }
    if (!sheight) {
        sheight = '550px'
    }
    var D0 = layer.open({
        type: 2,
        title: stitle,
        shade: [0.1, '#fff'],
        area: [swidth, sheight],
        shadeClose: false,
        content: [url, 'yes'],
        maxmin: false,
        btn: false,
        yes: function () {
            $(that).click();
        },
        btn2: function () {
            layer.closeAll();
        }
    });

}
function SelectUserDlg(controlId, deptId, maxNum) {
    if (typeof (maxNum) == "undefined")
        maxNum = 0;
    if (typeof (deptId) == "undefined")
        deptId = 0;

    var selectUserDlg = layer.open({
        type: 2,
        title: "选择用户",
        shade: [0.1, '#fff'],
        area: ["880px", "600px"],
        shadeClose: false,
        content: ["/UserManage/SelectUserDlg?maxNum=" + maxNum + "&cid=" + controlId + "&deptId=" + deptId, 'yes'],
        maxmin: false,
        btn: false,
        yes: function () {
            $(that).click();
        },
        btn2: function () {
            layer.close(selectUserDlg);
        }
    });
}
function showPic(s, w) {
    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        content: '<a href="' + s + '" target="_blank"><img src="' + s + '" width="' + w + '" border="0" /></a>'

    });
}

function SendMsg(sname) {
    DlgForm('/SystemCP/doMsgBox.aspx?touser=' + name, '<i class=\'fa fa-comments\'></i> 短信息', '650px', '480px')
}
function showMsg(ids) {
    DlgForm('/SystemCP/doShowMsg.aspx?id=' + ids, '<i class=\'fa fa-comments\'></i> 短信息', '650px', '480px')
}

//document.oncontextmenu = new Function("event.returnValue=false");
//document.onselectstart = new Function("event.returnValue=false");


function getJYLogDlg() {
    layer.prompt({ title: '请输入客户手机号码' }, function (val, index) {
        DlgForm('/Task/addJYLog.aspx?mobile=' + val + '&do=add', '<i class=\'fa fa-plus\'></i> 交易信息', '1020px', '620px')
    });
}
/*
* AJAX表单结果
*/
function showFormMsg(result, fucSuccess, funFail) {
    if (result.state == "success") {
        fucSuccess();
    } else {
        funFail();
    }
}
function showFormMsgSimple(conObj, winLevel = "") {

    //var frameindex = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
    var ic = '<span class="iconfont" >&#xe635;</span>';
    if (conObj.state != "success") {
        ic = '<span class="iconfont" >&#xe68d;</span>';
    }
    var index = window.parent.layer.msg(ic + " " + conObj.data, {
        time: 1500,
        end: function () {

            if (conObj.backurl != '' && typeof (conObj.backurl) != 'undefined') {
                if (conObj.backurl == 'reload') {
                    if (winLevel == "")
                        window.parent.location.reload();
                    else if (winLevel == "loc")
                        window.location.reload();
                }
                else {
                    if (winLevel == "")
                        window.parent.location.href = unescape(conObj.backurl);
                    else if (winLevel == "loc")
                        window.location.href = unescape(conObj.backurl);
                }
            }

        }
    });
    if (conObj.state == "success") {
        layer.style(index, {
            background: '#309D30'
        });
    } else {
        layer.style(index, {
            background: '#E70808'
        });
    }
}
function showMsgWithFunc(conObj, fucSuccess, fucFail) {

    //var frameindex = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
    var ic = '<span class="iconfont" >&#xe635;</span>';
    if (conObj.state != "success") {
        ic = '<span class="iconfont"  >&#xe68d;</span>';
    }
    var index = window.parent.layer.msg(ic + " " + conObj.data, {
        time: 1500,
        end: function () {
            if (conObj.state != "success") {
                if (typeof (fucSuccess) != 'undefined')
                    fucSuccess();
            } else {
                if (typeof (fucFail) != 'undefined')
                    fucFail();
            }
        }
    });
    if (conObj.state == "success") {
        layer.style(index, {
            background: '#309D30'
        });
    } else {
        layer.style(index, {
            background: '#E70808'
        });
    }
}
//function showAjaxMsg(result) {
//    var conObj = eval('(' + result + ')');
//    //var frameindex = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

//    if (conObj.issuc == '1') {
//        layer.msg('<i class=\'fa ' + conObj.icon + ' \'></i> ' + conObj.content, {
//            time: 1500,
//            end: function () {
//                if (conObj.reurl != '') {
//                    if (conObj.reurl == 'reload')
//                        window.parent.location.reload();
//                    else
//                        window.parent.location.href = unescape(conObj.reurl);
//                }
//            }
//        });
//    } else {
//        parent.layer.msg('<i class=\'fa ' + conObj.icon + ' \'></i> ' + conObj.content);
//    }
//}
function GetChkItemVal(name) {
    if (name || typeof (name) == "undefined") {
        name = "";
    }
    var rt = "";
    $('input.chkItems' + name).each(function () {

        if ($(this).prop('checked') == true) {
            rt += $(this).val() + ",";
        }
    });
    return rt.slice(0, rt.length - 1);
}
function GetPageTableOption(queryUrl, clms, funParam, evenClick) {
    if (!evenClick)
        evenClick = null;

    var option = {
        url: queryUrl,
        method: 'POST',
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        toolbar: '#toolbar',              //工具按钮用哪个容器
        buttonsClass: "lightborderblock",
        toolbarAlign: "right",
        buttonsAlign: "left",
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                     //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列（选择显示的列）
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "Id",                     //每一行的唯一标识，一般为主键列
        icons: { refresh: "fa-refresh", columns: "fa-list-ul" },
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        //得到查询的参数
        queryParams: funParam,
        //queryParams: function (params) {
        //    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        //    var temp = {
        //        rows: 0,                         //页面大小
        //        page:  1,   //页码
        //        sort: "Id",      //排序列名  
        //        sortOrder: "desc" //排位命令（desc，asc） 
        //    };
        //    return temp;
        //},
        columns: clms,
        onLoadSuccess: function () {
        },
        onLoadError: function () {
            MyAlert("数据加载失败！");
        },
        onDblClickRow: evenClick,
    }
    return option;
}
$(function () {

    //对话链接
    $('body').on('click', '.DlgLink', function () {
        var w = '700px';
        var h = '650px';

        if (typeof ($(this).attr("h")) != "undefined" && $(this).attr('h') != "") {
            h = $(this).attr('h') + 'px';
        }
        if (typeof ($(this).attr("w")) != "undefined" && $(this).attr('w') != "") {
            w = $(this).attr('w') + 'px';
        }
        DlgForm($(this).attr('href'), $(this).html(), w, h);
        return false;
    });
    $('body').on('click', '.DeleteLink', function () {
        if (confirm("您确认要删除吗？")) {
            var url = $(this).attr('href');
            var id = $(this).attr('val');
            $.post(url, { "id": id }, function (result) {
                showFormMsgSimple(result, "loc");
            });
        }
        return false;
    });
    $('body').on('click', '.btnDelete', function () {
        if (!confirm("您确认要删除吗？")) {
            return false;
        }
        var data = GetChkItemVal($(this).attr('stype'));
        var url = $(this).attr('href');
        $.post(url, { "ids": data }, function (result) {
            showFormMsgSimple(result, "loc");
        });
        return false;
    });
    $('.btnExtendForm').click(function () {
        var id = $(this).attr('val');
        if ($("#" + id).is(":visible")) {
            $("#" + id).hide();
            $(this).html('<i class="fa fa-plus"></i>');
        } else {
            $("#" + id).show(200);
            $(this).html('<i class="fa fa-mail-reply"></i>');
        }

    });
    $('body').on("click", '.SubLink', function () {
        var v = $(this).attr('href');
        $.post(v, function (data) {
            showFormMsgSimple(data);
        });
        return false;
    });
    //列表页选项开关
    $('.chkSwitch').click(function () {
        var stype = $(this).attr('stype');
        var name = "chkItems";
        if (typeof (stype) != "undefined") {
            name = name + stype;
        }
        $('input[name=' + name + ']').prop("checked", $(this).prop("checked"));
    });
    if ($(".input_date").length > 0) {
        $(".input_date").datetimepicker({
            format: "yyyy-mm-dd",
            language: 'zh-CN',
            todayBtn: 1,            //显示当天按钮，点击则选择当天当天时间
            autoclose: 1,           //选完时间自动关闭
            todayHighlight: 1,      //当天时间高亮
            startView: 2,           //从月视图开始，选天
            minView: 2
        });
    }
    if ($(".input_datetime").length > 0) {
        $(".input_datetime").datetimepicker({
            format: "yyyy-mm-dd hh:ii:ss",
            language: 'zh-CN',
            todayBtn: 1,            //显示当天按钮，点击则选择当天当天时间
            autoclose: 1,           //选完时间自动关闭
            todayHighlight: 1,      //当天时间高亮
            startView: 1,           //从月视图开始，选天
            minView: 0
        });
    }
    $('select').each(function () {
        var defaultVal = $(this).attr('defaultVal');
        if (typeof (defaultVal) != "undefined")
            $(this).val(defaultVal);
    });
    $('.autoSelect').each(function (i, val) {
        var showHint = $(this).attr('showHint');
        if (showHint == "true")
            showHint = true;
        else if (showHint == "all")
            showHint = "all";
        else
            showHint = false;
        var itemName = $(this).attr('name');
        var optionSource = $(this).attr('optionSource');
        var inputValue = val.value;

        $(this).typeahead({
            showHintOnFocus: showHint,
            source: function (query, process) {
                $.ajax({
                    type: "POST",
                    url: optionSource,
                    dataType: "json",
                    timeout: 50000,
                    data: { "key": $('input[name=' + itemName + ']').val(), "itemName": itemName },
                    async: false,
                    success: function (datas) {
                        var src = arrUnique(datas.map(x => x[itemName]));
                        process(src);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });

            }
        });

    });
    //$('.autoSelect').typeahead({
    //    showHintOnFocus: $(this).,
    //    source: function (query, process) {
    //        $.ajax({
    //            type: "Post",
    //            url: "/AjaxTool/DiningPlace",
    //            contentType: "application/json;charset=utf-8",
    //            dataType: "json",
    //            timeout: 50000,
    //            data: JSON.stringify({ 'key': $('.DiningPlace').val() }),
    //            async: false,
    //            success: function (datas) {
    //                var src=datas.map(x=>x.)
    //                process(datas);
    //            },
    //            error: function (err) {
    //                console.log(err);
    //            }
    //        });

    //    }
    //});


});
