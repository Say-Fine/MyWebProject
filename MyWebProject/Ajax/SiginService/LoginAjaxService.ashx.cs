using MyWeb.Models.DTO;
using MyWebAjax.BLL.Login;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.SessionState;

namespace MyWebProject.Ajax.SiginService
{
    /// <summary>
    /// LoginAjaxService 的摘要说明
    /// </summary>
    public class LoginAjaxService : IHttpHandler, IRequiresSessionState
    {
        private SiginAppService _service = new SiginAppService();

        [WebMethod(EnableSession = true)]
        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.QueryString["action"];
            if (action == "isLogin")
            {
                var data = JsonConvert.DeserializeObject<LoginUserDto>(context.Request.Form["data"]);
                var result = _service.IsSigin(data);
                if (result.Success)
                {
                    context.Session["LoginUserInfo"] = result.Data;
                }
                context.Response.Write(JsonConvert.SerializeObject(result));
                return;
            }
            context.Response.Write(JsonConvert.SerializeObject(new { Success = false, Msg = string.Format("请求路径{0}不存在", action) }));
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}