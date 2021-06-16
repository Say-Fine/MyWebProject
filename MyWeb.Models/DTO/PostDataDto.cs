using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWeb.Models.DTO
{
    public class PostDataDto
    {
        /// <summary>
        /// 主键GUID
        /// </summary>
        public Guid PrimaryKey { get; set; }

        /// <summary>
        /// 请求参数
        /// </summary>
        public object PostData { get; set; }
    }
}
