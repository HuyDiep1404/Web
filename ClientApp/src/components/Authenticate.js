import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Authenticate.module.less';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FetchApi from './../../Api';
 

export default function Authenticate() {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      
    },
  }));
  const classes = useStyles();
  const [customer, setCustomer] = useState({
      Hoten:null,
    TaiKhoan:"",
    MatKhau:null,
    message:""
  });
  

  const handleTextFieldChange1 = function(e) {
      const data = customer;
    data.TaiKhoan = e.target.value;
      setCustomer(data);
}

const handleTextFieldChange2 = function(e) {
  const data = user;
  data.MatKhau=e.target.value;// e.target.value:nhan du lieu nhap trên textbox
  setCustomer(data);
}
const callback=(data)=>{
    if({...customer}.Hoten==null)
    {    
      const newData = {...customer};
        newData.message=data.message;
        setCustomer(newData);
      console.log({...customer}.message);
  }
}
const handleSubmit=function (e) {
 
  //e.preventDefault();
FetchApi('GET', 'https://localhost:5001/Values/authenticate', 
{ 'Content-Type': 'application/json' },JSON.stringify({
  TaiKhoan:customer.TaiKhoan,
  MatKhau:customer.MatKhau
}), callback);


console.log('You clicked submit.'+customer.TaiKhoan+' password '+customer.MatKhau);
}

//onChange la su thay đổi trên text box
  return (
       <div>
       <form className={classes.root} noValidate autoComplete="off"  >
      <TextField id="standard-basic" label="Name" onChange={handleTextFieldChange1} />
      <TextField id="filled-basic" label="Password" variant="filled" onChange={handleTextFieldChange2} />
      <Button variant="contained" color="primary"  onClick={handleSubmit}>
        
      </Button>
      
    </form>
    
    <label> {{...customer}.message} </label>
  </div>
   
        
         
  );
  
}

Authenticate.propTypes = {};

Authenticate.defaultProps = {};


