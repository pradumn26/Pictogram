import React, {Component} from 'react';
import {connect} from 'react-redux';

import HomePage from './HomePage';
import LoginPage from './LoginPage';

class MainPage extends Component {
    render() {
        switch (this.props.currentUser) {
            case null:
                return null;
            case false:
                return <LoginPage/>
            default:
                return <HomePage/>
        }
    }
}

function mapStateToProps({currentUser}) {
    return {currentUser};
}

export default connect(mapStateToProps)(MainPage);