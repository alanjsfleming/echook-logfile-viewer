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
    <div class="telemetry-container ">
    <TelemetryCard title={'V1'} data={(props.telemetry['Volts (V)']-props.telemetry['Aux volts (V)']).toFixed(1)} units={'V'} kind={"gauge"}/>

    <TelemetryCard title={'Amps'} data={props.telemetry['Amps (A)']} units={'A'} kind={"gauge"}/>

    
    <TelemetryCard title={'Speed'} data={props.telemetry['Speed (m/s)']} units={'m/s'} kind={"gauge"}/>
    <TelemetryCard title={'Motor Speed'} data={props.telemetry['Motor speed (RPM)']} units={'RPM'} kind={"gauge"}/>

 

    <TelemetryCard title={'Temp1'} data={props.telemetry['Temp1 (C)']} units={'C'} kind={'gauge'} />

    <TelemetryCard title={'Temp2'} data={props.telemetry['Temp2 (C)']} units={'C'} kind={'gauge'}/>
    <TelemetryCard title={'Amp hours'} data={props.telemetry['Amp hours (Ah)']} units={'Ah'} kind={"gauge"}/>

    <TelemetryCard title={'Battery'} data={Math.floor(100-(props.telemetry['Amp hours (Ah)']/27*100))} units={'%'} kind={"gauge"} />

    <TelemetryCard title={'Date, time'} data={convertTimestamp(props.telemetry['timestamp'])} units={'minutes:seconds'} />
    <TelemetryCard title={'Race'} currentTime={props.telemetry['timestamp']} kind={'timer'} raceStart={props.raceStart} />
    </div>
    </>
  )
}
