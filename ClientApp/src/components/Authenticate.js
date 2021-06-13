import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FetchApi from './../../src/Api';
 

export class Authenticate extends Component {
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
   
  }
  render() {
  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      
    },
  }));
  const classes = useStyles();

  

  const handleTextFieldChange1 = (e) => {
      const data = this.state.customer;
    data.TaiKhoan = e.target.value;
    this.setState(data.TaiKhoan);
}

const handleTextFieldChange2 = (e) => {
  const data = this.state.customer;
  data.MatKhau=e.target.value;// e.target.value:nhan du lieu nhap trên textbox
  this.setState(data.MatKhau);
}
const callback = (data) => {
    if(this.state.customer.MaKh==null)
    {    
      const newData = this.state.customer;
        newData.MaKh=data.MaKh;
        newData.Hoten=data.Hoten;
        this.setState(newData);
      console.log(this.state.customer);
  }
}


  
 const handleSubmit = (e)  =>  {
 
  //e.preventDefault();
  
FetchApi('GET', 'https://localhost:5001/Values/authenticate', 
{ 'Content-Type': 'application/json' },JSON.stringify({
  TaiKhoan: this.state.customer.TaiKhoan,
  MatKhau:this.state.customer.MatKhau
}), callback);

  


console.log('You clicked submit.'+this.state.customer.TaiKhoan+' password '+this.state.customer.MatKhau);
}


  return (
       <div>
       <form className={classes.root} noValidate autoComplete="off"  >
      <TextField id="standard-basic" label="Name" onChange={handleTextFieldChange1} />
      <TextField id="filled-basic" label="Password" variant="filled" onChange={handleTextFieldChange2} />
      <Button variant="contained" color="primary"  onClick={handleSubmit}>
        
      </Button>
      
    </form>
  </div>
   
        
         
  );
  
}}

Authenticate.propTypes = {};

Authenticate.defaultProps = {};


