import { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) => {

    const [isCheckOut, setIsCheckOut] = useState(false);

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


    const orderHandler = () => {
            setIsCheckOut(true);
        }

        const modalActions = 
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Cerrar</button>
       {hasItems &&  <button className={classes.button} onClick={orderHandler}>Ordenar</button> }  
        </div>

    return (
         <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Valor Total</span>
                <span>{totalAmount}</span>
      
            </div>
            {isCheckOut && <Checkout onCancel={props.onClose}/> }
            {!isCheckOut && modalActions}
         
            </Modal>
    )
};

export default Cart;
