import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

import * as d3 from 'd3'
import moment from 'moment'
import Chart from "react-google-charts"

class Histogram extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }

        this.fetchCSV = this.fetchCSV.bind(this)
    }

    componentDidMount() {
        this.fetchCSV()
    }

    fetchCSV() {
        d3.csv(`${window.appURL}/total-deaths-per-day.csv`)
            .then(res => {
                console.log(res)
                let data = [["date", "total deaths"]]
                res.forEach(el => {
                    data.push([moment(el.date, "MMM D, YYYY").toDate(), +el.deaths])
                })
                console.log(data)
                this.setState({ data: data })
            })
    }


    render() {
        const { data } = this.state
        const options = {
            legend: { position: "none" },
            hAxis: {
                format: 'd MMM yy'
            }
        };
        return (
            <Row>
                <Col md={12} xl={12}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Distribution of the number of deaths
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
            </Row>

        )
    }
}

export default Histogram