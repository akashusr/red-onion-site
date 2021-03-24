import React , { useState } from 'react';
import './FoodDetail.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Food from '../Food/Food';

const FoodDetail = (props) => {
    const {foodkey} = useParams();
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        fetch('https://glacial-woodland-72025.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            const newFood = data.find(fd => fd.key === foodkey);
            setFoods(newFood);
        })
        
    }, [])
    return (
        <div className="container">
            <Food food={foods}/>
        </div>
    );
};

export default FoodDetail;