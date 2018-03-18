import React, {Component} from 'react';
import Popover from 'react-simple-popover';
import axios from 'axios';
import _ from 'lodash';

import LoadingDots from './LoadingDots';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.debouncedSearchChange = _.debounce(this.onSearchChange, 1000);
    }

    state = {
        isSearchOpen: false,
        searchResults: []
    };

    render() {
        return (
            <form className="form-inline"
                  id="search-bar"
                  style={{
                      display: 'inline-block', marginLeft: 'auto', marginRight: 'auto'
                  }}>
                <div style={{display: 'inline-block'}}>
                    <input className="form-control"
                           type="search"
                           ref="change"
                           placeholder="Search"
                           onChange={(event) => {
                               this.debouncedSearchChange.bind(this)(event.target.value);
                           }}>
                    </input>
                    {this.showPopUp()}
                </div>
                <LoadingDots/>
            </form>
        );
    }

    setOutsideClick() {
        let $ = window.$;

        $(document).on('click', 'body *', () => {
            this.setState({isSearchOpen: false});
            $(document).off('click');
        });
    }

    showPopUp() {
        if (this.state.isSearchOpen)
            return (
                <div className=""
                     style={{
                         maxHeight: '300px',
                         width: '200px',
                         backgroundColor: '#fff',
                         position: 'absolute',
                         top: '45px',
                         overflowY: 'scroll'
                     }}>
                    {this.renderPopover()}
                </div>
            );
        else
            return null;
    }

    onSearchChange(value) {
        if (value.trim()) {
            this.setState({isSearchOpen: false});
            document.getElementById("loadingDots").style.display = 'inline-block';
            axios.get('/api/search_users?username=' + value.trim())
                .then(({data}) => {
                    this.setState({isSearchOpen: true, searchResults: data});
                    document.getElementById('loadingDots').style.display = 'none';
                    this.setOutsideClick.bind(this)();
                })
        } else {
            this.setState({isSearchOpen: false});
            document.getElementById("loadingDots").style.display = 'none';
        }
    }

    onSearchHide() {
        this.setState({isSearchOpen: false});
    }

    renderPopover() {
        if (this.state.searchResults.length === 0) {
            return (<div>No results found</div>);
        } else {
            return (
                <div>
                    <ul style={{listStyle: 'none', padding: '0'}}>
                        {this.state.searchResults.map((user) => {
                            return (
                                <li className=""
                                    style={{
                                        borderBottom: '1px solid',
                                        borderBottomColor: '#f2f2f2',
                                        borderTop: '1px solid',
                                        borderTopColor: '#f2f2f2'
                                    }}>
                                    <div className=""
                                         style={{
                                             height: '50px',
                                             width: '200px',
                                             paddingTop: '5px',
                                             paddingLeft: '5px'
                                         }}>
                                        <img className=""
                                             src={user.profile.profilePhoto ? user.profile.profilePhoto : '/images/default-profile-picture.jpg'}
                                             style={{
                                                 height: '40px',
                                                 width: '40px',
                                                 display: 'inline-block',
                                                 borderRadius: '50%',
                                                 position: 'relative',
                                                 bottom: '15px'
                                             }}/>
                                        <div className=""
                                             style={{
                                                 height: '40px',
                                                 maxWidth: '160px',
                                                 display: 'inline-block',
                                                 marginLeft: '10px'
                                             }}>
                                            <a href={"/user/"+user.profile.username}
                                               style={{color: 'black'}}><b>
                                                {user.profile.username}
                                            </b></a>
                                            <br/>
                                            {user.profile.firstName}
                                            &nbsp;
                                            {user.profile.lastName}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
    }
}

export default SearchBar;