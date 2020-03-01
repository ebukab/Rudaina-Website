import React, { Component } from 'react';

import firebase from "firebase";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './newsPage.css';
import { Carousel } from 'react-responsive-carousel';

export default class Newspage extends Component {
    state = {
        relevantNews : [],
        pregnancyNews : [],
        charityNews : []
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
                console.log("THIS IS PREGNANCY NEWS")
                console.log(Object.values(data.toJSON()))
                this.setState({
                    pregnancyNews : Object.values(data.toJSON()),
                })
            }
        })

        firebase.database().ref('news/charity').on('value' , (data)=>{
            if(data.toJSON()){
                console.log("THIS IS CHARITY NEWS")
                console.log(Object.values(data.toJSON()))
                this.setState({
                    charityNews : Object.values(data.toJSON()),
                })
            }
        })
    }

    render() {
        return (
            <div className="newsPageContainer">
                <div className="newsPage">
                    <div className="newsPageItem">
                        <p className="newsPageItem_title">Charity News</p>
                        <div className="hideOnSmallScreen">
                            <Carousel className="carousel" centerMode centerSlidePercentage={33} showThumbs={false}>
                                {
                                    this.state.charityNews.map((currentItem , i) => {
                                        return (
                                            <div key={i}  className="newsItem">
                                                <div className="newsImage">
                                                    <img  src={currentItem.newsImage ? currentItem.newsImage : "/img/flatroof.jpg"} alt=""/>
                                                </div>
                                                <div className="newsTitle">
                                                    <p>{currentItem.newsHeading}</p>
                                                </div>
                                                <div className="newsBody">
                                                    <p>{currentItem.newsText}{currentItem.externalLink && <a className="moreLink" href={currentItem.externalLink} target="_blank">More &rarr;</a>}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className="hideOnLargeScreen">
                            <Carousel className="carousel" centerMode centerSlidePercentage={100} showThumbs={false}>
                                {
                                    this.state.charityNews.map((currentItem , i) => {
                                        return (
                                            <div key={i}  className="newsItem">
                                                <div className="newsImage">
                                                    <img  src={currentItem.newsImage ? currentItem.newsImage : "/img/flatroof.jpg"} alt=""/>
                                                </div>
                                                <div className="newsTitle">
                                                    <p>{currentItem.newsHeading}</p>
                                                </div>
                                                <div className="newsBody">
                                                    <p>{currentItem.newsText}{currentItem.externalLink && <a className="moreLink" href={currentItem.externalLink} target="_blank">More &rarr;</a>}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className="newsPageItem">
                        <p className="newsPageItem_title">Relevant News</p>
                        <div className="hideOnSmallScreen">
                            <Carousel centerMode centerSlidePercentage={33} showThumbs={false}>
                                {
                                    this.state.relevantNews.map((currentItem , i) => {
                                        return (
                                            <div key={i}  className="newsItem">
                                                <div className="newsImage">
                                                    <img  src={currentItem.newsImage ? currentItem.newsImage : "/img/flatroof.jpg"} alt=""/>
                                                </div>
                                                <div className="newsTitle">
                                                    <p>{currentItem.newsHeading}</p>
                                                </div>
                                                <div className="newsBody">
                                                    <p>{currentItem.newsText}{currentItem.externalLink && <a className="moreLink" href={currentItem.externalLink} target="_blank">More &rarr;</a>}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className="hideOnLargeScreen">
                            <Carousel centerMode centerSlidePercentage={100} showThumbs={false}>
                                {
                                    this.state.relevantNews.map((currentItem , i) => {
                                        return (
                                            <div key={i}  className="newsItem">
                                                <div className="newsImage">
                                                    <img  src={currentItem.newsImage ? currentItem.newsImage : "/img/flatroof.jpg"} alt=""/>
                                                </div>
                                                <div className="newsTitle">
                                                    <p>{currentItem.newsHeading}</p>
                                                </div>
                                                <div className="newsBody">
                                                    <p>{currentItem.newsText}{currentItem.externalLink && <a className="moreLink" href={currentItem.externalLink} target="_blank">More &rarr;</a>}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className="newsPageItem">
                        <p className="newsPageItem_title">Pregnancy News</p>
                        <div className="hideOnSmallScreen">
                            <Carousel centerMode centerSlidePercentage={33} showThumbs={false}>
                                {
                                    this.state.pregnancyNews.map((currentItem , i) => {
                                        return (
                                            <div key={i}  className="newsItem">
                                                <div className="newsImage">
                                                    <img  src={currentItem.newsImage ? currentItem.newsImage : "/img/flatroof.jpg"} alt=""/>
                                                </div>
                                                <div className="newsTitle">
                                                    <p>{currentItem.newsHeading}</p>
                                                </div>
                                                <div className="newsBody">
                                                    <p>{currentItem.newsText}{currentItem.externalLink && <a className="moreLink" href={currentItem.externalLink} target="_blank">More &rarr;</a>}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className="hideOnLargeScreen">
                            <Carousel centerMode centerSlidePercentage={100} showThumbs={false}>
                                {
                                    this.state.pregnancyNews.map((currentItem , i) => {
                                        return (
                                            <div key={i}  className="newsItem">
                                                <div className="newsImage">
                                                    <img  src={currentItem.newsImage ? currentItem.newsImage : "/img/flatroof.jpg"} alt=""/>
                                                </div>
                                                <div className="newsTitle">
                                                    <p>{currentItem.newsHeading}</p>
                                                </div>
                                                <div className="newsBody">
                                                    <p>{currentItem.newsText}{currentItem.externalLink && <a className="moreLink" href={currentItem.externalLink} target="_blank">More &rarr;</a>}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
