import React from 'react';
import classes from './MealItemForm.module.css';
import Input from '../UI/Input';


const MealItemForm = (props) => {
    return (
       <form className={classes.form}>
          <Input label="Cantidad" input={{
              id: 'cantidad_' + props.id,
              type: 'number',
              min: '1',
              max: '5',
              step: '1',
              defaultValue: '1'

          }}/>
        
        <button>+ Añadir</button>


       </form>
    )
}

export default MealItemForm;
