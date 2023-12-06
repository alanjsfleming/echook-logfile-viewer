import React, { useEffect, useState, useRef } from 'react'
import Papa from 'papaparse'
import TrackRender from './TrackRender';

import { GetAccessMenu } from './MenuBar';

export default function FileUpload(props) {
    const [dataPoints,changeDataPoints] = useState([])
    const [fileSelected,setFileSelected] = useState(false)
    const [renderScale,setRenderScale] = useState(40)
    const [modalShow,setModalShow] = useState(true)
    const [formProgress,setFormProgress] = useState("0%")
    const [uploadedFileName,setUploadedFileName] = useState()
    const [setupData,setSetupData] = useState({
        carName:'My Car',
        carAmpHours:30,
        trackDistance:4000
    })

    const fileUploadRef = useRef()
    const trackDistanceFieldRef = useRef()

    function handleChangeSetupData(e) {
        console.log(setupData)
        const field = e.target.name
        const value = e.target.value
        console.log(field)
        switch(field){
            case 'carName':
                setSetupData(prevSetupData => ({
                    ...prevSetupData,
                    carName:value
                }))
                break
            case 'carAmpHours':
                setSetupData(prevSetupData => ({
                    ...prevSetupData,
                    carAmpHours:value
                }))
                break
            case 'trackDistanceSelect':
                trackDistanceFieldRef.current.value=''
                setSetupData(prevSetupData => ({
                    ...prevSetupData,
                    trackDistance:value
                }))
                break
            case 'trackDistance':
                setSetupData(prevSetupData => ({
                    ...prevSetupData,
                    trackDistance:value
                }))

        }
    }

    function handleUploadFormNext(e) {
        switch (formProgress) {
            case "0%":
                setFormProgress("50%")
                break
            case "50%":
                setFormProgress("100%")
        }
    }

    function handleUploadFormBack(e) {
        switch (formProgress) {
            case "100%":
                setFormProgress("50%")
                break
            case "50%":
                setFormProgress("0%")
                break
        }
    }

    function handleUploadFormSubmit(e) {
        setFormProgress("100%")
        setTimeout(function(){changeHandler(fileUploadRef.current.files)},400)
    }

    function fileUploaded(event) {
        setUploadedFileName(event.target.value.split("\\").at(-1))
    }

    // Changes scale parameter
    function handleChangeScale(event){
        setRenderScale(event.target.value)
        console.log(renderScale)
    }

    // function to parse csv file and returns json object.
    const changeHandler = (f) => {
        setFileSelected(true)
        setModalShow(false)
        Papa.parse(f[0], {
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

    function hasDataPoints() {
        if (dataPoints.length>0) {
            return true
        } else {
            return false
        }
    }

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
            const scale = renderScale
        
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
    <div class={"modal fade fullscreen-modal"  + (modalShow && " show d-block")} id="fileUploadModalCenter" tabindex="-1" role="dialog" aria-labelledby="fileUploadModalTitle" aria-hidden={!modalShow}>
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <GetAccessMenu />
                <div class="card w-50 text-center m-auto">
              
                    <div class="uploadFormContent">
                       
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width:formProgress}} aria-valuenow={formProgress} aria-valuemin="0" aria-valuemax="3"></div>
                            </div>
                            <br></br>
                            <h1>Start</h1>
                            <br></br>
                         
                            <div class="tab" hidden={!(formProgress==="0%")}>
                                <h5>Car setup:</h5>
                                <div class="form-group">
                                    <label for="carName">Car name:</label>
                                    <input type="text" onChange={handleChangeSetupData} class="form-control text-center" id="carName" name="carName" defaultValue="My Car" placeholder="My Car" />
                                </div>
                                <div class="form-group">
                                    <label for="carAmpHours">Battery Capacity (Ah):</label>
                                    <input type="number" onChange={handleChangeSetupData} class="form-control text-center" id="carAmpHours" name="carAmpHours" defaultValue="30" />
                                </div>

                                <h5>eChook Logfile:</h5>
                                <div class="form-group">
                                <p>File:</p>
                                    <label class={(uploadedFileName) ? "custom-file btn-outline-primary btn" : "custom-file btn-primary btn"} for="fileUpload">
                                
                                        <input type="file" id="fileUpload" name="fileUpload" ref={fileUploadRef} accept=".csv" onChange={fileUploaded} />
                                        {(uploadedFileName) ? uploadedFileName : 'Select File'}
                                    </label>
                                </div>
                            </div>
                    
                            

                           

                        </div>
                   
                    <br></br>
                        <div class="btn-group">
                           
                            <button onClick={handleUploadFormSubmit} disabled={!uploadedFileName} class={(uploadedFileName) ? "btn btn-primary col-12" : "btn btn-outline-primary col-12"}>Analyse</button>
                        </div>
                        
                  
              

                <div class="parameters" hidden>

                    <label for="scale">Render scale (40 recommended): {renderScale} </label>
                    <input type="range" id="scale" name="scale" defaultValue={40} onChange={handleChangeScale} min="1" max="50"/>
                    <br></br>               
                </div>
                </div>
              </div> 
            </div>
          </div>
        </div>



    
        

    {!hasDataPoints() && <h3 class="text-center loading-screen">analysing file...</h3>}
    {hasDataPoints() && <TrackRender id="trackCanvas" data={dataPoints} setupData={setupData} />}
    </>
  )
}

