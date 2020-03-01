import React, { Component } from 'react';
import "./helpStats.css";
import CountUp from 'react-countup';
import firebase from "firebase";

class HelpStats extends Component {
    state = {
        volunteers : [],
        benefactors : [],
    }
    componentWillMount = () => {
        firebase.database().ref('volunteers').on('value' , (data)=>{
            this.setState({
                volunteers : Object.values(data.toJSON())
            })
        })
        firebase.database().ref('benefactors').on('value' , (data)=>{
            this.setState({
                benefactors : Object.values(data.toJSON())
            })
        })
    }
    render() {
        return (
            <div className="">
                <div className="container helpStat-section">
                    <div className="textContainer">
                        <p className="section-header">WE NEVER STOP HELPING.</p>
                    </div>
                    <div className="itemContainer">
                        <div className="item">
                            <div>
                                <i className="fa fa-car"></i>
                            </div>
                            <div>
                                <CountUp className="counter" end={0} />
                            </div>
                            <div>
                                <p className="helpStatText">BASKETS DELIVERED</p>
                            </div>
                        </div>
                        <div className="item">
                            <div>
                                <i className="fas fa-hands-helping"></i>
                            </div>
                            <div>
                                <CountUp className="counter" end={0} />
                                {/* <CountUp className="counter" end={this.state.benefactors.length} /> */}
                            </div>
                            <div>
                                <p className="helpStatText">PEOPLE HELPED</p>
                            </div>
                        </div>
                        <div className="item">
                            <div>
                                <i className="fa fa-users"></i>
                            </div>
                            <div>
                                <CountUp className="counter" end={15} />
                                {/* <CountUp className="counter" end={this.state.volunteers.length} /> */}
                            </div>
                            <div>
                                <p className="helpStatText">VOLUNTEERS</p>
                            </div>
                        </div>
                        <div className="item">
                            <div>
                                <i className="fa fa-download"></i>
                            </div>
                            <div>
                                <CountUp className="counter" end={0} />
                            </div>
                            <div>
                                <p className="helpStatText">APP DOWNLOADS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HelpStats;