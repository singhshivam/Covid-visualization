import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import * as d3 from 'd3'

class TotalConfirmedDeaths extends React.Component {
    componentDidMount() {
        let margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 1000 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
       
        let svg = d3.select(".graph-body2")

        let x = d3.scaleTime().range([0, width - (margin.left + margin.right)]);
        let y = d3.scaleLinear().range([height - (margin.top * 2), 0]);

        let line = d3.line()
            .x(function (d) { return x(new Date(d.Date)); })
            .y(function (d) { return y(+d.deaths); });

        let g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("/total-deaths-covid-19.csv")
            .then((origdata) => {

                let data = []
                origdata.forEach(d => {
                    if (d.Entity == "World") {
                        data.push(d)
                    }
                })

                let minDate = new Date(2020, 0, 22)
                let maxDate = new Date(2020, 4, 15)
                x.domain([minDate, maxDate]);
                y.domain([0, 3e5]);

                // add the Y gridlines
                g.append("g")
                    .attr("class", "grid")
                    .call(d3.axisLeft(y)
                        .tickSize(-width)
                        .tickFormat("")
                        .ticks(6)
                    );

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(" + ((margin.left + margin.right) / 2) + "," + (height - margin.top) + ")")
                    .call(d3.axisBottom(x)
                        .ticks(6)
                        .tickFormat(d3.timeFormat("%Y-%m-%d"))
                    )
                    .selectAll('.axis--x .tick text')
                    .append('tspan')
                    .attr("class", "axis-tspan")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("dy", margin.top * 2)

                g.append("g")
                    .attr("class", "axis axis--y")
                    .call(d3.axisLeft(y).ticks(6))
                    .append("text")
                    .attr("class", "axis-title")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")


                // Data line and dots group
                let lineAndDots = g.append("g")
                    .attr("class", "line-and-dots")
                    .attr("transform", "translate(" + ((margin.left + margin.right) / 2) + "," + 0 + ")")

                // Data line
                lineAndDots.append("path")
                    .datum(data)
                    .attr("class", "data-line")
                    .attr("d", line);

                // Data dots
                lineAndDots.selectAll("line-circle")
                    .data(data)
                    .enter().append("circle")
                    .attr("class", "data-circle")
                    .attr("r", 5)
                    .attr("cx", function (d) { return x(new Date(d.Date)); })
                    .attr("cy", function (d) { return y(+d.deaths); });

            })

    }
    render() {
        return (
            <Row>
                <Col md={12} xl={12}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb4'>Total confirmed COVID-19 deaths</h6>
                            <div className="graph-body2"></div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default TotalConfirmedDeaths;