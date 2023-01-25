import React, { useContext, useState } from 'react'

const RaceContext = React.createContext()

export function useRace() {
    return useContext(RaceContext)
}

export function RaceProvider({children}) {
    const [currentData,setCurrentData] = useState()
    const [settings,setSettings] = useState()
    const [playback,setPlayback] = useState(true)
    const [loading,setLoading] = useState(true)
    const [progress,setCurrentProgress] = useState()

    function play() {
        return setPlayback(true)
    }

    function pause() {
        return setPlayback(false)
    }

    function updatesettings(newSettings) {
        setSettings(newSettings)
    }

    function completeloading(){
        setLoading(false)
    }

    function updateplayback(data){
        return setCurrentData(data)
    }

    function updateprogress(i){
        return setCurrentProgress(i)
    }

    function incrementprogress(){
        return setCurrentProgress(progress+1)
    }

    const value={
        currentData,
        settings,
        playback,
        loading,
        progress,
        play,
        pause,
        updateprogress,
        updateplayback,
        completeloading,
        incrementprogress

    }

    return (
        <RaceContext.Provider value={value}>
            {children}
        </RaceContext.Provider>
    )
}