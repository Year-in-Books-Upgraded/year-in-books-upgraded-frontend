import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  './index.sass';

import LandingPage from './components/LandingPage.js';
import YearPage from './components/YearPage.js';

function App() {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/year/:current_year" component={YearPage} />
            </Switch>
        </Router>
    );
}

export default App;
