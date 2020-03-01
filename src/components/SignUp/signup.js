import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import "./signup.css";
import { app } from '../../firebase';
import firebase from "firebase";
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';


class SignUp extends Component {
    state = {
        selected : "none",
        error : ""
    };

    signUp = () => {
        this.setState({
            toDashboard: true
        })
    }

    onVolunteerFormSubmit = (e) => {
        e.preventDefault();

        const firstname = e.target.elements.firstname.value;
        const lastname = e.target.elements.lastname.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        const homeeddress = e.target.elements.homeeddress.value;
        const aptnumber = e.target.elements.aptnumber.value;
        const city = e.target.elements.city.value;
        const postalcode = e.target.elements.postalcode.value;
        const phonenumber = e.target.elements.phonenumber.value;
        const province = e.target.elements.province.value;
        const volunteerReason = e.target.elements.volunteerReason.value;
        const howCanHelp = e.target.elements.howCanHelp.value;

        app.auth().createUserWithEmailAndPassword(email , password).then((u)=>{
            console.log("SignUp successful");
            console.log(u);

            firebase.database().ref(`volunteers/${u.user.uid}`).set({
                email : email,
                firstname : firstname,
                lastname : lastname,
                homeeddress : homeeddress,
                aptnumber : aptnumber,
                city : city,
                postalcode : postalcode,
                phonenumber : phonenumber,
                province : province,
                volunteerReason : volunteerReason,
                howCanHelp : howCanHelp,
                approved : false,
                role : "Volunteer",
                status : "pending",
                bio : "",
                special : false,
                agreementSignature: false,
                uid : u.user.uid

            }).then(()=>{
                console.log("volunteer data add successful")
                this.props.closeModal();
                this.setState({
                    error : ""
                })
            }).catch((err)=>{
                console.log(err)
                this.setState({
                    error : err.message
                })
            })
        }).catch((err)=>{
            console.log(err)
            this.setState({
                error : err.message
            })
        })
    };

    onBenefactorFormSubmit = (e) => {
        e.preventDefault();

        const firstname = e.target.elements.firstname.value;
        const lastname = e.target.elements.lastname.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const homeeddress = e.target.elements.homeeddress.value;
        const aptnumber = e.target.elements.aptnumber.value;
        const city = e.target.elements.city.value;
        const postalcode = e.target.elements.postalcode.value;
        const phonenumber = e.target.elements.phonenumber.value;
        const province = e.target.elements.province.value;
        const fullTimeSchool = e.target.elements.fullTimeSchool.value;
        const fullTimeSchoolAfterBirth = e.target.elements.fullTimeSchoolAfterBirth.value;
        const relationshipStatus = e.target.elements.relationshipStatus.value;
        const dietRequirmentInfo = e.target.elements.dietRequirmentInfo.value;
        const dietRequirment = e.target.elements.dietRequirment.value;
        const smoking = e.target.elements.smoking.value;
        const exerciseNumber = e.target.elements.exerciseNumber.value;
        const canadianStatus = e.target.elements.canadianStatus.value;

        const incomeSource = e.target.elements.incomeSource.value;
        const householdIncome = e.target.elements.householdIncome.value;
        const veteranStatus = e.target.elements.veteranStatus.value;
        const indigenousStatus = e.target.elements.indigenousStatus.value;
        const visibleMinority = e.target.elements.visibleMinority.value;
        const disability = e.target.elements.disability.value;
        const gestation = e.target.elements.gestation.value;

        app.auth().createUserWithEmailAndPassword(email , password).then((u)=>{
            console.log("SignUp successful");

            firebase.database().ref(`benefactors/${u.user.uid}`).set({
                incomeSource: incomeSource,
                householdIncome: householdIncome,
                veteranStatus : veteranStatus,
                indigenousStatus : indigenousStatus,
                visibleMinority : visibleMinority,
                disability : disability,
                gestation : gestation,
                email : email,
                firstname : firstname,
                lastname : lastname,
                homeeddress : homeeddress,
                aptnumber : aptnumber,
                city : city,
                postalcode : postalcode,
                phonenumber : phonenumber,
                province : province,
                fullTimeSchool : fullTimeSchool,
                fullTimeSchoolAfterBirth : fullTimeSchoolAfterBirth,
                relationshipStatus : relationshipStatus,
                dietRequirmentInfo : dietRequirmentInfo,
                dietRequirment : dietRequirment,
                //document : document,
                smoking : smoking,
                exerciseNumber : exerciseNumber,
                canadianStatus : canadianStatus,
                approved : false,
                status : "pending",
                role : "Benefactor",
                // document : url,
                bio : "",
                special : false,
                uid : u.user.uid,
                signUpDate : new Date().toJSON().slice(0,10).replace(/-/g,'/')
    
            }).then(()=>{
                console.log("Benefactor data add successful");
                this.props.closeModal();
                this.setState({
                    error : ""
                })
            }).catch((error)=>{
                console.log(error)
                this.setState({
                    error : error.message
                })
            })
        }).catch((err)=>{
            console.log(err)
            this.setState({
                error : err.message
            })
        })

        // const file = e.target.elements.document.files[0]
        // const uploadTask = firebase.storage().ref(`images/${file.name}`).put(file);
        // uploadTask.on("state_changed" ,
        //     (snapshot)=>{

        //     } ,
        //     (error)=>{
        //         console.log(error);
        //     } ,
        //     ()=>{
        //         firebase.storage().ref('images').child(file.name).getDownloadURL().then((url)=>{
        //             console.log(url)
                    
        //         })
        //     }
        // )
    };

