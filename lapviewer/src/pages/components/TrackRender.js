import React, {useRef,useEffect, useState} from 'react'
import Telemetry1 from './Telemetry1'
import Telemetry2 from './Telemetry2'
import { useRace } from '../../contexts/RaceContext'
import GraphPanel from './GraphPanel'
import Telemetry3 from './Telemetry3'

export default function TrackRender(props) {
    // comment this thing!!!
    //initialise variables so it doesnt break before loading file

    const canvasRef=useRef(null)
    const canvasLayer2Ref=useRef(null)

    const [currentData,updateCurrentData]=useState([])
    const [playbackStatus,setPlaybackStatus]=useState()
    const [playbackProgress, setPlaybackProgress] = useState()
    
    const { play, pause, playback,loading,updateprogress,updateplayback,completeloading } = useRace()

    function convertTimestamp(timestamp){
      const date = new Date(Number(timestamp))
  
      return date.toLocaleString()
  }

    // When progress slider changed, should change the current point to whatever that is and play.
    function handleSeekChange(event) {
      if (props.data[0]) {
        const index = Math.floor(event.target.value/100 *props.data.length)
        if (props.data[index]) {
          updateCurrentData(props.data[index])
        }
        
      }
    }

    function handlePlayPause(event) {
      if (playbackStatus==true) {
        setPlaybackStatus(false)
      } else {
        setPlaybackStatus(true)
      }
    }

    function playThrough(data,progress){
      updateCurrentData(data[progress])
    }
  


    // Do initial render of track
    const drawTrack = (ctx,canvas,data) => {
        // variable to choose initial render speed
        const renderDelay = 10
        ctx.fillstyle='#00000'
        // make sure it doesnt try draw when no data
        if (props.data.length>0) {
        // initial data point 
        const originCoords = [(canvas.width/2+data[0]["renderX"]*canvas.width),(canvas.height/2-data[0]["renderY"]*canvas.height)]
        // move cursor to initial point,
        ctx.moveTo(originCoords[0],originCoords[1])
        data.forEach(function(item,index,collection) {
          setTimeout(function(){
          updateCurrentData(item)
          setPlaybackProgress(index)
         
          const coords = [(canvas.width/2+item["renderX"]*canvas.width),(canvas.height/2-item["renderY"]*canvas.height)]
          ctx.lineTo(coords[0],[coords[1]])
          ctx.stroke()
        },renderDelay*index);
        return clearTimeout()
        })
        setTimeout(function(){completeloading()},renderDelay*data.length)
        
      } 
    }

    
    // draw dot where current position is function
    const drawCurrentPos = (ctx2,canvas2,item) => {
      
      const coords2 = [(canvas2.width/2+item["renderX"]*canvas2.width),(canvas2.height/2-item["renderY"]*canvas2.height)]
      ctx2.fillstyle='#FF0000'
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

  return (
    <>
    <div class="container-fluid">
      <div class="row">
       <div class="col-6">
          <canvas class="render-layer1" ref={canvasRef}  {...props} width="800" height="800"/> 
          <canvas class="render-layer2" ref={canvasLayer2Ref} {...props} width="800" height="800"/>
          
        </div>
        <div class="col-6">
          <div class="row">
             
              <div class="col"><Telemetry1 telemetry={currentData}/></div>
              <div class="col"><Telemetry2 telemetry={currentData}/></div>
              <div class="col"><Telemetry3 telemetry={currentData}/></div>
           
            </div>
            <div class="seeking-container">
              <label for="seek">0</label>
              <input type="range" id="seek" name="seek" onChange={handleSeekChange} default="0" disabled={loading}/>
              <button disabled={loading} onClick={handlePlayPause}>Pause | Play</button>
            </div>
          </div>
        
        </div>
        
        <div class="row">
          <div class="col-6">

          </div>
          <div class="col-6">
            <GraphPanel data={reducedSampleRateData(props.data,100)} progress={playbackProgress/100} />
          </div>
        </div>
      </div>
  
    </>
  )
}
