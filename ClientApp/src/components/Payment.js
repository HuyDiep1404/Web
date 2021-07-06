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
      date = today.getFullYear()+ '-' +(today.getMonth() + 1)+ '-' +  today.getDate();
      this.state=
      {
        date: date,
   
        isError:false,
        textError:"",
        message:"",
        severity:"",
        open:false,
        //click:true,
        
        NgayGiao:new Date(),
      }
       this.myFunction=this.myFunction.bind(this);
       this.handle=this.handle.bind(this);
        this.handleClose=this.handleClose.bind(this);
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
    onStep(){
      this.props.onStep(4);
    }
    componentDidMount(){
      this.onStep();
  }
    callback=(data)=>
    { 
      const newData = this.state;  
      newData.message=data.message;
      newData.open=true;
      
        if(data.message=="đã tạo thành công")
        {              
            newData.severity="success";
        this.setState(newData);
          
      }
      else
      {
            newData.severity="error";
            this.setState(newData);
      }
        
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
      this.checkdata();
        const customer=this.props.history.location.state?.data;
        
    return(
        <div>
            {<ShowPayment date={this.state.date} isError={this.state.isError} textError={this.state.textError} customer={customer} NgayDat={this.state.NgayDat} myFunction={this.myFunction}
            handle={this.handle} />}
             <Snackbar open={that.state.open} autoHideDuration={3000}  onClose={this.handleClose} >
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
    return(
        <div>
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
    format="yyyy/MM/dd"
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
              <Button variant="contained" color="primary"  onClick={handle}>
          Thanh toán
        </Button> 
              </StyledTableCell>
              
            </StyledTableRow>
            
        </TableBody>
      </Table>
    </TableContainer>
    
        </div>
    );
}
