import React from 'react';
import axios from 'axios';

export default class WeatherList extends React.Component {
  constructor(props) {
    super(props);
    this.getWeatherData = this.getWeatherData.bind(this);
  }
  state = {
    weatherList: this.props.weatherUpdate,
    canSendRequest: true,
    interval: null
  }

  getWeatherData(query) {
    if (!query) {
      return {};
    }

    if (!this.state.canSendRequest) {
      return;
    }

    let config = {
      headers: {
        "x-api-key": localStorage.getItem("weather-key"),
      }
    };

    this.state.canSendRequest = false;
    axios.get(`http://localhost:3000/api/weather?city=${query}`, config) //remove localhost later on
      .then(res => {
        if (res.data.data.length > 0) {
          const weatherList = res.data.data;
          console.log(weatherList);
          this.setState({ weatherList: weatherList, canSendRequest: false });
        }

      })
      .finally(() => {
        // if (this.state.interval) clearInterval(this.state.interval);
      });

    const Interval = setInterval(() => {
      this.setState({ canSendRequest: true });
    }, 3000);
    this.setState({ interval: Interval });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.searchQuery.length < 3) return;
    console.log("New props");
    console.log(newProps);
    this.getWeatherData(newProps.searchQuery);
  }

  componentDidMount() {
    this.getWeatherData(this.props.searchQuery);
    /* let config = {
      headers: {
        "x-api-key": localStorage.getItem("weather-key"),
      }
    };

    axios.get(`http://localhost:3000/api/weather?city=${this.props.searchQuery}`, config)
      .then(res => {
        const weatherList = res.data.data;
        this.setState({ weatherList: weatherList, canSendRequest: false });
      }) */
  }

  componentWillUnmount() {
    if (this.state.interval) clearInterval(this.state.interval);
  }

  render() {
    return (
      <div>
        <ul style={{ textAlign: "left" }}>
          {this.state.weatherList.length > 0 &&
            this.state.weatherList.map((weather, index) =>
              // Only do this if items have no stable IDs
              <li key={index} style={{ textAlign: "left" }}>
                <span>
                  <h4>Location: {weather.city}</h4>

                </span>
                <p><b>Date:</b> {weather.timestamp}</p>
                <p><b>Coordinates:</b> {weather.lat}, {weather.lon}</p>
                <span><b> Temperature:</b> {weather.temperature}</span>,
                <span><b> Humidity:</b> {weather.humidity}</span>,
                <span><b> Pressure:</b> {weather.pressure}</span>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}