import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Users from './components/list/users';
import SearchBar from './components/list/search';
import WeatherList from './components/list/weatherList';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:3001/");

const App = () => {
    React.useEffect(
        () => {
            client.onopen = () => {
                console.log('WebSocket Client Connected');
            };
            client.onmessage = (message) => {
                console.log(message);
            };
        }, []
    );

    const [searchQuery, setSearchQuery] = useState("Islamabad");
    const [keyGenerated, setKeyGenerated] = useState('');
    let isKeyGenerated = (localStorage.getItem("weather-key") || keyGenerated) ? true : false;


    return (
        <div>
            <h1 style={{ textAlign: "center" }}>  Weather Application</h1>
            {isKeyGenerated == false && <Users keyGenerated={keyGenerated} setKeyGenerated={setKeyGenerated} />
            }

            {isKeyGenerated == true && <div style={{ textAlign: "left" }}>
                <SearchBar searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} />

                <WeatherList searchQuery={searchQuery} />
            </div>
            }

        </div>

    );
}
ReactDOM.render(<App />, document.getElementById('app'));