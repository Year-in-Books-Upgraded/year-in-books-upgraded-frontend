import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';

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
                            <FontAwesomeIcon icon={faHome} className="home-icon" />
                            <p>Search another member</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            'menuToggled' : false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(){
        this.setState( { 'menuToggled' : (!this.state.menuToggled) } );
    }

    render() {
        return (
            <div>
                <div className="sidebar flexing">
                    <div className="menu-icon" onClick={this.toggleMenu}>
                        {this.state.menuToggled === false ? <FontAwesomeIcon icon={faBars} size="3x" cursor="pointer"/> : <FontAwesomeIcon icon={faTimes} size="3x" cursor="pointer"/>}
                    </div>
                    <div className="pic flexing">
                        <div className="pic-wrapper flexing">
                            <a href={this.props.profile_url}><img src={this.props.profile_image} alt="Goodreads icon"/></a>
                        </div>
                    </div>
                </div>
                { this.state.menuToggled && <div onClick={this.toggleMenu}>{<YearMenu years={this.props.years}/>}</div> }
            </div>
        );
    }
}

export default SideBar;
