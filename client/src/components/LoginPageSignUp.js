import React from 'react';
import {Link} from 'react-router-dom';

const LoginPageSignUp = () => {
    return (
        <div style={{marginTop: '40px'}} className="row col-11 m-auto">
            <a className="btn btn-block col-12"
               href="/auth/facebook"
               style={{
                   width: '300px',
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   backgroundColor: '#2d4373',
                   color: '#fff'
               }}>
                <span className="fa fa-facebook" style={{marginRight: '10px'}}/>Sign in with facebook
            </a>
            <a className="btn btn-block col-12" href="/auth/google"
               style={{
                   width: '300px',
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   backgroundColor: '#c23321',
                   color: '#fff'
               }}>
                <span className="fa fa-google" style={{marginRight: '10px'}}/>Sign in with google
            </a>
            <Link className="btn btn-block col-12" to="/signup"
               style={{
                   width: '300px',
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   backgroundColor: '#2b2b2b',
                   color: '#fff'
               }}>
                Sign up with Pictogram
            </Link>
        </div>
    );
};

export default LoginPageSignUp;