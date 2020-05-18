import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

import Aux from "../hoc/_Aux"
import MultiLineGraph from './MultiLineGraph'

class MultiLine extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }
    render() {
        let title = "Total confirmed COVID-19 deaths: how rapidly are they increasing?"
        let description = "Limited testing and challenges in the attribution of the cause of death means that the number of confirmed deaths may not be an accurate count of the true number of deaths from COVID-19."
        return (
            <Aux>
                <div className="graph-body">
                </div>
                <Row>
                    <Col md={12} xl={12}>
                        <Card>
                            <Card.Body>
                                <MultiLineGraph
                                    title={title}
                                    description={description}
                                    csvURL={`${window.appURL}/covid-confirmed-deaths-since-5th-death.csv`}
                                    graphID="covid-confirmed-deaths-since-5th-death"
                                    yLimit={1e5}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card>
                            <Card.Body>
                                <MultiLineGraph
                                    title="Daily confirmed deaths: are we bending the curve?"
                                    description={"Shown is the 7-day rolling average. Limited testing and challenges in the attribution of the cause of death means that the number of confirmed deaths may not be an accurate count of the true number of deaths from COVID-19."}
                                    csvURL={`${window.appURL}/covid-confirmed-daily-deaths-epidemiological-trajectory.csv`}
                                    graphID="covid-confirmed-daily-deaths-epidemiological-trajectory"
                                    yLimit={3e3}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default MultiLine
