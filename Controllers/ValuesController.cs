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
using Web.Book;

namespace Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private IInfo _info;
        private IDangnhap _dangnhap;
        private DB_QLGHContext DBContext;
        public ValuesController(DB_QLGHContext dbContext, IInfo info,
            IDangnhap dangnhap)
        {
            _info = info;
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
                    );


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

                MaKh = "MK0" + (c + 1),
                Hoten = model.Hoten,
                NgaySinh = model.NgaySinh,
                GioiTinh = model.GioiTinh,
                SoDt = model.SoDt,
                TaiKhoan = model.TaiKhoan,
                MatKhau = model.MatKhau,
                Email = model.Email,
                DiaChi = model.DiaChi
            };
            try
            {
                // create user
                _dangnhap.Create(customer);
                return Ok(new
                {
                    message = "đã tạo thành công" //phai tao ra 1 đối tượng 
                }) ;
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new
                {
                    message = ex.Message //phai tao ra 1 đối tượng 
                });
            }
        }
        //[HttpPost("getCDVaNXB")]
        //public IActionResult GetCDVaNXB([FromBody] BookModel model)
        //{
        //    var book = _info.GetCDVaNXB(model.MaChuDe, model.MaNxb);
        //    if (book == null)
        //        return BadRequest(new { message = "khong tim thấy quyển sách cần tìm theo mã chủ đề và mã nhà xuất bản" });
        //    else
        //        return Ok(book);


        //}
        [HttpGet("getCDVaNXB")]
        public IActionResult GetCDVaNXB(string macd = null, string maxb=null)
        {
            var book = _info.GetCDVaNXB(macd, maxb);
            if (book.Any())
                return Ok(book);
            else
            return BadRequest(new { message = "khong tim thấy quyển sách cần tìm theo mã chủ đề và mã nhà xuất bản" });
            
                


        }
        [HttpGet("getChuDe")]
        public IActionResult GetChuDe()
        {
            var chude = _info.GetChuDe();
         
                return Ok(chude);

        }
        [HttpGet("getMaNXB")]
        public IActionResult GetMaNXB()
        {
            var nxb = _info.GetMaNXB();
            
                return Ok(nxb);

        }

    }
}
