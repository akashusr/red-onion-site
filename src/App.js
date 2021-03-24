import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import FoodContent from './components/FoodContent/FoodContent';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';
import FoodDetail from './components/FoodDetail/FoodDetail';
import { getDatabaseCart, addToDatabaseCart } from './utilities/databaseManager';
import { AuthContextProvider } from './components/Login/UseAuth';
import Inventory from './components/Inventory/Inventory';
import Shipment from './components/Shipment/Shipment';
import Features from './components/Features/Features';

function App() {
  const [cart, setCart] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('https://glacial-woodland-72025.herokuapp.com/products')
      .then(res => res.json())
      .then(data => {
        setFoods(data);
      })
  }, [])

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const foodProductKey = Object.keys(saveCart);
    if (foods.length) {
      const cardFoods = foodProductKey.map(key => {
        const food = foods.find(fd => fd.key === key);
        food.quantity = saveCart[key];
        return food;
      })
      setCart(cardFoods);
    }
  }, [])

  const handleFoodCart = (food) => {
    const sameFood = cart.find(fd => fd.key === food.key);
    let count = 1, newCart;
    if (sameFood) {
      count = sameFood.quantity + 1;
      sameFood.quantity = count;
      const othersFood = cart.filter(fd => fd.key !== food.key);
      newCart = [...othersFood, sameFood];
    }
    else {
      food.quantity = 1;
      newCart = [...cart, food];
    }
    setCart(newCart);
    addToDatabaseCart(food.id, count);
  }

  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/shipment">
              <Header cart={cart} />
              <Shipment />
            </Route>
            <Route path="/inventory">
              <Header cart={cart} />
              <Inventory />
            </Route>
            <Route exact path="/">
              <Header cart={cart} />
              <Banner />
              <FoodContent handleFoodCart={handleFoodCart} cart={cart} />
              <Features />
              <Footer />
            </Route>
            <Route path="/food/:foodkey">
              <Header cart={cart} />
              <FoodDetail cart={cart} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
