import React, { Component } from 'react';
import './subheader.css';
import CountUp from 'react-countup';
import firebase from "firebase";
import { NavLink } from 'react-router-dom';

class subheader extends Component {
    state = {
        volunteers : [],
        benefactors : [],
    }
    componentWillMount = () => {
        firebase.database().ref('volunteers').on('value' , (data)=>{
            if(data.length > 0){
                this.setState({
                    volunteers : Object.values(data.toJSON())
                })
            }else{

            }
        })
        firebase.database().ref('benefactors').on('value' , (data)=>{
            if(data.length > 0){
                this.setState({
                    benefactors : Object.values(data.toJSON())
                })
            }
        })
    }
    render() {
        return (
            <div>
                <div >
                    <div className="subheadContainer">
                        <div className="subheadContainerTop">
                            <div className="styleLast ">
                                <div className="styleMiddle">
                                    <div className="ctaContainer">
                                        <p className="cta-mainText">MAKING A DIFFERENCE </p>
                                        <p className="cta-subText">Behind our charity, there are people who give, volunteer, and act to help anyway they can. You can too!.</p>
                                        <a href="/volunteer" className="cta-button_header">LEARN MORE</a>
                                    </div>
                                </div>
                            </div>
                            <div className="mobileDonate hideOnLargeScreen">
                                <div className="mobileDonateBox">
                                    <div className="donateIcon donateIconShake">
                                        <NavLink activeStyle={{border: 'solid .1px transparent', paddingBottom: '1em'}} to="/donate-page" exact><img src="/donateIcon.png"/></NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="subheadContainer-stats hideOnSmallScreen">
                                <div className="statsContainer">
                                    {/*<div className="statsContainer_item">
                                        <div className="statsContainer_item-box">
                                            <p><CountUp className="counter" end={0} /></p>
                                            <div><i className="fas fa-shopping-basket"></i></div>
                                        </div>
                                        <p><span className=" hideOnSmallScreen">BASKETS</span> DELIVERED</p>
                                    </div>
                                    <div className="statsContainer_item">
                                        <div className="statsContainer_item-box">
                                            <p><CountUp className="counter" end={0} /></p>
                                            <div><i className="fas fa-female"></i></div>
                                        </div>
                                        <p><span className=" hideOnSmallScreen">PEOPLE</span> HELPED</p>
                                        </div>*/}
                                </div>
                            </div>
                        </div>
                        <div className="mottoText">
                            <p>Rudaina Foundation is dedicated to helping vulnerable, low income or indigenous pregnant women</p>
                        </div>
                    </div>
                    {/*<div className="subheadContainer-stats hideOnLargeScreen hideOnSmallScreen">
                        <div className="statsContainer">
                            <div className="statsContainer_item">
                                <div className="statsContainer_item-box">
                                    <p><CountUp className="counter" end={100} /></p>
                                    <div><i className="fas fa-shopping-basket"></i></div>
                                </div>
                                <p><span className=" hideOnSmallScreen">BASKETS</span> DELIVERED</p>
                            </div>
                            <div className="statsContainer_item">
                                <div className="statsContainer_item-box">
                                    <p><CountUp className="counter" end={this.state.volunteers.length} /></p>
                                    <div><i className="fas fa-female"></i></div>
                                </div>
                                <p><span className=" hideOnSmallScreen">PEOPLE</span> HELPED</p>
                            </div>
                            <div className="statsContainer_item">
                                <div className="statsContainer_item-box">
                                    <p><CountUp className="counter" end={this.state.benefactors.length} /></p>
                                    <div><i className="fas fa-people-carry"></i></div>
                                </div>
                                <p>VOLUNTEERS</p>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </div>
        )
    }
}

export default subheader;

