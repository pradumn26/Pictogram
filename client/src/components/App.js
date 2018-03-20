import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import MainPage from './MainPage';
import NavBar from './NavBar';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import {fetchCurrentUser} from "../actions";
import OAuthSignup from './OAuthSignup';
import Accounts from './Accounts';
import OtherUser from './OtherUser';
import Post from './Post';
import EditProfile from './EditProfile';

class App extends Component {
    componentDidMount() {
        this.props.fetchCurrentUser();
    }

    render() {
        return (
            <div id="id1">
                <BrowserRouter>
                    <div id="id2">
                        <Route path="/" component={NavBar}/>
                        <Route exact path="/" component={MainPage}/>

                        <Route exact path="/signup" component={SignUpPage}/>

                        <Route exact path="/profile" component={ProfilePage}/>

                        <Route path="/auth/facebook/callback" component={OAuthSignup}/>
                        <Route path="/auth/google/callback" component={OAuthSignup}/>

                        <Route path="/accounts" component={Accounts}/>

                        <Route path="/user/:user" component={OtherUser}/>

                        <Route path="/post" component={Post}/>

                        <Route path="/EditProfile" component={EditProfile}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, {fetchCurrentUser})(App);