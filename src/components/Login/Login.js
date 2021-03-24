import React from 'react';
import useAuth from './UseAuth';
import { Link } from 'react-router-dom';
import logo from '../../Images/ICON/logo2.png'
import './Login.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";

const Login = () => {
    const [returningUser, setReturningUser] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const auth = useAuth();
    const onSubmit = data => {
        if (returningUser) {
            if (data.email && data.password) {
                auth.signInUser(data.email, data.password);
            }
        } else {
            if (data.name && data.email && data.password && data.confirm_password) {
                auth.createUser(data.email, data.confirm_password, data.name)
            }
        }

    }

    return (
        <div className="sign-up">
            <div className="container">
                <div className="logo text-center">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>

                {
                    returningUser ?
                        <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                            {
                                auth.user != null && <p className="text-danger">{auth.user.error}</p>
                            }
                            <div className="form-group">
                                <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email" />
                                {errors.email && <span className="error">Email is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                                {errors.password && <span className="error">Password is required</span>}
                            </div>

                            <div className="form-group">
                                <button className="btn btn-danger btn-block" type="submit">Sign In</button>
                            </div>
                            <div className="option text-center">
                                <label onClick={() => setReturningUser(false)}>Create a new Account</label>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                            {
                                auth.user != null && <p className="text-danger">{auth.user.error}</p>
                            }
                            <div className="form-group">
                                <input name="name" className="form-control" ref={register({ required: true })} placeholder="Name" />
                                {errors.name && <span className="error">Name is required</span>}
                            </div>
                            <div className="form-group">
                                <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email" />
                                {errors.email && <span className="error">Email is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                                {errors.password && <span className="error">Password is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="password" name="confirm_password" className="form-control" ref={register({
                                    validate: (value) => value === watch('password')
                                })} placeholder="Confirm Password" />
                                {errors.confirm_password && <span className="error">Passwords don't match.</span>}
                            </div>
                            <div className="form-group">
                                <button className="btn btn-danger btn-block" type="submit">Sign Up</button>
                            </div>
                            <div className="option text-center">
                                <label onClick={() => setReturningUser(true)}>Already Have an Account</label>
                            </div>
                        </form>
                }
            </div>
        </div>
    );
};

export default Login;