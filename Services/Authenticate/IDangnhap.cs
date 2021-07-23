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
        
        IEnumerable<DonHang> GetDonHanghistory(string makh, DateTime? ngaygiao, DateTime? ngaytao = null, bool? dathanhtoan = null, bool? tinhtranggiaohang = null);
        int CreateBill(DonHang bill);
        int CreateDetail(Chittiet1 detail);

        int Update(DonHang bill);
        int Delete(DonHang mahd);

        DonHang GetByMaHD(string mahd);
        IEnumerable<TableJoinResult> GetDetailByMaHD(string mahd);

        int Deletechittiet(Chittiet1 mahd);
        int Updatechittiet(Chittiet1 chittiet);
        Chittiet1 GetByDetail(string mahd,string masp);
        IEnumerable<Chittiet1>  GetByDetailCount(string mahd);
    }
}
