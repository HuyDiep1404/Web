import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FetchApi from './../../src/Api';
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Panorama } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 900,
    height: 750,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));
//viết component ben trong class
export class Home extends React.Component {
  
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state={
      customer:null,
      book :[
        
      ],
      MaChuDe:null,
      click:false,
      MaXuatBan:null,
      text:"",
      
     Api: {
    message:"",
    severity:"",
    open:false,
    MaSp:null,
    TenSp:"",
    GiaBan:null,
    Mota:"",
    AnhBia:"",
    SoLuongTon:0,
    },
    ChuDe :[]
      
  ,
    XuatBan:[]
    
  }
  this.myFunction1 = this.myFunction1.bind(this);
  this.myFunction2 = this.myFunction2.bind(this);
  this.myFunction3 = this.myFunction3.bind(this);
  this.handleClose=this.handleClose.bind(this);
}
  


  myFunction1(param)
  {
    const newData = this.state;   
    newData.MaChuDe=param;
    newData.click=true;
    this.setState(newData);
    this.props.history.replace({
      pathname: '/',
      state: {
        data: this.props.history.location.state?.data,
        chude: this.state.MaChuDe,//truyen data  
        
      }
    })
    
  }
  callback3  = (data) => {   
 
    const newData = this.state;
    { 
      newData.Api.MaSp = data.maSp;
      newData.Api.TenSp = data.tenSp;
      newData.Api.GiaBan = data.giaBan;
      newData.Api.Mota = data.mota;
      newData.Api.AnhBia = data.anhBia;
      newData.ApiSoLuongTon=data.soLuongTon;
         this.setState(newData);
    }   
 
   }
  myFunction3(param)
  {
    const newData = this.state;   
    newData.Api.MaSp=param;
    newData.click=true;
    this.setState(newData);
    
    this.props.history.push({//history la 1 mảng ,replace thảy đổi bên trong mảng
      pathname: '/review',
      state: {
        data: this.props.history.location.state?.data,
       masp: this.state.Api.MaSp
      }
    })


  }
  handleClose( event,reason){
    if (reason === 'clickaway') {
      return;
    }
    const data = this.state;
    data.Api.open=false;
    this.setState(data);
  };
  myFunction2(param)
  {
  
    const newData = this.state;   
    newData.MaXuatBan=param;
    newData.click=true;
    this.setState(newData);
    this.props.history.replace({
      pathname: '/',
      state: {
        data: this.props.history.location.state?.data,//truyen lai customer vì nó không phải biến state nên không được lưu lại
       xuatban: this.state.MaXuatBan
      }
    })
  }
  
   callback=(data2) =>{ 
    const newData = this.state;
    const data1 = this.props.history.location.state?.chude;
      const data = this.props.history.location.state?.xuatban;
    if(newData.book.length === 0 || newData.click)
{
newData.text="";
    if(data1!=undefined)
    {
      newData.text="sách theo chủ đề";
    }
    if(data!=undefined)
    {
      newData.text="sách theo nhà xuất bản";
    }
    this.setState(newData);
}
    if(data2.message)
    {     
          newData.Api.message=data2.message;
      newData.click=false;
    newData.Api.open=true;
          newData.Api.severity="error";
      this.setState(newData);
      
    }  else{
      const newData = this.state;   // {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
      newData.book=data2;
      newData.click=false;
      this.setState(newData);
      //vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
      //cập nhật lại dư liệu của cái trạng thái      
      
    }
   
    }
    
    callback1=(data)=>{ 
    
           const newData = this.state;// {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
        newData.ChuDe=data;
       
        //vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
        this.setState(newData);//cập nhật lại dư liệu của cái trạng thái      
      
      }
      callback2=(data)=>{ 
    
           const newData = this.state;// {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
        newData.XuatBan=data;
        //vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
        this.setState(newData);//cập nhật lại dư liệu của cái trạng thái      
      
      }
    checkdata()
    { 
    const data = this.props.history.location.state?.data;//nhan data tu trang khac
    
    if(data === null || data === undefined)
    {
      this.props.history.push("/authenticate");/*cach chuyen qua 1 trang khac */
    }
  }   
