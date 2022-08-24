import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="title">Trello</li>
        <li className="github">
          <a href="https://github.com/mrgauravchaudhary/Trello-App">
            Github Link
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;