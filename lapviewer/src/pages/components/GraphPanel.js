import React, { useState, useEffect }from 'react'
import { LineChart,Legend, Line, CartesianGrid,XAxis,YAxis,ReferenceLine } from 'recharts'



export default function GraphPanel(props) {
  
  const [graphShow,setGraphShow] = useState(
    {
      inputThrottle:true,
      volts:false,
      auxVolts:true,
      amps:true,
      ampHours:true,
      motorSpeed:true,
      speed:false,
      distance:true,
      temp1:true,
      temp2:true,
      gearRatio:true,
      gear:true,
    })

  const [progress,setProgress] = useState()

  useEffect(() => {
    setProgress(props.progress)
  }, [props.progress,progress])
  

  function handleClick(e) {
   console.log(e)
    switch (e.dataKey) {
      // INPUT THROTTLE
      case 'Input throttle (%)':
        if (graphShow.inputThrottle == true) {
          graphShow.inputThrottle=false
          setGraphShow(graphShow)
        } else {
          graphShow.inputThrottle=true
          setGraphShow(graphShow)
        }
        break;
      // VOLTS
      case 'Volts (V)':
        if (graphShow.volts == true) {
          graphShow.volts=false
          setGraphShow(graphShow)
        } else {
          graphShow.volts=true
          setGraphShow(graphShow)
        }
        break;
        // AUX VOLTS
      case 'Aux volts (V)':
        if (graphShow.auxVolts == true) {
          graphShow.auxVolts=false
          setGraphShow(graphShow)
        } else {
          graphShow.auxVolts=true
          setGraphShow(graphShow)
        }
        break;
      case 'Amps (A)':
        if (graphShow.amps == true) {
          graphShow.amps=false
          setGraphShow(graphShow)
        } else {
          graphShow.amps=true
          setGraphShow(graphShow)
        }
        break;
      case 'Amp hours (Ah)':
        if (graphShow.ampHours == true) {
          graphShow.ampHours=false
          setGraphShow(graphShow)
        } else {
          graphShow.ampHours=true
          setGraphShow(graphShow)
        }
        break;
      case 'Motor speed (RPM)':
        if (graphShow.motorSpeed == true) {
          graphShow.motorSpeed=false
          setGraphShow(graphShow)
        } else {
          graphShow.motorSpeed=true
          setGraphShow(graphShow)
        }
        break;
      case 'Speed (m/s)':
        if (graphShow.speed == true) {
          graphShow.speed=false
          setGraphShow(graphShow)
        } else {
          graphShow.speed=true
          setGraphShow(graphShow)
        }
        break;
      case 'Distance (m)':
        if (graphShow.distance == true) {
          graphShow.distance=false
          setGraphShow(graphShow)
        } else {
          graphShow.distance=true
          setGraphShow(graphShow)
        }
        break;
      case 'Temp1 (C)':
        if (graphShow.temp1 == true) {
          graphShow.temp1=false
          setGraphShow(graphShow)
        } else {
          graphShow.temp1=true
          setGraphShow(graphShow)
        }
        break;
      case 'Temp2 (C)':
        if (graphShow.temp2 == true) {
          graphShow.temp2=false
          setGraphShow(graphShow)
        } else {
          graphShow.temp2=true
          setGraphShow(graphShow)
        }
        break;
      case 'Gear ratio':
        if (graphShow.gearRatio == true) {
          graphShow.gearRatio=false
          setGraphShow(graphShow)
        } else {
          graphShow.gearRatio=true
          setGraphShow(graphShow)
        }
        break;
      case 'Gear':
        if (graphShow.gear == true) {
          graphShow.gear=false
          setGraphShow(graphShow)
        } else {
          graphShow.gear=true
          setGraphShow(graphShow)
        }

      }
      if (progress==0) {
        setProgress(1)
      } else {
        setProgress(0)
      }
      
     
  }
   


  return (
    <>
    <LineChart width={880} height={400} data={props.data}>
        <Line type="monotone" dataKey="Input throttle (%)" stroke="blue" dot={false} isAnimationActive={false} hide={graphShow.inputThrottle}/>
        <Line type="monotone" dataKey="Volts (V)" stroke="#231651" dot={false}  isAnimationActive={false}  hide={graphShow.volts}/>
        <Line type="monotone" dataKey="Aux volts (V)" stroke="#4DCCBD" dot={false} isAnimationActive={false} hide={graphShow.auxVolts}/>
        <Line type="monotone" dataKey="Amps (A)" stroke="#2374AB" dot={false} isAnimationActive={false} hide={graphShow.amps}/>
        <Line type="monotone" dataKey="Amp hours (Ah)" stroke="#FF8484" dot={false} isAnimationActive={false} hide={graphShow.ampHours}/>
        <Line type="monotone" dataKey="Motor speed (RPM)" stroke="#380036" dot={false} isAnimationActive={false} hide={graphShow.motorSpeed}/>
        <Line type="monotone" dataKey="Speed (m/s)" stroke="#FF9B71" dot={false} isAnimationActive={false} hide={graphShow.speed}/>
        <Line type="monotone" dataKey="Distance (m)" stroke="#40C9A2" dot={false} isAnimationActive={false} hide={graphShow.distance}/>
        <Line type="monotone" dataKey="Temp1 (C)" stroke="#2F9C95" dot={false} isAnimationActive={false} hide={graphShow.temp1}/>
        <Line type="monotone" dataKey="Temp2 (C)" stroke="#ACC12F" dot={false} isAnimationActive={false} hide={graphShow.temp2}/>
        <Line type="monotone" dataKey="Gear ratio" stroke="#82ca9d" dot={false} isAnimationActive={false} hide={graphShow.gearRatio}/>
        <Line type="monotone" dataKey="Gear" stroke="#A1869E" dot={false} isAnimationActive={false} hide={graphShow.gear}/>

        
        <CartesianGrid stroke='#ccc' />
        <ReferenceLine  x={Math.floor(progress)} stroke="red" />
        <ReferenceLine x={Math.floor(props.raceStart)} stroke="black" />
        <Legend verticalAlign="bottom" height={36} onClick={handleClick}/>
        <XAxis/>
        <YAxis type='number' domain={[0,'dataMax']} allowDataOverflow={false}/>
    </LineChart>
    </>
  )
}
