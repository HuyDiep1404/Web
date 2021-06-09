using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class Nhanvien
    {
        public Nhanvien()
        {
            Dondathangs = new HashSet<Dondathang>();
        }

        public string Manhanvien { get; set; }
        public string Ho { get; set; }
        public string Ten { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public DateTime? Ngaylamviec { get; set; }
        public string Diachi { get; set; }
        public string Dienthoai { get; set; }
        public decimal? Luongcoban { get; set; }
        public decimal? Phucap { get; set; }

        public virtual ICollection<Dondathang> Dondathangs { get; set; }
    }
}
