import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

import * as d3 from 'd3'
import moment from 'moment'
import Chart from "react-google-charts"

class PieChart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            active: [],
            confirmed: [],
            deaths: [],
            recovered: []
        }

        this.fetchCSVs = this.fetchCSVs.bind(this)
    }

    componentDidMount() {
        this.fetchCSVs()
    }

    fetchCSVs() {
        let promises = [
            d3.csv(`${window.appURL}/pi-countries-active-cases-sorted.csv`),
            d3.csv(`${window.appURL}/pi-countries-confirmed-cases-sorted.csv`),
            d3.csv(`${window.appURL}/pi-countries-deaths-cases-sorted.csv`),
            d3.csv(`${window.appURL}/pi-countries-recovered-cases-sorted.csv`)
        ]

        Promise.all(promises).then((values) => {
            let [active, confirmed, deaths, recovered] = values
            this.setState({
                active: [["Country", "Active Cases"], ...active.map(el => [el.country, +el.Active])],
                confirmed: [["Country", "Confirmed Cases"], ...confirmed.map(el => [el.country, +el.Confirmed])],
                deaths: [["Country", "Deaths"], ...deaths.map(el => [el.country, +el.Deaths])],
                recovered: [["Country", "Recovered Cases"], ...recovered.map(el => [el.country, +el.Recovered])],
            })
        })
    }
    render() {
        const { active, confirmed, deaths, recovered } = this.state
        return (
            <Row>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Total Active Cases
                            </h6>
                            <span className="pie-charts">
                                <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={active}
                                    options={{
                                        title: 'Total Active Cases',
                                    }}
                                />
                            </span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Total Confirmed Cases
                            </h6>
                            <span className="pie-charts">
                                <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={confirmed}
                                    options={{
                                        title: 'Total Confirmed Cases',
                                    }}
                                />
                            </span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Total Recovered Cases
                            </h6>
                            <span className="pie-charts">
                                <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={recovered}
                                    options={{
                                        title: 'Total Recovered Cases',
                                    }}
                                />
                            </span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Total Deaths
                            </h6>
                            <span className="pie-charts">
                                <Chart
                                    width={'100%'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={deaths}
                                    options={{
                                        title: 'Total Deaths',
                                    }}
                                />
                            </span>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default PieChart