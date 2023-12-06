import React from "react";
import Emoji from "./Emoji";

export function GetAccessMenu() {
  return (
    <div class="navbar navbar-light bg-light justify-content-between">
      <a class="underline" href="https://dashowl.co.uk">
        <Emoji symbol="🦉" label="owl" />
        DashOwl
      </a>
      <div class="menu-bar-right">
        <a class="mx-2" href="https://dashowl.co.uk/">
          <button class="btn btn-primary livetelembutton">
            Live Telemetry
          </button>
        </a>
      </div>
    </div>
  );
}

export default function MenuBar() {
  return (
    <div class="navbar navbar-light bg-light justify-content-between">
      <a class="underline" href="https://dashowl.co.uk">
        <Emoji symbol="🦉" label="owl" />
        DashOwl
      </a>
      <div class="menu-bar-right">
        <button
          type="button"
          class="btn btn-outline-primary livetelembutton"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Give Feedback
        </button>
        <a class="mx-1" href="https://dashowl.co.uk/">
          <button class="btn btn-primary livetelembutton">
            Live Telemetry
          </button>
        </a>
      </div>
    </div>
  );
}
