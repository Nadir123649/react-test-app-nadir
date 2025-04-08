import React, { useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";

const countries = ["Yemen", "Iran", "UAE", "Thailand", "Oman", "Turkey", "Unknown"];

const BycatchAndVesselSightings = () => {
    const [bycatch, setBycatch] = useState("");
    const [foreignVesselsSighted, setForeignVesselsSighted] = useState("");
    const [numberOfForeignVessels, setNumberOfForeignVessels] = useState("");
    const [foreignVesselCountry, setForeignVesselCountry] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            bycatch,
            foreignVesselsSighted,
            numberOfForeignVessels,
            foreignVesselCountry,
        };


        console.log("Bycatch & Sightings Data: Details 2/0", data);
        // API integration can be added here

        setLoading(false);
    };

    return (
        <Container fluid>
            <Row className="main-row">
                <Col lg={12} md={12} xs={12} className="p-0 d-flex justify-content-center align-items-center">
                    <div className="login-form-section">
                        <div className="login-form-content">
                            <h1 className="mb-4">Bycatch & Foreign <span>Vessel Sightings</span> </h1>

                            <Form onSubmit={handleSubmit} className="space-y-4">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Bycatch Information</Form.Label>
                                    <Form.Select
                                        value={bycatch}
                                        className="form-input-text"
                                        onChange={(e) => setBycatch(e.target.value)}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Foreign Vessels Sighted?</Form.Label>
                                    <Form.Select
                                        value={foreignVesselsSighted}
                                        className="form-input-text"
                                        onChange={(e) => setForeignVesselsSighted(e.target.value)}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Number of Foreign Vessels</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        placeholder="Enter the number of foreign vessels"
                                        value={numberOfForeignVessels}
                                        onChange={(e) => setNumberOfForeignVessels(e.target.value)}
                                        disabled={foreignVesselsSighted !== "Yes"}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Country of Foreign Vessel</Form.Label>
                                    <Form.Select
                                        value={foreignVesselCountry}
                                        className="form-input-text"
                                        onChange={(e) => setForeignVesselCountry(e.target.value)}
                                        disabled={foreignVesselsSighted !== "Yes"}
                                    >
                                        <option value="" disabled>Select Country</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </Form.Select>
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

export default BycatchAndVesselSightings;
