import React, { Component } from 'react';
import firebase from "firebase";
import "./volunteer.css"
import Modal from 'react-responsive-modal';

class Benefactor extends Component {
    state = {
        volunteers : [],
        currentItem : [],
        infoVisible : false,
        documentPresent : false,
        openMoreDetails: false,
    }
    componentWillMount = () => {
        firebase.database().ref('volunteers').on('value' , (data)=>{
            this.setState({
                volunteers : Object.values(data.toJSON())
            })
        })
    }

    onOpenDetails = () => {
        this.setState({ openMoreDetails: true });
    };

    onCloseDetails = () => {
        this.setState({ openMoreDetails: false });
    };

    displayInfo = (currentItem , i) => {
        this.setState({
            currentItem : currentItem,
            infoVisible : true,
            openMoreDetails: true
        })
    }

    approveAccount = (currentStatus , status) => {
        if(status == "pending"){
            firebase.database().ref(`volunteers/${currentStatus.uid}`).update({
                status : "pending"
            }).then(()=>{
                this.setState({
                    currentItem : [],
                })
            }).catch((error)=>{
            })
        }
        if(status == "approved"){
            firebase.database().ref(`volunteers/${currentStatus.uid}`).update({
                status : "approved"
            }).then(()=>{
                this.setState({
                    currentItem : [],
                })
            }).catch((error)=>{
            })
        }
        if(status == "disapproved"){
            firebase.database().ref(`volunteers/${currentStatus.uid}`).update({
                status : "disapproved"
            }).then(()=>{
                this.setState({
                    currentItem : [],
                })
            }).catch((error)=>{
            })
        }
    }
    
    render() {
        const {openMoreDetails} = this.state;
        return (
            <div>
                <div>
                    <Modal open={openMoreDetails} onClose={this.onCloseDetails} center className="signUpModal">
                        <div className="infoView">
                            <p className='infoItem'><span className="info">First Name : </span>{this.state.currentItem.firstname}</p>
                            <p className='infoItem'><span className="info">Last Name : </span>{this.state.currentItem.lastname}</p>
                            <p className='infoItem'> <span className="info">Email :  </span>{this.state.currentItem.email}</p>
                            <p className='infoItem'> <span className="info">City : </span> {this.state.currentItem.city}</p>
                            <p className='infoItem'> <span className="info">Home Address :  </span> {this.state.currentItem.homeeddress}</p>
                            <p className='infoItem'> <span className="info">Apt Number :  </span> {this.state.currentItem.aptnumber}</p>
                            <p className='infoItem'> <span className="info">Postal Code : </span>  {this.state.currentItem.postalcode}</p>
                            <p className='infoItem'> <span className="info">Phone Number : </span>  {this.state.currentItem.phonenumber}</p>
                            <p className='infoItem'> <span className="info">Province : </span>  {this.state.currentItem.province}</p>
                            <p className='infoItem'> <span className="info">Reason For Volunteering : </span> {this.state.currentItem.volunteerReason}</p>
                            <p className='infoItem'> <span className="info">How I Can Help : </span>  {this.state.currentItem.howCanHelp}</p>
                            <br/>
                            <p className='infoItem'> <span className="info">User Agreement : </span>  {this.state.currentItem.agreementSignature === true ? <span style={{color : "green"}}>Signed</span> : "Not Signed"}</p>
                        </div>
                    </Modal>
                </div>
                <div className="scrollView">
                    <div>
                        <div>
                            {this.state.volunteers.map((currentItem , i) => {
                                return (
                                    <div className={(this.state.currentItem == currentItem) ? "userInfoDisplayActive" : "userInfoDisplay"} key={i} >
                                        <p>{i+1}</p>
                                        <p onClick={()=>this.displayInfo(currentItem , i)} className="details">{currentItem.firstname } {currentItem.lastname} </p>
                                        <div className="userStatus">
                                            <p onClick={()=>this.approveAccount(currentItem , "pending")} className={(currentItem.status == "pending") ? "pendingg" : "userStatus_pending"} >PENDING</p>
                                            <p onClick={()=>this.approveAccount(currentItem , "approved")} className={(currentItem.status == "approved") ? "approved" : "userStatus_approved"}>APPROVED</p>
                                            <p onClick={()=>this.approveAccount(currentItem , "disapproved")} className={(currentItem.status == "disapproved") ? "disapproved" : "userStatus_disapproved"}>DISAPPROVED</p>
                                        </div>
                                        <p onClick={()=>this.displayInfo(currentItem , i)} className="details">Details</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Benefactor;
