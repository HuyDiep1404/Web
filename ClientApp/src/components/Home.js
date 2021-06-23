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
      
     Api: {
    message:"",

    },
    ChuDe :[]
      
  ,
    XuatBan:[]
    
  }
  this.myFunction1 = this.myFunction1.bind(this);
  this.myFunction2 = this.myFunction2.bind(this);
  this.handleClose = this.handleClose.bind(this);
}
  handleClose( event,reason){
    if (reason === 'clickaway') {
      return;
    }
    const data = this.state;
    data.customer.open=false;
    this.setState(data);
  };


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
 
  
  myFunction2(param)
  {
    const newData = this.state;   
    newData.MaXuatBan=param;
    newData.click=true;
    this.setState(newData);
    this.props.history.replace({
      pathname: '/',
      state: {
        data: this.props.history.location.state?.data,
       xuatban: this.state.MaXuatBan
      }
    })
  }
   callback=(data) =>{ 
      
    if(data.message)
    {     
          
    }  else{
         const newData = this.state;// {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
      newData.book=data;
      
      //vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
      this.setState(newData);//cập nhật lại dư liệu của cái trạng thái      
      
    }
    }
    
    callback1=(data)=>{ 
    
           const newData = this.state;// {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
        newData.ChuDe=data;
       
        //vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
        this.setState(newData);//cập nhật lại dư liệu của cái trạng thái      
      
      }
      callback2=(data)=>{ 
    
           const newData = this.state;// {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
        newData.XuatBan=data;
        //vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
        this.setState(newData);//cập nhật lại dư liệu của cái trạng thái      
      
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
      const data1 = this.props.history.location.state?.chude;
      const data = this.props.history.location.state?.xuatban;
if(data1 != null && this.state.click == true )
{
  const data=this.state;
  data.click=false;
  this.setState(data);
      FetchApi('GET', `https://localhost:5001/Values/getCDVaNXB?macd=${data1}`, 
      { 'Content-Type': 'application/json' },null, this.callback);
}
if(data != null && this.state.click == true )
{
  const data=this.state;
  data.click=false;
  this.setState(data);
  FetchApi('GET', `https://localhost:5001/Values/getCDVaNXB?manxb=${data}`, 
  { 'Content-Type': 'application/json' },null, this.callback);
}

  if(this.state.book.length == 0)
  {
  FetchApi('GET', 'https://localhost:5001/Values/getCDVaNXB', 
  { 'Content-Type': 'application/json' },null, this.callback);
  }
  

    }
    callChuDe()
    {
      if(this.state.ChuDe.length == 0)
    FetchApi('GET', 'https://localhost:5001/Values/getChuDe', 
  { 'Content-Type': 'application/json' },null, this.callback1);
    
  }
    callXuatBan()
    {
      if(this.state.XuatBan.length == 0)
      {
    FetchApi('GET', 'https://localhost:5001/Values/getMaNXB', 
  { 'Content-Type': 'application/json' },null, this.callback2);
    }
  }
   //ham được goi trong render luôn luôn cập nhật 
  render () {
    const cus=this.props.history.location.state?.data;

   //console.log(cus);
    this.checkdata();
    this.callapi();
    this.callChuDe();
    this.callXuatBan();
    return (
      <div>
          <FormName book = {this.state.book} customer = {cus} ChuDe = {this.state.ChuDe} XuatBan = {this.state.XuatBan}
           selectCd={this.props.history.location.state?.chude}
           myFunction1={this.myFunction1} myFunction2={this.myFunction2}/>        
         
        </div>
    
    );
  }
}
//console.log() khi bỏ biến trạng thái vào thì sẽ bị lập
    function FormName(props){ 
      const classes = useStyles();
      const cde=props.Chude?.find(a => a.maChuDe === props.selectCd);
   const handleTextFieldChange1=(value, i) => props.myFunction1(value);
   const handleTextFieldChange2=(value, i) => props.myFunction2(value);
    return (
      <div className={classes.root}>
  
        <h1>Hello, {props.customer?.Hoten}!</h1> 
        <h2>
      {cde?.tenChuDe }</h2>
       
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
                title={data.tensp}//ten của khung lơn trong ô, chú ý key khong được giống nhau 
                subtitle={<span>mô tả: {data.mota}</span>}//ten khung nho trong ô
                actionIcon={
                  <IconButton aria-label={`info about ${data.tensp}`} className={classes.icon}>
                    <InfoIcon  />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
       
        
        </div>
        
    );
  }

