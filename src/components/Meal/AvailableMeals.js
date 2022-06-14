import React from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem';
import { useEffect, useState } from 'react';


  


// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.55,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//     {
//       id: 'm5',
//       name: 'Ensalada ',
//       description: 'Healthy',
//       price: 20.99,
//     },


//   ];



  const AvailableMeals = () => {

    const apiUrl = "https://react-udemy-adb94-default-rtdb.firebaseio.com/meals.json";   // Se cargan los datos de la base de Firebase
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);   // Manejo del loading con useState
    const [httpError, setHttpError] = useState();

  useEffect(() => {

    const fetchMeals = async () => {
      setIsLoading(true);

      const response = await fetch(apiUrl).then();

      if (!response.ok) {
        throw new Error('Error!');
      
      }


      const responseData = await response.json();
   
    const loadedMeals = [];

     for (const key in responseData) {
         loadedMeals.push({
           id: key,
           name: responseData[key].name,
           description: responseData[key].description,
           price: responseData[key].price
         });
     }

  setMeals(loadedMeals);
  setIsLoading(false);

 };
   

      fetchMeals().catch((error) => {     // Forma tradicional de manejar errores dentro de una promesa 
        setIsLoading(false);
        setHttpError(error.message);
      });
      
     }, [])
    
     
if (isLoading) {
  return (
    <section className={classes.MealsLoading}> <p>Cargando...</p></section>
  );
}

if (httpError) {
  return (
    <section className={classes.MealsError}> <p>Error en la carga</p></section>
  );
}



   const mealsList = meals.map((meal) => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>);

    return (
        <section className={classes.meals}>
            <Card>
            <ul>{mealsList}</ul>
            </Card>
         
        </section>
    )
}

export default AvailableMeals;
