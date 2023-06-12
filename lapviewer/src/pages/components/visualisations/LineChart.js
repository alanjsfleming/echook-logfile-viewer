import { useD3 } from '../../../hooks/useD3.js'
import React from 'react'
import * as d3 from 'd3'

function LineChart({data}) {
    const ref = useD3(svg => {
        const height = 500
        const width = 500
        const margin = {top: 20, right: 30, bottom: 30, left: 40}
        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.V1))
            .range([margin.left, width - margin.right])
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.A)])
            .range([height - margin.bottom, margin.top])
        const xAxis = g => g
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        const yAxis = g => g
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select('.domain').remove())
        const line = d3.line()
            .defined(d => !isNaN(d.y))
            .x(d => x(d.V1))
            .y(d => y(d.A))
        svg.select('.x-axis').call(xAxis)
        svg.select('.y-axis').call(yAxis)
        svg.select('.line')
            .datum(data)
            .attr('d', line)
    }
    , [data.length])

    return (
        <svg

            ref={ref}
            style={{

                height: 500,
                width: '100%',
                marginRight: '0px',
                marginLeft: '0px',
            }}
        >
            <g className='x-axis' />
            <g className='y-axis' />
            <path
                className='line'
                style={{
                    fill: 'none',
                    stroke: 'steelblue',
                    strokeWidth: 1.5,
                }}
            />
        </svg>
    )
}

export default LineChart;