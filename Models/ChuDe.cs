using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Web.Models
{
    public partial class ChuDe
    {
        [Key]
        public string MaChuDe { get; set; }
        public string TenChuDe { get; set; }
    }
}
