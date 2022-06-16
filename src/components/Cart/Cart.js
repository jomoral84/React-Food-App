import { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import React from 'react';


const Cart = (props) => {

    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount =  `$${cartCtx.totalAmount.toFixed(2)}`;     // Expresion Javascript para expresiones decimales 
    
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
             cartCtx.removeItem(id);
    };

    const cartItemAddhandler = (item) => {
       cartCtx.addItem({...item, amount: 1});
    };


    const submitOrderHandler = async (userData) => {          // Envia la orden del pedido a la base de Firebase
        setIsSubmitting(true);
          await fetch('https://react-udemy-adb94-default-rtdb.firebaseio.com/orders.json', {   
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
           })
           setIsSubmitting(false);
           setDidSubmit(true);
           cartCtx.clearCart();
    }

 
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


    const cartModalContent = 
    <React.Fragment>
         {cartItems}
            <div className={classes.total}>
                <span>Valor Total</span>
                <span>{totalAmount}</span>
             </div>
            {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/> }
            {!isCheckOut && modalActions}
          </React.Fragment>


    const isSubmittingModalContent = <p>Enviando Datos...</p>;
    
    const didSubmittingModalContent = 
       <React.Fragment>
        <p>Orden Enviada Correctamente!</p>
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Cerrar</button>
        </div>
        </React.Fragment>

    return (
         <Modal onClose={props.onClose}>
          {!isSubmitting && !didSubmit && cartModalContent}
          {isSubmitting && isSubmittingModalContent}
          {!isSubmitting && didSubmit && didSubmittingModalContent}
            </Modal>
    )
};

export default Cart;
