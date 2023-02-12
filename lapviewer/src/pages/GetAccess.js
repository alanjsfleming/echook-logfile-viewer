import React from 'react'
import { GetAccessMenu } from './components/MenuBar'
import { Link } from 'react-router-dom'
import VisualiserImg from '../images/visualiserplaceholder.png'
import Footer from './components/Footer'

export default function GetAccess() {
  return (
    <>
    <GetAccessMenu />
    <div class="px-4 pt-5 my-5 border-bottom shadow">
      <h1 class="display-4 text-center fw-bold">Get Free Access to eChook Logfile visualiser</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4 text-center">Enter your email to get a free access link.</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <form class="card p-3 w-50">
            <div class="form-group">
              <label for="email">Email address</label>
              <input class="form-control" name="email" type="email" />
            </div>

            <div class="form-check">
              <input type="checkbox" class="form-check-input" />
              <label for="checkbox" class="form-check-label">I agree to receive communications</label>
              
            </div>


          
              <button type="submit" class="btn btn-primary btn-lg px-4 me-sm-3 form-control">Go</button>
          
          </form>
        
        </div>
      </div>
      <div class="overflow-hidden thanks">
        <div class="container px-5 text-center">
          <img src={VisualiserImg} class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example" width="900" height="500" loading="lazy" />
        </div>
      </div>
    </div>
  <div class="thanks-spacer"></div>
  <Footer />
  </>
  )
}