    renderSeleccted(){
        if(this.state.selected === "volunteer"){
            return (
                <div>
                    <form onSubmit={this.onVolunteerFormSubmit} className="option_form" action="">
                        <div className="option_form_grid">
                            <input type="text" placeholder="First name" name="firstname" required/>
                            <input type="text" placeholder="Last name" name="lastname" required/>
                            <input type="email" placeholder="Email" name="email" required/>
                            <input type="password" placeholder="Password" name="password" required/>
                        </div>
                        <div className="option_form_grid">
                            <input type="text" placeholder="Home Address" name="homeeddress" required/>
                            <input type="text" placeholder="Apt/Unit" name="aptnumber" required/>
                            <input type="text" placeholder="City" name="city" required/>
                            <input type="text" placeholder="Postal Code" name="postalcode" required/>
                            <input type="text" placeholder="Phone Number" name="phonenumber" required/>
                            <input type="date" name="birthday" required/>
                            <select name="province" required>
                                <option value="ontario">Ontario</option>
                                <option value="quebec">Quebec</option>
                                <option value="yukon">Yukon</option>
                                <option value="manitoba">Manitoba</option>
                                <option value="alberta">Alberta</option>
                                <option value="british columbia">British Columbia</option>
                                <option value="nova scotia">Nova Scotia</option>
                                <option value="prince edward island">Prince Edward Island</option>
                                <option value="new brunswick">New Brunswick</option>
                                <option value="saskatchewan">Saskatchewan</option>
                                <option value="nunavut">Nunavut</option>
                                <option value="northwest territories">Northwest Territories</option>
                                <option value="newfoundland and labrador">Newfoundland and Labrador</option>
                            </select>
                        </div>
                        <div>
                            <textarea placeholder="Why do you want to volunteer" style={{width:"100%"}} rows="4" name="volunteerReason" required></textarea>
                        </div>
                        <div>
                            <textarea placeholder="How can you be of help" style={{width:"100%"}} rows="4"  name="howCanHelp" required></textarea>
                        </div>
                        <div className="sign-up_button">
                            <button type="submit">Sign Up</button>
                        </div>
                        <p>{this.state.error}</p>
                        <p className="terms">By Clicking Sign Up you agree to <a href="/terms-of-service" target="_blank">Terms and Conditions </a>of Rudaina Foundation</p>
                    </form>
                </div>
                    )
        }
        else if(this.state.selected === "benefactor"){
            return (
                <div>
                    <form onSubmit={this.onBenefactorFormSubmit} className="option_form" action="">
                        <div className="option_form_grid">
                            <input type="text" placeholder="First name" name="firstname" required/>
                            <input type="text" placeholder="Last name" name="lastname" required/>
                            <input type="email" placeholder="Email" name="email" required/>
                            <input type="password" placeholder="Password" name="password" required/>
                        </div>
                        <div className="option_form_grid">
                            <input type="text" placeholder="Home Address" name="homeeddress" required/>
                            <input type="text" placeholder="Apt/Unit" name="aptnumber" required/>
                            <input type="text" placeholder="City" name="city" required/>
                            <input type="text" placeholder="Postal Code" name="postalcode" required/>
                            <input type="text" placeholder="Phone Number" name="phonenumber" required/>
                            <input type="date" name="birthday"/>
                            <select name="province" >
                                <option value="ontario">Ontario</option>
                                <option value="quebec">Quebec</option>
                                <option value="yukon">Yukon</option>
                                <option value="manitoba">Manitoba</option>
                                <option value="alberta">Alberta</option>
                                <option value="british columbia">British Columbia</option>
                                <option value="nova scotia">Nova Scotia</option>
                                <option value="prince edward island">Prince Edward Island</option>
                                <option value="new brunswick">New Brunswick</option>
                                <option value="saskatchewan">Saskatchewan</option>
                                <option value="nunavut">Nunavut</option>
                                <option value="northwest territories">Northwest Territories</option>
                                <option value="newfoundland and labrador">Newfoundland and Labrador</option>
                            </select>
                        </div>
                        <div className="more-info_grid">
                            <div className="more-info_frid_option"> 
                                <p>Are you currently a full time student?</p>
                                <select name="fullTimeSchool" required>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="partTime">Part Time</option>
                                </select>
                            </div>
                            <div className="more-info_frid_option"> 
                                <p>Will you be attending full-time school during/after pregnancy?</p>
                                <select name="fullTimeSchoolAfterBirth" required>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="partTime">Part Time</option>
                                </select>
                            </div>
                            <div className="more-info_frid_option"> 
                                <p>Relationship Status?</p>
                                <select name="relationshipStatus" required>
                                    <option value="inARelationship">In a relationship</option>
                                    <option value="single">Single</option>
                                </select>
                            </div>
                            <div className="more-info_frid_option"> 
                                <p>What is your status in Canada?</p>
                                <select name="canadianStatus" required>
                                    <option value="citizen">Citizen</option>
                                    <option value="permanentResident">Permanent Resident</option>
                                    <option value="refugee">Refugee</option>
                                    <option value="notCanadian">Not Canadian</option>
                                </select>
                            </div>
                            <div className="more-info_frid_option"> 
                                <p>How many days do you exercise per week?</p>
                                <select name="exerciseNumber" required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                            </div>
                            <div className="more-info_frid_option"> 
                                <p>Do you smoke?</p>
                                <select name="smoking" required>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="more-info_frid_option"> 
                                <p>Do you have a sourse of income?</p>
                                <select name="incomeSource" required>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="more-info_frid_option"> 
                                <p>How many sources of household income do you have ?</p>
                                <select name="householdIncome" required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                            </div>

                            <div className="more-info_frid_option"> 
                                <p>Do you have a veteran status ?</p>
                                <select name="veteranStatus" required>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="more-info_frid_option"> 
                                <p>Do you have an Indigenous status ?</p>
                                <select name="indigenousStatus" required>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="more-info_frid_option"> 
                                <p>Do you identify as a visible minority ?</p>
                                <select name="visibleMinority" required>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="more-info_frid_option"> 
                                <p>Do you have a physical or mental disability ?</p>
                                <select name="disability" required>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="more-info_frid_option"> 
                                <p>How many weeks gestation are you currently ?</p>
                                
                                <textarea style={{width:"100%"}}  name="gestation" placeholder="Weeks of gestation"></textarea>
                            </div>

                            {/**<div className="more-info_frid_option "> 
                                <p>Please upload a document to proove pregnancy</p>
                                <input className="align" id="a" name="document" type="file" required/>
                            </div>**/}
                            <div className="more-info_frid_option"> 
                                <p>Do you have any special dietary restrictions? (vegan, vegetarian, allergies, religious, etc.))?</p>
                                <select name="dietRequirment" required>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select><br/>
                                <textarea style={{width:"100%"}} rows="4"  name="dietRequirmentInfo" placeholder="If yes please specify..."></textarea>
                            </div>
                        </div>
                        <p className="resetError">{this.state.error}</p>
                        <div className="sign-up_button">
                            <button onClick={this.signUp} type="submit">Sign Up</button>
                        </div>
                        
                        <p className="terms">By Clicking Sign Up you agree to <a href="/terms-of-service" target="_blank">Terms and Conditions </a> and <a href="/life-basket-terms" target="_blank">Life Basket Program Registration Consent Form </a> of Rudaina Foundation</p>
                    </form>
                </div>
            )
        }
        return <div style={{fontSize : "2rem"}}></div>
    }

    changeSection(selection){
        this.setState({
            selected : selection
        })
    }

    render() {
        let benefactor_active = this.state.selected === "benefactor" ? "active" : "inActive";
        let volunter_active = this.state.selected === "volunteer" ? "active" : "inActive";
        return (
            <div>
                <div className="signUpContainer">
                    <div className="authTextTitle">Create An Account </div>
                    <div className="optionContainer">
                        <div className="option">
                            <img className={benefactor_active} onClick = {()=>this.changeSection("benefactor")} src="/img/pregnantwoman.jpeg" alt=""/>
                            <p>Benefactor</p>
                        </div>
                        <div className="option">
                            <img className={volunter_active} onClick = {()=>this.changeSection("volunteer")} src="/img/volunteer.jpeg" alt=""/>
                            <p>Volunteer</p>
                        </div>
                    </div>
                    <div>
                        {this.renderSeleccted()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
