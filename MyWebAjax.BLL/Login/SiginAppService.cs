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
    public class SiginAppService : BaseAppService
    {
        ToolsHelper tools = new ToolsHelper();
        private MyDBEntitiesModel _entitys = new MyDBEntitiesModel();
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
            var myUser = _entitys.MyUser.Where(a => a.UserCode == loginUer.UserName && a.UserPassword == pwd).FirstOrDefault();
            if (myUser != null)
            {
                return SuccessData(myUser);
            }
            return FaildData("用户名或密码不存在");
        }

        /// <summary>
        /// 获取菜单
        /// </summary>
        /// <returns></returns>
        public ResultData GetMenuList()
        {
            var allMenu = _entitys.MenuInfo.Where(a => a.IsDisable == 0).OrderBy(a => a.Sort).ToList();
            if (allMenu != null && allMenu.Any())
            {
                List<MenuInfoDto> menuInfoList = new List<MenuInfoDto>();

                foreach (var menu in allMenu.Where(a => a.ParentId == null).OrderBy(a => a.Sort).ToList())
                {
                    menuInfoList.Add(new MenuInfoDto
                    {
                        MenuId = menu.MenuId,
                        MenuName = menu.MenuName,
                        Sort = menu.Sort,
                        childList = allMenu.Where(a => a.ParentId == menu.MenuId).OrderBy(a => a.Sort).ToList()
                    });
                }
                return SuccessData(menuInfoList);
            }
            return FaildData("没有查询到菜单数据");
        }
    }
}
