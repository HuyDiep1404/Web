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
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
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
const styles = theme => ({
  field: {
    margin: '10px 0',
  },
  countryList: {
    ...theme.typography.body1,
  },
});
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },table: {
    minWidth: 700,
  }
  
}));
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
       open6:false,
       open7:false,
       open8:false,
       isError:false,
       soluong:1,
          textError:"",
          severity:"",
          click1:false,
          isError6:false,
          textError6:"",
          isError3:false,
          textError3:"",
          isError4:false,
          textError4:"",
          alert:false,
          severity:"",
          Update:{
        MaSp:null,
        TenSp:"",
        GiaBan:1,
        Mota:"",   
        NgayCapNhat:new Date(),
        AnhBia:"",
        SoLuongTon:1,
        MaChuDe:0,
        MaNxb:0
          },
          Insert:{
            MaSp:null,
            TenSp:"",
            GiaBan:1,
            Mota:"",   
            NgayCapNhat:new Date(),
            AnhBia:"",
            SoLuongTon:1,
            MaChuDe:0,
            MaNxb:0
              },
        ChuDeInsert:
        {
          MaChuDe:null,
          TenChuDe:""
        },
        NhaXBInsert:
        {
          MaNxb:null,
          TenXb:"",
          DiaChi:"",
          DienThoai:""
        }
         //thao tác là Update:là gồm insert và update
          
      }
      this.handleDelete=this.handleDelete.bind(this);
      this.handleClose=this.handleClose.bind(this);
      this.handleClickOpenDelete=this.handleClickOpenDelete.bind(this);
 this.handleClickOpenUpdate=this.handleClickOpenUpdate.bind(this);
   this.handleUpdate=this.handleUpdate.bind(this);
   this.handleOpen1=this.handleOpen1.bind(this);
   this.handleTextFieldChange11=this.handleTextFieldChange11.bind(this);
   this.handleTextFieldChange10=this.handleTextFieldChange10.bind(this);
   this.handleTextFieldChange9=this.handleTextFieldChange9.bind(this);
   this.handleTextFieldChange8=this.handleTextFieldChange8.bind(this);
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
   this.Insertopen=this.Insertopen.bind(this);
   this.handleInsert=this.handleInsert.bind(this);
   this.InsertNhaXBOpen=this.InsertNhaXBOpen.bind(this);
   this.InsertChuDeOpen=this.InsertChuDeOpen.bind(this);
   this.InsertNhaXB=this.InsertNhaXB.bind(this);
   this.InsertChuDe=this.InsertChuDe.bind(this);
    }
    handleMenulist1(value)
    {
      
     if(this.state.masp!=null)
     {
      const data=this.state;     
      data.Update.MaChuDe=value;
      this.setState(data);
     }
     else{
      const data=this.state;
      data.Insert.MaChuDe=value;
      this.setState(data);
     }
     
     
     
    }
    handleMenulist2(value)
    {
      
     if(this.state.masp!=null)
     {
      const data=this.state;     
      data.Update.MaNxb=value;
      this.setState(data);
     }
     else{
      const data=this.state;
      data.Insert.MaNxb=value;
      this.setState(data);
     }
     
    }
    handleCancel()
    {
      const data= this.state;
      data.open3=false;
      data.open4=false;
      data.open6=false;
      data.open7=false;
      data.open8=false;
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
          newData.masp=null;
      this.setState(newData);
        }
        else
        {   
          newData.masp=null;      
          newData.open=true;
          newData.severity="";
          newData.message=data.message;
          newData.click1=false;
      this.setState(newData);
        }
     
    }
    Insertopen()
    {
      const data= this.state;
    
      data.open6=true;
      this.setState(data);
    }
    handleClickOpenDelete(param)
    {
      
     
      const data= this.state;
      data.MaSp=param;
      data.open3=true;
      
      this.setState(data);
     
      }
    
      handleUpdate()
      {
       
       const sach=this.state;
        
        let model = {
          MaSp:sach.Update.MaSp,
          TenSp:sach.Update.TenSp,
          GiaBan:sach.Update.GiaBan,
          Mota:sach.Update.Mota,   
          NgayCapNhat:sach.Update.NgayCapNhat,
          AnhBia:sach.Update.AnhBia,
          SoLuongTon:sach.Update.SoLuongTon,
          MaChuDe:sach.Update.MaChuDe,
          MaNxb:sach.Update.MaNxb
      };   
      FetchApi('POST', '/Values/updateBook', 
      { 'Content-Type': 'application/json' },JSON.stringify(model
          ), this.callback4);
      
      }
      callback4=(data)=>{
        const newData=this.state;
      
        newData.click1=true;
        if(data.alert)
        {
          
         
          newData.masp=null;
          newData.open=true;
          newData.severity="success";
          newData.message=data.message;
          this.setState(newData);
        }
        else
        {
          newData.masp=null;
          newData.open=true;
          newData.severity="error";
          newData.message=data.message;
          this.setState(newData);
        }
      }
      handleClickOpenUpdate(param)
      {
        
      const newData= this.state;
      newData.masp=param;
      newData.open4=true;   
      
      
      let sach=newData.book.find(a=> a.maSp == param);
      newData.Update.MaSp=sach.maSp;
      newData.Update.TenSp=sach.tenSp;
      newData.Update.GiaBan=sach.giaBan;
      newData.Update.Mota=sach.mota;  
      newData.Update.NgayCapNhat=sach.ngayCapNhat;
      newData.Update.AnhBia=sach.anhBia;
      newData.Update.SoLuongTon=sach.soLuongTon;
      newData.Update.MaChuDe=sach.maChuDe;
      newData.Update.MaNxb=sach.maNxb;
       
      this.setState(newData);
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
      InsertChuDeOpen()
      {
        const data=this.state;
        data.open8=true;
        this.setState(data);
      }
      InsertNhaXBOpen()
      {
        const data=this.state;
        data.open7=true;
        this.setState(data);
      }
      InsertChuDe()
      {
        const data=this.state;
        FetchApi('POST', '/Values/insertChuDe', 
        { 'Content-Type': 'application/json' },JSON.stringify(
          {
            MaChuDe:data.ChuDeInsert.MaChuDe,
            TenChuDe:data.ChuDeInsert.TenChuDe,
          }
        ), this.callback8);
      }
      callback8=(data)=>
      {
        const newData=this.state;
        newData.open8=false;
        newData.click1=true;
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
          newData.message=data.message;
          this.setState(newData);
        }
      }
      InsertNhaXB()
      {
        const data=this.state;
        let model2={
                    MaNxb:data.NhaXBInsert.MaNxb,
                    TenXb:data.NhaXBInsert.TenXb,
                    DiaChi:data.NhaXBInsert.DiaChi,
                    DienThoai:data.NhaXBInsert.DienThoai
          }
        console.log(model2);
        FetchApi('POST', '/Values/insertNhaXB', 
        { 'Content-Type': 'application/json' },JSON.stringify(model2
            ), this.callback7);
      }
      callback7=(data)=>
      {
        const newData=this.state;
        newData.open7=false;
        newData.click1=true;
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
          newData.message=data.message;
          this.setState(newData);
        }
      }
      handleTextFieldChange2(e)
      {
        if(this.state.masp!=null)
     {
      const data =this.state;
      data.Update.TenSp=e;
      this.setState(data);
     }else
     {
      const data =this.state;
      data.Insert.TenSp=e;
      this.setState(data);
     }
        
      }
      handleTextFieldChange3(e)
      {
        const data=this.state;
        if(e>0)
        {
        if(this.state.masp!=null)
     {  
      data.Update.GiaBan=e;
      data.isError3=false;
      data.textError3="";
      this.setState(data);
      }
      else
      {
        data.Insert.GiaBan=e;
        data.isError3=false;
        data.textError3="";
        this.setState(data);
      }
     
    }
        
        else
        {
          data.isError3=true;
          data.textError3="giá bán phải lớn hơn 0";
          this.setState(data);
        }
        
        
      }
      handleTextFieldChange4(e)
      {
        if(this.state.masp!=null)
        {
          const data =this.state;
          data.Update.Mota=e;
          this.setState(data);; 
      }else
      {
        const data =this.state;
        data.Insert.Mota=e;
        this.setState(data);
      }
        
        
      }
      handleTextFieldChange5(e)
      {  
        if(this.state.masp!=null)
        {   
          const data =this.state;
          data.Update.NgayCapNhat=e;
          this.setState(data); 
        }else
        {
          const data =this.state;
          data.Insert.NgayCapNhat=e;
          this.setState(data);
        }
        
        
      }
      handleTextFieldChange6(e)
      {
        if(this.state.masp!=null)
        {
          const data =this.state;
          data.Update.AnhBia=e;
          this.setState(data);
        }
        else
        {
          const data =this.state;
        data.Insert.AnhBia=e;
        this.setState(data);
        }
        
      }
      handleTextFieldChange8(e)
      {
        
          const data =this.state;
        data.ChuDeInsert.TenChuDe=e;
        this.setState(data);
        
        
      }
      handleTextFieldChange10(e)
      {
        
          const data =this.state;
          data.NhaXBInsert.DiaChi=e;
        this.setState(data);
      }
      handleTextFieldChange9(e)
      {
        
          const data =this.state;
        data.NhaXBInsert.TenXb=e;
        this.setState(data);
      }
      handleTextFieldChange11(e)
      {
        
          const data =this.state;
        data.NhaXBInsert.DienThoai=e;
        this.setState(data);
        
        
      }
      handleTextFieldChange7(e)
      {
        const data=this.state;
        if(e>0)
        {
          if(this.state.masp!=null)
        {
          data.Update.SoLuongTon=e;
          data.isError4=false;
          data.textError4="";
        this.setState(data);
        }else
       {
        data.Insert.SoLuongTon=e;
        data.isError4=false;
        data.textError4="";
      this.setState(data);
       }
          
        }
        else
        {
          
          data.isError4=true;
          data.textError4="giá bán phải lớn hơn 0";
          this.setState(data);
        }
        
      }
      
 
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
    
         const newData = this.state;// {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
      newData.ChuDe=data;
     
      //vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
      this.setState(newData);
      //cập nhật lại dư liệu của cái trạng thái      
    
    }
    handleInsert()
    {
      const data=this.state;
     let model={     
          MaSp:data.Insert.MaSp,
          TenSp:data.Insert.TenSp,
          GiaBan:data.Insert.GiaBan,
          Mota:data.Insert.Mota,   
          NgayCapNhat:data.Insert.NgayCapNhat,
          AnhBia:data.Insert.AnhBia,
          SoLuongTon:data.Insert.SoLuongTon,
          MaChuDe:data.Insert.MaChuDe,
          MaNxb:data.Insert.MaNxb
      }
      FetchApi('POST', '/Values/insertBook', 
      { 'Content-Type': 'application/json' },JSON.stringify(model), this.callback5);
    }
    callback5=(data)=>{
      debugger;
      const newData=this.state;
      newData.open6=false;
      newData.click1=true;
      
      if(data.alert!=false)
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
        newData.message=data.message;
        this.setState(newData);
      }
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
componentDidMount()
    {
      this.callChuDe();
    this.callXuatBan();
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
            open1={this.state.open1} open6={this.state.open6}open7={this.state.open7} open8={this.state.open8} open2={this.state.open2} open3={this.state.open3} open4={this.state.open4} isError={this.state.isError} textError={this.state.textError}  masp={this.state.masp} handleTextFieldChange2={this.handleTextFieldChange2} handleTextFieldChange7={this.handleTextFieldChange7}
            handleTextFieldChange3={this.handleTextFieldChange3}  handleTextFieldChange4={this.handleTextFieldChange4}  handleTextFieldChange5={this.handleTextFieldChange5} handleUpdate={this.handleUpdate} handleOpen1={this.handleOpen1} value1={this.state.value1} Insertopen={this.Insertopen}
            soluong={this.state.soluong} masp={this.state.masp} handleMenulist1={this.handleMenulist1} handleMenulist2={this.handleMenulist2} handleClose2={this.handleClose2} handleOpen2={this.handleOpen2} value2={this.state.value2} ChuDe={this.state.ChuDe} XuatBan={this.state.XuatBan}GiaBan={this.state.Update.GiaBan}
            handleClose1={this.handleClose1} handleInsert={this.handleInsert}  handleTextFieldChange6={this.handleTextFieldChange6} NgayCapNhat={this.state.Update.NgayCapNhat}TenSp={this.state.Update.TenSp}Mota={this.state.Update.Mota} MaNxb={this.state.Update.MaNxb}SoLuongTon={this.state.Update.SoLuongTon}MaChuDe={this.state.Update.MaChuDe}
            MaSpI={this.state.Insert.MaSp} NgayCapNhatI={this.state.Insert.NgayCapNhat}TenSpI={this.state.Insert.TenSp}MotaI={this.state.Insert.Mota} MaNxbI={this.state.Insert.MaNxb}SoLuongTonI={this.state.Insert.SoLuongTon}MaChuDeI={this.state.Insert.MaChuDe}GiaBanI={this.state.Insert.GiaBan} InsertNhaXB={this.InsertNhaXB} InsertChuDe={this.InsertNhaXB}
             TenXbIN={this.state.NhaXBInsert.TenXb} DiaChiIN={this.state.NhaXBInsert.DiaChi} DienThoaiIN={this.state.NhaXBInsert.DienThoai} TenChuDeIN={this.state.ChuDeInsert.TenChuDe} InsertNhaXBOpen={this.InsertNhaXBOpen} InsertChuDeOpen={this.InsertChuDeOpen}
            handleTextFieldChange8={this.handleTextFieldChange8}handleTextFieldChange9={this.handleTextFieldChange9} handleTextFieldChange10={this.handleTextFieldChange10} handleTextFieldChange11={this.handleTextFieldChange11}  />}
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
  
  let tax=0.1;
  const handleClickOpenDelete=(value) => props.handleClickOpenDelete(value);
