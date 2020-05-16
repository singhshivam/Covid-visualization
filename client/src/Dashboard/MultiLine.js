import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

import * as d3 from 'd3'
import d3Tip from "d3-tip"

import Aux from "../hoc/_Aux"
import TotalConfirmedDeaths from './TotalConfirmedDeaths'

import { Slider, createMuiTheme } from '@material-ui/core'

class MultiLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [], dateArr: [], value: [] }

        this.fetchCSV = this.fetchCSV.bind(this)
        this.populateGraph = this.populateGraph.bind(this)
        this.setSVG = this.setSVG.bind(this)
        this.dateRange = this.dateRange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.valueText = this.valueText.bind(this)
    }

    componentDidMount() {
        this.fetchCSV()
        this.setSVG()
        this.dateRange()
    }

    dateRange() {
        let sdate = new Date(2020, 0, 21)
        let edate = new Date(2020, 4, 16)
        let dateArr = []
        for (let d = sdate; d <= edate; d.setDate(d.getDate() + 1)) {
            dateArr.push(new Date(d))
        }
        this.setState({dateArr: dateArr, value: [0, dateArr.length-1]})
    }

    setSVG() {
        let margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 1000 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom
        let svg = d3.select(".g4-confirmed-deaths")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
        this.setState({
            svg: svg,
            margin: margin,
            width: width,
            height: height
        })
    }

    fetchCSV() {
        d3.csv("/covid-confirmed-deaths-since-5th-death.csv")
            .then(data => {
                let dataByCountry = d3.nest()
                    .key(function (d) { return d.Entity })
                    .entries(data)
                this.setState({ data: dataByCountry })
            })
    }

    populateGraph() {
        const { data, svg, width, height, margin } = this.state
        if (data.length > 0 && svg) {
            svg.selectAll("*").remove()
            let dataByCountry = data

            const countries = ["Afghanistan", "Africa", "Albania", "Algeria", "Andorra", "Angola", "Anguilla",
                "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
                "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
                "Bermuda", "Bhutan", "Bolivia", "Bonaire Sint Eustatius and Saba", "Bosnia and Herzegovina",
                "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso",
                "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands",
                "Central African Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Costa Rica",
                "Cote d'Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic",
                "Democratic Republic of Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
                "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
                "Faeroe Islands", "Falkland Islands", "Fiji", "Finland", "France", "French Polynesia",
                "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland",
                "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
                "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
                "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan",
                "Kenya", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Liberia",
                "Libya", "Liechtenstein", "Lithuania", "Low income", "Lower middle income", "Luxembourg",
                "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
                "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro",
                "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands",
                "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria",
                "Northern Mariana Islands", "Norway", "Oceania", "Oman", "Pakistan", "Palestine",
                "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
                "Puerto Rico", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
                "Saint Lucia", "Saint Vincent and the Grenadines", "San Marino", "Sao Tome and Principe",
                "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
                "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Somalia", "South Africa",
                "South America", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
                "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tanzania",
                "Thailand", "Timor", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey",
                "Turks and Caicos Islands", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
                "United States", "United States Virgin Islands", "Uruguay",
                "Uzbekistan", "Vatican", "Venezuela", "Vietnam",
                "Yemen", "Zambia", "Zimbabwe"]


            let x = d3.scaleLinear()
                .domain([0, 120])
                .range([0, width])

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(5))
            svg.append("text")
                .attr("transform",
                    "translate(" + (width / 2) + " ," +
                    (height + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text("Days since 5 daily deaths first reported")
            let make_x_gridlines = () => {
                return d3.axisBottom(x)
                    .ticks(5)
            }
            svg.append("g")
                .attr("class", "grid")
                .attr("transform", "translate(0," + height + ")")
                .call(make_x_gridlines()
                    .tickSize(-height)
                    .tickFormat("")
                )
            let y = d3.scaleSymlog()
                .domain([0, 1e5])
                .range([height, 0])
            svg.append("g")
                .call(d3.axisLeft(y).ticks(5, "~s"))

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("LOG")

            svg.append("g")
                .attr("class", "grid")
                .call(make_y_gridlines()
                    .tickSize(-width)
                    .tickFormat("")
                )
            function make_y_gridlines() {
                return d3.axisLeft(y)
                    .ticks(5)
            }
            let color = d3.scaleOrdinal(d3.schemeCategory10)
                .domain(countries)

            let div = d3.select(".graph-body").append("div")
                .attr("class", "tooltip-line")
                .style("opacity", 0)

            // Set SVGs and tooltips
            let tip = d3Tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function (d) {
                    let cases = d.values[d.values.length - 1]
                    return `<strong>Country: </strong>
                            <span class='details'>
                                ${d.key}<br>
                            </span>
                            <strong>${cases.deaths} </strong>
                            <span class='details'> 
                            deaths in ${cases.fivedeath} days
                            </span>`
                })
            svg.selectAll(".line")
                .data(dataByCountry)
                .enter()
                .append("path")
                .attr("fill", "none")
                .attr("stroke", function (d) { return color(d.key) })
                .attr("stroke-width", 1.5)
                .attr("d", function (d) {
                    if (countries.includes(d.key)) {
                        return d3.line()
                            .x(function (d) { return x(d.fivedeath); })
                            .y(function (d) { return y(d.deaths); })
                            (d.values)
                    }
                })
                .on('mouseover', function (d, i) {
                    tip.show(d, this)
                    const selection = d3.select(this).raise()
                    selection
                        .transition()
                        .duration("10")
                        .attr("stroke", function (d) { return color(d.key) })
                        .attr("opacity", "0.85")
                        .attr("stroke-width", 3.5)
                    div.transition()
                        .duration(50)
                        .style("opacity", 1)
                })
                .on('mouseout', function (d, i) {
                    tip.hide(d, this)
                    const selection = d3.select(this)
                    selection
                        .transition()
                        .duration("10")
                        .attr("stroke", function (d) { return color(d.key) })
                        .attr("opacity", "1")
                        .attr("stroke-width", 1.5)
                    div.transition()
                        .duration('50')
                        .style("opacity", 0)

                })

            svg.call(tip)
        }
    }
    handleChange(event, newValue) {
        this.setState({value: newValue})
    }
    valueText(v) {
        const { dateArr } = this.state
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        let date = dateArr[v]
        if (date) {
            return dateArr[v].toLocaleDateString(undefined, options)
        } else {
            return v
        }
    }
    render() {
        const options = { month: 'short', day: 'numeric' }
        const { dateArr, value } = this.state
        this.populateGraph()
        const muiTheme = createMuiTheme({
            slider: {
                trackSize : 100,
                handleSize: 100
            }
        })
        return (
            <Aux>
                <div className="graph-body">
                </div>
                <Row>
                    <Col md={12} xl={12}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total confirmed COVID-19 deaths: how rapidly are they increasing?</h6>
                                <p>
                                    Limited testing and challenges in the attribution of the cause of death means that the number of confirmed deaths
                                    may not be an accurate count of the true number of deaths from COVID-19.
                                </p>
                                <div className="row d-flex align-items-center">
                                    <div className="col-12 g4-confirmed-deaths">
                                    </div>
                                </div>
                                <Slider
                                    theme={muiTheme}
                                    min={0}
                                    max={dateArr.length}
                                    value={value}
                                    onChange={this.handleChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={this.valueText}
                                    valueLabelFormat={(x) => dateArr[x].toLocaleDateString(undefined, options)}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <TotalConfirmedDeaths />
            </Aux>
        )
    }
}

export default MultiLine