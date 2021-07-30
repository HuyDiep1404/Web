using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Web.Models
{
    public partial class DB_QLGHContext : DbContext
    {
        public DB_QLGHContext()
        {
        }

        public DB_QLGHContext(DbContextOptions<DB_QLGHContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Chitietdathang> Chitietdathangs { get; set; }
        public virtual DbSet<Chittiet> Chittiets { get; set; }
        public virtual DbSet<Chittiet1> Chittiet1s { get; set; }
        public virtual DbSet<ChuDe> ChuDes { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<DonHang> DonHangs { get; set; }
        public virtual DbSet<Dondathang> Dondathangs { get; set; }
        public virtual DbSet<HoaDon> HoaDons { get; set; }
        public virtual DbSet<HocSinh> HocSinhs { get; set; }
        public virtual DbSet<KhachHangb2> KhachHangb2s { get; set; }
        public virtual DbSet<Khachhang> Khachhangs { get; set; }
        public virtual DbSet<Loai> Loais { get; set; }
        public virtual DbSet<Loaihang> Loaihangs { get; set; }
        public virtual DbSet<Mathang> Mathangs { get; set; }
        public virtual DbSet<Nhacungcap> Nhacungcaps { get; set; }
        public virtual DbSet<Nhanvien> Nhanviens { get; set; }
        public virtual DbSet<Nhanvien1> Nhanvien1s { get; set; }
        public virtual DbSet<Nhaxb> Nhaxbs { get; set; }
        public virtual DbSet<PhongBan> PhongBans { get; set; }
        public virtual DbSet<Sach> Saches { get; set; }
        public virtual DbSet<Sach1> Sach1s { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<TblBaihat> TblBaihats { get; set; }
        public virtual DbSet<TblChittiet> TblChittiets { get; set; }
        public virtual DbSet<TblHoaDon> TblHoaDons { get; set; }
        public virtual DbSet<TblHoaDon1> TblHoaDon1s { get; set; }
        public virtual DbSet<TblKhachHang> TblKhachHangs { get; set; }
        public virtual DbSet<TblLoai> TblLoais { get; set; }
        public virtual DbSet<TblNhaSanXuat> TblNhaSanXuats { get; set; }
        public virtual DbSet<TblNhacsi> TblNhacsis { get; set; }
        public virtual DbSet<TblSanPham> TblSanPhams { get; set; }
        public virtual DbSet<TblTheloai> TblTheloais { get; set; }
        public virtual DbSet<User> Users { get; set; }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Chitietdathang>(entity =>
            {
                entity.HasKey(e => new { e.Sohoadon, e.Mahang });

                entity.ToTable("CHITIETDATHANG");

                entity.Property(e => e.Sohoadon)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("SOHOADON");

                entity.Property(e => e.Mahang)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MAHANG");

                entity.Property(e => e.Giaban)
                    .HasColumnType("money")
                    .HasColumnName("GIABAN");

                entity.Property(e => e.Mucgiamgia).HasColumnName("MUCGIAMGIA");

                entity.Property(e => e.Soluong).HasColumnName("SOLUONG");

                entity.HasOne(d => d.MahangNavigation)
                    .WithMany(p => p.Chitietdathangs)
                    .HasForeignKey(d => d.Mahang)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CHITIETDATHANG2");

                entity.HasOne(d => d.SohoadonNavigation)
                    .WithMany(p => p.Chitietdathangs)
                    .HasForeignKey(d => d.Sohoadon)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CHITIETDATHANG");
            });

            modelBuilder.Entity<Chittiet>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Chittiet");

                entity.Property(e => e.Dongia).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.MaHd)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("MaHD");

                entity.Property(e => e.MaSp)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("MaSP");
            });

            modelBuilder.Entity<Chittiet1>(entity =>
            {
                entity.HasKey(e => new { e.MaHd, e.MaSp })
                    .HasName("tblChittiet_2");

                entity.ToTable("Chittiet1");

                entity.Property(e => e.MaHd)
                    .HasMaxLength(50)
                    .HasColumnName("MaHD");

                entity.Property(e => e.MaSp)
                    .HasMaxLength(50)
                    .HasColumnName("MaSP");

                entity.Property(e => e.Dongia).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<ChuDe>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("ChuDe");

                entity.Property(e => e.MaChuDe).HasMaxLength(50);

                entity.Property(e => e.TenChuDe).HasMaxLength(50);
            });

            modelBuilder.Entity<DonHang>(entity =>
            {
                entity.HasKey(e => e.MaHoaDon)
                    .HasName("PK__DonHang__835ED13B3CFF52C3");

                entity.ToTable("DonHang");

                entity.Property(e => e.MaHoaDon).HasMaxLength(50);

                entity.Property(e => e.MaKh)
                    .HasMaxLength(50)
                    .HasColumnName("MaKH");

                entity.Property(e => e.NgayGiao).HasColumnType("date");

                entity.Property(e => e.NgayTao).HasColumnType("date");
            });

            modelBuilder.Entity<Dondathang>(entity =>
            {
                entity.HasKey(e => e.Sohoadon)
                    .HasName("PK__DONDATHA__E0850E96B0DE8D3A");

                entity.ToTable("DONDATHANG");

                entity.Property(e => e.Sohoadon)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("SOHOADON");

                entity.Property(e => e.Makhachhang)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MAKHACHHANG");

                entity.Property(e => e.Manhanvien)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MANHANVIEN");

                entity.Property(e => e.Ngaychuyenhang)
                    .HasColumnType("datetime")
                    .HasColumnName("NGAYCHUYENHANG");

                entity.Property(e => e.Ngaydathang)
                    .HasColumnType("datetime")
                    .HasColumnName("NGAYDATHANG");

                entity.Property(e => e.Ngaygiaohang)
                    .HasColumnType("datetime")
                    .HasColumnName("NGAYGIAOHANG");

                entity.Property(e => e.Noigiaohang)
                    .HasMaxLength(50)
                    .HasColumnName("NOIGIAOHANG");

                entity.Property(e => e.Sotien)
                    .HasColumnType("money")
                    .HasColumnName("SOTIEN");

                entity.HasOne(d => d.MakhachhangNavigation)
                    .WithMany(p => p.Dondathangs)
                    .HasForeignKey(d => d.Makhachhang)
                    .HasConstraintName("fk_DONDATHANG");

                entity.HasOne(d => d.ManhanvienNavigation)
                    .WithMany(p => p.Dondathangs)
                    .HasForeignKey(d => d.Manhanvien)
                    .HasConstraintName("fk_DONDATHANG2");
            });

            modelBuilder.Entity<HoaDon>(entity =>
            {
                entity.HasKey(e => e.MaHoaDon)
                    .HasName("PK__HoaDon__835ED13B34E21E4D");

                entity.ToTable("HoaDon");

                entity.Property(e => e.MaHoaDon).HasMaxLength(50);

                entity.Property(e => e.MaKh)
                    .HasMaxLength(50)
                    .HasColumnName("MaKH");

                entity.Property(e => e.NgayGiao).HasColumnType("date");

                entity.Property(e => e.NgayTao).HasColumnType("date");
            });

            modelBuilder.Entity<HocSinh>(entity =>
            {
                entity.Property(e => e.Hoten).HasColumnName("hoten");

                entity.Property(e => e.Mahs).HasColumnName("mahs");
            });

            modelBuilder.Entity<KhachHangb2>(entity =>
            {
                entity.HasKey(e => e.MaKh)
                    .HasName("PK__KhachHan__2725CF1E6DDC7A83");

                entity.ToTable("KhachHangb2");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(50)
                    .HasColumnName("MaKH");

                entity.Property(e => e.DiaChi).HasMaxLength(500);

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Hoten).HasMaxLength(50);

                entity.Property(e => e.MatKhau).HasMaxLength(50);

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.SoDt).HasMaxLength(50);

                entity.Property(e => e.TaiKhoan).HasMaxLength(50);
            });

            modelBuilder.Entity<Khachhang>(entity =>
            {
                entity.HasKey(e => e.Makhachhang)
                    .HasName("PK__KHACHHAN__30035C2FE228A9FA");

                entity.ToTable("KHACHHANG");

                entity.Property(e => e.Makhachhang)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MAKHACHHANG");

                entity.Property(e => e.Diachi)
                    .HasMaxLength(50)
                    .HasColumnName("DIACHI");

                entity.Property(e => e.Tencongty)
                    .HasMaxLength(50)
                    .HasColumnName("TENCONGTY");

                entity.Property(e => e.Tengiaodich)
                    .HasMaxLength(50)
                    .HasColumnName("TENGIAODICH");
            });

            modelBuilder.Entity<Loai>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("loai");

                entity.Property(e => e.Hinh).HasColumnType("text");

                entity.Property(e => e.Tenloai).HasMaxLength(50);
            });

            modelBuilder.Entity<Loaihang>(entity =>
            {
                entity.HasKey(e => e.Maloaihang)
                    .HasName("PK__LOAIHANG__BF613CFB740DDED8");

                entity.ToTable("LOAIHANG");

                entity.Property(e => e.Maloaihang)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MALOAIHANG");

                entity.Property(e => e.Tenloaihang)
                    .HasMaxLength(50)
                    .HasColumnName("TENLOAIHANG");
            });

            modelBuilder.Entity<Mathang>(entity =>
            {
                entity.HasKey(e => e.Mahang)
                    .HasName("PK__MATHANG__279EA4C233DFB8CD");

                entity.ToTable("MATHANG");

                entity.Property(e => e.Mahang)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MAHANG");

                entity.Property(e => e.Donvitinh)
                    .HasMaxLength(15)
                    .HasColumnName("DONVITINH");

                entity.Property(e => e.Giahang)
                    .HasColumnType("money")
                    .HasColumnName("GIAHANG");

                entity.Property(e => e.Gioitinh).HasColumnName("GIOITINH");

                entity.Property(e => e.Macongty)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MACONGTY");

                entity.Property(e => e.Maloaihang)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MALOAIHANG");

                entity.Property(e => e.Soluong).HasColumnName("SOLUONG");

                entity.Property(e => e.Tenhang)
                    .HasMaxLength(50)
                    .HasColumnName("TENHANG");

                entity.HasOne(d => d.MacongtyNavigation)
                    .WithMany(p => p.Mathangs)
                    .HasForeignKey(d => d.Macongty)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_MATHANG");

                entity.HasOne(d => d.MaloaihangNavigation)
                    .WithMany(p => p.Mathangs)
                    .HasForeignKey(d => d.Maloaihang)
                    .HasConstraintName("fk_MATHANG2");
            });

            modelBuilder.Entity<Nhacungcap>(entity =>
            {
                entity.HasKey(e => e.Macongty)
                    .HasName("PK__NHACUNGC__6B97F3F5103F6478");

                entity.ToTable("NHACUNGCAP");

                entity.Property(e => e.Macongty)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MACONGTY");

                entity.Property(e => e.Chotenht)
                    .HasMaxLength(510)
                    .IsUnicode(false)
                    .HasColumnName("CHOTENHT");

                entity.Property(e => e.Congviecht)
                    .HasMaxLength(150)
                    .HasColumnName("CONGVIECHT");

                entity.Property(e => e.Diachi)
                    .HasMaxLength(50)
                    .HasColumnName("DIACHI");

                entity.Property(e => e.Dienthoai)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("DIENTHOAI");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("EMAIL");

                entity.Property(e => e.Fax)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("FAX");

                entity.Property(e => e.Gioitinh)
                    .HasMaxLength(50)
                    .HasColumnName("GIOITINH");

                entity.Property(e => e.Matkhau)
                    .HasMaxLength(110)
                    .IsUnicode(false)
                    .HasColumnName("MATKHAU");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("NAME");

                entity.Property(e => e.Tencongty)
                    .HasMaxLength(50)
                    .HasColumnName("TENCONGTY");

                entity.Property(e => e.Tengiaodich)
                    .HasMaxLength(50)
                    .HasColumnName("TENGIAODICH");
            });

            modelBuilder.Entity<Nhanvien>(entity =>
            {
                entity.HasKey(e => e.Manhanvien)
                    .HasName("PK__NHANVIEN__7E46DD914A174240");

                entity.ToTable("NHANVIEN");

                entity.Property(e => e.Manhanvien)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MANHANVIEN");

                entity.Property(e => e.Diachi)
                    .HasMaxLength(50)
                    .HasColumnName("DIACHI");

                entity.Property(e => e.Dienthoai)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("DIENTHOAI");

                entity.Property(e => e.Ho)
                    .HasMaxLength(20)
                    .HasColumnName("HO");

                entity.Property(e => e.Luongcoban)
                    .HasColumnType("money")
                    .HasColumnName("LUONGCOBAN");

                entity.Property(e => e.Ngaylamviec)
                    .HasColumnType("date")
                    .HasColumnName("NGAYLAMVIEC");

                entity.Property(e => e.Ngaysinh)
                    .HasColumnType("date")
                    .HasColumnName("NGAYSINH");

                entity.Property(e => e.Phucap)
                    .HasColumnType("money")
                    .HasColumnName("PHUCAP");

                entity.Property(e => e.Ten)
                    .HasMaxLength(20)
                    .HasColumnName("TEN");
            });

            modelBuilder.Entity<Nhanvien1>(entity =>
            {
                entity.HasKey(e => e.Manhanvien)
                    .HasName("PK__Nhanvien__4015B8D287B73059");

                entity.ToTable("Nhanvien1");

                entity.Property(e => e.Manhanvien).HasMaxLength(50);

                entity.Property(e => e.Diachi).HasMaxLength(50);

                entity.Property(e => e.Hinhanh).HasColumnType("text");

                entity.Property(e => e.Mapg).HasMaxLength(50);

                entity.Property(e => e.Ngaysinh).HasColumnType("datetime");

                entity.Property(e => e.Tennhanvien).HasMaxLength(50);
            });

            modelBuilder.Entity<Nhaxb>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Nhaxb");

                entity.Property(e => e.DiaChi).HasMaxLength(50);

                entity.Property(e => e.DienThoai).HasMaxLength(50);

                entity.Property(e => e.MaNxb)
                    .HasMaxLength(50)
                    .HasColumnName("MaNXB");

                entity.Property(e => e.TenXb)
                    .HasMaxLength(50)
                    .HasColumnName("TenXB");
            });

            modelBuilder.Entity<PhongBan>(entity =>
            {
                entity.HasKey(e => e.MaPhong)
                    .HasName("PK__PhongBan__20BD5E5B1F209BED");

                entity.ToTable("PhongBan");

                entity.Property(e => e.MaPhong).HasMaxLength(50);

                entity.Property(e => e.ChucNang).HasMaxLength(50);

                entity.Property(e => e.TenPhong).HasMaxLength(50);
            });

            modelBuilder.Entity<Sach>(entity =>
            {
                entity.HasKey(e => e.Tensach)
                    .HasName("PK__SACH__52BC27F21DE5A499");

                entity.ToTable("SACH");

                entity.Property(e => e.Tensach).HasMaxLength(50);

                entity.Property(e => e.Hinhanh).HasColumnType("text");

                entity.Property(e => e.Hinhgiohang).HasColumnType("text");

                entity.Property(e => e.Noidung).HasMaxLength(400);
            });

            modelBuilder.Entity<Sach1>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Sach1");

                entity.Property(e => e.AnhBia).HasColumnType("text");

                entity.Property(e => e.GiaBan).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.MaChuDe).HasMaxLength(50);

                entity.Property(e => e.MaNxb)
                    .HasMaxLength(50)
                    .HasColumnName("MaNXB");

                entity.Property(e => e.MaSp)
                    .HasMaxLength(50)
                    .HasColumnName("MaSP");

                entity.Property(e => e.Mota)
                    .HasMaxLength(50)
                    .HasColumnName("mota");

                entity.Property(e => e.NgayCapNhat).HasColumnType("date");

                entity.Property(e => e.TenSp)
                    .HasMaxLength(50)
                    .HasColumnName("TenSP");
            });

            modelBuilder.Entity<TblBaihat>(entity =>
            {
                entity.HasKey(e => e.Mabaihat)
                    .HasName("PK__tbl_baih__EDDD7F38119AD6FC");

                entity.ToTable("tbl_baihat");

                entity.Property(e => e.Mabaihat).HasMaxLength(50);

                entity.Property(e => e.Mans).HasMaxLength(50);

                entity.Property(e => e.Matl).HasMaxLength(50);

                entity.Property(e => e.Tenbaihat).HasMaxLength(50);
            });

            modelBuilder.Entity<TblChittiet>(entity =>
            {
                entity.HasKey(e => new { e.MaHd, e.MaSp })
                    .HasName("tblChittiet_1");

                entity.ToTable("tblChittiet");

                entity.Property(e => e.MaHd)
                    .HasMaxLength(50)
                    .HasColumnName("MaHD");

                entity.Property(e => e.MaSp)
                    .HasMaxLength(50)
                    .HasColumnName("MaSP");

                entity.Property(e => e.Dongia).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<TblHoaDon>(entity =>
            {
                entity.HasKey(e => e.MaHoaDon)
                    .HasName("PK__tblHoaDo__835ED13BB9AEEA8C");

                entity.ToTable("tblHoaDon");

                entity.Property(e => e.MaHoaDon).HasMaxLength(50);

                entity.Property(e => e.MaKh)
                    .HasMaxLength(50)
                    .HasColumnName("MaKH");

                entity.Property(e => e.NgayTao).HasColumnType("date");
            });

            modelBuilder.Entity<TblHoaDon1>(entity =>
            {
                entity.HasKey(e => e.MaHoaDon)
                    .HasName("PK__tblHoaDo__835ED13B97F6D0BD");

                entity.ToTable("tblHoaDon1");

                entity.Property(e => e.MaHoaDon).HasMaxLength(50);

                entity.Property(e => e.MaKh)
                    .HasMaxLength(50)
                    .HasColumnName("MaKH");

                entity.Property(e => e.NgayGiao).HasColumnType("date");

                entity.Property(e => e.NgayTao).HasColumnType("date");
            });

            modelBuilder.Entity<TblKhachHang>(entity =>
            {
                entity.HasKey(e => e.MaKhachHang)
                    .HasName("PK__tblKhach__88D2F0E5B5D9C3FB");

                entity.ToTable("tblKhachHang");

                entity.Property(e => e.MaKhachHang).HasMaxLength(50);

                entity.Property(e => e.MatKhau).HasMaxLength(50);

                entity.Property(e => e.SoDt).HasMaxLength(50);

                entity.Property(e => e.TenKhachHang).HasMaxLength(50);
            });

            modelBuilder.Entity<TblLoai>(entity =>
            {
                entity.HasKey(e => e.Maloai)
                    .HasName("PK__tblLoai__3E1DB46D811E6571");

                entity.ToTable("tblLoai");

                entity.Property(e => e.Maloai).HasMaxLength(50);

                entity.Property(e => e.Tenloai).HasMaxLength(50);
            });

            modelBuilder.Entity<TblNhaSanXuat>(entity =>
            {
                entity.HasKey(e => e.MaNsx)
                    .HasName("PK__tblNhaSa__3A1BDBD2849D754D");

                entity.ToTable("tblNhaSanXuat");

                entity.Property(e => e.MaNsx)
                    .HasMaxLength(50)
                    .HasColumnName("MaNSX");

                entity.Property(e => e.TenNsx)
                    .HasMaxLength(50)
                    .HasColumnName("TenNSX");
            });

            modelBuilder.Entity<TblNhacsi>(entity =>
            {
                entity.HasKey(e => e.Manhacsi)
                    .HasName("PK__tbl_nhac__FB478CE977B72BB6");

                entity.ToTable("tbl_nhacsi");

                entity.Property(e => e.Manhacsi).HasMaxLength(50);

                entity.Property(e => e.Tennhacsi).HasMaxLength(50);
            });

            modelBuilder.Entity<TblSanPham>(entity =>
            {
                entity.HasKey(e => e.MaSanPham)
                    .HasName("PK__tblSanPh__FAC7442D11F66CAE");

                entity.ToTable("tblSanPham");

                entity.Property(e => e.MaSanPham).HasMaxLength(50);

                entity.Property(e => e.GhiChu).HasMaxLength(50);

                entity.Property(e => e.Gia).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Hinh).HasColumnType("text");

                entity.Property(e => e.MaL).HasMaxLength(50);

                entity.Property(e => e.MaSx)
                    .HasMaxLength(50)
                    .HasColumnName("MaSX");

                entity.Property(e => e.Sl).HasColumnName("sl");

                entity.Property(e => e.TenSp)
                    .HasMaxLength(50)
                    .HasColumnName("TenSP");

                entity.HasOne(d => d.MaLNavigation)
                    .WithMany(p => p.TblSanPhams)
                    .HasForeignKey(d => d.MaL)
                    .HasConstraintName("fk_tblSanPham");
            });

            modelBuilder.Entity<TblTheloai>(entity =>
            {
                entity.HasKey(e => e.Matheloai)
                    .HasName("PK__tbl_thel__8E2559304C0561B9");

                entity.ToTable("tbl_theloai");

                entity.Property(e => e.Matheloai).HasMaxLength(50);

                entity.Property(e => e.Tentheloai).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
