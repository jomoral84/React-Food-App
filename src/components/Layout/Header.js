import React, { Fragment } from 'react';
import mealsImage from '../../assets/meals2.jpg';
import classes from './Header.module.css';
import HeaderCartButton from '../Layout/HeaderCartButton';

const Header = (props) => {
    return ( 
    <Fragment >
        <header className = { classes.header } >
        <h1> React Food Order App </h1> 
        <HeaderCartButton onClick = { props.onShowCart } > </HeaderCartButton> 
        </header> 
        <div className = { classes['main-image'] } >
        <img src = {mealsImage} alt=''/> 
        </div> 
        </Fragment>
    );
}


export default Header;