import React from 'react';
import "./moreInfo.css"
import {Link} from "react-router-dom"

const MoreInfo = () => {
    return (
        <div className= "moreInfo">
            <div className= "moreInfoContainer">
                <Link style={{ textDecoration: 'none', color : "black" }} to="/program" className= "moreInfoItem">
                    <div className= "moreInfoItemIcon"><i className="fas fa-shopping-basket"></i></div>
                    <div>
                        <p className= "moreInfoItemHeader">Life Basket Program</p>
                        <p className= "moreInfoItemText">
                            Our Life Basket Program will deliver packages to <span className="bold">low income, vulnerable or indigenous 
                            women every trimester</span>. These baskets are filled with items and information intended to 
                            <span className="bold">support their mental health and environment during pregnancy</span> 
                        </p>
                    </div>
                </Link>
                <Link style={{ textDecoration: 'none', color : "black" }} to="/volunteer" className= "moreInfoItem">
                    <div className= "moreInfoItemIcon"><i  className="fas fa-people-carry"></i></div>
                    <div>
                        <p className= "moreInfoItemHeader">Volunteering Opportunities</p>
                        <p className= "moreInfoItemText">
                        We are currently recruiting: students, health professionals, and anyone who wants to make a difference 
                        for vulnerable women through the miracle of life process.
                        </p>
                    </div>
                </Link>
                <Link style={{ textDecoration: 'none', color : "black" }} to="/program" className= "moreInfoItem">
                    <div className= "moreInfoItemIcon"><i className="fas fa-users"></i></div>
                    <div>
                        <p className= "moreInfoItemHeader">Online Community Network</p>
                        <p className= "moreInfoItemText">
                        Register online for our Life Basket Program and become a part of our online community. We aim to foster 
                        a supportive social network for health professionals, mothers and mothers-to-be whom with you can connect and share resources, information, and stories.
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default  MoreInfo
