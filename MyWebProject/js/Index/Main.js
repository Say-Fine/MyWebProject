$(function () {
    loadMenu();

});
var loadMenu = function () {
    baseFunc.PostAjax({
        action: "/Ajax/SiginService/LoginAjaxService.ashx?action=getMenu",
        success: function (result) {
            if (result != null && result.length > 0) {
                var menu = '';
                var index = 1;
                $.each(result, function (i, row) {
                    menu += '<li class="layui-nav-item layui-nav-itemed">';
                    menu += '<a href="javascript:;" id="' + row.MenuId + '">' + row.MenuName + '</a>';
                    menu += '<dl class="layui-nav-child">';
                    $.each(row.childList, function (j, cRow) {
                        menu += '<dd class="' + (cRow.MenuName == "任务设置" ? "layui-this" : "") + '"><a href="javascript:;" id="'
                            + cRow.MenuId + '" onclick="bindIframe(\'' + cRow.PageUrl + '\')">'
                            + cRow.MenuName + '</a></dd>';
                        index++;
                    });
                    menu += '</dl>';
                    menu += '</li>';
                });
                $("#navMenu").html(menu);
            }
        },
        error: function () {

        }
    });
};