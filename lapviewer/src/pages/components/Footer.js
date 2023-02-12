import React from 'react'


// <li class="ms-3"><a class="footer-links text-muted" href="https://twitter.com/alanjsfleming">Twitter</a></li>


export default function Footer() {
  return (
    <div class="container">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
            <span class="mb-3 mb-md-0 text-muted">eChook logfile visualiser</span> 
        </div>
        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="mx-3"><a class="footer-links text-muted" href="https://www.buymeacoffee.com/alanjsfleming">Buy Me a Coffee</a></li>
          
        </ul>
      </footer>
    </div>
  )
}