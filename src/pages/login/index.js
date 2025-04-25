import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormLabel, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { login } from "../../service/services";
import toast from "react-hot-toast";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isInput, setIsInput] = useState({
    email: '',
    password: '',
  });

  const [isCustomError, setIsCustomError] = useState(false);
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

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await login(data);
      if (response.status === 200) {
        const { token, username, role } = response.data;

        localStorage.setItem('accessToken', token);
        localStorage.setItem('username', JSON.stringify(username));
        localStorage.setItem('role', role);

        toast.success("User login successfully!");
        navigate('/home');

      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      toast.error('Email or password is incorrect');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsCustomError(false);
  }, [isInput.email, isInput.password]);

  return (
    <>
      <Container fluid>
        <Row className="main-row">
          <Col lg={12} md={12} xs={12} className="p-0 d-flex justify-content-center align-items-center">
            <div className="login-form-section">
              <div className="login-form-content">
                <h1 className="mb-2">Login at <span>Fisheries</span></h1>
                <p>Empower your experience, sign in for a account today</p>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3">
                  <FormLabel className="label-text">Email*</FormLabel>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="form-input-text"
                    {...register("email", {
                      required: "*Please enter your email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="error-message text-danger sapn-text-error ">
                      {errors.email.message}
                    </span>
                  )}
                </Form.Group>

                <div className="mb-0 password-cont">
                  <Form.Group className="mb-3 relative" controlId="formBasicPassword">
                    <FormLabel className="label-text">Password*</FormLabel>
                    <Form.Control
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      className="form-input-text"
                      {...register("password", {
                        required: "*Please enter your password",
                        pattern: {
                          value: /.+/,
                          message: "Password is incorrect",
                        }
                      })}
                    />
                    <span
                      className="show-password"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={isPasswordVisible ? faEyeSlash : faEye}
                      />
                    </span>
                    {errors.password && (
                      <span className="error-message text-danger sapn-text-error ">
                        {errors.password.message}
                      </span>
                    )}
                  </Form.Group>
                </div>

                <div>
                  <button
                    type="submit"
                    className="login-btn"
                    disabled={loading}
                  >
                    {!loading ? (
                      "Log in"
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
                  Don’t have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
