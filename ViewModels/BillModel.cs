using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.ViewModels
{
    public class BillModel
    {
        public DateTime? NgayTao { get; set; }
        public string MaKh { get; set; }
        public DateTime? NgayGiao { get; set; }
        public bool? Dathanhtoan { get; set; }
        public bool? Tinhtranggiaohang { get; set; }
        public DetailModel[] Details1 { get; set; }

    }
}
