import React,  { Component }  from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FetchApi from './../../src/Api';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
export class ManageBook extends React.Component {
  
    static displayName = ManageBook.name;
    constructor(props) {
      super(props);
      this.state=
      {
        book:[],
        ChuDe :[],
          XuatBan:[],
        soluong:1,
        SoLuongTon:0,
        MaSp:null,
       click:true,
       open1:false,
       open2:false,
       open3:false,
       isError:false,
       soluong:1,
          textError:"",
          
      }
      this.handleDelete=this.handleDelete.bind(this);
      this.handleClose=this.handleClose.bind(this);
      this.handleClickOpenDelete=this.handleClickOpenDelete.bind(this);
 this.handleClickOpenUpdate=this.handleClickOpenUpdate.bind(this);
   this.handleUpdate=this.handleUpdate.bind(this);
   this.handleTextFieldChange=this.handleTextFieldChange.bind(this);
  
   
    }
    handleClose()
    {
      const data= this.state;
      data.open1=false;
      data.open2=false;
      data.open3=false;
      this.setState(data);
    }
    
    handleTextFieldChange(param)
    {
      let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];
      let item = newData.find(a => a.MaSp == this.state.masp);
      const Data=this.state;
      if(param>item.SoLuongTon)
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
    handleDelete()
    {
      
      /*
      let item = newData.filter(a => a.MaSp !== this.state.masp);//filter là bộ lọc lọc ra có thể là một mảng .
      //cách làm thay vì xóa ta thục hiện tìm mã khác mã truyền lại và lọc mạng đó khac array ban đầu rồi ta set lại mảng đó    
      data.open1=false;
      data.click=true;
      this.setState(data);*/
      FetchApi('GET', '/Values/getCDVaNXB', 
        { 'Content-Type': 'application/json' },null, this.callback1);
    }
    callback1=(data)=>
    {
      const newData=this.state;
      newData.
    }
    
    handleClickOpenDelete(param)
    {
     
      const data= this.state;
      data.MaSp=param;
      data.open1=true;
      
      this.setState(data);
     
      }
    
      handleUpdate()
      {
       /* const dataState=this.state;
        let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];    
        let item=newData.find(a => a.MaSp == dataState.masp);
        if(item)
        {
          item.sl=dataState.soluong;
        }
       
        localStorage.setItem('giohang', JSON.stringify(newData));
        dataState.click=true;
        dataState.open2=false;
      
      this.setState(dataState);*/
      }
      handleClickOpenUpdate(param)
      {
     const data= this.state;
        let newData= JSON.parse(localStorage.getItem('UpdateManageBook')) ?? [];    
        let item=newData.find(a => a.MaSp == param);
        if(item)
        {
          data.soluong=item.sl;
          data.SoLuongTon=item.SoLuongTon;
          
        }
        localStorage.setItem('UpdateManageBook', JSON.stringify(newData));
      data.masp=param;
      data.open2=true;   
      this.setState(data);
      
      }
      
 
      checkdata()
    { /*
    const data = this.props.history.location.state?.data;//nhan data tu trang khac
    
    if(data === null || data === undefined)
    {
      this.props.history.push("/authenticate");//cach chuyen qua 1 trang khac 
    }*/
  } 
  callback = (data)=>
  {
      const newData=this.state;
      newData.book=data;
      this.setState(newData);
  }
  callapi()
  {
    if(this.state.book.length == 0)
      {
        FetchApi('GET', '/Values/getCDVaNXB', 
        { 'Content-Type': 'application/json' },null, this.callback);
      }
    
  }

   //ham này chỉ chạy khi trước render.hàm này trong react
      
