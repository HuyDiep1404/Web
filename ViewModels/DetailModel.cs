using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.ViewModels
{
    public class DetailModel
    {
        public string MaSp { get; set; }
        public int? SoLuong { get; set; }
        public decimal? Dongia { get; set; }
    }
}
