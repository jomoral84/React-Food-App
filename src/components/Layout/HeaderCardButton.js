import classes from '../Layout/HeaderCardButton.module.css';
import CartIcon from '../Cart/CartIcon';



const HeaderCardButton = (props) => {
  return <button className={classes.button}>
   <span className={classes.icon}><CartIcon></CartIcon></span>
   <span>Tu Carrito</span>
   <span className={classes.badge}>3</span>


  </button>
};

export default HeaderCardButton;