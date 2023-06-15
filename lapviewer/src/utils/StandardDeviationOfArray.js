import React from 'react'

export default function StandardDeviationOfArray(array) {
    let total = 0
    let count = 0
    array.forEach(function(item,index){
        total+=parseInt(item);
        count++
    })
    let average = total/count
    let totalOfDifferences = 0
    array.forEach(function(item,index){
        totalOfDifferences+=Math.pow((item-average),2)
    })
    let variance = totalOfDifferences/count
    let standardDeviation = Math.sqrt(variance)
    return standardDeviation
}
