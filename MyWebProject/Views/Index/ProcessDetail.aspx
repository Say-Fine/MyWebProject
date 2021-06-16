<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/Main.Master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="content" runat="server">
    <script src="/js/Index/ProcessDetail.js"></script>
    <div class="templatemo-content">
        <div class="row">
            <div class="col-md-12">
                <form role="form" id="templatemo-preferences-form" class="needs-validation">
                    <div class="row">
                        <input style="display: none;" id="ProcessTaskID" />
                        <div class="col-md-6 margin-bottom-15">
                            <label for="ProcessTaskName" class="control-label">任务名称 <span style="color: red;">*</span></label>
                            <input type="text" class="form-control" id="ProcessTaskName" value="" required>
                        </div>
                        <div class="col-md-6 margin-bottom-15">
                            <label for="BackgroudTaskName" class="control-label">后台方法名 <span style="color: red;">*</span></label>
                            <input type="text" class="form-control" id="BackgroudTaskName" value="" required />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 margin-bottom-15">
                            <label for="TaskTime" class="control-label">执行时间 <span style="color: red;">*</span></label>
                            <input type="text" class="form-control" id="TaskTime" value="" onclick="WdatePicker({minDate:'%y-%M-{%d+1}'})" required>
                        </div>
                        <div class="col-md-6 margin-bottom-15">
                            <label for="FinishStatus" class="control-label">执行状态</label>
                            <select class="form-control margin-bottom-15" id="FinishStatus" disabled>
                                <option value="0">未执行</option>
                                <option value="1">执行中</option>
                                <option value="2">执行失败</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 margin-bottom-15">
                            <label for="SavePath" class="control-label">采集地址 <span style="color: red;">*</span></label>
                            <input type="text" class="form-control" id="TaskUrl" value="" required>
                        </div>
                        <div class="col-md-6 margin-bottom-15">
                            <label for="SavePath" class="control-label">保存路径 <span style="color: red;">*</span></label>
                            <input type="text" class="form-control" id="SavePath" value="" required />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 margin-bottom-15">
                            <label for="Remark">备注</label>
                            <textarea class="form-control" rows="3" id="Remark" disabled></textarea>
                        </div>
                    </div>
                    <div class="row templatemo-form-buttons">
                        <div class="col-md-12">
                            <button type="button" class="btn btn-primary" data-loading-text="登陆中..." id="btnSave">保存</button>
                            <button type="button" class="btn btn-default" id="btnCancel">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</asp:Content>
