import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from 'axios';

class FeedPost extends Component {
    state = {};

    render() {
        if (!this.state.post)
            return null;
        else
            return (
                <li style={{marginBottom: '30px'}}>
                    <div className="card"
                         style={{
                             width: '600px'
                         }}>
                        <div style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            height: '50px',
                            padding: '5px'
                        }}>
                            <img
                                src={this.state.post.owner_profilePhoto ? this.state.post.owner_profilePhoto : '/images/default-profile-picture.jpg'}
                                style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    position: 'relative',
                                    bottom: '10px'
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

                        <img className="img-fluid"
                             style={{
                                 width: '100%',
                                 height: 'auto'
                             }}
                             src={this.state.post.url}/>

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

                        <div style={{
                            width: '100%',
                            maxHeight: '400px',
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
                                            <a href={"/user/"+comment.username}
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

                        <div style={{
                            width: '100%',
                            backgroundColor: '#fff',
                            marginTop: '10px'
                        }}>
                            <textarea className="form-control"
                                      style={{
                                          width: '560px',
                                          display: 'inline-block',
                                          border: 'none',
                                          height: '40px'
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
                                       axios.post('/api/add_comment?postId=' + this.props.postId, comment)
                                           .then((res) => {
                                               this.textArea.value = "";
                                               res.data.isLiked = this.state.post.isLiked;
                                               this.setState({post: res.data});
                                           });
                                   }
                               }}/>
                        </div>
                    </div>
                </li>
            );
    }

    componentDidMount() {
        axios.get('/api/fetch_feedPost?postId=' + this.props.postId)
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
                       axios.get('/api/unlike_post?postId=' + this.props.postId)
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
                       axios.get('/api/like_post?postId=' + this.props.postId)
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

export default connect(mapStateToProps)(FeedPost);