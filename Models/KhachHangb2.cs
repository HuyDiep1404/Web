using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class KhachHangb2
    {
        public string MaKh { get; set; }
        public string Hoten { get; set; }
        public DateTime? NgaySinh { get; set; }
        public bool? GioiTinh { get; set; }
        public string SoDt { get; set; }
        public string TaiKhoan { get; set; }
        public string MatKhau { get; set; }
        public string Email { get; set; }
        public string DiaChi { get; set; }
    }
}
