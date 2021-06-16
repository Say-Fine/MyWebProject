using MyWeb.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWeb.Models.DTO
{
    public class MenuInfoDto
    {
        /// <summary>
        /// 菜单ID
        /// </summary>
        public Guid MenuId { get; set; }

        /// <summary>
        /// 菜单名称
        /// </summary>
        public string MenuName { get; set; }

        /// <summary>
        /// 排序Code
        /// </summary>
        public string Sort { get; set; }

        /// <summary>
        /// 子菜单
        /// </summary>
        public List<MenuInfo> childList { get; set; }
    }
}
