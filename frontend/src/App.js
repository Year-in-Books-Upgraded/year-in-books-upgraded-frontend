import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  './index.sass';

import LandingLogin from './components/LandingLogin.js'
import MainApp from './components/MainApp.js';

function App() {
    return(
        <Router>
            <Switch>
                <Route path="/login" exact component={LandingLogin} />
                <Route path="/" exact component={MainApp} />
            </Switch>
        </Router>
    );
}

export default App;
