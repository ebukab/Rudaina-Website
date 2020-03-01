import React, { Component } from 'react';
import firebase from "firebase";
import "./benefactor.css";
import Modal from 'react-responsive-modal';

class Benefactor extends Component {
    state = {
        benefactors : [],
        currentItem : [],
        infoVisible : false,
        openMoreDetails: false,
    }
    componentWillMount = () => {
        firebase.database().ref('benefactors').on('value' , (data)=>{
            this.setState({
                benefactors : Object.values(data.toJSON())
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
            firebase.database().ref(`benefactors/${currentStatus.uid}`).update({
                status : "pending"
            }).then(()=>{
                
            }).catch((error)=>{
            })
        }
        if(status == "approved"){
            firebase.database().ref(`benefactors/${currentStatus.uid}`).update({
                status : "approved"
            }).then(()=>{
                
            }).catch((error)=>{
            })
        }
        if(status == "disapproved"){
            firebase.database().ref(`benefactors/${currentStatus.uid}`).update({
                status : "disapproved"
            }).then(()=>{
                
            }).catch((error)=>{
            })
        }
    }
    
    render() {
        const {openMoreDetails} = this.state;
        return (
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

                        <p className='infoItem'> <span className="info">Full Time School :  </span> {this.state.currentItem.fullTimeSchool}</p>
                        <p className='infoItem'> <span className="info">Full Time School After Birth :  </span>{this.state.currentItem.fullTimeSchoolAfterBirth}</p>
                        <p className='infoItem'> <span className="info">Relationship Status : </span>  {this.state.currentItem.relationshipStatus}</p>
                        <p className='infoItem'> <span className="info">Diet Requirments : </span>{this.state.currentItem.dietRequirment}</p>
                        <p className='infoItem'> <span className="info">Smokes : </span>  {this.state.currentItem.smoking}</p>
                        <p className='infoItem'> <span className="info">Number Of Times I Excercise : </span> {this.state.currentItem.exerciseNumber}</p>
                        <p className='infoItem'> <span className="info">Status In Canada : </span>  {this.state.currentItem.canadianStatus}</p>

                        <p className='infoItem'> <span className="info">Source of Income :  </span> {this.state.currentItem.incomeSource}</p>
                        <p className='infoItem'> <span className="info">Source of household incomes:  </span>{this.state.currentItem.householdIncome}</p>
                        <p className='infoItem'> <span className="info">Veteran Status : </span>  {this.state.currentItem.veteranStatus}</p>
                        <p className='infoItem'> <span className="info">Indigenous Status : </span>{this.state.currentItem.indigenousStatus}</p>
                        <p className='infoItem'> <span className="info">identify as visible minority : </span>  {this.state.currentItem.visibleMinority}</p>
                        <p className='infoItem'> <span className="info">Mental / physical disability : </span> {this.state.currentItem.disability}</p>
                        <p className='infoItem'> <span className="info">Gestation period: </span>  {this.state.currentItem.gestation}</p>
                        <p className='infoItem'> <span className="info">Sign up date: </span>  {this.state.currentItem.signUpDate}</p>
                        {/**<p className='infoItem'> <span className="info">proove Of Pregnancy : </span>{(this.state.infoVisible) && <a href={this.state.currentItem.document.toString()}  target="_blank">Click to view document</a>}</p>**/}
                        <p className='infoItem' className="longText"> <span className=" info">Diet Requirments Info : </span> {this.state.currentItem.dietRequirmentInfo}</p>
                    </div>
                </Modal>
                <div className="scrollView">
                    <hr/>
                    <div>
                        <div>
                            {this.state.benefactors.map((currentItem , i) => {
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
