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
        public IEnumerable<Sach1> GetCDVaNXB(string mcd = null,string mnxb = null)
        {
            return _context.Sach1s.Where(x => (x.MaChuDe == mcd || mcd == null) && (x.MaNxb == mnxb || mnxb == null));
        }
        public Sach1 GetMaSP(string masp = null)
        {
            return _context.Sach1s.FirstOrDefault(x => x.MaSp == masp);
        }
        public Sach1 Masp(string masp = null)
        {
            return _context.Sach1s.First(x=>x.MaSp == masp);
        }
        public Sach1 Insert(Sach1 book)
        {
            
            _context.Sach1s.Add(book);
            _context.SaveChanges();


            return book;
        }
        public void Update(Sach1 book)
        {
            var masp = _context.Sach1s.Find(book.MaSp);
            if (masp == null)
                throw new Exception("không tìm thấy sản phẩm này");
          
                

            _context.Sach1s.Update(masp);
            _context.SaveChanges();

        }
        public void Delete(string masp)
        {
            var book = _context.Sach1s.Find(masp);
            if (book != null)
            {
                _context.Sach1s.Remove(book);
                _context.SaveChanges();
            }
        }
        public IEnumerable<Nhaxb> GetMaNXB()
        {
            return _context.Nhaxbs;
        }
        public IEnumerable<ChuDe> GetChuDe()
        {
            return _context.ChuDes;
        }

    }
}
