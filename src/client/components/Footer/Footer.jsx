import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="poke-bowl">
        <p>&copy; 2023 Poke Bowl. 
          <br></br>
           MealsSharing app
        </p>
      </div>
      <div className="social-icons">
        <p></p>
        <a href="https://www.instagram.com">Instagram</a>
        <br />
        <a href="https://www.facebook.com">Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
