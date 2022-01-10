import React, { Fragment } from 'react';
import mealsImage from '../../assets/meals2.jpg';
import classes from './Header.module.css';
import HeaderCardButton from '../Layout/HeaderCardButton';

const Header = (props) => {
    return (
    <Fragment>
   <header className={classes.header}>
     <h1>React Food Order App</h1>
        <HeaderCardButton onClick={props.onShowCart}></HeaderCardButton>
   </header>
   <div className={classes['main-image']}>
       <img src={mealsImage} />
   </div>
    </Fragment>
    );
}


export default Header;