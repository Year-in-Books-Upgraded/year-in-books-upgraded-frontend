import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import goodreads_logo from '../images/goodreads_logo.png';

import { LoadingPage } from './Handling.js'

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
                sessionStorage.setItem('user_data', JSON.stringify(response.data));
                console.log(response.data);
                this.setState({loading : false});
                this.setState({data_fetched : true});
            })
        event.preventDefault();
    }

    render() {
        if(this.state.loading) {
            return <LoadingPage/>
        } else if(this.state.data_fetched) {
            let all_years_array = JSON.parse(sessionStorage.getItem('user_data')).all_years
            let latest_year = all_years_array[all_years_array.length - 1]
            return <Redirect to={'/year/'+latest_year.toString()} />
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
