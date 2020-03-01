import React, { Component } from 'react';
import Basket from './Basket/basket';
import News from './News/news';
import MoreInfo from './MoreInfo/moreInfo'; 
import Dashboard from '../Dashboard/dashboard';
import Header from '../Header/header';


import "./body.css";
import Subheader from './Subheader/subheader';
import Sponsors from './Sponsors/sponsors';

class Body extends Component {
    state = {
        currentView : "home",
    }

    render() {
        const { open } = this.state;
        return (
            <div className="body">
                {(this.state.currentView == "home") &&
                    <div>
                        <Subheader/>
                        <MoreInfo/>
                        <Basket/>
                        <News/>
                        <Sponsors/>
                    </div>
                }
                {(this.state.currentView == "dashboard") && <Dashboard user={this.props.user}/>}
            </div>
        )
    }
}

export default Body;
