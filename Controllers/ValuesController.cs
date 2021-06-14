using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Web.Models;
using Microsoft.Extensions.Configuration;
using Web.Services;
using Web.ViewModels;

namespace Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private IDangnhap _dangnhap;
        private DB_QLGHContext DBContext;
        public ValuesController(DB_QLGHContext dbContext,
            IDangnhap dangnhap)
        {

            _dangnhap = dangnhap;
            DBContext = dbContext;
        }
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)// hàm Authenticate như hàm login
        {
            var custumer = _dangnhap.Authenticate(model.TaiKhoan, model.MatKhau);//nhận username và password nhập vào từ body

            if (custumer == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            else
                return Ok(new

                {
                    MaKh = custumer.MaKh,
                    Hoten = custumer.Hoten
                }
                    ) ;


        }
        

         [HttpPost("create")]
        public IActionResult Create([FromBody] RegisterModel model)//RegisterModel là 1 viewmoel,
        {
            int c = _dangnhap.Get().Count();
            //int k = _dangnhap.Get().Count();
            var customer = new KhachHangb2()//tao ra mot model gan gia tri cua viewmodel bang bien model
            {
                /* var c = hdrepo.GetDonhang().Count();
             var ms = "MHD0" + (c + 1);*/
                
            MaKh = "MK0"+(c+1),
                Hoten = model.Hoten,
                NgaySinh = DateTime.Parse(model.NgaySinh),
                GioiTinh = Boolean.Parse(model.GioiTinh),
                SoDt = model.SoDt,
                TaiKhoan = model.TaiKhoan,
                MatKhau = model.MatKhau,
                Email = model.Email,
                DiaChi = model.DiaChi
            };
            try
            {
                // create user
                _dangnhap.Create(customer, model.MatKhau);
                return Ok(new
                {
                    message = "da tao thanh cong " + customer.Hoten//phai tao ra 1 đối tượng 
                });
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

    }
}
