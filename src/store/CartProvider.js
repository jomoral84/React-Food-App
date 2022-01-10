import React from 'react';
import CardContext from './cart-context';

const CartProvider = (props) => {

   const addItemHandler = (item) => {};

  const removeItemHandler = (id) => {};
   


   const cartContext = {
      items: [],
      totalAmount: 0,
      addItem: addItemHandler,
      removeItem: removeItemHandler,


   }

    return (
       <CardContext.Provider>

           {props.children}
       </CardContext.Provider>
    )
}

export default CartProvider
