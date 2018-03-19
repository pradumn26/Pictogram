import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Popover from 'react-simple-popover';
import axios from 'axios';

import SearchBar from './SearchBar';

class NavBar extends Component {
    state = {
        isSettingsOpen: false,
        isNotificationsOpen: false,
        areNotificationsLoaded: false
    };

    render() {
        if (document.location.pathname == '/signup')
            return null;

        switch (this.props.currentUser) {
            case null:
                return null;
            case false:
                return null;
            default:
                return (
                    <nav className="navbar navbar-expand-sm navbar-dark fixed-top" id="navbar">
                        <div className="container">
                            <Link className="navbar-brand" to="/">Pictogram</Link>

                            <div className="navbar-collapse collapse" id="navbarSupportedContent">
                                <SearchBar/>
                                <ul className="navbar-nav">
                                    <li className="nav-item"
                                        style={{cursor: 'pointer'}}>
                                        <i className="fa fa-bell fa-2x"
                                           ref="notifications"
                                           onClick={this.onNotificationsClick.bind(this)}/>
                                        <Popover placement='bottom'
                                                 container={this}
                                                 target={this.refs.notifications}
                                                 show={this.state.isNotificationsOpen}
                                                 onHide={this.onNotificationsHide.bind(this)}
                                                 style={{
                                                     width: '380px',
                                                     maxHeight: '400px',
                                                     backgroundColor: '#fff',
                                                     overflowY: 'scroll',
                                                     padding: '0'
                                                 }}>
                                            {this.renderNotifications.bind(this)()}
                                        </Popover>
                                    </li>
                                    <li className="nav-item" style={{marginLeft: '10px'}}>
                                        <Link to="/profile">
                                            <i className="fa fa-user fa-2x"/>
                                        </Link>
                                    </li>
                                    <li className="nav-item"
                                        style={{marginLeft: '10px', cursor: 'pointer'}}>
                                        <i className="fa fa-cog fa-2x"
                                           ref="settings"
                                           onClick={this.onSettingsClick.bind(this)}/>
                                        <Popover placement='bottom'
                                                 container={this}
                                                 target={this.refs.settings}
                                                 show={this.state.isSettingsOpen}
                                                 onHide={this.onSettingsHide.bind(this)}>
                                            <a href="/auth/logout">Logout</a>
                                        </Popover>
                                    </li>
                                </ul>
                            </div>

                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
                );
        }
    }

    renderNotifications() {
        if (this.state.areNotificationsLoaded) {
            if (this.notifications.length > 0) {
                return (
                    <ul style={{
                        width: '100%',
                        padding: '0',
                        listStyle: 'none'
                    }}>
                        {this.notifications.map((notification) => {
                            let liColor;
                            if (!notification.isRead)
                                liColor = '#E3F2FD';
                            else
                                liColor = '#fff';
                            return (
                                <li style={{
                                    width: '100%',
                                    minHeight: '40px',
                                    paddingTop: '5px',
                                    paddingLeft: '5px',
                                    cursor: 'pointer',
                                    backgroundColor: liColor
                                }} onClick={() => {
                                    axios.get('/api/markNotiAsRead?id=' + notification._id.toString());
                                    window.location.assign(notification.url);
                                }}>
                                    <img src={notification.owner_profilePhoto ? notification.owner_profilePhoto : '/images/default-profile-picture.jpg'}
                                         style={{
                                             height: '30px',
                                             width: '30px',
                                             borderRadius: '50%',
                                             display: 'inline'
                                         }}/>
                                    &nbsp;&nbsp;
                                    <b>{notification.username}</b>
                                    &nbsp;&nbsp;
                                    <span style={{fontSize: '13px'}}>{notification.notification}</span>
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (<div>No notifications right now.</div>)
            }
        }
        else
            return (<div id="notificationsLoader"
                         ref={() => {
                             axios.get('/api/fetch_notifications')
                                 .then((res) => {
                                     this.notifications = res.data;
                                     this.setState({
                                         isSettingsOpen: false,
                                         isNotificationsOpen: true,
                                         areNotificationsLoaded: true
                                     });
                                 });
                         }}/>
            );
    }

    onSettingsClick() {
        this.setState({isSettingsOpen: !this.state.isSettingsOpen});
    }

    onSettingsHide() {
        this.setState({isSettingsOpen: false});
    }

    onNotificationsClick() {
        if (this.state.isNotificationsOpen)
            this.setState({isNotificationsOpen: false, areNotificationsLoaded: false});
        else
            this.setState({isNotificationsOpen: true});
    }

    onNotificationsHide() {
        this.setState({isNotificationsOpen: false, areNotificationsLoaded: false});

    }
}

function mapStateToProps({currentUser}) {
    return {currentUser};
}

export default connect(mapStateToProps)(NavBar);