import React, { Component } from 'react';
import './footer.css';
import firebase from "firebase";
import axios from "../../../axios";
import Notifications, {notify} from 'react-notify-toast';

export default class Footer extends Component {
    componentDidMount () {
        const script = document.createElement("script");

        script.src = "https://www.canadahelps.org/services/wa/js/apps/donatenow/embed.min.js";
        script.async = false;
        script.type = 'text/javascript';
        script.id = 'ch_cdn_embed';
        // script.data-page-id = '32254';


        document.body.appendChild(script);
    }

    subscribe(e){
        e.preventDefault();
        var d = new Date();
        var seconds = d.getTime() / 1000;
        const sub_id = Math.round(seconds);
        const addThis = {sub_id : e.target.elements.email.value.toString()}
        console.log(Math.round(seconds)) 
        axios.post("/subscribers.json" , addThis)
            .then(()=>{
                console.log("subscriber added")
                notify.show('Thank you for subscribing !');
            })
        e.target.elements.email.value = "";
    }

    render() {
        return (
            <div className="footerContainer">
                <Notifications />
                <div className="footer">
                    <div className="footerSection">
                        <p className="footerSection_header">Rudaina Foundation</p>
                        <div className="footerSection_aboutText">
                            <p>
                                Rudaina Foundation is a Canadian charity devoted to helping pregnant women.Our Community Program will introduce professionals like registered nurses, nutritionists, doctors, midwives and therapists to an online message board available for instant access to our beneficiaries.
                            </p>
                        </div>
                    </div>
                    <div className="footerSection">
                        <p className="footerSection_header">Contact Us</p>
                        <div>
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:rudainafoundation@gmail.com?Subject=Hello%20Rudaiana%20Foundation" target="_top">rudainafoundation@gmail.com</a>
                        </div>
                        <div>
                            <i className="fas fa-share-alt"></i>
                            <a>Keep in touch</a>
                        </div>
                        {/*<div>
                            <i className="fas fa-phone"></i>
                            <a href="tel:+16132940275">(+1) 613 - 294 0275</a>                
                        </div>*/}
                        <div className="footer_social">
                            <a href="https://www.facebook.com/RudainaFoundation/" target="_blank"><i className="fab fa-facebook"></i></a>
                            <a href="https://www.instagram.com/rudainafoundation/" target="_blank"><i className="fab fa-instagram"></i></a>
                            <a href="https://twitter.com/RudainaCharity" target="_blank"><i className="fab fa-twitter-square"></i></a>
                            <a href="https://ca.linkedin.com/company/rudaina-foundation" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="footerSection">
                        <p className="footerSection_header">Join Our Mailing List</p>
                        <div>
                            <form onSubmit={this.subscribe}  action="">
                                <div className="formContainer">
                                    <span >Email :</span><br/>
                                    <input className="emailField" name="email" type="email" placeholder="" required/><br/>
                                    <input className="submitButton" type="submit" value="SUBSCRIBE"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="footerLinks_copyright">
                    <p>© {new Date().getFullYear()} Rudaina Foundation - <span className="hideOnSmallScreen">Charitable Registration Number : 118830983 RR0001.</span> </p>
                    <a href="/privacy-policy" target="_blank">Privacy</a>
                    <a href="/terms-of-service" target="_blank">Terms</a>
                    <a href="/accesibility" target="_blank">Accessibility</a>
                </div>
            </div>
        )
    }
}
