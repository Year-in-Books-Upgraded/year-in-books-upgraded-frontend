import React, { Component } from 'react';

class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="pic">
                    {this.props.user_name}
                </div>
            </div>
        );
    }
}

class SummaryPage extends Component {
    render() {
        return (
            <div className="full-page-wrapper summary-page">
                <div className="background-section-wrapper summary-wrapper">
                    <div className="summary-content">
                        <div>
                            <h2>
                                Your Year in Books
                            </h2>
                        </div>
                        <div>
                            <h1>{this.props.year}</h1>
                        </div>
                        <div className="divider">&nbsp;
                        </div>
                        <div>
                            <p>
                                {this.props.total_pages} pages across {this.props.total_books} books
                            </p>
                            <p>
                                Average rating {this.props.average_rating} stars
                            </p>
                        </div>
                    </div>
                </div>

                <div className="background-section-wrapper first-last-wrapper">
                    <div className="first-last-content flexing">
                        <div className="first-book">
                            first book
                        </div>
                        <div className="last-book">
                            last book
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class PagesPage extends Component {
    render(){
        return (
            <div className="full-page-wrapper pages-page">
                <div className="background-section-wrapper content-wrapper">
                    <div className="pages-content-wrapper flexing">
                        <div className="shortest-book">
                            shortest book
                        </div>
                        <div className="average-pages">
                            average pages
                        </div>
                        <div className="longest-book">
                            longest book
                        </div>
                    </div>

                    <div className="pages-graph-wrapper flexing">
                        <div className="pages-graph-border flexing">
                            <div className="pages-graph flexing">
                                pages read graph
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class StarsPage extends Component {
    render() {
        return (
            <div className="full-page-wrapper stars-page">
                <div className="background-section-wrapper stars-wrapper">
                    <div className="stars-graph flexing">
                        <div className="stars-graph-title">
                            stars graph
                        </div>
                    </div>
                </div>
                <div className="background-section-wrapper highest-rated-wrapper">
                    <div className="highest-rated-content flexing">
                        <div className="highest-rated-title">
                            highest rated
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PopularityPage extends Component {
    render() {
        return(
            <div className="full-page-wrapper popularity-page">
                <div className="background-section-wrapper popularity-wrapper">
                    <div className="popularity-content flexing">
                        <div className="most-popular">
                            most popular book
                        </div>
                        <div className="least-popular">
                            least popular book
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CoversPage extends Component {
    render() {
        return(
            <div className="full-page-wrapper covers-page">
                <div className="background-section-wrapper covers-wrapper">
                    <div className="covers-grid flexing">
                        <div className="cover">
                            book covers grid
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class MainApp extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <div>
                <p>OK</p>                
                // <SideBar {...this.props} />
                // <SummaryPage year={this.props.current_year} />
                // <PagesPage {...this.props} />
                // <StarsPage {...this.props} />
                // <PopularityPage {...this.props} />
                // <CoversPage {...this.props} />
            </div>
        )
    }
}

export default MainApp;
