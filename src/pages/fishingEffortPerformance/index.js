import React, { useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";

const FishingEffortPerformance = () => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [totalHours, setTotalHours] = useState("");
    const [daysFished, setDaysFished] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true);

        const data = {
            startTime,
            endTime,
            totalHours,
            daysFished,
        };

        console.log("Fishing Effort Data: fishing details", data);
        // Send to API later if needed
        setLoading(false);
    };

    return (
        <Container fluid>
            <Row className="main-row">
                <Col lg={12} md={12} xs={12} className="p-0 d-flex justify-content-center align-items-center">
                    <div className="login-form-section">
                        <div className="login-form-content">
                            <h1 className="mb-4">Fishing <span>Effort & Performance</span></h1>

                            <Form onSubmit={handleSubmit} className="space-y-4">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Time Fishing Began</Form.Label>
                                    <Form.Control
                                        type="time"
                                        placeholder="Start Time"
                                        className="form-input-text"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Time Fishing Ended</Form.Label>
                                    <Form.Control
                                        type="time"
                                        className="form-input-text"
                                        placeholder="End Time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Total Time Spent Actively Fishing (Hours)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        placeholder="Total Hours"
                                        value={totalHours}
                                        onChange={(e) => setTotalHours(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Days Fished in the Past Week</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Days Fished"
                                        className="form-input-text"
                                        value={daysFished}
                                        onChange={(e) => setDaysFished(e.target.value)}
                                    />
                                </Form.Group>

                                <button
                                    type="submit"
                                    className="login-btn"
                                    disabled={loading}
                                >
                                    {!loading ? (
                                        "Submit"
                                    ) : (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="loader"
                                        />
                                    )}
                                </button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FishingEffortPerformance;
