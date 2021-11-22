import {
  Button,
  Modal,
  Card,
  ListGroup,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useSelector } from "react-redux";

const SelectedUserModal = ({ showModal, setShowModal }) => {
  const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(showModal);
  const user = useSelector((state) => state?.selectedUser?.user);

  return (
    <>
      {user ? (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {user.firstName} {user.lastName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Image src={user.profileImageUrl} thumbnail />
                    </Col>
                    <Col>
                      {user.firstName} {user.lastName}
                      <br />
                      Status: {user.active ? "Active" : "Inactive"}
                      <br />
                      Last Login:
                      {user.lastLoginDate
                        ? new Date(user.lastLoginDate).toDateString()
                        : null}
                      <br />
                      Joined: {new Date(user.joinDate).toDateString()}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>{user.userId}</span>
                  <i className="bi bi-person-square"></i>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>{user.email}</span>
                  <i className="bi bi-envelope"></i>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>{user?.role?.slice(5)}</span>
                  <i className="bi bi-shield-shaded"></i>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Account {user.notLocked ? "Unlocked" : "Locked"}</span>
                  <i className="bi bi-lock"></i>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};

export default SelectedUserModal;
