﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Services
{
    public interface IDangnhap
    {
        KhachHangb2 Authenticate(string tk, string mk);


        KhachHangb2 Create(KhachHangb2 customer, string mk);
        IEnumerable<KhachHangb2> Get();
    }
}
