using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class TblLoai
    {
        public TblLoai()
        {
            TblSanPhams = new HashSet<TblSanPham>();
        }

        public string Maloai { get; set; }
        public string Tenloai { get; set; }

        public virtual ICollection<TblSanPham> TblSanPhams { get; set; }
    }
}
