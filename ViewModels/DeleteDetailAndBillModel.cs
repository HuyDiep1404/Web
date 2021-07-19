using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.ViewModels
{
    public class DeleteDetailAndBillModel
    {
        public string MaHoaDon { get; set; }
        public bool? Dathanhtoan { get; set; }

        public DeleteDetailModel[] Details1 { get; set; }
    }
}
