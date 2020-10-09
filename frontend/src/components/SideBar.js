import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

class YearMenu extends Component {
    render(){
        return (
            <div className="year-menu flexing">
                <div className="years-wrapper flexing">
                    <div className="years flexing">
                        {this.props.years.map((year) => <Link className="year-link" to={"/year/" + year}>{year}</Link>)}
                    </div>
                    <div className="home-wrapper flexing">
                        <Link className="home-link flexing" to="/">
                            <HomeIcon style={{ fontSize : 40 }} className="home-icon" />
                            <p>Search another member</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

class SideBar extends Component {
    render() {
        return (
            <div>
                <div className="sidebar">
                    <div className="pic flexing">
                        <div className="pic-wrapper flexing">
                            <a href={this.props.profile_url}><img src={this.props.profile_image} alt="Goodreads icon"/></a>
                        </div>
                    </div>
                    <MenuIcon className="hamburger-icon" style={{ fontSize : 60, color : '#F9F0E4' }}/>
                </div>
                <div>
                    {<YearMenu years={this.props.years}/>}
                </div>
            </div>
        );
    }
}

export default SideBar;
