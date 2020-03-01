import React, {Component} from 'react';
import "./BasketItems.css"
import firebase from "firebase";

class BasketItems extends Component{
    state = {
        products : []
    }

    componentWillMount = () => {
        firebase.database().ref('products').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    products : Object.values(data.toJSON())
                })
            }
        })
    }

    render(){
        return (
            <div className="basketItemsContainer">
                <div className="basketItemsBox">
                    <div className="basketItems">
                        {this.state.products.map((product)=>
                            (
                            <a href="https://www.canadahelps.org/en/dn/t/32254" target="_blank" className="basketItem">
                                <div className="basketItemImageBox">
                                    <img src={product.image}/>
                                </div> 
                                <div className="basketItemTitle">
                                    <p className="">{product.productName}</p>
                                </div> 
                                <div className="basketItemText">
                                    <p>{product.productDescription}</p>
                                </div>
                                <div className="basketItemPrice">
                                    <p>{product.productPrice}</p>
                                </div>
                            </a>)
                            )
                        }
                    </div>
                    <a href="https://www.canadahelps.org/en/dn/t/32254" target="_blank" className="basketDonateButton">Donate</a>
                </div>
            </div>
        )
    }
}

export default BasketItems;
