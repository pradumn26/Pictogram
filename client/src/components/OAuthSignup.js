import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class OAuthSignup extends Component {
    render() {
        return (
            <Redirect to='/accounts'/>
        );
    }
}

export default OAuthSignup;