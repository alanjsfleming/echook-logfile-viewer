import React from "react";
import { GetAccessMenu } from "./components/MenuBar";
import { Link } from "react-router-dom";
import VisualiserImg from "../images/VisualiserScreenshot.jpg";

import Footer from "./components/Footer";

export default function GetAccess() {
  return (
    <>
      <GetAccessMenu />
      <div class="px-4 pt-5 my-5 border-bottom shadow">
        <h1 class="display-4 text-center fw-bold">
          Free eChook Logfile visualiser
        </h1>
        <br></br>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4 text-center">No more excel sheets.</p>
          <p class="lead mb-4 text-center">
            The visualiser can be used in combination with our Live Telemetry
            Dashboard to gain a comprehensive understanding of your cars
            performance after and during races.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <div class="w-25 m-auto">
              <Link
                to="/"
                class="btn btn-primary btn-block px-4 me-sm-3 form-control"
              >
                Enter
              </Link>
            </div>
          </div>
        </div>
        <div class="overflow-hidden thanks">
          <div class="container px-5 text-center">
            <img
              src={VisualiserImg}
              class="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example"
              width="900"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div class="thanks-spacer"></div>
      <Footer />
    </>
  );
}
