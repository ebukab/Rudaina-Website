import React, { Component } from 'react';
import "./myTask.css";
import firebase from "firebase";;

class MyTask extends Component {
    state = {
        myTask : []
    }
    
    componentDidMount = () => {
        this.updateTask();
    }
    

    updateTask = () => {
        var eventIds = [];
        var eventsInfo = [];
        firebase.database().ref(`${this.props.user.role.toLowerCase()+"s"}/${this.props.user.uid}/myEvents`).on('value' , (data)=>{
            if(data.toJSON()){
                console.log("hey you have some events")
                console.log(Object.values(data.toJSON()))
                this.setState({
                    myTask : Object.values(data.toJSON())
                })
            }
        })
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    removeEvent = (i) => {
        var updatedTask = [];
        console.log("i will remove this index")
        console.log(i)
        console.log("with id")
        console.log(this.state.myTask[i].id)
        console.log(this.isCancelled);
        var name = this.props.user.firstname + " " + this.props.user.lastname;
        firebase.database().ref(`${this.props.user.role.toLowerCase()+"s"}/${this.props.user.uid}/myEvents/${this.state.myTask[i].title}`).remove()
        .then(()=>{
            firebase.database().ref(`/events/${this.props.user.role.toLowerCase()+"s"}/${this.state.myTask[i].id}/attendees/${name}`).remove()
            .then(()=>{
                console.log("event removed")
            })
            .catch((err)=>{
                console.log(err)
            });
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    
    render() {
        return (
            <div className="eventMainContainer">
                <div className="eventBody">
                    {this.state.myTask.length == 0 &&
                        <div className="noEvents">
                            <span><i className="fas fa-calendar-alt"></i></span>
                            <p><span className="noEventtext">No Events : </span> Go to Events Tab to add events.</p>
                        </div>
                    }
                    {
                        this.state.myTask.map((task , i)=>{
                            return(
                                <div key={i} className="eventContainer">
                                    <div className="eventInfo">
                                        <p className="eventTitle">
                                            {task.title}
                                        </p>
                                        <p className="eventDesc">
                                            {task.decs}
                                        </p>
                                        <div className="eventDates">
                                            <p><span className="colorRed">START DATE :</span> {task.start}</p>
                                            <p><span className="colorRed">END DATE :</span> {task.end}</p>
                                        </div>
                                    </div>
                                    <div onClick={()=>this.removeEvent(i)} className="removeEvent">
                                        <i className="fas fa-times"></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default MyTask;
