import React from "react";
import Vis from "./visualisations/Vis";

export default function TelemetryCard(props) {
  return (
    <div class="card telemetry-card">
      <div class="card-body">
        <Vis
          type={props.title}
          units={props.units}
          data={props.data}
          kind={props.kind}
        />
        <h5 class="card-title">{props.title}</h5>
        <h6 class="card-text">{props.data}</h6>
      </div>
    </div>
  );
}
