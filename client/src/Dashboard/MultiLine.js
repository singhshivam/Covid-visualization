import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import * as d3 from 'd3'

import Aux from "../hoc/_Aux";

class MultiLine extends React.Component {

    componentDidMount() {
        this.fetchCSVdata()
    }

    fetchCSVdata() {
        let margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 1000 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        let svg = d3.select(".g4-confirmed-deaths")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("/G1_total_confirmed_deaths.csv")
            .then((data) => {
                let dataByCountry = d3.nest()
                    .key(function (d) { return d.Entity; })
                    .entries(data);

                let countries = ["Afghanistan", "Africa", "Albania", "Algeria", "Andorra", "Angola", "Anguilla",
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
                    "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North America",
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
                    "United States", "United States Virgin Islands", "Upper middle income", "Uruguay",
                    "Uzbekistan", "Vatican", "Venezuela", "Vietnam",
                    "Yemen", "Zambia", "Zimbabwe"]


                let x = d3.scaleLinear()
                    .domain([0, 100])
                    .range([0, width]);

                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).ticks(5));
                svg.append("text")
                    .attr("transform",
                        "translate(" + (width / 2) + " ," +
                        (height + margin.top + 20) + ")")
                    .style("text-anchor", "middle")
                    .text("Days since 5 daily deaths first reported");
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
                    .domain([0, 5e4])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y).ticks(5, "~s"));

                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left)
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("LOG");

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
                    .domain(countries);
                let div = d3.select(".graph-body").append("div")
                    .attr("class", "tooltip-line")
                    .style("opacity", 0);

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
                        console.log(d)
                        const selection = d3.select(this).raise();
                        selection
                            .transition()
                            .duration("10")
                            .attr("stroke", function (d) { return color(d.key) })
                            .attr("opacity", "0.85")
                            .attr("stroke-width", 3.5)
                        div.transition()
                            .duration(50)
                            .style("opacity", 1);

                        if (d.values[i]) {
                            div.html(d.key + "</br>" + d.values[i].deaths + " deaths")
                                .style("left", (d3.event.pageX + 10) + "px")
                                .style("top", (d3.event.pageY - 15) + "px");
                        }
                    })
                    .on('mouseout', function (d, i) {
                        const selection = d3.select(this)
                        selection
                            .transition()
                            .duration("10")
                            .attr("stroke", function (d) { return color(d.key) })
                            .attr("opacity", "1")
                            .attr("stroke-width", 1.5);
                        div.transition()
                            .duration('50')
                            .style("opacity", 0);

                    });

            })
    }
    render() {
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default MultiLine;