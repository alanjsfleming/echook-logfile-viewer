import React, {useRef,useEffect, useState} from 'react'
import Telemetry1 from './Telemetry1'


import GraphPanel from './GraphPanel'



export default function TrackRender(props) {
    // comment this thing!!!
    //initialise variables so it doesnt break before loading file

    const canvasRef=useRef(null)
    const canvasLayer2Ref=useRef(null)
    const progressSlider=useRef()

    const [currentData,updateCurrentData]=useState([])
   
    const [playbackStatus,setPlaybackStatus]=useState(false)
    const [playbackProgress, setPlaybackProgress] = useState()
    const [loading,completeLoading] = useState(true)
    const [playbackSpeed,setPlaybackSpeed] = useState(1)
    const [raceStart,setRaceStart] = useState()
    const [dataMetrics,setDataMetrics] = useState()
    const [layoutSettings,setLayoutSettings] = useState({  })
    const [trackSettings,setTrackSettings] = useState(4000)

    useEffect(()=>{
      if (props.data.length>0){
        setDataMetrics(Object.keys(props.data[0]))
      }
    },[props.data])
   
    useEffect(()=>{
      setLayoutSettings(dataMetrics)
     
    },[dataMetrics])



    function handleRaceStart(e) {
      setRaceStart(playbackProgress)
      console.log(raceStart)
    }

    function handle1xPlaybackSpeed(e) {
      setPlaybackSpeed(300)
    }

    function handle10xPlaybackSpeed(e) {
      setPlaybackSpeed(30)
    }

    function handle100xPlaybackSpeed(e) {
      setPlaybackSpeed(1)
    }

    function handleGoToStart(e){
      setPlaybackProgress(raceStart)
      updateCurrentData(props.data[playbackProgress])
    }


    function convertTimestamp(timestamp){
      const date = new Date(Number(timestamp))
  
      return date.toLocaleString()
  }

    // When progress slider changed, should change the current point to whatever that is and play.
    function handleSeekChange(event) {
      if (props.data[0]) {
        const index = Math.floor(event.target.value/1000 *props.data.length)
        // I think this line might disable the playing
        //setPlaybackStatus(false)
        if (props.data[index]) {
          updateCurrentData(props.data[index])
          setPlaybackProgress(index)
        }
        
      }
    }

    // Toggle play/pause state
    function handlePlayPause(event) {
      if (playbackStatus==true) {
        // Pause
        setPlaybackStatus(false)
        console.log(progressSlider)
        
        
      } else {
        // Play
        setPlaybackStatus(true,playThrough())
      }
    }

    // Show Play/Pause in button depending on state
   function showPlayPauseButton() {
    if (playbackStatus) {
      return <span>Pause</span>
    } else {
      return <span>Play</span>
    }
   }
  
   // this block doesnt work - rethink
   // setState doesnt update immediately so it doesnt take the playbackStatus value correctly. 
   // for same reason it only takes the playbackProgress of when it was initiated, doesnt update and read next value each time.
    function playThrough(){
      console.log(playbackStatus)
      const playingInterval = setInterval(function(){
        if (playbackStatus) {
          clearInterval(playingInterval)
        }

        if (playbackProgress < props.data.length) {
          updateCurrentData(props.data[playbackProgress+1])
          setPlaybackProgress(playbackProgress+1)
        }
      },playbackSpeed)
      
      
    }

    // Do initial render of track
    const drawTrack = (ctx,canvas,data) => {
        // variable to choose initial render speed
    
        ctx.fillStyle='#b4c0be'
        // make sure it doesnt try draw when no data
        if (props.data.length>0) {
        // initial data point 
        const originCoords = [(canvas.width/2+data[0]["renderX"]*canvas.width),(canvas.height/2-data[0]["renderY"]*canvas.height)]
        // move cursor to initial point,
        ctx.moveTo(originCoords[0],originCoords[1])
        data.filter(item=>item["Distance (m)"]<trackSettings)
        .forEach(function(item,index) {
          //setTimeout(function(){
          updateCurrentData(item)
          setPlaybackProgress(index)
        
          const coords = [(canvas.width/2+item["renderX"]*canvas.width),(canvas.height/2-item["renderY"]*canvas.height)]
          ctx.lineTo(coords[0],[coords[1]])
          ctx.stroke()
          
        //},playbackSpeed*index);
        //return () => clearTimeout()
        })
        
        //setTimeout(function(){
          updateCurrentData(data[0])
          setPlaybackProgress(0)
          completeLoading(false)
        //},playbackSpeed*data.length)
        
      } 
    }

    
    // draw dot where current position is function
    const drawCurrentPos = (ctx2,canvas2,item) => {
      
      const coords2 = [(canvas2.width/2+item["renderX"]*canvas2.width),(canvas2.height/2-item["renderY"]*canvas2.height)]
      ctx2.fillStyle='#009578'
      ctx2.fillRect(coords2[0]-10,coords2[1]-10,20,20)
    }
    // only rerender dot and update the telemetry. leave the outline of the track to just render once.



    // When current data changes, redraw the cars position on top canvas.
    useEffect(()=> {
     
      const canvas2=canvasLayer2Ref.current
      const context2=canvas2.getContext('2d')
      canvas2.style.height = canvas2.height/window.devicePixelRatio + "px"
      canvas2.style.width = canvas2.width/window.devicePixelRatio + "px"
      context2.clearRect(0, 0, canvas2.width, canvas2.height)
      drawCurrentPos(context2,canvas2,currentData)
    },[currentData])



 
    // Draw track initially
    useEffect(()=> {
        const canvas=canvasRef.current
        const context=canvas.getContext('2d')
        canvas.style.height = canvas.height/window.devicePixelRatio + "px"
        canvas.style.width = canvas.width/window.devicePixelRatio + "px"
        // Draw 
        context.clearRect(0, 0, canvas.width, canvas.height)
        drawTrack(context,canvas,props.data)
        
    },[props.data])




     // Make new array of data with reduced sample rate for loading in to graph to improve redraw time
     const reducedSampleRateData = (data,n) => {
      let resized = []
      data.forEach(function callback(v,i) {
          if (i % n === 0) {
              resized.push(v)
          }
      })
      return resized
  } 


    const DataSettingsComponent = ({dataMetrics}) => (
      <form class="form">
        <div class="row">
          <div class="col text-center">Name</div>
          <div class="col text-center">Graph</div>
          <div class="col text-center">Gauge</div>
          
        </div>

        {dataMetrics.map(metric => (
          <div class="row form-group">
            <div class="col d-flex justify-content-center">{metric}</div>

            <div class="col form-check-inline d-flex justify-content-center">
              <input name={metric} type="checkbox" />
            </div>

            <div class="col form-check-inline d-flex justify-content-center">
              <input name={metric} type="checkbox" defaultChecked={true}/>
            </div>
            
          </div>
        ))}
      </form>
    )


  return (
    <>
    <div class="container-fluid">
      <div class="row top-row">
       <div class="col-4 render-container">
          <div class="renderCanvases">
            <canvas class="render-layer1" ref={canvasRef}  {...props} width="500" height="500"/> 
            <canvas class="render-layer2" ref={canvasLayer2Ref} {...props} width="500" height="500"/>
          </div>
        </div>
        <div class="col-2">
          {loading && <h3>File not loaded...</h3>}
        
          <button type="button" class="btn btn-outline-primary btn-block livetelembutton" data-toggle="modal" data-target="#settingsModalCenter">Settings</button>
        </div>

        <div class="modal fade" id="settingsModalCenter" tabindex="-1" role="dialog" aria-labelledby="settingsModalTitle" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-center" id="settingsModalLongTitle">Settings</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <button class="btn btn-outline-primary btn-block">Create free account to save setup between sessions</button>
                <button class="btn btn-primary btn-block">Save settings</button>
                <br></br>

                <h5>Map</h5>
                <input id="settingsMapDraw" name="mapSettings" type="radio" value="draw" />
                <label for="settingsMapDraw">Drawn path</label>
                <br></br>
                <input id="settingsMapRender" name="mapSettings" type="radio" value="render" />
                <label for="settingsMapRender">Map marker</label>

                <h5></h5>

                <h5>Select Data</h5>
                {dataMetrics && <DataSettingsComponent dataMetrics={dataMetrics}/>}
                {!dataMetrics && <p>No file loaded...</p>}
              </div> 
            </div>
          </div>
        </div>


        <div class="col-6 card">
          <div class="row">
             
              
              <GraphPanel data={reducedSampleRateData(props.data,100)} progress={playbackProgress/100} raceStart={raceStart/100}/>
          </div>
            <div class="seeking-container">
              <label for="seek">{convertTimestamp(currentData.timestamp)}</label>
              <div class="slidecontainer">
                <input type="range" id="seek" class="slider" name="seek" ref={progressSlider} onChange={handleSeekChange} value={playbackProgress/props.data.length*1000} min="0" max="1000" disabled={loading}/>
              </div>
              <button disabled={loading} onClick={handlePlayPause}>{showPlayPauseButton()}</button>
              <button disabled={loading} onClick={handleRaceStart}>Set start</button>
              <button disabled={loading} onClick={handleGoToStart}>Go to start</button>
              <button disabled={loading} onClick={handle1xPlaybackSpeed}>1x</button>
              <button disabled={loading} onClick={handle10xPlaybackSpeed}>10x</button>
              <button disabled={loading} onClick={handle100xPlaybackSpeed}>100x</button>
            </div>
          </div>
        
        </div>
        
        <div class="row">
          <div class="bottom-panel">
            <div class="col"><Telemetry1 telemetry={currentData} raceStart={raceStart}/></div>
            
            </div>
        </div>
      </div>
  
    </>
  )
}

//     function findBasicToggle() {
//  return true
//}

//function findBasicUpper() {
//    return 10/
//}

//function findBasicLower() {
//    return 0/
//}

//const defaultSettings = dataMetrics.map(elem => (
//  {
//  key:elem,
//  enabled:findBasicToggle(),
//  upper:findBasicUpper(),
//  lower:findBasicLower()
//}))