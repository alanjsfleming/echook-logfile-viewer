import React from 'react'

export default function DriverSummary({lapData}) {

    const [drivers,setDrivers] = React.useState([])
    const [setUpMode,setSetUpMode] = React.useState(true)

    function addDriver(e) {
  
        console.log(e)
      
    }

  return (
    <>
    <h3>Drivers</h3>
    <button>Hide Setup</button>
    <div className="card p-1">
        <form className="form">
            <label>Driver Name</label>
            <input className="form-control" type="text" name="driverName" />
            <label>First Lap</label>
            <input className="form-control" type="number" name="firstLap" />
            <label>Last Lap</label>
            <input className="form-control" type="number" name="lastLap" />
            <button type="button" onClick={addDriver()}>Add Driver</button>
        </form>
    </div>
    </>
  )
}
