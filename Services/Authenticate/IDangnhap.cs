using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Services.Authenticate
{
    public interface IDangnhap
    {
        KhachHangb2 Authenticate(string tk, string mk);


        KhachHangb2 Create(KhachHangb2 customer);
        IEnumerable<KhachHangb2> Get();
        IEnumerable<DonHang> GetDonHang();
         DonHang CreateBill(DonHang bill);
        Chittiet1 CreateDetail(Chittiet1 detail);
    }
}
