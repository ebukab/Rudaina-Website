import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import './sponsors.css';

class Sponsors extends Component {
    render() {
        return (
            <div className="sponsorContainer">
                <p className="section-header ">OUR SUPPORTERS.</p>
                <div className="imgContainer">
                    <div className="imgItem"><a href="https://www.greenenergystandards.ca/" target="_blank"><img src="/img/egs.png"/></a></div>
                    <div className="imgItem"><a href="https://tcccanada.com/" target="_blank"><img src="/img/tcc.png"/></a></div>
                    <div className="imgItem"><a href="http://www.wiseottawa.ca/" target="_blank"><img src="/img/wise ifse.png"/></a></div>
                    <div className="imgItem hideOnSmallScreen"><a href="https://liveworkplay.ca/" target="_blank"><img src="/img/kw.png"/></a></div>
                    <div className="imgItem hideOnSmallScreen"><a href="https://www.canada.ca/en/employment-social-development/services/funding/canada-summer-jobs.html" target="_blank"><img src="/img/CCSJ2018.png"/></a></div>
                </div>
                <div className="imgContainer hideOnLargeScreen">
                    <div className="imgItem"><img src="/img/kw.png"/></div>
                    <div className="imgItem"><img src="/img/CCSJ2018.png"/></div>
                </div>
            </div>
        )
    }
}

export default  Sponsors;