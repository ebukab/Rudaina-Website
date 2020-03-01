import React, { Component } from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import {Router} from 'react-router';
import Modal from 'react-responsive-modal';
import { app } from '../../firebase';
import SideNav from 'react-simple-sidenav';
import SignUp from '../SignUp/signup';

class Header extends Component{
    state = {
        openLogin: false,
        openForgotPassword: false,
        loginError : false,
        forgotPassword : false,
        showNav : false,
        openSignUp: false,
        showForgotPassword : false,
        action : "",
        openTheModal : false,
        passwordResetError : ""
    }

    onOpenModalSignUp = () => {
        this.setState({ openSignUp: true, openLogin: false , loginError: false });
    };

    onCloseModalSignUp = () => {
        this.setState({ openSignUp: false , signUpError: false });
    };

    onLoginFormSubmit = (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        app.auth().signInWithEmailAndPassword(email , password).then((u)=>{
            this.onCloseModalLogin();
        }).catch((err)=>{
            this.setState({ loginError: true });
        })
    }

    onForgotPasswordFormSubmit = (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        app.auth().sendPasswordResetEmail(email).then((u)=> {
            this.setState({openForgotPassword: false });
        }).then(()=>{
            this.setState({
                passwordResetError : ""
            })
        }).catch((error) => {
            console.log(error)
            this.setState({
                passwordResetError : "* Error : Ensure email is correct *"
            })
        });
    }

    onOpenModalLogin = () => {
        this.setState({ openLogin: true });
    };

    onCloseModalLogin = () => {
        this.setState({ openLogin: false , loginError: false });
    };

    openForgotPassword = () => {
        this.setState({openForgotPassword : true})
    }

    closeTheModal = () => {
        this.setState({openTheModal : false})
    }

    openTheModal = (action) => {
        this.setState({openTheModal : true , action : action})
    }

