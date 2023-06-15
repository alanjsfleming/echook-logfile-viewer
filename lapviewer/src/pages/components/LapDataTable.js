import React, { useEffect } from 'react'
import { elapsedTimeIntoString } from '../../utils/TimeFunctions'
import distance from '../../utils/DistanceBetweenGPSPoints'
import StandardDeviationOfArray from '../../utils/StandardDeviationOfArray'
import DriverSummary from './DriverSummary'

export default function LapDataTable({allData,playbackProgress,raceStart}) {

    const [lapData, setLapData] = React.useState([])
    const [lapStarts, setLapStarts] = React.useState([])
    const [estimatedPitStopTime,setEstimatedPitStopTime] = React.useState(0)

    const [startingLine, setStartingLine] = React.useState({lat: 0, lng: 0})

    const [lapAveragesTableExpanded, setLapAveragesTableExpanded] = React.useState(true)
    // Function that loops through all data and finds the indices of the start of each lap when the location is within 10 meters of the start/finish line.
    
    function handleSetStartingLine() {
        const startingLineCoords = {lat: allData[playbackProgress]["Latitude (deg)"], lng: allData[playbackProgress]["Longitude (deg)"]}
        setStartingLine(startingLineCoords)
        console.log(startingLineCoords)
        let tempLapStarts = []
        let tempOnLine = false
        for (var i = 0; i < allData.length; i++) {
            if (distance(startingLineCoords.lat,allData[i]["Latitude (deg)"],startingLineCoords.lng,allData[i]["Longitude (deg)"])<0.01) {
                if (tempOnLine === false && i > raceStart) {
                    tempLapStarts.push(i)
                    tempOnLine = true
                }
            } else {
                tempOnLine = false
            
            }
        }
        setLapStarts(tempLapStarts)
    }  



    function filterSeparateLaps() {
        console.log("here")
        console.log(allData,lapStarts)
        let lapDataArrays = [];
        for (var i = 0; i < lapStarts.length - 1; i++) {
          lapDataArrays.push(allData.slice(lapStarts[i], lapStarts[i + 1]));
        }
        return lapDataArrays;
      }

      function calculateAverageValue(array){
        let total = 0
        let count = 0
        array.forEach(function(item,index){
            total+=parseInt(item);
            count++
        })
        return total/count
    }

  

    function handlePopulateTable() {
        calculateAllLapData(filterSeparateLaps())
    }
  
      function handleClearLapStarts() {
        setLapStarts([])
        setLapData()
      }

    function calculateAllLapData(lapDataArrays) {
        // For each lap, find the average of V1, A, and Speed
        if (lapDataArrays.length === 0) {
            return
        }
        const averages = lapDataArrays.map((lapDataArray,index) => {
            return {
                num:index+1,
                time:elapsedTimeIntoString(lapDataArray.at(-1)["timestamp"]-lapDataArray[0]["timestamp"]),
                elapsedTimestamp:lapDataArray.at(-1)["timestamp"]-lapDataArray[0]["timestamp"],
                AH:((lapDataArray[0]["Amp hours (Ah)"])) ? Math.round((lapDataArray.at(-1)["Amp hours (Ah)"]-lapDataArray[0]["Amp hours (Ah)"])*10)/10 : "-",
                aV1:Math.round(calculateAverageValue(lapDataArray.map(data=>data["Aux volts (V)"]))*10)/10,
                aA:Math.round(calculateAverageValue(lapDataArray.map(data=>data["Amps (A)"]))*10)/10,
                aT1:Math.round(calculateAverageValue(lapDataArray.map(data=>data["Temp1 (C)"]))*10)/10,
                aT2:Math.round(calculateAverageValue(lapDataArray.map(data=>data["Temp2 (C)"]))*10)/10,
                // The 2.237 is to convert from m/s to mph
                aSpd:Math.round(calculateAverageValue(lapDataArray.map(data=>data["Speed (m/s)"]*2.237))*10)/10
            }
        }) 
        console.log(averages)
        let stdDeviationTimes = StandardDeviationOfArray(averages.map(lap=>lap.elapsedTimestamp))
     
        
        let total = 0
        let count = 0
        averages.map(lap=>lap.elapsedTimestamp).forEach(function(item,index){
            total+=parseInt(item);
            count++
        })
        let average = total/count

        setEstimatedPitStopTime(average+stdDeviationTimes)
        // Return an array of objects, each containing the average data for each lap
        setLapData(averages)
    }



    const LapComponent = () => (
        <table class="table table-striped text-center table-hover">
            <thead>
                <tr>
                    <th scope="col">Lap #</th>
                    <th scope="col">Time </th>
                    <th scope="col">AH</th>
                    <th scope="col">aV1</th>
                    <th scope="col">aA</th>
                    <th scope="col">aT1</th>
                    <th scope="col">aT2</th>
                    <th scope="col">aSpeed (mph)</th>
                </tr>
            </thead>
            <tbody>
                {
                
                lapData?.length>0 ? lapData.map((lap,index)=>(
                    <tr className={(lap.elapsedTimestamp > estimatedPitStopTime) ? "table-warning" : undefined}>
                        <th scope="row">{lap.num}</th>
                        <td>{lap.time}</td>
                        <td>{lap.AH}</td>
                        <td>{lap.aV1}</td>
                        <td>{lap.aA}</td>
                        <td>{lap.aT1}</td>
                        <td>{lap.aT2}</td>
                        <td>{lap.aSpd}</td>
                        
                    </tr>
                )) : <tr>
                        <th colSpan="8" scope="row">No Data...</th>   
                    </tr>}
            </tbody>
    
        </table>
    )

  return (
    <>
    <hr></hr>
    <DriverSummary lapData={lapData}/>
    <h2 className="text-center">Lap Data</h2>
    {lapStarts.length>0 && <p>Ready</p>}
    <div class="btn-group my-1">
        <button className="btn btn-primary" onClick={handleClearLapStarts}>Clear Laps</button>
        <button className="btn btn-primary"onClick={handleSetStartingLine}>Set Starting Line at Current Location</button>
        <button className="btn btn-primary" onClick={handlePopulateTable}>Calculate Laps</button>
      
    </div>
    
    <LapComponent />

    
    </>
  ) 
}

//  <DriverSummary lapData={lapData} hidden/>