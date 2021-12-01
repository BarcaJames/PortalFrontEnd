import { decode } from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useGetAuthInfo = () => {
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
          // console.log("Not expired");
          return new Promise((resolve) => resolve(true));
        }
      }
      // return new Promise((resolve) => resolve(false));
    }

    // console.log("Expired!");
    localStorage.removeItem("token");
    return new Promise((resolve) => resolve(false));
  };

  const getUsernameFromToken = async () => {
    let tokenValid = await isTokenValid();
    if (tokenValid) {
      return new Promise((resolve) => resolve(decodedToken.sub));
    }
    navigate("/");
  };

  const hasAuthority = (authority) => {
    return user?.authorities.includes(authority);
  };

  return {
    isTokenValid,
    getUsernameFromToken,
    hasAuthority,
  };
};

export default useGetAuthInfo;
