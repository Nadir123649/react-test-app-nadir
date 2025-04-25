import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    const [formData, setFormData] = useState({
        date: '',
        region: '',
        landingSite: '',
        gpsLocation: '',
    });
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const username = localStorage.getItem('username');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setFormData((prev) => ({ ...prev, date: today }));


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(

                (position) => {
                    const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
                    setFormData((prev) => ({ ...prev, gpsLocation: coords }));
                },
                (error) => {
                    console.error("GPS error:", error);
                }
            );
        }
    }, []);


    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/general-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("General Info Submitted Successfully!");
                setFormData({
                    date: '',
                    region: '',
                    landingSite: '',
                    gpsLocation: '',
                });
                navigate("/fishing-vessel-details");

            } else {
                toast.error("Error: " + data.message);
            }
            setLoading(false);
        } catch (err) {
            console.error("Submission error:", err);
        }
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
                                    <Form.Control type="date" className="form-input-text" value={formData.date} readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Region</Form.Label>
                                    <Form.Select
                                        name="region"
                                        value={formData.region}
                                        onChange={handleChange}
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
                                        value={formData.landingSite}
                                        type="text"
                                        className="form-input-text"
                                        name="landingSite"
                                        onChange={handleChange}
                                        placeholder="Enter landing site"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Enumerator Name</Form.Label>
                                    <Form.Control type="text" value={username || formData.enumeratorName} className="form-input-text" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">GPS Location</Form.Label>
                                    <Form.Control type="text" value={formData.gpsLocation} className="form-input-text" readOnly />
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
