import React, { Component } from 'react';

class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="pic flexing">
                    <div className="pic-wrapper flexing">
                        <a href={this.props.profile_url}><img src={this.props.profile_image} alt="Goodreads icon"/></a>
                    </div>
                </div>
                {this.props.years}
            </div>
        );
    }
}

export default SideBar;
