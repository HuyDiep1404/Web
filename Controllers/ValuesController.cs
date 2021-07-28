using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Web.Models;
using Microsoft.Extensions.Configuration;
using Web.Services.Authenticate;
using Web.ViewModels;
using Web.Services.Book;

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
            try
            {
                var custumer = _dangnhap.Authenticate(model.TaiKhoan, model.MatKhau);//nhận username và password nhập vào từ body

                if (custumer == null)
                    return BadRequest(new { message = "Username or password is incorrect" });
                else
                    return Ok(new

                    {
                        MaKh = custumer.MaKh,
                        Hoten = custumer.Hoten,
                        SoDt = custumer.SoDt,
                        Diachi = custumer.DiaChi
                    }
                        );
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message + ex.InnerException?.Message });
            }

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
                });
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
        [HttpGet("getsuggest")]
        public IActionResult Getsuggest(string tensp = null)
        {
            var book = _info.Getsuggest(tensp);
            if (book.Any())
                return Ok(book);
            else
                return BadRequest(new { message = "khong tim thấy quyển sách cần tìm " });


        }
        [HttpGet("getCDVaNXB")]
        public IActionResult GetCDVaNXB(string macd = null, string maxb = null)
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
        [HttpGet("getMaSP")]
        public IActionResult GetMaSP(string masp = null)
        {
            var sp = _info.GetMaSP(masp);
            if (sp != null)
                return Ok(sp);
            else
                return BadRequest(new { message = "khong tim thấy quyển sách cần tìm theo mã mã sách" });
        }

        [HttpGet("masp")]
        public IActionResult Masp(string masp = null)
        {
            var sp = _info.Masp(masp);
            if (sp != null)
                return Ok(sp);
            else
                return BadRequest(new { message = "khong tim thấy quyển sách cần tìm theo mã mã sách" });
        }
        [HttpPost("createBill")]

        public IActionResult CreateBill([FromBody] BillModel model)//RegisterModel là 1 viewmoel,
        {

            try
            {
                int c = _dangnhap.GetDonHang().Count();
                var bill = new DonHang()//tao ra mot model gan gia tri cua viewmodel bang bien model
                {
                    MaHoaDon = "MHD0" + (c + 1),
                    NgayTao = model.NgayTao,
                    MaKh = model.MaKh,
                    NgayGiao = model.NgayGiao,
                    Dathanhtoan = model.Dathanhtoan,
                    Tinhtranggiaohang = model.Tinhtranggiaohang


                };
                // create user       
                if (_dangnhap.CreateBill(bill) > 0)
                {
                    for (int i = 0; i < model.Details1.Length; i++)
                    {
                        var detail = new Chittiet1()//tao ra mot model gan gia tri cua viewmodel bang bien model
                        {
                            MaHd = bill.MaHoaDon,
                            MaSp = model.Details1[i].MaSp,
                            SoLuong = model.Details1[i].SoLuong,
                            Dongia = model.Details1[i].Dongia
                        };
                        if (_dangnhap.CreateDetail(detail) <= 0)
                        {
                            return NotFound(new
                            {
                                message = "ko tạo thành công" //phai tao ra 1 đối tượng 
                            });
                        }


                    }
                    return Ok(new
                    {
                        mahd = bill.MaHoaDon,
                        message = "đã tạo thành công" //phai tao ra 1 đối tượng 
                    });
                }
                return NotFound(new
                {
                    message = "ko tạo thành công" //phai tao ra 1 đối tượng 
                });
            }
            catch (Exception ex)
            {

                return BadRequest(new
                {
                    message = ex.Message //phai tao ra 1 đối tượng 
                });
            }
        }
        //ghi chú get thì nên dùng cho select dữ liệu còn post thì nên dùng cho thay dổi dữ liệu
        //neu so ngay dat bang ngay hien tai thi bang false
        [HttpGet("updateBill")]

        public IActionResult UpdateBill(string mahd = null)//RegisterModel là 1 viewmoel,
        {

            var bill = _dangnhap.GetByMaHD(mahd);//lay theo id
            bill.Dathanhtoan = false;
            try
            {
                // update user 
                _dangnhap.Update(bill);
                return Ok(new
                {
                    Dathanhtoan = bill.Dathanhtoan,
                    message = "đơn hàng đã được hủy"
                });
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("historydonhang")]

        public IActionResult historydonhang(string makh, DateTime? ngaygiao, DateTime? ngaytao = null, bool? dathanhtoan = null, bool? tinhtranggiaohang = null)//RegisterModel là 1 viewmoel,
        {
            var history = _dangnhap.GetDonHanghistory(makh, ngaygiao, ngaytao, dathanhtoan, tinhtranggiaohang);

            return Ok(history);
        }
        [HttpGet("historychitiet")]
        public IActionResult historychitiet(string mahd)
        {
            var history = _dangnhap.GetDetailByMaHD(mahd);
            return Ok(history);
        }
        [HttpGet("historydonhangdelete")]
        public IActionResult historydonhangdelete(string mahd)
        {
            var history = _dangnhap.GetByMaHD(mahd);
            return Ok(history);
        }

        [HttpPost("uppdatechitiet")]
        /*public IActionResult UpdateDetail(string mahd = null,int? soluong=null)
        {

            var bill = _dangnhap.GetByDetail(mahd);
            bill.SoLuong = soluong;
            try
            {
                // update user 
                _dangnhap.Updatechittiet(bill);
                return Ok(new
                {
                    SoLuong = bill.SoLuong,
                    message = "đơn hàng đã được cập nhật"
                });
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }*/
        public IActionResult UpdateBill([FromBody] UpdateBillModel model)//RegisterModel là 1 viewmoel,
        {

            try
            {
                var bill = _dangnhap.GetByMaHD(model.MaHoaDon);
                {
                    bill.MaHoaDon = model.MaHoaDon;
                    bill.NgayTao = model.NgayTao;
                    bill.MaKh = model.MaKh;
                    bill.NgayGiao = model.NgayGiao;
                    bill.Dathanhtoan = model.Dathanhtoan;
                    bill.Tinhtranggiaohang = model.Tinhtranggiaohang;
                };
                // create user       
                if (_dangnhap.Update(bill) > 0)
                {
                    for (int i = 0; i < model.Details1.Length; i++)
                    {
                        var detail = _dangnhap.GetByDetail(model.MaHoaDon, model.Details1[i].MaSp);//tao ra mot model gan gia tri cua viewmodel bang bien model
                        {
                            detail.MaHd = bill.MaHoaDon;
                            detail.MaSp = model.Details1[i].MaSp;
                            detail.SoLuong = model.Details1[i].SoLuong;
                            detail.Dongia = model.Details1[i].Dongia;
                        };
                        if (_dangnhap.Updatechittiet(detail) <= 0)
                        {
                            return NotFound(new
                            {
                                message = "cập nhật ko thành công" //phai tao ra 1 đối tượng 
                            });
                        }


                    }
                    return Ok(new
                    {
                        mahd = bill.MaHoaDon,
                        message = "cập nhật thành công" //phai tao ra 1 đối tượng 
                    });
                }
                return NotFound(new
                {
                    message = "cập nhật ko thành công" //phai tao ra 1 đối tượng 
                });
            }
            catch (Exception ex)
            {

                return BadRequest(new
                {
                    message = ex.Message //phai tao ra 1 đối tượng 
                });
            }
        }
        [HttpPost("deleteBill")]



        public IActionResult DeleteBill([FromBody] DeleteDetailAndBillModel model)//RegisterModel là 1 viewmoel,
        {

            try
            {
                var donHang = _dangnhap.GetByMaHD(model.MaHoaDon);
                donHang.Dathanhtoan = model.Dathanhtoan;
                if (_dangnhap.Update(donHang) > 0)
                {

                    for (int i = 0; i < model.Details1.Length; i++)
                    {
                        var detail = _dangnhap.GetByDetail(model.Details1[i].MaHoaDon, model.Details1[i].MaSp);
                        if (detail == null)
                        {
                            return NotFound(new
                            {
                                message = "hủy không thành công đơn hàng" //phai tao ra 1 đối tượng 
                            });

                        }
                        _dangnhap.Deletechittiet(detail);
                    }
                    return Ok(new
                    {
                        Dathanhtoan = donHang.Dathanhtoan,
                        message = "đơn hàng đã được hủy"
                    });
                }
                return NotFound(new
                {
                    message = "hủy không thành công đơn hàng" //phai tao ra 1 đối tượng 
                });

            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }

        }
        [HttpPost("deleteBook")]
        public IActionResult DeleteBook([FromBody] SachModel model)
        {
            var Sach = _info.GetMaSP(model.MaSp);
            if (_info.Delete(Sach) <= 0)
            {
                return NotFound(new
                {
                    message = "hủy không thành công đơn hàng" //phai tao ra 1 đối tượng 
                });

            }
            else
                return Ok(new
                {
                    alert = true,
                    message = "đơn hàng đã được hủy"
                });

        }
        [HttpPost("updateBook")]
        public IActionResult UpdateBook([FromBody] SachModel model)//RegisterModel là 1 viewmoel,
        {

            try
            {


                var book = _info.GetMaSP(model.MaSp);
                {
                    book.MaSp = model.MaSp;
                    book.TenSp = model.TenSp;
                    book.GiaBan = model.GiaBan;
                    book.Mota = model.Mota;
                    book.NgayCapNhat = model.NgayCapNhat;
                    book.AnhBia = model.AnhBia;
                    book.SoLuongTon = model.SoLuongTon;
                    book.MaChuDe = model.MaChuDe;
                    book.MaNxb = model.MaNxb;

                };
                if(_info.Update(book) >0)
                {
                    return Ok(new
                    {
                        alert = true,
                        message = "đã tạo thành công" //phai tao ra 1 đối tượng 
                    });
                }
                else
                return Ok(new
                {
                    message = "tạo không thành công" //phai tao ra 1 đối tượng 
                });
               
            
            
        }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("insertBook")]
        public IActionResult InsertBook([FromBody] SachModel model)//RegisterModel là 1 viewmoel,
        {

            try
            {
                var c = _info.GetSach().Max(k => int.Parse(k.MaSp.Substring(3, 2))); ;
                var book = new Sach1()
                {
                    MaSp = "MSP" + (c+1),
                    TenSp = model.TenSp,
                    GiaBan = model.GiaBan,
                    Mota = model.Mota,
                    NgayCapNhat = model.NgayCapNhat,
                    AnhBia = model.AnhBia,
                    SoLuongTon = model.SoLuongTon,
                    MaChuDe = model.MaChuDe,
                    MaNxb = model.MaNxb

                };
                if (_info.Insert(book) > 0)
                {
                    return Ok(new
                    {
                        alert = true,
                        message = "đã tạo thành công" //phai tao ra 1 đối tượng 
                    });
                }
                else
                    return Ok(new
                    {
                        message = "tạo không thành công" //phai tao ra 1 đối tượng 
                    });



            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("insertChuDe")]
        public IActionResult InsertChuDe([FromBody] ChuDeModel model)//RegisterModel là 1 viewmoel,
        {

            try
            {
                var c = _info.GetChuDe().Count();
                var chude = new ChuDe()
                {
                    MaChuDe = "MCD" + (c + 1),
                    TenChuDe=model.TenChuDe

                };
                if (_info.InsertChuDe(chude) > 0)
                {
                    return Ok(new
                    {
                        alert = true,
                        message = "đã tạo thành công" //phai tao ra 1 đối tượng 
                    });
                }
                else
                    return Ok(new
                    {
                        message = "tạo không thành công" //phai tao ra 1 đối tượng 
                    });



            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("insertNhaXB")]
        public IActionResult InsertNhaXB([FromBody] NhaXBModel model)//RegisterModel là 1 viewmoel,
        {

            try
            {
                var c = _info.GetMaNXB().Count();
                var nhaXB = new Nhaxb()
                {
                    MaNxb = "MNXB" + (c + 1),
                    TenXb = model.TenXb,
                    DiaChi = model.DiaChi,
                    DienThoai =model.DienThoai

                };
                if (_info.InsertNhaxb(nhaXB) > 0)
                {
                    return Ok(new
                    {
                        alert = true,
                        message = "đã tạo thành công" //phai tao ra 1 đối tượng 
                    });
                }
                else
                    return Ok(new
                    {
                        message = "tạo không thành công" //phai tao ra 1 đối tượng 
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

