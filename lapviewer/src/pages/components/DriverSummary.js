import React,{ useRef } from 'react'
import { elapsedTimeIntoString } from '../../utils/TimeFunctions'

export default function DriverSummary({lapData}) {

    const [drivers,setDrivers] = React.useState([])
    const [driverData,setDriverData] = React.useState([])
    const [setUpMode,setSetUpMode] = React.useState(true)
    const formRef = useRef()

    function addDriver() {
        const tempDrivers = drivers
        tempDrivers.push({ name : formRef.current.driverName.value,
                            firstLap : formRef.current.firstLap.value,
                            lastLap : formRef.current.lastLap.value
                            })
        setDrivers(tempDrivers)
        console.log(drivers)
    }



    function handleShowHideSetup() {
        setSetUpMode(!setUpMode)
    }

    function handleClearDrivers() {
        setDrivers([])
    }

    function calculateAverageValue(array){
        let total = 0
        let count = 0
        array.forEach(function(item,index){
            total+=parseInt(item);
            count++
        })
        return total/count
    }

    function calculateTotalUsed(array) {
        console.log(array)
        let total = 0
        array.forEach(function(item,index){
            total+=parseInt(item);
        })
        return total
    }
 

    // For each driver, calculate the average values for all laps they drove.
    // filter each drivers lap numbers out of the averages array and calculate the average of the remaining values.

    function calculateDriverAverages() {
        const driverAverageArrays = []
        // Join the average values of each lap into a single array for each drivers laps
        drivers.forEach(function(driver,index){
            const driverAverageArray = []
            for (var i = 0; i < lapData.length; i++) {
                if (i >= driver.firstLap && i <= driver.lastLap) {
                    if (!(i == driver.firstLap || i == driver.lastLap)) {
                    driverAverageArray.push(lapData[i-1])
                }
            }
            }
            driverAverageArrays.push(driverAverageArray)
        })
        const tempDriverData = []
        console.log(driverAverageArrays)
        // Calculate the average of each drivers average array
        driverAverageArrays.forEach(function(driverAverageArray,index){
            const tempDriverAverages = driverAverageArrays.map((driverDataArray,index) => {
                return {
                    time : elapsedTimeIntoString(calculateAverageValue(driverDataArray.map((lapData,index) => lapData.elapsedTimestamp))),
                    aAH : Math.round(calculateAverageValue(driverDataArray.map((lapData,index) => lapData.AH))*10)/10,
                    tAH : Math.round(calculateTotalUsed(driverDataArray.map((lapData,index) => lapData.AH))*10)/10,
                    aV1 : Math.round(calculateAverageValue(driverDataArray.map((lapData,index) => lapData.aV1))*10)/10,
                    aA : Math.round(calculateAverageValue(driverDataArray.map((lapData,index) => lapData.aA))*10)/10,
                    aSpd : Math.round(calculateAverageValue(driverDataArray.map((lapData,index) => lapData.aSpd))*10)/10,

                }
            
            })
            tempDriverData.push(tempDriverAverages)
        })
        setDriverData(tempDriverData)
        console.log(driverData)
    }



  return (
    <>
    <h3>Drivers</h3>
    <button onClick={handleShowHideSetup}>{setUpMode ? "Show Setup" : "Hide Setup"}</button>
    <button onClick={handleClearDrivers}>Clear Driver List</button>
    <button onClick={calculateDriverAverages}>Calculate Driver Averages</button>
    <div hidden={setUpMode} className="card p-1">
        <form className="form" ref={formRef}>
            <label>Driver Name</label>
            <input className="form-control" type="text" name="driverName" />
            <label>First Lap</label>
            <input className="form-control" type="number" name="firstLap" />
            <label>Last Lap</label>
            <input className="form-control" type="number" name="lastLap" />
            <button type="button" onClick={addDriver}>Add Driver</button>
        </form>
    </div>

    <table hidden={!setUpMode} class="table table-hover fixed-header  w-75 m-auto">
        <thead>
            <tr>
                <th>Driver</th>
                <th>aTime</th>
                <th>aAH</th>
                <th>tAH</th>
                <th>aV1</th>
                <th>aA</th>
                <th>aSpeed</th>
            </tr>
        </thead>
        <tbody>
            {drivers.map((driver,index)=>(
                <tr>
                    <th scope="row">{driver.name}<small> ({driver.firstLap+"-"+driver.lastLap})</small></th>
                    <td>{driverData[index][index]?.time}</td>
                    <td>{driverData[index][index]?.aAH}</td>
                    <td>{driverData[index][index]?.tAH}</td>
                    <td>{driverData[index][index]?.aV1}</td>
                    <td>{driverData[index][index]?.aA}</td>
                    <td>{driverData[index][index]?.aSpd}</td>
                </tr>
            ))}

        </tbody>
    </table>
    </>
  )
}
