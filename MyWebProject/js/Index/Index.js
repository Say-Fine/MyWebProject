$(function () {
    loadGrid();
    $("#add").on("click", function (e) {
        $(this).button("loading");
        window.location.replace("/Views/Index/ProcessDetail.aspx");
    });
});
var loadGrid = function () {
    baseFunc.PostAjax({
        action: "/Ajax/ProcessTaskService/ProcessTaskAjaxService.ashx?action=GetData",
        success: function (result) {
            if (result != null) {
                dataGrid.SetGridData({
                    gridId: "taskGrid",/**列表ID 必填*/
                    isPaging: false,/**是否分页*/
                    gridData: result,/**列表值*/
                    primaryKey: "ProcessTaskID",/**主键值必填*/
                    buttonWidth: 220,/**操作列的宽度(默认150px)*/
                    field: [
                        { displayName: "任务名称", width: 230, fieldName: "ProcessTaskName", isShow: true },
                        { displayName: "后台方法名", width: 240, fieldName: "BackgroudTaskName", isShow: true },
                        { displayName: "执行状态", width: 100, type: DataType.DEnum, fieldName: "FinishStatus", isShow: true, format: FinishStatusEnum },
                        { displayName: "执行时间", width: 130, type: DataType.DateTime, fieldName: "TaskTime", isShow: true, format: "yyyy-MM-dd" },
                        { displayName: "采集地址", width: 180, fieldName: "TaskUrl", isShow: true },
                        { displayName: "保存路径", width: 200, fieldName: "SavePath", isShow: true },
                        { displayName: "备注", fieldName: "Remark", isShow: true },
                        { displayName: "任务主键", fieldName: "ProcessTaskID", isShow: false }
                    ],/**字段绑定*/
                    button: [
                        { btnId: "edit", btnName: "编辑", btnType: BtnTypeEnum.Outline, btnClass: BtnClassEnum.Primary, calback: "editData" },
                        { btnId: "delete", btnName: "删除", btnType: BtnTypeEnum.Outline, btnClass: BtnClassEnum.Danger, calback: "delData" },
                        { btnId: "reset", btnName: "重新执行", btnType: BtnTypeEnum.Outline, btnClass: BtnClassEnum.Success, calback: "resetTask" },
                    ]/**行按钮绑定*/
                });
            }
        },
        error: function () {

        }
    });
};
var FinishStatusEnum = {
    0: "未执行",
    1: "执行中",
    2: "执行失败"
}
var editData = function (e) {
    var row = dataGrid.GetDataByPrimaryKey(e);
    if (!utility.IsNullOrUndefined(row.ProcessTaskID)) {
        window.location.replace("/Views/Index/ProcessDetail.aspx?PrimaryKey=" + row.ProcessTaskID);
    }
};
var delData = function (e) {
    var row = dataGrid.GetDataByPrimaryKey(e);
    if (row != null) {
        var cf = confirm("确定删除吗？");
        if (cf == true) {
            baseFunc.AjaxSubmit({
                id: "delete",
                action: "/Ajax/ProcessTaskService/ProcessTaskAjaxService.ashx?action=DelTask",
                data: { "PrimaryKey": row.ProcessTaskID },/**请求参数*/
                success: function () {
                    alert("删除成功");
                    loadGrid();
                }
            });
        }
    }
};
var resetTask = function (e) {
    alert(e);
}