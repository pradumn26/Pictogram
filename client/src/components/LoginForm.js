import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

import LoginFormField from './LoginFormField';

class LoginForm extends Component {
    render() {
        return (
            <form id="loginForm"
                  style={{marginTop: '20px', padding: '0'}}
                  action="/login"
                  method="post"
                  onSubmit={
                      this.props.handleSubmit(
                          () => {
                              document.getElementById('loginForm').submit()
                          }
                      )
                  }
                  className="row col-11 m-auto">
                <Field component={LoginFormField} name="username" label="Username"/>
                <Field component={LoginFormField} name="password" label="Password"/>
                <button type="submit"
                        className="btn btn-primary"
                        style={{display: 'block', margin: 'auto', marginTop: '40px', cursor: 'pointer'}}>
                    Submit
                </button>
            </form>
        );
    }
}

let validate = (values) => {
    let errors = {};

    if (!values.username)
        errors.username = 'Please enter a username';
    if (!values.password)
        errors.password = 'Please enter the password';

    return errors;
};

export default reduxForm({
    validate,
    form: 'loginForm'
})(LoginForm);