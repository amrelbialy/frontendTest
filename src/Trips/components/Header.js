import React from "react";
import "../../css/style.css";
import img from "../../img/cover1.jpg";

const Header = props => {
  return (
    <header id="home" className="header">
      <img src={img} alt="" />
    </header>
  );
};

export default Header;
