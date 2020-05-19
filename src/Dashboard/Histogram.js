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
            cases: []
        }

        this.fetchCSV = this.fetchCSV.bind(this)
        this.fetchCases = this.fetchCases.bind(this)
    }

    componentDidMount() {
        this.fetchCSV()
        this.fetchCases()
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
        const { data, cases } = this.state
        const options = {
            legend: { position: "none" },
            hAxis: {
                format: 'd MMM yy'
            }
        };
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
            </Row>

        )
    }
}

export default Histogram
