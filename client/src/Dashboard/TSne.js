import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import * as d3 from 'd3'

import Aux from "../hoc/_Aux";

class TSne extends React.Component {

    componentDidMount() {
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

export default TSne;