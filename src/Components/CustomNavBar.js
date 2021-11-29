import { useSelector } from "react-redux";
import { Nav, Col, Row } from "react-bootstrap";
import useGetAuthInfo from "../hooks/use-getAuthInfo";
const CustomNavBar = ({ selectedNav, setSelectedNav }) => {
  const user = useSelector((state) => state?.currentUser?.currentUser);
  const { hasAuthority } = useGetAuthInfo();
  return (
    <Nav
      className="bg-info p-2 my-2 w-100 m-0"
      variant="pills"
      activeKey={selectedNav}
      onSelect={(selectedKey) => setSelectedNav(selectedKey)}
      as={Row}
    >
      <Nav.Item as={Col}>
        <Nav.Link eventKey="Users" className="d-flex justify-content-center">
          <i className="bi bi-people-fill pe-1"></i>
          Users
        </Nav.Link>
      </Nav.Item>

      {hasAuthority("user:create") ? (
        <Nav.Item as={Col}>
          <Nav.Link
            eventKey="Settings"
            className="d-flex justify-content-center"
          >
            <i className="bi bi-gear-fill pe-1"></i>
            Settings
          </Nav.Link>
        </Nav.Item>
      ) : null}

      <Nav.Item
        as={Col}
        sm={{ span: 5, offset: 1 }}
        md={{ span: 4, offset: 2 }}
        lg={{ span: 3, offset: 5 }}
      >
        <Nav.Link eventKey="Profile" className="d-flex justify-content-center">
          Welcome, {user?.firstName ? user?.firstName : null}
          <i className="bi bi-person-fill ps-1"></i>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default CustomNavBar;