/*
 <div class="form-group">
                                    <p>Sampling Rate:</p>
                                    <label for="samplingRate">Sampling Rate:</label>
                                    <input type="number" id="samplingRate" name="samplingRate" onChange={handleSampleRateChange} class="form-control text-center" defaultValue={100} />
                                </div>
                                function handleSampleRateChange(e) {
        setSampleDownscale(e.target.value)
    }*/

    /*
    <div class="tab" hidden={!(formProgress==="50%")}>
                                <h5>Track setup:</h5>
                                <div class="form-group">
                                    <label for="trackDistanceSelect">Track:</label>
                                    <select class="form-control text-center" onChange={handleChangeSetupData} name="trackDistanceSelect">
                                        <option value="2478">Aintree</option>
                                        <option value="418">Alford</option>
                                        <option value="1287">Anglesea</option>
                                        <option value="2350">Aragon</option>
                                        <option value="3700">Barber Motor Sports Park</option>
                                        <option value="1979">Bedford</option>
                                        <option value="1287">Blyton Park</option>
                                        <option value="1232">Cartagena</option>
                                        <option value="2977">Castle Combe</option>
                                        <option value="660">Chambers County</option>
                                        <option value="610">Chattanooga GP</option>
                                        <option value="1610">Choccolocco Green Prix</option>
                                        <option value="1851">Croft</option>
                                        <option value="1070">Columbus GP</option>
                                        <option value="1110">Divers Power Grand Prix</option>
                                        <option value="1255">Dunsfold</option>
                                        <option value="1834">East Fortune</option>
                                        <option value="1642">Ford Dunton</option>
                                        <option value="3862">Goodwood</option>
                                        <option value="1690">Grissom</option>
                                        <option value="3492">Hethel</option>
                                        <option value="1610">Jemison Toyota Classic</option>
                                        <option value="1609">Mallory Park</option>
                                        <option value="1130">MSR Houston</option>
                                        <option value="2639">Navarra</option>
                                        <option value="2414">Predannack</option>
                                        <option value="2639">Silverstone</option>
                                        <option value="2200">Talladega</option>
                                    </select>
                                    <br></br>
                                    <input ref={trackDistanceFieldRef} type="number" class="form-control text-center" id="trackDistance" onChange={handleChangeSetupData} name="trackDistance" placeholder={setupData.trackDistance + "m ( or enter custom track length )"} />
                                </div>
                            </div>*/