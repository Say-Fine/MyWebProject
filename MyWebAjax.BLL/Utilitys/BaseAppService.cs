using MyWeb.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWebAjax.BLL.Utilitys
{
    public class BaseAppService
    {
        /// <summary>
        /// 成功返回
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public ResultData SuccessData(object data, string msg = "")
        {
            return new ResultData
            {
                Success = true,
                Msg = msg,
                Data = data
            };
        }

        /// <summary>
        /// 失败返回
        /// </summary>
        /// <param name="msg"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public ResultData FaildData(string msg, object data = null)
        {
            return new ResultData
            {
                Success = false,
                Msg = msg,
                Data = data
            };
        }
    }
}
