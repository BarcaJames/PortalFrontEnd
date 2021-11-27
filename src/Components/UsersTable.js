import { useDispatch } from "react-redux";
import { Table, Image, Badge } from "react-bootstrap";
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

const UsersTable = ({ filterText, setShowModal }) => {
  const dispatch = useDispatch();
  const { data: allUsers, isSuccess } = useGetAllUsersQuery();
  const [trigger] = useUpdateUserMutation();
  const [deleteUserTrigger] = useDeleteUserMutation();
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { hasAuthority } = useGetAuthInfo();

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleDelete = (event, username) => {
    event.stopPropagation();
    deleteUserTrigger(username)
      .unwrap()
      .then((payload) => console.log("Fulfilled", payload))
      .catch((err) => toast.error(err.data.message.toLowerCase()));
  };

  return (
    <>
      <Table striped bordered hover>
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
          {allUsers?.length && isSuccess
            ? allUsers
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
                          onClick={(event) =>
                            handleDelete(event, user?.username)
                          }
                        />
                      ) : null}
                    </td>
                  </tr>
                ))
            : null}
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
        />
      ) : null}
    </>
  );
};

export default UsersTable;