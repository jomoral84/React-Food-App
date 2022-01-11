import React , { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../UI/Input';


const MealItemForm = (props) => {

     const [amountisValid, setAmountIsValid] = useState(true);
      

    const amountInputRef = useRef();
   
 
    const submitHandler = (event) => {
        event.preventDefault(); 

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;     // Convierte el type "number" String a un numero entero
    
      if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5)  {     // Validacion del formulario
        setAmountIsValid(false);  
        return;
      }
   
       props.onAddToCart(enteredAmountNumber);
   
    }




    return (
       <form className={classes.form} onSubmit={submitHandler}>
          <Input
              ref={amountInputRef} 
              label="Cantidad" input={{
              id: 'amount_' + props.id,
              type: 'number',
              min: '1',
              max: '5',
              step: '1',
              defaultValue: '1'

          }}/>
        
        <button>+ Añadir</button>
        {!amountisValid && <p>Ingrese una cantidad valida (1-5)</p>}


       </form>
    )
}

export default MealItemForm;
