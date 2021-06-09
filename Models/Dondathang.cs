using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class Dondathang
    {
        public Dondathang()
        {
            Chitietdathangs = new HashSet<Chitietdathang>();
        }

        public string Sohoadon { get; set; }
        public string Makhachhang { get; set; }
        public string Manhanvien { get; set; }
        public DateTime? Ngaydathang { get; set; }
        public DateTime? Ngaygiaohang { get; set; }
        public DateTime? Ngaychuyenhang { get; set; }
        public string Noigiaohang { get; set; }
        public decimal? Sotien { get; set; }

        public virtual Khachhang MakhachhangNavigation { get; set; }
        public virtual Nhanvien ManhanvienNavigation { get; set; }
        public virtual ICollection<Chitietdathang> Chitietdathangs { get; set; }
    }
}
