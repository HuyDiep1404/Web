using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;
using Web.Services.JoinTable;

namespace Web.Services.Authenticate
{
    public interface IDangnhap
    {
        KhachHangb2 Authenticate(string tk, string mk);


        KhachHangb2 Create(KhachHangb2 customer);
        IEnumerable<KhachHangb2> Get();
        IEnumerable<DonHang> GetDonHang();
        int CreateBill(DonHang bill);
        int CreateDetail(Chittiet1 detail);
        
        void Update(DonHang bill);

        DonHang GetByMaHD(string mahd);
        IEnumerable<TableJoinResult> GetDetailByMaHD(string mahd);
        



        }
}
