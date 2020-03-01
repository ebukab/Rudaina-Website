import React, { Component } from 'react';
import "./Reports.css";
import firebase from "firebase";

class Reports extends Component {
    state = {
        reports : []
    }
    componentWillMount = () => {
        firebase.database().ref('messageReports').on('value' , (data)=>{
            this.setState({
                reports : Object.values(data.toJSON())
            })
        })
    }
    render() {
        return (
            <div>
                {this.state.reports.map((report)=>{return(
                    <div className="reportBox">
                        <div className="reportBoxHeader">
                            <p>{report.sender}</p>
                            <p>{report.email}</p>
                            <p>{report.date}</p>
                        </div>
                        <p>{report.message}</p>
                    </div>
                )})}
            </div>
        )
    }
}

export default Reports;
