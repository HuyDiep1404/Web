import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { isNonNullChain } from 'typescript';
import { useHistory } from "react-router-dom";
import FetchApi from './../../src/Api';
import Button from '@material-ui/core/Button';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import AddIcon from '@material-ui/icons/Add';
import { TextField, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],width:100
    },
  }));
  export class Review extends React.Component {
    static displayName = Review.name;
    constructor(props) {
      super(props);     
      this.state={
          info:{
            MaSp:null,
            TenSp:"",
           GiaBan:null,
            Mota:"",
            AnhBia:"",
            SoLuongTon:0
          },
          giohang:[],
          open:false,
          soluong:1,
          message:"",
          isError:false,
          textError:""

      };
      //this.myFunction= this.myFunction.bind(this);
      this.showCart= this.showCart.bind(this);
      this.backHome= this.backHome.bind(this);
      this.handleClickOpen= this.handleClickOpen.bind(this);
      this.handleClose= this.handleClose.bind(this);
      this.handleTextFieldChange=this.handleTextFieldChange.bind(this);
      this.handleUpdate=this.handleUpdate.bind(this);
      
      
    }
    onCart(){
      this.props.onCart(JSON.parse(localStorage.getItem('giohang')).length);
    }
    onStep(){
      this.props.onStep(2);
    }
    handleClickOpen(param)
    {
     
      const data = this.props.history.location.state?.data.MaKh;
      const Data=this.state;
      let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];
      let item=newData.find(a => a.MaSp == param && a.MaKh == data);
      if(item)
      {
        Data.soluong=item.sl;
      }
      
      Data.open=true;
      this.setState(Data);
    }
    handleClose()
    {
      const data=this.state;
      data.open=false;
      this.setState(data);
    }
 
    
    handleUpdate()
    {         
      
      const dataState=this.state;
      const masp = this.props.history.location.state?.masp;
      const  data= this.props.history.location.state?.data.MaKh;
      let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];    
      let item=newData.find(a => a.MaSp == masp && a.MaKh == data);
      if(item)
      {
        item.sl=dataState.soluong;
      }
      else
      {
        item ={
          MaSp:masp,
          sl:dataState.soluong,
          MaKh:data,
          TenSp:dataState.info.TenSp,
          GiaBan:dataState.info.GiaBan,
          Mota:dataState.info.Mota,
          AnhBia:dataState.info.AnhBia,
          SoLuongTon:dataState.info.SoLuongTon

        };
      
      newData.push(item);


      
      }
      
      localStorage.setItem('giohang', JSON.stringify(newData));
     this.onCart();
      dataState.open=false;
      dataState.soluong=1;  
      this.setState(dataState);
    }
    handleTextFieldChange(param)
    {
      const Data=this.state;
     
         if(param>Data.info.SoLuongTon)
      {
        Data.isError=true;
        Data.textError="vui lòng nhập lại số lượng vì số lượng vượt quá số lượng tồn";
      }
      else
      {
        Data.isError=false;
        Data.textError="";
        Data.soluong=param; 
      }
      this.setState(Data);
      }
     
      
      
    
   /* myFunction(param)
    {      
      const data = this.props.history.location.state?.data.MaKh;
      let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];
      let item=newData.find(a => a.MaSp == param && a.MaKh == data);
      if(item){
        item.sl++;
      }
      else{
        item ={
          MaSp:param,
          sl:1,
          MaKh:data
        };
        newData.push(item);
      }
     localStorage.setItem('giohang', JSON.stringify(newData));
     console.log(newData);
      }*/
      showCart()
      {
        this.props.history.push("/cart");
        /*this.props.history.push({
          pathname: '/cart',
          state: {
            data: this.state.giohang//truyen lai customer vì nó không phải biến state nên không được lưu lại
           
          }
        })*/
      }
      backHome()
      {
        
        this.props.history.replace({
          pathname: '/',
          state: {
             data : this.props.history.location.state?.data
          }
        })
      }

    
    

    callback  = (data) => {   
 
    const newData = this.state;
     
      newData.info.MaSp = data.maSp;
      newData.info.TenSp = data.tenSp;
      newData.info.GiaBan = data.giaBan;
      newData.info.Mota = data.mota;
      newData.info.AnhBia = data.anhBia;
      newData.info.SoLuongTon=data.soLuongTon;
         this.setState(newData);
         this.onStep();   
 
   }
    calldetail()
    {
      const masp = this.props.history.location.state?.masp;
        if(this.state.info.MaSp === null && masp != undefined )
        {
        FetchApi('GET', `https://localhost:5001/Values/getMaSP?masp=${masp}`, 
        { 'Content-Type': 'application/json' },null, this.callback);
        }
       /* else
        {
          this.props.history.replace("/");
        }*/
    }
    
    render () {
        this.calldetail();
        return(
        <div>
            {this.state.info.MaSp && <Detail MaSp={this.state.info.MaSp} TenSp={this.state.info.TenSp} GiaBan={this.state.info.GiaBan} Mota={this.state.info.Mota} 
            AnhBia ={this.state.info.AnhBia} soluong={this.state.soluong} open={this.state.open} isError={this.state.isError} textError={this.state.textError}
            SoLuongTon={this.state.info.SoLuongTon}
            myFunction={this.myFunction} showCart={this.showCart} backHome={this.backHome}
            handleUpdate={this.handleUpdate} handleClose={this.handleClose} handleTextFieldChange={this.handleTextFieldChange} 
            handleClickOpen={this.handleClickOpen}/>}
        </div>

        );
    }
  }
  function Detail(props){ 
    const classes = useStyles();
    const handlechange = (value)=> props.myFunction(value);
const handlechange1 = ()=>props.showCart();
const handlechange2 = ()=>props.backHome();
const handleClickOpen =(value) => props.handleClickOpen(value);
const handleTextFieldChange =(e) =>props.handleTextFieldChange(e.target.value);

const handleClose= () =>props.handleClose();
const handleUpdate= () =>props.handleUpdate();
    return (
<div>
<Button variant="contained" color="primary"  onClick={handlechange1}>
          Giỏ Hàng
        </Button> 
        <Button variant="contained" color="primary"  onClick={handlechange2}>
          Mua Tiếp
        </Button> 
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">      
        <DialogContent> 
        <DialogContentText>
           Số lượng còn lại trong kho {props.SoLuongTon}
          </DialogContentText>   
        <TextField onChange={handleTextFieldChange}    
            autoFocus
            margin="dense"
            id="name"
            defaultValue={props.soluong}
            type="number"
            label={props.MaSp}
            fullWidth
            error={props.isError}//bật câu cảnh báo
        helperText={props.textError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
          Accept
          </Button>
        </DialogActions>
      </Dialog>
<Card className={classes.root}>
      <CardHeader
        avatar={
<Avatar aria-label="recipe" className={classes.avatar}>
            {props.MaSp}
          </Avatar>
        }          
        
        title={props.TenSp}
        subheader={ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(props.GiaBan)}
      />
      <CardMedia
        className={classes.media}
        image={props.AnhBia}
        title={props.MaSp}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.Mota}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Tooltip title="Thêm Vào Giỏ Hàng">

        <IconButton aria-label="add to favorites" value={props.MaSp} onClick={handleClickOpen.bind(this,props.MaSp)}  >
          < LocalGroceryStoreIcon/>
        </IconButton>
        </Tooltip>
        
        </CardActions>
     </Card>
</div>
    );
  }