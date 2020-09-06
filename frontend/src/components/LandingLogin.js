import React, { Component } from 'react';
import axios from 'axios';

import goodreads_logo from '../images/goodreads_logo.png';


class LandingLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth_url : ''
        }
    }

    testbutton() {
        var config = { method: 'get', url: 'localhost:4567/'};

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    componentDidMount() {
        this.testbutton();
    }

    render() {
        while (this.state.auth_url === '') {
            return null;
        }

        return (
            <div className="full-page-wrapper">
                <div className="login-wrapper flexing">
                    <div className="content-wrapper">
                        <h1 className="top-header">Your Year in Books</h1>
                        <p className="sub-header">Discover your reading journey across the pages</p>
                        <div className="divider flexing">&nbsp;
                        </div>
                        <a href={this.state.auth_url}>
                            <div className="gr-button-content">
                                <img alt="Goodreads logo icon" className="goodreads-logo" src={goodreads_logo}/>Connect to Goodreads
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )

    }
}

export default LandingLogin;
