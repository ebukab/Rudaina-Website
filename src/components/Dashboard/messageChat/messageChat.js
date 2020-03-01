import React, { Component } from 'react';
import "./messageChat.css";
import firebase from "firebase";
import ReactTooltip from 'react-tooltip'
import Modal from 'react-responsive-modal';
import Notifications, {notify} from 'react-notify-toast';

var uniqid = require('uniqid');
class MessageChat extends Component {
    state = {
        replyingTo : null,
        messages : [],
        replyingToIndex : null,
        messageToReply : [],
        report : false,
        messageToReport : null,
    }

    reportMessage = () => {
        console.log("I will report this message")
        let messageReportId = uniqid();
        let name = this.state.messageToReport.sender;
        let message = this.state.messageToReport.message;
        let date = this.state.messageToReport.date;
        let email = this.state.messageToReport.email;

        firebase.database().ref(`messageReports/${messageReportId}`).set({
                message : message,
                sender : name,
                date : date,
                email : email,
                id : messageReportId,
            }).then(()=>{
                notify.show('Messae Reported', "custom", 5000, { background: '#00ff00', text: "#fff" });
                this.setState({ report : false,messageToReport : null });
            }).catch((error)=>{
                console.log(error)
                this.setState({
                    messageToReport : null
                })
            })
    }

    onOpenReport = (message) => {
        console.log("reeeport",message)
        this.setState({
            messageToReport : message,
            report: true 
        })
    };

    onCloseReport = () => {
        this.setState({ report : false });
    };

    cancelReply = () => {
        console.log("i will clear reply now")
        this.setState({
            messageToReply : []
        })
    }

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
            }
        })
    }

    handleAddMessage = (e) => {
        e.preventDefault();
        const message = e.target.elements.message.value.trim();
        let name = this.props.user.firstname + " " + this.props.user.lastname ;
        let email = this.props.user.email;
        let messageId = uniqid();
        let messageIndex = 0;

        if(this.state.replyingToIndex){
            console.log("i will reply to",message, this.state.replyingToIndex);
            firebase.database().ref(`messages/${messageId}`).set({
                    message : message,
                    sender : name,
                    date : new Date().toLocaleString(),
                    senderRank : this.props.user.role,
                    email : email,
                    messageIndex : messageIndex ,
                    inReplyTo : this.state.replyingToIndex,
                    id : messageId,
                    special : this.props.user.special

                }).then(()=>{
                    firebase.database().ref('messages').on('value' , (data)=>{
                        if(data.toJSON()){
                            console.log("well looks like it worked")
                            messageIndex++;
                            this.setState({
                                messages : Object.values(data.toJSON()),
                                replyingTo : null,
                                replyingToIndex : null,
                                messageToReply : []
                            })
                        }
                        else{
                            this.setState({
                                messages : [],
                                replyingTo : null,
                                replyingToIndex : null,
                                messageToReply : []
                            })
                        }
                    })
                }).catch((error)=>{
                    console.log(error)
                    this.setState({
                                messages : [],
                                replyingTo : null,
                                replyingToIndex : null,
                                messageToReply : []
                            })
                }) 
        }else{
            console.log("save to" , message);
            firebase.database().ref(`messages/${messageId}`).set({
                message : message,
                sender : name,
                date : new Date().toLocaleString(),
                senderRank : this.props.user.role,
                email : email,
                id : messageId,
                special : this.props.user.special
            }).then(()=>{
                firebase.database().ref('messages').on('value' , (data)=>{
                    if(data.toJSON()){
                        console.log("well looks like it worked")
                        this.setState({
                            messages : Object.values(data.toJSON()),
                            replyingTo : null,
                            replyingToIndex : null,
                            messageToReply : []
                        })
                    }
                    else{
                        this.setState({
                            messages : [],
                            replyingTo : null,
                            replyingToIndex : null,
                            messageToReply : []
                        })
                    }
                })
            }).catch((error)=>{
                console.log(error)
                this.setState({
                    messages : [],
                    replyingTo : null,
                    replyingToIndex : null,
                    messageToReply : []
                })
            })
        }
        e.target.elements.message.value = "";
    }

    replyToMessage = (message, messageIndex) => {
        console.log("I will reply to message" , message.message)
        this.setState({
            messageToReply : message,
            replyingToIndex : messageIndex
        })

    }

    render() {
        const {report} = this.state;
        let chatAreaHeight = {height:"94%", overFlowY:"scroll"}
        if(this.state.replyingTo){
            let chatAreaHeight = {height:"89%", overFlowY:"scroll"}
        }
        console.log("here are the messages ", this.state.messages ); // -> 4n5pxq24kpiob12og9
        return (
            <div>
                <Notifications />
                <Modal open={report} onClose={this.onCloseReport} center className="">
                    <div className="reportModalBox">
                        <p>Are you sure you want to report this message ?</p>
                        <div className="reportModalButtonsBox">
                            <p onClick={this.onCloseReport} className="cancelReport">Cancel</p>
                            <p onClick={this.reportMessage} className="continueReport">Report</p>
                        </div>
                    </div>
                </Modal>
                <div className="messageChatContainer">
                    <div style={chatAreaHeight} className="messageArea">
                        {this.state.messages &&
                            this.state.messages.map((currentItem , i)=>{
                                let style;
                                if(currentItem.email !== this.props.user.email){
                                    style = "otherMessage";
                                    if(currentItem.special === true){
                                        style = "otherSpecialMessage";
                                    }
                                }
                                if(currentItem.email === this.props.user.email){
                                    style = "myMessage";
                                    if(currentItem.special === true){
                                        style = "mySpecialMessage";
                                    }
                                }
                                return(
                                    <div  className={style}>
                                        {currentItem.inReplyTo &&
                                            <div className="replyMessage">
                                                <p className="sender">{this.state.messages[currentItem.inReplyTo].sender} :</p>
                                                <p>{this.state.messages[currentItem.inReplyTo].message}</p>
                                            </div>
                                        }
                                        <p className="messageName">{currentItem.sender}</p>
                                        <p className="messageMessage">{currentItem.message}</p>
                                        <div className="messageBoxFooter">
                                            <div className="messageIcons">
                                                <i onClick={()=>this.replyToMessage(currentItem, i)} data-tip data-for='reply' className="fas fa-comment-dots"></i>
                                                <ReactTooltip id='reply' type='error'>
                                                    <span>Reply</span>
                                                </ReactTooltip>
                                                <i onClick={() => this.onOpenReport(currentItem)} data-tip data-for='report' className="fas fa-exclamation-triangle"></i>
                                                <ReactTooltip id='report' type='warning'>
                                                    <span>Report</span>
                                                </ReactTooltip>
                                            </div>
                                            <p className="messageDate">{currentItem.date}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {!this.state.messages && <p>Welcome to the chat</p>}
                    </div>
                    {this.state.messageToReply.message && <div className="messageChatReplyToContainer">
                            <p><span className="messageChatReplyToTitle">Replying to : </span>{this.state.messageToReply.message}... <span onClick={this.cancelReply} className="messageChatReplyToCancel">Cancel</span></p>
                    </div>}
                    <form className="messageChatForm" onSubmit={this.handleAddMessage} action="">
                            <div class="messageChatFormUpload">
                                <label for="file-input">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </label>

                                {/*<input id="file-input" type="file"/>*/}
                            </div>
                            <input className="messageTextInput" type="text" name="message" placeholder="Enter message here ..."/>
                            <input className="messageChatSendButton" type="submit" value="SEND"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessageChat;
