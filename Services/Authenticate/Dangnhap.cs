using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;
using Web.Services.JoinTable;

namespace Web.Services.Authenticate
{
    public class Dangnhap:IDangnhap
    {

        private DB_QLGHContext _context;

        public Dangnhap(DB_QLGHContext context)
        {
            _context = context;
        }
        public KhachHangb2 Authenticate(string tk,string mk)
        {
            if (string.IsNullOrEmpty(tk) || string.IsNullOrEmpty(mk))
                return null;

            var customer = _context.KhachHangb2s.SingleOrDefault(x => (x.TaiKhoan == tk && x.MatKhau== mk ));

            // check if username exists
            if (customer == null)
                return null;

            // authentication successful
            return customer;
        }
        public KhachHangb2 Create(KhachHangb2 customer)
        {
      

            if (_context.KhachHangb2s.Any(x => x.TaiKhoan == customer.TaiKhoan))
                
                throw new Exception("Taì Khoản " + customer.TaiKhoan + " đã tồn tại");
            if (_context.KhachHangb2s.Any(x => x.SoDt == customer.SoDt))
               
                throw new Exception("numberphone " + customer.SoDt + " đã được sử dụng");
            if (_context.KhachHangb2s.Any(x => x.Email == customer.Email))
               
                throw new Exception("Email " + customer.Email + " đã được sử dụng");


            _context.KhachHangb2s.Add(customer);
            _context.SaveChanges();

           
            return customer;
        }
        public IEnumerable<KhachHangb2> Get()
        {          
            return _context.KhachHangb2s;
        }
        public IEnumerable<DonHang> GetDonHang()
        {
            return _context.DonHangs;
        }
        public IEnumerable<DonHang> GetDonHanghistory(string makh)
        {
            return _context.DonHangs.Where(i => i.MaKh == makh);
        }
        public IEnumerable<DonHang> GetDonHanghistory(string makh,DateTime? ngaygiao,DateTime? ngaytao = null, bool? dathanhtoan =null,bool? tinhtranggiaohang=null)
        {
            return _context.DonHangs.Where(i => (i.MaKh == makh) &&((i.NgayGiao == ngaygiao|| ngaygiao == null)
            &&(i.NgayTao == ngaytao || ngaytao == null) && (i.Dathanhtoan == dathanhtoan||dathanhtoan == null)
            &&(i.Tinhtranggiaohang == tinhtranggiaohang||tinhtranggiaohang == null)));
        }
        


        public DonHang GetByMaHD(string mahd)
        {
            return _context.DonHangs.Find(mahd);
        }

        public int CreateBill(DonHang bill)
        {
            if(_context.DonHangs.Any(x => x.MaHoaDon == bill.MaHoaDon))

                throw new Exception("Hóa đơn đã tồn tại " + bill.MaHoaDon + " đã tồn tại");
            _context.DonHangs.Add(bill);
            return _context.SaveChanges();
        }
        public int CreateDetail (Chittiet1 detail)
        {
            _context.Chittiet1s.Add(detail);
           return _context.SaveChanges();
            
        }
        public int Update(DonHang bill)
        {
            var mahd = _context.DonHangs.Find(bill.MaHoaDon);
            if (mahd == null)
                throw new Exception("không tìm thấy Hóa đơn này");
            _context.DonHangs.Update(mahd);
            return _context.SaveChanges();

        }
        public IEnumerable<TableJoinResult> GetDetailByMaHD(string mahd)
        {
            
            return (from i1 in _context.Chittiet1s 
                    join j1 in _context.Sach1s on i1.MaSp equals j1.MaSp
                    where i1.MaHd.Equals(mahd)
                    select new TableJoinResult { Chittiet1 = i1, Sach1 = j1 });
        }
        public int Deletechittiet(string mahd)
        {
            var hd = _context.Chittiet1s.Find(mahd);
            if (hd == null)
                throw new Exception("không tìm thấy Hóa đơn này");
            _context.Chittiet1s.Remove(hd);
            return _context.SaveChanges();
        }
        public int Updatechittiet(Chittiet1 chittiet)
        {
            var mahd = _context.Chittiet1s.Find(chittiet.MaHd);
            if (mahd == null)
                throw new Exception("không tìm thấy Hóa đơn này");
            _context.Chittiet1s.Update(mahd);
            return _context.SaveChanges();
        }
        public Chittiet1 GetByDetail(string mahd,string masp)
        {
            return _context.Chittiet1s.Find(mahd, masp);
        }

    }
}
