import { useReducer } from 'react';
import CardContext from './cart-context';


const defaultCartState = {
    items: [],
    totalAmount: 0,
}


const cartReducer = (state, action) => {



    if (action.type === 'ADD') {

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemsIndex = state.items.findIndex((item) => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemsIndex];

        let updatedItems;

        if (existingCartItem) { // Si existen items en el carrito
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemsIndex] = updatedItem;

        } else {

            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount, // Antes era amount: updatedTotalAmount y generaba un error
        }
    }

    if (action.type === 'REMOVE') {


        const existingCartItemsIndex = state.items.findIndex(item => item.id === action.id);

        const existingItem = state.items[existingCartItemsIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;

        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);

        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemsIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }


    if (action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;
};


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item })
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' })
    }



    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    }

    return ( <
        CardContext.Provider value = { cartContext } > { props.children } < /CardContext.Provider>
    )
}

export default CartProvider