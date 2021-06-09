using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class Mathang
    {
        public Mathang()
        {
            Chitietdathangs = new HashSet<Chitietdathang>();
        }

        public string Mahang { get; set; }
        public string Tenhang { get; set; }
        public string Macongty { get; set; }
        public string Maloaihang { get; set; }
        public int? Soluong { get; set; }
        public string Donvitinh { get; set; }
        public decimal? Giahang { get; set; }
        public bool? Gioitinh { get; set; }

        public virtual Nhacungcap MacongtyNavigation { get; set; }
        public virtual Loaihang MaloaihangNavigation { get; set; }
        public virtual ICollection<Chitietdathang> Chitietdathangs { get; set; }
    }
}
