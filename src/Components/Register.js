import { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLazyRegisterUserQuery } from "../store/UserApi";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .trim()
    .min(2, "First name should be a minimum of 2 letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .trim()
    .min(2, "Last name should be a minimum of 2 letters"),
  username: yup
    .string()
    .required()
    .trim()
    .min(3, "User name should be a minimum of 3 letters"),
  email: yup.string().email().required().trim(),
});

const Register = () => {
  const navigate = useNavigate();

  const [triggerRegister, { isSuccess, isFetching }] =
    useLazyRegisterUserQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const submitHandler = ({ firstName, lastName, username, email }) => {
    triggerRegister({
      firstName,
      lastName,
      username,
      email,
    });
  };

  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card className="text-center w-50" bg="info">
        <Card.Body>
          <Card.Title>User Management Portal</Card.Title>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              submitHandler(values);
            }}
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              touched,
              dirty,
              errors,
            }) => (
              <>
                {/* <Form.Label>First Name</Form.Label> */}
                <InputGroup className="mb-3">
                  <InputGroup.Text id="First-name">
                    <i className="bi bi-person-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    name="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={touched.firstName && errors.firstName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </InputGroup>

                {/* <Form.Label>Last Name</Form.Label> */}
                <InputGroup className="mb-3">
                  <InputGroup.Text id="Last-name">
                    <i className="bi bi-person-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    name="lastName"
                    placeholder="Last Name"
                    // value={userData.lastName}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={touched.lastName && errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </InputGroup>

                {/* <Form.Label>User Name</Form.Label> */}
                <InputGroup className="mb-3">
                  <InputGroup.Text id="username">
                    <i className="bi bi-person-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    name="username"
                    placeholder="username"
                    // value={userData.username}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.username && !errors.username}
                    isInvalid={touched.username && errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>

                {/* <Form.Label>Email Address</Form.Label> */}
                <InputGroup className="mb-3">
                  <InputGroup.Text id="email">
                    <i className="bi bi-envelope-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    name="email"
                    placeholder="email"
                    type="email"
                    // value={userData.email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
                {dirty ? (
                  <Button disabled={isFetching} onClick={handleSubmit}>
                    Register
                  </Button>
                ) : null}
              </>
            )}
          </Formik>
        </Card.Body>
        <span className="mb-3">
          Already registered <Link to="/">Sign in</Link>
        </span>
      </Card>
    </div>
  );
};

export default Register;
