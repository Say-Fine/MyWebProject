$(function () {//加载模块
    layui.use(['tree', 'util'], function () {
        var tree = layui.tree
            , layer = layui.layer
            , util = layui.util;
        var data2 = [{
            title: '早餐'
            , id: 1
            , children: [{
                title: '油条'
                , id: 5
            }, {
                title: '包子'
                , id: 6
            }, {
                title: '豆浆'
                , id: 7
            }]
        }, {
            title: '午餐'
            , id: 2
            , checked: true
            , children: [{
                title: '藜蒿炒腊肉'
                , id: 8
            }, {
                title: '西湖醋鱼'
                , id: 9
            }, {
                title: '小白菜'
                , id: 10
            }, {
                title: '海带排骨汤'
                , id: 11
            }]
        }, {
            title: '晚餐'
            , id: 3
            , children: [{
                title: '红烧肉'
                , id: 12
                , fixed: true
            }, {
                title: '番茄炒蛋'
                , id: 13
            }]
        }, {
            title: '夜宵'
            , id: 4
            , children: [{
                title: '小龙虾'
                , id: 14
                , checked: true
            }, {
                title: '香辣蟹'
                , id: 15
                , disabled: true
            }, {
                title: '烤鱿鱼'
                , id: 16
            }]
        }];
        //开启复选框
        tree.render({
            elem: '#menuTree',
            data: data2,
            showCheckbox: false,
            edit: ['add', 'update', 'del'],
            click: function (obj) {
                layer.msg(JSON.stringify(obj.data));
            }
        });
    });
});