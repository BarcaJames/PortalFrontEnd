import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useGetAuthInfo from "../hooks/use-getAuthInfo";

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
  isNonLocked: yup.boolean(),
  isActive: yup.boolean(),
  role: yup.string(),
});

const AddEditUserModal = ({
  action,
  title,
  handleClose,
  show,
  editUser,
  isLoading,
  trigger,
}) => {
  const { hasAuthority } = useGetAuthInfo();

  const submitForm = (values) => {
    let formData = new FormData();

    for (const property in values) {
      // console.log(`${property}: ${values[property]}`);
      formData.append(property, values[property]);
    }

    trigger(formData)
      .unwrap()
      .then((res) => {
        let message = `${res.firstName} ${
          action === "Edit" ? "updated " : "added "
        } successfully!`;

        toast.success(message);
        handleClose();
      })
      .catch(({ data }) => toast.error(`${data?.message?.toLowerCase()}`));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title} {editUser?.firstName}{" "}
          {!hasAuthority("user:update") ? (
            <small className="text-muted"> (read only) </small>
          ) : null}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            submitForm(values);
          }}
          initialValues={{
            firstName: editUser?.firstName ?? "",
            lastName: editUser?.lastName ?? "",
            username: editUser?.username ?? "",
            email: editUser?.email ?? "",
            isNonLocked: editUser?.notLocked ?? true,
            isActive: editUser?.active ?? true,
            role: editUser?.role ?? "ROLE_USER",
            currentUsername: action === "Edit" ? editUser?.username : null,
            profileImage: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            dirty,
            errors,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Label>First Name</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  name="firstName"
                  placeholder="First Name"
                  // value={userData.firstName}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.firstName && !errors.firstName}
                  isInvalid={touched.firstName && errors.firstName}
                  disabled={!hasAuthority("user:update")}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </InputGroup>

              <Form.Label>Last Name</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  name="lastName"
                  placeholder="Last Name"
                  // value={userData.lastName}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.lastName && !errors.lastName}
                  isInvalid={touched.lastName && errors.lastName}
                  disabled={!hasAuthority("user:update")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </InputGroup>

              <Form.Label>User Name</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  name="username"
                  placeholder="username"
                  // value={userData.username}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && errors.username}
                  disabled={!hasAuthority("user:update")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>

              <Form.Label>Email Address</Form.Label>
              <InputGroup className="mb-3">
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
                  disabled={!hasAuthority("user:update")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>

              <Form.Label> Role </Form.Label>
              <InputGroup className="mb-3">
                <Form.Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  disabled={!hasAuthority("user:update")}
                >
                  <option value="ROLE_USER">User</option>
                  <option value="ROLE_HR">HR</option>
                  <option value="ROLE_MANAGER">Manager</option>
                  <option value="ROLE_ADMIN">Admin</option>
                  <option value="ROLE_SUPER_ADMIN">Super Admin</option>
                </Form.Select>
              </InputGroup>

              <Form.Group className="mb-3">
                <Form.Check
                  value=""
                  type="checkbox"
                  label="Active"
                  name="isActive"
                  onChange={handleChange}
                  checked={values.isActive}
                  disabled={!hasAuthority("user:update")}
                />
                <Form.Check
                  value=""
                  type="checkbox"
                  label="Unlocked"
                  name="isNonLocked"
                  onChange={handleChange}
                  checked={values.isNonLocked}
                  disabled={!hasAuthority("user:update")}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  name="profileImage"
                  accept="image/*"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("profileImage", event.target.files[0]);
                  }}
                  disabled={!hasAuthority("user:update")}
                />
              </Form.Group>
              {dirty && hasAuthority("user:update") ? (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        size="sm"
                        aria-hidden="true"
                        className=" me-1"
                      />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <>Submit form</>
                  )}
                </Button>
              ) : null}
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <hr />
    </Modal>
  );
};

export default AddEditUserModal;
