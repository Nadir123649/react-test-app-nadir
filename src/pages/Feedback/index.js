import React, { useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";

const SurveyFeedback = () => {
    const [comfortLevel, setComfortLevel] = useState("");
    const [dataUsefulness, setDataUsefulness] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            comfortLevel,
            dataUsefulness,
            additionalNotes,
        };

        console.log("Surveyor Feedback Data:", data);
        // API integration can be added here
        setLoading(false);
    };

    return (
        <Container fluid>
            <Row className="main-row">
                <Col lg={12} md={12} xs={12} className="p-0 d-flex justify-content-center align-items-center">
                    <div className="login-form-section">
                        <div className="login-form-content">
                            <h1 className="mb-4">Survey <span>Feedback</span> </h1>
                            <Form onSubmit={handleSubmit} className="space-y-4">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Comfort Level with Data Collection (1-5 Scale)</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-input-text"
                                        value={comfortLevel}
                                        onChange={(e) => setComfortLevel(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">How Useful is the Data for Management? (1-5 Scale)</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={dataUsefulness}
                                        className="form-input-text"
                                        onChange={(e) => setDataUsefulness(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Additional Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className="form-input-text min-h-[150px] h-[150px] pt-[20px] pb-[20px] resize-none"
                                        rows={3}
                                        value={additionalNotes}
                                        onChange={(e) => setAdditionalNotes(e.target.value)}
                                        placeholder="Enter any extra comments or observations"
                                    />
                                </Form.Group>

                                <button
                                    type="submit"
                                    className="login-btn"
                                    disabled={loading}
                                >
                                    {!loading ? (
                                        "Submit Feedback"
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

export default SurveyFeedback;
