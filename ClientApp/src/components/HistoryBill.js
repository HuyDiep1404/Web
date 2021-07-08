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
export class HistoryBill extends React.Component {
  
    static displayName = HistoryBill.name;
    constructor(props) {
      super(props);
      this.state=
      {
        bill:[]
      }
    }
    /*handlesubmit(data)
    {
     
      if(data)
      {
        FetchApi('GET',`/Values/historychitiet?mahd=${data}`,
        { 'Content-Type': 'application/json' },null, this.callback)
      }

    }*/
    callback=(data)=>{
        const newData=this.state;
        newData.bill=data;
        this.setState(data);
    }
    callhistory()
    {
     
      if(this.state.bill.length === 0){
        FetchApi('GET','/Values/historydonhang',
        { 'Content-Type': 'application/json' },null, this.callback);
      }
        
    }
    render()
    {
        this.callhistory();
        return(
            <div><ShowHistory bill={this.state.bill}
            />
             
            </div>
        );
      
    }
}
function ShowHistory(props){
    const classes = withStyles();
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
            <TableRow key={row.maHoaDon}>
              <TableCell component="th" scope="row">
                {row.maHoaDon}
              </TableCell>
              <TableCell align="right">{new Date(row.ngayTao).toLocaleDateString()}</TableCell>
              <TableCell align="right">{new Date(row.ngayGiao).toLocaleDateString()}</TableCell>
              <TableCell align="right">{!row.dathanhtoan?"đã hủy":row.tinhtranggiaohang?"đơn đang được giao":"đã thanh toán "}</TableCell>
              <TableCell align="right">
              {<Button variant="contained" color="primary" disabled={row.dathanhtoan&&row.tinhtranggiaohang?true:false} >
          Huỷ Đơn 
        </Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
}