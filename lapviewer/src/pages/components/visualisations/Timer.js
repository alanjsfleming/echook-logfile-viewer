import React from "react";
import { useEffect } from "react";

export default function Timer(props) {
  function timeSinceStart() {
    const currentTime = props.currentTime;
    const elapsedTime = currentTime - props.raceStart;
    return elapsedTime;
  }

  function elapsedTimeIntoValue() {
    const elapsedTime = timeSinceStart();
    return elapsedTime / 1000 / 60;
  }

  function elapsedTimeIntoString() {
    const elapsedTime = timeSinceStart();
    const mins = Math.floor(elapsedTime / 1000 / 60).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const seconds = Math.round((elapsedTime / 1000) % 60).toLocaleString(
      "en-US",
      { minimumIntegerDigits: 2, useGrouping: false },
    );
    const string = `${mins}:${seconds}`;
    return string;
  }

  return (
    <>
      <div class="gauge-holder">
        <progress
          class="progress"
          min="0"
          max="100"
          value={elapsedTimeIntoValue()}
        ></progress>
      </div>
      <div class="elapsedTime">{elapsedTimeIntoString()}</div>
    </>
  );
}
