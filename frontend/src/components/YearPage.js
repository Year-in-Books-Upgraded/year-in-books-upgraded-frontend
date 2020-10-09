import React, { Component } from 'react';
import { BarChart, ComposedChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';

import SideBar from './SideBar.js';


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
                        <div className="first-book-wrapper flexing">
                            <div className="first-book flexing">
                                <p className="section-title">&#9632; First Book &#9632;</p>
                                <div className="cover">
                                    <a href={this.props.first_book.gr_link}><img src={this.props.first_book.cover} alt={this.props.first_book.title}/></a>
                                </div>
                                <p><b><i>{this.props.first_book.title}</i></b><br/>{this.props.first_book.author}</p>
                            </div>
                        </div>
                        <div className="last-book-wrapper flexing">
                            <div className="last-book flexing">
                               <p className="section-title">&#9632; Last Book &#9632;</p>
                               <div className="cover">
                                   <a href={this.props.last_book.gr_link}><img src={this.props.last_book.cover} alt={this.props.last_book.cover} /></a>
                               </div>
                               <p><b><i>{this.props.last_book.title}</i></b><br/>{this.props.last_book.author}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class PagesPage extends Component {
    pagesChart(current_year, all_years, pages_per_year){
        const data = []

        for(var i=0; i<all_years.length; i++){
            let year = all_years[i].toString();
            let pages = pages_per_year[i];
            data.push( { 'year':year, 'pages':pages } );
        }

        return (
            <div className="pages-graph flexing">
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Bar dataKey='pages'>
                            {
                                data.map((entry) => (
                                    <Cell fill={entry['year']===current_year.toString() ? '#DAA993' : '#5A5751'} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }

    componentDidUpdate(){
        var pg = document.getElementsByClassName("pages-graph")[0]

        var axisLines = pg.querySelectorAll(".recharts-cartesian-axis-line");
        for (var i = axisLines.length - 1; i >= 0; i--){
            axisLines[i].remove();
        }

        var tickLines = pg.querySelectorAll(".recharts-cartesian-axis-tick-line");
        for (var j = tickLines.length - 1; j >= 0; j--){
            tickLines[j].remove();
        }
    }

    render(){
        return (
            <div className="full-page-wrapper pages-page">
                <div className="background-section-wrapper content-wrapper">
                    <div className="pages-content-wrapper flexing">
                        <div className="shortest-book-wrapper flexing">
                            <div className="item flexing">
                                <div className="cover flexing">
                                    <a href={this.props.shortest_book.gr_link}><img src={this.props.shortest_book.cover} alt={this.props.shortest_book.title}/></a>
                                </div>
                                <p><b><i>{this.props.shortest_book.title}</i></b><br/>{this.props.shortest_book.author}</p>
                            </div>
                            <div className="info flexing">
                                <p className="section-title">&#9632; Shortest Book &#9632;</p>
                                <p>{this.props.shortest_book.num_pages} pages</p>
                            </div>
                        </div>
                        <div className="average-pages flexing">
                           <div>
                               <p className="section-title">Average<br/>Pages</p>
                               <p>&#9632; {this.props.average_pages} pages &#9632;</p>
                           </div>
                        </div>
                        <div className="longest-book-wrapper flexing">
                            <div className="item flexing">
                                <div className="cover flexing">
                                    <a href={this.props.longest_book.gr_link}><img src={this.props.longest_book.cover} alt={this.props.longest_book.title}/></a>
                                </div>
                                <p><b><i>{this.props.longest_book.title}</i></b><br/>{this.props.longest_book.author}</p>
                            </div>
                            <div className="info flexing">
                                <p className="section-title">&#9632; Longest Book &#9632;</p>
                                <p>{this.props.longest_book.num_pages} pages</p>
                            </div>
                        </div>
                    </div>

                    <div className="pages-graph-wrapper flexing">
                        <div className="pages-graph-border flexing">
                            {this.pagesChart(this.props.year, this.props.all_years, this.props.pages_per_year)}
                            <h2>Total pages read per year</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class StarsPage extends Component {
    starsChart(books){
        const ratings = [0, 0, 0, 0, 0]
        const data = []

        for(var i=0; i<books.length; i++){
            let rating = books[i]['your_rating'];
            ratings[rating-1]++;
        }

        for(var j=5; j>0; j--){
            data.push( { 'rating':j + ' stars', 'count':ratings[j-1] } );
        }

        console.log(data);

        return (
            <div className="stars-graph">
                <ResponsiveContainer>
                    <ComposedChart layout='vertical' data={data}>
                        <XAxis type='number' stroke='#EFCEBF' />
                        <YAxis dataKey='rating' type='category' stroke='#EFCEBF' />
                        <Bar dataKey='count' fill='#F9F0E4' barSize={40}></Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }

    componentDidUpdate(){
        var sg = document.getElementsByClassName("stars-graph")[0]

        var axisLines = sg.querySelectorAll(".recharts-cartesian-axis-line");
        for (var i = axisLines.length - 1; i >= 0; i--){
            axisLines[i].remove();
        }

        var tickLines = sg.querySelectorAll(".recharts-cartesian-axis-tick-line");
        for (var j = tickLines.length - 1; j >= 0; j--){
            tickLines[j].remove();
        }

        var xAxisTicks = sg.querySelectorAll(".xAxis .recharts-cartesian-axis-tick");
        for (var k = xAxisTicks.length - 1; k >= 0; k--){
            xAxisTicks[k].remove();
        }
    }

    render() {
        return (
            <div className="full-page-wrapper stars-page">
                <div className="background-section-wrapper stars-wrapper flexing">
                    <div className="stars-graph-border flexing">
                        <h2 className="section-title">&#9733; Your Ratings &#9733;</h2>
                        {this.starsChart(this.props.books)}
                    </div>
                </div>
                <div className="background-section-wrapper highest-rated-wrapper">
                    <div className="highest-rated-content flexing">
                        <div className="highest-rated flexing">
                            <div className="highest-rated-book">
                                <a href={this.props.highest_rated.gr_link}><img src={this.props.highest_rated.cover} alt={this.props.highest_rated.title}/></a>
                                <p><b><i>{this.props.highest_rated.title}</i></b><br/>{this.props.highest_rated.author}</p>
                            </div>
                            <div className="highest-rated-info">
                                <h2>&#9632; Highest Rated on Goodreads &#9632;</h2>
                                <p>Average rating {this.props.highest_rated.avg_rating} &#9733;<br/>{Number(this.props.highest_rated.num_reads).toLocaleString()} ratings</p>
                            </div>
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

    setAllData(){
        let current_year = this.props.match.params.current_year;
        let user_data = JSON.parse(sessionStorage.getItem('user_data'));
        // sidebar
        this.setState( { 'user_id' : user_data.user_id } );
        this.setState( { 'user_name' : user_data.user_name } );
        this.setState( { 'profile_image' : user_data.profile_image } );
        this.setState( { 'profile_url' : user_data.profile_url } );
        this.setState( { 'all_years' : user_data.all_years } );
        // summary page
        let current_year_data = user_data['all_year_data'].find(x => x['year'] === parseInt(current_year));
        this.setState( { 'total_books' : current_year_data['total_books'] } );
        this.setState( { 'total_pages' : current_year_data['total_pages'] } );
        this.setState( { 'average_rating' : current_year_data['avg_rating'] } );
        this.setState( { 'first_book' : current_year_data['first_book'] } );
        this.setState( { 'last_book' : current_year_data['last_book'] } );
        // pages page
        this.setState( { 'shortest_book' : current_year_data['shortest_book'] } );
        this.setState( { 'longest_book' : current_year_data['longest_book'] } );
        this.setState( { 'average_pages' : current_year_data['avg_pages'] } );
        let years = user_data.all_years;
        let total_pages_per_year = years.map(y => (user_data['all_year_data'].find(x => x['year'] === parseInt(y)))['total_pages']);
        this.setState( { 'total_pages_per_year' : total_pages_per_year } );
        // stars page
        this.setState( { 'highest_rated' : current_year_data['highest_rated_book'] } );
        // popularity page
        this.setState( { 'most_popular' : current_year_data['most_read_book'] } );
        this.setState( { 'least_popular' : current_year_data['least_read_book'] } );
        // covers page
        this.setState( { 'books' : current_year_data['reviews'] } );
    }

    componentDidMount() {
        this.setAllData();
    }

    componentDidUpdate(prevProps){
        var prevYear = prevProps.match.params.current_year;
        var thisYear = this.props.match.params.current_year;
        if(prevYear !== thisYear) {
            this.setAllData();
        }
    }

    render() {
        return (
            <div>
                <SideBar user_name={this.state.user_name} profile_image={this.state.profile_image} profile_url={this.state.profile_url} years={this.state.all_years} />
                <SummaryPage year={this.props.match.params.current_year} total_pages={this.state.total_pages} total_books={this.state.total_books}
                average_rating={this.state.average_rating} first_book={this.state.first_book} last_book={this.state.last_book} />
                <PagesPage shortest_book={this.state.shortest_book} longest_book={this.state.longest_book} average_pages={this.state.average_pages} year={this.props.match.params.current_year} all_years={this.state.all_years} pages_per_year={this.state.total_pages_per_year} />
                <StarsPage highest_rated={this.state.highest_rated} books={this.state.books} />
                <PopularityPage most_popular={this.state.most_popular} least_popular={this.state.least_popular} />
                <CoversPage year={this.props.match.params.current_year} user_id={this.state.user_id} books={this.state.books} />
            </div>
        )
    }
}

export default YearPage;
