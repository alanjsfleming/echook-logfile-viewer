import React from 'react'
import TelemetryCard from './TelemetryCard'


// telemetry card current takes : title,data,units,kind

function convertTimestamp(timestamp){
    const date = new Date(Number(timestamp))
    console.log(date,Number(timestamp))
    return date.toLocaleString()
}

export default function Telemetry(props) {

   

    return (
    <>
    <TelemetryCard title={'V1'} data={(props.telemetry['Volts (V)']-props.telemetry['Aux volts (V)']).toFixed(1)} units={'V'} kind={"Gauge"}/>

    <TelemetryCard title={'Amps'} data={props.telemetry['Amps (A)']} units={'A'} kind={"Gauge"}/>

    <TelemetryCard title={'Amp hours'} data={props.telemetry['Amp hours (Ah)']} units={'Ah'} kind={"Gauge"}/>

    <TelemetryCard title={'Battery'} data={Math.floor(100-(props.telemetry['Amp hours (Ah)']/27*100))} units={'%'} kind={"Battery"} />

    <TelemetryCard title={'Date, time'} data={convertTimestamp(props.telemetry['timestamp'])} />
    </>
  )
}
