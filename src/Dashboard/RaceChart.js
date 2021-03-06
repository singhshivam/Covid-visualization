import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import * as d3 from 'd3'


class RaceChart extends React.Component {
    constructor(props) {
        super(props)

        const margin = { top: 20, right: 30, bottom: 40, left: 100 }
        const width = 960 - margin.left - margin.right
        const height = 400 - margin.top - margin.bottom
        const leftPadding = 5

        this.state = {
            data: {},
            margin: margin,
            width: width,
            height: height,
            leftPadding: leftPadding,
            colorMap: {}
        }
        this.fetchCSV = this.fetchCSV.bind(this)
        this.prepareData = this.prepareData.bind(this)
        this.drawChart = this.drawChart.bind(this)
        this.drawXAxis = this.drawXAxis.bind(this)
        this.drawBars = this.drawBars.bind(this)
        this.restartGraph = this.restartGraph.bind(this)
    }

    componentDidMount() {
        this.fetchCSV()
    }

    fetchCSV() {
        d3.csv(`${window.appURL}/animated.csv`)
            .then(res => {
                const { height, width, margin } = this.state
                let data = this.prepareData(res)
                let colorMap = {}
                res.forEach((d) => {
                    colorMap[d.Country] = d3.hsl(Math.random() * 360, 0.75, 0.75)
                })
                const svg = d3.select('.chart').append('svg')
                    .attr('width', '100%')
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`)
                this.setState({ data: data, colorMap: colorMap, svg: svg })
                this.drawChart()
            })
    }

    prepareData(data) {
        let isDate = (date) => {
            return (new Date(date) !== "Invalid Date" && !isNaN(new Date(date))) ? true : false
        }
        return data.reduce((accumulator, d) => {
            Object.keys(d).forEach((k) => {
                if (!isDate(k)) { return; }
                let value = +d[k]
                const newEntry = {
                    value,
                    geoName: d.Country,
                }
                if (accumulator[k]) {
                    accumulator[k].push(newEntry)
                } else {
                    accumulator[k] = [newEntry]
                }
            })
            return accumulator
        }, {})
    }

    removeGeoAreasWithNoData(data) {
        return data.filter(d => d.value)
    }

    xAccessor(d) {
        return d.value
    }

    yAccessor(d) {
        return d.geoName
    }

    delay(d, i) {
        return i * 5
    }

    sortData(data = []) {
        return data.sort((a, b) => b.value - a.value)
    }

    drawXAxis(el, data, t, xScale) {
        const { leftPadding, height } = this.state
        let axis = el.select('.axis--x')
        if (axis.empty()) {
            axis = el.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', `translate(${leftPadding},${height})`)
        }
        axis.transition(t)
            .call(d3.axisBottom(xScale))
            .selectAll('g')
            .delay(this.delay)
    }

    drawYAxis(el, data, t, yScale) {
        let axis = el.select('.axis--y')
        if (axis.empty()) {
            axis = el.append('g')
                .attr('class', 'axis axis--y')
        }

        axis.transition(t)
            .call(d3.axisLeft(yScale))
            .selectAll('g')
            .delay(this.delay)
    }

    drawBars(el, data, t, xScale, yScale) {
        const { leftPadding, colorMap } = this.state
        let barsG = el.select('.bars-g')
        if (barsG.empty()) {
            barsG = el.append('g')
                .attr('class', 'bars-g')
        }
        const bars = barsG
            .selectAll('.bar')
            .data(data, this.yAccessor)
        bars.exit()
            .remove()
        bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', leftPadding)
            .merge(bars).transition(t)
            .attr('y', d => yScale(this.yAccessor(d)))
            .attr('width', d => xScale(this.xAccessor(d)))
            .attr('height', yScale.bandwidth())
            .style('fill', d => colorMap[d.geoName])
            .delay(this.delay)
    }


    drawChart() {
        const { data, height, width, margin, svg } = this.state
        if (!svg) { return }
        const years = Object.keys(data).map(d => d)
        const lastYear = years[years.length - 1]

        svg.selectAll("*").remove()

        let startIndex = 0
        let startYear = years[0]
        let selectedData = this.removeGeoAreasWithNoData(this.sortData(data[startYear])).slice(0, 10)
        let xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(selectedData.map(d => d.value))])

        let yScale = d3.scaleBand()
            .domain(d3.range(11))
            .rangeRound([0, height])
            .padding(0.1)
        let geoAreas = selectedData.map(this.yAccessor)

        d3.select('.year').text(startYear.slice(0, 10))

        yScale.domain(geoAreas)
        this.drawXAxis(svg, selectedData, undefined, xScale)
        this.drawYAxis(svg, selectedData, undefined, yScale)
        this.drawBars(svg, selectedData, undefined, xScale, yScale)
        const interval = d3.interval(() => {
            const t = d3.transition().duration(400)

            startIndex += 1
            selectedData = this.removeGeoAreasWithNoData(this.sortData(data[years[startIndex]])).slice(0, 10)

            d3.select('.year').text(years[startIndex].slice(0, 10))

            xScale.domain([0, d3.max(selectedData.map(d => d.value))])
            yScale.domain(selectedData.map(this.yAccessor))
            this.drawXAxis(svg, selectedData, t, xScale)
            this.drawYAxis(svg, selectedData, t, yScale)
            this.drawBars(svg, selectedData, t, xScale, yScale)

            if (years[startIndex] === lastYear) {
                interval.stop()
            }
        }, 500)
        this.setState({ interval: interval })

    }

    restartGraph() {
        const { interval } = this.state
        if (interval) {
            interval.stop()
            this.drawChart()
        }
    }

    render() {
        return (
            <Row>
                <Col md={12} xl={12}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                What is the total number of confirmed cases?
                            </h6>
                            <Row>
                                <Col md={12} xl={12}>
                                    <Col md={8} xl={8}>
                                        <h4 className="chart-title">Date: <span className="year"></span></h4>
                                    </Col>
                                    <Col md={4} xl={4}>
                                        <Button variant="outline-primary" onClick={this.restartGraph}>Restart</Button>{' '}
                                    </Col>
                                </Col>
                            </Row>
                            <div className="col-sm">
                            </div>
                            <div className="wrapper">
                                <div className="chart"></div>
                                <p className="source">Data source: The World Bank</p>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default RaceChart;