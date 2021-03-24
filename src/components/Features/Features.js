import React, { useEffect } from 'react'
import './Features.css';
import { useState } from 'react';
import firstImage from '../../Images/OtherImage/1st.png';
import secondImage from '../../Images/OtherImage/2nd.png';
import thirdImage from '../../Images/OtherImage/3rd.png';
import bus from '../../Images/logo/bus.png';
import car from '../../Images/logo/car.png';
import notification from '../../Images/logo/notification.png';

const Features = () => {
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        fetch('https://glacial-woodland-72025.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setFoods(data);
        })
    })
    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Why you choose us</h2>
                            <p className="mt-3 mb-5">Barton waited twenty always repair in within we do. An delighted offending curiosly my is dashwoods at. Boy properous increasing surrounded.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-deck">
                <div className="card">
                    <img className="card-img-top img-fluid" src={firstImage} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title"><img className="titleIcon" src={bus} alt=""/> First Delevery</h5>
                        <p className="card-text">Keep your systems in sync with automated web hook based notifications each time link is paid and how we dream about our future.</p>
                        <p className="card-text text-primary"><small className="">See more</small></p>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top img-fluid" src={secondImage} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title"><img className="titleIcon"  src={car} alt=""/> A Good Auto Responder</h5>
                        <p className="card-text">Keep your systems in sync with automated web hook based notifications each time link is paid and how we dream about our future.</p>
                        <p className="card-text text-primary"><small className="">See more</small></p>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top img-fluid" src={thirdImage} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title"><img className="titleIcon" src={notification} alt=""/> Home Delivery</h5>
                        <p className="card-text">Keep your systems in sync with automated web hook based notifications each time link is paid and how we dream about our future.</p>
                        <p className="card-text text-primary"><small className="">See more</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;