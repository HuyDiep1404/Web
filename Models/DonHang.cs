using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class DonHang
    {
        public string MaHoaDon { get; set; }
        public DateTime? NgayTao { get; set; }
        public string MaKh { get; set; }
        public DateTime? NgayGiao { get; set; }
        public bool? Dathanhtoan { get; set; }
        public bool? Tinhtranggiaohang { get; set; }
    }
}
