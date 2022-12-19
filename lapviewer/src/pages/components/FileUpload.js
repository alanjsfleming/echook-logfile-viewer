import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import TrackRender from './TrackRender';


export default function FileUpload(props) {
    const [dataPoints,changeDataPoints] = useState([])

    // function to parse csv file and returns json object.
    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header:true,
            skipEmptyLines:true,
            //preview:10,
            complete:function(results) {
                const origin=findOriginOfGraph(results.data)
                const furthest=findFurthestPoint(results.data,origin)
                const data = convertToRelative(results.data,origin,furthest)
                changeDataPoints(data)
                console.log(data,origin,furthest)
            }
        });  
    };

    useEffect(() => {
       
    },[dataPoints])

    // function to find the origin point of graph (average of coordinates)
    const findOriginOfGraph = (data) => {
        let totalX = 0
        let totalY = 0
        let n = 0
        // find the average coordinate
        data.forEach(item => {
            totalX+=parseFloat(item["Longitude (deg)"])
            totalY+=parseFloat(item["Latitude (deg)"])
            n+=1
        })
        // centre of the shape in gps frame of reference
        const originX = totalX/n
        const originY = totalY/n
        return [originX,originY]
    }

    // alternative function to find origin point of graph by finding the max and min x and y
    // [-0.7668425, 50.863862] 0.01697779915801719
    // This doesnt work, I think because its not liking negative numbers???
    const findMinMaxOfCoordinates = (data) => {
        const initialValueX = parseFloat(data[0]["Longitude (deg)"])
        const initialValueY = parseFloat(data[0]["Latitude (deg)"])

        let maxX = [initialValueX,initialValueY]
        let maxY = [initialValueX,initialValueY]
        let minX = [initialValueX,initialValueY]
        let minY = [initialValueX,initialValueY]
        data.forEach(item => {
            const x = parseFloat(item["Longitude (deg)"])
            const y = parseFloat(item["Latitude (deg)"])
            //console.log(x,y)
            // check if x > maxX
            if (x > maxX[0]) {
                maxX = [x,y]
            }
            // check if x < minX
            if (x < minX[0]) {
                minX = [x,y]
            }
            // check if y > maxY
            if (y > maxY[1]) {
                maxY = [x,y]
            }
            // check if y < minY
            if (y < minY[1]) {
                minY = [x,y]
            }
        })
        //console.log(maxX,maxY,minX,minY)
        // take average of maxX, maxY, minX, minY
        const originX = (maxX[0]+minX[0]+maxY[0]+minY[0])/4
        const originY = (maxX[1]+minX[1]+maxY[1]+minY[1])/4
        return [originX,originY]
    }

    // find furthest of the boundary points 
    const findFurthestBoundary = (data,origin) => {
        let furthestCoord = []
        let furthestDistance = 0
        data.forEach(item => {
        
        })
    }

    // function to find the furthest coordinate from the origin
    const findFurthestPoint = (data,origin) => {
        let furthestCoord = []
        let furthestDistance = 0
        data.forEach(item => {
            const itemX = parseFloat(item["Longitude (deg)"])
            const itemY = parseFloat(item["Latitude (deg)"])

            const dX = Math.abs(itemX-origin[0])
            const dY = Math.abs(itemY-origin[1])


            const distance = Math.hypot(dX,dY)

            if (distance>furthestDistance) {
                furthestCoord = [itemX,itemY]
                furthestDistance = distance
            }
        })
        return furthestDistance
    }

    // i know no longer think furthest is needed
    // function to convert gps coordinates to relative coordinates
    const convertToRelative = (data,origin,furthest) => {
        // find distance from origin
        data.forEach(item => {
            const itemX = parseFloat(item["Longitude (deg)"])
            const itemY = parseFloat(item["Latitude (deg)"])

            const dX = itemX-origin[0]
            const dY = itemY-origin[1]

            const distance = Math.hypot(dX,dY)
       
            // scale = distance/furthest (turns out its not because that warps it like a lens)
            const scale = props.renderParams['scale']
            console.log(dX,dY,distance,scale)
            
            // dX * scale = scaledX
            // dY * scale = scaledY
            const scaledX = dX * scale 
            const scaledY = dY * scale
            // write to the state
            
            item["renderX"] = scaledX
            item["renderY"] = scaledY
        }) 

        return data
    }

  return (
    <>
    <form>
        <label for="file">Upload eChook Logfile: </label>
        <input type="file" id="lapData" name="file" accept=".csv" onChange={changeHandler}/> 
    </form>
    <TrackRender id="trackCanvas" renderParams={props.renderParams} data={dataPoints}/>
    </>
  )
}