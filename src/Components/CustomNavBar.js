import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import useGetAuthInfo from "../hooks/use-getAuthInfo";
const CustomNavBar = ({ selectedNav, setSelectedNav }) => {
  const user = useSelector((state) => state?.currentUser?.currentUser);
  const { hasAuthority } = useGetAuthInfo();
  return (
    <>
      <Nav
        className="bg-info p-2 my-2"
        variant="pills"
        activeKey={selectedNav}
        onSelect={(selectedKey) => setSelectedNav(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="Users">
            <i className="bi bi-people-fill pe-1"></i>
            Users
          </Nav.Link>
        </Nav.Item>
        {hasAuthority("user:create") ? (
          <Nav.Item>
            <Nav.Link eventKey="Settings">
              <i className="bi bi-gear-fill pe-1"></i>
              Settings
            </Nav.Link>
          </Nav.Item>
        ) : null}

        <Nav.Item className="ms-auto">
          <Nav.Link eventKey="Profile">
            Welcome, {user?.firstName ? user?.firstName : null}
            <i className="bi bi-person-fill ps-1"></i>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default CustomNavBar;
