import React, {Component} from 'react';
import axios from "axios/index";
import {connect} from 'react-redux';

class Post extends Component {
    state = {};

    render() {
        if (!this.state.post)
            return null;
        else
            return (
                <div className="card"
                     style={{
                         marginTop: '100px',
                         marginBottom: '100px',
                         marginLeft: 'auto',
                         marginRight: 'auto',
                         display: 'block',
                         width: '805px',
                         height: '587px'
                     }}>

                    <div style={{
                        width: '500px',
                        height: '585px',
                        display: 'inline-block',
                        backgroundColor: '#fdfffe',
                        position: 'absolute'
                    }}>
                        <img src={this.state.post.url}
                             style={{
                                 width: '100%',
                                 position: 'relative',
                                 top: '50%',
                                 transform: 'translateY(-50%)'
                             }}/>
                    </div>

                    <div className="card"
                         style={{
                             width: '303px',
                             display: 'inline-block',
                             height: '585px',
                             position: 'absolute',
                             right: '0'
                         }}>

                        <div style={{
                            height: '565px',
                            width: '300px',
                            display: 'inline-block',
                            backgroundColor: '#fff'
                        }}>
                            <div style={{
                                backgroundColor: '#fff',
                                width: '100%',
                                height: '60px',
                                padding: '5px'
                            }}>
                                <img
                                    src={this.state.post.owner_profilePhoto ? this.state.post.owner_profilePhoto : '/images/default-profile-picture.jpg'}
                                    style={{
                                        height: '50px',
                                        width: '50px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        position: 'relative',
                                        bottom: '5px'
                                    }}/>
                                <div style={{
                                    display: 'inline-block',
                                    fontSize: '13px',
                                    marginLeft: '10px'
                                }}>
                                    <a href={"/user/" + this.state.post.username}
                                       style={{
                                           color: 'black',
                                           display: 'inline'
                                       }}>
                                        <b style={{
                                            fontSize: '13px'
                                        }}>
                                            {this.state.post.username}
                                        </b>
                                    </a>
                                    <br/>
                                    {this.state.post.owner_fullname}
                                </div>
                            </div>

                            <hr align="center" size="1px" width="80%" style={{marginTop: '0', marginBottom: '0'}}/>

                            <div style={{
                                width: '100%',
                                height: '380px',
                                overflowY: 'scroll',
                                backgroundColor: '#fff'
                            }}>
                                <ul style={{
                                    width: '100%',
                                    listStyle: 'none'
                                }}>
                                    {this.state.post.comments.map((comment) => {
                                        return (
                                            <li style={{maxWidth: '100%'}}>
                                                <a href={"/user/" + comment.username}
                                                   style={{
                                                       color: 'black'
                                                   }}><b>{comment.username}</b></a>
                                                &nbsp;&nbsp;
                                                {comment.content}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <hr align="center" size="1px" width="80%" style={{marginTop: '5px', marginBottom: '0'}}/>

                            <div style={{
                                width: '100%',
                                height: '40px',
                                backgroundColor: '#fff',
                                paddingTop: '5px',
                                paddingLeft: '5px'
                            }}>
                                {this.renderLikeButton()}
                                &nbsp;
                                &nbsp;
                                <i className="fa fa-comment-o fa-2x"
                                   style={{
                                       display: 'inline',
                                       cursor: 'pointer'
                                   }}
                                   onClick={() => {
                                       this.textArea.focus();
                                   }}/>
                            </div>

                            <div style={{
                                width: '100%',
                                height: '20px',
                                backgroundColor: '#fff',
                                paddingLeft: '8px'
                            }}>
                                <b>{this.state.post.likesCount}&nbsp;likes</b>
                                &nbsp;&nbsp;&nbsp;
                                <b>{this.state.post.comments.length}&nbsp;comments</b>
                            </div>

                            <hr align="center" size="1px" width="80%" style={{marginTop: '5px', marginBottom: '0'}}/>

                            <div style={{
                                width: '100%',
                                backgroundColor: '#fff',
                                marginTop: '10px'
                            }}>
                            <textarea className="form-control"
                                      style={{
                                          width: '260px',
                                          display: 'inline-block',
                                          border: 'none',
                                          height: '50px'
                                      }}
                                      placeholder="Add a comment..."
                                      ref={(textArea) => {
                                          this.textArea = textArea;
                                      }}/>
                                <i className="fa fa-chevron-circle-right fa-lg"
                                   style={{
                                       color: 'grey',
                                       width: '20px',
                                       height: '20px',
                                       display: 'inline-block',
                                       marginLeft: '7px',
                                       marginTop: '5px',
                                       cursor: 'pointer',
                                       position: 'absolute'
                                   }}
                                   onClick={() => {
                                       if (this.textArea.value.trim()) {
                                           let comment = {};
                                           comment.content = this.textArea.value.trim();
                                           comment.username = this.props.currentUser.username;
                                           axios.post('/api/add_comment?postId=' + this.postId, comment)
                                               .then((res) => {
                                                   this.textArea.value = "";
                                                   res.data.isLiked = this.state.post.isLiked;
                                                   this.setState({post: res.data});
                                               });
                                       }
                                   }}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

    componentDidMount() {
        let i;
        for (i = 0; i < this.props.location.search.length; i++) {
            if (this.props.location.search.charAt(i) === '=') {
                this.postId = this.props.location.search.slice(i + 1, this.props.location.search.length);
            }
        }
        axios.get('/api/fetch_feedPost?postId=' + this.postId)
            .then((res) => {
                this.setState({post: res.data});
            });
    }

    renderLikeButton() {
        if (this.state.post.isLiked)
            return (
                <i className="fa fa-heart fa-2x"
                   style={{
                       color: 'red',
                       display: 'inline',
                       cursor: 'pointer'
                   }}
                   onClick={() => {
                       let newState = this.state;
                       newState.post.isLiked = false;
                       this.setState(newState);
                       axios.get('/api/unlike_post?postId=' + this.postId)
                           .then((res) => {
                               this.setState({post: res.data});
                           });
                   }}/>
            );
        else
            return (
                <i className="fa fa-heart-o fa-2x"
                   style={{
                       color: 'black',
                       display: 'inline',
                       cursor: 'pointer'
                   }}
                   onClick={() => {
                       let newState = this.state;
                       newState.post.isLiked = true;
                       this.setState(newState);
                       axios.get('/api/like_post?postId=' + this.postId)
                           .then((res) => {
                               this.setState({post: res.data});
                           });
                   }}/>
            );
    }
}

function mapStateToProps({currentUser}) {
    return {currentUser};
}

export default connect(mapStateToProps)(Post);