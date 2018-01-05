import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import MainPage from './MainPage';
import NavBar from './NavBar';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import {fetchCurrentUser} from "../actions";

class App extends Component {
    componentDidMount() {
        this.props.fetchCurrentUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="/" component={NavBar}/>
                        <Route exact path="/" component={MainPage}/>

                        <Route exact path="/signup" component={SignUpPage}/>

                        <Route exact path="/profile" component={ProfilePage}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, {fetchCurrentUser})(App);