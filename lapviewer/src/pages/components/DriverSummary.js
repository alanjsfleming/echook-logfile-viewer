import React, { useEffect, useRef } from "react";
import { elapsedTimeIntoString } from "../../utils/TimeFunctions";

export default function DriverSummary({ lapData }) {
  const [drivers, setDrivers] = React.useState([]);
  const [driverData, setDriverData] = React.useState([]);
  const [setUpMode, setSetUpMode] = React.useState(true);
  const formRef = useRef();

  function addDriver() {
    const tempDrivers = drivers;
    tempDrivers.push({
      name: formRef.current.driverName.value,
      firstLap: formRef.current.firstLap.value,
      lastLap: formRef.current.lastLap.value,
    });
    setDrivers(tempDrivers);
    console.log(drivers);
  }

  function handleShowHideSetup() {
    setSetUpMode(!setUpMode);
  }

  function handleClearDrivers() {
    setDrivers([]);
    setDriverData([]);
  }

  function calculateAverageValue(array) {
    let total = 0;
    let count = 0;
    array.forEach(function (item, index) {
      total += parseFloat(item);
      count++;
    });
    return total / count;
  }

  function calculateTotalUsed(array) {
    console.log(array);
    let total = 0;
    array.forEach(function (item, index) {
      total += parseFloat(item);
    });
    return total;
  }

  // For each driver, calculate the average values for all laps they drove.
  // filter each drivers lap numbers out of the averages array and calculate the average of the remaining values.

  function calculateDriverAverages() {
    handleShowHideSetup();
    const driverAverageArrays = [];
    // Join the average values of each lap into a single array for each drivers laps
    drivers.forEach(function (driver, index) {
      const driverAverageArray = [];
      for (var i = 0; i < lapData.length; i++) {
        if (i >= driver.firstLap - 1 && i <= driver.lastLap - 1) {
          driverAverageArray.push(lapData[i]);
        }
      }
      driverAverageArrays.push(driverAverageArray);
    });
    const tempDriverData = [];
    console.log(driverAverageArrays);
    // Calculate the average of each drivers average array
    driverAverageArrays.forEach(function (driverAverageArray, index) {
      const tempDriverAverages = driverAverageArrays.map(
        (driverDataArray, index) => {
          return {
            time: elapsedTimeIntoString(
              calculateAverageValue(
                driverDataArray.map(
                  (lapData, index) => lapData.elapsedTimestamp,
                ),
              ),
            ),
            aAH:
              Math.round(
                calculateAverageValue(
                  driverDataArray.map((lapData, index) => lapData.AH),
                ) * 10,
              ) / 10,
            tAH:
              Math.round(
                calculateTotalUsed(
                  driverDataArray.map((lapData, index) => lapData.AH),
                ) * 10,
              ) / 10,
            aV1:
              Math.round(
                calculateAverageValue(
                  driverDataArray.map((lapData, index) => lapData.aV1),
                ) * 10,
              ) / 10,
            aA:
              Math.round(
                calculateAverageValue(
                  driverDataArray.map((lapData, index) => lapData.aA),
                ) * 10,
              ) / 10,
            aSpd:
              Math.round(
                calculateAverageValue(
                  driverDataArray.map((lapData, index) => lapData.aSpd),
                ) * 10,
              ) / 10,
          };
        },
      );
      tempDriverData.push(tempDriverAverages);
    });
    setDriverData(tempDriverData);
    console.log(driverData);
  }

  return (
    <>
      <h3>Drivers</h3>
      <div className="btn-group w-100">
        <button
          disabled={driverData?.length > 0}
          className={
            driverData?.length < 1
              ? "btn btn-primary w-25"
              : "btn btn-outline-primary w-25"
          }
          onClick={handleShowHideSetup}
        >
          {setUpMode ? "Add driver" : "Hide"}
        </button>
        <button
          className="btn btn-outline-warning w-25"
          onClick={handleClearDrivers}
        >
          Clear Driver List
        </button>
        <button
          className="btn btn-primary w-50"
          onClick={calculateDriverAverages}
        >
          Calculate Driver Averages
        </button>
      </div>
      <div hidden={setUpMode} className="card p-1">
        <form className="form" ref={formRef}>
          <label>Driver Name</label>
          <input className="form-control" type="text" name="driverName" />
          <label>First Lap</label>
          <input className="form-control" type="number" name="firstLap" />
          <label>Last Lap</label>
          <input className="form-control" type="number" name="lastLap" />
          <button type="button" onClick={addDriver}>
            Add Driver
          </button>
        </form>
      </div>
      <div className="table-responsive">
        <table
          hidden={!setUpMode}
          class="table table-hover fixed-header m-0 p-0"
        >
          <thead className="table-header">
            <tr>
              <th className="p-0">Driver</th>
              <th className="p-0">aTime</th>
              <th className="p-0">aAH</th>
              <th className="p-0">tAH</th>
              <th className="p-0">aV1</th>
              <th className="p-0">aA</th>
              <th className="p-0">aSpeed</th>
            </tr>
          </thead>
          <tbody>
            {drivers?.length > 0 &&
              drivers?.map((driver, index) => (
                <>
                  <tr>
                    <th scope="row" className="p-0">
                      <span className="d-flex flex-column text-center">
                        {driver["name"]}
                        <small>
                          {" "}
                          ({driver["firstLap"] + "-" + driver["lastLap"]})
                        </small>
                      </span>
                    </th>
                    <td>
                      {driverData?.length > 0 && driverData[index][index]?.time}
                    </td>
                    <td>
                      {driverData?.length > 0 && driverData[index][index]?.aAH}
                    </td>
                    <td>
                      {driverData?.length > 0 && driverData[index][index]?.tAH}
                    </td>
                    <td>
                      {driverData?.length > 0 && driverData[index][index]?.aV1}
                    </td>
                    <td>
                      {driverData?.length > 0 && driverData[index][index]?.aA}
                    </td>
                    <td>
                      {driverData?.length > 0 && driverData[index][index]?.aSpd}
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
