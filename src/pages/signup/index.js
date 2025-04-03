import React, { useState } from "react";
import { Col, Container, Form, FormLabel, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { registeration } from "../../service/services";
import toast from "react-hot-toast";

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [redirectToMain, setRedirectToMain] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await registeration(data);

      if (response.status === 201) {
        toast.success("User Registration successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="main-row">
          <Col lg={12} md={12} xs={12} className="p-0 d-flex justify-content-center align-items-center">
            <div className="login-form-section">
              <div className="login-form-content">
                <h1 className="mb-2">Sign up <span> Fisheries</span></h1>
                <p>Empower your experience, Sign up for a account today</p>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <FormLabel className="label-text">User name*</FormLabel>
                  <Form.Control
                    type="text"
                    placeholder="Enter your user name"
                    className="form-input-text"
                    {...register("username", {
                      required: "*Please enter your user name",
                      minLength: {
                        value: 3,
                        message: "User name must be at least 3 characters long",
                      },
                    })}
                  />
                  {errors.username && (
                    <span className="error-message text-danger sapn-text-error">
                      {errors.username.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <FormLabel className="label-text">Work email*</FormLabel>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="form-input-text"
                    {...register("email", {
                      required: "*Please enter your email",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid @ email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="error-message text-danger sapn-text-error mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <FormLabel className="label-text">Select Role*</FormLabel>
                  <Form.Select
                    className="form-input-text"
                    {...register("role", {
                      required: "*Please select a role",
                    })}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="enumerator">Enumerator</option>
                  </Form.Select>
                  {errors.role && (
                    <span className="error-message text-danger sapn-text-error">
                      {errors.role.message}
                    </span>
                  )}
                </Form.Group>

                <div className="mb-0 password-cont">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FormLabel className="label-text">Password*</FormLabel>
                    <Form.Control
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter password"
                      className="form-input-text"
                      {...register("password", {
                        required: "*Please enter your password",
                        pattern: {
                          value:
                            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?])[A-Za-z\d!@#$%^&*()_+{}|:"<>?]{12,}$/,
                          message:
                            "Password must be at least 12 characters with one uppercase , one lowercase , one special character, and one digit",
                        },
                      })}
                    />
                    <span
                      className="show-password"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={isPasswordVisible ? faEyeSlash : faEye}
                      />
                    </span>{" "}
                    {errors.password && (
                      <span className="error-message text-danger sapn-text-error">
                        {errors.password.message}
                      </span>
                    )}
                  </Form.Group>
                </div>

                <div className="mt-4">
                  <button type="submit" className="login-btn">
                    {!loading ? (
                      "Create account"
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
                </div>
                <p className="create-account text-center">
                  Already have an account? <span onClick={() => navigate("/")}>Sign In </span>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
