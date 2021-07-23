import React,  { Component }  from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FetchApi from './../../src/Api';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import Alert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
export class HistoryDetail extends React.Component {
  
    static displayName = HistoryDetail.name;
    constructor(props) {
      super(props);
      this.state=
      {
        NgayGiao:null,
        mahd:null,
        cur:[],
        soluong:1,
        SoLuongTon:0,
        masp:null,
       click:true,
       open1:false,
       open2:false,
       open3:false,
       open4:false,
       message4:"",
       severity:"",
       isError:false,
       soluong:1,
          textError:"",
          Dathanhtoan:null
      }
      this.handleDelete=this.handleDelete.bind(this);
      this.handleClose=this.handleClose.bind(this);
      this.handleClickOpenDelete=this.handleClickOpenDelete.bind(this);
 this.handleClickOpenUpdate=this.handleClickOpenUpdate.bind(this);
   this.handleUpdate=this.handleUpdate.bind(this);
   this.handleTextFieldChange=this.handleTextFieldChange.bind(this);
   this.handleDeleteAll=this.handleDeleteAll.bind(this);
   this.handleClickOpenDeleteAll=this.handleClickOpenDeleteAll.bind(this);
   this.handle=this.handle.bind(this);
  this.handleClose1=this.handleClose1.bind(this);
  this.handleTextFieldChangeNgayGiao=this.handleTextFieldChangeNgayGiao.bind(this);
  }
    handleClose()
    {
      const data= this.state;
      data.open1=false;
      data.open2=false;
      data.open3=false;
      this.setState(data);

    }
    
    handleTextFieldChange(param)
    {
      let newData= JSON.parse(localStorage.getItem('giohangdathanhtoan')) ?? [];
      let item = newData.find(a => a.MaSp == this.state.masp);
      const Data=this.state;
      if(param>item.SoLuongTon)
      {
        Data.isError=true;
        Data.textError="vui lòng nhập lại số lượng vì số lượng vượt quá số lượng tồn";
      }
      else
      {
        Data.isError=false;
        Data.textError="";
        Data.soluong=param; 
      }
      this.setState(Data);
      }
    handleDelete()
    {
      
      let newData= JSON.parse(localStorage.getItem('giohangdathanhtoan')) ?? [];
      let item = newData.filter(a => a.MaSp !== this.state.masp);//filter là bộ lọc lọc ra có thể là một mảng .
      //cách làm thay vì xóa ta thục hiện tìm mã khác mã truyền lại và lọc mạng đó khac array ban đầu rồi ta set lại mảng đó
      localStorage.setItem('giohangdathanhtoan', JSON.stringify(item));
     
      const data= this.state;
      data.open1=false;
      data.click=true;
      this.setState(data);
//đảy masp vào mảng localstirage
      let delete1 = JSON.parse(localStorage.getItem('delete')) ?? [];
      let item1={ MaSp:data.masp};
      delete1.push(item1);
    localStorage.setItem('delete', JSON.stringify(delete1));  
    
    }
    
