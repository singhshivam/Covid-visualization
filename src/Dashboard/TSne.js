import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

import * as d3 from 'd3'

import Aux from "../hoc/_Aux";

class TSne extends React.Component {

    componentDidMount() {
        this.scatterPlot()
    }

    scatterPlot() {
        // set the dimensions and margins of the graph
        let margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        let svg = d3.select(".my_dataviz")
            .append("svg")
            .attr("width", '100%')
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //Read the data
        d3.csv(`${window.appURL}/scatterplot-tnse.csv`)
            .then((data) => {
                console.log(data)
                // Add X axis
                let x = d3.scaleLinear()
                    .domain([-70, 70])
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                // Add Y axis
                let y = d3.scaleLinear()
                    .domain([-70, 70])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Color scale: give me a specie name, I return a color
                let color = d3.scaleOrdinal()
                    .domain([...Array(15).keys()])
                    .range(["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557", "#d95af2", "#FCB0B3",
                        "#7EB2DD", "#445E93", "#5B2333", "#EF8E29", "#C9DB4B", "#8EC56C", "#000000",
                        "#433E3E"])

                // Add dots
                svg.append('g')
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) { return x(d['Axis1']); })
                    .attr("cy", function (d) { return y(d['Axis2']); })
                    .attr("r", 2)
                    .style("fill", function (d) { return color(parseInt(d['Kernel'])) })

                let legend = svg.selectAll(".legend")
                    .data(color.domain())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

                legend.append("rect")
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function (d) { return color(d); })
                    .attr("transform", function (d, i) {
                        return "translate(" + (width - 10) + "," + 4 + ")";
                    })

                legend.append("text")
                    .attr("x", width - 24)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function (d) { return d; });
                
                svg.select(".legend")
                    .append("text")
                    .text("K-clusters") 
                    .style("text-anchor", "end")
                    .attr("transform", "translate(710,0)");
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
                                <h6 className='mb-4'>Litrature Clustering</h6>
                                <a href={`${window.appURL}/literature-cluster.html`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="primary">How did we get the data for the scatterplot?</Button>{' '}
                                </a>
                                <div className="my_dataviz">
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default TSne;