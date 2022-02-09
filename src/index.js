import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Users from './components/list/users';
import SearchBar from './components/list/search';
import WeatherList from './components/list/weatherList';
import { w3cwebsocket as W3CWebSocket } from "websocket";

let client = null;
const App = () => {

    const [searchQuery, setSearchQuery] = useState("Islamabad");
    const [keyGenerated, setKeyGenerated] = useState('');
    const [weatherUpdate, setWeatherUpdate] = useState('');

    React.useEffect(
        () => {
            client.onopen = () => {
                console.log('WebSocket Client Connected');
            };
            client.onmessage = (message) => {
                console.log(message);
                const update = JSON.parse(message.data);
                if (searchQuery == update.city) {
                    console.log("Weather update received");
                    //weatherUpdate = update
                    setWeatherUpdate({ ...update });
                }
            };

            client.onclose = (msg) => {
                console.log("Connection Close");
                console.log(msg);
            };

            client.onerror = (msg) => {
                console.log("Error in socket connection");
                console.log(msg);
            }
        }, [client]
    );

    let isKeyGenerated = (localStorage.getItem("weather-key") || keyGenerated) ? true : false;

    if (isKeyGenerated) {
        const key = localStorage.getItem("weather-key");
        if (!client) {
            client = new W3CWebSocket(`ws://localhost:3001/path?key=${key}`);
        }
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>  Weather Application</h1>
            {isKeyGenerated == false && <Users keyGenerated={keyGenerated} setKeyGenerated={setKeyGenerated} />
            }

            {isKeyGenerated == true && <div style={{ textAlign: "left" }}>
                <SearchBar searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} />

                <WeatherList searchQuery={searchQuery} weatherUpdate={weatherUpdate} />
            </div>
            }

        </div>

    );
}
ReactDOM.render(<App />, document.getElementById('app'));