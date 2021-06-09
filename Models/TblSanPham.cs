using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class TblSanPham
    {
        public string MaSanPham { get; set; }
        public string TenSp { get; set; }
        public string MaL { get; set; }
        public string MaSx { get; set; }
        public decimal? Gia { get; set; }
        public string GhiChu { get; set; }
        public string Hinh { get; set; }
        public int? Sl { get; set; }

        public virtual TblLoai MaLNavigation { get; set; }
    }
}
