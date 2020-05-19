import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

import * as d3 from 'd3'
import d3Tip from "d3-tip"
import moment from 'moment'
import Chart from "react-google-charts"

class CountryCluster extends React.Component {
    constructor(props) {
        super(props)

        this.scatterPlot = this.scatterPlot.bind(this)
    }

    componentDidMount() {
        this.scatterPlot()
    }

    scatterPlot() {
        // set the dimensions and margins of the graph
        let margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        let svg = d3.select(".my_dataviz")
            .append("svg")
            .attr("width", '100%')
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        d3.csv(`${window.appURL}/countrywise-clusters.csv`)
            .then((data) => {
                // Add X axis
                let x = d3.scaleLinear()
                    .domain([0, d3.max(data.map(d => +d.Confirmed))])
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                // Add Y axis
                let y = d3.scaleLinear()
                    .domain([0, d3.max(data.map(d => +d.Deaths))])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Color scale: give me a specie name, I return a color
                let color = d3.scaleOrdinal()
                    .domain([...Array(5).keys()])
                    .range(["#008080", "#ffa500", "#00ff00", "#0000ff", "#ff1493"])

                // Set SVGs and tooltips
                let tip = d3Tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function (d) {
                        return "<strong>Country: </strong><span className='details'>"
                            + d['Country/Region']
                            + "<br></span>"
                            + "<strong>Cluster: </strong><span className='details'>"
                            + d.Clusters
                            + "</span>"
                    })

                svg.call(tip)
                // Add dots
                svg.append('g')
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) {
                        return x(+d.Confirmed);
                    })
                    .attr("cy", function (d) { return y(+d.Deaths); })
                    .attr("r", function (d) { return +d.Clusters === 1 ? 5 : 2 })
                    .style("fill", function (d) { return color(parseInt(d['Clusters'])) })
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
                        return "translate(" + 100 + "," + 4 + ")";
                    })

                legend.append("text")
                    .attr("x", 130)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function (d) { return d; });

                svg.select(".legend")
                    .append("text")
                    .text("K-clusters:")
                    .style("text-anchor", "end")
                    .attr("transform", "translate(150,0)");
            })
    }

    render() {
        return (
            <Row>
                <Col md={12} xl={12}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                <strong>Goal: </strong> Divide countries in clusters based on Covid data
                            </h6>
                                We consider the following three features for each country:<br />
                            <ul>
                                <li>Number of Confirmed cases</li>
                                <li>Number of Deaths</li>
                                <li>Number of Recovered cases</li>
                            </ul>
                            <a href={`${window.appURL}/clustering_countries.html`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline-primary">Click here to see the notebook</Button>{' '}
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Elbow Method:
                            </h6>
                            <Chart
                                width={'100%'}
                                height={'400px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Number of Clusters', 'Within Cluster Sum of Squares (WCSS)'],
                                    [
                                        2, 209.54473139980817
                                    ],
                                    [
                                        3, 60.80920291151146
                                    ],
                                    [
                                        4, 38.63576971449556
                                    ],
                                    [
                                        5, 26.51130695645543
                                    ],
                                    [
                                        6, 17.24119161032991
                                    ],
                                    [
                                        7, 13.324866699826302
                                    ],
                                    [
                                        8, 10.560197318236913
                                    ],
                                    [
                                        9, 8.376651547787196
                                    ],
                                    [
                                        10, 6.497439013115076
                                    ]
                                ]}

                                options={{
                                    hAxis: {
                                        title: 'Number of clusters',
                                    },
                                    vAxis: {
                                        title: 'WCSS',
                                    },
                                }} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Silhouette Score Method:
                            </h6>
                            <Chart
                                width={'100%'}
                                height={'400px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Number of Clusters', 'Silhouette Score'],
                                    [
                                        2,
                                        0.9584887333556031
                                    ],
                                    [
                                        3,
                                        0.9073840553250063
                                    ],
                                    [
                                        4,
                                        0.9003379271469037
                                    ],
                                    [
                                        5,
                                        0.9048045334235529
                                    ],
                                    [
                                        6,
                                        0.8232460540462491
                                    ],
                                    [
                                        7,
                                        0.8212845851968483
                                    ],
                                    [
                                        8,
                                        0.8184508558795199
                                    ],
                                    [
                                        9,
                                        0.8194689225066665
                                    ],
                                    [
                                        10,
                                        0.8186409258014021
                                    ]
                                ]}

                                options={{
                                    hAxis: {
                                        title: 'Number of clusters',
                                    },
                                    vAxis: {
                                        title: 'Silhouette Score',
                                    },
                                }} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} xl={12}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Lets consider K = 5:
                            </h6>
                            <div className="my_dataviz">
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} xl={12}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Analysis
                            </h6>
                            <p>
                                Cluster 0 is a set of countries which are very less affected, with
                                comapritively low number of Confimed, Recoverd and Death Cases.
                                e.g. India, Canada etc.
                                <br />
                                <br />
                                Cluster 1 is set of countries which are severly affected,
                                with really high number of Confirmed, Recovered and Death Cases.
                                e.g. United States is the only country which belongs to this Cluster.

                                <br />
                                <br />
                                Cluster 3 belongs to countries which are worst affected with high
                                number of Confirmed Cases but having really good number of Recoverd
                                Cases, with comparitively low Mortality Rate. e.g. Germany,
                                Russia, Iran, Brazil etc.

                                <br />
                                <br />
                                Cluster 2 belongs to countries which are badly affected with high
                                 number of Confirmed Cases but having really good number of
                                 Recoverd Cases, but high Mortality Rate e.g. Italy, Spain etc.

                                <br />
                                <br />
                                Cluster 4 is somehow similar to Cluster 2, but high Mortality
                                Rate compared to Cluster 2 also the number of Active Cases are
                                high as compared to Cluster 2 e.g. United Kingdom, France etc.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default CountryCluster
