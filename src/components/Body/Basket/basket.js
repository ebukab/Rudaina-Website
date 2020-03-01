import React, { Component } from 'react';
import "./basket.css";

class Basket extends Component {
    state = {
        option : "generalInfo"
    }

    selectedBasket = (option) => {
        console.log(option)
        this.setState({
            option : option
        })
    }

    render() {
        return (
            <div className="basketSection">
                <div className="basketSectionContainer">
                    <div className="basketImageBox">
                        <div className="basket-section-image">
                            <img src="/rudainaAllBaskets.png"/>
                        </div>
                    </div>
                    <div className="basketTextBox">
                        <p className="basketTextBoxHeader">OUR LIFE BASKET PROGRAM</p>
                        <p>
                            In 2018 we launched our Life Basket Program, where an expecting mother 
                            can register on our website to start receiving a “Life Baskets”, which 
                            will provide tailored information and gifts for each trimester.<br></br><br></br> Contents 
                            of these baskets include: <br></br><br></br><span className="bulletPoint">&#10061;</span> Personalized trimester booklet with advice on 
                            nutrition, exercise and resources, including motherhood-prep classes, 
                            local community help lines, councilors, therapists and group support 
                            programs, <br></br><br></br><span className="bulletPoint">&#10061;</span> Complementary folic acid & multivitamin supplements, 
                            <br></br><br></br><span className="bulletPoint">&#10061;</span> Comfort accessories, including back pillows, massagers, journals, 
                            and more!
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Basket;
