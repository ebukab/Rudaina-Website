import React, { Component } from 'react';
import "./product.css";
import firebase from "firebase";

class Product extends Component {
    state = {
        addSectionShowing : false,
        products : []
    }

    toggleAddSection = ()=>{
        this.setState({
            addSectionShowing : !this.state.addSectionShowing,
        })
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
    

    handleAddProduct = (e) => {
        e.preventDefault();
        const file = e.target.elements.document.files[0];
        const elements = e.target.elements;
        const productName = e.target.elements.productName.value.trim();
        const productDescription = e.target.elements.productDescription.value.trim();
        const productPrice = e.target.elements.productPrice.value.trim();
        const pregnancyPeriod = e.target.elements.trimester.value.trim();
        console.log(productName , productDescription , productPrice, pregnancyPeriod, file);

        if(file){
            const uploadTask = firebase.storage().ref(`items/${file.name}`).put(file);
            uploadTask.on("state_changed" ,
                (snapshot)=>{

                } ,
                (error)=>{
                    console.log(error);
                } ,
                ()=>{
                    firebase.storage().ref('items').child(file.name).getDownloadURL().then((url)=>{
                        console.log(url)
                        // this.props.updatePic(url)
                        // firebase.database().ref(`${this.props.user.role.toLowerCase() + "s"}/${this.props.user.uid}`).update({
                        //     url : url,
                        //     bio : bio,
                        //     phonenumber : phonenumber
                        // })
                        this.addProducts(productName , productDescription , productPrice, pregnancyPeriod, url);
                        this.toggleAddSection();
                    })
                }
            )
        }else{
            // firebase.database().ref(`${this.props.user.role.toLowerCase() + "s"}/${this.props.user.uid}`).update({
            //     bio : bio,
            //     phonenumber : phonenumber,
            //     email : email
            // })
            this.addProducts(productName , productDescription , productPrice, pregnancyPeriod, null);
            this.toggleAddSection();
        }
    }

    deleteProduct = (i) => {
        console.log(i.toString())
        console.log("deleting product")
        firebase.database().ref('products').child(i+'').remove();
        
        firebase.database().ref('products').on('value' , (data)=>{
            if(data.toJSON()){
                this.setState({
                    products : Object.values(data.toJSON())
                })
            }
            else{
                this.setState({
                    products : null
                })
            }
        })
    }

    addProducts = (productName , productDescription , productPrice, pregnancyPeriod, url) => {
        var d = new Date();
        var n = d.getTime();
        firebase.database().ref(`products/${n}`).set({
            productName : productName,
            productDescription : productDescription,
            productPrice : productPrice,
            pregnancyPeriod : pregnancyPeriod,
            image : url,
            id : n
        }).then(()=>{
            firebase.database().ref('products').on('value' , (data)=>{
                if(data.toJSON()){
                    console.log("well looks like it worked")
                    this.setState({
                        products : Object.values(data.toJSON())
                    })
                }
                else{
                    this.setState({
                        products : []
                    })
                }
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        console.log(((this.state.products)))
        return (
            <div>
                <div className="newsHeader">
                    <p>PRODUCTS </p>
                    <i onClick={this.toggleAddSection} className="fas fa-plus-square"></i>
                </div>
                {this.state.addSectionShowing && 
                    <div>
                        <form className="eventDatas" onSubmit={this.handleAddProduct} action="">
                            <div className="newsTitle_ext">
                                <div>
                                    <p>Item Name :</p>
                                    <input type="text" name="productName" placeholder="Enter Product Name"/>
                                </div>
                                <div>
                                    <p>Item Price :</p>
                                    <input type="text" name="productPrice" placeholder="Enter Product Price"/>
                                </div>
                            </div>
                            <div>
                                <p>Item Description :</p>
                                {/*<input className="eventDesc" type="text" name="desc" />*/}
                                <textarea name="productDescription"  rows="4" cols="80%" className="eventDesc"></textarea>
                                {/*<input type="text" placeholder="Enter News Text"/>*/}
                            </div>
                            <div className="eventDates">
                                <div>
                                    <p>Upload image : </p>
                                    <input className="updateInput" id="" name="document" type="file"/>
                                </div>
                                <div>
                                    <p>trimester Category : </p>
                                    <select name="trimester">
                                        <option value="trimester1">trimester 1</option>
                                        <option value="trimester2">trimester 2</option>
                                        <option value="trimester3">trimester 3</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <input className="eventSubmit" type="submit" value="ADD"/>
                            </div>
                        </form>
                    </div>
                }
                <hr/>
                {(this.state.products !== null) && 
                    this.state.products.map((currentItem , i) => {
                        return (
                            <div key={i}  className="productContainer">
                                <p>{currentItem.productName}</p>
                                <p>{currentItem.productDescription}</p>
                                <i onClick={()=>this.deleteProduct(currentItem.id)} className="fas fa-trash-alt "></i>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default  Product;
