import React, { Component } from 'react';
import "./featureVolunteer.css";
import firebase from "firebase";

class FeatureVolunteer extends Component {
    state = {
        addSectionShowing : false,
        features : []
    }

    toggleAddSection = ()=>{
        this.setState({
            addSectionShowing : !this.state.addSectionShowing,
        })
    }

    componentWillMount = () => {
        firebase.database().ref('features').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    products : Object.values(data.toJSON())
                })
            }
        })
    }
    

    handleAddFeature = (e) => {
        e.preventDefault();
        const file = e.target.elements.document.files[0];
        const elements = e.target.elements;
        const featureName = e.target.elements.featureName.value.trim();
        const featureAbout = e.target.elements.featureAbout.value.trim();
        const featureRole = e.target.elements.featureRole.value.trim();
        console.log(featureName , featureAbout , featureRole, file);

        if(file){
            const uploadTask = firebase.storage().ref(`features/${file.name}`).put(file);
            uploadTask.on("state_changed" ,
                (snapshot)=>{

                } ,
                (error)=>{
                    console.log(error);
                } ,
                ()=>{
                    firebase.storage().ref('features').child(file.name).getDownloadURL().then((url)=>{
                        console.log(url)
                        // this.props.updatePic(url)
                        // firebase.database().ref(`${this.props.user.role.toLowerCase() + "s"}/${this.props.user.uid}`).update({
                        //     url : url,
                        //     bio : bio,
                        //     phonenumber : phonenumber
                        // })
                        this.addFeature(featureName , featureAbout , featureRole, url);
                        this.toggleAddSection();
                    })
                }
            )
        }else{
            // firebase.database().ref(`${this.props.user.role.toLowerCase() + "s"}/${this.props.user.uid}`).update({
            //     bio : bio,
            //     phonenumber : phonenumber,
            //     email : email
            // })
            this.addFeature(featureName , featureAbout , featureRole, null);
            this.toggleAddSection();
        }
    }

    deleteFeature = (i) => {
        console.log(i.toString())
        console.log("deleting product")
        firebase.database().ref('features').child(i+'').remove();
        
        firebase.database().ref('features').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    features : Object.values(data.toJSON())
                })
            }
            else{
                this.setState({
                    features : null
                })
            }
        })
    }

    addFeature = (featureName , featureAbout , featureRole, url) => {
        var d = new Date();
        var n = d.getTime();
        firebase.database().ref(`features/${n}`).set({
            featureName : featureName,
            featureAbout : featureAbout,
            featureRole : featureRole,
            image : url,
            id : n
        }).then(()=>{
            firebase.database().ref('features').on('value' , (data)=>{
                if(data.toJSON()){
                    console.log("well looks like it worked")
                    this.setState({
                        features : Object.values(data.toJSON())
                    })
                }
                else{
                    this.setState({
                        features : []
                    })
                }
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        console.log(((this.state.features)))
        return (
            <div>
                <div className="newsHeader">
                    <p>FEATURES </p>
                    <i onClick={this.toggleAddSection} className="fas fa-plus-square"></i>
                </div>
                {this.state.addSectionShowing && 
                    <div>
                        <form className="eventDatas" onSubmit={this.handleAddFeature} action="">
                            <div className="newsTitle_ext">
                                <div>
                                    <p>Feature Name :</p>
                                    <input type="text" name="featureName" placeholder="Enter Persons Name"/>
                                </div>
                                <div>
                                    <p>Feature Role :</p>
                                    <input type="text" name="featureRole" placeholder="Enter Persons Role"/>
                                </div>
                            </div>
                            <div>
                                <p>About Feature :</p>
                                {/*<input className="eventDesc" type="text" name="desc" />*/}
                                <textarea name="featureAbout"  rows="4" cols="80%" className="eventDesc"></textarea>
                                {/*<input type="text" placeholder="Enter News Text"/>*/}
                            </div>
                            <div className="eventDates">
                                <div>
                                    <p>Upload image : </p>
                                    <input className="updateInput" id="" name="document" type="file"/>
                                </div>
                            </div>
                            <div>
                                <input className="eventSubmit" type="submit" value="ADD"/>
                            </div>
                        </form>
                    </div>
                }
                <hr/>
                {(this.state.features !== null) && 
                    this.state.features.map((currentItem , i) => {
                        return (
                            <div key={i}  className="productContainer">
                                <p>{currentItem.featureName}</p>
                                <p>{currentItem.featureAbout}</p>
                                <i onClick={()=>this.deleteProduct(currentItem.id)} className="fas fa-trash-alt "></i>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default  FeatureVolunteer;
