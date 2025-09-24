import { useState } from "react";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { logOut } from "../../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import { FaColumns, FaHome } from "react-icons/fa";

const Header = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const currentUser = useSelector((s) => s?.user, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (currentUser) {
      logOut();
      dispatch(setUser(null));
      if (onLogout) onLogout();
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
    setIsOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  let links = [
    { title: "Home", path: "/", icon: <FaHome size={24}/> },
    { title: "Kanban", path: "/kanban", icon: <FaColumns size={24}/> },
  ];

  return (
    <Navbar expand="md" className="diary-navbar" fixed="top">
      <div className="navbar-container">
        <NavbarBrand href="/" className="diary-brand">
          <img 
            src="/logo-transparent.png" 
            alt="My E-Diary Logo" 
            className="brand-logo"
          />
          <span className="brand-text">My E-Diary</span>
        </NavbarBrand>
        
        <NavbarToggler onClick={toggle} className="navbar-toggler-custom">
          <span></span>
          <span></span>
          <span></span>
        </NavbarToggler>
        
        <Collapse isOpen={isOpen} navbar className="navbar-collapse-custom">
          <Nav className="navbar-nav-main" navbar>
            {links.map((item, index) => (
              <NavItem key={index} className="nav-item-custom">
                <Link
                  to={item.path}
                  className="nav-link-custom"
                  onClick={handleNavLinkClick}
                >
                  <i>{item.icon}</i>
                  <span className="nav-link-text">{item.title}</span>
                </Link>
              </NavItem>
            ))}
          </Nav>

          {/* User Profile Section - Separate from main nav */}
          <div className="navbar-profile-section">
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggleDropdown}
              className="profile-dropdown"
            >
              <DropdownToggle caret className="profile-toggle">
                <div className="profile-info">
                  <img
                    src={currentUser?.avatar || "https://i.pravatar.cc/40"}
                    alt="User Avatar"
                    className="profile-avatar"
                  />
                  <div className="profile-text">
                    <span className="profile-name">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </span>
                  </div>
                  <i className="dropdown-arrow fas fa-chevron-down"></i>
                </div>
              </DropdownToggle>
              <DropdownMenu end className="profile-menu">
                <DropdownItem divider className="menu-divider" />
                <DropdownItem 
                  className="profile-menu-item logout-item"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;