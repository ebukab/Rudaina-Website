import React, { Component } from 'react';
import "./news.css";
import firebase from "firebase";

export default class News extends Component {
    state = {
        relevantNews : [],
        pregnancyNews : [],
        charityNews : []
    }

    componentWillMount = () => {

        firebase.database().ref('news/relevant').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    relevantNews : Object.keys(Object.values(data.toJSON())[Object.values(data.toJSON()).length - 1]).map(function(_) { return Object.values(data.toJSON())[Object.values(data.toJSON()).length - 1][_]; }),
                })
            }
        })

        firebase.database().ref('news/pregnancy').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    pregnancyNews : Object.keys(Object.values(data.toJSON())[Object.values(data.toJSON()).length - 1]).map(function(_) { return Object.values(data.toJSON())[Object.values(data.toJSON()).length - 1][_]; }),
                })
            }
        })

        firebase.database().ref('news/charity').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    charityNews : Object.keys(Object.values(data.toJSON())[Object.values(data.toJSON()).length - 1]).map(function(_) { return Object.values(data.toJSON())[Object.values(data.toJSON()).length - 1][_]; }),
                })
            }
        })
    }

    trimSentence = (newstext) => {
        if(newstext === "relevantNews"){
            var result = this.state.relevantNews[4];
            var resultArray = result.split(" ");
            if(resultArray.length > 73){
            resultArray = resultArray.slice(0, 73);
            result = resultArray.join(" ") + "...";
            }
            return result;
        }
        if(newstext === "pregnancyNews"){
            var result = this.state.pregnancyNews[4];
            var resultArray = result.split(" ");
            if(resultArray.length > 73){
            resultArray = resultArray.slice(0, 73);
            result = resultArray.join(" ") + "...";
            }
            return result;
        }
        if(newstext === "charityNews"){
            var result = this.state.charityNews[4];
            var resultArray = result.split(" ");
            if(resultArray.length > 73){
            resultArray = resultArray.slice(0, 73);
            result = resultArray.join(" ") + "...";
            }
            return result;
        }
    }

    render() {
        return (
            <div className="newsSection">
                <div className="textContainer">
                    <p className="section-header">OUR RESOURCES.</p>
                </div>
                <div className="newsContainer">
                    <div className="newsItem">
                        <div className="newsImage">
                            <img  src={this.state.relevantNews[3] ? this.state.relevantNews[3] : "/img/flatroof.jpg"} alt=""/>
                        </div>
                        <div className="newsTitle">
                            <p>{this.state.relevantNews[2]}</p>
                        </div>
                        <div className="newsBody">
                            <p>{this.state.relevantNews[4] ? this.state.relevantNews[4].match(/(.{1,400}\w)\s/)[1]+'...' : ""}{this.state.relevantNews[1] && <a className="moreLink" href={this.state.relevantNews[0]} target="_blank">More &rarr;</a>}</p>
                        </div>
                    </div>
                    <div className="newsItem">
                        <div className="newsImage">
                            <img  src={this.state.pregnancyNews[3] ? this.state.pregnancyNews[3] : "/img/flatroof.jpg"} alt=""/>
                        </div>
                        <div className="newsTitle">
                            <p>{this.state.pregnancyNews[2]}</p>
                        </div>
                        <div className="newsBody">
                            <p>{this.state.pregnancyNews[4] ? this.state.pregnancyNews[4].match(/(.{1,400}\w)\s/)[1]+'...' : ""}{this.state.pregnancyNews[1] && <a className="moreLink" href={this.state.pregnancyNews[0]} target="_blank">More &rarr;</a>}</p>
                        </div>
                    </div>
                    <div className="newsItem">
                        <div className="newsImage">
                            <img  src={this.state.charityNews[3] ? this.state.charityNews[3] : "/img/flatroof.jpg"} alt=""/>
                        </div>
                        <div className="newsTitle">
                            <p>{this.state.charityNews[2]}</p>
                        </div>
                        <div className="newsBody">
                            <p>{this.state.charityNews[4] ? this.state.charityNews[4].match(/(.{1,400}\w)\s/)[1]+'...' : ""}{this.state.charityNews[1] && <a className="moreLink" href={this.state.charityNews[0]} target="_blank">More &rarr;</a>}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
