import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Authenticate } from './components/Authenticate';
import { Create } from './components/Create';
import { Review } from './components/Review';
import { Cart } from './components/Cart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";


import './custom.css'
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);
export default class App extends Component {
  static displayName = App.name;
  constructor(props) {
    super(props);
    this.state={
      count :0
      
    };
   this.onCart=this.onCart.bind(this);
   this.showCart=this.showCart.bind(this);
  }
    handle()
      {  
        this.state.count=JSON.parse(localStorage.getItem('giohang')).length;
             

      }
      onCart(param){
this.setState({count :param});
      }
      showCart()
      {
        this.props.history.push("/cart");
      }
  


  render () {
    this.handle();
    return (
      <Layout>

        <div> <Tooltip title="Xem Giỏ Hàng">
        <IconButton aria-label="cart" onClick={this.showCart}>
      <StyledBadge badgeContent={this.state.count} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
      </Tooltip>
         </div>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/authenticate' component={Authenticate} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/create' component={Create} />
        <Route path='/review' render={(props) => <Review onCart={this.onCart} {...props} />} />
        <Route path='/cart' component={Cart} />
      </Layout>
    );
  }
}
