import { useState } from "react";
import { useAddUserMutation } from "../store/UserApi";
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import AddEditUserModal from "./AddEditUserModal";
import useGetAuthInfo from "../hooks/use-getAuthInfo";

const SearchAddUsers = ({ filterText, setFilterText }) => {
  const { hasAuthority } = useGetAuthInfo();
  const [trigger, { isLoading }] = useAddUserMutation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Row className="d-flex justify-content-end mb-2">
        <Col md={5}>
          <InputGroup>
            <FormControl
              className="me-2"
              placeholder="username"
              aria-label="username"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
            {hasAuthority("user:create") ? (
              <Button
                // className="w-25"
                variant="secondary"
                id="add-user"
                onClick={handleShow}
              >
                <i className="bi bi-plus-circle pe-1"></i>
                User
              </Button>
            ) : null}
          </InputGroup>
        </Col>
      </Row>

      <AddEditUserModal
        action={"Add"}
        title={"Add user"}
        handleClose={handleClose}
        show={show}
        trigger={trigger}
        isLoading={isLoading}
      />
    </>
  );
};

export default SearchAddUsers;
