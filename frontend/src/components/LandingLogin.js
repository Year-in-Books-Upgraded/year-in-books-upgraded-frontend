import React, { Component } from 'react';

import goodreads_logo from '../images/goodreads_logo.png';


class LandingLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {}
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
                        <button className="gr-button" type="button">
                            <div className="gr-button-content">
                                <img alt="Goodreads logo icon" className="goodreads-logo" src={goodreads_logo}/>Connect to Goodreads
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingLogin;
