import React from "react";

export default function About() {
  return (
    <div className="container about">
      <div>
        <h3>About</h3>
        <p>
          This was my first project after bootcamp. I made it using Postgres,
          Node, Express, Axios, JWT, Sequelize, Bcrypt, and React. Its hosted on
          heroku. It took me a little over a week to make this app. I learned a
          lot and expect I will be a lot faster in the future. The github repo
          is available
          <a
            href="https://github.com/BryceAB/WeShare"
            target="_blank"
            style={{
              color: "blue",
              textDecoration: "underline",
              fontSize: "inherit",
              paddingRight: "5px",
              paddingLeft: "5px",
            }}
          >
            here
          </a>
          , my Linkedin is available
          <a
            href="https://www.linkedin.com/in/bryce-billingsley-91947b243/"
            target="_blank"
            style={{
              color: "blue",
              textDecoration: "underline",
              fontSize: "inherit",
              paddingRight: "5px",
              paddingLeft: "5px",
            }}
          >
            here
          </a>
          , and my Upwork is located{" "}
          <a
            href="https://www.upwork.com/freelancers/~0186bf992a0eda8f97"
            target="_blank"
            style={{
              color: "blue",
              textDecoration: "underline",
              fontSize: "inherit",
              paddingRight: "5px",
              paddingLeft: "5px",
            }}
          >
            here
          </a>
          . Please feel free to contact me about any projects or jobs you would
          consider me for! Thanks!
        </p>
      </div>
    </div>
  );
}