    handleClickOpenDelete(param)
    {
     
      const data= this.state;
      data.masp=param;
      data.open1=true;
      
      this.setState(data);
     
      }
      callback=(data)=>
      {//khi hủy bill
        const newData=this.state;
        if(!data.Dathanhtoan)
        {
          newData.message4=data.message;//message khi hủy trả về
          newData.Dathanhtoan=data.Dathanhtoan;
          newData.open4=true;
          newData.severity="success";
          this.setState(newData);
          localStorage.clear();
        }
        else
        {
          newData.message4=data.message;//message khi hủy trả về
          newData.open4=false;
          newData.severity="error";
          this.setState(newData);
        }
        
      }
      handle()
      {
        debugger;
        const data= this.props.history.location.state?.data;
        const  Mahd =this.props.history.location.state?.Mahd;
        let donhang= JSON.parse(localStorage.getItem('donhang')) ?? [];
        let infobill=donhang.find(i =>i.maHoaDon==Mahd)
        let cartupdate=JSON.parse(localStorage.getItem('giohangdathanhtoan')) ?? [];
        let newData= JSON.parse(localStorage.getItem('delete')) ?? [];
          if(newData.length>0)
          { 
           let model1 = {
            MaHoaDon:Mahd,
               Dathanhtoan:false,
               Details1: newData.map(a => ({
                MaHoaDon:Mahd,
               MaSp:a.MaSp,
           }))};
           FetchApi('POST', '/Values/deleteBill', 
           { 'Content-Type': 'application/json' },JSON.stringify(model1
               ), this.callback);
          }
          if(cartupdate.length>0)
          {
           
            let model2 =
            {
              MaHoaDon:infobill.maHoaDon,
              NgayTao:infobill.ngayTao,
              MaKh:infobill.maKh,
              NgayGiao:this.state.NgayGiao,
              Dathanhtoan:infobill.dathanhtoan,
              Tinhtranggiaohang:infobill.tinhtranggiaohang,
              Details1:cartupdate.map(i =>({
                  MaHd:Mahd,
                  MaSp:i.MaSp,
                  SoLuong:i.SoLuong,
                  Dongia:i.GiaBan}))
            };
            
            FetchApi('POST', '/Values/uppdatechitiet', 
            { 'Content-Type': 'application/json' },JSON.stringify(model2), this.callback3);
          }

          this.props.history.push("/historyBill"); 
      }
      callback3 = (data) =>{
        const newData=this.state;
        debugger;
        if(data.mahd!=null)
        {
          newData.message4=data.message;//message khi hủy trả về
          newData.mahd=data.mahd;
          newData.open4=true;
          newData.severity="success";
          this.setState(newData);
          localStorage.clear();
        }
        else
        {
          newData.message4=data.message;//message khi hủy trả về
          newData.open4=false;
          newData.severity="error";
          this.setState(newData);
        }
      }
      handleUpdate()
      {
        const dataState=this.state;
        let newData= JSON.parse(localStorage.getItem('giohangdathanhtoan')) ?? [];    
      
        let item=newData.find(a => a.MaSp == dataState.masp);
        if(item)
        {
          item.SoLuong=dataState.soluong;
        }
       
        localStorage.setItem('giohangdathanhtoan', JSON.stringify(newData));
        dataState.click=true;
        dataState.open2=false;
      
      this.setState(dataState);
      
      }
      handleClickOpenUpdate(param)
      {
     
      const data= this.state;
      let newData= JSON.parse(localStorage.getItem('giohangdathanhtoan')) ?? [];    
      let item=newData.find(a => a.MaSp == param);
        if(item)
        {
          data.soluong=item.SoLuong;//gán lại số lượng dể kiểm tra trong textbox
          data.SoLuongTon=item.SoLuongTon;
          
        }
        localStorage.setItem('giohangdathanhtoan', JSON.stringify(newData));//lưu lại storege
      data.masp=param;
      data.open2=true;   
      this.setState(data);
      
      }
      handleDeleteAll()
      {
        
        /*localStorage.clear();
        const dataState=this.state;
        dataState.click=true;   
        dataState.open3=false;  
      this.setState(dataState);*/
      }

      handleClickOpenDeleteAll()
      {
        /*const dataState=this.state;
        dataState.open3=true;    
      this.setState(dataState);
        */
      }
    
      checkdata()
    { 
    const data = this.props.history.location.state?.data;//nhan data tu trang khac
    
    if(data === null || data === undefined)
    {
      this.props.history.push("/authenticate");//cach chuyen qua 1 trang khac 
    }
  }  
  handleClose1( event,reason)//đóng của alert
  {
    if (reason === 'clickaway') {
      return;
    }
    const data = this.state;
    data.open4=false;
    this.setState(data);
  };
  handleTextFieldChangeNgayGiao(param)
  {

   const data=this.state;
      //cách chuyển từ kiểu string sang date new Date()
      const  Mahd =this.props.history.location.state?.Mahd;
        let donhang= JSON.parse(localStorage.getItem('donhang')) ?? [];
        let infobill=donhang.find(i =>i.maHoaDon==Mahd)
        if((new Date(param)) >= infobill.ngayTao)//xet ngày truyền vào phải tước ngày tạo trong đã lưu
     {
      data.NgayGiao = param;
      data.isError = false;//tắt cảnh bảo error hiện lên 
      data.textError = "";
      this.setState(data); //gán lại 
     }
     else
     {
      data.isError = true;//bật cảnh báo
      data.textError = "ngày giao hang phải sau ngày đặt hàng"; 
      this.setState(data); 
    }
  }
 
      
  
