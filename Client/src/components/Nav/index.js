import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <ul>
        <li className="navbar-brand">
          <a href="/">Google Books</a>
        </li>
        <li className="brand1">Search</li>
        <li className="brand2">Saved</li>
      </ul> 
    </nav>
  );
}

export default Nav;
