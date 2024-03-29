import FileUpload from "./components/FileUpload";
import "../App.css";

import { useEffect, useState } from "react";
import GraphPanel from "./components/GraphPanel";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <>
      <MenuBar />

      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-center" id="exampleModalLongTitle">
                Give Feedback
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>

      <FileUpload />

      <Footer />
    </>
  );
}

export default App;
