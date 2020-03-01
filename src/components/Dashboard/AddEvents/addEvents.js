import React, { Component } from 'react';
import "./addEvents.css";
import Modal from 'react-responsive-modal';
import firebase from "firebase";

class AddEvents extends Component {
    state = {
        addSectionShowing : false,
        benefactorsEvents : [],
        volunteersEvents : [],
        selectedEventGroup : "benefactors",
        attendeesList : null,
        open: false,
        openAddEvent : false
    }

    toggleAddSection = ()=>{
        this.setState({
            addSectionShowing : !this.state.addSectionShowing,
        })
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onOpenAddEventModal = () => {
        this.setState({ openAddEvent : true });
    };

    onCloseAddEventModal = () => {
        this.setState({ openAddEvent : false });
    };

    componentWillMount = () => {

        firebase.database().ref('events/benefactors').on('value' , (data)=>{
            console.log("I am fetching relevant news")
            if(data.toJSON()){
                this.setState({
                    benefactorsEvents : Object.values(data.toJSON()),
                })
            }
        })

        firebase.database().ref('events/volunteers').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    volunteersEvents : Object.values(data.toJSON()),
                })
            }
        })
    }
    
    showAttendeesList = (groupName , index ) => {
        console.log("I am in attendees list!")
        if(groupName === "benefactors"){
            console.log("benefactors attendes")
            console.log(this.state.benefactorsEvents[index].id)
            firebase.database().ref(`events/benefactors/${this.state.benefactorsEvents[index].id}/attendees`).on('value' , (data)=>{
                if(data.toJSON()){
                    console.log("i have gotten the list")
                    console.log(Object.values(data.toJSON()))
                    this.setState({
                        attendeesList : Object.values(data.toJSON())
                    })
                    this.onOpenModal();
                }
                else{
                    this.setState({
                        attendeesList : null
                    })
                }
            })
        }
        else if(groupName === "volunteers"){
            console.log(this.state.volunteersEvents[index])
            firebase.database().ref(`events/volunteers/${this.state.volunteersEvents[index].id}/attendees`).on('value' , (data)=>{
                if(data.toJSON()){
                    this.setState({
                        attendeesList : Object.values(data.toJSON())
                    })
                    this.onOpenModal();
                }
                else{
                    this.setState({
                        attendeesList : null
                    })
                }
            })
        }
    }

    handleAddEvent = (e) => {
        e.preventDefault();

        const start = e.target.elements.start.value.trim();
        const end = e.target.elements.end.value.trim();
        const desc = e.target.elements.desc.value.trim();
        const title = e.target.elements.title.value.trim();
        const eventRole = e.target.elements.eventRole.value.trim();
        console.log(title , desc , start , end, eventRole);
        this.addEvent(title , desc , start , end, eventRole);
        this.onCloseAddEventModal();
    }

    deleteEvent = (i) => {
        console.log(i.toString())
        console.log("deleting product")
        firebase.database().ref(`events/${this.state.selectedEventGroup}`).child(i+'').remove();

        firebase.database().ref('events/benefactors').on('value' , (data)=>{
            console.log("I am fetching relevant news")
            if(data.toJSON()){
                this.setState({
                    benefactorsEvents : Object.values(data.toJSON()),
                })
            }
        })

        firebase.database().ref('events/volunteers').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    volunteersEvents : Object.values(data.toJSON()),
                })
            }
        })
    }

    toggleEventsGroup=(group)=>{
        this.setState({
            selectedEventGroup : group
        })
    }

    formatDate = (dateToFormat) => {
        var date = new Date(dateToFormat);
        date.setDate( date.getDate() + 2 );

        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var finalDate = yyyy + '-' + mm + '-' + dd;
        console.log(dateToFormat + "formatted to " + finalDate);
        return finalDate.toString();
    }

    addEvent = (title , desc , start , end , eventRole) => {
        var d = new Date();
        var n = d.getTime();
        var newStart = this.formatDate(start);
        var newEnd = this.formatDate(end);
        if(eventRole === "benefactors"){
            firebase.database().ref(`events/${eventRole}/${n}`).set({
                title : title,
                desc : desc,
                start : start,
                end : end,
                num : 0,
                id : n,
                newEnd : newEnd,
                newStart : newStart
            }).then(()=>{
                firebase.database().ref('events/benefactors').on('value' , (data)=>{
                    if(data.toJSON()){
                        console.log("well looks like it worked")
                        this.setState({
                            benefactorsEvents : Object.values(data.toJSON())
                        })
                    }
                    else{
                        benefactorsEvents : []
                    }
                })
            }).catch((error)=>{
                console.log(error)
            })
        }else{
            firebase.database().ref(`events/volunteers/${n}`).set({
                title : title,
                desc : desc,
                start : start,
                end : end,
                num : 0,
                id : n,
                newEnd : newEnd,
                newStart : newStart
            }).then(()=>{
                firebase.database().ref('events/volunteers').on('value' , (data)=>{
                    if(data.toJSON()){
                        console.log("well looks like it worked")
                        this.setState({
                            volunteersEvents : Object.values(data.toJSON())
                        })
                    }
                    else{
                        volunteersEvents : []
                    }
                })
            }).catch((error)=>{
                console.log(error)
            })
        }
    }

    render() {
        console.log("here is a list of all attendees")
        console.log(((this.state.attendeesList)))
        const { open , openAddEvent } = this.state;
        return (
            <div>
                <div className="newsHeader">
                    <p>EVENTS </p>
                    <i onClick={this.onOpenAddEventModal} className="fas fa-plus-square"></i>
                </div>
                <Modal  open={open} onClose={this.onCloseModal} center>
                    <div className="loginForm">
                        <div className="attendeesList">
                            <p>Full Name :</p>
                            <p>Email :</p>
                        </div>
                        {this.state.attendeesList && 
                            this.state.attendeesList.map((currentItem , i) => {
                                return (
                                    <div className="attendeesList">
                                        <p>{currentItem.name}</p>
                                        <p>{currentItem.email}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal>
                <Modal open={openAddEvent} onClose={this.onCloseAddEventModal} center className="">
                    <div>
                        <form className="eventDatas" onSubmit={this.handleAddEvent} action="">
                            <div>
                                <p>Event Title :</p>
                                <input className="eventTitle" type="text" name="title"  required/>
                            </div>
                            <div>
                                <p>Event Description :</p>
                                {/*<input className="eventDesc" type="text" name="desc" />*/}
                                <textarea rows="4" cols="80%" className="eventDesc" name="desc" required></textarea>
                            </div>
                            <div className="eventDates">
                                <div>
                                    <p>Event Start Date : </p>
                                    <input type="date" name="start" required/>
                                </div>
                                <div>
                                    <p>Event End Date : </p>
                                    <input type="date" name="end" required/>
                                </div>
                                <div>
                                    <p>Event Category</p>
                                    <select name="eventRole" required>
                                        <option value="benefactors">Benefactors</option>
                                        <option value="volunteers">Volunteers</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <input className="eventSubmit"  type="submit" value="ADD" required/>
                            </div>
                        </form>
                    </div>
                </Modal>
                <hr/>
                <div className="newsGroup">
                    <p className={ (this.state.selectedEventGroup == "benefactors") && "newsGroupActive"} onClick={()=>{this.toggleEventsGroup("benefactors")}}>Benefactors Events</p>
                    <p className={ (this.state.selectedEventGroup == "volunteers") && "newsGroupActive"} onClick={()=>{this.toggleEventsGroup("volunteers")}}>Volunteers Events</p>
                </div>
                <hr/>
                <div>
                    {(this.state.selectedEventGroup === "benefactors") && 
                        this.state.benefactorsEvents.map((currentItem , i) => {
                            return (
                                <div onClick={()=>this.showAttendeesList("benefactors" , i)} key={i}  className="eventsContainer">
                                    <div className="eventsContainer_content">
                                        <p className="addEventTitle">{currentItem.title}</p>
                                        <p>{currentItem.desc}</p>
                                        <div className="eventsContainer_contentDates">
                                            <div>
                                                <p><span className="eventStyle">Start Date :</span> {currentItem.start}</p>
                                            </div>
                                            <div>
                                                <p><span className="eventStyle">End Date :</span> {currentItem.end}</p>
                                            </div>
                                            <div>
                                                <p><span className="eventStyle">Attendees :</span> {currentItem.num}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="eventsContainer_trash">
                                        <i onClick={()=>this.deleteEvent(currentItem.id)} className="fas fa-trash-alt "></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {(this.state.selectedEventGroup === "volunteers") && 
                        this.state.volunteersEvents.map((currentItem , i) => {
                            return (
                                <div onClick={()=>this.showAttendeesList("volunteers" , i)} key={i}  className="eventsContainer">
                                    <div className="eventsContainer_content">
                                        <p className="addEventTitle">{currentItem.title}</p>
                                        <p>{currentItem.desc}</p>
                                        <div className="eventsContainer_contentDates">
                                            <div>
                                                <p><span className="eventStyle">Start Date :</span> {currentItem.start}</p>
                                            </div>
                                            <div>
                                                <p><span className="eventStyle">End Date :</span> {currentItem.end}</p>
                                            </div>
                                            <div>
                                                <p><span className="eventStyle">Attendees :</span> {currentItem.num}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="eventsContainer_trash">
                                        <i onClick={()=>this.deleteEvent(currentItem.id)} className="fas fa-trash-alt "></i>
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

export default  AddEvents;
