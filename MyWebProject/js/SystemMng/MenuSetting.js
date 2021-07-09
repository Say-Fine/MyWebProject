$(function () {
    //iframe层
    //layer.open({
    //    type: 2,
    //    title: 'layer mobile页',
    //    shadeClose: true,
    //    shade: 0.8,
    //    area: ['380px', '90%'],
    //    content: 'mobile/' //iframe的url
    //});
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
            toolbar: 'default', //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
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
                { field: 'PageUrl', title: '菜单地址' }
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
            var checkStatus = table.checkStatus(obj.config.id)
                , data = checkStatus.data; //获取选中的数据
            switch (obj.event) {
                case 'add':
                    layer.msg('添加');
                    break;
                case 'update':
                    if (data.length === 0) {
                        layer.msg('至少选择一行');
                    } else if (data.length > 1) {
                        layer.msg('只能同时编辑一个');
                    } else {
                        layer.alert('编辑 [id]：' + data[0].MenuId);
                    }
                    break;
                case 'delete':
                    if (data.length === 0) {
                        layer.msg('请选择一行');
                    } else {
                        layer.msg('删除');
                    }
                    break;
            };
        });

        //监听行工具事件
        table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                , layEvent = obj.event; //获得 lay-event 对应的值
            if (layEvent === 'detail') {
                layer.msg('查看操作');
            } else if (layEvent === 'treeTool') {
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
            } else if (layEvent === 'more') {
                //下拉菜单
                dropdown.render({
                    elem: this //触发事件的 DOM 对象
                    , show: true //外部事件触发即显示
                    , data: [{
                        title: '编辑'
                        , id: 'edit'
                    }, {
                        title: '删除'
                        , id: 'del'
                    }]
                    , click: function (menudata) {
                        if (menudata.id === 'del') {
                            layer.confirm('真的删除行么', function (index) {
                                obj.del(); //删除对应行（tr）的DOM结构
                                layer.close(index);
                                //向服务端发送删除指令
                            });
                        } else if (menudata.id === 'edit') {
                            layer.msg('编辑操作，当前行 ID:' + data.id);
                        }
                    }
                    , align: 'right' //右对齐弹出（v2.6.8 新增）
                    , style: 'box-shadow: 1px 1px 10px rgb(0 0 0 / 12%);' //设置额外样式
                })
            }
        });
    });
});
