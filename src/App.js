import React, { Component } from 'react';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';

// STYLESHEET
import './App.css';

import { app } from './firebase';
import firebase from "firebase";

// COMPONENTS
import Header from './components/Header/header';
import Login from './components/login/login';
import SignUp from './components/SignUp/signup';
import Dashboard from './components/Dashboard/dashboard';
import Basket from './components/Body/Basket/basket';
import HelpStats from './components/Body/HelpStats/helpStats';
import Sponsors from './components/Body/Sponsors/sponsors';
import News from './components/Body/News/news';
import Body from "./components/Body/body";
import About from './components/About/about';
import Program from './components/Program/program';
import Volunteer from './components/Dashboard/Volunteer/volunteer';
import VolunteerPage from './components/VolunteerPage/volunteerPage';
import Footer from './components/Body/Footer/footer';
import Newspage from './components/NewsPage/newsPage';
import DonatePage from './components/Body/DonatePage/donatePage'
import BasketItems from './components/BasketItems/BasketItems'
import TermsOfServices from './components/TermsOfServices/TermsOfServices';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import Accesibility from './components/Accesibility/Accesibility';
import LifeBasketTerms from './components/LifeBasketTerms/LifeBasketTerms';

let language = "english";

class App extends Component {
    state = {
        user : {},
        language: "english"
    }

    componentDidMount() {
        this.authListener();
    }

    changeLanguage = (e) => {
        e.preventDefault();
        if(this.state.language === "french"){
            console.log("Changed to english");
            this.setState({
                language: "english"
            })
        }else{
            this.setState({
                language: "french"
            })
            console.log("Changed to french");
        }
    }

    currentLanguage = () => {
        return this.state.language;
    }

    headerLanguage = () => {
        if(this.state.language === "french"){
            return "english"
        }
        return "french";
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.state.user) {
            // this.props.history.push('/dashboard');
        }
    }

    authListener = () => {
        app.auth().onAuthStateChanged((user)=>{
            if(user){
                firebase.database().ref(`benefactors/${user.uid}`).on('value' , (data)=>{
                    if(data.toJSON()){
                        this.setState({
                            user : (data.toJSON())
                        })
                    }else{
                        firebase.database().ref(`volunteers/${user.uid}`).on('value' , (data)=>{
                            if(data.toJSON()){
                                this.setState({
                                    user : (data.toJSON())
                                })
                            }
                        })
                    }
                })
            }else{
                this.setState({user : null})
            }
        })
    }


	render() {
    	return (
			<BrowserRouter  className="App">
                <div>
                    <Header headerLanguage={this.headerLanguage} currentLanguage={this.currentLanguage} changeLanguage={this.changeLanguage} history= {this.props.history} handleView={this.changeView} user={this.state.user}/>
                    <div className="swingingAnimateion swingimage hideOnSmallScreen">
                        <div className="hanger">
                            <div className="bRight">
                                ntdf
                            </div>
                            <div className="bLeft">
                                ntdf
                            </div>
                        </div>
                        <div className="donateIcon">
                            <Link to="/donate" href="https://www.canadahelps.org/en/dn/t/32254" style={{border: 'solid .1px transparent', paddingBottom: '1em'}} ><img src="/donateIcon.png"/></Link>
                        </div>
                    </div>
                    {/* <Body handleView={this.changeView} user={this.state.user} user={this.state.user}/> */}
                    {/* {(this.state.currentView == "dashboard")&&<Dashboard user={this.state.user}/>} */}
                    <Switch>
                        {/* <Route path="/dashboard" component={Dashboard} user={this.state.user} exact/> */}
                        {this.state.user && <Route path = "/dashboard" component = {props => <Dashboard user={this.state.user}/>} exact/>}
                        <Route path = "/about" component = {props => <About currentLanguage={this.currentLanguage} user={this.state.user}/>} exact/>
                        <Route path = "/program" component = {props => <Program user={this.state.user}/>} exact/>
                        <Route path = "/volunteer" component = {props => <VolunteerPage user={this.state.user}/>} exact/>
                        <Route path = "/news-page" component = {props => <Newspage  user={this.state.user}/>} exact/>
                        <Route path = "/donate-page" component = {props => <DonatePage/>} exact/>
                        <Route path = "/donate" component = {props => <BasketItems/>} exact/>
                        <Route path = "/terms-of-service" component = {props => <TermsOfServices/>} exact/>
                        <Route path = "/life-basket-terms" component = {props => <LifeBasketTerms/>} exact/>
                        <Route path = "/privacy-policy" component = {props => <PrivacyPolicy/>} exact/>
                        <Route path = "/accesibility" component = {props => <Accesibility/>} exact/>
                        <Route path = "/" component = {props => <Body history= {this.props.history} user={this.state.user}/>} exact/>
                        <Route path="*" component = {props => <Body user={this.state.user}/>}/>
                    </Switch>
                    <Footer/>
                </div>
			</BrowserRouter>
    	);
	}
}

export default App;
