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
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
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
          },
          giohang:[],
          message:""
      };
      this.myFunction= this.myFunction.bind(this);
    }
    myFunction()
    {
      this.props.giohang=[1,2];
      this.props.onUpdate(this.props.giohang);      
      /*this.props.history.push({//history la 1 mảng ,replace thảy đổi bên trong mảng
        pathname: '/cart',
        state: {
          data: this.props.history.location.state?.data,
         masp: this.state.Api.MaSp
        }
      })*/
    }
    callback  = (data) => {   
 
    const newData = this.state;
    { 
      newData.info.MaSp = data.maSp;
      newData.info.TenSp = data.tenSp;
      newData.info.GiaBan = data.giaBan;
      newData.info.Mota = data.mota;
      newData.info.AnhBia = data.anhBia;
         this.setState(newData);
    }   
 
   }
    calldetail()
    {
      console.log(this.props);
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
            AnhBia ={this.state.info.AnhBia} myFunction={this.myFunction}/>}
        </div>

        );
    }
  }
  function Detail(props){ 
    const classes = useStyles();
    const handlechange = ()=> props.myFunction();
    return (
<div>
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
        <IconButton aria-label="add to favorites" onClick={handlechange} >
          <LocalGroceryStoreIcon />
        </IconButton>
        </CardActions>
     </Card>
</div>
    );
  }