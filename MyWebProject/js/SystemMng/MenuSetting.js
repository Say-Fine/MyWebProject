$(function () {
    //加载模块
    layui.use(function () { //亦可加载特定模块：layui.use(['layer', 'laydate', function(){

        //得到各种内置组件
        var layer = layui.layer //弹层
            , laypage = layui.laypage //分页
            , table = layui.table //表格
            , element = layui.element
            , form = layui.form;
        //执行一个 table 实例
        table.render({
            elem: '#menuInfo',
            height: 800,
            url: '/Ajax/SiginService/LoginAjaxService.ashx?action=getParentMenu', //数据接口
            title: '菜单列表',
            method: 'post',
            //where: { ParentId: '00000000-0000-0000-0000-000000000000' },
            page: false, //开启分页
            toolbar: '#toolbarDemo', //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            defaultToolbar: {},
            totalRow: false, //开启合计行
            id: 'MenuId',
            parseData: function (res) { //res 即为原始返回的数据
                return {
                    "code": "0", //解析接口状态
                    "msg": res.Msg, //解析提示文本
                    "count": res.Data.length, //解析数据长度
                    "data": res.Data //解析数据列表
                };
            },
            cols: [[
                {
                    fixed: 'tool', width: 68, align: 'center', templet: function (d) {
                        if (utility.IsNullOrUndefined(d.ParentId)) {
                            return '<button type="button" id="TreeBtn' + d.MenuId + '" class="layui-btn layui-btn-primary layui-btn-xs"><i class="layui-icon layui-icon-down layui-font-12"></i></button>';
                        } else {
                            return '';
                        }
                    }, unresize: true, event: 'treeTool'
                },
                { align: 'center', title: '序号', type: 'numbers', width: 100 },
                { field: 'MenuName', title: '菜单名称' },
                { field: 'PageUrl', title: '菜单地址' },
                { fixed: 'right', width: 150, align: 'center', toolbar: '#rowToolBar' }
            ]],
            done: function (res, curr, count) {
                var mainTrArr = $('div.layui-table-main>table>tbody>tr');
                var fixedTrArr = $('div.layui-table-fixed>div.layui-table-body>table>tbody>tr');
                $.each(res.data, function (idx, row) {
                    $(mainTrArr[idx]).attr("class", "treeTr" + row.ParentId);
                    $(fixedTrArr[idx]).attr("class", "treeTr" + row.ParentId);
                });
            }
        });
        //监听头工具栏事件
        table.on('toolbar(test)', function (obj) {
            //添加父级菜单数据
            if (obj.event === 'addParent') {
                layer.open({
                    id: 'editMenuPage',
                    type: 2,
                    title: '编辑菜单',
                    shadeClose: false,
                    shade: 0.8,
                    area: ['798px', '422px'],
                    content: '/Views/SystemMng/MenuEidt.html',
                    btn: ['保存', '取消'],
                    btnAlign: 'c',
                    yes: function (index, layero) {
                        var resultData = $('div#editMenuPage iframe')[0].contentWindow.getFormData();
                        if (!utility.IsNullOrEmptyLenth(resultData)) {
                            layer.msg(JSON.stringify(resultData));
                            //layer.close(index); //如果设定了yes回调，需进行手工关闭
                        }                       
                    }
                });
            }
        });

        //监听行工具事件
        table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                , layEvent = obj.event; //获得 lay-event 对应的值
            if (layEvent === 'treeTool') {
                var icon = $('#TreeBtn' + data.MenuId + '>i');
                if (!utility.IsNullOrUndefined(icon)) {
                    var iconClass = "layui-icon layui-icon-right layui-font-12";
                    if (icon.attr('class') === "layui-icon layui-icon-right layui-font-12") {
                        iconClass = "layui-icon layui-icon-down layui-font-12";
                        $(".treeTr" + data.MenuId).show();
                    } else {
                        $(".treeTr" + data.MenuId).hide();
                    }
                    icon.attr("class", iconClass);
                }
            } else if (layEvent === 'addChild') {
                layer.msg('增加子菜单');
            } else if (layEvent === 'edit') {
                layer.msg('编辑');
            } else if (layEvent === 'del') {
                layer.confirm('确定删除吗？', function (index) {
                    obj.del(); //删除对应行（tr）的DOM结构
                    layer.close(index);
                    //向服务端发送删除指令
                });
            }
        });
    });
});
