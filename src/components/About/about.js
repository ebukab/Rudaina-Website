import React, { Component } from 'react';
import './about.css';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import firebase from "firebase";

class About extends Component {
    state = {
        selectedOption : "mission",
        features  : []
	}
	
	componentWillMount = () => {
        firebase.database().ref('features').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    features : Object.values(data.toJSON())
                })
            }
        })
    }

    handleOptionChange(option){
        this.setState({
            selectedOption : option
        })
    }

    // componentWillMount = () => {
    //     firebase.database().ref('products').on('value' , (data)=>{
    //         if(data.toJSON()){
    //             this.setState({
    //                 products : Object.values(data.toJSON())
    //             })
    //         }
    //     })
    // }

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
                    <div onClick={()=>this.handleOptionChange("mission")} className={mission_active}>
                        {this.props.currentLanguage === "english" && <p>OUR MISSION</p>}
                        {/*this.props.currentLanguage === "french" && <p>OUR MISSION</p>*/}
                    </div>
                </MenuItem>
                <MenuItem key="2">
                    <div onClick={()=>this.handleOptionChange("team")} className={team_active}>
                        <p>LOUR TEAM</p>
                    </div>
                </MenuItem>
                <MenuItem key="3">
                    <div onClick={()=>this.handleOptionChange("story")} className={story_active}>
                        <p>OUR STORY</p>
                    </div>
                </MenuItem>
            </Menu>
        );
        let mission_active = this.state.selectedOption === "mission" ? "optionActive options_item" : "optionInactive options_item";
        let team_active = this.state.selectedOption === "team" ? "optionActive options_item" : "optionInactive options_item";
        let story_active = this.state.selectedOption === "story" ? "optionActive options_item" : "optionInactive options_item";
        return (
            <div className="containerCustom ">
                <div>
                <div className="mobileDropdown hideOnLargeScreen">
                    <p>ABOUT</p>
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
                        <div onClick={()=>this.handleOptionChange("mission")} className={mission_active}>
                            <p>OUR MISSION</p>
                        </div>
                        <div onClick={()=>this.handleOptionChange("team")} className={team_active}>
                            <p>OUR TEAM</p>
                        </div>
                        <div onClick={()=>this.handleOptionChange("story")} className={story_active}>
                            <p>OUR STORY</p>
                        </div>
                    </div>
                    <div>
                        {(this.state.selectedOption === "mission") &&
                            <div>
                                <div>
                                    {this.props.currentLanguage() === "english" && <p className="genericBodyheader">Our mission: </p>}
                                    {this.props.currentLanguage() === "french" && <p className="genericBodyheader">Notre mission est  : </p>}
                                </div>
                                <div>
                                    <div className="titleImageContainer">
                                        <img src="/img/pregnantwoman.jpeg"/>
                                    </div>
                                    {this.props.currentLanguage() === "english" && <p className="genericBodyText">Founded in 2017, the objective of the Rudaina Foundation is to promote health by providing support and information to vulnerable, low income, or indigenous pregnant women, that will enable them to take action and adopt specific behaviors that can help reduce the chances of pregnancy related complications.<br></br><br></br> One of our goals is to provide informational, social, and financial* support to women who are experiencing pregnancy related complications in the form of Cerebral Palsy, Infant Hypoxic-Ischemic Encephalopathy (HIE), Anemia, and Pre-Term Births. *Directly for doctor approved therapy treatments and healthcare modalities
                                    </p>}
                                    {this.props.currentLanguage() === "french" && <p className="genericBodyText">De promouvoir la santé en offrant un soutien en matière de santé prénatale aux femmes enceintes vulnérables ou à faibles revenus.  Pour aider les futures 
                                    mères, de l’information et des outils leur sont offerts  chaque trimestre de grossesse. Ceci leur permettra d'adopter des comportements spécifiques qui assureront un accouchement sécuritaire.
                                    Dans le cadre de ce programme, les femmes subissant des complications liées à la paralysie cérébrale, à l'encéphalopathie hypoxique ischémique infantile, à l'anémie et aux naissances prématurées pourront recevoir une aide financière destinée aux 
                                    </p>}
                                </div>
                            </div>
                        }
                        {(this.state.selectedOption === "team") &&
                            <div>
                                <div>
                                    {this.props.currentLanguage() === "english" && <p className="genericBodyheader">Our Team : </p>}
                                    {this.props.currentLanguage() === "french" && <p className="genericBodyheader">Notre but à long terme </p>}
                                </div>
                                <div className="teamContainer">
                                    {this.state.features.map((person)=>
                                        (
											<div className="teamMember">
												<div className="teamMemberImage">
													<div className="teamMemberImageBox">
														<img src={person.image}></img>
													</div>
												</div>
												<div className="teamMemberDetail">
													<p className="teamMemberName">{person.featureName}</p>
													<p className="">{person.featureRole}</p>
												</div>
												<div className="teamMemberBio">
													<p>
													{person.featureAbout}
													</p>
												</div>
											</div>
                                        )
                                        )
                                    }
                                </div>
                            </div>
                        }
                        {(this.state.selectedOption === "story") &&
                            <div>
                                <div>
                                    {this.props.currentLanguage() === "english" &&  <p className="genericBodyheader">Our Story : </p>}
                                    {this.props.currentLanguage() === "french" &&  <p className="genericBodyheader">Notre histoire : </p>}
                                </div>
                                <div>
                                    {this.props.currentLanguage() === "english" && <p className="genericBodyText">A message from the CEO <br></br><br></br> I wanted to take a minute and explain the name of this foundation. Rudaina was the name of my cousin. She suffered from Infant Hypoxic Ischemic Encephalopathy (HIE) as a result of pregnancy related complications. The doctors gave her a life expectancy of just a couple of years. In 2017, she passed away at the age of 20. Her life was a miracle, she defied all odds.<br></br><br></br> Even though Rudaina couldn’t speak, was paralyzed from the neck down, and bed written her whole life, she always had a smile on her face. I remember playing games with her at a young age, some of my most cherished memories. After she passed, I was inspired by the pain it brought me that I made it my mission to try and help other families that are going through something similar.<br></br><br></br> The Rudaina Foundation will not just focus on HIE cases, it will develop and grow to help anyone that is going through something so emotional and painful during the most beautiful process of life. Whether that help comes from financial resources or through a foundation that can provide support, Rudaina will always be in my heart and will forever fuel my fire to help and contribute all my potential to someone in need.
                                    </p>}

                                    {this.props.currentLanguage() === "french" && <p className="genericBodyText">Message de notre PDG Je voulais prendre une minute pour vous expliquer la signification du nom de cette fondation. Rudaina était le nom de ma cousine. 
                                    Suivant des complications liées à la grossesse de sa mère, Rudaina a souffert d'encéphalopathie hypoxique ischémique infantile. Les médecins disaient qu’elle n’avait que quelques années à vivre. En 2017, elle est décédée à l'âge 
                                    de 20 ans. Suivant son décès, je me suis donné comme mission d'essayer d'aider d'autres familles qui vivent des situations similaires. La Fondation Rudaina ne se concentrera pas seulement sur les cas d'encéphalopathie hypoxique 
                                    ischémique, mais évoluera pour aider toute personne qui vit des problèmes similaires. Que cette aide provienne de ressources financières ou d'une fondation qui peut fournir un soutien, Rudaina sera toujours dans mon cœur et elle 
                                    soutiendra mon désir d’aider les personnes dans le besoin. 
                                    </p>}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default  About
