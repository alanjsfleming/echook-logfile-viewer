import React from 'react'


export default function TelemetryCard(props) {
    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <h6 class="card-text">{props.data}{props.units}</h6>
            </div>
        </div>
    )
}