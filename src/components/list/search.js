import React from 'react';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            input: "",
            canSendRequest: false
        }
    }

    render() {
        return (
            <input value={this.props.searchQuery} style={{ width: "400px", marginLeft: "30px", height: "30px" }}
                onInput={e => this.props.setSearchQuery(e.target.value)}
                type="text"
                id="search-box"
                placeholder="Enter City Name"
                name="search-box"
            />
        )
    }
}