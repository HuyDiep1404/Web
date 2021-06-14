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
    this.myFunction1= this.myFunction1.bind(this);
    this.myFunction2= this.myFunction2.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    
 
  }
  callback = (data) => {
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
          <Alert severity="success">This is a success alert — check it out!</Alert>
    );
  }
  }
  else{

  }
  return (
    <div className={classN.root}>
      <Alert severity="error"> This is an error alert — check it out!</Alert>
      </div>
  );
  }
  myFunction1(param){
    const data = this.state;
    data.customer.TaiKhoan=param;
    // e.target.value:nhan du lieu nhap trên textbox
    this.setState(data);
    console.log(param);
    console.log(data);
}
myFunction2(param){
  const data = this.state;
  data.customer.MatKhau=param;// e.target.value:nhan du lieu nhap trên textbox
  this.setState(data);
  console.log(param);
  console.log(data);
}
handleSubmit()
{
  FetchApi('POST', 'https://localhost:5001/Values/authenticate', 
  { 'Content-Type': 'application/json' },JSON.stringify({
  TaiKhoan:this.state.customer.TaiKhoan,
  MatKhau:this.state.customer.MatKhau
  }), this.callback);
  
  console.log('You clicked submit.'+this.state.customer.TaiKhoan+' password '+this.state.customer.MatKhau);
}


  
 render() {
 
  return (
    <div>
        <FormName  myFunction1={this.myFunction1} myFunction2={this.myFunction2}
        handleSubmit={this.handleSubmit} />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      </div>

  );
  
  }}
function FormName(props){
  const classN=useStyles();
  const handleTextFieldChange1 = (e) => props.myFunction1(e.target.value);

const handleTextFieldChange2 = (e) => props.myFunction2(e.target.value);
const handleSubmit = ()  =>  props.handleSubmit();



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


