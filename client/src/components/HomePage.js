import React, {Component} from 'react';

import Feed from './Feed';

class HomePage extends Component {
    render() {
        return (
            <div id="homepage" className="container">
                <div className="row justify-content-center">
                    <Feed/>
                </div>
            </div>
        );
    }
}

export default HomePage;