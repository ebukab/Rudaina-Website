import React, { Component } from 'react';
import "./subscribe.css";
import firebase from "firebase";
import axios from "../../../axios"

class Subscribe extends Component {
    subscribe(e){
        e.preventDefault();
        // const elements = e.target.elements;
        // console.log(elements)
        console.log(e.target.elements.email.value.toString())
        // e.target.elements.email.value = ""
        // var d = new Date();
        // var n = d.getTime();
        // var email = e.target.elements.email.value;
        // firebase.database().ref(`subscribers/${n}`).set({
        //     email : email
        // }).then(()=>{
        //     console.log("subscriber added")
        //     e.target.elements.email.value = ""
        // }).catch((error)=>{
        //     console.log(error)
        // })
        var d = new Date();
        var seconds = d.getTime() / 1000;
        const sub_id = Math.round(seconds);
        const addThis = {sub_id : e.target.elements.email.value.toString()}
        console.log(Math.round(seconds)) 
        axios.post("/subscribers.json" , addThis)
            .then(()=>{
                console.log("subscriber added")
            })
        e.target.elements.email.value = ""
    }

    render() {
        return (
            <div className="greyBackground Subscribefooter">
                <div className="container subscribe-section">
                    <div className="textContainer">
                        <p className="section-header">Join Our Mailing List</p>
                    </div>
                    <div>
                        <form onSubmit={this.subscribe}  action="">
                            <div className="formContainer">
                                <input name="email" type="email" placeholder="enter email"/>
                                <input className="submitButton" type="submit" value="SUBSCRIBE"/>
                            </div>
                        </form>
                    </div>
                    <div className="privacyStatement">
                        <p>* We take your privacy very seriously ,we promise to keep your email confidential and will not be shared. </p>
                    </div>

                    <hr/>

                    <div className="contactUs">
                        <div className="contactUsItem">
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:rudainafoundation@gmail.com?Subject=Hello%20rudaina" target="_top">rudainafoundation@gmail.com</a>
                        </div>
                        <div className="contactUsItem">
                            <i className="fas fa-phone"></i>
                            <a href="tel:+16132940275">+1-613-294-0275</a>
                        </div>
                        <div className="socialLinks">
                            <a href="#" className="fa fa-facebook"></a>
                            <a href="#" className="fa fa-twitter"></a>
                            <a href="#" className="fa fa-linkedin"></a>
                            <a href="#" className="fa fa-instagram"></a>
                        </div>
                    </div>

                    <hr/>

                    <div className="footerLinks">
                        <div>
                            &copy; 2019 Rudaina Foundation. All Rights Reserved
                        </div>
                        <div className="footerLinks">
                            <ul>
                                <li><a href="_blank">Privacy</a></li>
                                <li><a href="_blank">Terms</a></li>
                                <li><a href="_blank">Accessibility</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Subscribe;