import React, { useRef, useEffect, useState } from "react";
import Telemetry from "./Telemetry";

import GraphPanel from "./GraphPanel";
import TrackMap from "./TrackMap";

import LapDataTable from "./LapDataTable";

export default function TrackRender(props) {
  const progressSlider = useRef();
  const mainSettingsRef = useRef();

  const [currentData, updateCurrentData] = useState([]);

  const [playbackStatus, setPlaybackStatus] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState();
  const [loading, completeLoading] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [raceStart, setRaceStart] = useState();
  const [dataMetrics, setDataMetrics] = useState();
  const [layoutSettings, setLayoutSettings] = useState({});

  const [lapStarts, setLapStarts] = useState([]);

  useEffect(() => {
    updateCurrentData(props.data[0]);
    setPlaybackProgress(0);
    setRaceStart(0);
    completeLoading(false);
  }, []);

  useEffect(() => {
    if (props.data.length > 0) {
      setDataMetrics(initialiseMetrics(Object.keys(props.data[0])));
    }
  }, [props.data]);

  useEffect(() => {
    setLayoutSettings(dataMetrics);
  }, [dataMetrics]);

  function handleRaceStart(e) {
    setRaceStart(playbackProgress);
    console.log(raceStart);
  }

  function handle1xPlaybackSpeed(e) {
    setPlaybackSpeed(300);
  }

  function handle10xPlaybackSpeed(e) {
    setPlaybackSpeed(30);
  }

  function handle100xPlaybackSpeed(e) {
    setPlaybackSpeed(1);
  }

  function handleGoToStart(e) {
    setPlaybackProgress(raceStart);
    updateCurrentData(props.data[playbackProgress]);
  }

  function handleSaveSettings(e) {
    return
  }

  function convertTimestamp(timestamp) {
    const date = new Date(Number(timestamp));

    return date.toLocaleString();
  }

  // When progress slider changed, should change the current point to whatever that is and play.
  function handleSeekChange(event) {
    if (props.data[0]) {
      const index = Math.floor((event.target.value / 1000) * props.data.length);
      // I think this line might disable the playing
      //setPlaybackStatus(false)
      if (props.data[index]) {
        updateCurrentData(props.data[index]);
        setPlaybackProgress(index);
      }
    }
  }

  // Toggle play/pause state
  function handlePlayPause(event) {
    if (playbackStatus == true) {
      // Pause
      setPlaybackStatus(false);
      console.log(progressSlider);
    } else {
      // Play
      setPlaybackStatus(true, playThrough());
    }
  }

  // Show Play/Pause in button depending on state
  function showPlayPauseButton() {
    if (playbackStatus) {
      return <span>Pause</span>;
    } else {
      return <span>Play</span>;
    }
  }

  // this block doesnt work - rethink
  // setState doesnt update immediately so it doesnt take the playbackStatus value correctly.
  // for same reason it only takes the playbackProgress of when it was initiated, doesnt update and read next value each time.
  function playThrough() {
    console.log(playbackStatus);
    const playingInterval = setInterval(function () {
      if (playbackStatus) {
        clearInterval(playingInterval);
      }

      if (playbackProgress < props.data.length) {
        updateCurrentData(props.data[playbackProgress + 1]);
        setPlaybackProgress(playbackProgress + 1);
      }
    }, playbackSpeed);
  }

  // Make new array of data with reduced sample rate for loading in to graph to improve redraw time
  const reducedSampleRateData = (data, n) => {
    // reduce sample rate of data by factor n
    let resized = []; // store new array for data
    data.forEach((v, i) => {
      // loop through data
      if (i % n === 0) {
        // only keep every nth element
        resized.push(v); // store new data
      }
    });
    return resized;
  };

  // add: upper, lower, vis type
  // when click save then set state to object { 'V1' : { enabled: true, type: 'gauge', upper: 30, lower: 0 },
  //                                                 ...  }
  
  function initialiseMetrics(keys) {
    const metrics = {};
    keys.forEach(metric => {
      metrics[metric] = { name: metric, enabled: true, type: 'gauge', maxValue: 30, minValue: 0 };
    });
    return metrics;
  }

  useEffect(() => {
    console.log(dataMetrics);
  }, [dataMetrics]);

  const handleSave = () => {
    const newMetrics = {};
    for (let metric of Object.keys(dataMetrics)) {
      const graphField = mainSettingsRef.current[metric + 'Graph'];
      const typeField = mainSettingsRef.current[metric + 'Type'];
      const maxValueField = mainSettingsRef.current[metric + 'MaxValue'];
      const minValueField = mainSettingsRef.current[metric + 'MinValue'];
  
      newMetrics[metric] = {
        ...dataMetrics[metric],
        graph: graphField ? graphField.checked : dataMetrics[metric].graph,
        type: typeField ? typeField.value : dataMetrics[metric].type,
        maxValue: maxValueField ? maxValueField.value : dataMetrics[metric].maxValue,
        minValue: minValueField ? minValueField.value : dataMetrics[metric].minValue,
      };
    }
  
    setDataMetrics(newMetrics);
  };

  const DataSettingsComponent = () => (
    <form class="form" ref={mainSettingsRef}>
      <div class="row form-group">
        <div class="col text-center">Name</div>
        <div class="col text-center">Graph</div>
        <div class="col text-center">Gauge</div>
        <div class="col text-center">Max value</div>
        <div class="col text-center">Min value</div>
      </div>
      {Object.keys(dataMetrics).map((metric) => (
        <div class="row form-group">
          <div class="col m-auto d-flex justify-content-center">{dataMetrics[metric].name}</div>

          <div class="col m-auto form-check-inline d-flex justify-content-center">
            <input name={`${dataMetrics[metric].name}Graph`} defaultChecked={dataMetrics[metric].graph} type="checkbox" />
          </div>

          <div className="col m-auto form-check-inline d-flex justify-content-center">
            <select name={`${dataMetrics[metric].name}Type`} defaultValue={dataMetrics[metric].type}>
              <option value="Gauge">Gauge</option>
              <option value="Bar">Bar</option>
              <option value="Number">Number</option>
            </select>
          </div>

          <div class="col m-auto d-flex justify-content-center">
            <input name={`${dataMetrics[metric].name}MaxValue`} defaultValue={dataMetrics[metric].maxValue} type="number" step="1"/>
          </div>

          <div class="col m-auto d-flex justify-content-center">
            <input name={`${dataMetrics[metric].name}MinValue`} defaultValue={dataMetrics[metric].minValue} type="number" step="1"/>
          </div>
        </div>
))}
    </form>
  );

  return (
    <>
      <div class="container-fluid">
        <div
          class="modal fade"
          id="settingsModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="settingsModalTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-xl modal-dialog-centered"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-center" id="settingsModalLongTitle">
                  Settings
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <button hidden class="btn btn-outline-primary btn-block">
                  Create free account to save setup between sessions
                </button>
                <button class="btn btn-primary btn-block" onClick={handleSave}>Save settings</button>
                <br></br>

                <h5>Map</h5>
                <input
                  id="settingsMapDraw"
                  name="mapSettings"
                  type="radio"
                  value="draw"
                  defaultChecked={true}
                />
                <label for="settingsMapDraw">Drawn path</label>
                <br></br>
                <input
                  id="settingsMapRender"
                  name="mapSettings"
                  type="radio"
                  value="render"
                />
                <label for="settingsMapRender">Map marker</label>

                <h5></h5>

                <h5>Select Data</h5>
                {dataMetrics && (
                  <DataSettingsComponent dataMetrics={dataMetrics} />
                )}
              </div>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#settingsModalCenter">
  Open Settings
</button>

        <div class="top-row">
          <div className="w-100 h-100">
            <TrackMap
              currentData={currentData}
              latitude={currentData["Latitude (deg)"]}
              longitude={currentData["Longitude (deg)"]}
            />
          </div>

          <div class="w-100">
            <div className="w-100">
              <GraphPanel
                data={reducedSampleRateData(props.data, 100)}
                progress={playbackProgress / 100}
                dataSelected={[1, 2, 3, , 4]}
                raceStart={raceStart / 100}
              />
            </div>
            <div class="seeking-container">
              <label for="seek">
                {convertTimestamp(currentData.timestamp)}
              </label>
              <div class="slidecontainer">
                <input
                  type="range"
                  id="seek"
                  class="slider"
                  name="seek"
                  ref={progressSlider}
                  onChange={handleSeekChange}
                  value={(playbackProgress / props.data.length) * 1000}
                  min="0"
                  max="1000"
                  disabled={loading}
                />
              </div>
              <div>
                <button hidden disabled={loading} onClick={handlePlayPause}>
                  {showPlayPauseButton()}
                </button>
                <button
                  className="btn btn-light border"
                  disabled={loading}
                  onClick={handleRaceStart}
                >
                  Set start time
                </button>
                <button hidden disabled={loading} onClick={handleGoToStart}>
                  Go to start
                </button>
                <button
                  hidden
                  disabled={loading}
                  onClick={handle1xPlaybackSpeed}
                >
                  1x
                </button>
                <button
                  hidden
                  disabled={loading}
                  onClick={handle10xPlaybackSpeed}
                >
                  10x
                </button>
                <button
                  hidden
                  disabled={loading}
                  onClick={handle100xPlaybackSpeed}
                >
                  100x
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="bottom-panel">
            <div class="col">
              <Telemetry telemetry={currentData} raceStart={raceStart} />
            </div>
          </div>
        </div>

        <LapDataTable
          allData={props.data}
          playbackProgress={playbackProgress}
          raceStart={raceStart}
        />
      </div>
    </>
  );
}
