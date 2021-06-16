var FinishStatusEnum = {
    0: "未执行",
    1: "执行中",
    2: "执行失败"
}
$(function () {
    var primaryKey = utility.getUrlParam("PrimaryKey");

    if (utility.IsNullOrUndefined(primaryKey)) {
        initForm(null);
    }
    else {
        baseFunc.PostAjax({
            action: "/Ajax/ProcessTaskService/ProcessTaskAjaxService.ashx?action=GetFormData",
            data: { "PrimaryKey": primaryKey },
            success: function (result) {
                initForm(result);
            },
            error: function () {

            }
        });
    };
    /**
     保存
     */
    $("#btnSave").on("click", function (e) {
        var saveData = formHelper.getSaveData();
        if (formHelper.validata() && !utility.IsNullOrEmptyLenth(saveData)) {
            baseFunc.AjaxSubmit({
                id: "btnSave",
                action: "/Ajax/ProcessTaskService/ProcessTaskAjaxService.ashx?action=SaveTask",
                data: saveData,/**请求参数*/
                success: function () {
                    window.location.replace("/Views/Index/Index.aspx");
                }
            });
        }
    });

    /**
    取消
    */
    $("#btnCancel").on("click", function (e) {
        window.location.replace("/Views/Index/Index.aspx");
    });
});
function initForm(data) {
    formHelper.init({
        field: [
            { displayName: "任务名称", fieldName: "ProcessTaskName", isRequired: true },
            { displayName: "后台方法名", fieldName: "BackgroudTaskName", isRequired: true },
            { displayName: "执行时间", fieldName: "TaskTime", isRequired: true, type: ControlTypeEnum.DateTime },
            { displayName: "执行状态", fieldName: "FinishStatus", isRequired: false },
            { displayName: "采集地址", fieldName: "TaskUrl", isRequired: true },
            { displayName: "保存路径", fieldName: "SavePath", isRequired: true },
            { displayName: "备注", fieldName: "Remark", isRequired: false, type: ControlTypeEnum.MuiltityText },
            { displayName: "主键", fieldName: "ProcessTaskID", isRequired: false, isPrimaryKey: true }
        ],
        data: data
    });
}