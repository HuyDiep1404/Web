import React,  { Component }  from 'react';
import { withStyles, makeStyles, alpha  } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FetchApi from './../../src/Api';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Alert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import { createFalse, getConstantValue } from 'typescript';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DetailsIcon from '@material-ui/icons/Details';
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    
  }));
export class HistoryBill extends React.Component {
  
    static displayName = HistoryBill.name;
    constructor(props) {
      super(props);
      this.state=
      {
        cart:null,
        Mahd:null,
        bill:[],
        open:false,
        severity:"",
        message:"",
        click:false,
        page:0,
        rowsPerPage:5,
        cir:true,
        NgayGiao:null,
        NgayDat:null,
        Dathanhtoan:null,
        Tinhtranggiaohang:null,
        open1:false,
        open3:false,
        value:0,
        cart:[],
        bill:[],
        donhang:[]
       
        
      
      }
       this.handleCancel=this.handleCancel.bind(this);
       this.handleClose=this.handleClose.bind(this);
       this.handleChangePage=this.handleChangePage.bind(this);
       this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this);
       this.handleTextFieldChange1=this.handleTextFieldChange1.bind(this);
       this.handleTextFieldChange2=this.handleTextFieldChange2.bind(this);
       this.search=this.search.bind(this);
       this.handleMenulist=this.handleMenulist.bind(this);
       this.handleDelete=this.handleDelete.bind(this);
       this.handleOpen1=this.handleOpen1.bind(this);
       this.handleClose1=this.handleClose1.bind(this);
       this.handleDetail=this.handleDetail.bind(this);
      }
      
      handleDelete(value)
      {
        const data=this.state;
        data.Mahd=value;
        data.open3=true;
        this.setState(data);
        
       
       


      }
    handleCancel()
    {
      
      FetchApi('GET',`/Values/updateBill?mahd=${this.state.Mahd}`, 
      { 'Content-Type': 'application/json' },null, this.callback1);
     
       
      
    }
    handleDetail(value)
    {
      console.log(value);
      const data = this.state;
      data.Mahd=value;
      this.setState(data);  

let mahd=data.bill.find(a=> a.maHoaDon == value);
let newData= JSON.parse(localStorage.getItem('donhang')) ?? [];
let item=mahd;
newData.push(item);
localStorage.setItem('donhang', JSON.stringify(newData));  

      FetchApi('GET',`/Values/historychitiet?mahd=${value}`, 
      { 'Content-Type': 'application/json' },null, this.callback2);
     

    }
    callback1=(data)=>{
      const newData=this.state;
      newData.open=true;
      newData.open3=false;
      if(data.dathanhtoan==false)
      {
        newData.click=true;
        newData.message=data.message;
        newData.severity="success";
        this.setState(newData);
      }
      else
      {
        newData.click=false;
        newData.severity="error";
        newData.message=data.message;
        this.setState(newData);
      }
    }
    callback=(data)=>{
      
        const newData=this.state;
        newData.bill=data;
        newData.cir=false;
        newData.click=false;
        this.setState(data);
    }
    callback2=(data1)=>
    {
      const newData=this.state;
      newData.cart=data1;
      this.setState(newData);

     
      let data2= JSON.parse(localStorage.getItem('giohangdathanhtoan')) ?? [];
       
      for(let i=0;i<data1.length;i++)
      {
        let item={
         
            MaSp:data1[i].sach1.maSp,
            TenSP:data1[i].sach1.tenSp,
              GiaBan:data1[i].sach1.giaBan,
              Mota:data1[i].sach1.mota,
              AnhBia:data1[i].sach1.anhBia,
              SoLuongTon:data1[i].sach1.soLuongTon,
              MaHd:data1[i].chittiet1.maHd,
              SoLuong:data1[i].chittiet1.soLuong,
              Dongia:data1[i].chittiet1.dongia
      }
      data2.push(item);
        localStorage.setItem('giohangdathanhtoan', JSON.stringify(data2));  
      }
      console.log(this.state.Mahd);
      this.props.history.push({
        pathname: '/historyDetail',
        state: {
           data : this.props.history.location.state?.data,//truyen lai customer vì nó không phải biến state nên không được lưu lại
           Mahd : this.state.Mahd
        }
      })
     
   
    }
    handleClose( event,reason){
      if (reason === 'clickaway') {
        return;
      }
      const data = this.state;
      data.open=false;
      this.setState(data);
    };
    handleChangePage (event, newPage){
      
       const newData=this.state;
       newData.page=newPage;
       this.setState(newData)
      
    };
     handleChangeRowsPerPage (event) {
       
       const newData=this.state;
       newData.rowsPerPage=(parseInt(event,10));
       newData.page=0;
       this.setState(newData);
      
    };
    handleMenulist(value)
    {
    
      const newData=this.state;
      if(value == 1)//đã thanh toán
      {
        
        newData.Dathanhtoan=true;
        newData.tinhtranggiaohang=false;

      } 
      else if(value == 2)//đã giao
      {
        
        newData.Dathanhtoan=true;
        newData.tinhtranggiaohang=true;

      }
      else if(value ==3 )//đã hủy
      {
        
        newData.Dathanhtoan=false;
        newData.tinhtranggiaohang=false;
      }else{
        
        newData.Dathanhtoan=null;
        newData.tinhtranggiaohang=null;
      }
      newData.value=value;
      this.setState(newData);
    }
    handleClose1()//đóng droplist and 
    {
      const data=this.state;
      data.open1=false;
      data.open3=false;
      this.setState(data);
    }
    handleOpen1()
    {
      const data=this.state;
      data.open1=true;
      this.setState(data);
    }
   
    handleTextFieldChange1(e)
    {
      
      const data=this.state;
      data.NgayGiao=new Date(e).toLocaleDateString();
      this.setState(data);
    }
    handleTextFieldChange2(e)
    {
    
      const data=this.state;
      data.NgayDat=new Date(e).toLocaleDateString();;
      this.setState(data);
    }
    search()
    
    {
      const newData=this.state;
      const data= this.props.history.location.state?.data;
      newData.click=true;
      this.setState(newData);
     
    }
    callhistory()
    {
    
      const data= this.props.history.location.state?.data;
      const newData=this.state;
     
      if(data)
      {
      if((this.state.bill.length === 0 && this.state.NgayGiao==null && this.state.NgayDat == null
        && this.state.Dathanhtoan == null && this.state.Tinhtranggiaohang==null)||this.state.click)
      {
        let url="/Values/historydonhang";
          url=`${url}?makh=${data.MaKh}`;
          if(newData.NgayGiao!=null)
          {
            url=`${url}&ngaygiao=${newData.NgayGiao}`;
          }
          if(newData.NgayDat!=null)
          {
            url=`${url}&ngaytao=${newData.NgayDat}`;
          }
          if(newData.Dathanhtoan != null)
          {
            url=`${url}&dathanhtoan=${newData.Dathanhtoan}`;
          }
          if(newData.tinhtranggiaohang != null)
          {
            url=`${url}&tinhtranggiaohang=${newData.tinhtranggiaohang}`;
          }
          FetchApi('GET', url, 
          { 'Content-Type': 'application/json' },null, this.callback);
        }
      }
    
        
    }
    handleClick()
    {
      const newData=this.state;
      newData.open1=true;
      this.setState(newData);
    }
    render()
    {
      let that=this;
    
        this.callhistory();
        return(
            <div>
              {((this.state.bill.length > 0)||(this.state.NgayGiao||this.state.NgayDat||this.state.Dathanhtoan!=null||this.state.Tinhtranggiaohang!=null))  && <ShowHistory bill={this.state.bill} handleCancel={this.handleCancel}
            page={this.state.page} rowsPerPage={this.state.rowsPerPage} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            handleTextFieldChange1={this.handleTextFieldChange1} handleTextFieldChange2={this.handleTextFieldChange2} search={this.search} handleMenulist={this.handleMenulist}
            NgayGiao={this.state.NgayGiao} NgayDat={this.state.NgayDat} handleChange={this.handleChange} open1={this.state.open1} open3={this.state.open3}
            value={this.state.value} handleClose1={this.handleClose1} handleOpen1={this.handleOpen1} handleDelete={this.handleDelete} handleDetail={this.handleDetail}/>
        }
        {that.state.cir && <CircularProgress />}  
            <Snackbar open={that.state.open} autoHideDuration={3000}  onClose={this.handleClose} >
         <Alert onClose={this.handleClose} severity={that.state.severity}>
           {that.state.message}
         </Alert>      
       </Snackbar>
             
            </div>
        );
      
    }
}
function ShowHistory(props){
    const classes = useStyles();
    const handleCancel = () =>props.handleCancel();
    const handleChangePage=(e,newpage)=> {
  
      props.handleChangePage(e,newpage);}
    const handleChangeRowsPerPage=(e)=>{
      console.log(e.target);
      props.handleChangeRowsPerPage(e.target.value);}
      const search =()=>props.search();
      const handleMenulist = (e) =>props.handleMenulist(e.target.value);
      const handleTextFieldChange1 = (e)=>props.handleTextFieldChange1(e);
      const handleTextFieldChange2 = (e)=>props.handleTextFieldChange2(e);
      const handleDelete=(value)=>props.handleDelete(value);
      const handleOpen1=()=>props.handleOpen1();
      const handleClose1=()=>props.handleClose1();
      const handleDetail=(value)=>props.handleDetail(value);
    const white = {
      backgroundColor: 'white'
      }
      
      const gray ={
      backgroundColor: 'gray'
      }
    return(
      <div className={classes.root}>
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
            Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            không
          </Button>
          <Button onClick={handleCancel} color="primary">
            có
          </Button>
        </DialogActions>
      </Dialog>
            <MuiPickersUtilsProvider  utils={DateFnsUtils} >
            <Grid container justifyContent="space-around">
  <KeyboardDatePicker
 
    variant="inline"
    format="dd/MM/yyyy"
    margin="normal"
    id="date-picker-inline"
    value={props.NgayDat}
    label="Ngày đặt"
    onChange={handleTextFieldChange2}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
  <KeyboardDatePicker
    
    variant="inline"
    format="dd/MM/yyyy"
    margin="normal"
    id="2"

    label="Ngày Giao"
    value={props.NgayGiao}
    onChange={handleTextFieldChange1}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  /></Grid>
   </MuiPickersUtilsProvider>          
            
         
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Chọn tình trạng</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={props.open1}
          onClose={handleClose1}
          onOpen={handleOpen1}
          value={props.value}
          onChange={handleMenulist}
        >
        <MenuItem value={0}>
            <em>Chọn tình trạng</em>
          </MenuItem>
           <MenuItem value={1} >Đã thanh toán</MenuItem>          
           <MenuItem  value={2} >Đã giao</MenuItem>          
           <MenuItem  value={3} >Đã hủy</MenuItem>                                                   
           </Select>
      </FormControl>

        <Button variant="contained" color="primary"  onClick={search}>
        Search
        </Button>     
              
<TableContainer>
      <Table className={classes.table} aria-label="simple table">
      
          
       
        <TableHead>
          <TableRow>
            <StyledTableCell>Mã đơn hàng</StyledTableCell>
            <StyledTableCell  align="right">Ngày Tạo</StyledTableCell>
            <StyledTableCell align="right">Ngày Giao</StyledTableCell>
            <StyledTableCell align="right">Tình trạng</StyledTableCell>
            <StyledTableCell align="right">Thao Tác</StyledTableCell>

          </TableRow>
        </TableHead>
       
        <TableBody>
          {(props.bill.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
          ).map((row, index) => (
            <TableRow key={index} style={!row.dathanhtoan ? gray : white}  >
              <StyledTableCell component="th" scope="row">
                {row.maHoaDon}
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(row.ngayTao).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.ngayGiao).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{row.dathanhtoan?(row.tinhtranggiaohang?"Đã giao":"Đã thanh toán"):"Đã hủy"}</StyledTableCell>
              <StyledTableCell align="right">
                
              {(row.dathanhtoan && !row.tinhtranggiaohang)&&<Tooltip title="Hủy">
<IconButton aria-label="update" value={row.maHoaDon} onClick={handleDelete.bind(this,row.maHoaDon)}  >
          < DeleteIcon />
        </IconButton>
        
        </Tooltip>}
        {(row.dathanhtoan && !row.tinhtranggiaohang)&&<Tooltip title="Chi tiết">
<IconButton aria-label="detail" value={row.maHoaDon} onClick={handleDetail.bind(this,row.maHoaDon)} >
          <EditIcon />
        </IconButton>     
        </Tooltip>}

              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.bill.length}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
       
        </div>
    );
}