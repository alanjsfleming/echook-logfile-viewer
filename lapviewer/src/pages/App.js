import FileUpload from './components/FileUpload';
import '../App.css';

import { useState } from 'react';
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
    <div class="parameters">

      <label for="scale">Scale</label>
      <input type="range" id="scale" name="scale" defaultValue={40} min="1" max="50"/>

    </div>
      <FileUpload renderParams={renderParams}/>
    
    
    
    </> 
  );
}

export default App;