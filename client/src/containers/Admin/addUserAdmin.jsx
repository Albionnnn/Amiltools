import React, {Component, Fragment} from 'react';
import axios from 'axios'
import config from '../../config/config.json'

import './addUserAdmin.css'

//Redux
import { connect } from 'react-redux'

class addUserAdmin extends Component{

    state = {
        "mail": '',
        "firstname": '',
        "lastname": '',
        "password": ''
    }

    sendUser = () => {
        axios.post(config.URL_SERV_BEGGIN + config.URL_API_REST +
            'user/add/api_key=' + this.props.saveUserReducer.api_key,
            {
                "params": {
                  "firstname": this.state.firstname,
                  "lastname": this.state.lastname,
                  "mail": this.state.mail,
                  "password": this.state.password
                }
            })
        .then((response) => {
            document.getElementById('successUser').style.display = "block"
            document.getElementById('successUser').innerHTML = response.data.response
        })
        .catch((error) => {
            document.getElementById('unSuccessUser').style.display = "block"
            document.getElementById('unSuccessUser').innerHTML = error.data.response
        })
    }

    handleChange = event => {
        this.setState({[event.target.id]: event.target.value})
    }


    render(){
        return(
            <Fragment>
                <div id="successUser" className="alert alert-success" role="alert"> 
                </div>
                <div id="unSuccessUser" className="alert alert-danger" role="alert">
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">FirstName</label>
                        <input onChange={this.handleChange} id="firstname" required type="text" className="form-control" placeholder="FirstName" />
                        <small className="form-text text-muted">Enter your firstName</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">LastName</label>
                        <input onChange={this.handleChange} id="lastname" required type="text" className="form-control" placeholder="LastName" />
                        <small className="form-text text-muted">Enter your lastName</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input onChange={this.handleChange} required id="mail" type="mail" className="form-control" placeholder="Enter email" />
                        <small className="form-text text-muted">Enter your email @amiltone.com</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={this.handleChange} required type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                </form>
                <button onClick={this.sendUser} className="btn btn-outline-success my-2 my-sm-0">Click to send</button>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {saveUserReducer: state.saveUserReducer}
}

export default connect(mapStateToProps)(addUserAdmin)