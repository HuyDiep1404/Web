using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Services
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
    }
}
