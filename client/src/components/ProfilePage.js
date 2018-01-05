import React, {Component} from 'react';
import {connect} from 'react-redux';

import NotLoggedIn from './NotLoggedIn';

class ProfilePage extends Component {
    render() {
        switch (this.props.currentUser) {
            case null:
                return null;
            case false:
                return (<NotLoggedIn/>);
            default:
                return (
                    <div className="container" id="profilePage">
                        <div className="row" id="ppRow1">
                            <div className="col-sm-4 col-10 ml-auto mr-auto" id="profileCard">
                                <img src={this.props.currentUser.profilePhoto || '/images/default-profile-picture.jpg'}>
                                </img>

                                <div>
                                    <h2>{this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName}</h2>
                                </div>

                                <div>
                                    <strong>Posts: {}</strong>
                                </div>
                                <div>
                                    <strong>Followers: {}</strong>
                                </div>
                                <div>
                                    <strong>Following: {}</strong>
                                </div>

                                <button id="editProfileButton" className="btn">Edit profile</button>

                                <form action="/upload" method="POST" encType="multipart/form-data" id="uploadForm">
                                    <div className="btn" id="uploadButton">
                                        <span style={{position: 'relative', left: '10px'}}>Upload</span>
                                        <input
                                            name="myImage"
                                            type="file"
                                            style={{opacity: 0, position: 'relative', right: '30px'}}
                                            accept="image/*"
                                            onChange={() => {document.getElementById('uploadForm').submit()}}/>
                                    </div>
                                </form>
                            </div>

                            <div className="col-sm-8 col-10 ml-auto mr-auto" id="gallery">
                            </div>
                        </div>
                    </div>
                );
        }
    }
}

function mapStateToProps({currentUser}) {
    return {currentUser}
}

export default connect(mapStateToProps)(ProfilePage);