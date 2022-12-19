import React, {useRef,useEffect, useState} from 'react'
import Telemetry from './Telemetry'

export default function TrackRender(props) {
    // comment this thing!!!
    const canvasRef=useRef(null)
    const canvasLayer2Ref=useRef(null)

    const [currentData,updateCurrentData]=useState([])


    const drawTrack = (ctx,canvas,data) => {
        ctx.fillstyle='#00000'
        // make sure it doesnt try draw when no data
        if (props.data.length>0) {
        // initial data point 
        const originCoords = [(canvas.width/2+data[0]["renderX"]*canvas.width),(canvas.height/2-data[0]["renderY"]*canvas.height)]
        // move cursor to initial point,
        ctx.moveTo(originCoords[0],originCoords[1])
        data.forEach(item => {setTimeout(
          function(){
          updateCurrentData(item)
          const coords = [(canvas.width/2+item["renderX"]*canvas.width),(canvas.height/2-item["renderY"]*canvas.height)]
          ctx.lineTo(coords[0],[coords[1]])
          ctx.stroke()
        },5)
        })
        // the set interval doesnt work because react doesnt like it!!
      }
    }

    // draw dot where current position is
    const drawCurrentPos = (ctx2,canvas2,item) => {
      
      const coords2 = [(canvas2.width/2+item["renderX"]*canvas2.width),(canvas2.height/2-item["renderY"]*canvas2.height)]
      ctx2.fillstyle='#FF0000'
      ctx2.fillRect(coords2[0]-10,coords2[1]-10,20,20)
    }

    useEffect(()=> {
      
      const canvas2=canvasLayer2Ref.current
      const context2=canvas2.getContext('2d')
      canvas2.style.height = canvas2.height/window.devicePixelRatio + "px"
      canvas2.style.width = canvas2.width/window.devicePixelRatio + "px"
      context2.clearRect(0, 0, canvas2.width, canvas2.height)
      drawCurrentPos(context2,canvas2,currentData)
    },[currentData])


    //const draw = (ctx,canvas) => {
    //    ctx.fillstyle='#00000'
    //    ctx.moveTo(canvas.width/2,canvas.height/2);
    //    ctx.lineTo(0,200);
    //    ctx.stroke();
    //}

 
    // draw updated track
    useEffect(()=> {
        const canvas=canvasRef.current
        const context=canvas.getContext('2d')
        canvas.style.height = canvas.height/window.devicePixelRatio + "px"
        canvas.style.width = canvas.width/window.devicePixelRatio + "px"
        // Draw 
        context.clearRect(0, 0, canvas.width, canvas.height)
        drawTrack(context,canvas,props.data)
    },[props.data])

  return (
    <>
    <div class="container-fluid">
      <div class="row">
       <div class="col-8">
          <canvas class="render-layer1" ref={canvasRef}  {...props} width="800" height="800"/> 
          <canvas class="render-layer2" ref={canvasLayer2Ref} {...props} width="800" height="800"/>
        </div>
        <div class="col-4">
        <div class="telemetry-container">
          <Telemetry telemetry={currentData}/>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}
