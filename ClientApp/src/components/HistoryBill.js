import React,  { Component }  from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
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
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.aqua,
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

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
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
        click:false,
        page:0,
        rowsPerPage:5,
        cir:true,
      }
       this.handleCancel=this.handleCancel.bind(this);
       this.handleClose=this.handleClose.bind(this);
       this.handleChangePage=this.handleChangePage.bind(this);
       this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this);
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
        newData.cir=false;
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
    handleChangePage (event, newPage){
      console.log(event,newPage);
       const newData=this.state;
       newData.page=newPage;
       this.setState(newData)
      
    };
     handleChangeRowsPerPage (event) {
       console.log(event);
       const newData=this.state;
       newData.rowsPerPage=(parseInt(event,10));
       newData.page=0;
       this.setState(newData);
      
    };
    callhistory()
    {
      const data = this.props.history.location.state?.data;//nhan data tu trang khac
    
      if(data === null || data === undefined)
      {
      if(this.state.bill.length === 0||this.state.click){
        FetchApi('GET',`/Values/historydonhang?makh=${data.MaKh}`,
        { 'Content-Type': 'application/json' },null, this.callback);
      }
    }
        
    }
    render()
    {
      let that=this;
      console.log(this.state.bill.length);
        this.callhistory();
        return(
            <div>
              {(this.state.bill.length > 0) && <ShowHistory bill={this.state.bill} handleCancel={this.handleCancel}
            page={this.state.page} rowsPerPage={this.state.rowsPerPage} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
        }
        {that.state.cir && <CircularProgress />}  
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
    const classes = useStyles();
    const handleCancel = (value) =>props.handleCancel(value);
    const handleChangePage=(e,newpage)=> {
      console.log(newpage);
      props.handleChangePage(e,newpage);}
    const handleChangeRowsPerPage=(e)=>{
      console.log(e.target);
      props.handleChangeRowsPerPage(e.target.value);}
    const white = {
      backgroundColor: 'white'
      }
      
      const gray ={
      backgroundColor: 'gray'
      }
    return(
      <div className={classes.root}>
    
<TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Mã đơn hàng</StyledTableCell>
            <StyledTableCell align="right">Ngày Tạo</StyledTableCell>
            <StyledTableCell align="right">Ngày Giao</StyledTableCell>
            <StyledTableCell align="right">Tình trạng</StyledTableCell>
            <StyledTableCell align="right">Thao Tác</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(props.bill.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
          ).map((row, index) => (
            <TableRow key={index} style={!row.dathanhtoan ? gray : white}  >
              <StyledTableCell component="th" scope="row">
                {row.maHoaDon}
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(row.ngayTao).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.ngayGiao).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{row.dathanhtoan?(row.tinhtranggiaohang?"Đã giao":"Đã thanh toán"):"Đã hủy"}</StyledTableCell>
              <StyledTableCell align="right">
                
              {(row.dathanhtoan && !row.tinhtranggiaohang)&&<Tooltip title="Hủy">
<IconButton aria-label="update" value={row.maHoaDon} onClick={handleCancel.bind(this,row.maHoaDon)}  >
          < DeleteIcon />
        </IconButton>
        
        </Tooltip>}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.bill.length}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
       
        </div>
    );
}