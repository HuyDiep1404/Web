using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class Khachhang
    {
        public Khachhang()
        {
            Dondathangs = new HashSet<Dondathang>();
        }

        public string Makhachhang { get; set; }
        public string Tencongty { get; set; }
        public string Tengiaodich { get; set; }
        public string Diachi { get; set; }

        public virtual ICollection<Dondathang> Dondathangs { get; set; }
    }
}
