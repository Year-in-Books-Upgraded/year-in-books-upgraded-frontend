import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

import goodreads_logo from '../images/goodreads_logo.png';

import { LoadingPage } from './Handling.js'

require('dotenv').config();

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id : '',
            loading : false,
            data_fetched : false,
            error : false,
            error_type : 0
        };
        this.handleUserID = this.handleUserID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserID(event){
        this.setState({user_id : event.target.value});
    }

    handleSubmit(event){
        this.setState({loading : true});
        var api_url = process.env.REACT_APP_BACKEND + '/api/getuserdata/' + this.state.user_id

        axios.get(api_url)
            .then(response => {
                sessionStorage.setItem('user_data', JSON.stringify(response.data));
                // console.log(response.data);
                this.setState({loading : false});
                this.setState({data_fetched : true});
            })
            .catch(error =>
                {
                    var error_msg = error.response.data;
                    if(error_msg.includes('read book')) {
                        this.setState({loading : false , error : true, error_type : 2});
                    } else if(error_msg.includes('invalid')) {
                        this.setState({loading : false , error : true, error_type : 1});
                    } else {
                        this.setState({loading : false , error : true, error_type : 3});
                    }
                }
            );

        event.preventDefault();
    }

    render() {
        if(this.state.loading) {
            return <LoadingPage />
        } else if(this.state.data_fetched) {
            let all_years_array = JSON.parse(sessionStorage.getItem('user_data')).all_years
            let latest_year = all_years_array[all_years_array.length - 1]
            return <Redirect to={'/year/'+latest_year.toString()} />
        } else if(this.state.error) {
            if(this.state.error_type === 1){
                return <Redirect to={{ pathname : '/error', state : { error_message : "Unable to retrieve user data. You may have entered an invalid user ID or this Goodreads user may limit their profile settings."} }} />
            } else if(this.state.error_type === 2){
                return <Redirect to={{ pathname : '/error', state : { error_message : "This user has no read books."} }} />
            } else {
                return <Redirect to={{ pathname : '/error', state : { error_message : "The application encountered an error." } }} />
            }
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
                                        Enter your Goodreads ID &nbsp; <FontAwesomeIcon icon={faInfoCircle} data-tip data-for="id-tooltip" />
                                        <ReactTooltip id="id-tooltip" place="right">Goodreads IDs are numbers.<br/>They can be found in the URL when visiting a member's profile page.<br/>For example, my Goodreads profile page URL is:<br/>https://www.goodreads.com/user/show/32647477-emily.<br/>My Goodreads ID would be 32647477.</ReactTooltip>
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
