using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class Chitietdathang
    {
        public string Sohoadon { get; set; }
        public string Mahang { get; set; }
        public decimal? Giaban { get; set; }
        public int? Soluong { get; set; }
        public int? Mucgiamgia { get; set; }

        public virtual Mathang MahangNavigation { get; set; }
        public virtual Dondathang SohoadonNavigation { get; set; }
    }
}
