import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';

import SignUpFormField from './SignUpFormField';
import SignUpNotAllowed from './SignUpNotAllowed';
import {postSignUpForm} from "../actions";

const FIELDS = [
    {name: 'firstName', elementType: 'input', inputType: 'text', placeHolder: 'First name'},
    {name: 'lastName', elementType: 'input', inputType: 'text', placeHolder: 'Last name'},
    {name: 'contact', elementType: 'input', inputType: 'tel', placeHolder: 'Contact'},
    {name: 'email', elementType: 'input', inputType: 'email', placeHolder: 'Email'},
    {name: 'username', elementType: 'input', inputType: 'text', placeHolder: 'Username'},
    {name: 'password', elementType: 'input', inputType: 'password', placeHolder: 'Password'},
    {name: 'confirmPassword', elementType: 'input', inputType: 'password', placeHolder: 'Confirm Password'}
];

const MOBILE_NO_REGEX = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;

class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.signUpReducer)
            this.setState({isSubmitting: false})
    }

    renderSubmitCheck() {
        if(this.props.signUpReducer) {
            const {isValid, email, username} = this.props.signUpReducer;
            if(!isValid) {
                return (
                    <div style={{color: '#ea3001'}}>
                        <div style={{textAlign: 'center'}}>{email}</div>
                        <div style={{textAlign: 'center'}}>{username}</div>
                    </div>
                );
            }
        }
    }

    renderSubmit() {
        if(!this.state.isSubmitting)
            return (<button type="submit" className="btn btn-primary">Submit</button>);
        else
            return (<div id="loader"></div>);
    }

    render() {
        switch (this.props.currentUser) {
            case null:
                return null;
            case false:
                return (
                    <div className="container-fluid" id="signUpPage">
                        <div className="row" id="mainRow">
                            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6 m-auto" id="signUpCard">
                                <form onSubmit={this.props.handleSubmit(
                                    (values) => {
                                        this.setState({isSubmitting: true});
                                        this.props.postSignUpForm(values);
                                    }
                                )} action="/signUp" method="POST" id="signUpForm">
                                    <h1 className="display-4">
                                        Sign Up
                                    </h1>

                                    <h4><strong>Personal Details</strong></h4>
                                    <div className="form-row">
                                        <Field component={SignUpFormField} name={FIELDS[0].name}
                                               elementType={FIELDS[0].elementType} inputType={FIELDS[0].inputType}
                                               placeHolder={FIELDS[0].placeHolder}/>
                                        <Field component={SignUpFormField} name={FIELDS[1].name}
                                               elementType={FIELDS[1].elementType} inputType={FIELDS[1].inputType}
                                               placeHolder={FIELDS[1].placeHolder}/>
                                    </div>
                                    <div className="form-row">
                                        <Field component={SignUpFormField} name="gender" elementType="select"/>
                                        <Field component={SignUpFormField} name={FIELDS[2].name}
                                               elementType={FIELDS[2].elementType} inputType={FIELDS[2].inputType}
                                               placeHolder={FIELDS[2].placeHolder}/>
                                    </div>

                                    <h4><strong>Account Details</strong></h4>
                                    <div className="form-row">
                                        <Field component={SignUpFormField} name={FIELDS[3].name}
                                               elementType={FIELDS[3].elementType} inputType={FIELDS[3].inputType}
                                               placeHolder={FIELDS[3].placeHolder}/>
                                        <Field component={SignUpFormField} name={FIELDS[4].name}
                                               elementType={FIELDS[4].elementType} inputType={FIELDS[4].inputType}
                                               placeHolder={FIELDS[4].placeHolder}/>
                                    </div>

                                    <h4><strong>Security</strong></h4>
                                    <div className="form-row">
                                        <Field component={SignUpFormField} name={FIELDS[5].name}
                                               elementType={FIELDS[5].elementType} inputType={FIELDS[5].inputType}
                                               placeHolder={FIELDS[5].placeHolder}/>
                                        <Field component={SignUpFormField} name={FIELDS[6].name}
                                               elementType={FIELDS[6].elementType} inputType={FIELDS[6].inputType}
                                               placeHolder={FIELDS[6].placeHolder}/>
                                    </div>

                                    {this.renderSubmit()}

                                    {this.renderSubmitCheck()}
                                </form>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <SignUpNotAllowed/>;
        }
    }
}

function validate(values) {
    let errors = {};

    FIELDS.map(
        ({name}) => {
            if (!values[name])
                errors[name] = "Please enter a value"
        }
    );

    if (values.contact != null) {
        if (values.contact.length != 10 || !MOBILE_NO_REGEX.test(values.contact))
            errors.contact = 'the mobile number specified is not valid';
    }

    if (values.password != null && values.password.length < 8)
        errors.password = 'the length of the password should be more than 7';

    if (values.password != null && values.confirmPassword != null && values.password != values.confirmPassword)
        errors.confirmPassword = 'It is not equal to the specified password';

    return errors;
}

function mapStateToprops({signUpReducer, currentUser}) {
    return {signUpReducer, currentUser};
}

export default reduxForm({
    form: 'signUpForm',
    validate
})(connect(mapStateToprops, {postSignUpForm})(SignUpPage));