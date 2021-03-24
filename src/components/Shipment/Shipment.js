import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { getDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { Elements, } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../Login/UseAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_IZQbJffjpldskrhIZwmHE4uk00YjXafcWn');

    const onSubmit = data => {
        setShipInfo(data);
    }

    const handlePlaceOrder = (payment) => {
        const saveCart = getDatabaseCart();
        const orderfDetails = {
            email: auth.user.email,
            cart: saveCart,
            shipment: shipInfo,
            payment: payment
        };
        fetch('https://glacial-woodland-72025.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderfDetails)
        })
            .then(res => res.json())
            .then(order => {
                console.log('from database', order._id);
                setOrderId(order._id);
                clearLocalShoppingCart();
            })
    }

    return (
        <div className="sign-up pt-5">
            <div className="container">
                <div style={{ display: shipInfo && 'none' }} >
                    <h3 className="text-center pt-5">Shipment Information</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                        <div className="form-group">
                            <input name="name" className="form-control" defaul="true" ref={register({ required: true })} placeholder="Name" />
                            {errors.name && <span className="error">Name is required</span>}
                        </div>
                        <div className="form-group">
                            <input name="email" className="form-control" defaul="true" ref={register({ required: true })} placeholder="Email" />
                            {errors.email && <span className="error">Email is required</span>}
                        </div>
                        <div className="form-group">
                            <input name="address1" className="form-control" defaul="true" ref={register({ required: true })} placeholder="Address One" />
                            {errors.address1 && <span className="error">Email is required</span>}
                        </div>
                        <div className="form-group">
                            <input name="address2" className="form-control" defaul="true" ref={register({ required: true })} placeholder="Address Two" />
                            {errors.address2 && <span className="error">Email is required</span>}
                        </div>
                        <div className="form-group">
                            <input name="city" className="form-control" defaul="true" ref={register({ required: true })} placeholder="City" />
                            {errors.city && <span className="error">Email is required</span>}
                        </div>
                        <div className="form-group">
                            <input name="country" className="form-control" defaul="true" ref={register({ required: true })} placeholder="Country" />
                            {errors.country && <span className="error">Email is required</span>}
                        </div>
                        <div className="form-group">
                            <input name="zipcode" className="form-control" defaul="true" ref={register({ required: true })} placeholder="Zip Code" />
                            {errors.zipcode && <span className="error">Email is required</span>}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-danger btn-block" type="submit">Submit</button>
                        </div>
                        <div className="option text-center">
                        </div>
                    </form>
                </div>
                <div style={{ marginTop: '200px', display: shipInfo ? 'block' : 'none' }} className="justify-content-center" >
                    <h3 className="text-center mt-5">Payment Information</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder}>
                        </CheckoutForm>
                    </Elements>
                    <br />
                    {
                        orderId &&
                        <div>
                            <h3 className="text-center">Thank you for shopping with us</h3>
                            <p className="text-center text-success">Your order is: {orderId}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Shipment;