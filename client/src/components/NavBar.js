import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Popover from 'react-simple-popover';

import SearchBar from './SearchBar';

class NavBar extends Component {
    state= {
        isSettingsOpen: false
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
                                        <i className="fa fa-bell fa-2x"/>
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

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
                );
        }
    }

    onSettingsClick() {
        this.setState({isSettingsOpen: !this.state.isSettingsOpen});
    }

    onSettingsHide() {
        this.setState({isSettingsOpen: false});
    }
}

function mapStateToProps({currentUser}) {
    return {currentUser};
}

export default connect(mapStateToProps)(NavBar);