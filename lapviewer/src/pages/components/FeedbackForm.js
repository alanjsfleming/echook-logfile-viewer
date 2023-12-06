import React from "react";

export default function FeedbackForm() {
  return (
    <>
      <form
        id="contactform"
        action="https://formsubmit.io/send/ebf46b49-7fe6-4863-88f9-9f7534e632ca"
        method="POST"
      >
        <div class="form-group">
          <input
            name="_redirect"
            type="hidden"
            id="name"
            value="https://vis.dashowl.co.uk/thanks"
          />

          <label for="name">Email address (optional)</label>
          <input class="form-control" name="email" type="email" id="email" />
        </div>

        <div class="form-group">
          <label for="feedback">Feedback</label>
          <textarea
            class="form-control"
            name="feedback"
            id="feedback"
            rows="3"
            required
          ></textarea>
        </div>
        <input name="_formsubmit_id" type="text" style={{ display: "none" }} />
        <div class="form-group">
          <input class="btn btn-primary" value="Submit" type="submit" />
        </div>
      </form>
    </>
  );
}

// ebf46b49-7fe6-4863-88f9-9f7534e632ca
//  <input name="_formsubmit_id" type="text" />
