using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Web.ViewModels
{
    public class BookModel
    {
        
        [Required]
        public string MaChuDe { get; set; }
        [Required]
        public string MaNxb { get; set; }
    }
}
