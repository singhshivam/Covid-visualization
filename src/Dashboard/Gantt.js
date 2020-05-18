import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import * as d3 from 'd3'
import Chart from "react-google-charts";
import moment from 'moment'

class Gantt extends React.Component {
    constructor(props) {
        super(props)

        const columns = [
            { type: "string", label: "Task ID" },
            { type: "string", label: "Task Name" },
            { type: "date", label: "Start Date" },
            { type: "date", label: "End Date" },
            { type: "number", label: "Duration" },
            { type: "number", label: "Percent Complete" },
            { type: "string", label: "Dependencies" }
        ]
        this.state = {
            columns: columns,
            rows: []
        }
        this.fetchCSV = this.fetchCSV.bind(this)
    }
    componentDidMount() {
        this.fetchCSV()
    }
    fetchCSV() {
        d3.csv(`${window.appURL}/gantt.csv`)
            .then(data => {
                let rows = []
                data.forEach(row => {
                    let vals = Object.values(row)
                    vals[2] = moment(vals[2], "YYYY-MM-DD").toDate()
                    vals[3] = moment(vals[3], "YYYY-MM-DD").toDate()
                    vals[4] = +vals[4].match(/\d*/)
                    rows.push([...vals.slice(0, 5), null, null])
                })
                this.setState({ rows: rows })
            })
    }
    render() {
        const { rows, columns } = this.state
        console.log(rows)
        let options = {
            height: 4000,
            gantt: {
                trackHeight: 20,
                barHeight: 10,
                palette: [
                    {
                        "color": "#5e97f6",
                        "dark": "#2a56c6",
                        "light": "#c6dafc"
                    },
                    {
                        "color": "#db4437",
                        "dark": "#a52714",
                        "light": "#f4c7c3"
                    },
                    {
                        "color": "#f2a600",
                        "dark": "#ee8100",
                        "light": "#fce8b2"
                    },
                    {
                        "color": "#0f9d58",
                        "dark": "#0b8043",
                        "light": "#b7e1cd"
                    },
                    {
                        "color": "#ab47bc",
                        "dark": "#6a1b9a",
                        "light": "#e1bee7"
                    },
                    {
                        "color": "#00acc1",
                        "dark": "#00838f",
                        "light": "#b2ebf2"
                    },
                    {
                        "color": "#ff7043",
                        "dark": "#e64a19",
                        "light": "#ffccbc"
                    },
                    {
                        "color": "#9e9d24",
                        "dark": "#827717",
                        "light": "#f0f4c3"
                    },
                    {
                        "color": "#5c6bc0",
                        "dark": "#3949ab",
                        "light": "#c5cae9"
                    },
                    {
                        "color": "#f06292",
                        "dark": "#e91e63",
                        "light": "#f8bbd0"
                    },
                    {
                        "color": "#00796b",
                        "dark": "#004d40",
                        "light": "#b2dfdb"
                    },
                    {
                        "color": "#c2185b",
                        "dark": "#880e4f",
                        "light": "#f48fb1"
                    }
                ]
            }
        };
        return (
            <Row>
                <Col md={12} xl={12}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Epidemic Span
                            </h6>
                            <p>
                                Gantt Chart
                            </p>
                            <Chart
                                chartType="Gantt"
                                data={[columns, ...rows]}
                                width="100%"
                                height="100%"
                                options={options}
                                legendToggle
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Gantt;