import React, { Component } from 'react';
import "./forum.css";
import firebase from "firebase";

class Forum extends Component {
    state = {
        sender : "Ryan",
        senderStatus : "admin",
        messages : [],
        replyingTo : null,
        replyingToIndex : null
    }

    messagesEnd = React.createRef();

    // componentDidMount () {
    //     this.scrollToBottom()
    // }
    // componentDidUpdate () {
    //     this.scrollToBottom()
    // }
    // scrollToBottom = () => {
    //     this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
    // }

    componentWillMount = () => {
        firebase.database().ref('messages').on('value' , (data)=>{
            if(data.toJSON()){
                let messageCount =0;
                let array1 = Object.values(data.toJSON());
                let array2 = [];

                array1.forEach((arr)=>{
                    arr[6] = messageCount;
                    array2.push(arr);
                    messageCount++;
                });
                this.setState({
                    messages : array2
                })
                // this.setState({
                //     messages : Object.values(data.toJSON())
                // })
            }
        })
    }

    abortReply = ()=>{
        this.setState({
            replyingTo : null,
            replyingToIndex : null
        })
    }

    replyTo(message){
        this.setState({
            replyingToIndex : message,
            replyingTo : this.state.messages[message]
        })
        // firebase.database().ref(`messages/${messageId}`).once('value' , (data)=>{
        //     if(data.toJSON()){
        //         console.log("WE GOT IT!")
        //         this.setState({
        //             replyingTo : Object.values(data.toJSON())
        //         })
        //     }
        // })
    }

    handleAddMessage = (e) => {
        e.preventDefault();

        const message = e.target.elements.message.value.trim();
        console.log(message);

        if(message){
            var d = new Date();
            var n = d.getTime();

            var x = new Date();
            var y = x.getFullYear().toString();
            var m = (x.getMonth() + 1).toString();
            var d = x.getDate().toString();
            var curr_hour = x.getHours();
            var curr_min = x.getMinutes();
            (d.length == 1) && (d = '0' + d);
            (m.length == 1) && (m = '0' + m);
            let yyyymmddhhmm = y + "-" + m + "-" + d + " " + curr_hour + ":" + curr_min;
            let messageIndex = 0;

            console.log("i am in handle message to see if user exist")
            console.log(this.props.user)
            let name = this.props.user.firstname + " " + this.props.user.lastname 
            let email = this.props.user.email;
            console.log(name)

            if(this.state.replyingToIndex){
                firebase.database().ref(`messages/${n}`).set({
                    message : message,
                    sender : name,
                    date : new Date().toLocaleString(),
                    senderRank : this.props.user.role,
                    email : email,
                    messageIndex : messageIndex ,
                    inReplyTo : this.state.replyingToIndex,
                    id : n,
                    special : this.props.user.special

                }).then(()=>{
                    firebase.database().ref('messages').on('value' , (data)=>{
                        if(data.toJSON()){
                            console.log("well looks like it worked")
                            messageIndex++;
                            this.setState({
                                messages : Object.values(data.toJSON()),
                                replyingTo : null,
                                replyingToIndex : null
                            })
                        }
                        else{
                            messages : []
                        }
                    })
                }).catch((error)=>{
                    console.log(error)
                }) 
            }else{
                firebase.database().ref(`messages/${n}`).set({
                    message : message,
                    sender : name,
                    date : new Date().toLocaleString(),
                    senderRank : this.props.user.role,
                    email : email,
                    messageIndex : messageIndex ,
                    id : n,
                    special : this.props.user.special
                }).then(()=>{
                    firebase.database().ref('messages').on('value' , (data)=>{
                        if(data.toJSON()){
                            console.log("well looks like it worked")
                            messageIndex++;
                            this.setState({
                                messages : Object.values(data.toJSON()),
                                replyingTo : null,
                                replyingToIndex : null
                            })
                        }
                        else{
                            messages : []
                        }
                    })
                }).catch((error)=>{
                    console.log(error)
                })
            }
        }
        e.target.elements.message.value = "";
    }

