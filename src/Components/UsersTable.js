import { useDispatch } from "react-redux";
import { Table, Image, Badge, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../store/UserApi";
import { addSelectedUser } from "../features/user/selectedUserSlice";
import { useState } from "react";
import AddEditUserModal from "./AddEditUserModal";
import useGetAuthInfo from "../hooks/use-getAuthInfo";
import DeleteModal from "./DeleteModal";

const UsersTable = ({ filterText, setShowModal }) => {
  const dispatch = useDispatch();
  const { data: allUsers, isSuccess, isFetching } = useGetAllUsersQuery();
  const [trigger, { isLoading }] = useUpdateUserMutation();
  const [deleteUserTrigger] = useDeleteUserMutation();
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { hasAuthority } = useGetAuthInfo();

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = (username) => {
    deleteUserTrigger(username)
      .unwrap()
      .catch((err) => toast.error(err.data.message.toLowerCase()));
  };

  if (isFetching) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Spinner
          as="span"
          animation="border"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  } else if (allUsers?.length && isSuccess) {
    return (
      <>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Photo</th>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers
              .filter((user) =>
                user.username.toLowerCase().includes(filterText.toLowerCase())
              )
              .map((user) => (
                <tr
                  key={user.userId}
                  onClick={() => {
                    setShowModal(true);
                    dispatch(
                      addSelectedUser({
                        allUsers,
                        selectedUserId: user.userId,
                      })
                    );
                  }}
                >
                  <td>
                    <Image
                      style={{ objectFit: "contain" }}
                      width="60px"
                      height="60px"
                      src={
                        user.profileImage
                          ? "data:image/png;base64," + user.profileImage
                          : "https://robohash.org/" + user.username
                      }
                      roundedCircle
                      alt="profile-picture"
                    />
                  </td>
                  <td>{user.userId}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge pill bg={user.active ? `primary` : "danger"}>
                      {user.active ? `Active` : "Inactive"}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <i
                      className="bi bi-pencil-square px-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        setEditUser(user);
                        setShowEditModal(true);
                      }}
                    />
                    {hasAuthority("user:delete") ? (
                      <i
                        className="bi bi-trash"
                        onClick={(event) => {
                          event.stopPropagation();
                          setEditUser(user);
                          setShowDeleteModal(true);
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {editUser ? (
          <AddEditUserModal
            action={"Edit"}
            title={"Edit "}
            handleClose={handleCloseEditModal}
            show={showEditModal}
            editUser={editUser}
            trigger={trigger}
            isLoading={isLoading}
          />
        ) : null}

        <DeleteModal
          handleClose={handleCloseDeleteModal}
          show={showDeleteModal}
          handleDelete={handleDelete}
          user={editUser}
        />
      </>
    );
  }
};

export default UsersTable;
