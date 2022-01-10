import { useContext } from 'react';

import classes from '../Layout/HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';



const HeaderCartButton = (props) => {

   const cartCtx = useContext(CartContext);

   const numberOfCartItem = cartCtx.items.reduce((currentNumber, item ) => {
           return currentNumber + item.amount;
   }, 0);




  return (
   <button className={classes.button} onClick={props.onClick}>
   <span className={classes.icon}><CartIcon></CartIcon></span>
   <span>Tu Carrito</span>
   <span className={classes.badge}>{numberOfCartItem}</span>


  </button>  )
};

export default HeaderCartButton;