using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Book
{
    public class Info: IInfo
    {
        private DB_QLGHContext _context;

        public Info(DB_QLGHContext context)
        {
            _context = context;
        }
        public IEnumerable<Sach1>GetSTCDVaNXB(string mcd=null,string mnxb=null)
        {
            return _context.Sach1s.Where(x => (x.MaChuDe == mcd || mcd == null) || (x.MaNxb == mnxb || mnxb == null));
        }
        public IEnumerable<Sach1> GetMaSP(string masp=null)
        {
            return _context.Sach1s.Where(x => x.MaSp == masp || masp == null);
        }
        public Sach1 GetMasp(string masp = null)
        {
            return _context.Sach1s.First(x=>x.MaSp == masp);
        }
        //public void Insert(Sach book,string booktitle)
        //{
        //    var tensach=_context.S
        //}
    }
}
