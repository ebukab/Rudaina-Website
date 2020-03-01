import React, { Component } from 'react';
import './volunteerPage.css';
import { NavLink } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import SignUp from '../SignUp/signup';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

class VolunteerPage extends Component {
    state = {
        selectedOption : "volunteer",
        openSignUp: false,
        signUpError : false,
    }

    onOpenModalSignUp = () => {
        this.setState({ openSignUp: true });
    };

    onCloseModalSignUp = () => {
        this.setState({ openSignUp: false , signUpError: false });
    };

    handleOptionChange(option){
        this.setState({
            selectedOption : option
        })
    }

    onSelect = ({ key }) => {
        // console.log(`${key} selected`);
    }

    onVisibleChange = (visible) => {
        // console.log(visible);
    }

    render() {
        const menu = (
            <Menu style={{width : "150px"}} onSelect={this.onSelect}>
                <MenuItem key="1">
                    <div onClick={()=>this.handleOptionChange("volunteer")} className={volunteer_active}>
                        <p>VOLUNTEER</p>
                    </div>
                </MenuItem>
                <MenuItem key="2">
                    <div onClick={()=>this.handleOptionChange("needyou")} className={needyou_active}>
                        <p>WHY US</p>
                    </div>
                </MenuItem>
                <MenuItem key="3">
                    <div onClick={()=>this.handleOptionChange("whyyou")} className={whyyou_active}>
                        <p>WHY YOU</p>
                    </div>
                </MenuItem>
                <MenuItem key="4">
                    <div onClick={()=>this.handleOptionChange("signup")} className={signup_active}>
                        <p>SIGN UP</p>
                    </div>
                </MenuItem>
            </Menu>
        );
        const {  openSignUp } = this.state;
        let volunteer_active = this.state.selectedOption === "volunteer" ? "optionActive options_item" : "optionInactive options_item";
        let needyou_active = this.state.selectedOption === "needyou" ? "optionActive options_item" : "optionInactive options_item";
        let whyyou_active = this.state.selectedOption === "whyyou" ? "optionActive options_item" : "optionInactive options_item";
        let signup_active = this.state.selectedOption === "signup" ? "optionActive options_item" : "optionInactive options_item";
        return (
            <div>  
                <div>
                <div className="mobileDropdown hideOnLargeScreen">
                    <p>VOLUNTEER</p>
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
                <Modal open={openSignUp} onClose={this.onCloseModalSignUp} center className="signUpModal">
                    <div class="">
                        <SignUp closeModal = {this.onCloseModalSignUp}/>
                    </div>
                </Modal>
                <div className="containerCustom ">
                    <div className=" genericBody">
                        <div className="genericBody_left hideOnSmallScreen">
                            <div onClick={()=>this.handleOptionChange("volunteer")} className={volunteer_active}>
                                <p>VOLUNTEER</p>
                            </div>
                            <div onClick={()=>this.handleOptionChange("needyou")} className={needyou_active}>
                                <p>WHY US</p>
                            </div>
                            <div onClick={()=>this.handleOptionChange("whyyou")} className={whyyou_active}>
                                <p>WHY YOU</p>
                            </div>
                            <div onClick={()=>this.handleOptionChange("signup")} className={signup_active}>
                                <p>SIGN UP</p>
                            </div>
                        </div>
                        <div style = {{overflow : "scroll", height : "80vh"}}>
                            {(this.state.selectedOption === "volunteer") &&
                                <div >
                                    <div>
                                        <p className="genericBodyheader">Volunteer Today!</p>
                                    </div>
                                    <div className="titleImageContainer">
                                        <img src="/img/volunteer.jpeg"/>
                                    </div>
                                    <div>
                                        <p className="genericBodyText">
                                        If you are seeking a supportive, interactive, and a dynamic environment, then Rudaina Foundation should be your choice to where you will volunteer.<br></br><br></br> Your enthusiasm, innovative approaches and new ideas will be very valuable to us. Benefits to joining our team include: <br></br>· ongoing and interactive work<br></br> · An opportunity to develop a wealth of contacts and networks<br></br> · Resume builder workshops<br></br> · Satisfaction of helping others and more! <br></br><br></br>Your life goals and work objectives are important to us. With our online system, all you need to do is fill out the sign up application and wait to be approved. Once approved, you will be able to see an interface only available to the volunteers. See if you can add this picture either on the side or somewhere on this page. Also add this button in this section as well
                                        </p>
                                        <p className="signup" onClick={this.onOpenModalSignUp}>BECOME A VOLUNTEER</p>
                                    </div>
                                </div>
                            }
                            {(this.state.selectedOption === "needyou") &&
                                <div>
                                    <div>
                                        <p className="genericBodyheader">Why we NEED You!  </p>
                                    </div>
                                    <div>
                                        <p className="genericBodyText">
                                        &rArr; You have good analysis and decision making skills, project management, excellent written and communication skills and a passion for enhancing 
                                            patron experience.<br/> &rArr; You are able to manage multiple projects and work collaboratively with others to deliver results.<br/> &rArr; You are a self-starter who 
                                            can take ownership for projects in a fast-changing, growth-oriented environment.<br/> &rArr; You understand popular B2B Social Media channels to be leveraged 
                                            within client projects.<br/> &rArr; Must be fluent in English and familiar with marketing concepts and communication flows You have excellent organizational, 
                                            written and verbal skills.<br/> &rArr; You are detail oriented and committed to meeting deadlines.<br/> &rArr; You have good interpersonal skills You can work well 
                                            independently and as part of a team.<br/> &rArr; You have the ability to adapt to shifting priorities and manage multiple deadlines.<br/> &rArr; You have the ability to 
                                            problem-solve in a fast paced work environment.<br/> &rArr; You have Knowledge of Microsoft Office programs, including Outlook, Word, and Excel
                                        </p>
                                    </div>
                                </div>
                            }
                            {(this.state.selectedOption === "whyyou") &&
                                <div>
                                    <div>
                                        <p className="genericBodyheader">Why You might NEED Us!</p>
                                    </div>
                                    <div>
                                        <p className="genericBodyText">
                                            &rArr; You will gain a unique opportunity to work with a good cause and impact other people's lives.<br/> &rArr;You will undertake research in a number of areas 
                                            pertaining to health and development.<br/> &rArr;You will have the opportunity to contribute your opinions and inputs to your work unit.<br/>&rArr; You will have the 
                                            benefit of enhancing your learning experience by interacting with supportive staff and volunteers.<br/>&rArr; You will gain job experience and develop your 
                                            knowledge base in many different areas related to research, pregnancy, mental health, charitable organizations, etc.<br/>&rArr; You will make use of 
                                            your creativity in developing new and innovative approaches to the project at hand.<br/>&rArr; You will have a chance to participate in many internal courses 
                                            about conflict resolution and public speaking .<br/>
                                        </p>
                                    </div>
                                </div>
                            }
                            {(this.state.selectedOption === "signup") &&
                                <div>
                                    <div>
                                        <p className="genericBodyheader">Sign Up Today:</p>
                                    </div>
                                    <div>
                                        <p className="genericBodyText">
                                        We welcome students, community partners, and anyone who has a desire to help make a difference in the lives of women and their children. <br></br><br></br> By clicking sign up, you will be redirected to the application process. The wait time before being approved and contacted is usually 2-3 business days.                                        </p>
                                    </div>
                                    <div className="titleImageContainer">
                                        <img src="/img/volunteer.png"/>
                                    </div> 
                                    <p className="signup" onClick={this.onOpenModalSignUp}>BECOME A VOLUNTEER</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default VolunteerPage;
