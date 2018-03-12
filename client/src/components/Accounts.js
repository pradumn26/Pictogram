import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';

class Accounts extends Component {
    constructor(props) {
        super(props);

        this.debouncedInputChange = _.debounce(this.inputChange, 1000);
    }

    render() {
        return (
            <div className="container">
                <div className="row align-items-center" style={{minHeight: '100vh'}}>
                    <div id="oauthSignUpFormCard">
                        <div id="oauthSignUpFormCardDiv">
                            <img src="/images/Pictogram_logo.JPG"
                                 style={{
                                     display: 'block',
                                     width: '90%',
                                     marginRight: 'auto',
                                     marginLeft: 'auto',
                                     marginTop: '40px'
                                 }}/>
                            <div style={{
                                width: '90%',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: '60px'
                            }}>Enter username
                            </div>
                            <input id="accountsInput"
                                   className="form-control"
                                   type="text"
                                   placeholder="Username"
                                   style={{
                                       width: '90%',
                                       marginRight: 'auto',
                                       marginLeft: 'auto'
                                   }}
                                   onChange={(value) => {
                                       this.debouncedInputChange.bind(this)(value.target.value);
                                   }}/>
                            <div id="accountsLoader"/>
                            <small id="accountsWarning" className="form-text text-muted"/>
                            <button id="accountsSubmitButton"
                                    className="btn btn-primary"
                                    style={{
                                        display: 'block',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        marginTop: '10px'
                                    }}
                                    onClick={() => {
                                        window.profile.username = document.getElementById('accountsInput').value;
                                        axios.post('/oauthSignUp', window.profile)
                                            .then(() => {
                                                window.location = '/';
                                            })
                                    }}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.getElementById('accountsSubmitButton').disabled = true;
    }

    inputChange(value) {
        let loader = document.getElementById('accountsLoader');
        let btnSubmit = document.getElementById('accountsSubmitButton');
        let warning = document.getElementById('accountsWarning');
        console.log(value);
        if (!value) {
            warning.innerText = 'Enter a username';
            btnSubmit.disabled = true;
            return;
        }
        if(value.length < 4) {
            warning.innerText = 'Username must more than 3 words';
            btnSubmit.disabled = true;
            return;
        }
        loader.style.display = 'inline-block';

        this.checkUsername(value,
            ({available}) => {
                loader.style.display = 'none';
                if (available) {
                    warning.innerHTML = 'Chosen username is available';
                    btnSubmit.disabled = false;
                } else {
                    warning.innerHTML = 'Chosen username is not available';
                    btnSubmit.disabled = true;
                }
            });
    }

    checkUsername(username, cb) {
        axios.get('/api/check_username?username=' + username)
            .then((res) => {
                cb(res.data);
            });
    }
}

export default Accounts;