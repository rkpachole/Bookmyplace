import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/css/side-nav.css";
const Sidebar = () => {
  const { id } = useParams("");
  const navigatelogin = useNavigate("");
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      {/*sidebar start*/}
      <div className="sidebar">
        <div className="dash-logo">
          Churn<span>Board</span>
        </div>
        <Link to="/dashboard">- VP Board </Link>
        <Link to="/contributors-board">- Contributors Board</Link>
        <Link to="/customer-board">- Customer Board</Link>
        <Link to="/profile">- Profile</Link>
        <Link to="/connectors">- Connectors</Link>
        <Link to="/wizard">- The Wizard</Link>
        <Link to="/setting">- Settings</Link>
        <Link to="/" className="logout">
          - Logout
        </Link>
        <div className="mb">
          Powered by
          <h5>
            saha<span>deva.ai</span>
          </h5>
        </div>
      </div>
      {/*sidebar end*/}

      {/*mobile navigation bar start*/}
      <div className="mobile_nav">
        <div className="nav_bar" onClick={toggleMenu}>
          {/* <img src="https://www.clipartmax.com/png/middle/277-2772093_user-female-skin-type-1-2-icon-avatar-100-x-100-pixel.png" className="mobile_profile_image" alt="" /> */}
          <i className="fa fa-bars nav_btn" />
        </div>
        {showMenu && (
          <div className="mobile-menus">
            <ul>
              <li>
                <Link to="/dashboard">- VP Board </Link>
              </li>
              <li>
                <Link to="/contributors-board">- Contributors Board</Link>
              </li>
              <li>
                <Link to="/profile">- Profile</Link>
              </li>
              <li>
                <Link to="/customer-board">- Customer Board</Link>
              </li>
              <li>
                <Link to="/connectors">- Connectors</Link>
              </li>

              <li>
                <Link to="/wizard">- The Wizard</Link>
              </li>
              <li>
                <Link to="/setting">- Settings</Link>
              </li>

              <li>
                <Link to="/">- Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/*mobile navigation bar end*/}
    </>
  );
};

export default Sidebar;
