import React, { Component } from 'react';
import "./profile.css";
import firebase from "firebase";

class Profile extends Component {
    agreement = () => {
        firebase.database().ref(`volunteers/${this.props.user.uid}`).update({
            agreementSignature : true
        }).then(()=>{
            // this.setState({
            //     currentItem : [],
            // })
        }).catch((error)=>{
        })
    }

    showProfileContent = () => {
        if(this.props.user.agreementSignature === false){
            return (
                <div>
                    <div className="userAgreement">
                        <div>
                            <p className="agreementTitle">Volunteer Service Agreement</p>
                            {/*<p>
                                Rudaina Foundation, Registered Canadian Charity (Charity no. 792154882RR0001) (legal entity
                                as of September 29 th , 2017), of registered address 8805 Victoria Street, Metcalfe, Ontario,
                                K0A2P0
                                </p>*/}


                            <h3>
                            This Agreement is made between the Rudaina Foundation hereinafter referred to as “charity”,
                            and you, the account holder, hereinafter referred to as “volunteer.”
                            Whereas, volunteer intends to donate services to the charity identified above, and said charity
                            intends to accept the donation of volunteer services. 
                            NOW THEREFORE, in consideration of the mutual promises, the parties hereto agree as
                            follows:
                            </h3>
                        </div>

                        <hr></hr>

                        <div className="agreementText">
                        <p><span>1.</span></p>
                        <p>
                        Volunteer agrees to donate services to charity in the capacity discussed with Rudaina
                        Directors.
                        </p>
                        </div>
                        
                        <div className="agreementText">
                        <p><span>2.</span></p>
                        <p>
                        It is mutually and expressly understood that volunteer services shall be donated, and that
                        said volunteer is not entitled to nor expects any present or future salary, wages, or other
                        benefits for these voluntary services.
                        </p>
                        </div>

                        <div className="agreementText">
                        <p><span>3.</span></p>
                        <p>
                        Volunteer agrees to follow the supervision and direction of any personnel, employee, or
                        volunteer, to whom volunteer has been assigned to perform services, and to participate in
                        any training required by the charity in order to perform the voluntary services.
                        </p>
                        </div>

                        <div className="agreementText">
                        <p><span>4.</span></p>
                        <p>
                        Volunteer agrees that he/she will not be considered to be an employee of the charity, for
                        any purposes other than tort claims and injury compensation, while performing the above
                        described voluntary services.
                        </p>
                        </div>

                        <div className="agreementText">
                        <p><span>5.</span></p>
                        <p>
                        Volunteer further understands that if volunteer is responsible for injuries to third parties
                        or damages to their property while acting outside the scope of assigned volunteer duties,
                        which said volunteer may be held personally liable for any monetary damages a court
                        may award to the injured party.
                        </p>
                        </div>

                        <div className="agreementText">
                        <p><span>6.</span></p>
                        <p>
                        It is further understood and agreed to by volunteer that the services rendered to the
                        charity shall apply only in the case of liability arising out of the ordinary negligence that
                        occurs during the scope of the volunteer’s services agreed to herein, and that in no way
                        do any of these provisions apply for the benefit of volunteer, his/her heirs, executors or
                        administrators in any action arising out of gross negligence, willful misconduct, or any
                        other conduct on the part of said volunteer, which cause or may give rise to criminal
                        liability.
                        </p>
                        </div>

                        <div className="agreementText">
                        <p><span>7.</span></p>
                        <p>
                        Volunteer further agrees that volunteer will fully cooperate with the charity and its agents
                        in any investigation, lawsuit, arbitration, or any other legal proceedings that arise from
                        the matters covered by this agreement. Volunteer further agrees to notify the charity
                        immediately of any incident that occurs or may occur within the knowledge of the
                        volunteer, which gives rise to liability on the part of the volunteer of the charity.
                        </p>
                        </div>

                        <div className="agreementText">
                        <p><span>8.</span></p>
                        <p>
                        All work done by the volunteer is considered confidential and cannot be shared with
                        persons outside of the scope of the charity.
                        </p>
                        </div>

                        <div className="agreementText">
                        <p><span>9.</span></p>
                        <p>
                        All and any work done by the volunteer for the charity is considered the property of the
                        charity and cannot be reused, redistributed and or sold for the benefit of the volunteer.
                        </p>
                        </div>

                        <div className="agreementText">
                        <p><span>10.</span></p>
                        <p>
                        By agreeing to this agreement, the volunteer understands that any volunteer assignment
                        will begin on the date of the approval of the volunteer and the assignment may be
                        terminated at any time by either party to this agreement.
                        </p>
                        </div>

                        <div onClick={this.agreement} className="agreeButton">Accept</div>
                    </div>
                </div>
                )
        }
        return (
            <div className="profileContainer">
                <div className="profileImageName hideOnSmallScreen">
                {!(this.props.user.status === "approved") && <p className="pending">* Account pending approval.</p>}
                    <img src={this.props.user.url ? this.props.user.url : "/emptyPic.png"} alt=""/>
                    {this.props.user.role == "Benefactor" && <div className="advisorContactContainer">
                        <p className="profileBioTtile">YOUR ADVISOR CONTACT</p>
                        <div className="advisorContact">
                            <p>Aslam Yehia</p>
                            <p><a href="tel:+1-613-294-0275">(+1) 613-294-0275</a></p>
                            <p><a href="mailto:Aslam.yehia@hotmail.com?Subject=Hello,%20Rudaina%20user" target="_top">Aslam.yehia@hotmail.com</a></p>
                        </div>
                    </div>}
                </div>
                <div className="profileInfo">
                    <div className="profileData">
                        <div className="hideOnLargeScreen mobilePic">
                            <img src={this.props.user.url ? this.props.user.url : "/emptyPic.png"} alt=""/>
                            <p>{`${this.props.user.firstname}  ${this.props.user.lastname}`}({`${this.props.user.role}`})</p>
                            <p>{`${this.props.user.email} | ${this.props.user.phonenumber}`}</p>
                        </div>
                        <div className="hideOnSmallScreen">
                            <div className="profileDataItem profileDataMobileView">
                                <p className="hideOnSmallScreen profileBioTtile">Full Name</p>
                                <div className="dataItemContainer">
                                    <div className="hideOnSmallScreen">
                                        <i className="fas fa-user-alt"></i>
                                    </div>
                                    <p className="dataItem">{`${this.props.user.firstname}  ${this.props.user.lastname}`}</p>
                                </div>
                            </div>
                            <div className="profileDataItem profileDataMobileView">
                                <p className="hideOnSmallScreen profileBioTtile">Status</p>
                                <div className="dataItemContainer">
                                    <div className="hideOnSmallScreen">
                                        <i className="fas fa-id-card"></i>
                                    </div>
                                    <p className="dataItem">{`${this.props.user.role}`}</p>
                                </div>
                            </div>
                            <div className="profileDataItem profileDataMobileView">
                                <p className="hideOnSmallScreen profileBioTtile">Email</p>
                                <div className="dataItemContainer">
                                    <div className="hideOnSmallScreen">
                                        <i className="fas fa-envelope-square"></i>
                                    </div>
                                    <p className="dataItem">{`${this.props.user.email}`}</p>
                                </div>
                            </div>
                            <div className="profileDataItem profileDataMobileView">
                                <p className="hideOnSmallScreen profileBioTtile">Phone </p>
                                <div className="dataItemContainer">
                                    <div className="hideOnSmallScreen">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <p className="dataItem">{`${this.props.user.phonenumber}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profileBio">
                        <p className="profileBioTtile">About Me</p>
                        <p className="profileBioText">{this.props.user.bio}</p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="profileAgreementContainer">
                {this.showProfileContent()}
            </div>
        )
    }
}

export default  Profile;
