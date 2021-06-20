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
      book :[],
     Api: {
    message:""

    },
    ChuDe :[],
    XuatBan:
    { MaNxb:null,   
      TenXb:""
    }
  }
  this.handleClose=this.handleClose.bind(this);
}
  handleClose( event,reason){
    if (reason === 'clickaway') {
      return;
    }
    const data = this.state;
    data.customer.open=false;
    this.setState(data);
  };
   callback=(data) =>{ 
      
    if(data.message)
    {     
          
    }  else{
         const newData = this.state;// {...items}còn là 1 bộ hẹn giờ nếu ta không kèm theo điều kiện thì nó sẽ lập vô hạn      
      newData.book=data;//vì items ban đầu chưa có gì nên ta phả gán newData.contacts=data để truyền data vào      
      this.setState(newData);//cập nhật lại dư liệu của cái trạng thái      
      
    }
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
    FetchApi('GET', 'https://localhost:5001/Values/getCDVaNXB', 
  { 'Content-Type': 'application/json' },null, this.callback);
    }
    
  render () {
    const cus=this.props.history.location.state?.data;
   //console.log(cus);
    this.checkdata();
    this.callapi();
    return (
      <div>
          <FormName book = {this.state.book} customer={cus} ChuDe={this.state.ChuDe}/>        
          
        </div>
    
    );
  }
}
//console.log() khi bỏ biến trạng thái vào thì sẽ bị lập
    function FormName(props){ 
      const classes = useStyles();
   
    return (
      <div>
      <div>
        <h1>Hello, {props.customer?.Hoten}!</h1> 
        </div>  
        <div>
        <Paper className={classes.paper}>
        {props.ChuDe.map((data) => (
        <MenuList>
          <MenuItem >{data.tenChuDe}</MenuItem>          
        </MenuList>
        ))}
      </Paper>

        </div>
        <div className={classes.root}>
      
        <GridList cellHeight={200} className={classes.gridList} cols={4}>
          <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {props.book.map((data) => (
            <GridListTile key={data.maSp}>
              <img src={data.anhBia} alt={data.tensp} />
              <GridListTileBar
                title={data.tensp}//ten của khung lơn trong ô, chú ý key khong được giống nhau 
                subtitle={<span>mô tả: {data.mota}</span>}//ten khung nho trong ô
                actionIcon={
                  <IconButton aria-label={`info about ${data.tensp}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>    
        
        </div>
        
    );
  }

