import React from "react";
import TelemetryCard from "./TelemetryCard";

// telemetry card current takes : title,data,units,kind

function convertTimestamp(timestamp) {
  const date = new Date(Number(timestamp));

  return date.toLocaleString();
}

export default function Telemetry(props) {
  // telemetry data { title: a , value: b , kind: c}
  // should map all the data params that are selected into telemetry cards.
  // need :
  // title - the column header in log file
  // data - props.telemetry[title]
  // units - whatever is inside the brackets () in the title

  // some common calculated values should be chooseable in the settings page and added to the current data object

  // function to find units by whatever is inside brackets ()

  function findUnit(string) {
    // find index of (
    const first = string.indexOf("(");
    const second = string.indexOf(")");
    // return string between those two
    return string.slice(first, second);
  }

  const mapDataToTelemetry = ({ telemetryData }) => {
    // map data to telemetry card
    {
      telemetryData.map((name) => (
        <TelemetryCard
          title={props.telemetry[name]}
          data={props.telemetry[name]}
          unit={findUnit(name)}
        />
      ));
    }
  };

  return (
    <>
      <div class="telemetry-container ">
        <TelemetryCard
          title={"V1"}
          data={(
            props.telemetry["Volts (V)"] - props.telemetry["Aux volts (V)"]
          ).toFixed(1)}
          units={"V"}
          kind={"gauge"}
        />

        <TelemetryCard
          title={"Amps"}
          data={props.telemetry["Amps (A)"]}
          units={"A"}
          kind={"gauge"}
        />

        <TelemetryCard
          title={"Speed"}
          data={props.telemetry["Speed (m/s)"]}
          units={"m/s"}
          kind={"gauge"}
        />
        <TelemetryCard
          title={"Motor Speed"}
          data={props.telemetry["Motor speed (RPM)"]}
          units={"RPM"}
          kind={"gauge"}
        />

        <TelemetryCard
          title={"Temp1"}
          data={props.telemetry["Temp1 (C)"]}
          units={"C"}
          kind={"gauge"}
        />

        <TelemetryCard
          title={"Temp2"}
          data={props.telemetry["Temp2 (C)"]}
          units={"C"}
          kind={"gauge"}
        />
        <TelemetryCard
          title={"Amp hours"}
          data={props.telemetry["Amp hours (Ah)"]}
          units={"Ah"}
          kind={"gauge"}
        />

        <TelemetryCard
          title={"Battery"}
          data={Math.floor(
            100 - (props.telemetry["Amp hours (Ah)"] / 27) * 100,
          )}
          units={"%"}
          kind={"gauge"}
        />

        <TelemetryCard
          title={"Date, time"}
          data={convertTimestamp(props.telemetry["timestamp"])}
          units={"minutes:seconds"}
        />
        <TelemetryCard
          title={"Race"}
          currentTime={props.telemetry["timestamp"]}
          kind={"timer"}
          raceStart={props.raceStart}
        />
      </div>
    </>
  );
}
