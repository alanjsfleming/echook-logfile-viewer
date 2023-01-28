import React from 'react'

export default function RawData(props) {
  return (
    <div>
        <h5>Raw Data</h5>
        <p>timestamp: {props.currentData['timestamp']}</p>
        <p>Input throttle (%) {props.currentData['Input throttle (%)']}</p>
    </div>
  )
}
