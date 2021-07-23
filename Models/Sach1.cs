﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Web.Models
{
    public partial class Sach1
    {
        [Key]
        public string MaSp { get; set; }
        public string TenSp { get; set; }
        public decimal? GiaBan { get; set; }
        public string Mota { get; set; }
        public DateTime? NgayCapNhat { get; set; }
        public string AnhBia { get; set; }
        public int? SoLuongTon { get; set; }
        public string MaChuDe { get; set; }
        public string MaNxb { get; set; }
    }
}
