import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FetchApi from './../../src/Api';
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";


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
    MatKhau:null,
    message:""
    }};
    this.myFunction = this.myFunction.bind(this);
  }
  myFunction(param){
    const data = this.state;
    data.customer.TaiKhoan=param;// e.target.value:nhan du lieu nhap trên textbox
    this.setState(data);
    console.log(param);
    console.log(data);
}
  
 render() {
 
  return (
        <FormName  myFunction={this.myFunction} />
  );
  
  }}
function FormName(){
  const classN=useStyles();
  const handleTextFieldChange1 = (e) => this.props.myFunction(e.target.value);

const handleTextFieldChange2 = (e) => {
const data = this.state;
data.customer.MatKhau=e.target.value;// e.target.value:nhan du lieu nhap trên textbox
this.setState(data);
}
const callback = (data) => {
  const newData = this.state;
  newData.customer.message=data.message;
  this.setState(newData);
if(this.state.customer.message==="")
{
  if(this.state.customer.MaKh==null)
  {    
   
    const newData = this.state;
      newData.customer.MaKh=data.MaKh;
      newData.customer.Hoten=data.Hoten;
      this.setState(newData);
    console.log(this.state.customer);
    this.props.history.push("/home");
    return (
      <div className={classN.root}>
        <Alert severity="success">This is a success alert — check it out!</Alert>
        </div>
  );
}
}
return (
  <div className={classN.root}>
    <Alert severity="error">This is an error alert — check it out!</Alert>
    </div>
);
}

const handleSubmit = (e)  =>  {

//e.preventDefault();

FetchApi('POST', 'https://localhost:5001/Values/authenticate', 
{ 'Content-Type': 'application/json' },JSON.stringify({
TaiKhoan: this.state.customer.TaiKhoan,
MatKhau:this.state.customer.MatKhau
}), callback);

console.log('You clicked submit.'+this.state.customer.TaiKhoan+' password '+this.state.customer.MatKhau);
}
  return (<div>
      <form  className={classN.root} noValidate autoComplete="off"  >
      <TextField id="standard-basic" label="Tài khoản" onChange={handleTextFieldChange1} />
      <TextField id="filled-basic" label="Mật khẩu" variant="filled" onChange={handleTextFieldChange2} />
      <Button variant="contained" color="primary"  onClick={handleSubmit}>
        Đăng nhập
      </Button>      
    </form>
  </div>);
}


