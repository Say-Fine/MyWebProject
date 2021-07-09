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
            ResultData result = null;
            switch (action)
            {
                case "isLogin":
                    var data = JsonConvert.DeserializeObject<LoginUserDto>(context.Request.Form["data"]);
                    result = _service.IsSigin(data);
                    if (result.Success)
                    {
                        context.Session["LoginUserInfo"] = result.Data;
                    }
                    break;
                case "getMenu":
                    if (context.Session["MenuList"] == null)
                    {
                        result = _service.GetMenuList();
                        if (result.Success == true)
                        {
                            context.Session["MenuList"] = result.Data;
                        }
                    }
                    else
                    {
                        result = new ResultData { Success = true, Msg = string.Empty, Data = context.Session["MenuList"] };
                    }
                    break;
                case "getParentMenu":
                    Guid? parentId = null;
                    if(Guid.TryParse(context.Request.Form["ParentId"], out Guid res))
                    {
                        parentId = res;
                    }
                    result = _service.GetParentMenuList(parentId);
                    break;
                case "loginOut":
                    context.Session.Clear();
                    result = new ResultData { Success = true, Msg = string.Empty, Data = null };
                    break;
                default:
                    result = new ResultData { Success = false, Msg = string.Format("请求路径{0}不存在", action), Data = null };
                    break;
            }
            context.Response.Write(JsonConvert.SerializeObject(result));
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