import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./dashboard.css";
import { app } from '../../firebase';
import firebase from "firebase";
import Benefactor from './Benefactor/benefactor';
import Volunteer from './Volunteer/volunteer';
import Product from './products/product';
import News from './News/news';
// import Forum from './Forum/forum';
//messageChat is now forum 
import MessageChat from "./messageChat/messageChat"
import FeatureVolunteer from './featureVolunteer/featureVolunteer';
import VolunteerEvents from './VolunteerEvents/volunteerEvents';
import AddEvents from './AddEvents/addEvents';
import BenefactorEvents from './BenefactorEvents/benefactorEvents';
import MyTask from './MyTasks/myTask';
import Settings from './Settings/settings';
import Profile from './Profile/profile';
import Subscribers from './Subscribers/subscribers';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import Reports from "./Reports/Reports"
import 'rc-dropdown/assets/index.css';


class Dashboard extends Component {
    state = {
        isApproved : false,
        userRole : "",
        selectedOption : "profile",
        currentUser : null,
        url : null
    }

    updatePic = (url) => {
        this.setState({
            url : url
        })
    }
    
    showDashboardMainContent = () => {
        if(this.state.selectedOption === "benefactors"){
            return <Benefactor/>
        }
        else if(this.state.selectedOption === "volunteers"){
            return <Volunteer/>
        }
        else if(this.state.selectedOption === "subscribers"){
            return <Subscribers/>
        }
        else if(this.state.selectedOption === "settings"){
            return <Settings updatePic={this.updatePic} user={this.props.user}/>
        }
        else if(this.state.selectedOption === "products"){
            return (<Product/>);
        }
        else if(this.state.selectedOption === "news"){
            return (<News/>);
        }
        else if(this.state.selectedOption === "forum"){
            return (<MessageChat user={this.props.user}/>);
        }
        else if(this.state.selectedOption === "volunteerEvents"){
            return (<VolunteerEvents user={this.props.user}/>);
        }
        else if(this.state.selectedOption === "benefactorEvents"){
            return (<BenefactorEvents user={this.props.user}/>);
        }
        else if(this.state.selectedOption === "addEvents"){
            return (<AddEvents />);
        }
        else if(this.state.selectedOption === "profile"){
            return (<Profile user={this.props.user}/>);
        }
        else if(this.state.selectedOption === "myTask"){
            return (<MyTask user={this.props.user}/>);
        }
        else if(this.state.selectedOption === "reports"){
            return (<Reports user={this.props.user}/>);
        }
        else if(this.state.selectedOption === "feature"){
            return (<FeatureVolunteer user={this.props.user}/>);
        }
        return <p>No selection yet</p>;
    }

    handleLogout = () => {
        app.auth().signOut().then(()=>{
            //console.log("Sign Out successful")
        })
    }

    setSelectedOption = (chosenOption) =>{
        if((this.props.user.status == "pending") || (this.props.user.status == "disapproved")){
            this.setState({
                selectedOption : "profile"
            })
        }
        else{
            this.setState({
                selectedOption : chosenOption
            })
        }
    }

    returnOptions = () => {

        if(this.props.user.role === "Volunteer"){
            return (
                <div>
                    <div onClick={()=>this.setSelectedOption("profile")}  className="options_item">
                        <p>PROFILE</p>
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div onClick={()=>this.setSelectedOption("myTask")} className="options_item">
                        <p>MY TASK</p>
                        <i className="fas fa-list-ul"></i>
                    </div>
                    <div onClick={()=>this.setSelectedOption("volunteerEvents")} className="options_item">
                        <p>VOLUNTEER</p>
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div onClick={()=>this.setSelectedOption("settings")} className="options_item">
                        <p>SETTINGS</p>
                        <i className="fas fa-sliders-h"></i>
                    </div>
                </div>
            )
        }

    }

