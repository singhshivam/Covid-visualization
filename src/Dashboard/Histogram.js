import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

import * as d3 from 'd3'
import moment from 'moment'
import Chart from "react-google-charts"

class Histogram extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            cases: [],
            topConfimedCases: [],
            topActiveCases: [],
            topRecoveredCases: [],
            topDeathCases: []
        }

        this.fetchCSV = this.fetchCSV.bind(this)
        this.fetchCases = this.fetchCases.bind(this)
        this.fetchTopConfimedCases = this.fetchTopConfimedCases.bind(this)
    }

    componentDidMount() {
        this.fetchCSV()
        this.fetchCases()
        this.fetchTopConfimedCases()
    }

    fetchTopConfimedCases() {
        d3.csv(`${window.appURL}/countries-confirmed-cases-sorted.csv`)
            .then(res => {
                let data = []
                let header = ["Country", "total cases", { role: 'style' }]
                res.forEach(el => {
                    data.push([el.country, +el.Confirmed, "color: #e5e4e2"])
                })

                res = res.sort((a, b) => { return a.Active - b.Active })
                let active = []
                res.forEach(el => {
                    active.push([el.country, +el.Active, "color: #f3de8a"])
                })

                res = res.sort((a, b) => { return a.Recovered - b.Recovered })
                let recovered = []
                res.forEach(el => {
                    recovered.push([el.country, +el.Recovered, "color: #eb9486"])
                })

                res = res.sort((a, b) => { return a.Deaths - b.Deaths })
                let deaths = []
                res.forEach(el => {
                    deaths.push([el.country, +el.Deaths, "color: gray"])
                })
                this.setState({
                    topConfimedCases: [header, ...data.reverse().slice(0, 10)],
                    topActiveCases: [["Country", "total active", { role: 'style' }],
                    ...active.reverse().slice(0, 10)],
                    topRecoveredCases: [["Country", "total recovered", { role: 'style' }],
                    ...recovered.reverse().slice(0, 10)],
                    topDeathCases: [["Country", "total deaths", { role: "style" }],
                    ...deaths.reverse().slice(0, 10)],
                })
            })

    }

    fetchCases() {
        d3.csv(`${window.appURL}/total-cases-per-day.csv`)
            .then(res => {
                let data = [["date", "total cases"]]
                res.forEach(el => {
                    data.push([moment(el.date, "MMM D, YYYY").toDate(), +el.cases])
                })
                this.setState({ cases: data })
            })
    }

    fetchCSV() {
        d3.csv(`${window.appURL}/total-deaths-per-day.csv`)
            .then(res => {
                let data = [["date", "total deaths"]]
                res.forEach(el => {
                    data.push([moment(el.date, "MMM D, YYYY").toDate(), +el.deaths])
                })
                this.setState({ data: data })
            })
    }


    render() {
        const { data, cases, topConfimedCases, topActiveCases, topRecoveredCases, topDeathCases } = this.state
        const options = {
            legend: { position: "none" },
            hAxis: {
                format: 'd MMM yy'
            }
        }
        const horOpt = {
            chartArea: { width: '100%' },
            legend: { position: "none" },
            hAxis: {
                title: 'total cases',
                minValue: 0,
            },
            isStacked: true,
            vAxis: {
                title: 'Country',
            },
            bars: 'horizontal',
        }

        return (
            <Row>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Distribution of the number of <strong>deaths</strong>
                            </h6>
                            <Chart
                                chartType="Bar"
                                width="100%"
                                height="400px"
                                data={data}
                                options={options}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Distribution of the number of <strong>cases</strong>
                            </h6>
                            <Chart
                                chartType="Bar"
                                width="100%"
                                height="400px"
                                data={cases}
                                options={options}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Top 10 Countries (Confirmed Cases)
                            </h6>
                            <span className="confirmed-charts">
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="400px"
                                    data={topConfimedCases}
                                    options={horOpt}
                                />
                            </span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Top 10 Countries (Active Cases)
                            </h6>
                            <span className="active-charts">
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="400px"
                                    data={topActiveCases}
                                    options={horOpt}
                                />
                            </span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Top 10 Countries (Recovered Cases)
                            </h6>
                            <span className="recovered-charts">
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="400px"
                                    data={topRecoveredCases}
                                    options={horOpt}
                                />
                            </span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Top 10 Countries (Total Deaths)
                            </h6>
                            <span className="death-charts">
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="400px"
                                    data={topDeathCases}
                                    options={horOpt}
                                />
                            </span>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        )
    }
}

export default Histogram
