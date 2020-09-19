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
                            <h2 className="title">
                                Your Year in Books
                            </h2>
                        </div>
                        <div>
                            <h1 className="year">{this.props.year}</h1>
                        </div>
                        <div className="divider">&nbsp;
                        </div>
                        <div className="stats">
                            <p>
                                <b>{this.props.total_pages}</b> pages across <b>{this.props.total_books}</b> books
                            </p>
                            <p>
                                Average rating <b>{this.props.average_rating} &#9733;</b>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="background-section-wrapper first-last-wrapper">
                    <div className="first-last-content flexing">
                        <div className="first-book flexing">
                            <p className="section-title">&#9632; First Book &#9632;</p>
                            <a href={this.props.first_book.gr_link}><img src={this.props.first_book.cover} alt={this.props.first_book.title}/></a>
                            <p><i>{this.props.first_book.title}</i><br/>{this.props.first_book.author}</p>
                        </div>
                        <div className="last-book flexing">
                            <p className="section-title">&#9632; Last Book &#9632;</p>
                            <a href={this.props.last_book.gr_link}><img src={this.props.last_book.cover} alt={this.props.last_book.cover} /></a>
                            <p><i>{this.props.last_book.title}</i><br/>{this.props.last_book.author}</p>
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
                        <div className="shortest-book flexing">
                            <div>
                                <a href={this.props.shortest_book.gr_link}><img src={this.props.shortest_book.cover} alt={this.props.shortest_book.title}/></a>
                                <p><i>{this.props.shortest_book.title}</i><br/>{this.props.shortest_book.author}</p>
                                <p className="section-title">&#9632; Shortest Book &#9632;</p>
                                <p>{this.props.shortest_book.num_pages} pages</p>
                            </div>
                        </div>
                        <div className="average-pages flexing">
                            <p>Average pages {this.props.average_pages}</p>
                        </div>
                        <div className="longest-book flexing">
                            <div>
                                <a href={this.props.longest_book.gr_link}><img src={this.props.longest_book.cover} alt={this.props.longest_book.title}/></a>
                                <p><i>{this.props.longest_book.title}</i><br/>{this.props.longest_book.author}</p>
                                <p className="section-title">&#9632; Longest Book &#9632;</p>
                                <p>{this.props.longest_book.num_pages} pages</p>
                            </div>
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
                        <div className="highest-rated flexing">
                            <a href={this.props.highest_rated.gr_link}><img src={this.props.highest_rated.cover} alt={this.props.highest_rated.title}/></a>
                            <p><i>{this.props.highest_rated.title}</i><br/>{this.props.highest_rated.author}</p>
                            <p className="section-title">&#9632; Highest Rated on Goodreads &#9632;</p>
                            <p>{this.props.highest_rated.avg_rating} stars<br/>{this.props.highest_rated.num_reads} ratings</p>
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

class YearPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'all_years' : [],
            'total_books' : 0,
            'total_pages' : 0,
            'average_rating' : 0,
            'first_book' : {},
            'last_book' : {},
            'shortest_book' : {},
            'longest_book' : {},
            'average_pages' : 0,
            'highest_rated' : {}
        }
    }

    componentDidMount() {
        let current_year = this.props.match.params.current_year;
        let user_data = JSON.parse(sessionStorage.getItem('user_data'));
        this.setState( { 'all_years' : user_data.all_years } );
        // summary page
        let current_year_data = user_data['all_year_data'].find(x => x['year'] === parseInt(current_year))
        this.setState( { 'total_books' : current_year_data['total_books'] } );
        this.setState( { 'total_pages' : current_year_data['total_pages'] } );
        this.setState( { 'average_rating' : current_year_data['avg_rating'] } );
        this.setState( { 'first_book' : current_year_data['first_book'] } );
        this.setState( { 'last_book' : current_year_data['last_book'] } ) ;
        this.setState( { 'shortest_book' : current_year_data['shortest_book'] } ) ;
        this.setState( { 'longest_book' : current_year_data['longest_book'] } ) ;
        this.setState( { 'average_pages' : current_year_data['avg_pages'] } );
        this.setState( { 'highest_rated' : current_year_data['highest_rated_book'] } );
    }

    render() {
        return (
            <div>
                <SideBar {...this.props} />
                <SummaryPage year={this.props.match.params.current_year} total_pages={this.state.total_pages} total_books={this.state.total_books}
                average_rating={this.state.average_rating} first_book={this.state.first_book} last_book={this.state.last_book}/>
                <PagesPage shortest_book={this.state.shortest_book} longest_book={this.state.longest_book} average_pages={this.state.average_pages}/>
                <StarsPage highest_rated={this.state.highest_rated} />
                <PopularityPage {...this.props} />
                <CoversPage {...this.props} />
            </div>
        )
    }
}

export default YearPage;
