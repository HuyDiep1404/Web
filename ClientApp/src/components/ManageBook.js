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
import DateFnsUtils from '@date-io/date-fns';
import Alert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
export class ManageBook extends React.Component {
  
    static displayName = ManageBook.name;
    constructor(props) {
      super(props);
      this.state=
      {
        book:[],
        ChuDe :[],
          XuatBan:[],
        soluong:1,
        SoLuongTon:0,
        MaSp:null,
       click:true,
       open:false,
       open1:false,
       open2:false,
       open3:false,
       open4:false,
       open5:false,
       isError:false,
       soluong:1,
          textError:"",
          severity:"",
          click1:false,
          isError6:false,
          textError6:"",
          isError3:false,
          textError3:"",
          alert:false,
          severity:"",
          Update:{
        MaSp:null,
        TenSp:null,
        GiaBan:null,
        Mota:null,   
        NgayCapNhat:null,
        AnhBia:null,
        SoLuongTon:null,
        MaChuDe:null,
        MaNxb:null
          }
          
      }
      this.handleDelete=this.handleDelete.bind(this);
      this.handleClose=this.handleClose.bind(this);
      this.handleClickOpenDelete=this.handleClickOpenDelete.bind(this);
 this.handleClickOpenUpdate=this.handleClickOpenUpdate.bind(this);
   this.handleUpdate=this.handleUpdate.bind(this);
   this.handleOpen1=this.handleOpen1.bind();
   this.handleTextFieldChange7=this.handleTextFieldChange7.bind(this);
   this.handleTextFieldChange6=this.handleTextFieldChange6.bind(this);
   this.handleTextFieldChange5=this.handleTextFieldChange5.bind(this);
   this.handleTextFieldChange2=this.handleTextFieldChange2.bind(this);
   this.handleTextFieldChange3=this.handleTextFieldChange3.bind(this);
   this.handleTextFieldChange4=this.handleTextFieldChange4.bind(this);
   this.handleClose1=this.handleClose1.bind(this);
   this.handleClose2=this.handleClose2.bind(this);
   this.handleMenulist1=this.handleMenulist1.bind(this);
   this.handleMenulist2=this.handleMenulist2.bind(this);
   this.handleOpen2=this.handleOpen2.bind(this);
   this.handleCancel=this.handleCancel.bind(this);
    }
    handleMenulist1()
    {

    }
    handleMenulist2()
    {

    }
    handleCancel()
    {
      const data= this.state;
      data.open1=false;
      data.open2=false;
      this.setState(data);
    }
    handleClose1()
    {
      const data= this.state;
      data.open1=false;
      data.open2=false;
      this.setState(data);
    }
    handleClose2()
    {
      const data= this.state;
      data.open5=false;
      this.setState(data);
    }
    handleClose( event,reason)//đóng của alert
    {
      if (reason === 'clickaway') {
        return;
      }
      const data = this.state;
      data.open=false;
      this.setState(data);
    };
    
    handleDelete()
    {
      debugger;
      const data=this.state;
      data.open3=false;
      data.click=true;
      this.setState(data);
      let model = {
        MaSp:this.state.MaSp,
        TenSp:null,
        GiaBan:null,
        Mota:null,   
        NgayCapNhat:null,
        AnhBia:null,
        SoLuongTon:null,
        MaChuDe:null,
        MaNxb:null
    };   
      FetchApi('POST', '/Values/deleteBook',
      { 'Content-Type': 'application/json' }
      ,JSON.stringify(model), this.callback1);
         
    }
    callback1=(data)=>
    {
      const newData=this.state;
      if(data.alert)
        {
          newData.open=true;
          newData.severity="success";
          newData.message=data.message;
          newData.click1=false;
      this.setState(newData);
        }
        else
        {         
          newData.open=true;
          newData.severity="";
          newData.message=data.message;
          newData.click1=false;
      this.setState(newData);
        }
     
    }
    
    handleClickOpenDelete(param)
    {
      debugger;
     
      const data= this.state;
      data.MaSp=param;
      data.open3=true;
      
      this.setState(data);
     
      }
    
