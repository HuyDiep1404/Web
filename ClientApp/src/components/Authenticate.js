import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FetchApi from './../../src/Api';
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar'
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    
  },
}));
/* "TaiKhoan":"trankhanh",
    "MatKhau":"20012001"*/


export class Authenticate extends  React.Component { 
  constructor(props) {
    super(props);
    this.state={
      customer :{
      MaKh:null,
    Hoten:"",
    TaiKhoan:"",
    MatKhau:"",
    message:"",
    severity:"",
    open:false,
    cir:false,
    showPassword:false
    }};
  
    /*this.myFunction1= this.myFunction1.bind(this);la ham rang buoc
     this.myFunction1.bind(this) bien nay se rang buoc trong class nay
     this ben trong () la tu chung cho class*/
    this.myFunction1= this.myFunction1.bind(this);
    this.myFunction2= this.myFunction2.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this); 
    this.handleSubmit1= this.handleSubmit1.bind(this); 
    this.handleClose=this.handleClose.bind(this);
 this.handleClickShowPassword=this.handleClickShowPassword.bind(this);

  }
/*setTimeout la thoi gian het gio no sẽ thực hiện hành động
có thời gian chờ
data la gia tri ma api tra ve. khi api tra ve*/ 
  callback = (data) => {  
    const newData = this.state;    
    newData.customer.cir=false;
    
  if(data.message===undefined)
  {
      
        newData.customer.MaKh=data.maKh;
        newData.customer.Hoten=data.hoten;
        newData.customer.open=true;
        newData.customer.severity="success";
        newData.customer.message="đăng nhập user thành công";
        this.setState(newData);
      console.log(this.state.customer);  
      /* .history.push ngoài cách chuyển qua 1 trang khac thi co thể truyền state ,data sang 1 trang khác*/
      setTimeout(() => this.props.history.push({
        pathname: '/',
        state: {
          data: this.state.customer/*truyen data  */
        },
      }),2000); 
      
    
  }
  else
  {
    newData.customer.open=true;
    newData.customer.message=data.message;
    newData.customer.severity="error";
    this.setState(newData);
  }
  
  }
  myFunction1(param){
    const data = this.state;
    data.customer.TaiKhoan=param;
    // e.target.value:nhan du lieu nhap trên textbox
    this.setState(data);
   
}
myFunction2(param){
  const data = this.state;
  data.customer.MatKhau=param;// e.target.value:nhan du lieu nhap trên textbox
  this.setState(data);

}
handleClickShowPassword() {
  const data = this.state;
  data.customer.showPassword=!data.customer.showPassword;// e.target.value:nhan du lieu nhap trên textbox
  this.setState(data);

 
};

handleSubmit()
{
  const newData=this.state;
  newData.customer.cir=true;
  this.setState(newData);
  console.log(newData);  
  FetchApi('POST', 'https://localhost:5001/Values/authenticate', 
  { 'Content-Type': 'application/json' },JSON.stringify({
  TaiKhoan:this.state.customer.TaiKhoan,
  MatKhau:this.state.customer.MatKhau
  }), this.callback);
  
  console.log('You clicked submit.'+this.state.customer.TaiKhoan+' password '+this.state.customer.MatKhau);
}
handleSubmit1()
{
  this.props.history.push("/create");
}
 handleClose( event,reason){
  if (reason === 'clickaway') {
    return;
  }
  const data = this.state;
  data.customer.open=false;
  this.setState(data);
};


  
 render() {
   /*that.state.customer.cir && <CircularProgress :&& có thể hiểu là 2 biến này phải xuất hiện đồng thời,
   khi biên trang thái dược cập nhật thì nó sẻ thực hiện sau dáu &&*/
   let that=this;/*ta phải gán như vậy vì khi sử dụng this trong Alert thì nó sẽ hiểu this này là của hàm */
 /*FormName là ,myFunction1 là thuộc tính của component,this la chi nhung cai ham nam trong class*/ 
  return (
    <div>
        <FormName MatKhau={this.state.customer.MatKhau} showPassword={this.state.customer.showPassword}  myFunction1={this.myFunction1} myFunction2={this.myFunction2}
        handleSubmit={this.handleSubmit}  handleSubmit1={this.handleSubmit1} handleClickShowPassword={this.handleClickShowPassword}/>
        {that.state.customer.cir && <CircularProgress />}  
        <Snackbar open={that.state.customer.open} autoHideDuration={3000}  onClose={this.handleClose} >
        <Alert onClose={this.handleClose} severity={that.state.customer.severity}>
          {that.state.customer.message}
        </Alert>
      </Snackbar>
      </div>
  
  );
  
  }}
  /*prop la thuoc tham so truyen vao,myFunction1 la ten thuoc tinh trong component*/
function FormName(props){
  let {MatKhau}=props;
  const classN=useStyles();
  const handleTextFieldChange1 = (e) => props.myFunction1(e.target.value);

const handleTextFieldChange2 = (e) => props.myFunction2(e.target.value);
const handleSubmit = ()  =>  props.handleSubmit();
const handleSubmit1= () => props.handleSubmit1();
const handleClickShowPassword = () => props.handleClickShowPassword();
  return (<div>
      <form  className={classN.root} noValidate autoComplete="off"  >
      <TextField id="standard-basic" label="Tài khoản" onChange={handleTextFieldChange1} />
      
      <FormControl >
          <InputLabel htmlFor="standard-adornment-password">Mật khẩu</InputLabel>
          <Input
            id="standard-adornment-password"
            type={props.showPassword ? 'text' : 'password'}
            value={MatKhau}
            onChange={handleTextFieldChange2}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                 
                >
                  {props.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      <Button variant="contained" color="primary"  onClick={handleSubmit}>
        Đăng nhập
      </Button> 
      <Button variant="contained" color="primary"  onClick={handleSubmit1}>
        Đăng ký
      </Button> 
    </form>
   
    
  </div>);
}


