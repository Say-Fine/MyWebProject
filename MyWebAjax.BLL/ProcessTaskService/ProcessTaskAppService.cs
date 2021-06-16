using MyWeb.DAL;
using MyWeb.Models.DTO;
using MyWebAjax.BLL.Utilitys;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Data.Entity;

namespace MyWebAjax.BLL.ProcessTaskService
{
    public class ProcessTaskAppService : BaseAppService
    {
        ToolsHelper tools = new ToolsHelper();
        private readonly MyDBEntitiesModel entityModels = new MyDBEntitiesModel();
        /// <summary>
        /// 获取列表信息
        /// </summary>
        /// <param name="user"></param>
        public ResultData GetTaskList()
        {
            var taskList = entityModels.ProcessTask.Select(a => a);
            return new ResultData
            {
                Success = true,
                Msg = "",
                Data = taskList
            };
        }

        /// <summary>
        /// 查询任务数据
        /// </summary>
        /// <param name="postData"></param>
        /// <returns></returns>
        public ResultData GetTaskById(PostDataDto postData)
        {
            if (postData == null)
            {
                return FaildData("查询参数不能为空");
            }
            var data = entityModels.ProcessTask.Where(a => a.ProcessTaskID == postData.PrimaryKey).FirstOrDefault();
            if (data == null || data.ProcessTaskID == Guid.Empty)
            {
                return FaildData("没有查询到任务数据");
            }
            return SuccessData(data);
        }

        /// <summary>
        /// 保存数据
        /// </summary>
        /// <param name="saveData"></param>
        /// <returns></returns>
        public ResultData SaveTask(PostDataDto postData)
        {
            if (postData == null || postData.PostData == null)
            {
                return FaildData("保存数据不能为空");
            }
            var saveData = JsonConvert.DeserializeObject<MyWeb.DAL.ProcessTask>(postData.PostData.ToString());
            if (saveData.ProcessTaskID != Guid.Empty)
            {
                var data = entityModels.ProcessTask.Where(a => a.ProcessTaskID == saveData.ProcessTaskID).FirstOrDefault();
                if (data == null)
                {
                    return FaildData("没有查询到任务数据");
                }
                data.BackgroudTaskName = saveData.BackgroudTaskName;
                data.TaskTime = saveData.TaskTime;
                data.ProcessTaskName = saveData.ProcessTaskName;
                data.TaskUrl = saveData.TaskUrl;
                data.SavePath = saveData.SavePath;
            }
            else
            {
                saveData.ProcessTaskID = Guid.NewGuid();
                saveData.FinishStatus = 0;
                entityModels.ProcessTask.Add(saveData);
            }
            entityModels.SaveChanges();
            return SuccessData(null);
        }

        /// <summary>
        /// 保存数据
        /// </summary>
        /// <param name="saveData"></param>
        /// <returns></returns>
        public ResultData DeleteTask(PostDataDto postData)
        {
            if (postData == null || postData.PrimaryKey == Guid.Empty)
            {
                return FaildData("主键ID不能为空，删除失败");
            }
            entityModels.Entry(new ProcessTask() { ProcessTaskID = postData.PrimaryKey }).State = EntityState.Deleted;
            entityModels.SaveChanges();
            return SuccessData(null);
        }
    }
}
