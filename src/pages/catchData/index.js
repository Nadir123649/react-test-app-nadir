import React, { useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";

const fishTypes = [
    "Tuna",
    "Snapper",
    "Grouper",
    "Sardine",
    "Mackerel",
    "Shark",
    "Barracuda",
    "Other",
];

const CatchData = () => {
    const [fishType, setFishType] = useState("");
    const [numberCaught, setNumberCaught] = useState("");
    const [avgLength, setAvgLength] = useState("");
    const [avgWeight, setAvgWeight] = useState("");
    const [loading, setLoading] = useState(false);
    const [pricePerKg, setPricePerKg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            fishType,
            numberCaught,
            avgLength,
            avgWeight,
            pricePerKg,
        };

        console.log("Catch Data:", data);
        setLoading(false);
        // You can send this to API later
    };

    return (
        <Container fluid>
            <Row className="main-row">
                <Col lg={12} md={12} xs={12} className="p-0 d-flex justify-content-center align-items-center">
                    <div className="login-form-section">
                        <div className="login-form-content">
                            <h1 className="mb-4">Catch <span>Data</span></h1>

                            <Form onSubmit={handleSubmit} className="space-y-4">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Fish Type</Form.Label>
                                    <Form.Select value={fishType} className="form-input-text" onChange={(e) => setFishType(e.target.value)}>
                                        <option value="" disabled>Select Fish Type</option>
                                        {fishTypes.map((fish) => (
                                            <option key={fish} value={fish}>
                                                {fish}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Number of Each Type Caught</Form.Label>
                                    <Form.Control
                                        className="form-input-text"
                                        placeholder="Enter Number of Each Type Caught"
                                        type="number"
                                        value={numberCaught}
                                        onChange={(e) => setNumberCaught(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Average Length (cm)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        placeholder="Enter Average Length"
                                        value={avgLength}
                                        onChange={(e) => setAvgLength(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Average Weight (kg)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Average Weight"
                                        className="form-input-text"
                                        value={avgWeight}
                                        onChange={(e) => setAvgWeight(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Price per Kg (USD)</Form.Label>
                                    <Form.Control
                                        className="form-input-text"
                                        placeholder="Enter Price per Kg"
                                        type="number"
                                        value={pricePerKg}
                                        onChange={(e) => setPricePerKg(e.target.value)}
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

export default CatchData;
