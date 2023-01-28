import React from 'react'
import TelemetryCard from './TelemetryCard'


// telemetry card current takes : title,data,units,kind

function convertTimestamp(timestamp){
    const date = new Date(Number(timestamp))

    return date.toLocaleString()
}




export default function Telemetry2(props) {

  

    return (
    <>
    <TelemetryCard title={'Motor Speed'} data={props.telemetry['Motor speed (RPM)']} units={'RPM'} kind={"gauge"}/>

 

    <TelemetryCard title={'Temp1'} data={props.telemetry['Temp1 (C)']} units={'C'} kind={'gauge'} />

    <TelemetryCard title={'Temp2'} data={props.telemetry['Temp2 (C)']} units={'C'} kind={'gauge'}/>
    </>
  )
}
