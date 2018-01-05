import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class NavBar extends Component {
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
                            <Link to="/" className="navbar-brand">Pictogram</Link>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a href="" className="nav-link">Notifications</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/auth/logout" className="nav-link">Logout</a>
                                    </li>
                                </ul>
                            </div>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
                );
        }
    }
}

function mapStateToProps({currentUser}) {
    return {currentUser};
}

export default connect(mapStateToProps)(NavBar);