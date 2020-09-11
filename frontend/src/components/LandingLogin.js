import React, { Component } from 'react';
// import axios from 'axios';

import goodreads_logo from '../images/goodreads_logo.png';


class LandingLogin extends Component {
    goodreads_login_button(){
        // axios.get()
        const auth_url = 'http://goodreads.com';
        return(
            <a href={auth_url}>
                <div className="gr-button-content">
                    <img alt="Goodreads logo icon" className="goodreads-logo" src={goodreads_logo}/>
                    <p>Connect to Goodreads</p>
                </div>
            </a>
        );
    }


    render() {
        return (
            <div className="full-page-wrapper">
                <div className="login-wrapper flexing">
                    <div className="content-wrapper">
                        <h1 className="top-header">Your Year in Books</h1>
                        <p className="sub-header">Discover your reading journey across the pages</p>
                        <div className="divider flexing">&nbsp;
                        </div>
                        <div className="gr-button flexing">    {this.goodreads_login_button()}</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default LandingLogin;
