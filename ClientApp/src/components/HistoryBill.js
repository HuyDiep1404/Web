import React,  { Component }  from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import { createFalse } from 'typescript';
import { useHistory } from "react-router-dom";
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
      table: {
        minWidth: 650,
      },
    },
  }))(TableRow);

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
        value:0,
       
      }
       this.handleCancel=this.handleCancel.bind(this);
       this.handleClose=this.handleClose.bind(this);
       this.handleChangePage=this.handleChangePage.bind(this);
       this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this);
       this.handleTextFieldChange1=this.handleTextFieldChange1.bind(this);
       this.handleTextFieldChange2=this.handleTextFieldChange2.bind(this);
       this.search=this.search.bind(this);
       this.handleMenulist=this.handleMenulist.bind(this);
       
       this.handleOpen1=this.handleOpen1.bind(this);
       this.handleClose1=this.handleClose1.bind(this);
      }
  
    handleCancel(value)
    {
      FetchApi('GET',`/Values/updateBill?mahd=${value}`, 
      { 'Content-Type': 'application/json' },null, this.callback1);
    }
    callback1=(data)=>{
      const newData=this.state;
      newData.open=true;
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
      debugger;
      console.log(value);
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
    handleClose1()
    {
      const data=this.state;
      data.open1=false;
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
     /* let url="/Values/historychitiet";
      if(data)
      {
        url=`${url}?makh=${data.MaKh}`;
        if(!newData.NgayGiao)
        {
          url=`${url}&ngaygiao=${newData.NgayGiao}`;
        }
        if(!newData.NgayDat)
        {
          url=`${url}&ngaytao==${newData.NgayDat}`;
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
        { 'Content-Type': 'application/json' },null, this.callback1);
      }*/
      
    }
    callhistory()
    {
    
      const data= this.props.history.location.state?.data;
      const newData=this.state;
      //const data = JSON.parse(localStorage.getItem('user'));//nhan data tu trang khac
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
            NgayGiao={this.state.NgayGiao} NgayDat={this.state.NgayDat} handleChange={this.handleChange} open1={this.state.open1}
            value={this.state.value} handleClose1={this.handleClose1} handleOpen1={this.handleOpen1}/>
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
    const handleCancel = (value) =>props.handleCancel(value);
    const handleChangePage=(e,newpage)=> {
  
      props.handleChangePage(e,newpage);}
    const handleChangeRowsPerPage=(e)=>{
      console.log(e.target);
      props.handleChangeRowsPerPage(e.target.value);}
      const search =()=>props.search();
      const handleMenulist = (e) =>props.handleMenulist(e.target.value);
      const handleTextFieldChange1 = (e)=>props.handleTextFieldChange1(e);
      const handleTextFieldChange2 = (e)=>props.handleTextFieldChange2(e);
      
      const handleOpen1=()=>props.handleOpen1();
      const handleClose1=()=>props.handleClose1();
    const white = {
      backgroundColor: 'white'
      }
      
      const gray ={
      backgroundColor: 'gray'
      }
    return(
      <div className={classes.root}>
    
            Ngày đặt<MuiPickersUtilsProvider id="1" utils={DateFnsUtils} >
  <KeyboardDatePicker
 
    variant="inline"
    format="dd/MM/yyyy"
    margin="normal"
    id="date-picker-inline"
    value={props.NgayDat}
    onChange={handleTextFieldChange2}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
   </MuiPickersUtilsProvider>
              Ngày Giao<MuiPickersUtilsProvider  utils={DateFnsUtils} >
  <KeyboardDatePicker
    
    variant="inline"
    format="dd/MM/yyyy"
    margin="normal"
    id="2"
    value={props.NgayGiao}
    onChange={handleTextFieldChange1}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
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
          tìm kiếm
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
<IconButton aria-label="update" value={row.maHoaDon} onClick={handleCancel.bind(this,row.maHoaDon)}  >
          < DeleteIcon />
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