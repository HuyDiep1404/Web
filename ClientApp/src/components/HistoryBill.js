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
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Alert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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
      table: {
        minWidth: 650,
      },
    },
  }))(TableRow);
export class HistoryBill extends React.Component {
  
    static displayName = HistoryBill.name;
    constructor(props) {
      super(props);
      this.state=
      {
        bill:[],
        open:false,
        severity:"",
        message:"",
        click:false
      }
       this.handleCancel=this.handleCancel.bind(this);
       this.handleClose=this.handleClose.bind(this);
    }
  
    handleCancel(value)
    {
      FetchApi('GET',`/Values/updateBill?mahd=${value}`, 
      { 'Content-Type': 'application/json' },null, this.callback1);
    }
    callback1=(data)=>{
      const newData=this.state;
      newData.open=true;
      if(data.dathanhtoan==false)
      {
        newData.click=true;
        newData.message=data.message;
        newData.severity="success";
        this.setState(newData);
      }
      else
      {
        newData.click=false;
        newData.severity="error";
        newData.message=data.message;
        this.setState(newData);
      }
    }
    callback=(data)=>{
        const newData=this.state;
        newData.bill=data;
        newData.click=false;
        this.setState(data);
    }
    handleClose( event,reason){
      if (reason === 'clickaway') {
        return;
      }
      const data = this.state;
      data.open=false;
      this.setState(data);
    };
  
    callhistory()
    {
     
      if(this.state.bill.length === 0||this.state.click){
        FetchApi('GET','/Values/historydonhang',
        { 'Content-Type': 'application/json' },null, this.callback);
      }
        
    }
    render()
    {
      let that=this;
        this.callhistory();
        return(
            <div>
              <ShowHistory bill={this.state.bill} handleCancel={this.handleCancel}
            />
            <Snackbar open={that.state.open} autoHideDuration={3000}  onClose={this.handleClose} >
         <Alert onClose={this.handleClose} severity={that.state.severity}>
           {that.state.message}
         </Alert>      
       </Snackbar>
             
            </div>
        );
      
    }
}
function ShowHistory(props){
    const classes = withStyles();
    const handleCancel = (value) =>props.handleCancel(value);
    const white = {
      backgroundColor: 'white'
      }
      
      const blue ={
      backgroundColor: 'blue'
      }
    return(
        <div>
<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell align="right">Ngày Tạo</TableCell>
            <TableCell align="right">Ngày Giao</TableCell>
            <TableCell align="right">Tình trạng</TableCell>
            <TableCell align="right">Thao Tác</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.bill.map((row) => (
            <TableRow key={row.maHoaDon} style={!row.dathanhtoan ? blue : white}  >
              <TableCell component="th" scope="row">
                {row.maHoaDon}
              </TableCell>
              <TableCell align="right">{new Date(row.ngayTao).toLocaleDateString()}</TableCell>
              <TableCell align="right">{new Date(row.ngayGiao).toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.dathanhtoan?(row.tinhtranggiaohang?"đơn đang được giao":"đã thanh toán "):"đã hủy"}</TableCell>
              <TableCell align="right">
                
              {(row.dathanhtoan && !row.tinhtranggiaohang)&&<Tooltip title="Hủy">
<IconButton aria-label="update" value={row.maHoaDon} onClick={handleCancel.bind(this,row.maHoaDon)}  >
          < DeleteIcon />
        </IconButton>
        
        </Tooltip>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
}