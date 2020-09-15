import React, { Component } from 'react';
import axios from 'axios';

import goodreads_logo from '../images/goodreads_logo.png';


class LandingLogin extends Component {

    constructor(){
        super();
        this.state = {
            auth_url : ''
        }
    }

    componentDidMount(){
        this.get_auth_url();
    }

    async get_auth_url(){
        let response = await axios.get("http://127.0.0.1:5000/login");
        console.log(response.data);
        let auth_url = response.data
        this.setState({auth_url : auth_url})
    }

    render() {
        return(
            <div className="full-page-wrapper">
                <div className="login-wrapper flexing">
                    <div className="content-wrapper">
                        <h1 className="top-header">Your Year in Books</h1>
                        <p className="sub-header">Discover your reading journey across the pages</p>
                        <div className="divider flexing">&nbsp;
                        </div>
                        <div className="gr-button flexing">
                            <a href={this.state.auth_url}>
                                <div className="gr-button-content">
                                    <img alt="Goodreads logo icon" className="goodreads-logo" src={goodreads_logo}/>
                                    <p>Connect to Goodreads</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default LandingLogin;
