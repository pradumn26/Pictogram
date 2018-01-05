import React, {Component} from 'react';
import {connect} from 'react-redux';

class OnlineUsers extends Component {
    render() {
        return (
            <div id="onlineUsersCard" className="col-md-4 d-md-block d-none">
                <img src={this.props.currentUser.profilePhoto || '/images/default-profile-picture.jpg'}>
                </img>
                <div id="displayName">
                    <h2>{this.props.currentUser.firstName + " " + this.props.currentUser.lastName}</h2>
                </div>
            </div>
        );
    }
}

function mapStateToProps({currentUser}) {
    return {currentUser}
}

export default connect(mapStateToProps)(OnlineUsers);