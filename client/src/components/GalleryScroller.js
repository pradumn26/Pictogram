import React, {Component} from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import {connect} from 'react-redux';

import {fetchPosts} from "../actions";

class GalleryScroller extends Component {
    constructor(props) {
        super(props);

        this.posts = [];
        this.lastPostDate = (new Date()).toJSON();
        this.hasMore = true;
    }

    loadPosts() {
        this.props.fetchPosts(this.lastPostDate);
    }

    render() {
        if (this.props.galleryPosts) {
            this.props.galleryPosts.map(
                (post) => {
                    this.posts.push(post);
                }
            );
            this.lastPostDate = this.posts[this.posts.length - 1].dateCreated;
        }
        if (this.props.galleryPosts === false)
            this.hasMore = false;
        else
            this.hasMore = true;

        const loader = (<div><h2>Loading...</h2></div>);
        let items = [];
        this.posts.map(
            (post) => {
                items.push((
                    <div className="track" key={items.length}>
                        <img style={{
                            height: '400px',
                            width: '300px',
                            marginTop: '20px',
                            marginBottom: '20px'
                        }} src={post.url}/>
                    </div>
                ));
            }
        );

        return (
            <InfiniteScroller
                pageStart={0}
                loadMore={this.loadPosts.bind(this)}
                hasMore={this.hasMore}
                loader={loader}
                useWindow={true}>
                <div className="tracks">
                    {items}
                </div>
            </InfiniteScroller>
        );
    }
}

function mapStateToProps({galleryPosts}) {
    return {galleryPosts};
}

export default connect(mapStateToProps, {fetchPosts})(GalleryScroller);