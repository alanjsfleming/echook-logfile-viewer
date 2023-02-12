import React from 'react'

export function GetAccessMenu() {
  return (
    <div class="navbar navbar-light bg-light justify-content-between">
        <h3>TelemetryInsights</h3>
        <div class="menu-bar-right"> 
            <a class="mx-2" href="https://dash.green-arrows.co.uk/"><button  class="btn btn-primary livetelembutton" >Live Telemetry</button></a>
        </div>
    
    </div>
  )
}



export default function MenuBar() {
  return (
    <div class="navbar navbar-light bg-light justify-content-between">
        <h3>TelemetryInsights</h3>
        <div class="menu-bar-right"> 
            
            <button type="button" class="btn btn-outline-primary livetelembutton" data-toggle="modal" data-target="#exampleModalCenter">
              Give Feedback
            </button>
            <a class="mx-2" href="https://dash.green-arrows.co.uk/"><button  class="btn btn-primary livetelembutton" >Live Telemetry</button></a>
        </div>
    
    </div>
  )
}
