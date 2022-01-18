import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';


const Cart = (props) => {

    const cartCtx = useContext(CartContext);

   const totalAmount =  `$${cartCtx.totalAmount.toFixed(2)}`;     // Expresion Javascript para expresiones decimales 
    
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
             cartCtx.removeItem(id);
    };

    const cartItemAddhandler = (item) => {
       cartCtx.addItem({...item, amount: 1});
    };

 
     const cartItems = (<ul className={classes['cart-items']}> 
        {cartCtx.items.map((item) => <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        onAdd={cartItemAddhandler.bind(null, item)}></CartItem>)} </ul> );


    return (
         <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Valor Total</span>
                <span>{totalAmount}</span>
      
            </div>
            <div className={classes.actions}>
                 <button className={classes['button--alt']} onClick={props.onClose}>Cerrar</button>
                {hasItems &&  < button className={classes.button}>Ordenar</button> }  

            </div>
            </Modal>
    )
};

export default Cart;
