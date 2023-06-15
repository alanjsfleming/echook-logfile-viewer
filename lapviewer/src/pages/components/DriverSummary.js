import React,{ useRef } from 'react'

export default function DriverSummary({lapData}) {

    const [drivers,setDrivers] = React.useState([])
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

    // For each driver, calculate the average values for all laps they drove.
    // filter each drivers lap numbers out of the averages array and calculate the average of the remaining values.

    function calculateDriverAverages() {
    
    }



  return (
    <>
    <h3>Drivers</h3>
    <button onClick={handleShowHideSetup}>{setUpMode ? "Show Setup" : "Hide Setup"}</button>
    <button onClick={handleClearDrivers}>Clear Driver List</button>
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

    <table class="table table-hover">
        <thead>
            <tr>
                <th>Driver</th>
                <th>aTime</th>
                <th>aAH</th>
                <th>aV1</th>
                <th>aA</th>
                <th>aSpeed</th>
            </tr>
        </thead>
        <tbody>
            {drivers.map((driver,index)=>(
                <tr>
                    
                    <th scope="row">{driver.name}</th>
                    <td>{driver.firstLap}</td>
                    <td>{driver.lastLap}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
            ))}

        </tbody>
    </table>
    </>
  )
}