callapi()
    {
      const newData=this.state;
      const data1 = this.props.history.location.state?.chude;
      const data = this.props.history.location.state?.xuatban;
if(newData.book.length === 0 || newData.click)
{  
let url="https://localhost:5001/Values/getCDVaNXB";
  if(data1 != undefined){
url=`${url}?macd=${data1}`;
  }
  if(data != undefined){
    url=`${url}?maxb=${data}`;
  }
      FetchApi('GET', url, 
      { 'Content-Type': 'application/json' },null, this.callback);
}
    }
    callChuDe()
    {
      if(this.state.ChuDe.length === 0)
      {
        FetchApi('GET', 'https://localhost:5001/Values/getChuDe', 
  { 'Content-Type': 'application/json' },null, this.callback1);
} 
  }
    callXuatBan()
    {
      if(this.state.XuatBan.length === 0)
      {
    FetchApi('GET', 'https://localhost:5001/Values/getMaNXB', 
  { 'Content-Type': 'application/json' },null, this.callback2);
    }
  }
   //ham được goi trong render luôn luôn cập nhật 
  render () {
    const cus=this.props.history.location.state?.data;
let that=this;
   //console.log(cus);
    this.checkdata();
    this.callapi();
    this.callChuDe();
    this.callXuatBan();
    return (
      <div>
          <FormName book = {this.state.book} customer = {cus} ChuDe = {this.state.ChuDe} XuatBan = {this.state.XuatBan}
           selectCd={this.props.history.location.state?.chude} selectXb = {this.props.history.location.state?.xuatban}
          text={this.state.text} myFunction1={this.myFunction1} myFunction3={this.myFunction3} myFunction2={this.myFunction2}/>        
         <Snackbar open={that.state.Api.open} autoHideDuration={3000}  onClose={this.handleClose} >
         <Alert onClose={this.handleClose} severity={that.state.Api.severity}>
           {that.state.Api.message}
         </Alert>
         </Snackbar>
        </div>
    
    );
  }
}
//console.log() khi bỏ biến trạng thái vào thì sẽ bị lập
    function FormName(props){ 
      const classes = useStyles();
    let cde=props.ChuDe?.find(a => a.maChuDe === props.selectCd);
    let xban=props.XuatBan?.find(a => a.maNxb === props.selectXb);
 
    //<h3>{(cde||cde==null)?cde.tenChuDe:xban.tenXb}</h3>
   const handleTextFieldChange1=(value, i) => props.myFunction1(value);
   const handleTextFieldChange2=(value, i) => props.myFunction2(value);
   const handleTextFieldChange3=(value) => props.myFunction3(value);
    return (
      <div className={classes.root}>
  
        <h1>Hello, {props.customer?.Hoten}!</h1> 
       <h2>{ props.text}  {(cde)?.tenChuDe}  {(xban)?.tenXb }</h2>
     
     
      
        <Paper className={classes.paper}>
       
      Chủ đề 
      
           <MenuList>
        {props.ChuDe.map((data, i) =>        
          <MenuItem key={i} value={data.maChuDe} onClick={handleTextFieldChange1.bind(this, data.maChuDe, i)}>{data.tenChuDe}</MenuItem>          
                )}        
        </MenuList>
        Nhà xuất bản
        <MenuList>
        {props.XuatBan.map((data, i) =>        
          <MenuItem key={i} value={data.maNxb} onClick={handleTextFieldChange2.bind(this, data.maNxb, i)}>{data.tenXb}</MenuItem>          
                )}        
        </MenuList>
      
               
      </Paper>

       
      
        <GridList cellHeight={200} className={classes.gridList} cols={4}>
          <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {props.book.map((data) => (
            <GridListTile key={data.maSp}>
              <img src={data.anhBia} alt={data.tenSp} />
              <GridListTileBar
                title={data.tenSp}//ten của khung lơn trong ô, chú ý key khong được giống nhau 
                subtitle={<span>mô tả: {data.mota}</span>}//ten khung nho trong ô
                actionIcon={
                  <IconButton aria-label={`info about ${data.tensp}`} className={classes.icon} value={data.maSp}  onClick={handleTextFieldChange3.bind(this, data.maSp)}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
       
        
        </div>
        
    );
  }