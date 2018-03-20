import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import NotLoggedIn from './NotLoggedIn';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {user: null};
        this.debouncedUsernameInputChange = _.debounce(this.usernameInputChange, 1000);
    }

    render() {
        switch (this.state.user) {
            case null:
                return null;
            case false:
                return (<NotLoggedIn/>);
            default:
                return (
                    <div className="card"
                         style={{
                             width: '400px',
                             marginBottom: '100px',
                             marginTop: '100px',
                             marginRight: 'auto',
                             marginLeft: 'auto',
                             backgroundColor: '#fff',
                             paddingTop: '10px'
                         }}>

                        <div style={{
                            height: '60px',
                            paddingTop: '5px',
                            paddingLeft: '10px',
                            display: 'inline-block',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            <img style={{
                                height: '50px',
                                width: '50px',
                                borderRadius: '50%'
                            }}
                                 src={this.state.user.profile.profilePhoto ? this.state.user.profile.profilePhoto : '/images/default-profile-picture.jpg'}/>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn"
                                    style={{
                                        backgroundColor: '#3392a7',
                                        color: '#fff',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        document.getElementById('editProfileImageUpload').click()
                                    }}>
                                Upload
                            </button>
                            <form action="/upload_profilePicture"
                                  method="POST"
                                  encType="multipart/form-data"
                                  id="editProfileUploadForm"
                                  style={{
                                      display: 'none'
                                  }}>
                                <input id="editProfileImageUpload"
                                       name="editProfileImageUpload"
                                       type="file"
                                       accept="image/*"
                                       style={{
                                           display: 'none'
                                       }}
                                       onChange={() => {
                                           document.getElementById('editProfileUploadForm').submit()
                                       }}/>
                            </form>
                        </div>

                        <form style={{width: '100%'}}
                              action="/api/update_profile"
                              method="POST"
                              id="editProfileProfileForm">
                            <div className="form-group"
                                 style={{
                                     display: 'inline-block',
                                     width: '90%',
                                     position: 'relative',
                                     left: '50%',
                                     transform: 'translateX(-50%)',
                                     marginTop: '40px'
                                 }}>
                                <label style={{
                                    marginBottom: '2px',
                                    fontSize: '13px'
                                }}>
                                    First name
                                </label>
                                <input id="editProfileFirstnameInput"
                                       name="firstnameInput"
                                       type="text"
                                       className="form-control"
                                       ref={() => {
                                           document.getElementById('editProfileFirstnameInput').value = this.state.user.profile.firstName ? this.state.user.profile.firstName : ""
                                       }}
                                       onChange={(event) => {
                                           if (event.target.value !== this.state.user.profile.firstName && event.target.value) {
                                               document.getElementById('editProfileSubmitButton').disabled = false;
                                               document.getElementById('editProfileFirstnameWarning').innerText = "";
                                           } else {
                                               document.getElementById('editProfileSubmitButton').disabled = true;
                                               if(!event.target.value) {
                                                   document.getElementById('editProfileFirstnameWarning').innerText = 'This must not be empty.'
                                               } else {
                                                   document.getElementById('editProfileFirstnameWarning').innerText = ""
                                               }
                                           }
                                       }}/>
                                <small className="form-text text-muted"
                                       style={{margin: '0'}}
                                       id="editProfileFirstnameWarning">
                                </small>
                            </div>

                            <div className="form-group"
                                 style={{
                                     display: 'inline-block',
                                     width: '90%',
                                     position: 'relative',
                                     left: '50%',
                                     transform: 'translateX(-50%)'
                                 }}>
                                <label style={{
                                    marginBottom: '2px',
                                    fontSize: '13px'
                                }}>
                                    Last name
                                </label>
                                <input id="editProfileLastnameInput"
                                       name="lastnameInput"
                                       type="text"
                                       className="form-control"
                                       ref={() => {
                                           document.getElementById('editProfileLastnameInput').value = this.state.user.profile.lastName ? this.state.user.profile.lastName : ""
                                       }}
                                       onChange={(event) => {
                                           if (event.target.value !== this.state.user.profile.lastName && event.target.value) {
                                               document.getElementById('editProfileSubmitButton').disabled = false;
                                               document.getElementById('editProfileLastnameWarning').innerText = "";
                                           } else {
                                               document.getElementById('editProfileSubmitButton').disabled = true;
                                               if(!event.target.value) {
                                                   document.getElementById('editProfileLastnameWarning').innerText = "this field must not be empty.";
                                               } else {
                                                   document.getElementById('editProfileLastnameWarning').innerText = "";
                                               }
                                           }
                                       }}/>
                                <small className="form-text text-muted"
                                       style={{margin: '0'}}
                                       id="editProfileLastnameWarning">
                                </small>
                            </div>

                            <div className="form-group"
                                 style={{
                                     display: 'inline-block',
                                     width: '90%',
                                     position: 'relative',
                                     left: '50%',
                                     transform: 'translateX(-50%)'
                                 }}>
                                <label style={{
                                    marginBottom: '2px',
                                    fontSize: '13px'
                                }}>
                                    Username
                                </label>
                                <input id="editProfileUsernameInput"
                                       name="usernameInput"
                                       type="text"
                                       className="form-control"
                                       ref={() => {
                                           document.getElementById('editProfileUsernameInput').value = this.state.user.profile.username ? this.state.user.profile.username : ""
                                       }}
                                       onChange={(event) => {
                                           this.debouncedUsernameInputChange.bind(this)(event.target.value);
                                       }}
                                       style={{
                                           paddingRight: '30px'
                                       }}/>
                                <div id="editProfileLoader" style={{display: 'none'}}/>
                                <small className="form-text text-muted"
                                       style={{margin: '0'}}
                                       id="editProfileUsernameWarning">
                                </small>
                            </div>

                            <div className="form-group"
                                 style={{
                                     display: 'inline-block',
                                     width: '90%',
                                     position: 'relative',
                                     left: '50%',
                                     transform: 'translateX(-50%)'
                                 }}>
                                <label style={{
                                    marginBottom: '2px',
                                    fontSize: '13px'
                                }}>
                                    Email
                                </label>
                                <input id="editProfileEmailInput"
                                       name="emailInput"
                                       type="email"
                                       className="form-control"
                                       ref={() => {
                                           document.getElementById('editProfileEmailInput').value = this.state.user.accountDetails.email ? this.state.user.accountDetails.email : ""
                                       }}
                                       onChange={(event) => {
                                           if (event.target.value !== this.state.user.accountDetails.email && event.target.value) {
                                               document.getElementById('editProfileSubmitButton').disabled = false;
                                               document.getElementById('editProfileEmailWarning').innerText = "";
                                           } else {
                                               document.getElementById('editProfileSubmitButton').disabled = true;
                                               if(!event.target.value) {
                                                   document.getElementById('editProfileEmailWarning').innerText = "This field must not be empty.";
                                               } else {
                                                   document.getElementById('editProfileEmailWarning').innerText = "";
                                               }
                                           }
                                       }}/>
                                <small className="form-text text-muted"
                                       style={{margin: '0'}}
                                       id="editProfileEmailWarning">
                                </small>
                            </div>

                            <div className="form-group"
                                 style={{
                                     display: 'inline-block',
                                     width: '90%',
                                     position: 'relative',
                                     left: '50%',
                                     transform: 'translateX(-50%)'
                                 }}>
                                <label style={{
                                    marginBottom: '2px',
                                    fontSize: '13px'
                                }}>
                                    Contact
                                </label>
                                <input id="editProfileContactInput"
                                       name="contactInput"
                                       type="tel"
                                       className="form-control"
                                       ref={() => {
                                           document.getElementById('editProfileContactInput').value = this.state.user.accountDetails.contact ? this.state.user.accountDetails.contact : ""
                                       }}
                                       onChange={(event) => {
                                           if (event.target.value !== this.state.user.accountDetails.contact) {
                                               document.getElementById('editProfileSubmitButton').disabled = false;
                                           } else {
                                               document.getElementById('editProfileSubmitButton').disabled = true;
                                           }
                                       }}/>
                                <small className="form-text text-muted" style={{margin: '0'}}>
                                </small>
                            </div>

                            <button id="editProfileSubmitButton"
                                    className="btn"
                                    type="Submit"
                                    style={{
                                        marginBottom: '20px',
                                        position: 'relative',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: '#3392a7',
                                        color: '#fff',
                                        cursor: 'pointer'
                                    }}
                                    ref={(button) => {
                                        document.getElementById('editProfileSubmitButton').disabled = true;
                                    }}
                                    onClick={() => {
                                        document.getElementById('editProfileProfileForm').submit()
                                    }}>
                                Submit
                            </button>
                        </form>
                    </div>
                );
        }
    }

    componentDidMount() {
        axios.get('/api/fetch_accountDetails')
            .then(({data}) => {
                if (data)
                    this.setState({user: data});
                else
                    this.setState({user: false})
            });
    }

    usernameInputChange(value) {
        document.getElementById('editProfileSubmitButton').disabled = true;
        if(value === this.state.user.profile.username || !value) {
            if(!value) {
                document.getElementById('editProfileUsernameWarning').innerText = "You must provide a username";
            } else {
                document.getElementById('editProfileUsernameWarning').innerText = "";
            }
        }
        else {
            document.getElementById('editProfileLoader').style.display = 'block';
            axios.get('/api/check_username?username='+value)
                .then((res) => {
                    document.getElementById('editProfileLoader').style.display = 'none';
                    if(res.data.available) {
                        document.getElementById('editProfileSubmitButton').disabled = false;
                        document.getElementById('editProfileUsernameWarning').innerText = "This username is available";
                    } else {
                        document.getElementById('editProfileUsernameWarning').innerText = "This username is not available";
                    }
                });
        }
    }
}

export default EditProfile;