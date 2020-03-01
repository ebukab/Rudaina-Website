import React, { Component } from 'react';
import "./benefactorEvents";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import firebase from "firebase";
import Modal from 'react-responsive-modal';

const localizer = BigCalendar.momentLocalizer(moment);


class BenefactorEvents extends Component {
    state = {
        events : [],
        open: false,
        selectedEvent : null
    }

    componentWillMount = () => {
        firebase.database().ref('events/benefactors').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    events : Object.values(data.toJSON()),
                })
            }
        })
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleAddEvent = () => {
        var d = new Date();
        var n = d.getTime();
        var name = this.props.user.firstname + " " + this.props.user.lastname;
        firebase.database().ref(`events/benefactors/${this.state.selectedEvent.id}/attendees/${name}`).set({
            name : name,
            email : this.props.user.email 
        }).then(()=>{
            firebase.database().ref(`benefactors/${this.props.user.uid}/myEvents/${this.state.selectedEvent.title}`).set({
                title : this.state.selectedEvent.title,
                id : this.state.selectedEvent.id,
                decs : this.state.selectedEvent.desc,
                start : this.state.selectedEvent.start,
                end : this.state.selectedEvent.end,
            }).then(()=>{
                firebase.database().ref(`events/benefactors/${this.state.selectedEvent.id}/num`).once('value' , (data)=>{
                    var eventGoers;
                    eventGoers = (data.toJSON());
                    eventGoers = eventGoers+1;
                    firebase.database().ref(`events/benefactors/${this.state.selectedEvent.id}`).update({
                        num : eventGoers,
                    })
                })
                this.props.updateMyEvents();
            }).catch((error)=>{
            })
        }).catch((error)=>{
        })
        this.onCloseModal();
    }

    handleSelectEvent = (e) =>{
        this.setState({
            selectedEvent : e,
            open : true,
        })
    }

    render() {
        const { open } = this.state;
        return (
            <div className="calendarContainer">
                <BigCalendar
                    style={{height: "100%", color:"#FF0043"}}
                    localizer={localizer}
                    selectable
                    onSelectEvent={(event) =>this.handleSelectEvent(event)}
                    events={this.state.events}
                    startAccessor="newStart"
                    endAccessor="newEnd"
                    step={60}
                    showMultiDayTimes
                />
                <Modal  open={open} onClose={this.onCloseModal} center>
                    {this.state.selectedEvent && 
                        <div className="eventView">
                            <p className="chosenEventTitle">{this.state.selectedEvent.title}</p>
                            <p>{this.state.selectedEvent.desc}</p>
                            <div className="sign-up_button">
                                <button onClick={this.handleAddEvent} >JOIN</button>
                            </div>
                        </div>
                    }
                </Modal>
            </div>
        )
    }
}

export default  BenefactorEvents;
