/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class Giohangitem
    {
        public Sach1 Shopping_s { get; set; }
        public int? Sl { get; set; }

    }
    public class GioHang
    { 
    public GioHang()
            {
                Items = new List<Giohangitem>();
            }
            public List<Giohangitem> Items { get; set; }
            public IEnumerable<Giohangitem> GetSach()
            {
                return Items;
            }
            public int add(Giohangitem item)
            {
                Items.Add(item);
                return Items.Count;//ko return list nen return so data
            }
            public int delete(string masp)//truyen vao mar de xoa
            {
                var item = Items.FirstOrDefault(a => a.Shopping_s.MaSp == masp);
                if (item != null)
                {
                    Items.Remove(item);
                }
                return Items.Count;
            }
            public int RemoveAll()
            {

                Items.Clear();
                return Items.Count;

            }
            public int Update(string masp, int? sl)
            {
                var tim = Items.First(a => a.Shopping_s.MaSp == masp);
                if (tim != null)
                {
                    tim.Sl = sl;
                }
                return Items.Count;

            }
        }
}
*/