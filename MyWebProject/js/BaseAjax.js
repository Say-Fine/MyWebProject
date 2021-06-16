var baseFunc = {
    AjaxSubmit: function (func) {
        if (utility.IsNullOrEmpty(func.id) && utility.IsNullOrEmpty(func.action)) {
            return;
        }
        var dom = $("#" + func.id)//func.dom;
        if (dom != null) {
            dom.button('loading');
            $.ajax({
                type: "post",
                url: func.action,
                data: { data: JSON.stringify(func.data) },
                dataType: "json",
                success: function (result) {
                    if (result != null) {
                        if (result.Success) {
                            if (func.success) {
                                func.success();
                            }
                        } else {
                            if (!utility.IsNullOrEmpty(result.Msg)) {
                                alert(result.Msg);
                            }
                        }
                    }
                    dom.button('reset');
                },
                error: function (e) {  //连接至ashx文件失败时，执行函数
                    alert("请求后端服务异常，请检查");
                    if (func.error) {
                        func.error();
                    }
                    dom.button('reset');
                }
            });
        }
    },
    PostAjax: function (e) {
        $.ajax({
            type: "post",
            url: e.action,
            data: { data: JSON.stringify(e.data) },
            dataType: "json",
            success: function (result) {
                if (result != null) {
                    if (result.Success) {
                        if (e.success) {
                            e.success(result.Data);
                        }
                    } else {
                        if (!utility.IsNullOrEmpty(result.Msg)) {
                            alert(result.Msg);
                        }
                    }
                }
            },
            error: function (e) { 
                alert("请求后端服务异常，请检查");
                if (e.error) {
                    e.error();
                }
            }
        });
    }
}
