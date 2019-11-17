import React from 'react';
import {
    NavLink
  } from "react-router-dom";

const Nav = () => {
    return ( 
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
                <NavLink exact to="/your-fav-games">Your Fav Games</NavLink>
            </li>
        </ul>
     );
}
 
export default Nav;

