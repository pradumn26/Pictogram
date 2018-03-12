import React, {Component} from 'react';
import {connect} from 'react-redux';

import NotLoggedIn from './NotLoggedIn';
import {fetchOtherUser} from "../actions";
import MyGalleryScroller from './MyGalleryScroller';

class OtherUser extends Component {
    render() {
        console.log(this.props.currentUser);
        switch (this.props.currentUser) {
            case null:
                return null;
            case false:
                return (<NotLoggedIn/>);
            default: {
                if (!this.props.otherUserReducer)
                    return null;
                if (!this.props.otherUserReducer.user)
                    return null;
                else
                    return (
                        <div className="container" id="profilePage">
                            <div className="row" id="ppRow1">
                                <div className="col-sm-4 col-10 ml-auto mr-auto" id="profileCard">
                                    <img
                                        src={this.props.otherUserReducer.profile.profilePhoto || '/images/default-profile-picture.jpg'}>
                                    </img>

                                    <div>
                                        <h2>{this.props.otherUserReducer.profile.firstName + ' ' + this.props.otherUserReducer.profile.lastName}</h2>
                                    </div>

                                    <div>
                                        <strong>Posts: {this.props.otherUserReducer.profile.postsNumber}</strong>
                                    </div>
                                    <div>
                                        <strong>Followers: {this.props.otherUserReducer.profile.followersNumber}</strong>
                                    </div>
                                    <div>
                                        <strong>Following: {this.props.otherUserReducer.profile.followingNumber}</strong>
                                    </div>

                                    {this.renderFollowButton.bind(this)()}
                                </div>

                                <div className="col-sm-8 col-10 ml-auto mr-auto" id="gallery">
                                    <MyGalleryScroller username={this.props.match.params.user}/>
                                </div>
                            </div>
                        </div>
                    );
            }
        }
    }

    componentDidMount() {
        this.props.fetchOtherUser(this.props.match.params.user);
    }

    renderFollowButton() {
        if (this.props.match.params.user === this.props.currentUser.username)
            return null;
        else
            return (
                <button className="btn" id="followButton">Follow</button>
            );
    }
}

function mapStateToProps({currentUser, otherUserReducer}) {
    return {currentUser, otherUserReducer}
}

export default connect(mapStateToProps, {fetchOtherUser})(OtherUser);