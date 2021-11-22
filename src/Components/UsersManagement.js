import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchAddUsers from "./SearchAddUsers";
import { useLazyGetCurrentUserQuery } from "../store/UserApi";
import useGetAuthInfo from "../hooks/use-getAuthInfo";
import { useNavigate } from "react-router-dom";
import { addCurrentUser } from "../features/user/currentUserSlice";
import SelectedUserModal from "./SelectedUserModal";
import UsersTable from "./UsersTable";

const UsersManagement = () => {
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [triggerGetCurrentUser, { data, isSuccess }] =
    useLazyGetCurrentUserQuery();
  const { getUsernameFromToken } = useGetAuthInfo();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const username = await getUsernameFromToken();
      if (username && !data) {
        triggerGetCurrentUser(username);
      } else {
        navigate("/");
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(addCurrentUser(data));
    }
    // Get called when the user in the token was removed from the database
    if (data === "" && isSuccess) {
      localStorage.clear();
      navigate("/");
    }
  }, [data, dispatch, navigate, isSuccess]);

  return (
    <>
      <SearchAddUsers filterText={filterText} setFilterText={setFilterText} />
      <UsersTable filterText={filterText} setShowModal={setShowModal} />
      <SelectedUserModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default UsersManagement;
