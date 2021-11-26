import axios from "axios";
import { decode } from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useGetAuthInfo = () => {
  const BASE_URL = "http://localhost:8080/user";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  var current_time = new Date().getTime() / 1000;
  var decodedToken;
  const user = useSelector((state) => state?.currentUser?.currentUser);

  const isTokenValid = () => {
    if (token) {
      decodedToken = decode(token);
      if (decodedToken) {
        if (current_time < decodedToken.exp) {
          console.log("Not expired");
          return new Promise((resolve) => resolve(true));
        }
      }
      // return new Promise((resolve) => resolve(false));
    }
    return new Promise((resolve) => resolve(false));
  };

  const getUsernameFromToken = async () => {
    let tokenValid = await isTokenValid();
    if (tokenValid) {
      return new Promise((resolve) => resolve(decodedToken.sub));
    }
    navigate("/");
  };

  // const getAuthoritiesFromToken = async () => {
  //   let tokenValid = await isTokenValid();
  //   if (tokenValid) {
  //     return new Promise((resolve) => resolve(decodedToken.Authorities));
  //   }
  //   navigate("/");
  // };

  // const canUserDelete = async () => {
  //   const authorities = await getAuthoritiesFromToken();
  //   return authorities.includes("user:delete");
  // };

  const hasAuthority = (authority) => {
    return user?.authorities.includes(authority);
  };

  const addUserToState = async () => {
    let username = await getUsernameFromToken();
    if (username) {
      try {
        const result = await axios.get(BASE_URL + `/find/${username}`);
        console.log("result in addUserToState----> ", result);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }

    navigate("/");
  };

  return {
    isTokenValid,
    getUsernameFromToken,
    addUserToState,
    hasAuthority,
  };
};

export default useGetAuthInfo;