    render() {
        var menu = <p>Menu</p>
        if(this.props.user.role === "Admin"){
        var menu = (
            <Menu style={{width : "200px"}} onSelect={this.onSelect}> 
                <MenuItem key="1">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("benefactors")} className={benefactors_active}>
                    <p>BENEFACTORS</p>
                    <p><i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-users"></i></p>
                </div>
                </MenuItem>
                <MenuItem key="2">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("volunteers")} className={volunteers_active}>
                    <p>VOLUNTEERS</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-people-carry"></i>
                </div>
                </MenuItem>
                <MenuItem key="3">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("benefactorEvents")} className={benefactorEvents_active}>
                    <p>BENEFACTOR</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-calendar-alt"></i>
                </div>
                </MenuItem>
                <MenuItem key="4">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("volunteerEvents")} className={volunteerEvents_active}>
                    <p>VOLUNTEER</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-calendar-alt"></i>
                </div>
                </MenuItem>
                <MenuItem key="5">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("subscribers")} className={subscribers_active}>
                    <p>SUBSCRIBERS</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-calendar-alt"></i>
                </div>
                </MenuItem>
                <MenuItem key="6">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("addEvents")} className={addEvents_active}>
                    <p>ADD EVENTS</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-clipboard-list"></i>
                </div>
                </MenuItem>
                <MenuItem key="7">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("settings")} className={settings_active}>
                    <p>SETTINGS</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-sliders-h"></i>
                </div>
                </MenuItem>
                <MenuItem key="8">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("products")}  className={products_active}>
                    <p>PRODUCTS</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-gift"></i>
                </div>
                </MenuItem>
                <MenuItem key="9">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("myTask")} className={myTask_active}>
                    <p>MY TASK</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-list-ul"></i>
                </div>
                </MenuItem>
                <MenuItem key="10">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("forum")}  className={forum_active}>
                    <p>FORUM</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="far fa-comments"></i>
                </div>
                </MenuItem>
                <MenuItem key="11">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("news")} className={news_active}>
                    <p>NEWS</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-newspaper"></i>
                </div>
                </MenuItem>
                <MenuItem key="12">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("news")} className={news_active}>
                    <p>FEATURES</p>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas user-plus"></i>
                </div>
                </MenuItem>
                <MenuItem key="15">
                <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}}>
                    <NavLink style={{border : "0px solid transparent" , color : "black"}} onClick={this.handleLogout} className="" to="/"><p >LOG OUT</p></NavLink>
                    <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-sign-out-alt"></i>
                </div>
                </MenuItem>
            </Menu>
        )}
        if(this.props.user.role === "Volunteer"){
            var menu = (
                <Menu style={{width : "200px"}} onSelect={this.onSelect}>
                    <MenuItem key="1">
                        <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("profile")} className={profile_active}>
                            <p>PROFILE</p>
                            <p><i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-user-circle"></i></p>
                        </div>
                    </MenuItem>
                    <MenuItem key="4">
                    <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("volunteerEvents")} className={volunteerEvents_active}>
                        <p>VOLUNTEER</p>
                        <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-calendar-alt"></i>
                    </div>
                    </MenuItem>
                    <MenuItem key="7">
                    <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("settings")} className={settings_active}>
                        <p>SETTINGS</p>
                        <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-sliders-h"></i>
                    </div>
                    </MenuItem>
                    <MenuItem key="9">
                    <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("myTask")} className={myTask_active}>
                        <p>MY TASK</p>
                        <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-list-ul"></i>
                    </div>
                    </MenuItem>
                    <MenuItem key="15">
                    <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}}>
                        <NavLink style={{border : "0px solid transparent" , color : "black"}} onClick={this.handleLogout} className="" to="/"><p >LOG OUT</p></NavLink>
                        <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-sign-out-alt"></i>
                    </div>
                    </MenuItem>
                </Menu>
            )}
        if(this.props.user.role === "Benefactor"){
            var menu = (
                <Menu style={{width : "200px"}} onSelect={this.onSelect}>
                    <MenuItem key="1">
                        <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("profile")} className={profile_active}>
                            <p>PROFILE</p>
                            <p><i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-user-circle"></i></p>
                        </div>
                    </MenuItem>
                    <MenuItem key="3">
                    <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("benefactorEvents")} className={benefactorEvents_active}>
                        <p>BENEFACTOR</p>
                        <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-calendar-alt"></i>
                    </div>
                    </MenuItem>
                    <MenuItem key="7">
                    <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("settings")} className={settings_active}>
                        <p>SETTINGS</p>
                        <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-sliders-h"></i>
                    </div>
                    </MenuItem>
                    <MenuItem key="9">
                    <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("myTask")} className={myTask_active}>
                        <p>MY TASK</p>
                        <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-list-ul"></i>
                    </div>
                    </MenuItem>
                    <MenuItem key="10">
                    <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}} onClick={()=>this.setSelectedOption("forum")}  className={forum_active}>
                        <p>FORUM</p>
                        <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="far fa-comments"></i>
                    </div>
                    </MenuItem>
                    <MenuItem key="15">
                    <div style={{fontFamily : "Rancho" ,display : "flex" , flexDirection : "row" , alignItems: 'center', color : "black" , fontWeight: 'bold', backgroundColor : "#FFE5E4" , fontSize : "1.5rem" , padding : "0 .2rem"}}>
                        <NavLink style={{border : "0px solid transparent" , color : "black"}} onClick={this.handleLogout} className="" to="/"><p >LOG OUT</p></NavLink>
                        <i style={{color : "red" , padding : ".1rem" , fontSize : "2.3rem" , marginLeft : "1rem"}} className="fas fa-sign-out-alt"></i>
                    </div>
                    </MenuItem>
                </Menu>
            )}
        let benefactors_active = this.state.selectedOption === "benefactors" ? "optionActive options_item" : "optionInactive options_item";
        let volunteers_active = this.state.selectedOption === "volunteers" ? "optionActive options_item" : "optionInactive options_item";
        let benefactorEvents_active = this.state.selectedOption === "benefactorEvents" ? "optionActive options_item" : "optionInactive options_item";
        let volunteerEvents_active = this.state.selectedOption === "volunteerEvents" ? "optionActive options_item" : "optionInactive options_item";
        
        let subscribers_active = this.state.selectedOption === "subscribers" ? "optionActive options_item" : "optionInactive options_item";
        let addEvents_active = this.state.selectedOption === "addEvents" ? "optionActive options_item" : "optionInactive options_item";
        let settings_active = this.state.selectedOption === "settings" ? "optionActive options_item" : "optionInactive options_item";
        let products_active = this.state.selectedOption === "products" ? "optionActive options_item" : "optionInactive options_item";

        let myTask_active = this.state.selectedOption === "myTask"  ? "optionActive options_item" : "optionInactive options_item";
        let forum_active = this.state.selectedOption === "forum" ? "optionActive options_item" : "optionInactive options_item";
        let news_active = this.state.selectedOption === "news" ? "optionActive options_item" : "optionInactive options_item";
        let profile_active = this.state.selectedOption === "profile" ? "optionActive options_item" : "optionInactive options_item";
        let reports_active = this.state.selectedOption === "reports" ? "optionActive options_item" : "optionInactive options_item";
        let feature_active = this.state.selectedOption === "feature" ? "optionActive options_item" : "optionInactive options_item";

        
        if(this.props.user.firstname != null){
            return (
                <div className="dashboard_section">
                    <div className="mobileDropdown hideOnLargeScreen">
                        <p>{this.state.selectedOption.toUpperCase()}</p>
                        <div>
                            <Dropdown
                                trigger={['click']}
                                overlay={menu}
                                animation="slide-up"
                                onVisibleChange={this.onVisibleChange}
                            >
                                <div><i class="fas fa-sort-down"></i></div>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="containerCustom mobileContainer">
                        <div className="dashboard">
                            <div className="dashboard_details hideOnSmallScreen">
                                <div className="profilePicContainer">
                                    <img src={this.props.user.url ? this.props.user.url : "/emptyPic.png" }/>
                                </div>
                                <div>
                                    <p className="usersName">{this.props.user.firstname + " " + this.props.user.lastname}</p>
                                </div>
                                <div className="options">
                                    {this.props.user.role === "Volunteer" && 
                                        <div>
                                            <div onClick={()=>this.setSelectedOption("profile")}  className={profile_active}>
                                                <p>PROFILE</p>
                                                <i className="fas fa-user-circle"></i>
                                            </div>
                                            <div onClick={()=>this.setSelectedOption("myTask")} className={myTask_active}>
                                                <p>MY TASK</p>
                                                <i className="fas fa-list-ul"></i>
                                            </div>
                                            <div onClick={()=>this.setSelectedOption("volunteerEvents")} className={volunteerEvents_active}>
                                                <p>EVENTS</p>
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                            <div onClick={()=>this.setSelectedOption("settings")} className={settings_active}>
                                                <p>SETTINGS</p>
                                                <i className="fas fa-sliders-h"></i>
                                            </div>
                                        </div>
                                    }
                                    {this.props.user.role === "Benefactor" && 
                                        <div>
                                            <div onClick={()=>this.setSelectedOption("profile")}  className={profile_active}>
                                                <p>PROFILE</p>
                                                <i className="fas fa-user-circle"></i>
                                            </div>
                                            <div disabled onClick={()=>this.setSelectedOption("myTask")} className={myTask_active}>
                                                <p>MY EVENTS</p>
                                                <i className="fas fa-list-ul"></i>
                                            </div>
                                            <div onClick={()=>this.setSelectedOption("benefactorEvents")} className={benefactorEvents_active}>
                                                <p>EVENTS</p>
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                            <div onClick={()=>this.setSelectedOption("forum")}  className={forum_active}>
                                                <p>FORUM</p>
                                                <i className="far fa-comments"></i>
                                            </div>
                                            <div onClick={()=>this.setSelectedOption("settings")} className={settings_active}>
                                                <p>SETTINGS</p>
                                                <i className="fas fa-sliders-h"></i>
                                            </div>
                                        </div>
                                    }
                                    {this.props.user.role === "Admin" && 
                                    <div>
                                        <div onClick={()=>this.setSelectedOption("benefactors")} className={benefactors_active}>
                                            <p>BENEFACTORS</p>
                                            <i className="fas fa-users"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("volunteers")} className={volunteers_active}>
                                            <p>VOLUNTEERS</p>
                                            <i className="fas fa-people-carry"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("benefactorEvents")} className={benefactorEvents_active}>
                                            <p>BENEFACTOR</p>
                                            <i className="fas fa-calendar-alt"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("volunteerEvents")} className={volunteerEvents_active}>
                                            <p>VOLUNTEER</p>
                                            <i className="fas fa-calendar-alt"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("subscribers")} className={subscribers_active}>
                                            <p>SUBSCRIBERS</p>
                                            <i className="fas fa-calendar-alt"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("addEvents")} className={addEvents_active}>
                                            <p>ADD EVENTS</p>
                                            <i className="fas fa-clipboard-list"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("settings")} className={settings_active}>
                                            <p>SETTINGS</p>
                                            <i className="fas fa-sliders-h"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("products")}  className={products_active}>
                                            <p>PRODUCTS</p>
                                            <i className="fas fa-gift"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("myTask")} className={myTask_active}>
                                            <p>MY TASK</p>
                                            <i className="fas fa-list-ul"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("forum")}  className={forum_active}>
                                            <p>FORUM</p>
                                            <i className="far fa-comments"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("news")} className={news_active}>
                                            <p>NEWS</p>
                                            <i className="fas fa-newspaper"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("reports")} className={reports_active}>
                                            <p>REPORTS</p>
                                            <i className="fas fa-exclamation-triangle"></i>
                                        </div>
                                        <div onClick={()=>this.setSelectedOption("feature")} className={feature_active}>
                                            <p>FEATURES</p>
                                            <i className="fas fa-user-plus"></i>
                                        </div>
                                    </div>
                                    }
                                    <NavLink onClick={this.handleLogout} className="options_item logout" to="/"><p >LOG OUT</p>
                                    <i class="fas fa-sign-out-alt"></i></NavLink>
                                </div>
                            </div>
                            <div className="dashbopard_main">
                                {this.showDashboardMainContent()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="spinnerContainer">
                    <div className="spinnerBox">
                        <div class="loader"></div>
                    </div>
                </div>
            )
        }
    }
}

export default Dashboard;
