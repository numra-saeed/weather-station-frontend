import React from 'react';
import axios from 'axios';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };

    this.generateKey = this.generateKey.bind(this);
  }

  generateKey() {
    axios.post(`http://localhost:3000/generate-key`) //urls should be updated later on
      .then(res => {
        const user = res.data.data;
        console.log(user);
        this.setState({ user: user });
        localStorage.setItem("weather-key", user.key);
        this.props.setKeyGenerated(true);
      })
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={this.generateKey}>Generate Key</button>
      </div>

    )
  }
}