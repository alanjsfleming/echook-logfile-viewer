import React from 'react'
import TelemetryCard from './TelemetryCard'


// telemetry card current takes : title,data,units,kind

function convertTimestamp(timestamp){
    const date = new Date(Number(timestamp))

    return date.toLocaleString()
}




export default function Telemetry1(props) {

  

    return (
    <>
    <TelemetryCard title={'V1'} data={(props.telemetry['Volts (V)']-props.telemetry['Aux volts (V)']).toFixed(1)} units={'V'} kind={"gauge"}/>

    <TelemetryCard title={'Amps'} data={props.telemetry['Amps (A)']} units={'A'} kind={"gauge"}/>

    <TelemetryCard title={'Amp hours'} data={props.telemetry['Amp hours (Ah)']} units={'Ah'} kind={"gauge"}/>

 
    </>
  )
}
