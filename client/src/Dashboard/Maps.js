import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import * as d3 from 'd3'
import d3Tip from "d3-tip"
import { sliderBottom } from 'd3-simple-slider'
//import topojson from 'topojson'

import Aux from "../hoc/_Aux";

class Maps extends React.Component {
    componentDidMount() {
        let getSlider = (data, datewiseHash, svg, sliderName, identifier) => {
            // Dates between two dates
            Date.prototype.addDays = function (days) {
                let date = new Date(this.valueOf())
                date.setDate(date.getDate() + days)
                return date
            }

            let getDates = (startDate, stopDate) => {
                let dateArray = new Array()
                let currentDate = startDate
                while (currentDate <= stopDate) {
                    dateArray.push(new Date(currentDate))
                    currentDate = currentDate.addDays(1)
                }
                return dateArray
            }

            let startDate = new Date(2019, 11, 31)
            let endDate = new Date(2020, 3, 22)
            let dateArr = getDates(startDate, endDate)

            let dateStr = (d) => {
                return d3.timeFormat('%b %-d, %Y')(d)
            }

            // Initialize CurrDate
            let currDate = d3.max(dateArr)

            // Fill
            let sliderFill = sliderBottom()
                .min(d3.min(dateArr))
                .max(d3.max(dateArr))
                .width(300)
                .tickFormat(d3.timeFormat('%b %-d, %Y'))
                .ticks(5)
                .default(d3.max(dateArr))
                .fill('#2196f3')
                .on('onchange', val => {
                    currDate = val
                    d3.select(`p#${sliderName}-value-fill`).text(dateStr(currDate))
                    plotConfirmedCases(data, datewiseHash, dateStr(currDate), svg, identifier)
                })
            let gFill = d3
                .select(`div#${sliderName}-slider-fill`)
                .append('svg')
                .attr('width', 500)
                .attr('height', 100)
                .append('g')
                .attr('transform', 'translate(30,30)')

            gFill.call(sliderFill)

            d3.select(`p#${sliderName}-value-fill`).text(d3.timeFormat('%b %-d, %Y')(sliderFill.value()))

            // initial call
            plotConfirmedCases(data, datewiseHash, dateStr(currDate), svg, identifier)

        }

        let format = d3.format(",")

        // Set SVGs and tooltips
        let casesTip = d3Tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function (d) {
                console.log(d)
                let cases = d.cases ? format(d.cases) : "Data unavailable"
                return "<strong>Country: </strong><span className='details'>"
                    + d.properties.name
                    + "<br></span>"
                    + "<strong>Cases: </strong><span className='details'>"
                    + cases
                    + "</span>"
            })

        let deathsTip = d3Tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function (d) {
                let cases = d.cases ? format(d.cases) : "Data unavailable"
                console.log('tips getting printed')
                return "<strong>Country: </strong><span className='details'>"
                    + d.properties.name
                    + "<br></span>"
                    + "<strong>Cases: </strong><span className='details'>"
                    + cases
                    + "</span>"
            })

        let margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom

        let color = d3.scaleThreshold()
            .domain([5, 10, 50, 100, 500, 1000, 2000, 5000])
            .range(["#FF9B54", "#E6854A", "#CD6F3F", "#B45935", "#9A422A", "#812C20", "#681615", "#4F000B"])

        let casesSvg = d3.select(".cases-map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map')

        let deathsSvg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map')

        let projection = d3.geoMercator()
            .scale(130)
            .translate([width / 2, height / 1.5])

        let path = d3.geoPath().projection(projection)

        casesSvg.call(casesTip)
        deathsSvg.call(deathsTip)



        // Loading data
        let getDatewiseHash = (cases) => {
            let dhash = {}
            cases.forEach((el) => {
                dhash[el['Date']] = dhash[el['Date']] || []
                dhash[el['Date']].push(el)
            })
            return dhash
        }

        let promises = [
            d3.json("/world.geojson"),
            d3.csv("/G3_total-confirmed-cases-of-covid-19-per-million-people.csv"),
            d3.csv("/G4_total-deaths-covid-19.csv")
        ]

        Promise.all(promises).then((values) => {
            let [data, cases, deaths] = values
            let casesDatewise = getDatewiseHash(cases)
            let deathsDatewise = getDatewiseHash(deaths)
            let casesIdentifier = 'Total confirmed cases of COVID-19 per million people (cases per million)'
            let deathsIdentifier = 'Total confirmed deaths due to COVID-19 (deaths)'
            getSlider(data, casesDatewise, casesSvg, 's1', casesIdentifier)
            getSlider(data, deathsDatewise, deathsSvg, 's2', deathsIdentifier)
        })

        let plotConfirmedCases = (data, datewiseHash, currDate, svg, identifier) => {
            let casesByID = {}
            datewiseHash[currDate].forEach((d) => {
                casesByID[d.Code] = +d[identifier]
            })

            let tip = identifier.includes('deaths') ? deathsTip : casesTip

            //population.forEach((d) => { populationById[d.id] = +d.population; })
            data.features.forEach((d) => { d.cases = casesByID[d.id] })

            console.log(identifier, casesByID)

            svg.append("g")
                .attr("class", "countries")
                .selectAll("path")
                .data(data.features)
                .enter().append("path")
                .attr("d", path)
                .style("fill", (d) => { return color(casesByID[d.id]); })
                .style('stroke', 'white')
                .style('stroke-width', 1.5)
                .style("opacity", 0.8)
                // tooltips
                .style("stroke", "white")
                .style('stroke-width', 0.3)
                .on('mouseover', function (d) {
                    tip.show(d, this)

                    d3.select(this)
                        .style("opacity", 1)
                        .style("stroke", "white")
                        .style("stroke-width", 3)
                })
                .on('mouseout', function (d) {
                    tip.hide(d, this)

                    d3.select(this)
                        .style("opacity", 0.8)
                        .style("stroke", "white")
                        .style("stroke-width", 0.3)
                })

            /*
        svg.append("path")
            .datum(topojson.mesh(data.features, (a, b) => { return a.id !== b.id; }))
            .attr("class", "names")
            .attr("d", path)
*/
        }

    }
    render() {
        return (
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Daily Sales</h6>
                                <div className="row align-items-center">
                                    <div className="col-sm-2">
                                        <p id="s1-value-fill"></p>
                                    </div>
                                    <div className="col-sm">
                                        <div id="s1-slider-fill"></div>
                                    </div>
                                </div>

                                <div className="cases-map">
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Daily Sales</h6>
                                <div className="row align-items-center">
                                    <div className="col-sm-2">
                                        <p id="s2-value-fill"></p>
                                    </div>
                                    <div className="col-sm">
                                        <div id="s2-slider-fill"></div>
                                    </div>
                                </div>

                                <div className="deaths-map">
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Maps;