import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPosts, fetchOtherUserPosts} from "../actions";

class MyGalleryScroller extends Component {
    constructor(props) {
        super(props);

        this.hasMore = true;
        this.nextPostNo = 0;
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        let $ = window.$;
        $(window).scroll(this.loadMore.bind(this));
        window.onresize = () => {
            if ($("img.scale")[0].height < $("img.scale")[0].parentNode.clientHeight) {
                console.log('in if');
                $(function () {
                    $("img.scale").imageScale();
                });
            }
        };

        if (this.props.username)
            this.props.fetchOtherUserPosts(this.props.username, this.nextPostNo);
        else
            this.props.fetchPosts(this.nextPostNo);
    }

    componentWillUpdate() {
        let $ = window.$;
        $(function () {
            $("img.scale").imageScale();
        });
    }

    componentDidUpdate() {
        let $ = window.$;
        $(function () {
            $("img.scale").imageScale();
        });
    }

    componentWillReceiveProps(nextProps) {
        document.getElementById('loader').style.display = 'none';
        let nextGalleryPosts;
        if (this.props.username)
            nextGalleryPosts = nextProps.otherUserGalleryPosts;
        else
            nextGalleryPosts = nextProps.galleryPosts;

        if (nextGalleryPosts.nextPosts) {
            let currentPosts = this.state.posts;
            const nextPosts = nextGalleryPosts.nextPosts;

            nextPosts.map(
                (post) => {
                    currentPosts.push(post);
                }
            );

            if (nextGalleryPosts.hasMore) {
                this.setState({posts: currentPosts});
                this.hasMore = true;
                this.nextPostNo = nextGalleryPosts.postNo;
            } else {
                this.setState({posts: currentPosts});
                this.hasMore = false;
                this.nextPostNo = -1;
            }
        }
    }

    render() {
        return (
            <div>
                {this.renderResponsiveTable()}
                <div style={{display: 'none'}} id="loader">
                    <h2>Loading</h2>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        let $ = window.$;
        $(window).unbind('scroll');
        window.onresize = null;
    }

    renderResponsiveTable() {
        return this.state.posts.map(
            (post) => {
                return (
                    <div style={{
                        float: 'left',
                        position: 'relative',
                        width: '30%',
                        paddingBottom: '30%',
                        margin: '2px',
                        overflow: 'hidden'
                    }} key={post._id}>
                        <div style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%'
                        }}>
                            <div style={{
                                display: 'table',
                                width: '100%',
                                height: '100%'
                            }}>
                                <div style={{
                                    display: 'table-cell',
                                    verticalAlign: 'middle',
                                    width: '100%',
                                    height: '100%'
                                }}>
                                    <img className="scale"
                                         data-scale="fill"
                                         data-align="center"
                                         style={{
                                             width: '100%',
                                             height: '100%'
                                         }} src={post.url}/>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        )
    }

    loadMore() {
        let $ = window.$;
        if ($(window).scrollTop() + $(window).height() == $(document).height() &&
            this.hasMore) {

            this.hasMore = false;
            document.getElementById('loader').style.display = 'block';
            if (this.props.username)
                this.props.fetchOtherUserPosts(this.props.username, this.nextPostNo);
            else
                this.props.fetchPosts(this.nextPostNo);
        }
    }
}

function mapStateToProps({galleryPosts, otherUserGalleryPosts}) {
    return {galleryPosts, otherUserGalleryPosts};
}

export default connect(mapStateToProps, {fetchPosts, fetchOtherUserPosts})(MyGalleryScroller);