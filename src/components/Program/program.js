import React, { Component } from 'react';
import './program.css';
import { NavLink } from 'react-router-dom';
import SignUp from '../SignUp/signup';
import Modal from 'react-responsive-modal';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

class Program extends Component {
    state = {
        selectedOption : "basket",
        openSignUp: false,
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
                    <div onClick={()=>this.handleOptionChange("basket")} className={basket_active}>
                        <p>PROGRAMS</p>
                    </div>
                </MenuItem>
                <MenuItem key="2">
                    <div onClick={()=>this.handleOptionChange("app")} className={app_active}>
                        <p>OUR APP</p>
                    </div>
                </MenuItem>
                <MenuItem key="3">
                    <div onClick={()=>this.handleOptionChange("community")} className={community_active}>
                        <p>OUR COMMUNITY</p>
                    </div>
                </MenuItem>
                <MenuItem key="4">
                    <div onClick={()=>this.handleOptionChange("birth")} className={birth_active}>
                        <p>AFTER BIRTH</p>
                    </div>
                </MenuItem>
                <MenuItem key="5">
                    <div onClick={()=>this.handleOptionChange("signup")} className={signup_active}>
                        <p>SIGN UP</p>
                    </div>
                </MenuItem>
            </Menu>
        );
        const {openSignUp} = this.state;
        let basket_active = this.state.selectedOption === "basket" ? "optionActive options_item" : "optionInactive options_item";
        let app_active = this.state.selectedOption === "app" ? "optionActive options_item" : "optionInactive options_item";
        let community_active = this.state.selectedOption === "community" ? "optionActive options_item" : "optionInactive options_item";
        let birth_active = this.state.selectedOption === "birth" ? "optionActive options_item" : "optionInactive options_item";
        let signup_active = this.state.selectedOption === "signup" ? "optionActive options_item" : "optionInactive options_item";
        return (
            <div>
                <Modal open={openSignUp} onClose={this.onCloseModalSignUp} center className="signUpModal">
                    <div class="">
                        <SignUp closeModal = {this.onCloseModalSignUp}/>
                    </div>
                </Modal>
                <div className="containerCustom">
                    <div>
                        <div className="mobileDropdown hideOnLargeScreen">
                            <p>PROGRAM</p>
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
                        <div className=" genericBody">
                            <div className="genericBody_left hideOnSmallScreen">
                                <div onClick={()=>this.handleOptionChange("basket")} className={basket_active}>
                                    <p>PROGRAMS</p>
                                </div>
                                <div onClick={()=>this.handleOptionChange("app")} className={app_active}>
                                    <p>OUR APP</p>
                                </div>
                                <div onClick={()=>this.handleOptionChange("community")} className={community_active}>
                                    <p>OUR COMMUNITY</p>
                                </div>
                                <div onClick={()=>this.handleOptionChange("birth")} className={birth_active}>
                                    <p>AFTER BIRTH</p>
                                </div>
                                <div onClick={()=>this.handleOptionChange("signup")} className={signup_active}>
                                    <p>SIGN UP</p>
                                </div>
                            </div>
                            <div className="genericBody_rightSide">
                                {(this.state.selectedOption === "basket") &&
                                    <div>
                                        <div>
                                            <p className="genericBodyheader">Our Life Basket Program :</p>
                                        </div>
                                        <div>
                                            <p className="genericBodyText">
                                                An expecting person will be able to register on our website to start receiving a life basket every trimester that will provide tailored 
                                                information to the individual woman. After completing the registration process, provided with proof of pregnancy via a doctors note, an expecting 
                                                woman will be eligible to receive a package that is personalized to the applicants: gestational period, age, previous pregnancies, relationship 
                                                status, social and dietary lifestyle, and household income.
                                            </p>
                                            
                                        </div>
                                    </div>
                                }
                                {(this.state.selectedOption === "app") &&
                                    <div>
                                        <div>
                                            <p className="genericBodyheader">Our App : </p>
                                        </div>
                                        <div>
                                            <p className="genericBodyText">
                                                We offer two versions of our App. The app is available on all platforms but here's the catch , one version is free, the other costs $2.99. 
                                                The free version is for people who need to use its features. The paid version is used as a new means of fundraising. The money goes is strictly 
                                                used for charitable purposes (after paying out the developer fees). Our app has three distinct features that are not utilised on our website. 
                                                Tracking program, uploading medical documents, flappy stork the game!...
                                            </p>
                                        </div>
                                    </div>
                                }
                                {(this.state.selectedOption === "community") &&
                                    <div>
                                        <div>
                                            <p className="genericBodyheader">Our Community :</p>
                                        </div>
                                        <div>
                                            <p className="genericBodyText">
                                                By signing up, you get the chance to be part of a community that is nation wide. Expecting women, nutritionists, registered nurses, midwives, 
                                                and health care practitioners are all part of the conversation. The support is there for whomever seeks it.
                                            </p>
                                        </div>
                                    </div>
                                }
                                {(this.state.selectedOption === "birth") &&
                                    <div>
                                        <div>
                                            <p className="genericBodyheader">What Happens After Birth?</p>
                                        </div>
                                        <div>
                                            <p className="genericBodyText">
                                                Rudaina Foundation will provide health-related support to women and families experiencing pregnancy related complications. This support deals 
                                                with reducing pregnancy related complication costs by providing financial assistance to women, fighting risk factors like lack of antenatal care, 
                                                pregnancy induced hypertension, prolonged second-stages of labor, and delivery by use of instruments or emergency caesarian section. Rudaina will 
                                                also cover the post-pregnancy treatments of the complications listed in our mission. Example treatments Rudaina is expecting to provide financial 
                                                support for are: Hypothermia therapy; Surgical interventions and medications for cerebral palsy; Speech and language pathology; Physical, 
                                                behavioural and emotional therapy; Occupational therapy for developing life skills; Massage therapy; Stem cell therapy; and Technologies used for 
                                                assistance. While some of these treatments are covered under provincial health care, Rudaina will ensure that any costs that exceed insurance 
                                                coverage is covered on behalf of the applicant. Rudaina will conduct in depth verification regarding the applicants private insurance benefits. 
                                                This will be done by requesting a copy of their insurance policy.
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
                                                Every birth is different. Sign up now to start receiving life basket tailored to your specific pregnancy. An expecting person is able to start 
                                                receiving a life basket every trimester, that will provide tailored unique information to each woman. After completing the registration process, 
                                                provided with proof of pregnancy via a doctors note, an expecting woman will be eligible to receive a package. By registering, the user is 
                                                making a profile account on our website. This is done so that if any problems occur during pregnancy, there will be an easy-to-follow procedure 
                                                for an applicant to benefit from our supportive health care programs.
                                            </p>
                                        </div>
                                        <p className="signup" onClick={this.onOpenModalSignUp}>BECOME A BENEFACTOR</p>
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

export default Program;
