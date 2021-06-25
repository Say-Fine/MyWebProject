$(function () {
    $("#Sigin").click(function () {
        userLogin();
    });
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            userLogin();
        }
    });
});
userLogin = function () {
    var dom = $("#Sigin");
    dom.button("loading");
    var userName = $("#txtUserName").val();
    var passWord = $("#txtPassword").val();
    if (utility.IsNullOrEmpty(userName)) {
        alert("用户名不能为空");
        dom.button("reset");
        return;
    }
    if (utility.IsNullOrEmpty(passWord)) {
        alert("密码不能为空");
        dom.button("reset");
        return;
    }
    baseFunc.AjaxSubmit({
        id: "Sigin",
        action: "/Ajax/SiginService/LoginAjaxService.ashx?action=isLogin",
        data: { UserName: userName, Password: passWord },/**请求参数*/
        success: function () {
            window.location.replace("/MasterPage/Main.html");
        }
    });
}