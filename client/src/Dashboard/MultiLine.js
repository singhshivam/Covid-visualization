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

        d3.csv("../../data/g4.csv")
            .then((data)  => {
                let covid = d3.nest()
                    .key(function (d) { return d.Entity; })
                    .entries(data);

                let x = d3.scaleLinear()
                    .domain([0, d3.max(data, function (d) { return +d.fivedeath; })])
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
                function make_x_gridlines() {
                    return d3.axisBottom(x)
                        .ticks(5)
                } svg.append("g")
                    .attr("class", "grid")
                    .attr("transform", "translate(0," + height + ")")
                    .call(make_x_gridlines()
                        .tickSize(-height)
                        .tickFormat("")
                    )
                let y = d3.scaleSymlog()
                    .domain([0, 1e4])
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
                let res = covid.map(d => d.key)
                let color = d3.scaleOrdinal(d3.schemeCategory10)
                    .domain(res);
                let div = d3.select(".graph-body").append("div")
                    .attr("class", "tooltip-line")
                    .style("opacity", 0);
                
                svg.selectAll(".line")
                    .data(covid)
                    .enter()
                    .append("path")
                    .attr("fill", "none")
                    .attr("stroke", function (d) { return color(d.key) })
                    .attr("stroke-width", 1.5)
                    .attr("d", function (d) {
                        return d3.line()
                            .x(function (d) { return x(d.fivedeath); })
                            .y(function (d) { return y(d.deaths); })(d.values)
                    })

                    .on('mouseover', function (d, i) {
                        console.log('d', d)
                        console.log('i', i)
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
                <Row>
                    <div className="graph-body">
                    </div>
                    <Col md={12} xl={12}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Daily Sales</h6>
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