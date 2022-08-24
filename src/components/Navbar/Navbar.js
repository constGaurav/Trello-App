import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav>
    <ul>
        <li className='title'>
        Trello
        </li>
        <li className='github'>
        <a href="/">Github Link</a>
        </li>
    </ul>
    </nav>
  );
}

export default Navbar;