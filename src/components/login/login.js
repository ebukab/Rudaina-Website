import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import "./login.css";
import { NavLink } from 'react-router-dom';
import { app } from '../../firebase';
import { Redirect } from 'react-router';

class Login extends Component {
    state = {
        temp : true,
        forgotPassword : false,
        error : ""
    }

    onLoginFormSubmit = (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        app.auth().signInWithEmailAndPassword(email , password).then((u)=>{
            this.setState({
                error : ""
            })
        }).catch((err)=>{
            console.log("login un-successful");
            console.log(err)
            this.setState({
                error : "Please ensure your credentials are correct"
            })
        })
    }

    render() {
        return (
            <div>
                <div class="loginFormContainer">
                    {this.state.forgotPassword && <div className="loginForm">
                        <div className="loginText">LOGIiiiN </div>
                        <div className="form">
                            <form onSubmit={this.onLoginFormSubmit}>
                                <input type="email" placeholder="Email" name="email" required/><br/>
                                <input type="password" placeholder="Password" name="password" required/><br/>
                                <button className="button" type="submit"><span className="btnHover">LOG iiiIN</span></button>
                            </form>
                        </div>
                        <div className="login-form_footer">
                            <a href="">Forgot Password?</a>
                            <a href="">Don't have an account? <NavLink to="/signup"><span className="signUp">Sign Up.</span></NavLink></a>
                        </div>
                    </div>}
                    <div>
                        forgot password
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
