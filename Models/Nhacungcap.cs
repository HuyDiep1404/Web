using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class Nhacungcap
    {
        public Nhacungcap()
        {
            Mathangs = new HashSet<Mathang>();
        }

        public string Macongty { get; set; }
        public string Tencongty { get; set; }
        public string Tengiaodich { get; set; }
        public string Diachi { get; set; }
        public string Dienthoai { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Chotenht { get; set; }
        public string Matkhau { get; set; }
        public string Gioitinh { get; set; }
        public string Congviecht { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Mathang> Mathangs { get; set; }
    }
}
