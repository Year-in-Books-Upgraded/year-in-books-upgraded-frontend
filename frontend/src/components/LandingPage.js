import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import goodreads_logo from '../images/goodreads_logo.png';


class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id : '',
            loading : false,
            data_fetched : false
        };
        this.handleUserID = this.handleUserID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserID(event){
        this.setState({user_id : event.target.value});
    }

    handleSubmit(event){
        this.setState({loading : true});
        axios.get('http://localhost:5000/getuserdata/' + this.state.user_id)
            .then(response => {
                console.log(response);
                this.setState({loading : false});
                this.setState({data_fetched : true});
            })
        event.preventDefault();
    }

    render() {
        if(this.state.loading) {
            return (
                <div className="full-page-wrapper">
                    <div className="flexing">
                        <h1>Loading ...</h1>
                    </div>
                </div>
            )
        } else if(this.state.data_fetched) {
            return <Redirect to='/year/2020' />
        }
        return(
            <div className="full-page-wrapper">
                <div className="login-wrapper flexing">
                    <div className="content-wrapper">
                        <h1 className="top-header">Your Year in Books</h1>
                        <p className="sub-header">Discover your reading journey across the pages</p>
                        <div className="divider">&#9632;&nbsp;&nbsp;&#9632;&nbsp;&nbsp;&#9632;&nbsp;&nbsp;&#9632;&nbsp;&nbsp;&#9632;&nbsp;&nbsp;&#9632;&nbsp;&nbsp;&#9632;&nbsp;&nbsp;&#9632;</div>
                        <div className="id-input flexing">
                            <div className="id-input-content">
                                <img alt="Goodreads logo icon" className="goodreads-logo" src={goodreads_logo}/>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        Enter your Goodreads ID
                                        <input type="text" value={this.state.user_id} onChange={this.handleUserID}/>
                                    </label>
                                    <input type="submit" value="Fetch my data!" onClick={this.handleSubmit} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}


export default LandingPage;
