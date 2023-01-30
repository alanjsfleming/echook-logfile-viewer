import FileUpload from './components/FileUpload';
import '../App.css';

import { useEffect, useState } from 'react';
import GraphPanel from './components/GraphPanel';
import MenuBar from './components/MenuBar';

function App() {

  const [renderParams,changeRenderParams] = useState(
    {
      'scale':45,
      'timeInterval':1000
    }
    )
  
  return (



    <>
    <MenuBar />
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Modal
        </button>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-center" id="exampleModalLongTitle">LAPrechaun logfile visualiser</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Enter email to get access to visualiser + free demo file
      </div>
      <div class="modal-footer">
        <a class="text-primary" type="button" data-dismiss="modal">skip</a>
      </div>
    </div>
  </div>
</div>
    
    <div class="parameters">

      <label for="scale">Scale</label>
      <input type="range" id="scale" name="scale" defaultValue={40} min="1" max="50"/>

    </div>



      <FileUpload renderParams={renderParams}/>
    
    
    
    </> 
  );
}

export default App;