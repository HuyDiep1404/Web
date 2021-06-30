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
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { TextField } from '@material-ui/core';

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
export class Cart extends React.Component {
  
    static displayName = Cart.name;
    constructor(props) {
      super(props);
      this.state=
      {
        masp:null,
       click:true,
       open:false,
       isError:false,
       soluong:1,
          textError:""
      }
      this.handleDelete=this.handleDelete.bind(this);
      this.handleClose=this.handleClose.bind(this);
      this.handleClickOpenDelete=this.handleClickOpenDelete.bind(this);
   //this.handleClickOpenUpdate=this.handleClickOpenUpdate(this);
   //this.handleUpdate=this.handleUpdate(this);
    }
    handleClose()
    {
      const data= this.state;
      data.open=false;
      this.setState(data);

    }
    /*handleTextFieldChange(param)
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
      }*/
    handleDelete()
    {
      
      let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];
      let item = newData.filter(a => a.MaSp !== this.state.masp);//filter là bộ lọc lọc ra có thể là một mảng .
      //cách làm thay vì xóa ta thục hiện tìm mã khác mã truyền lại và lọc mạng đó khac array ban đầu rồi ta set lại mảng đó
      localStorage.setItem('giohang', JSON.stringify(item));
     
      const data= this.state;
      data.open=false;
      data.click=true;
      this.setState(data);
    }
    
    handleClickOpenDelete(param)
    {
      console.log(param);
      const data= this.state;
      data.masp=param;
      data.open=true;
      
      this.setState(data);
     
      }
     /* handleUpdate()
      {
        const dataState=this.state;
        let newData= JSON.parse(localStorage.getItem('giohang')) ?? [];    
        let item=newData.find(a => a.MaSp == dataState.masp);
        if(item)
        {
          item.sl=dataState.soluong;
        }
        newData.push(item);
        localStorage.setItem('giohang', JSON.stringify(newData));
        dataState.open=false;
      dataState.soluong=1;  
      this.setState(dataState);
      }
      handleClickOpenUpdate(param)
      {
      const data= this.state
      data.masp=param;
      data.open=true;   
      this.setState(data);
      }*/
    


      
      
  //trong nay khoong duoc de ham lien quang den state
    //newData.reduce((total,i) => total+i.sl*i.GiaBan,0) total 1 biến i là phân tử thứ i, reduce là giảm , 0 là giá trị ban đầu 
  render(){

return(
  <div>
            {this.state.click &&<ShowCart handleDelete={this.handleDelete} handleClickOpenDelete={this.handleClickOpenDelete} handleClose={this.handleClose}
            handleClickOpenUpdate={this.handleClickOpenUpdate} handleClickOpenUpdate={this.handleClickOpenUpdate} handleUpdate={this.handleUpdate}
            open={this.state.open} isError={this.state.isError} textError={this.state.textError} SoLuongTon={this.state.SoLuongTon} masp={this.state.masp}/>}
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
 //const handleClickOpenUpdate=(value) => props.handleClickOpenUpdate(value);
//const handleTextFieldChange=()=>props.handleTextFieldChange();
// const handleUpdate=()=>props.handleUpdate();
return (
  
  <div>
    
    <Dialog
        open={props.open}
        
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
<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Mã sản phẩm</StyledTableCell>
          <StyledTableCell align="right">Tên sản phẩm</StyledTableCell>
          <StyledTableCell align="right">Ảnh </StyledTableCell>
          <StyledTableCell align="right">Mô tả</StyledTableCell>         
          <StyledTableCell align="right">Số lượng</StyledTableCell>
          <StyledTableCell align="right">Giá Bán</StyledTableCell>
          <StyledTableCell align="right">Thành tiền</StyledTableCell>
          <StyledTableCell align="right">Thao tác</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {newData.map((row) => (
          <StyledTableRow key={row.MaSp}>
            <StyledTableCell  scope="row">
              {row.MaSp}
            </StyledTableCell>
            <StyledTableCell align="right">{row.TenSp}</StyledTableCell>
            <StyledTableCell align="right" ><img  width="60"height="60"src={row.AnhBia} /></StyledTableCell>
            <StyledTableCell align="right">{row.Mota}</StyledTableCell>
            <StyledTableCell align="right">{row.sl}</StyledTableCell>
            <StyledTableCell align="right">{row.GiaBan+" VND"}</StyledTableCell>
            <StyledTableCell align="right">{row.GiaBan*row.sl+" VND"}</StyledTableCell>
            <StyledTableCell align="right">
              
        <Tooltip title="Xóa">
<IconButton aria-label="delete" value={row.MaSp} onClick={handleClickOpenDelete.bind(this,row.MaSp)}  >
          < DeleteIcon />
        </IconButton>     
        </Tooltip>
        
        </StyledTableCell>
          </StyledTableRow>
        ))}
        <TableRow>
            <TableCell rowSpan={3} />
            
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{newData.reduce((total,i) => total+i.sl*i.GiaBan,0)+" VND"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">10%</TableCell>
            <TableCell align="right">{tax*newData.reduce((total,i) => total+i.sl*i.GiaBan,0)+" VND"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{Math.floor(1.1*newData.reduce((total,i) => total+i.sl*i.GiaBan,0))+" VND"}</TableCell>
          </TableRow>
      </TableBody>

    </Table>
  </TableContainer>
  </div>
  
);
}