import React, { Component } from 'react';
import "./news.css";
import firebase from "firebase";

class News extends Component {
    state = {
        addSectionShowing : false,
        news : [],
        relevantNews : [],
        pregnancyNews : [],
        charityNews : [],
        reRender : false,
        selectedNewsGroup : "relevant"
    }

    toggleAddSection = ()=>{
        this.setState({
            addSectionShowing : !this.state.addSectionShowing,
        })
    }

    componentWillMount = () => {

        firebase.database().ref('news/relevant').on('value' , (data)=>{
            console.log("I am fetching relevant news")
            if(data.toJSON()){
                this.setState({
                    relevantNews : Object.values(data.toJSON()),
                })
            }
        })

        firebase.database().ref('news/pregnancy').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    pregnancyNews : Object.values(data.toJSON()),
                })
            }
        })

        firebase.database().ref('news/charity').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    charityNews : Object.values(data.toJSON()),
                })
            }
        })
    }

    refresh = () => {

        firebase.database().ref('news/relevant').on('value' , (data)=>{
            console.log("I am fetching relevant news")
            if(data.toJSON()){
                this.setState({
                    relevantNews : Object.values(data.toJSON()),
                })
            }
        })

        firebase.database().ref('news/pregnancy').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    pregnancyNews : Object.values(data.toJSON()),
                })
            }
        })

        firebase.database().ref('news/charity').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    charityNews : Object.values(data.toJSON()),
                })
            }
        })
    }
    

    handleAddnews = (e) => {
        e.preventDefault();
        const file = e.target.elements.document.files[0];
        const elements = e.target.elements;
        const newsHeading = e.target.elements.newsHeading.value.trim();
        const newsText = e.target.elements.newsText.value.trim();
        // const newsImage = e.target.elements.newsImage.value.trim();
        const externalLink = e.target.elements.externalLink.value.trim();
        const newsGroup = e.target.elements.newsGroup.value.trim();

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
                        // this.props.updatePic(url)
                        // firebase.database().ref(`${this.props.user.role.toLowerCase() + "s"}/${this.props.user.uid}`).update({
                        //     url : url,
                        //     bio : bio,
                        //     phonenumber : phonenumber
                        // })
                        this.addNews(newsHeading,newsText,url,externalLink,newsGroup);
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
            this.addNews(newsHeading,newsText,"non",externalLink,newsGroup);
            this.toggleAddSection();
        }

    
    }

    deleteNews = (i) => {
        console.log(i.toString())
        console.log("deleting news")
        firebase.database().ref(`news/${this.state.selectedNewsGroup}`).child(i+'').remove();
        
        this.refresh();
    }

    toggleNewsGroup=(group)=>{
        this.setState({
            selectedNewsGroup : group
        })
    }

    addNews = (newsHeading,newsText,newsImage,externalLink,newsGroup) => {
        var d = new Date();
        var n = d.getTime();
        firebase.database().ref(`news/${newsGroup}/${n}`).set({
            newsHeading : newsHeading,
            newsText : newsText,
            newsImage : newsImage,
            externalLink : externalLink,
            id : n
        }).then(()=>{
            firebase.database().ref('news/${newsGroup}').on('value' , (data)=>{
                if(data.toJSON()){
                    console.log("well looks like it worked")
                    this.setState({
                        newsGroup : Object.values(data.toJSON())
                    })
                }
                else{
                    newsGroup : []
                }
            })
        }).catch((error)=>{
            //console.log(error)
        })
    }

    render() {
        return (
            <div>
                <div className="newsHeader">
                    <p>NEWS </p>
                    <i onClick={this.toggleAddSection} className="fas fa-plus-square"></i>
                </div>
                {this.state.addSectionShowing && 
                    <div>
                        <form className="eventDatas" onSubmit={this.handleAddnews} action="">
                            <div className="newsTitle_ext">
                                <div>
                                    <p>News Header :</p>
                                    <input type="text" name="newsHeading" placeholder="Enter News Header"/>
                                </div>
                                <div>
                                    <p>External Link :</p>
                                    <input type="text" name="externalLink" placeholder="Enter External Link"/>
                                </div>
                            </div>
                            <div>
                                <p>News Text :</p>
                                {/*<input className="eventDesc" type="text" name="desc" />*/}
                                <textarea name="newsText"  rows="4" cols="80%" className="eventDesc"></textarea>
                                {/*<input type="text" placeholder="Enter News Text"/>*/}
                            </div>
                            <div className="eventDates">
                                <div>
                                    <p>Upload image : </p>
                                    <input className="updateInput" id="" name="document" type="file"/>
                                </div>
                                <div>
                                    <p>News Category : </p>
                                    <select name="newsGroup">
                                        <option value="relevant">Relevant News</option>
                                        <option value="pregnancy">Pregnancy News</option>
                                        <option value="charity">Charity News</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <input className="eventSubmit" type="submit" value="ADD"/>
                            </div>
                        </form>
                    </div>
                }
                <hr/>
                <div className="newsGroup">
                    <p className={ (this.state.selectedNewsGroup == "relevant") && "newsGroupActive"} onClick={()=>{this.toggleNewsGroup("relevant")}}>Relevant News</p>
                    <p className={ (this.state.selectedNewsGroup == "pregnancy") && "newsGroupActive"} onClick={()=>{this.toggleNewsGroup("pregnancy")}}>Pregnancy News</p>
                    <p className={ (this.state.selectedNewsGroup == "charity") && "newsGroupActive"} onClick={()=>{this.toggleNewsGroup("charity")}}>Charity News</p>
                </div>
                <hr/>
                <div>
                    {(this.state.selectedNewsGroup === "relevant") && 
                        this.state.relevantNews.map((currentItem , i) => {
                            return (
                                <div key={i}  className="productContentContainer">
                                    <div>
                                        <p className="newsHeading">{currentItem.newsHeading}</p>
                                        <p>{currentItem.newsText}</p>
                                    </div>
                                    <div onClick={()=>this.deleteNews(currentItem.id)} className="productTrash">
                                        <i className="fas fa-trash-alt "></i>
                                    </div>
                            
                                </div>
                            )
                        })
                    }
                    {(this.state.selectedNewsGroup === "pregnancy") && 
                        this.state.pregnancyNews.map((currentItem , i) => {
                            return (
                                <div key={i}  className="productContentContainer">
                                    <div>
                                        <p className="newsHeading">{currentItem.newsHeading}</p>
                                        <p>{currentItem.newsText}</p>
                                    </div>
                                    
                                    <div onClick={()=>this.deleteNews(currentItem.id)} className="productTrash">
                                        <i className="fas fa-trash-alt "></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {(this.state.selectedNewsGroup === "charity") && 
                        this.state.charityNews.map((currentItem , i) => {
                            return (
                                <div key={i}  className="productContentContainer">
                                    <div>
                                        <p className="newsHeading">{currentItem.newsHeading}</p>
                                        <p>{currentItem.newsText}</p>
                                    </div>
                                
                                    <div onClick={()=>this.deleteNews(currentItem.id)} className="productTrash">
                                        <i className="fas fa-trash-alt "></i>
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

export default News;
