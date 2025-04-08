import React, { useState } from "react";
import { Col, Container, Row, Form, Spinner } from "react-bootstrap";

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
    const [boatRegNumber, setBoatRegNumber] = useState("");
    const [vesselType, setVesselType] = useState("");
    const [loading, setLoading] = useState(false);
    const [vesselLength, setVesselLength] = useState("");
    const [numberOfCrew, setNumberOfCrew] = useState("");
    const [fishingGear, setFishingGear] = useState("");
    const [numberOfNets, setNumberOfNets] = useState("");
    const [meshSize, setMeshSize] = useState("");
    const [useOfIce, setUseOfIce] = useState("");
    const [timeAtSea, setTimeAtSea] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            boatRegNumber,
            vesselType,
            vesselLength,
            numberOfCrew,
            fishingGear,
            numberOfNets,
            meshSize,
            useOfIce,
            timeAtSea,
        };
        console.log("Fishing Vessel Data: Detils One two three", data);
        // you can integrate API here
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
                                        value={boatRegNumber}
                                        onChange={(e) => setBoatRegNumber(e.target.value)}
                                        placeholder="Enter registration number"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Type of Vessel</Form.Label>
                                    <Form.Select className="form-input-text" value={vesselType} onChange={(e) => setVesselType(e.target.value)} required>
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
                                        value={vesselLength}
                                        onChange={(e) => setVesselLength(Number(e.target.value))}
                                        placeholder="Enter length in meters"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Number of Crew</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        value={numberOfCrew}
                                        onChange={(e) => setNumberOfCrew(Number(e.target.value))}
                                        placeholder="Enter number of crew"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Fishing Gear Used</Form.Label>
                                    <Form.Select className="form-input-text" value={fishingGear} onChange={(e) => setFishingGear(e.target.value)} required>
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
                                        value={numberOfNets}
                                        onChange={(e) => setNumberOfNets(Number(e.target.value))}
                                        placeholder="Enter quantity"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Mesh Size (cm)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        value={meshSize}
                                        onChange={(e) => setMeshSize(Number(e.target.value))}
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
                                            value="Yes"
                                            checked={useOfIce === "Yes"}
                                            onChange={(e) => setUseOfIce(e.target.value)}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            name="useOfIce"
                                            value="No"
                                            checked={useOfIce === "No"}
                                            onChange={(e) => setUseOfIce(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label-text">Time at Sea (Hours)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="form-input-text"
                                        value={timeAtSea}
                                        onChange={(e) => setTimeAtSea(Number(e.target.value))}
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
