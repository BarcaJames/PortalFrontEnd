import { Card, Button, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
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
              <i class="bi bi-person-fill"></i>
            </InputGroup.Text>
            <FormControl placeholder="First name" aria-label="First-name" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="Last-name">
              <i class="bi bi-person-fill"></i>
            </InputGroup.Text>
            <FormControl placeholder="Last name" aria-label="Last-name" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="username">
              <i class="bi bi-person-fill"></i>
            </InputGroup.Text>
            <FormControl placeholder="user name" aria-label="username" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="email">
              <i class="bi bi-envelope-fill"></i>
            </InputGroup.Text>
            <FormControl placeholder="email" aria-label="email" />
          </InputGroup>

          <Button className="w-50" variant="primary">
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