const handleDelete =() => props.handleDelete();
const handleClose1 =()=>props.handleClose1();
const handleClose2=()=>props.handleClose2();

const handleClickOpenUpdate=(value) => props.handleClickOpenUpdate(value);
const handleTextFieldChange7=(e)=>props.handleTextFieldChange7(e.target.value);
const  handleTextFieldChange6 =(e) =>props.handleTextFieldChange6(e.target.value);
const handleTextFieldChange5=(e)=>props.handleTextFieldChange5(e);
const handleTextFieldChange4=(e)=>props.handleTextFieldChange4(e.target.value);
const handleTextFieldChange2=(e)=>props.handleTextFieldChange2(e.target.value);
const handleTextFieldChange3=(e)=>props.handleTextFieldChange3(e.target.value);
const handleTextFieldChange8=(e)=>props.handleTextFieldChange8(e.target.value);
const handleTextFieldChange9=(e)=>props.handleTextFieldChange9(e.target.value);
const handleTextFieldChange10=(e)=>props.handleTextFieldChange10(e.target.value);
const handleTextFieldChange11=(e)=>props.handleTextFieldChange11(e);

const handleUpdate=()=>props.handleUpdate();
const handleOpen1=()=>props.handleOpen1();
const handleOpen2=()=>props.handleOpen2();
const handleCancel=()=>props.handleCancel();
const handleMenulist2 = (e) =>props.handleMenulist2(e.target.value);
const handleMenulist1 = (e) =>props.handleMenulist1(e.target.value);
const Insertopen =()=>props.Insertopen();
const handleInsert=()=>props.handleInsert();

