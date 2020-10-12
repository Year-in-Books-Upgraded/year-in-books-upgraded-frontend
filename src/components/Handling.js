import React, { Component } from 'react';

class LoadingPage extends Component {
    render(){
        return(
            <div className="full-page-wrapper">
                <div className="loading-wrapper flexing">
                    <div>
                        <h1 className="loading-text">Loading user data. Thanks for waiting.</h1>
                        <div className="loading-dots flexing">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class ErrorPage extends Component {
    render(){
        return(
            <div className="full-page-wrapper">
                <div className="error-wrapper flexing">
                    <div>
                        <h1 className="error-text">Oh no!<br/> {this.props.location.state.error_message}</h1>
                        <p className="return-link">&#9632; <a href="/">Return to landing</a> &#9632;</p>
                    </div>
                </div>
            </div>
        );
    }
}

export { LoadingPage, ErrorPage };
