import React from 'react'
import TelemetryCard from './TelemetryCard'


// telemetry card current takes : title,data,units,kind

function convertTimestamp(timestamp){
    const date = new Date(Number(timestamp))

    return date.toLocaleString()
}




export default function Telemetry3(props) {

  

    return (
    <>
       <TelemetryCard title={'Speed'} data={props.telemetry['Speed (m/s)']} units={'m/s'} kind={"gauge"}/>

    <TelemetryCard title={'Battery'} data={Math.floor(100-(props.telemetry['Amp hours (Ah)']/27*100))} units={'%'} kind={"gauge"} />

    <TelemetryCard title={'Date, time'} data={convertTimestamp(props.telemetry['timestamp'])} units={'minutes:seconds'} />
    </>
  )
}
