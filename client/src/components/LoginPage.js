import React, {Component} from 'react';

import LoginForm from './LoginForm';
import LoginPageSignUp from './LoginPageSignUp';

class LoginPage extends Component {
    render() {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: '#fafafa'
            }} className="container-fluid">
                <div className="row" style={{height: '100%'}}>
                    <div
                        style={{
                            border: '1px solid',
                            borderColor: '#e6e6e6',
                            height: '540px',
                            width: '400px',
                            backgroundColor: '#fff',
                            paddingLeft: '20px',
                            paddingRight: '20px'
                        }}
                        className="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-xs-8 m-auto align-self-center row">

                        <img src="/images/Pictogram_logo.JPG"
                             style={{
                                 width: '300px',
                                 height: '100px',
                                 display: 'block',
                                 marginLeft: 'auto',
                                 marginRight: 'auto',
                                 marginTop: '10px'
                             }}
                             className="col-10 m-auto"
                        />

                        <LoginForm/>

                        <LoginPageSignUp/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;