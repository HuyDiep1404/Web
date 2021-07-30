using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Web.Models
{
    public partial class Nhaxb
    {
        [Key]
        public string MaNxb { get; set; }
        public string TenXb { get; set; }
        public string DiaChi { get; set; }
        public string DienThoai { get; set; }
    }
}
