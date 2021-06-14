using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Book
{
    public interface IInfo
    {
        IEnumerable<Sach1> GetSTCDVaNXB(string mcd, string mnxb);
        IEnumerable<Sach1> GetSTCDVaNXB(string masp);
        Sach1 GetMasp(string masp);
    }
}
