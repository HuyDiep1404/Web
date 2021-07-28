﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Services.Book
{
    public interface IInfo
    {
        IEnumerable<Sach1> GetCDVaNXB(string mcd, string mnxb);
        IEnumerable<Sach1> Getsuggest(string tensp);
        Sach1 GetMaSP(string masp);
        Sach1 Masp(string masp);
        int Insert(Sach1 book);
        int Update(Sach1 book);
        int Delete(Sach1 book);
        IEnumerable<Nhaxb> GetMaNXB();
        IEnumerable<ChuDe> GetChuDe();
        IEnumerable<Sach1> GetSach();
        int InsertChuDe(ChuDe book);
        int InsertNhaxb(Nhaxb book);
    }
}
