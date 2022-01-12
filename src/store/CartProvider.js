import { useReducer } from 'react';

import React from 'react';
import CardContext from './cart-context';


const defaultCartState = {
    items: [],
    totalAmount: 0
}


const cartReducer = (state, action) => {



    if (action.type === 'ADD') {

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemsIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemsIndex];

        let updatedItem;

        let updatedItems;

        if (existingCartItem) { // Si existen items en el carrito
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items];
            updatedItems[existingCartItemsIndex] = updatedItem;

        } else {

            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            amount: updatedTotalAmount,
        }
    }

    return defaultCartState;
}


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item })
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };



    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,


    }

    return ( <
        CardContext.Provider value = { cartContext } >

        { props.children } <
        /CardContext.Provider>
    )
}

export default CartProvider