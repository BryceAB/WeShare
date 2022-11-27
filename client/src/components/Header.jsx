import React from "react";
import Nav from "./Nav";

export default function Header() {
  return (
    <header id="header">
      <div className="container">
        <h1>
          <span>We</span>Share
        </h1>
        <Nav />
      </div>
    </header>
  );
}
