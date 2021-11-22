import { useState } from "react";
import UsersManagement from "./UsersManagement";
import ProfileManagement from "./ProfileManagement";
import SettingsManagement from "./SettingsManagement";
import CustomNavBar from "./CustomNavBar";

const ManagementPortal = () => {
  const [selectedNav, setSelectedNav] = useState("Users");

  const displayComponent = () => {
    if (selectedNav === "Users") {
      return <UsersManagement />;
    }
    if (selectedNav === "Settings") {
      return <SettingsManagement />;
    }
    if (selectedNav === "Profile") {
      return <ProfileManagement />;
    }
  };

  return (
    <>
      <div className="d-flex align-items-center flex-column">
        <h3> User Management System </h3>
        <h6> {selectedNav} </h6>
      </div>
      <CustomNavBar selectedNav={selectedNav} setSelectedNav={setSelectedNav} />
      {displayComponent()}
    </>
  );
};

export default ManagementPortal;
