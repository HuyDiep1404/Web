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
    SoDt:"",
    Diachi:"",
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
/*setTimeout la thoi gian het gio no s??? th???c hi???n h??nh ?????ng
c?? th???i gian ch???
data la gia tri ma api tra ve. khi api tra ve*/ 
  callback = (data) => {  
    const newData = this.state;    
    newData.customer.cir=false;
    
  if(data.message===undefined)
  {
      
        newData.customer.MaKh=data.maKh;
        newData.customer.Hoten=data.hoten;
        newData.customer.SoDt=data.soDt;
        newData.customer.Diachi=data.diachi;
        newData.customer.open=true;
        newData.customer.severity="success";
        newData.customer.message="????ng nh???p user th??nh c??ng";
        this.setState(newData);
      console.log(this.state.customer);  
      /* .history.push ngo??i c??ch chuy???n qua 1 trang khac thi co th??? truy???n state ,data sang 1 trang kh??c*/
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
    // e.target.value:nhan du lieu nhap tr??n textbox
    this.setState(data);
   
}
myFunction2(param){
  const data = this.state;
  data.customer.MatKhau=param;// e.target.value:nhan du lieu nhap tr??n textbox
  this.setState(data);

}
handleClickShowPassword() {
  const data = this.state;
  data.customer.showPassword=!data.customer.showPassword;// e.target.value:nhan du lieu nhap tr??n textbox
  this.setState(data);

 
};

handleSubmit()
{
  const newData=this.state;
  newData.customer.cir=true;
  this.setState(newData);
  console.log(newData);  
  FetchApi('POST', '/Values/authenticate', 
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
   /*that.state.customer.cir && <CircularProgress :&& c?? th??? hi???u l?? 2 bi???n n??y ph???i xu???t hi???n ?????ng th???i,
   khi bi??n trang th??i d?????c c???p nh???t th?? n?? s??? th???c hi???n sau d??u &&*/
   let that=this;/*ta ph???i g??n nh?? v???y v?? khi s??? d???ng this trong Alert th?? n?? s??? hi???u this n??y l?? c???a h??m */
 /*FormName l?? ,myFunction1 l?? thu???c t??nh c???a component,this la chi nhung cai ham nam trong class*/ 
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
      <TextField id="standard-basic" label="T??i kho???n" onChange={handleTextFieldChange1} />
      
      <FormControl >
          <InputLabel htmlFor="standard-adornment-password">M???t kh???u</InputLabel>
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
        ????ng nh???p
      </Button> 
      <Button variant="contained" color="primary"  onClick={handleSubmit1}>
        ????ng k??
      </Button> 
    </form>
   
    
  </div>);
}


