using MyWeb.DAL;
using MyWeb.Models.DTO;
using MyWebAjax.BLL.ProcessTaskService;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebProject.Ajax.ProcessTaskService
{
    /// <summary>
    /// ProcessTaskAjaxService 的摘要说明
    /// </summary>
    public class ProcessTaskAjaxService : IHttpHandler
    {
        private ProcessTaskAppService _service = new ProcessTaskAppService();
        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.QueryString["action"];
            object resultObj = null;
            PostDataDto postData = null;
            if (!string.IsNullOrEmpty(context.Request.Form["data"]))
            {
                postData = JsonConvert.DeserializeObject<PostDataDto>(context.Request.Form["data"]);
            }
            switch (action)
            {
                case "GetData":
                    resultObj = _service.GetTaskList();
                    break;
                case "GetFormData":
                    resultObj = _service.GetTaskById(postData);
                    break;
                case "SaveTask":
                    resultObj = _service.SaveTask(postData);
                    break;
                case "DelTask":
                    resultObj = _service.DeleteTask(postData);
                    break;

            }
            if (resultObj != null)
            {
                context.Response.Write(JsonConvert.SerializeObject(resultObj));
            }
            else
            {
                context.Response.Write(JsonConvert.SerializeObject(new { Success = false, Msg = string.Format("请求路径{0}不存在", action) }));
            }
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