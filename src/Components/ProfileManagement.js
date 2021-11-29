import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAuthInfo from "../hooks/use-getAuthInfo";
import { Form, Button, Col, Row, Image, Spinner } from "react-bootstrap";
import {
  useUpdateProfileImageMutation,
  useUpdateUserMutation,
} from "../store/UserApi";
import { resetCurrentUser } from "../features/user/currentUserSlice";
import { resetSelectedUser } from "../features/user/selectedUserSlice";
import { toast } from "react-toastify";

const ProfileManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hasAuthority } = useGetAuthInfo();
  const [updatePictureTrigger, { isLoading }] = useUpdateProfileImageMutation();
  const [updateUserTrigger] = useUpdateUserMutation();
  const user = useSelector((state) => state?.currentUser?.currentUser);
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    isNonLocked: user.notLocked,
    isActive: user.active,
    role: user.role,
    currentUsername: user.username,
    profileImage: user.profileImage,
  });

  const handleChange = (event) => {
    setUserData((state) => {
      return {
        ...state,
        [`${event.target.name}`]: event.target.value
          ? event.target.value
          : event.target.checked
          ? event.target.checked
          : "",
      };
    });
  };

  const handlePictureChange = (event) => {
    const { files } = event.target;
    let formData = new FormData();
    formData.append("username", user.username);
    formData.append("profileImage", files[0]);
    updatePictureTrigger(formData)
      .unwrap()
      .then((res) => {
        setUserData((state) => {
          return { ...state, profileImage: res.profileImage };
        });
        toast.success("Picture uploaded successfully!");
      })
      .catch((err) => {
        toast.error(err.data.message.toLowerCase());
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();

    for (const property in userData) {
      // console.log(`${property}: ${userData[property]}`);
      formData.append(property, userData[property]);
    }

    updateUserTrigger(formData)
      .unwrap()
      .then((res) => {
        let message = `${res.firstName} updated successfully!`;
        toast.success(message);
      })
      .catch(({ data }) => toast.error(`${data?.message?.toLowerCase()}`));
  };

  const handleLogoutClick = () => {
    dispatch(resetCurrentUser());
    dispatch(resetSelectedUser());
    localStorage.clear();
    navigate("/");
    toast.success("See you soon!");
  };

  return (
    <>
      <Row>
        <Col md={9}>
          <Form className="border border-blue p-3">
            <Row className="justify-content-center text-center">
              <Col xs={12} sm={4} md={4} className="mb-2">
                {isLoading ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  <Image
                    style={{ objectFit: "contain" }}
                    src={
                      userData.profileImage
                        ? "data:image/png;base64," + userData.profileImage
                        : "https://robohash.org/" + userData.username
                    }
                    thumbnail
                    alt="profile-picture"
                  />
                )}
              </Col>
              <Col xs={12} sm={4} md={4}>
                <Form.Group>
                  <Form.Label
                    className="btn btn-primary"
                    visuallyHidden={isLoading}
                  >
                    <input
                      onChange={handlePictureChange}
                      type="file"
                      accept="image/*"
                      className="d-none"
                    />
                    Change
                    <i className="bi bi-camera-fill ms-1 fs-5"></i>
                  </Form.Label>
                </Form.Group>

                <div className="fw-bold">
                  {`${userData.firstName} ${userData.lastName}`}
                </div>
                <span>{userData.username}</span>
                <Form.Group>
                  <Form.Text muted>
                    Last login:{" "}
                    {user.lastLoginDate
                      ? new Date(user.lastLoginDate).toDateString()
                      : null}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs={12} sm={4} md={4}>
                <Form.Text muted>
                  Joined: {new Date(user.joinDate).toDateString()}
                </Form.Text>
              </Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Form.Group as={Col} sm={12} md={6}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={userData.firstName}
                  placeholder="Enter first name"
                  name="firstName"
                />
              </Form.Group>

              <Form.Group as={Col} sm={12} md={6}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={userData.lastName}
                  placeholder="Enter Last name"
                  name="lastName"
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={userData.username}
                placeholder="Enter username"
                name="username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={userData.email}
                type="email"
                placeholder="Enter email"
                name="email"
              />
            </Form.Group>

            {hasAuthority("user:delete") ? (
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                >
                  <option value="ROLE_USER">User</option>
                  <option value="ROLE_HR">HR</option>
                  <option value="ROLE_MANAGER">Manager</option>
                  <option value="ROLE_ADMIN">Admin</option>
                  <option value="ROLE_SUPER_ADMIN">Super Admin</option>
                </Form.Select>
              </Form.Group>
            ) : null}

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold"> Account Settings</Form.Label>
              <Form.Check
                value=""
                onChange={handleChange}
                checked={userData.isActive}
                type="checkbox"
                label="Active"
                name="isActive"
              />
              <Form.Check
                value=""
                onChange={handleChange}
                checked={userData.isNonLocked}
                type="checkbox"
                label="Unlocked"
                name="isNonLocked"
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </Col>

        <Col>
          <div className="border border-blue p-3 my-3">
            <Button
              className="btn btn-danger d-flex align-items-center justify-content-center w-100"
              onClick={handleLogoutClick}
            >
              <span>Logout</span>
              <i className="bi bi-box-arrow-in-right ms-1 fs-5"></i>
            </Button>
          </div>

          <div className="border border-blue p-3 d-flex flex-column ">
            <span className="fw-bold">Permissions From Role</span>
            {user.authorities.map((authority) => (
              <span key={authority}> {authority} </span>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProfileManagement;