      handleUpdate()
      {
        const data=this.state;
        let model = {
          MaSp:data.masp,
          TenSp:data.Update.TenSp,
          GiaBan:data.Update.GiaBan,
          Mota:data.Update.Mota,   
          NgayCapNhat:data.Update.Mota,
          AnhBia:data.Update.Mota,
          SoLuongTon:data.Update.Mota,
          MaChuDe:data.Update.Mota,
          MaNxb:data.Update.Mota
      };   
      FetchApi('POST', '/Values/updateBill', 
      { 'Content-Type': 'application/json' },JSON.stringify(model
          ), this.callback4);
       /* const dataState=this.state;
        let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];    
        let item=newData.find(a => a.MaSp == dataState.masp);
        if(item)
        {
          item.sl=dataState.soluong;
        }
       
        localStorage.setItem('giohang', JSON.stringify(newData));
        dataState.click=true;
        dataState.open2=false;
      
      this.setState(dataState);*/
      }
      callback4=(data)=>{
        const newData=this.state;
        if(data.alert)
        {
          newData.open=true;
          newData.severity="success";
          newData.message=data.message;
          this.setState(newData);
        }
        else
        {
          newData.open=true;
          newData.severity="error";
          newData.message="";
          this.setState(newData);
        }
      }
      handleClickOpenUpdate(param)
      {
      const data= this.state;
      data.masp=param;
      data.open4=true;   
      this.setState(data);
      let sach=data.book.find(a=> a.maSp == param);
      let newData= JSON.parse(localStorage.getItem('Sach')) ?? [];
      let item=sach;
      newData.push(item);
      localStorage.setItem('Sach', JSON.stringify(newData));  
      
      }
      handleOpen1()
      {
        const data=this.state;
        data.open1=true;
        this.setState(data);
      }
      handleOpen2()
      {
        const data=this.state;
        data.open2=true;
        this.setState(data);
      }
      handleTextFieldChange2(e)
      {
        const data=this.state;
        data.Update.TenSp=e;
        this.setState(data);
      }
      handleTextFieldChange3(e)
      {
        
        const data=this.state;
        if(e>0)
        {
          data.Update.GiaBan=e;
          data.isError3=false;
          data.textError3="";
        this.setState(data);
        }
        else
        {
          data.Update.GiaBan=null;
          data.isError3=true;
          data.textError3="giá bán phải lớn hơn 0";
          this.setState(data);
        }
        
        
      }
      handleTextFieldChange4(e)
      {
        const data=this.state;
        data.Update.Mota=e;
        this.setState(data);
      }
      handleTextFieldChange5(e)
      {
        const data=this.state;
        let newData= JSON.parse(localStorage.getItem('Sach')) ?? [];
        let sach=newData.book.find(x=>x.MaSp == this.state.masp);
        sach.ngayCapNhat=e;
        localStorage.setItem('Sach', JSON.stringify(newData)); 
        data.Update.NgayCapNhat=e;
        this.setState(data);
      }
      handleTextFieldChange6(e)
      {
        const data=this.state;
        data.Update.AnhBia=e;
        this.setState(data);
      }
      handleTextFieldChange7(e)
      {}
      
 
      checkdata()
    { /*
    const data = this.props.history.location.state?.data;//nhan data tu trang khac
    
    if(data === null || data === undefined)
    {
      this.props.history.push("/authenticate");//cach chuyen qua 1 trang khac 
    }*/
  } 
  callback = (data)=>
  {
      const newData=this.state;
      newData.book=data;
      newData.click1=false;
      this.setState(newData);
  }
  callapi()
  {
    if(this.state.book.length == 0||this.state.click1)
      {
        FetchApi('GET', '/Values/getCDVaNXB', 
        { 'Content-Type': 'application/json' },null, this.callback);
      }
    
  }
  callback3=(data)=>{ 
    this.onStep();
         const newData = this.state;// {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
      newData.ChuDe=data;
     
      //vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
      this.setState(newData);
      //cập nhật lại dư liệu của cái trạng thái      
    
    }
    callback2=(data)=>{ 
  
         const newData = this.state;// {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
      newData.XuatBan=data;
      //vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
      this.setState(newData);//cập nhật lại dư liệu của cái trạng thái      
    
    }
  callChuDe()
  {
    if(this.state.ChuDe.length === 0)
    {
      FetchApi('GET', '/Values/getChuDe', 
{ 'Content-Type': 'application/json' },null, this.callback3);
} 
}
  callXuatBan()
  {
    if(this.state.XuatBan.length === 0)
    {
  FetchApi('GET', '/Values/getMaNXB', 
{ 'Content-Type': 'application/json' },null, this.callback2);
  }
}

   //ham này chỉ chạy khi trước render.hàm này trong react
      
