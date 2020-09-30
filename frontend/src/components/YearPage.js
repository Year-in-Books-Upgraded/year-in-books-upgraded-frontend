import React, { Component } from 'react';

import SideBar from './SideBar.js'

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
                                <b>{Number(this.props.total_pages).toLocaleString()}</b> pages across <b>{Number(this.props.total_books).toLocaleString()}</b> books
                            </p>
                            <p>
                                Your average rating <b>{this.props.average_rating} &#9733;</b>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="background-section-wrapper first-last-wrapper">
                    <div className="first-last-content flexing">
                        <div className="first-book flexing">
                            <p className="section-title">&#9632; First Book &#9632;</p>
                            <a href={this.props.first_book.gr_link}><img src={this.props.first_book.cover} alt={this.props.first_book.title}/></a>
                            <p><b><i>{this.props.first_book.title}</i></b><br/>{this.props.first_book.author}</p>
                        </div>
                        <div className="last-book flexing">
                            <p className="section-title">&#9632; Last Book &#9632;</p>
                            <a href={this.props.last_book.gr_link}><img src={this.props.last_book.cover} alt={this.props.last_book.cover} /></a>
                            <p><b><i>{this.props.last_book.title}</i></b><br/>{this.props.last_book.author}</p>
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
                                <p><b><i>{this.props.shortest_book.title}</i></b><br/>{this.props.shortest_book.author}</p>
                                <p className="section-title">&#9632; Shortest Book &#9632;</p>
                                <p>{this.props.shortest_book.num_pages} pages</p>
                            </div>
                        </div>
                        <div className="average-pages flexing">
                           <div>
                               <p className="section-title">&#9632; Average &#9632;</p>
                               <p>{this.props.average_pages} pages</p>
                           </div>
                        </div>
                        <div className="longest-book flexing">
                            <div>
                                <a href={this.props.longest_book.gr_link}><img src={this.props.longest_book.cover} alt={this.props.longest_book.title}/></a>
                                <p><b><i>{this.props.longest_book.title}</i></b><br/>{this.props.longest_book.author}</p>
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
                            <p className="section-title">&#9733; Your Ratings &#9733;</p>
                        </div>
                    </div>
                </div>
                <div className="background-section-wrapper highest-rated-wrapper">
                    <div className="highest-rated-content flexing">
                        <div className="highest-rated flexing">
                            <a href={this.props.highest_rated.gr_link}><img src={this.props.highest_rated.cover} alt={this.props.highest_rated.title}/></a>
                            <p><b><i>{this.props.highest_rated.title}</i></b><br/>{this.props.highest_rated.author}</p>
                            <p className="section-title">&#9632; Highest Rated on Goodreads &#9632;</p>
                            <p>Average rating {this.props.highest_rated.avg_rating} &#9733;<br/>{Number(this.props.highest_rated.num_reads).toLocaleString()} ratings</p>
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
                            <div>
                                <a href={this.props.most_popular.gr_link}><img src={this.props.most_popular.cover} alt={this.props.most_popular.title}/></a>
                                <p><b><i>{this.props.most_popular.title}</i></b><br/>{this.props.most_popular.author}</p>
                            </div>
                            <div>
                                <p className="section-title">Most popular</p>
                                <p>{Number(this.props.most_popular.num_reads).toLocaleString()}<br/>people have read this book</p>
                            </div>
                        </div>
                        <div className="least-popular">
                            <div>
                                <a href={this.props.least_popular.gr_link}><img src={this.props.least_popular.cover} alt={this.props.least_popular.title}/></a>
                                <p><b><i>{this.props.least_popular.title}</i></b><br/>{this.props.least_popular.author}</p>
                            </div>
                            <div>
                                <p className="section-title">Least popular</p>
                                <p>{Number(this.props.least_popular.num_reads).toLocaleString()}<br/>people have read this book</p>
                            </div>
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
                <div className="covers-wrapper flexing">
                    <div className="covers-grid">
                        { this.props.books.filter(book => !book.cover.includes('nophoto')).map(book =>
                              <div className="image-container">
                                  <a href={book.gr_link} title={book.title + ' by ' + book.author}><img src={ book.cover } alt= { book.title } /></a>
                              </div>
                          )
                        }
                    </div>
                    <h3 className="shelf-link"><a href={"https://www.goodreads.com/review/list?id="+ this.props.user_id + "&shelf=read&sort=date_read&read_at=" + this.props.year}>See all of the books you've read in {this.props.year}!</a></h3>
                </div>
            </div>
        );
    }

}

class YearPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'user_id' : '',
            'user_name' : '',
            'profile_image' : '',
            'profile_url' : '',
            'all_years' : [],
            'total_books' : 0,
            'total_pages' : 0,
            'average_rating' : 0,
            'first_book' : {},
            'last_book' : {},
            'shortest_book' : {},
            'longest_book' : {},
            'average_pages' : 0,
            'highest_rated' : {},
            'most_popular' : {},
            'least_popular' : {},
            'books' : []
        }
    }

    componentDidMount() {
        let current_year = this.props.match.params.current_year;
        let user_data = JSON.parse(sessionStorage.getItem('user_data'));
        // sidebar
        this.setState( { 'user_id' : user_data.user_id } );
        this.setState( { 'user_name' : user_data.user_name } );
        this.setState( { 'profile_image' : user_data.profile_image } );
        this.setState( { 'profile_url' : user_data.profile_url } );
        this.setState( { 'all_years' : user_data.all_years } );
        // summary page
        let current_year_data = user_data['all_year_data'].find(x => x['year'] === parseInt(current_year))
        this.setState( { 'total_books' : current_year_data['total_books'] } );
        this.setState( { 'total_pages' : current_year_data['total_pages'] } );
        this.setState( { 'average_rating' : current_year_data['avg_rating'] } );
        this.setState( { 'first_book' : current_year_data['first_book'] } );
        this.setState( { 'last_book' : current_year_data['last_book'] } );
        // pages page
        this.setState( { 'shortest_book' : current_year_data['shortest_book'] } );
        this.setState( { 'longest_book' : current_year_data['longest_book'] } );
        this.setState( { 'average_pages' : current_year_data['avg_pages'] } );
        // stars page
        this.setState( { 'highest_rated' : current_year_data['highest_rated_book'] } );
        // popularity page
        this.setState( { 'most_popular' : current_year_data['most_read_book'] } );
        this.setState( { 'least_popular' : current_year_data['least_read_book'] } );
        // covers page
        this.setState( { 'books' : current_year_data['reviews'] } );
    }

    render() {
        return (
            <div>
                <SideBar user_name={this.state.user_name} profile_image={this.state.profile_image} profile_url={this.state.profile_url} years={this.state.all_years}/>
                <SummaryPage year={this.props.match.params.current_year} total_pages={this.state.total_pages} total_books={this.state.total_books}
                average_rating={this.state.average_rating} first_book={this.state.first_book} last_book={this.state.last_book}/>
                <PagesPage shortest_book={this.state.shortest_book} longest_book={this.state.longest_book} average_pages={this.state.average_pages}/>
                <StarsPage highest_rated={this.state.highest_rated} />
                <PopularityPage most_popular={this.state.most_popular} least_popular={this.state.least_popular} />
                <CoversPage year={this.props.match.params.current_year} user_id={this.state.user_id} books={this.state.books} />
            </div>
        )
    }
}

export default YearPage;
