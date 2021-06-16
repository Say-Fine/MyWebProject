using MyWeb.DAL;
using MyWeb.Models.DTO;
using MyWebAjax.BLL.Utilitys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Services;
using System.Web.SessionState;

namespace MyWebAjax.BLL.Login
{
    public class SiginAppService: BaseAppService
    {
        ToolsHelper tools = new ToolsHelper();
        
        /// <summary>
        /// 登陆
        /// </summary>
        /// <param name="user"></param>
        public ResultData IsSigin(LoginUserDto loginUer)
        {
            if (loginUer == null)
            {
                return FaildData("没有用户信息");
            }
            string pwd = tools.Md5Serialize(loginUer.Password);
            MyDBEntitiesModel entitys = new MyDBEntitiesModel();
            var myUser = entitys.MyUser.Where(a => a.UserCode == loginUer.UserName && a.UserPassword == pwd).FirstOrDefault();
            if (myUser != null)
            {
                return SuccessData(myUser);
            }
            return FaildData("用户名或密码不存在");
        }
    }
}