    render(){
        const { openLogin ,  openForgotPassword , openTheModal  } = this.state;
        const {openSignUp} = this.state;

        return(
            <div>
                <Modal open={openLogin} onClose={this.onCloseModalLogin} center className="loginModal">
                    <div class="loginFormContainer">
                        <div className="loginForm">
                            <div className="headerLoginText">Welcome Back !</div>
                            <div className="form">
                                <form onSubmit={this.onLoginFormSubmit}>
                                    <div className="loginFormItem">
                                        <p>Email </p>
                                        <input type="email"  name="email" required/>
                                    </div>
                                    <div className="loginFormItem">
                                        <p>Password </p>
                                        <input type="password" name="password" required/>
                                    </div>
                                    <button className="loginFormButton" type="submit"><span className="">Sign In</span></button>
                                    {this.state.loginError && <p className="resetError">The password or email is not valid. </p>}
                                </form>
                            </div>
                            <div className="login-form_footer">
                                <p href="" onClick={this.onOpenModalSignUp}>Don't have an account? Sign Up</p>
                                <p onClick = {()=>this.setState({openLogin: false,openForgotPassword : true})} href="">Forgot Password?</p>
                            </div>
                            {this.state.showForgotPassword && <p>Forget password?</p>}
                        </div>
                    </div>
                </Modal>
                
                <Modal open={openForgotPassword} onClose={()=>this.setState({openForgotPassword: false })} center className="loginModal">
                    <div class="loginFormContainer">
                        <div className="loginForm">

                            <div className="headerLoginText">Password Reset</div>
                            <div className="form">
                                <form onSubmit={this.onForgotPasswordFormSubmit}>
                                    <div className="loginFormItem">
                                        <p>Email </p>
                                        <input type="email"  name="email" required/>
                                    </div>
                                    <p className="resetError">{this.state.passwordResetError}</p>
                                    <button className="loginFormButton" type="submit"><span className="">Reset</span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={openSignUp} onClose={this.onCloseModalSignUp} center className="signUpModal">
                    <div class="">
                        <SignUp closeModal = {this.onCloseModalSignUp}/>
                    </div>
                </Modal>

                {/*<Modal open={openTheModal} onClose={()=>this.setState({openTheModal: false })} center className="loginModal">
                    {this.state.action === "login" && 
                        <div class="loginFormContainer">
                            <div className="loginForm">
                                <div className="loginText">LOGINiii </div>
                                <div className="form">
                                    <form onSubmit={this.onLoginFormSubmit}>
                                        <input type="email" placeholder="Email" name="email" required/><br/>
                                        <input type="password" placeholder="Password" name="password" required/><br/>
                                        <button className="button" type="submit"><span className="btnHover">LOG IN</span></button>
                                        {this.state.loginError && <p>The password or email is not valid. </p>}
                                    </form>
                                </div>
                                <div className="login-form_footer">
                                    <p onClick = {()=>this.setState({action : "forgotPassword"})}>Forgot Password?</p>
                                    <p href="" onClick={this.onOpenModalSignUp}>Don't have an account? . Sign Uiiip</p>
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.action == "forgotPassword" &&
                        <p>forgot password again ?</p>
                    }
                </Modal>*/}

                <div className=" hideOnLargeScreen">
                    <SideNav
                        showNav = {this.state.showNav}
                        onHideNav = {() => this.setState({showNav: false})}
                        onOpenNav = {() => this.setState({showNav: true})}
                        style = {{
                            color : "green",
                            maxWidth : "220px",
                        }}
                        titleStyle = {{
                            display: 'none'
                        }}
                        itemStyle = {{
                            padding: '1rem 0.2rem',
                            color : "white",
                            fontSize : "2rem",
                            margin : "0px"
                        }}
                        items={[<li style = {{borderBottom : "1px solid #2D2D2D"}} onClick={() => this.setState({showNav: false})}><a href=""><NavLink className="mobileLinks" exact activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/">HOME</NavLink></a></li>,
                                <li style = {{borderBottom : "1px solid #2D2D2D"}} onClick={() => this.setState({showNav: false})}><a href=""><NavLink className="mobileLinks" exact activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/news-page">RESOURCES</NavLink></a></li>,
                                <li style = {{borderBottom : "1px solid #2D2D2D"}} onClick={() => this.setState({showNav: false})}><a href=""><NavLink className="mobileLinks" exact activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/about">ABOUT</NavLink></a></li>,
                                <li style = {{borderBottom : "1px solid #2D2D2D"}} onClick={() => this.setState({showNav: false})}><a href=""><NavLink className="mobileLinks" exact activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/program">PROGRAM</NavLink></a></li>,
                                <li style = {{borderBottom : "1px solid #2D2D2D"}} onClick={() => this.setState({showNav: false})}><a href=""><NavLink className="mobileLinks" exact activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/volunteer">VOLUNTEER</NavLink></a></li>,
                                <ul className="loginFrench stayDown">
                                {this.props.user ? 
                                    <div>
                                        <a className=" headerUserImage" href="">
                                            <li>
                                                <NavLink onClick={() => this.setState({showNav: false})} className="mobileLinks" activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/dashboard">
                                                    <img src={this.props.user.url ? this.props.user.url : "/emptyPic.png" } />
                                                        {this.props.user.firstname}
                                                </NavLink>
                                            </li>
                                        </a>
                                    </div> : <a style={{color : "black"}} className=" mobileLinks" onClick={()=>this.openTheModal("login")}>LOGIN</a>
                                }
                                <div>
                                </div>
                            </ul>
                            ]}
                    />
                </div>

                <div className="header_section">
                    <div className="containerCustom">
                        <div className="header">
                            <div className="mobileNavigation hideOnLargeScreen">
                                <i onClick={() => this.setState({showNav: true})} className="fas fa-bars"></i>
                            </div>
                            <img src="/rudainafoundationlogo.png" alt="Rudaina Foundation Logo"/>
                            <ul className="loginFrench hideOnSmallScreen">
                                {this.props.user ?
                                    <div>
                                        <a className="borderRight headerUserImage" href="">
                                            <NavLink activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/dashboard">
                                                <img src={this.props.user.url ? this.props.user.url : "/emptyPic.png" } />
                                                {this.props.user.firstname}
                                            </NavLink>
                                        </a>
                                    </div> : <a className="borderRight loginText" onClick={this.onOpenModalLogin}>{this.props.headerLanguage() === "french" ? "Login" : "Se connecter"}</a>
                                }
                                <div>
                                    <a onClick={this.props.changeLanguage} href="">{this.props.headerLanguage().charAt(0).toUpperCase() + this.props.headerLanguage().slice(1)}</a>
                                </div>
                            </ul>
                        </div>
                        <div className="header-nav hideOnSmallScreen">
                            <ul>
                                <li><a href=""><NavLink exact activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/">{this.props.headerLanguage() === "french" ? "HOME" : "Accueil"}</NavLink></a></li>
                                <li><a href=""><NavLink exact activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/about">{this.props.headerLanguage() === "french" ? "ABOUT" : "À propos"}</NavLink></a></li>
                                <li><a href=""><NavLink exact activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/news-page">{this.props.headerLanguage() === "french" ? "RESOURCES" : "Actualités"}</NavLink></a></li>
                                <li><a href=""><NavLink exact activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/program">{this.props.headerLanguage() === "french" ? "PROGRAM" : "Programmes"}</NavLink></a></li>
                                <li className="borderRight"><a href=""><NavLink activeStyle={{border: 'solid 0px #fff' , color : "red" , fontWeight : "bold"}} to="/volunteer">{this.props.headerLanguage() === "french" ? "VOLUNTEER" : "Bénévolat"}</NavLink></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header

