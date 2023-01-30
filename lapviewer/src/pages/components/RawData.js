import React from 'react'

export default function RawData(props) {
  return (
    <div class="card mx-1 p-3">
        <h5>Raw Data</h5>
        <p>timestamp: {props.currentData['timestamp']}</p>
        <p>Input throttle (%) {props.currentData['Input throttle (%)']}</p>
        
    </div>
  )
}
