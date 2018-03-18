import React, {Component} from 'react';
import axios from 'axios';

import FeedPost from './FeedPost';
import ContentNotFound from './ContentNotFound';

class Feed extends Component {
    hasMore = true;
    state = {};

    render() {
        if (this.state.noFeed)
            return (
                <div style={{marginTop: '40px'}}>
                    <ContentNotFound/>
                </div>
            );

        if (this.state.posts) {
            return (
                <ul style={{marginTop: '70px', listStyle: 'none'}}>
                    {this.state.posts.map((post) => {
                        return (<FeedPost postId={post._id.toString()}/>);
                    })}
                </ul>
            );
        }

        else
            return null;
    }

    componentDidMount() {
        axios.get('/api/fetch_feed?currentPosition=-1')
            .then((res) => {
                if (!res.data.noFeed) {
                    let $ = window.$;
                    $(window).scroll(this.loadMore.bind(this));
                    this.hasMore = res.data.hasMore;
                }
                this.setState(res.data);
            });
    }

    loadMore() {
        let $ = window.$;
        if ($(window).scrollTop() + $(window).height() == $(document).height() &&
            this.hasMore) {

            this.hasMore = false;
            axios.get('/api/fetch_feed?currentPositon=' + this.state.currentPosition.toString())
                .then((res) => {
                    this.hasMore = res.data.hasMore;
                    this.setState(res.data);
                });
        }
    }
}

export default Feed;