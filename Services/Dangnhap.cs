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
        public KhachHangb2 Create(KhachHangb2 customer, string mk)
        {
            if (string.IsNullOrWhiteSpace(mk))
                throw new Exception("Password is required");

            if (_context.KhachHangb2s.Any(x => x.TaiKhoan == customer.TaiKhoan))
                //<<<<<<< HEAD
                throw new Exception("Username \"" + customer.TaiKhoan + "\" is already taken");
            if (_context.KhachHangb2s.Any(x => x.SoDt == customer.SoDt))
                //<<<<<<< HEAD
                throw new Exception("numberphone \"" + customer.SoDt + "\" is already taken");


            _context.KhachHangb2s.Add(customer);
            _context.SaveChanges();

           
            return customer;
        }
    }
}
