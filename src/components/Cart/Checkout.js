import React from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {

const confirmHandler = (event) => {
    event.preventDefault();
}


return <form onSubmit={confirmHandler}>
   <div className={classes.control}>
      <label htmlFor="name">Nombre</label>
      <input type="text" id="name"></input>
    </div>
    <div className={classes.control}>
      <label htmlFor="address">Direccion</label>
      <input type="text" id="address"></input>
    </div>
    <div className={classes.control}>
      <label htmlFor="postal">Codigo Postal</label>
      <input type="text" id="postal"></input>
    </div>
    <div className={classes.control}>
      <label htmlFor="city">Ciudad</label>
      <input type="text" id="city"></input>
    </div>
    <button type="button" onClick={props.onCancel}>Cancelar</button>
    <button>Confirmar</button>

</form>

};


export default Checkout;