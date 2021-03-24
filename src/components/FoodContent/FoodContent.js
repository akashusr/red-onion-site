import React from 'react';
import './FoodContent.css';
import { useState } from 'react';
import { useEffect } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { Link } from 'react-router-dom'; 

const FoodContent = (props) => {
    const [foods, setFoods] = useState([]);
    const [selectedFoodType, setSelectedFoodType] = useState("lunch");
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        fetch('https://glacial-woodland-72025.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setFoods(data);
            setCart(data);
        })
        
    }, [])

    const selectedFoods =  foods.filter(food => food.category === selectedFoodType).slice(0, 6);
    
    return (
        <div className="container">
            <nav>
                <ul className="nav justify-content-center">
                    <li onClick={() => setSelectedFoodType("breakfast")} className="nav-item">
                        <Link  to="/" className={selectedFoodType === "breakfast" ?  "active nav-link" : "nav-link"}>Breakfast</Link>
                    </li>
                    <li onClick={() => setSelectedFoodType("lunch")} className="nav-item">
                        <Link to="/" className={selectedFoodType === "lunch" ?  "active nav-link" : "nav-link"}>Lunch</Link>
                    </li>
                    <li onClick={() => setSelectedFoodType("dinner")} className="nav-item">
                        <Link to="/" className={selectedFoodType === "dinner" ?  "active nav-link" : "nav-link"}>Dinner</Link>
                    </li>
                </ul>
            </nav>
            <div className="row my-5">
                {
                    selectedFoods.map(food => <FoodItem key={food.id} handleFoodCart={props.handleFoodCart} food={food}></FoodItem>)
                }
            </div>
            <div className="text-center">
                {
                    props.cart.length ?
                    <Link to="/shipment">
                        <button  className="btn btn-danger btn-secondary">Check Out Your Food</button>
                    </Link>
                    :
                    <button disabled className="btn btn-secondary">Check Out Your Food</button>
                }
            </div>
        </div>
    );
};

export default FoodContent;