const InsertNhaXBOpen=()=>props.InsertNhaXBOpen();
const InsertChuDeOpen=()=>props.InsertChuDeOpen();
const InsertNhaXB=()=>props.InsertNhaXB();
const InsertChuDe=()=>props.InsertChuDe();
return (
  
  <div>
<Button variant="contained" color="primary"  onClick={InsertChuDeOpen}>
          Insert Chu De
        </Button>
        <Button variant="contained" color="primary"  onClick={InsertNhaXBOpen}>
          Insert Nha XB
        </Button>
<Button variant="contained" color="primary"  onClick={Insertopen}>
          Insert 
        </Button>
        {props.open8&&<Dialog
        open={props.open8}
        keepMounted
        width={400} 
        onClose={handleCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Insert Chu De"}</DialogTitle>
        <DialogContent>
         
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">   
        <TableBody>
        
        <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              Tên Chủ Dề
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField onChange={handleTextFieldChange8}    
            autoFocus
            margin="dense"
            value={props.TenChuDeIN}
            id="name"
            fullWidth
          /></StyledTableCell>
            </StyledTableRow>       
          </TableBody>
      </Table>
    </TableContainer>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            không
          </Button>
          <Button onClick={InsertChuDe} color="primary">
            có
          </Button>
        </DialogActions>
      </Dialog>
      }
      {props.open7&&<Dialog
        open={props.open7}
        keepMounted
        width={400} 
        onClose={handleCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Insert Nha Xuat Ban"}</DialogTitle>
        <DialogContent>
         
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">   
        <TableBody>
        
        <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              Tên Xuat Ban
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField onChange={handleTextFieldChange9}    
            autoFocus
            margin="dense"
            value={props.TenXbIN}
            id="name"
            fullWidth
          /></StyledTableCell>
            </StyledTableRow>    
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
             Địa chỉ
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField onChange={handleTextFieldChange10}    
            autoFocus
            margin="dense"
            value={props.DiaChiIN}
            id="name"
            fullWidth
          /></StyledTableCell>
            </StyledTableRow>  
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
             Số Điện Thoại
              </StyledTableCell>
              <StyledTableCell align="right">
              <PhoneInput
    international
    value={props.DienThoaiIN}
  //initialValueFormat="national"
    error={props.DienThoaiIN ? (isValidPhoneNumber(props.DienThoaiIN) ? undefined : 'Invalid phone number') : 'Phone number required'}
    onChange={handleTextFieldChange11}/></StyledTableCell>
            </StyledTableRow>  
               
          </TableBody>
      </Table>
    </TableContainer>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            không
          </Button>
          <Button onClick={InsertNhaXB} color="primary">
            có
          </Button>
        </DialogActions>
      </Dialog>}
        {props.open6&&<Dialog
        open={props.open6}
        keepMounted
        width={400} 
        onClose={handleCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Insert"}</DialogTitle>
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
            value={props.TenSpI}
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
            value={props.GiaBanI}
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
            value={props.MotaI}
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
    value={props.NgayCapNhatI}
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
            
          /></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Số Lượng Tồn
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField onChange={handleTextFieldChange7} type="number"   
            autoFocus
            margin="dense"
            id="name"                                                                           
            fullWidth
            value={props.SoLuongTonI}
            error={props.isError}//bật câu cảnh báo
        helperText={props.textError}
          /></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              Chủ Đề
              </StyledTableCell>
              <StyledTableCell align="right">
                <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={props.open1}
          onClose={handleClose1}
          onOpen={handleOpen1}
          value={props.MaChuDeI}
          onChange={handleMenulist1}
        > 
       <MenuItem value={0}>
            <em>Chọn</em>
          </MenuItem>
          {props.ChuDe.map((row) => (         
           <MenuItem key={row.maChuDe} value={row.maChuDe} >{row.tenChuDe}</MenuItem>   
          ))}                                                
           </Select>
      </FormControl>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              Nhà Xuất Bản
              </StyledTableCell>
              <StyledTableCell align="right">
              <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={props.open2}
          onClose={handleClose1}
          onOpen={handleOpen2}
          value={props.MaNxbI}
          onChange={handleMenulist2}
        >
          <MenuItem value={0}>
            <em>Chọn</em>
          </MenuItem>
          {props.XuatBan.map((row) => (         
           <MenuItem  key={row.maNxb} value={row.maNxb} >{row.tenXb}</MenuItem>   
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
          <Button onClick={handleInsert} color="primary">
            có
          </Button>
        </DialogActions>
      </Dialog>
}
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
      
    {props.masp&&<Dialog
        open={props.open4}
        keepMounted
        width={400} 
        onClose={handleCancel}
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
            value={props.TenSp}
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
            value={props.GiaBan}
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
            value={props.Mota}
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
    value={props.NgayCapNhat}
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
            
          /></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Số Lượng Tồn
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField onChange={handleTextFieldChange7} type="number"   
            autoFocus
            margin="dense"
            id="name"                                                                           
            fullWidth
            value={props.SoLuongTon}
            error={props.isError}//bật câu cảnh báo
        helperText={props.textError}
          /></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              Chủ Đề
              </StyledTableCell>
              <StyledTableCell align="right">
                <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={props.open1}
          onClose={handleClose1}
          onOpen={handleOpen1}
          value={props.MaChuDe}
          onChange={handleMenulist1}
        > 
       
          {props.ChuDe.map((row) => (         
           <MenuItem key={row.maChuDe} value={row.maChuDe} >{row.tenChuDe}</MenuItem>   
          ))}                                                
           </Select>
      </FormControl>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              Nhà Xuất Bản
              </StyledTableCell>
              <StyledTableCell align="right">
              <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={props.open2}
          onClose={handleClose1}
          onOpen={handleOpen2}
          value={props.MaNxb}
          onChange={handleMenulist2}
        >
          {props.XuatBan.map((row) => (         
           <MenuItem  key={row.maNxb} value={row.maNxb} >{row.tenXb}</MenuItem>   
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
      </Dialog>}
     
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
          <StyledTableCell colSpan={2} align="right">Thao Tác</StyledTableCell>
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
        </StyledTableCell>
        <StyledTableCell align="right">
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