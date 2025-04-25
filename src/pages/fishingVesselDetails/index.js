import React, { useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

const vesselTypes = ["Volvo", "Gacan", "Leyla", "Afdheer", "Houri", "Other"];
const fishingGears = [
    "Floating Gillnet",
    "Bottom Longline",
    "Handline",
    "Bottom Gillnet",
    "Horizontal Longline",
    "Other",
];

const FishingVesselDetails = () => {
    const [formData, setFormData] = useState({
        registerNumber: '',
        typeOfVessel: '',
        vesselLength: '',
        numberOfCrew: '',
        fishingGear: '',
        numberOfGear: '',
        meshSize: '',
        useOfIce: false,
        timeAtSea: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.registerNumber || formData.registerNumber.trim() === "") {
            toast.error("Please enter a valid registration number.");
            return;
        }
        
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/vessels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success("Vessel details submitted successfully!");
                setFormData({
                    registerNumber: '',
                    typeOfVessel: '',
                    vesselLength: '',
                    numberOfCrew: '',
                    fishingGear: '',
                    numberOfGear: '',
                    meshSize: '',
                    useOfIce: false,
                    timeAtSea: ''
                });
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Error submitting form");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Error submitting form.');
        }
        setLoading(false);
    };

    return (
        <Container fluid>
            <Row className="main-row">
                <Col lg={12} md={12} xs={12} className="py-[40px] d-flex justify-content-center align-items-center">
                    <div className="login-form-section">
                        <div className="login-form-content">
                            <h1 className="mb-4">Fishing <span>Vessel Details</span></h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Boat Registration Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-input-text"
                                        name="registerNumber"
                                        value={formData.registerNumber}
                                        onChange={handleChange}
                                        placeholder="Enter registration number"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Type of Vessel</Form.Label>
                                    <Form.Select className="form-input-text" name="typeOfVessel" onChange={handleChange} required>
                                        <option value="">Select Vessel Type</option>
                                        {vesselTypes.map((v) => (
                                            <option key={v} value={v}>
                                                {v}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Vessel Length (m)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        name="vesselLength"
                                        value={formData.vesselLength}
                                        onChange={handleChange}
                                        placeholder="Enter length in meters"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Number of Crew</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        name="numberOfCrew"
                                        value={formData.numberOfCrew}
                                        onChange={handleChange}
                                        placeholder="Enter number of crew"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Fishing Gear Used</Form.Label>
                                    <Form.Select className="form-input-text" name="fishingGear" onChange={handleChange} value={formData.fishingGear} required>
                                        <option value="">Select Gear</option>
                                        {fishingGears.map((gear) => (
                                            <option key={gear} value={gear}>
                                                {gear}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Number of Nets or Hooks</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        name="numberOfGear"
                                        value={formData.numberOfGear}
                                        onChange={handleChange}
                                        placeholder="Enter quantity"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Mesh Size (cm)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        name="meshSize"
                                        value={formData.meshSize}
                                        onChange={handleChange}
                                        placeholder="Enter mesh size"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Use of Ice?</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            name="useOfIce"
                                            checked={formData.useOfIce === true}
                                            onChange={() => setFormData({ ...formData, useOfIce: true })}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            name="useOfIce"
                                            checked={formData.useOfIce === false}
                                            onChange={() => setFormData({ ...formData, useOfIce: false })}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Time at Sea (Hours)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        name="timeAtSea"
                                        value={formData.timeAtSea}
                                        onChange={handleChange}
                                        placeholder="Enter total hours"
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

export default FishingVesselDetails;
