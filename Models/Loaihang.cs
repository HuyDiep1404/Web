using System;
using System.Collections.Generic;

#nullable disable

namespace Web.Models
{
    public partial class Loaihang
    {
        public Loaihang()
        {
            Mathangs = new HashSet<Mathang>();
        }

        public string Maloaihang { get; set; }
        public string Tenloaihang { get; set; }

        public virtual ICollection<Mathang> Mathangs { get; set; }
    }
}
