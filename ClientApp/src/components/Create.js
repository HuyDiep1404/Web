import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FetchApi from './../../src/Api';
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactPhoneInput from 'react-phone-input-material-ui';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = theme => ({
  field: {
    margin: '10px 0',
  },
  countryList: {
    ...theme.typography.body1,
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }     
  }
}));
export class Create extends React.Component {
        constructor(props) {
        super(props);
        this.state={
          customer :{
        MaKh:null,
        Hoten:"",
        NgaySinh:new Date('01/01/2021'),
        GioiTinh:true,
        SoDt:"",
        TaiKhoan:"",
        MatKhau:null,
        MatKhau2:null,       
        Email:"",
        DiaChi:"",
        open:false,
        message:"",
        textError:"",
        textError1:"",   
        severity:"",
        isError3:false,
        isError2:false,
        isError:false,
       
        isError1:false,
        textError2:"",
        textError3:"",

       
        
      
        },
        
        
      };
    this.myFunction1= this.myFunction1.bind(this);
    this.myFunction2= this.myFunction2.bind(this);
    this.myFunction3= this.myFunction3.bind(this);
    this.myFunction4= this.myFunction4.bind(this);
    this.myFunction5= this.myFunction5.bind(this);
    this.myFunction6= this.myFunction6.bind(this);
    this.myFunction7= this.myFunction7.bind(this);
    this.myFunction8= this.myFunction8.bind(this);
    this.myFunction9= this.myFunction9.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
 
    
}

myFunction1(param){
  const data = this.state;
  data.customer.Hoten=param;
 
  this.setState(data);
 
}
myFunction2(param){
  console.log(param);
  const data = this.state;
  data.customer.NgaySinh=param;

  this.setState(data);

}
myFunction3(param){
  const data = this.state;
  data.customer.GioiTinh=param;
   this.setState(data);
  
}
myFunction4(param){
  const data = this.state;
  data.customer.SoDt=param;
  this.setState(data);
 
}
myFunction5(param){
const data = this.state;
data.customer.TaiKhoan=param;

this.setState(data);

}
//check khi bat dau nhap data
myFunction6(param){
  const data = this.state;
  data.customer.MatKhau=param;// e.target.value:nhan du lieu nhap tr??n textbox
  let regexLength= /^.{8,}$/;
  let regexNum= /[0-9]/;//s???
  let regexLetter= /[a-z]|[A-Z]/;//ch??? th?????ng or ch??? in hoa
  let regexWeak= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;//c?? k?? t??? v??? s??? ????? 8 k?? t???
  let regexStrong= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;//c?? k?? t??? v??? s??? ????? v?? k?? t??? ?????c bi???t v?? ??t nh???t 10 k?? t???
 
  if(regexWeak.test(param)===true){   
    data.customer.textError2="Password yeu, ph???i ??t nh???t 10 k?? t??? v?? ph???i bao g???m k?? t??? ?????t bi???t";
    data.customer.isError2=false;
  }
  if(regexStrong.test(param)===true){   
    data.customer.textError2="Password manh";
    data.customer.isError2=false;
  }
  if(regexLength.test(param)===false){
    data.customer.textError2="Password it nhat 8 ky tu";
    data.customer.isError2=true;
  }
  if(regexNum.test(param)===false){
    console.log(param);
    console.log(regexNum.test(param));
    data.customer.textError2="Password phai co so";
    data.customer.isError2=true;
  }
  if(regexLetter.test(param)===false){
    data.customer.textError2="Password phai co chu";
    data.customer.isError2=true;
  }
 
  this.setState(data);
 
  }
myFunction7(param){
    const data = this.state;
    data.customer.MatKhau2=param;// e.target.value:nhan du lieu nhap tr??n textbox
    this.setState(data);
   
    }
myFunction8(param){
      const data = this.state;
      data.customer.Email=param;// e.target.value:nhan du lieu nhap tr??n textbox
      this.setState(data);
      
      }
myFunction9(param){
        const data = this.state;
        data.customer.DiaChi=param;// e.target.value:nhan du lieu nhap tr??n textbox
        this.setState(data);
        
        }

        
 callback=(data)=>{
   
   debugger;
  const newData = this.state;  
  newData.customer.message=data.message;
  newData.customer.open=true;
  
    if(data.message=="???? t???o th??nh c??ng")
    {    

        newData.customer.severity="success";
        this.setState(newData);
      console.log(this.state.customer.message);
      setTimeout(() => this.props.history.push("/authenticate"    
      ),2000);
      
  }
  else
  {
        newData.customer.severity="error";
        this.setState(newData);
  }
  
 

 }
handleSubmit()
{
  
  this.checkpassword();
   this.checkemail();
   this.checkusername();
  const data = this.state;
  if(data.customer.isError===false && data.customer.isError1 === false && data.customer.isError3 === false &&data.customer.isError2 === false){
    debugger;
  console.log(data);
  
 FetchApi('POST', '/Values/create', 
  { 'Content-Type': 'application/json' },JSON.stringify({
  Hoten:data.customer.Hoten,
  NgaySinh:data.customer.NgaySinh,
  GioiTinh:data.customer.GioiTinh,
  SoDt:data.customer.SoDt,
  TaiKhoan:data.customer.TaiKhoan,
  MatKhau:data.customer.MatKhau,
  Email:data.customer.Email,
  DiaChi:data.customer.DiaChi
  }), this.callback);
  
  console.log('You clicked submit.'+data.customer.MaKh);
}

}
handleClose( event,reason){
  if (reason === 'clickaway') {
    return;
  }
  const data = this.state;
  data.customer.open=false;
  this.setState(data);
};
checkemail=()=>
{
 
    let constraint =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const newData = this.state;
   if(constraint.test(newData.customer.Email)===false)
   {
     
    newData.customer.textError1="Email nh???p sai ?????nh dang"
    newData.customer.isError1=true;
   
  
   }   else{
    newData.customer.textError1="";
    newData.customer.isError1=false;
   }
   this.setState(newData); 

}
//kiem tra khi click button
 checkpassword=()=>
        {
          const data = this.state;
     
          if(data.customer.MatKhau != data.customer.MatKhau2)
          {          
            data.customer.textError= " password ph???i tr??ng nhau";
            data.customer.isError= true; 
                           
          }else        
        {
          data.customer.textError= "";
          data.customer.isError= false; 
            
        }
        this.setState(data);    
        }
checkusername= () =>
{
  debugger;
  const data = this.state;
  if(data.customer.TaiKhoan == "")
{
  data.customer.textError3="ch??? ?? T??i Kho???n kh??ng ???????c ????? tr???ng";
  data.customer.severity="error";
  data.customer.isError3=true;
  this.setState(data);
}
else
{
  data.customer.textError3="";
  data.customer.severity="";
  data.customer.isError3=false;
  this.setState(data);
}
}

render() {
    /*that.state.customer.cir && <CircularProgress :&& c?? th??? hi???u l?? 2 bi???n n??y ph???i xu???t hi???n ?????ng th???i,
    khi bi??n trang th??i d?????c c???p nh???t th?? n?? s??? th???c hi???n sau d??u &&*/
    let that=this;/*ta ph???i g??n nh?? v???y v?? khi s??? d???ng this trong Alert th?? n?? s??? hi???u this n??y l?? c???a h??m */
  /*FormName l?? ,myFunction1 l?? thu???c t??nh c???a component,this la chi nhung cai ham nam trong class*/ 
   return (
     <div>
         <FormName GioiTinh={this.state.customer.GioiTinh} SoDt={this.state.customer.SoDt} defaultCountry={this.state.customer.defaultCountry} NgaySinh={this.state.customer.NgaySinh}
         textError={this.state.customer.textError} isError={this.state.customer.isError} textError1={this.state.customer.textError1} isError1={this.state.customer.isError1} 
         textError2={this.state.customer.textError2} isError2={this.state.customer.isError2}  textError3={this.state.customer.textError3} isError3={this.state.customer.isError3}
         myFunction1={this.myFunction1} myFunction2={this.myFunction2}   
         myFunction3={this.myFunction3} myFunction4={this.myFunction4}  myFunction5={this.myFunction5}
          myFunction6={this.myFunction6} myFunction7 ={this.myFunction7} myFunction8={this.myFunction8}  
          myFunction9={this.myFunction9} handleSubmit={this.handleSubmit} />         
         <Snackbar open={that.state.customer.open} autoHideDuration={3000}  onClose={this.handleClose} >
         <Alert onClose={this.handleClose} severity={that.state.customer.severity}>
           {that.state.customer.message}
         </Alert>
        
       </Snackbar>
       </div>
 
   );
}
}
function FormName(props){
  const classes = withStyles(styles);
    const classN=useStyles();
  const handleTextFieldChange1 = (e) => props.myFunction1(e.target.value);
  const handleTextFieldChange2 = (e) => {
    console.log(e);
    props.myFunction2(e);
  }
  const handleTextFieldChange3 = (e) => props.myFunction3(e.target.checked);
  const handleTextFieldChange4 = (e) => props.myFunction4(e);
  const handleTextFieldChange5 = (e) => props.myFunction5(e.target.value);
  const handleTextFieldChange6 = (e) => props.myFunction6(e.target.value);
  const handleTextFieldChange7 = (e) => props.myFunction7(e.target.value);
  const handleTextFieldChange8 = (e) => props.myFunction8(e.target.value);
  const handleTextFieldChange9 = (e) => props.myFunction9(e.target.value);
  const handleSubmit = ()  =>  props.handleSubmit();
  

    return (<div>
        <form  className={classN.root} noValidate autoComplete="off"  >
        <TextField id="standard-basic" label="H??? T??n" onChange={handleTextFieldChange1} />
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
  <KeyboardDatePicker    
    variant="inline"
    format="MM/dd/yyyy"
    margin="normal"
    id="date-picker-inline"
    label="Ng??y Sinh"
    value={props.NgaySinh}
    onChange={handleTextFieldChange2}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
</MuiPickersUtilsProvider>
             <FormControlLabel
        control={
          <Switch
            checked={props.GioiTinh}
            onChange={handleTextFieldChange3}
            name="GioiTinh"
            color="primary"
          />
        }
        label= {(props.GioiTinh==true)?" Gi???i t??nh : Nam":"Gi???i t??nh : N???"}
      />
        
        <PhoneInput
  international
  value={props.SoDt}
  //initialValueFormat="national"
  error={props.SoDt ? (isValidPhoneNumber(props.SoDt) ? undefined : 'Invalid phone number') : 'Phone number required'}
  onChange={handleTextFieldChange4}/>
         <TextField onChange={handleTextFieldChange5} 
        error={props.isError3}
        id="outlined-error-helper-text"
        label="T??i kho???n"
        defaultValue=""
        variant="outlined"
        helperText={props.textError3}
/>

        <TextField onChange={handleTextFieldChange6} type="password"
        error={props.isError2}//b???t c??u c???nh b??o
        id="outlined-error-helper-text"
        label="M???t kh???u"
        defaultValue=""
        variant="outlined"
        helperText={props.textError2}//c??u c???nh b??o
/> 
       
        <TextField onChange={handleTextFieldChange7} type="password"
        error={props.isError}
        id="outlined-error-helper-text"
        label="nh???p l???i M???t kh???u"
        defaultValue=""
        variant="outlined"
        helperText={props.textError}
/>     
      
        <TextField onChange={handleTextFieldChange8} 
        error={props.isError1}
        id="outlined-error-helper-text"
        label="Email"
        defaultValue=""
        variant="outlined"
        helperText={props.textError1}
/>     
        <TextField id="standard-basic" label="?????a ch???" onChange={handleTextFieldChange9} />
        <Button variant="contained" color="primary"  onClick={handleSubmit}>
          ????ng k??
        </Button> 
             
      </form>
     
      
    </div>);
  }
  