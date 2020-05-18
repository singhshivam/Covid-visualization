
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
class Intro extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Row>
                <Col md={12} xl={12}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>
                                Introduction to COVID-19
                            </h6>
                            <p>
                                <img src={`${window.appURL}/coronavirus.jpg`} style={{width: "100%"}}/>
                            </p>
                            <p>
                                <strong>Coronavirus</strong> is a family of viruses that can cause illness,
                                which can vary from <em>common cold</em> and <em>cough</em> to sometimes
                                more severe disease. <strong>Middle East Respiratory Syndrome (MERS-CoV)</strong>
                                and <strong>Severe Acute Respiratory Syndrome (SARS-CoV) </strong> were such
                                severe cases with the world already has faced.
                                <br/>
                                <br/>
                                <strong>SARS-CoV-2 (n-coronavirus)</strong> is the new virus of the coronavirus
                                family, which first <em>discovered</em> in 2019, which has not been identified
                                in humans before. It is a <em>contiguous</em> virus which started from
                                <strong>Wuhan</strong> in <strong>December 2019</strong>. Which later
                                declared as <strong>Pandemic</strong> by <strong>WHO</strong> due to high
                                rate spreads throughout the world. Currently (on the date 15 May 2020),
                                this leads to a total of <em>300K+ Deaths</em> across the globe, including
                                <em>159K+ deaths</em> alone in <em>Europe</em>.
                                <br/>
                                <br/>
                                Pandemic is spreading all over the world; it becomes more important to
                                understand about this spread. This NoteBook is an effort to analyze the
                                cumulative data of confirmed, deaths, and recovered cases over time.
                                In this dashboard, the main focus is to analyze the spread trend of this
                                virus all over the world.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        )
    }
}

export default Intro