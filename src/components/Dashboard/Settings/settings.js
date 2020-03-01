import React, { Component } from 'react';
import "./settings.css";
import {storage} from "firebase";
import firebase from 'firebase';

class Settings extends Component {
    state = {
        error : ""
    }

    updateProfile = (e) => {
        e.preventDefault();
        const file = e.target.elements.document.files[0]
        const elements = e.target.elements;
        var phonenumber = this.props.user.phonenumber;
        var bio = this.props.user.bio;
        var email = this.props.user.email;

        if(elements.phonenumber.value.trim()){
            phonenumber = elements.phonenumber.value.trim()
        }
        if(elements.bio.value.trim()){
            bio = elements.bio.value.trim()
        }

        if(elements.newPassword.value.trim() && elements.oldPassword.value.trim()){
            firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(firebase.auth.EmailAuthProvider.credential(this.props.user.email ,elements.oldPassword.value.trim())).then(()=>{
                console.log("We re-auth")
                firebase.auth().currentUser.updatePassword(elements.newPassword.value.trim()).then(()=>{
                    console.log("Password Update Success")
                    this.setState({
                        error : "* Your Password have been updated *"
                    })
                }).catch(()=>{
                    console.log("Password Update Failure")
                    this.setState({
                    error : "* Please ensure your old password is correct *"
                })
                })
            }).catch(()=>{
                console.log("could not re-auth")
                this.setState({
                    error : "* Please ensure your old password is correct *"
                })
            })
        }

        // CODE TO UPDATE EMAIL
        // if(elements.newEmail.value.trim() && elements.oldPasswordEmail.value.trim()){
        //     console.log("about to change email")
        //     firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(firebase.auth.EmailAuthProvider.credential(this.props.user.email ,elements.oldPasswordEmail.value.trim())).then(()=>{
        //         console.log("We re-auth for email")
        //         firebase.auth().currentUser.updateEmail(elements.newEmail.value.trim()).then(()=>{
        //             console.log("Email Update Success")
        //             email = elements.newEmail.value.trim();
        //         }).catch(()=>{
        //             console.log("Email Update Failure")
        //         })
        //     }).catch(()=>{
        //         console.log("could not re-auth")
        //     })
        // }

        if(file){
            const uploadTask = firebase.storage().ref(`images/${file.name}`).put(file);
            uploadTask.on("state_changed" ,
                (snapshot)=>{

                } ,
                (error)=>{
                    console.log(error);
                } ,
                ()=>{
                    firebase.storage().ref('images').child(file.name).getDownloadURL().then((url)=>{
                        console.log(url)
                        this.props.updatePic(url)
                        firebase.database().ref(`${this.props.user.role.toLowerCase() + "s"}/${this.props.user.uid}`).update({
                            url : url,
                            bio : bio,
                            phonenumber : phonenumber
                        })
                    })
                }
            )
        }else{
            firebase.database().ref(`${this.props.user.role.toLowerCase() + "s"}/${this.props.user.uid}`).update({
                bio : bio,
                phonenumber : phonenumber,
                email : email
            })
        }
    }
    render() {
        console.log("This is the user")
        console.log(this.props.user)
        return (
            <div className="settings settingItem">
                <form onSubmit={this.updateProfile} action="">
                    <p className="updateText">Update Profile Picture :</p>
                    <input className="updateInput" id="" name="document" type="file"/>
                    <hr/>
                    <p className="updateText">Update Bio :</p>
                    <div>
                        <textarea name="bio" rows="6">
                        {this.props.user.bio}
                        </textarea>
                    </div>
                    <hr/>
                    <p className="updateText">Update Phone :</p>
                    <input autocomplete="false" className="updateInput" type="tel" name="phonenumber" placeholder={this.props.user.phonenumber} />
                    <hr/>
                    <p className="updateText">Update Password :</p>
                    <input autocomplete="new-password" style={{marginBottom : "20px" }} className="updateInput" type="password" name="oldPassword" placeholder="Current Password" autoCapitalize="none" />
                    <input autocomplete="new-password" className="updateInput" type="password" name="newPassword" placeholder="New Password" autoCapitalize="none" />
                    <hr/>
                    {/* <p className="updateText">Update Email</p>
                    <input style={{marginBottom : "20px" }} className="updateInput" type="password" name="oldPasswordEmail" placeholder="Current Password" autoCapitalize="none" />
                    <input className="updateInput" type="email" name="newEmail" placeholder={this.props.user.email} autoCapitalize="none" />
                    <hr/> */}
                    <p className="passpordErrorText">{this.state.error}</p>
                    <input className="updateBtn" type="submit" value="Update"/>
                </form>
            </div>
        )
    }
}

export default Settings;
