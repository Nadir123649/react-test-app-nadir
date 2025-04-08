import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";

const regions = [
    "Bari",
    "Banadir",
    "Lower Shabelle",
    "Middle Shabelle",
    "Mudug",
    "Nugaal",
    "Sanaag",
    "Togdheer",
];

const GeneralInformation = () => {
    const [date, setDate] = useState("");
    const [region, setRegion] = useState("");
    const [landingSite, setLandingSite] = useState("");
    const [enumeratorName, setEnumeratorName] = useState("John Doe");
    const [loading, setLoading] = useState(false);
    const [gpsLocation, setGpsLocation] = useState("");

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
                setGpsLocation(coords);
            },
            () => {
                setGpsLocation("Unable to fetch location");
            }
        );
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            date,
            region,
            landingSite,
            enumeratorName,
            gpsLocation,
        };
        console.log("Submitted Data: General Info", payload);

        setLoading(false);

        // Later: send to API with axios
        // axios.post("/api/general-info", payload)
        //   .then(response => console.log("Saved:", response.data))
        //   .catch(err => console.error("Error:", err));
    };

    return (
        <Container fluid>
            <Row className="main-row">
                <Col
                    lg={12}
                    md={12}
                    xs={12}
                    className="p-0 d-flex justify-content-center align-items-center"
                >
                    <div className="login-form-section">
                        <div className="login-form-content">
                            <h1 className="mb-4">General <span> Information</span></h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Date</Form.Label>
                                    <Form.Control type="date" className="form-input-text" value={date} readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Region</Form.Label>
                                    <Form.Select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="form-input-text"
                                        required
                                    >
                                        <option value="">Select Region</option>
                                        {regions.map((r) => (
                                            <option key={r} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Landing Site</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-input-text"
                                        value={landingSite}
                                        onChange={(e) => setLandingSite(e.target.value)}
                                        placeholder="Enter landing site"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Enumerator Name</Form.Label>
                                    <Form.Control type="text" value={enumeratorName} className="form-input-text" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">GPS Location</Form.Label>
                                    <Form.Control type="text" value={gpsLocation} className="form-input-text" readOnly />
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

export default GeneralInformation;
