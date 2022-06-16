import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === '';
const isFourChars = value => value.trim().length === 4;

const Checkout = (props) => {
  
     const [formInputValidity, setFormInputValidity] = useState({
       name: true,
       street: true,
       city: true,
       postal: true

     });

   
    const nameRefInput =  useRef();
    const streetRefInput =  useRef();
    const postalRefInput =  useRef();
    const cityRefInput =  useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

     const enteredName = nameRefInput.current.value;
     const enteredStreet = streetRefInput.current.value;
     const enteredPostal = postalRefInput.current.value;
     const enteredCity = cityRefInput.current.value;


     const enteredNameIsValid = !isEmpty(enteredName);
     const enteredStreetIsValid = !isEmpty(enteredStreet);
     const enteredCityIsValid = !isEmpty(enteredCity);
     const enteredPostalIsValid = isFourChars(enteredPostal);


     setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid
     })

    const formIsValid = enteredNameIsValid && enteredPostalIsValid; // Validacion


    if (!formIsValid) {
          return;
    }  

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city:  enteredCity
    });

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRefInput}/>
        {!formInputValidity.name && <p>Ingrese un nombre!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Dirección</label>
        <input type='text' id='street' ref={streetRefInput}/>
        {!formInputValidity.street && <p>Ingrese una direccion!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Codigo Postal</label>
        <input type='text' id='postal' ref={postalRefInput}/>
        {!formInputValidity.postal && <p>Ingrese un codigo postal valido!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>Ciudad</label>
        <input type='text' id='city' ref={cityRefInput}/>
        {!formInputValidity.city && <p>Ingrese una ciudad!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;