    render() {
        let myMessage = 'myMessage';
        let message = 'message';
        if (this.props.user.special == "special") {
            myMessage += ' special';
        }
        if (this.props.user.special == "special") {
            message += ' special';
        }
        console.log(this.state.replyingTo)
        return (
            <div className="forumContainer">
                <div className="chatArea">
                    {(this.state.messages !== null) && 
                        this.state.messages.map((currentItem , i) => {
                            if(this.props.user.email == currentItem.email){
                                if(currentItem.inReplyTo){
                                    return(
                                        <div className="messageContainer">
                                            <div onClick={()=>this.replyTo(currentItem[6])} key={currentItem.id} className={(currentItem.special === "Admin" || currentItem.special === "Special" ) ?  "myMessageSpecial" : "myMessage"}>
                                                <div className="replyText">
                                                    <p className="sender">{this.state.messages[currentItem.inReplyTo].sender} :</p>
                                                    <p>{this.state.messages[currentItem.inReplyTo].message}</p>
                                                </div>
                                                <p className="sender">{currentItem.sender} :</p>
                                                <p>{currentItem.message}</p>
                                                <div className="messageBottom">
                                                    {/*(currentItem.special === "Admin" || currentItem.special === "Special" ) ? <p className="specialAcc">Professioal</p> : <p>{currentItem.senderRank}</p>*/}
                                                    <p>{currentItem.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div className="messageContainer">
                                            <div onClick={()=>this.replyTo(currentItem[6])} key={currentItem.id} className={(currentItem.special === "Admin" || currentItem.special === "Special" ) ?  "myMessageSpecial" : "myMessage"}>
                                                <p className="sender">{currentItem.sender} :</p>
                                                <p>{currentItem.message}</p>
                                                <div className="messageBottom">
                                                    {/*(currentItem.special === "Admin" || currentItem.special === "Special" ) ? <p className="specialAcc">Professioal</p> : <p>{currentItem.senderRank}</p>*/}
                                                    <p>{currentItem.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            }else{
                                if(currentItem.inReplyTo){
                                    return(

                                        <div onClick={()=>this.replyTo(currentItem[6])} key={currentItem.id} className={(currentItem.special === "Admin" || currentItem.special === "Special" ) ?  "messageSpecial" : "message"}>
                                            <div className="replyText">
                                                <p className="sender">{this.state.messages[currentItem.inReplyTo].sender} :</p>
                                                <p>{this.state.messages[currentItem.inReplyTo].message}</p>
                                            </div>
                                            <p className="sender">{currentItem.sender} :</p>
                                            <p>{currentItem.message}</p>
                                            <div className="messageBottom">
                                                {/*(currentItem.special === "Admin" || currentItem.special === "Special" ) ? <p className="specialAcc">Professioal</p> : <p>{currentItem.senderRank}</p>*/}
                                                <p>{currentItem.date}</p>
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <div onClick={()=>this.replyTo(currentItem[6])} key={currentItem.id} className={(currentItem.special === "Admin" || currentItem.special === "Special" ) ?  "messageSpecial" : "message"}>
                                        <p className="sender">{currentItem.sender} :</p>
                                        <p>{currentItem.message}</p>
                                        <div className="messageBottom">
                                            {/*(currentItem.special === "Admin" || currentItem.special === "Special" ) ? <p className="specialAcc">Professioal</p> : <p>{currentItem.senderRank}</p>*/}
                                            <p>{currentItem.date}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    {/*<div ref={this.messagesEnd} />*/}
                </div>

                <div className="messageFormContainer">
                    <div className="replyTo">
                        {this.state.replyingTo && 
                            <div className="replyToText">
                                <p className="replyingToText">Replying to :</p>
                                {this.state.replyingTo && <p className="">{this.state.replyingTo.message}...</p>}
                                <p><i onClick={this.abortReply} class="fas fa-times-circle"></i></p>
                            </div>
                        }
                    </div>
                    <form onSubmit={this.handleAddMessage} action="">
                        <div className="messageForm">
                            <input className="messageInput" type="text" name="message" placeholder=""/>
                            <input className="messageButton" type="submit" value="SEND"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Forum;
