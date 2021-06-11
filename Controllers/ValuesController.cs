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
        [HttpGet("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)// hàm Authenticate như hàm login
        {
            var custumer = _dangnhap.Authenticate(model.TaiKhoan, model.MatKhau);//nhận username và password nhập vào từ body

            if (custumer == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            else
                return RedirectToAction("Shopb14", new { Hoten = custumer.Hoten });
            
            
        }
      

    }
}
