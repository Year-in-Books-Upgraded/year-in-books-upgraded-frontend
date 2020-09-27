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
                <div className="flexing">
                    <h1>Error page</h1>
                </div>
            </div>
        )
    }
}

export { LoadingPage, ErrorPage };