  //trong nay khoong duoc de ham lien quang den state
    //newData.reduce((total,i) => total+i.sl*i.GiaBan,0) total 1 biến i là phân tử thứ i, reduce là giảm , 0 là giá trị ban đầu 
  render(){
    this.checkdata();
    this.callapi();
    const that=this;


return(
  <div>
            {this.state.click &&<Show handleCancel={this.handleCancel} XuatBan={this.state.XuatBan} ChuDe={this.state.ChuDe} book={this.state.book} handleDelete={this.handleDelete} handleClickOpenDelete={this.handleClickOpenDelete} handleClose={this.handleClose} handleDeleteAll={this.handleDeleteAll}
            handleClickOpenUpdate = {this.handleClickOpenUpdate} handleClickOpenUpdate={this.handleClickOpenUpdate} handleUpdate={this.handleUpdate} click1={this.state.click1} isError3={this.state.isError3} textError3={this.state.textError3}
            open1={this.state.open1} open2={this.state.open2} open3={this.state.open3} open4={this.state.open4} isError={this.state.isError} textError={this.state.textError}  masp={this.state.masp} handleTextFieldChange2={this.handleTextFieldChange2} handleTextFieldChange7={this.handleTextFieldChange7}
            handleTextFieldChange3={this.handleTextFieldChange3}  handleTextFieldChange4={this.handleTextFieldChange4}  handleTextFieldChange5={this.handleTextFieldChange5} handleUpdate={this.handleUpdate} handleOpen1={this.handleOpen1}
            soluong={this.state.soluong} handleMenulist1={this.handleMenulist1} handleMenulist2={this.handleMenulist2} handleClose2={this.handleClose2} handleOpen2={this.handleOpen2} />}
            <Snackbar open={that.state.open} autoHideDuration={3000}  onClose={this.handleClose} >
         <Alert onClose={this.handleClose} severity={that.state.severity}>
           {that.state.message}
         </Alert>      
       </Snackbar>
        </div>

);
}    
    
}
function Show(props){
  const classes = useStyles();
  let newData= JSON.parse(localStorage.getItem('Sach')) ?? [];
  let tax=0.1;
  const handleClickOpenDelete=(value) => props.handleClickOpenDelete(value);
const handleDelete =() => props.handleDelete();
const handleClose1 =()=>props.handleClose1();
const handleClose2=()=>props.handleClose2();
 const handleClose = () => props.handleClose();
const handleClickOpenUpdate=(value) => props.handleClickOpenUpdate(value);
const handleTextFieldChange7=(e)=>props.handleTextFieldChange7(e.target.value);
const handleTextFieldChange6 =(e) =>props.handleTextFieldChange(e.target.value);
const handleTextFieldChange5=(e)=>props.handleTextFieldChange5(e.target.value);
const handleTextFieldChange4=(e)=>props.handleTextFieldChange4(e.target.value);
const handleTextFieldChange2=(e)=>props.handleTextFieldChange2(e.target.value);
const handleTextFieldChange3=(e)=>props.handleTextFieldChange3(e.target.value);
const handleUpdate=()=>props.handleUpdate();
const handleOpen1=()=>props.handleOpen1();
const handleOpen2=()=>props.handleOpen2();
const handleCancel=()=>props.handleCancel();
const handleMenulist2 = (e) =>props.handleMenulist2(e.target.value);
const handleMenulist1 = (e) =>props.handleMenulist1(e.target.value);
return (
  
  <div>
   <Dialog
        open={props.open3} 
        keepMounted
        onClose={handleClose1}
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
          <Button onClick={handleCancel} color="primary">
            không
          </Button>
          <Button onClick={handleDelete} color="primary">
            có
          </Button>
        </DialogActions>
      </Dialog>
      
    <Dialog
        open={props.open4}
        keepMounted
        onClose={handleClose1}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"cảnh báo"}</DialogTitle>
        <DialogContent>
         
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">   
        <TableBody>
        
        <StyledTableRow >
              <StyledTableCell component="th" scope="row">
               Tên Sản Phẩm
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField onChange={handleTextFieldChange2}    
            autoFocus
            margin="dense"
            value={newData.TenSp}
            id="name"
            fullWidth
          /></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Giá Bán
              </StyledTableCell>
              <StyledTableCell align="right">
              <TextField onChange={handleTextFieldChange3}type="number"     
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            error={props.isError3}//bật câu cảnh báo
        helperText={props.textError3}
          />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Mô tả
              </StyledTableCell>
              <StyledTableCell align="right">
              <TextField onChange={handleTextFieldChange4}    
            autoFocus
            margin="dense"
            id="name"       
            fullWidth
          />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Ngày Cập Nhật
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
    value={newData.ngayCapNhat}
    onChange={handleTextFieldChange5}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
   </MuiPickersUtilsProvider>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Ảnh Bìa
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField onChange={handleTextFieldChange6} type="file"    
            autoFocus
            margin="dense"
            fullWidth
            error={props.isError6}//bật câu cảnh báo
        helperText={props.textError6}
          /></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Số Lượng Tồn
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField onChange={handleTextFieldChange7}    
            autoFocus
            margin="dense"
            id="name"
            
            fullWidth
            error={props.isError}//bật câu cảnh báo
        helperText={props.textError}
          /></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              Mã Chủ Đề
              </StyledTableCell>
              <StyledTableCell align="right">
                <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Chọn tình trạng</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={props.open1}
          onClose={handleClose1}
          onOpen={handleOpen1}
          value={props.value}
          onChange={handleMenulist1}
        >
         
        <MenuItem value={0}>
            <em>Chọn tình trạng</em>
          </MenuItem>
          {props.ChuDe.map((row) => (         
           <MenuItem  value={row.maChuDe} >{row.tenChuDe}</MenuItem>   
          ))}                                                
           </Select>
      </FormControl>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              MaNxb
              </StyledTableCell>
              <StyledTableCell align="right">
              <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Chọn tình trạng</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={props.open2}
          onClose={handleClose2}
          onOpen={handleOpen2}
          value={props.value}
          onChange={handleMenulist2}
        >
         
        <MenuItem value={0}>
            <em>Chọn tình trạng</em>
          </MenuItem>
          {props.XuatBan.map((row) => (         
           <MenuItem  value={row.maNxb} >{row.tenXb}</MenuItem>   
          ))}                                                
           </Select>
      </FormControl>
              </StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            không
          </Button>
          <Button onClick={handleUpdate} color="primary">
            có
          </Button>
        </DialogActions>
      </Dialog>
     
<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Mã sản phẩm</StyledTableCell>
          <StyledTableCell align="right">Tên sản phẩm</StyledTableCell>
          <StyledTableCell align="right">Giá Bán</StyledTableCell>
          <StyledTableCell align="right">Mô tả</StyledTableCell>
          <StyledTableCell align="right">Ngày Cập Nhật</StyledTableCell>     
          <StyledTableCell align="right">Ảnh</StyledTableCell>           
          <StyledTableCell align="right">Số Lượng Tồn</StyledTableCell>
          <StyledTableCell align="right">Tên Chủ Đề</StyledTableCell>
          <StyledTableCell align="right">Tên Nhà Xuất Bản</StyledTableCell>
          <StyledTableCell align="right">Thao Tác</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.book.map((row) => (
          <StyledTableRow key={row.maSp}>
            <StyledTableCell  scope="row">
              {row.maSp}
            </StyledTableCell>
            <StyledTableCell align="right">{row.tenSp}</StyledTableCell>
            <StyledTableCell align="right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(row.giaBan) }</StyledTableCell>
            <StyledTableCell align="right">{row.mota}
        </StyledTableCell>
            <StyledTableCell align="right">{new Date(row.ngayCapNhat).toLocaleDateString()}</StyledTableCell>
            <StyledTableCell align="right" ><img  width="60"height="60"src={row.anhBia} /></StyledTableCell>
            <StyledTableCell align="right">{row.soLuongTon}</StyledTableCell>
            <StyledTableCell align="right">{row.maChuDe}</StyledTableCell>
            <StyledTableCell align="right">{row.maNxb}</StyledTableCell>
            <StyledTableCell align="right">
              
        <Tooltip title="Xóa">
<IconButton aria-label="delete" value={row.maSp} onClick={handleClickOpenDelete.bind(this,row.maSp)}  >
          < DeleteIcon />
        </IconButton>     
        </Tooltip>
        <Tooltip title="Cập Nhật Số Lượng">
<IconButton aria-label="update" value={row.maSp} onClick={handleClickOpenUpdate.bind(this,row.maSp)}  >
          < EditIcon />
        </IconButton>     
        </Tooltip>
        </StyledTableCell>
          </StyledTableRow>
        ))}
        
      </TableBody>

    </Table>
  </TableContainer>
  </div>
  
);
}