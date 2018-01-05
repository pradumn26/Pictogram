import React, {Component} from 'react';

import Feed from './Feed';
import OnlineUsers from './OnlineUsers';

class HomePage extends Component {
    render() {
        return (
            <div id="homepage" className="container">
                <div className="row">
                    <Feed/>
                    <OnlineUsers/>
                </div>
            </div>
        );
    }
}

export default HomePage;