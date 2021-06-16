<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/Main.Master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="content" runat="server">
    <script src="/js/Index/Index.js"></script>
    <!--列表操作按钮-->
    <div class="btn-group pull-right" id="templatemo_sort_btn">
        <button id="add" type="button" data-loading-text="跳转中..."  class="btn btn-primary btn-lg">新增任务</button>
    </div>
    <!--列表内容-->
    <div class="table-responsive">
        <h4 class="margin-bottom-15">任务列表</h4>
        <table class="table table-striped table-hover table-bordered" id="taskGrid">
        </table>
    </div>
</asp:Content>
