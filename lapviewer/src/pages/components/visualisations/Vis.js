import React from 'react'
import Gauge from './Gauge'
import Timer from './Timer'

export default function Vis(type,units,data,settings) {

/* Function to determine which kind of graph and the upper and lower limits to output */

    function determineVisualisation(props) {

        if (props.kind==="gauge") {
           
            if (props.units==='V') {
                return <Gauge data={props.data} upper="30" lower="0" title={props.title}/>
            } else if (props.units==='A') {
                return <Gauge data={props.data} upper="40" lower="0" title={props.title}/>
            } else if (props.units==="th Gear") {
                if (isNaN(props.data)) {
                    return <a href="#settings" class="btn btn-warning">Missing gear sizes<br></br>Click here to go to settings</a>
                } else {
                return <Gauge data={Math.abs(props.data)} upper="11" lower="7" title={props.title}/>
                }
            } else if (props.units==="%") {
               
                return <Gauge data={props.data} upper="100" lower="0" title={props.title}/>
                
            } else if (props.units==="Ah/Lap") {
                
                return <Gauge data={props.data} upper="10" lower="0" title={props.title}/>
                
            } else if (props.units==="minutes:seconds") {
                if (!props.settings.timeStamp) {
                    return <a href="#settings" class="btn btn-warning">Timer not started<br></br>Click here to go to settings</a>
                }
            } else if (props.units==="C") {
                return <Gauge data={props.data} upper="40" lower="0" title={props.title} />
            
            } 
            
        } else if (props.kind==="timer") {
            if (props.raceStart) {
                return <Timer raceStart={props.raceStart} currentTime={props.currentTime}/>
            }
        }
    }

  return (
    determineVisualisation(type,units,data)
  )
}