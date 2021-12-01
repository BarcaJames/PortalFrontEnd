import { useEffect, useState } from "react";
import {
  Card,
  Button,
  FormControl,
  InputGroup,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import {
  useLazyLoginUserQuery,
  useLazyGetCurrentUserQuery,
} from "../store/UserApi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import useGetAuthInfo from "../hooks/use-getAuthInfo";
import { addCurrentUser } from "../features/user/currentUserSlice";

const Login = () => {
  const navigate = useNavigate();
  const { getUsernameFromToken } = useGetAuthInfo();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useSelector((state) => state?.currentUser?.currentUser);
  const dispatch = useDispatch();

  const [triggerLogin, { isSuccess, isFetching, data }] =
    useLazyLoginUserQuery();
  const [triggerGetCurrentUser, { data: currentUserData }] =
    useLazyGetCurrentUserQuery();

  useEffect(() => {
    async function fetchUser() {
      const userName = await getUsernameFromToken();
      if (userName && !currentUser) {
        triggerGetCurrentUser(userName);
        if (currentUserData) {
          dispatch(addCurrentUser(currentUserData));
          navigate("/user/management");
        }
      }
    }
    fetchUser();
  }, [navigate, currentUser, currentUserData]);

  useEffect(() => {
    if (currentUser) {
      navigate("/user/management");
    }

    if (isSuccess) {
      dispatch(addCurrentUser(data));
      navigate("/user/management");
    }
  }, [isSuccess, data, dispatch, navigate, currentUser]);

  return (
    <Row
      style={{ height: "90vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Col md={6}>
        <Card className="text-center" bg="info">
          <Card.Body>
            <Card.Title>User Management Portal</Card.Title>
            <InputGroup className="mb-3">
              <InputGroup.Text id="username">
                <i className="bi bi-person-fill"></i>
              </InputGroup.Text>
              <FormControl
                value={username}
                id="username"
                placeholder="username"
                aria-label="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="password">
                <i className="bi bi-lock-fill"></i>
              </InputGroup.Text>
              <FormControl
                value={password}
                type="password"
                placeholder="password"
                aria-label="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputGroup>
            <Button
              className="w-50"
              variant="primary"
              disabled={isFetching}
              // onClick={handleClick}
              onClick={() =>
                // toast("Let us see!")
                triggerLogin({
                  username,
                  password,
                })
              }
            >
              {isFetching ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                <>Login</>
              )}
            </Button>
          </Card.Body>
          <span className="mb-3">
            Are you new here? <Link to="/register">Sign up</Link>
          </span>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
