import { RadioBrowserApi } from 'radio-browser-api';
import React, { useEffect, useState } from 'react';
import defaultImage from './assets/radio.jpg';
import AudioPlayer from 'react-h5-audio-player';

function Radio() {

    const [stations, setStations] = useState();
    const [stationFilter, setStationFilter] = useState("all");

    const filters = [
        "all",
        "classical",
        "country",
        "dance",
        "disco",
        "house",
        "jazz",
        "pop",
        "rap",
        "retro",
        "rock",
    ];

    const setupApi = async stationFilter => {
        const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

        const stations = await api
            .searchStations({
                language: "english",
                tag: stationFilter,
                limit: 30,
            })
            .then(data => {
                return data
            })
        return stations
    }

    const setDefaultSrc = e => {
        e.target.src = defaultImage
    }

    useEffect(() => {

        setupApi(stationFilter)
            .then(data => {
                setStations(data)
                console.log(data)
            })

    }, [stationFilter])

    return (
        <div className="radio">
            <div className="filters">
                {
                    filters.map((filter, index) => (
                        <span
                            key={index}
                            className={stationFilter === filter ? "selected" : ""}
                            onClick={() => setStationFilter(filter)}
                        >
                            {filter}
                        </span>
                    ))
                }
            </div>
            <div className="stations">
                {
                    stations &&
                    stations.map((station, index) => {
                        return (
                            <div className="station" key={index}>
                                <div className="stationName">
                                    <img
                                        src={station.favicon}
                                        alt="station logo"
                                        className={`logo`}
                                        onError={setDefaultSrc}
                                    />
                                    <div className="name">{station.name}</div>
                                </div>
                                <AudioPlayer
                                    className="player"
                                    src={station.urlResolved}
                                    showJumpControls={false}
                                    layout="stacked"
                                    customProgressBarSection={[]}
                                    customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                                    autoPlayAfterSrcChange={false}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="stations"></div>
        </div>
    )
}

export default Radio;
