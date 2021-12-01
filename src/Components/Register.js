import { useState, useEffect } from "react";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLazyRegisterUserQuery } from "../store/UserApi";

const Register = () => {
  const navigate = useNavigate();

  const [registerState, setRegisterState] = useState({
    firstName: "Jamieson",
    lastName: "Brown",
    email: "jayjaywayne86@gmail.com",
    username: "King",
  });

  const [triggerRegister, { isSuccess, isFetching, data }] =
    useLazyRegisterUserQuery();

  const handleChange = (event) => {
    setRegisterState((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card className="text-center w-50" bg="info">
        <Card.Body>
          <Card.Title>User Management Portal</Card.Title>

          <InputGroup className="mb-3">
            <InputGroup.Text id="First-name">
              <i className="bi bi-person-fill"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="First name"
              name="firstName"
              value={registerState.firstName}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="Last-name">
              <i className="bi bi-person-fill"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="Last name"
              name="lastName"
              value={registerState.lastName}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="username">
              <i className="bi bi-person-fill"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="user name"
              name="username"
              value={registerState.username}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="email">
              <i className="bi bi-envelope-fill"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="email"
              name="email"
              value={registerState.email}
              onChange={handleChange}
            />
          </InputGroup>

          <Button
            className="w-50"
            variant="primary"
            disabled={isFetching}
            onClick={() =>
              // toast("Let us see!")
              triggerRegister({
                firstName: registerState.firstName,
                lastName: registerState.lastName,
                username: registerState.username,
                email: registerState.email,
              })
            }
          >
            Submit
          </Button>
        </Card.Body>
        <span className="mb-3">
          Already registered <Link to="/">Sign in</Link>
        </span>
      </Card>
    </div>
  );
};

export default Register;
