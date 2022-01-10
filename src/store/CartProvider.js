import { useReducer } from 'react';

import React from 'react';
import CardContext from './cart-context';


const defaultCartState = {
   items: [],
   totalAmount: 0
}


 const cartReducer = (state, action) => {
if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
       items: updatedItems,
       amount: updatedTotalAmount
    }
}

    return defaultCartState;
 }


const CartProvider = (props) => {
   
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


   const addItemHandler = (item) => { 
      dispatchCartAction({type: 'ADD', item: item})
   };

  const removeItemHandler = (id) => {
   dispatchCartAction({type: 'REMOVE', id: id})
  };
   


   const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemHandler,
      removeItem: removeItemHandler,


   }

    return (
       <CardContext.Provider value={cartContext}>

           {props.children}
       </CardContext.Provider>
    )
}

export default CartProvider