  //trong nay khoong duoc de ham lien quang den state
    //newData.reduce((total,i) => total+i.sl*i.GiaBan,0) total 1 biến i là phân tử thứ i, reduce là giảm , 0 là giá trị ban đầu 
  render(){
    this.checkdata();
    this.callapi();


return(
  <div>
            {this.state.click &&<ShowCart  book={this.state.book} handleDelete={this.handleDelete} handleClickOpenDelete={this.handleClickOpenDelete} handleClose={this.handleClose} handleDeleteAll={this.handleDeleteAll}
            handleClickOpenUpdate = {this.handleClickOpenUpdate} handleClickOpenUpdate={this.handleClickOpenUpdate} handleUpdate={this.handleUpdate} handleTextFieldChange={this.handleTextFieldChange}
            open1={this.state.open1} open2={this.state.open2} open3={this.state.open3} isError={this.state.isError} textError={this.state.textError} SoLuongTon={this.state.SoLuongTon} masp={this.state.masp}
            soluong={this.state.soluong} />}
        </div>

);
}    
    
}
function ShowCart(props){
  const classes = useStyles();
  let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];
  let tax=0.1;
  const handleClickOpenDelete=(value) => props.handleClickOpenDelete(value);
const handleDelete =() => props.handleDelete();
 const handleClose = () => props.handleClose();
const handleClickOpenUpdate=(value) => props.handleClickOpenUpdate(value);
const handleTextFieldChange =(e) =>props.handleTextFieldChange(e.target.value);
const handleUpdate=()=>props.handleUpdate();
return (
  
  <div>
  
    <Dialog
        open={props.open1}
        
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"cảnh báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có muốn xóa mặt hàng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            không
          </Button>
          <Button onClick={handleDelete} color="primary">
            có
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={props.open2} onClose={handleClose} aria-labelledby="form-dialog-title">      
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
            label={props.masp}
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
<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Mã sản phẩm</StyledTableCell>
          <StyledTableCell align="right">Tên sản phẩm</StyledTableCell>
          <StyledTableCell align="right">Giá Bán</StyledTableCell>
          <StyledTableCell align="right">Mô tả</StyledTableCell>
          <StyledTableCell align="right">Ngày Cập Nhật</StyledTableCell>     
          <StyledTableCell align="right">Ảnh</StyledTableCell>           
          <StyledTableCell align="right">Số Lượng Tồn</StyledTableCell>
          <StyledTableCell align="right">Tên Chủ Đề</StyledTableCell>
          <StyledTableCell align="right">Tên Nhà Xuất Bản</StyledTableCell>
          <StyledTableCell align="right">Thao Tác</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.book.map((row) => (
          <StyledTableRow key={row.maSp}>
            <StyledTableCell  scope="row">
              {row.maSp}
            </StyledTableCell>
            <StyledTableCell align="right">{row.tenSp}</StyledTableCell>
            <StyledTableCell align="right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(row.giaBan) }</StyledTableCell>
            <StyledTableCell align="right">{row.mota}</StyledTableCell>
            <StyledTableCell align="right">{new Date(row.ngayCapNhat).toLocaleDateString()}</StyledTableCell>
            <StyledTableCell align="right" ><img  width="60"height="60"src={row.anhBia} /></StyledTableCell>
            <StyledTableCell align="right">{row.soLuongTon}</StyledTableCell>
            <StyledTableCell align="right">{row.maChuDe}</StyledTableCell>
            <StyledTableCell align="right">{row.maNxb}</StyledTableCell>
            <StyledTableCell align="right">
              
        <Tooltip title="Xóa">
<IconButton aria-label="delete" value={row.maSp} onClick={handleClickOpenDelete.bind(this,row.maSp)}  >
          < DeleteIcon />
        </IconButton>     
        </Tooltip>
        <Tooltip title="Cập Nhật Số Lượng">
<IconButton aria-label="update" value={row.maSp} onClick={handleClickOpenUpdate.bind(this,row.maSp)}  >
          < EditIcon />
        </IconButton>     
        
        </Tooltip>
        </StyledTableCell>
          </StyledTableRow>
        ))}
        
      </TableBody>

    </Table>
  </TableContainer>
  </div>
  
);
}