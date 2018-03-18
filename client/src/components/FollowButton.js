import React, {Component} from 'react';

class FollowButton extends Component {
    state = {
        isLoading: false
    };

    render() {
        console.log(this.props.isFollowing);
        if (this.props.isFollowing)
            return (
                <a className="btn"
                   id="followingButton"
                   href={"/api/unfollowUser?username="+this.props.username}>
                    Following
                </a>
            );
        else
            return (
                <a className="btn"
                   id="followButton"
                   href={"/api/followUser?username="+this.props.username}>
                    Follow
                </a>
            );
    }
}

export default FollowButton;