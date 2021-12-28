import React from "react";
import Progress from "./Progress";
import PACKAGE from "../package.json";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate()
  return (
    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" onClick={() => navigate("/workspaces")}>文字鑑定</a>
      </div>
    </nav>
  );
};
export default Header;
