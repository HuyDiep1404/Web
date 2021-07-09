import React, { Component } from 'react';
import { Route } from 'react-router';
import { Redirect,Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Authenticate } from './components/Authenticate';
import { Create } from './components/Create';
import { Review } from './components/Review';
import { Cart } from './components/Cart';
import { HistoryBill } from './components/HistoryBill';
import { Payment } from './components/Payment';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import StepConnector from '@material-ui/core/StepConnector';
import PaymentIcon from '@material-ui/icons/Payment';
import './custom.css';
import PersonIcon from '@material-ui/icons/Person';
import DetailsIcon from '@material-ui/icons/Details';
import clsx from 'clsx';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);


export default class App extends Component {
  static displayName = App.name;
  constructor(props) {
    super(props);
    this.state={
      count :0,
      activeStep:0,
      arr:[]
      
    };
   this.onCart=this.onCart.bind(this);
   this.onStep=this.onStep.bind(this);
  // this.onStep1=this.onStep1.bind(this);
   //this.onStep2=this.onStep2.bind(this);
  
  }
    handle()
      {  
        this.state.count=JSON.parse(localStorage.getItem('giohang'))?.length;
             

      }
      
      
      onCart(param){
        this.setState({count :param});
      }
      onStep(param){
        this.setState({activeStep :param});
      }
     /*onStep1(param){
        this.setState({activeStep :param});
      }
       onStep2(param){
        this.setState({activeStep :param});
      }*/
      
     
   

  render () {
    this.handle();
    const arr=['Login','Home' ,'Book', 'Cart', 'Payment'];
    return (
      <Layout>

        <div> 
          <FormName steps={arr} activeStep={this.state.activeStep} />
          <Tooltip title="Xem Giỏ Hàng">
          <Link to="/cart">
        <IconButton aria-label="cart" >
      <StyledBadge badgeContent={this.state.count} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
    </Link>
      </Tooltip>
         </div>
         
        <Route exact path='/' render={(props) => <Home onStep={this.onStep}  {...props} />} />
        <Route path='/counter' component={Counter} />
        <Route path='/authenticate' component={Authenticate} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/create' component={Create} />
        <Route path='/review' render={(props) => <Review onStep={this.onStep} onCart={this.onCart} {...props} />} />
        <Route path='/cart' render={(props) => <Cart onStep={this.onStep} onCart={this.onCart}  {...props} />} />
        <Route path='/payment' render={(props) => <Payment onStep={this.onStep}  onCart={this.onCart} {...props} />} />
        <Route path='/hisrotyBill' component={HistoryBill} />
      </Layout>
    );
  }
}
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon />,
    2: <HomeIcon />,
    3: <MenuBookIcon />,
    4: <AddShoppingCartIcon />,
    5: <PaymentIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function FormName(props){
  const steps = props.steps;
  let newData= JSON.parse(localStorage.getItem('steps'))?? [];
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={props.activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
     
    </div>
  );
}
