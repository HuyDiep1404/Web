import React,  { Component }  from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Alert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import FetchApi from './../../src/Api';
import { FormatColorReset } from '@material-ui/icons';
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
export class Payment extends React.Component {
  
    static displayName = Payment.name;
    constructor(props) {
      super(props);
      var today = new Date(),
      date = new Date().toLocaleDateString();
      this.state=
      {
        date: date,
   
        isError:false,
        textError:"",
        message:"",
        severity:"",
        open:false,
        click1:true,
        click2:false,
        mahd:null,
        NgayGiao:new Date(),
      }
       this.myFunction=this.myFunction.bind(this);
       this.handle=this.handle.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.backhome=this.backhome.bind(this);
    }
    
    myFunction(param)
    {
        console.log(param);
        const data=this.state;
        //cách chuyển từ kiểu string sang date new Date()
       if((new Date(param)) >= (new Date()))
       {
    data.NgayGiao=param;
    data.isError=false;
    data.textError="";
       }
       else
       {
        data.isError=true;
        data.textError="ngày giao hang phải sau ngày đặt hàng"; 
       }
       this.setState(data);
       

    }
    backhome()
    {
      this.props.history.replace({
        pathname: '/',
        state: {
           data : this.props.history.location.state?.data
        }
      })
    }
    onStep(){
      this.props.onStep(4);
    }
    componentDidMount(){
      this.checkdata();
      this.onStep();
  }
    callback=(data)=>
    { 
      const newData = this.state;  
      newData.message=data.message; 
      newData.mahd=data.mahd;
      
      newData.open=true;
      
        if(data.mahd)
        {               
          newData.click2=true;
          newData.click1=false;
            newData.severity="success";
        this.setState(newData);
          
      }
      else
      {
        newData.click1=true;
        newData.click2=false;
            newData.severity="error";
            this.setState(newData);
      }
      console.log(newData);
    }
    handle()
    {
     
      const data=this.state;
     
      
        const customer=this.props.history.location.state?.data;
        let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];
        let model = {
            NgayTao:new Date(),
            MaKh:customer.MaKh,
            NgayGiao:data.NgayGiao,
            Dathanhtoan:true,   
            Tinhtranggiaohang:true,
            Details1: newData.map(a => ({
            MaSp:a.MaSp,
            SoLuong:a.sl,
            Dongia:(a.sl*a.GiaBan)
        }))};
        console.log(model);
       
        
        FetchApi('POST', 'Values/createBill', 
        { 'Content-Type': 'application/json' },JSON.stringify(model
            ), this.callback);

            localStorage.clear();      
    
      this.onCart();
           
            
    }
    onCart(){
      this.props.onCart(JSON.parse(localStorage.getItem('giohang'))?.length);
   
    }
    handleClose( event,reason){
      if (reason === 'clickaway') {
        return;
      }
      const data = this.state;
      data.open=false;
      this.setState(data);
    };
  
    callback1 = (data) =>
    {
      debugger;

      console.log(data);
      const newData=this.state;
      newData.open=true;
      if(data.dathanhtoan==false)
      {
        debugger;
        newData.click1=false;
        newData.click2=false;
        newData.message=data.message;
        newData.severity="success";
        this.setState(newData);
      }
      else
      {
        newData.click1=false;
        newData.click2=true;
        newData.severity="error";
        newData.message=data.message;
        this.setState(newData);
      }
    }
    handleCancel()
    {
  
      FetchApi('GET',`/Values/updateBill?mahd=${this.state.mahd}`, 
      { 'Content-Type': 'application/json' },null, this.callback1);
    }
    checkdata()
    { 
    const data = this.props.history.location.state?.data;//nhan data tu trang khac
    
    if(data === null || data === undefined)
    {
      this.props.history.push("/authenticate");//cach chuyen qua 1 trang khac 
    }
  }   

    

    render(){
      let that=this;
      
        const customer=this.props.history.location.state?.data;
        
    return(
        <div>
            <ShowPayment click2={this.state.click2} click1={this.state.click1} date={this.state.date} isError={this.state.isError} textError={this.state.textError} customer={customer} NgayDat={this.state.NgayDat} myFunction={this.myFunction}
            handle={this.handle} handleCancel={this.handleCancel} backhome={this.backhome} />
             <Snackbar open={that.state.open} autoHideDuration={3000}  onClose={this.handleClose}  >
         <Alert onClose={this.handleClose} severity={that.state.severity}>
           {that.state.message}
         </Alert>
        
       </Snackbar>
        </div>
    );
    }
}
function ShowPayment(props){
    const classes = withStyles();

    const handleTextFieldChange = (e) => props.myFunction(e);
    const handle = () => props.handle();
    const handleCancel = () =>props.handleCancel();
    const backhome=()=>props.backhome();
    return(
        <div>
          <Button variant="contained" color="primary"  onClick={backhome}>
          Home
        </Button>
<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">   
        <TableBody>
        
        <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Họ tên khách hàng
              </StyledTableCell>
              <StyledTableCell align="right">{props.customer?.Hoten}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Địa chỉ
              </StyledTableCell>
              <StyledTableCell align="right">{props.customer?.Diachi}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Điện thoại
              </StyledTableCell>
              <StyledTableCell align="right">{props.customer?.SoDt}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Ngày đặt
              </StyledTableCell>
              <StyledTableCell align="right">{props.date}</StyledTableCell>
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
    label="Ngày Đặt"
    value={props.NgayGiao}
    onChange={handleTextFieldChange}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
   </MuiPickersUtilsProvider>            
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                
              </StyledTableCell>
              <StyledTableCell align="right">
              {props.click1&&<Button variant="contained" color="primary"  onClick={handle}>
          Thanh toán
        </Button>} 
        {props.click2 &&<Button variant="contained" color="primary"  onClick={handleCancel}>
          Huỷ Đơn Thanh toán
        </Button>}
              </StyledTableCell>
              
            </StyledTableRow>
            
        </TableBody>
      </Table>
    </TableContainer>
    
        </div>
    );
}
