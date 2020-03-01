import React, { Component } from 'react';
import "./subscribers.css";
import firebase from "firebase";
import axios from "../../../axios"


class Subscribers extends Component {
    state = {
        subscribers : []
    }

    componentWillMount = () => {
        firebase.database().ref('subscribers').on('value' , (data)=>{
            if(data.toJSON()){
                console.log("well looks like it worked")
                this.setState({
                    subscribers : Object.values(data.toJSON())
                })
            }
            else{
                news : []
            }
        })
        const subscribersList = axios.get("/subscribers.json")
        console.log("here is the subscribersList")
        console.log(typeof subscribersList[0])
        
    }
    

    render() {
        console.log("here are the subs")
        console.log(this.state.subscribers)
        return (
            <div>
                {this.state.subscribers.map((currentItem , i) => {
                    return (
                        <div className="userInfoDisplay" key={i} >
                            <p>{i+1}</p>
                            <p>{currentItem.sub_id}</p>
                            {console.log("this is the curretn item !!!!")}
                            {console.log(currentItem)}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Subscribers;


