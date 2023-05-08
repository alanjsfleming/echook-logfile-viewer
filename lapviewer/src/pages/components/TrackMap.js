import React, {useEffect, useState} from 'react'
import { Map, Marker} from 'pigeon-maps'

// Should take lat, long coordinates and display location on map
export default function TrackMap(props) {

  const [coords,setCoords] = useState([0,0])
  const [center,setCenter] = useState([0,0])
  const [centerSet,setCenterSet] = useState(0)

  useEffect(() => {
    setCoords([parseFloat(props.currentData['Latitude (deg)']),parseFloat(props.currentData['Longitude (deg)'])])
    if (props.currentData && centerSet<2) {
      handleRecentre()
      setCenterSet(centerSet+1)
    }
  },[props.currentData])

  
  const renderMarker = (location) => {
    {console.log(location)}
    return (
      <Marker anchor={location} color="#009578" />
      
    )
  }
  
  function handleRecentre() {
    setCenter([parseFloat(props.currentData['Latitude (deg)']),parseFloat(props.currentData['Longitude (deg)'])])
    console.log("Hello")
  }

  return (
    <>
    <Map center={center} zoom={15} animate={false}>
      <Marker anchor={coords} color="#009578" width={50}/>
      <button class="btn btn-outline-dark" onClick={handleRecentre} >Centre on Car</button>
    </Map>
    
    </>
  )
}

// <Marker width={50} anchor={coords} color="#009578" />