  //ham này chỉ chạy khi trước render.hàm này trong react
      
  //trong nay khoong duoc de ham lien quang den state
    //newData.reduce((total,i) => total+i.sl*i.GiaBan,0) total 1 biến i là phân tử thứ i, reduce là giảm , 0 là giá trị ban đầu 
  render(){
    let that=this;//gán để alert và snackbar sử dụng
    this.checkdata();
    const data= this.props.history.location.state?.data;//lấy thông tin user trên history
return(
  <div>
            {this.state.click &&<ShowCart handleDelete={this.handleDelete} handleClickOpenDelete={this.handleClickOpenDelete} handleClose={this.handleClose} handleDeleteAll={this.handleDeleteAll}
            handleClickOpenUpdate = {this.handleClickOpenUpdate} cur={data} handleClickOpenUpdate={this.handleClickOpenUpdate} handleUpdate={this.handleUpdate} handleTextFieldChange={this.handleTextFieldChange}
            handleClickOpenDeleteAll={this.handleClickOpenDeleteAll} handleDeleteAll={this.handleDeleteAll} Dathanhtoan={this.state.Dathanhtoan} handleTextFieldChangeNgayGiao={this.handleTextFieldChangeNgayGiao}
            open1={this.state.open1} open2={this.state.open2} open3={this.state.open3} isError={this.state.isError} textError={this.state.textError} SoLuongTon={this.state.SoLuongTon} masp={this.state.masp}
            NgayGiao={this.state.NgayGiao} isError={this.state.isError}
            soluong={this.state.soluong} handle={this.handle} />} textError={this.state.textError}
        <Snackbar open={that.state.open4} autoHideDuration={3000}  onClose={this.handleClose1} >
         <Alert onClose={this.handleClose1} severity4={that.state.severity4}>
           {that.state.message4}
         </Alert>      
       </Snackbar>
        </div>

);
}     
    
}
function ShowCart(props){

  const classes = useStyles();
  let newData= JSON.parse(localStorage.getItem('giohangdathanhtoan')) ?? [];
  let donhang= JSON.parse(localStorage.getItem('donhang')) ?? [];
  const ngayTao= donhang.map(a=>a.ngayTao);
  const ngayGiao=donhang.map(a=>a.ngayGiao);
  let tax=0.1;
  const handleClickOpenDelete=(value) => props.handleClickOpenDelete(value);
const handleDelete =() => props.handleDelete();
 const handleClose = () => props.handleClose();
const handleClickOpenUpdate=(value) => props.handleClickOpenUpdate(value);
const handleTextFieldChange =(e) =>props.handleTextFieldChange(e.target.value);
const handleUpdate=()=>props.handleUpdate();
const handleClickOpenDeleteAll=()=>props.handleClickOpenDeleteAll();
const handleDeleteAll=()=>props.handleDeleteAll();
const handle=()=>props.handle();
const handleTextFieldChangeNgayGiao=(param)=>props.handleTextFieldChangeNgayGiao(param);

return (
  
  <div>

<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">   
      <TableHead>
        <TableRow>
          <StyledTableCell colSpan={2}>Thông tin Bill</StyledTableCell>
        </TableRow>
      </TableHead>
        <TableBody>
        
        <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Họ tên khách hàng
              </StyledTableCell>
              <StyledTableCell align="right">{props.cur.Hoten}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Địa chỉ
              </StyledTableCell>
              <StyledTableCell align="right">{props.cur.Diachi}</StyledTableCell></StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Điện thoại
              </StyledTableCell>
              <StyledTableCell align="right">{props.cur.SoDt}</StyledTableCell>
            </StyledTableRow>
            
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Ngày đặt
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(ngayTao).toLocaleDateString()}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Ngày giao
              </StyledTableCell>
              <StyledTableCell align="right">
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
  <KeyboardDatePicker
  helperText={props.textError}
  error={props.isError}    
    variant="inline"
    format="MM/dd/yyyy"
    margin="normal"
    id="date-picker-inline"
    value={(props.NgayGiao!=null)?new Date(props.NgayGiao).toLocaleDateString():new Date(ngayGiao).toLocaleDateString()}
    onChange={handleTextFieldChangeNgayGiao}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
   </MuiPickersUtilsProvider>
      </StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
    
    <Dialog
        open={props.open3}
        
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"cảnh báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            không
          </Button>
          <Button onClick={handleDeleteAll} color="primary">
            có
          </Button>
        </DialogActions>
      </Dialog>
    <Dialog
        open={props.open1}
        
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"cảnh báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có muốn xóa mặt hàng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            không
          </Button>
          <Button onClick={handleDelete} color="primary">
            có
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={props.open2} onClose={handleClose} aria-labelledby="form-dialog-title">      
        <DialogContent> 
        <DialogContentText>
           Số lượng còn lại trong kho {props.SoLuongTon}
          </DialogContentText>   
        <TextField onChange={handleTextFieldChange}    
            autoFocus
            margin="dense"
            id="name"
            defaultValue={props.soluong}
            type="number"
            label={props.masp}
            fullWidth
            error={props.isError}//bật câu cảnh báo
        helperText={props.textError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
          Accept
          </Button>
        </DialogActions>
      </Dialog>
{newData.length>0&&<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Mã sản phẩm</StyledTableCell>
          <StyledTableCell align="right">Tên sản phẩm</StyledTableCell>
          <StyledTableCell align="right">Ảnh </StyledTableCell>
          <StyledTableCell align="right">Mô tả</StyledTableCell>         
          <StyledTableCell align="right">Số lượng</StyledTableCell>
          <StyledTableCell align="right">Giá Bán</StyledTableCell>
          <StyledTableCell align="right">Thành tiền</StyledTableCell>
          <StyledTableCell align="right">Thao tác</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {newData.map((row) => (
          <StyledTableRow key={row.MaSp}>
            <StyledTableCell  scope="row">
              {row.MaSp}
            </StyledTableCell>
            <StyledTableCell align="right">{row.TenSP}</StyledTableCell>
            <StyledTableCell align="right" ><img  width="60"height="60"src={row.AnhBia} /></StyledTableCell>
            <StyledTableCell align="right">{row.Mota}</StyledTableCell>
            <StyledTableCell align="right">{row.SoLuong}</StyledTableCell>  
            <StyledTableCell align="right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(row.GiaBan) }</StyledTableCell>
            <StyledTableCell align="right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(row.SoLuong*row.GiaBan)}</StyledTableCell>
            <StyledTableCell align="right">
              
        <Tooltip title="Xóa">
<IconButton aria-label="delete" value={row.MaSp} onClick={handleClickOpenDelete.bind(this,row.MaSp)}  >
          < DeleteIcon />
        </IconButton>     
        </Tooltip>
        <Tooltip title="Cập Nhật Số Lượng">
<IconButton aria-label="update" value={row.MaSp} onClick={handleClickOpenUpdate.bind(this,row.MaSp)}  >
          < EditIcon />
        </IconButton>     
        
        </Tooltip>
        </StyledTableCell>
          </StyledTableRow>
        ))}
        <TableRow>
          <TableCell rowSpan={1} />
          <TableCell colSpan={1}>
          <Tooltip title="Xóa Giỏ Hàng">
<IconButton aria-label="removeall" onClick={handleClickOpenDeleteAll}>
          <  RemoveShoppingCartIcon />
        </IconButton>     
        </Tooltip>
          </TableCell>
         
        </TableRow>
        <TableRow>
          
            <TableCell rowSpan={1} />
            
            <TableCell colSpan={1}>Tổng Tiền</TableCell>
            <TableCell align="right" colSpan={5}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(newData.reduce((total,i) => total+i.SoLuong*i.GiaBan,0))}
           
        <Button variant="contained" color="primary"  onClick={handle}>
          Thanh toán
        </Button>
            </TableCell>
          </TableRow>
         
      </TableBody>

    </Table>
  </TableContainer>}


  </div>
  
);
}