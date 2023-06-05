import { BrowserRouter, Route, Routes, NavLink, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './styles/04_template/t-header.scss';

function App() {
  return (
    <div className="App">
      <header className="t-header">
        <div>
          <a href='/'>
            <img src={logo} className="App-logo" alt="logo" />
          </a>

          <ul>
            <li>
              <NavLink to="/groups">
                Groups
              </NavLink>
            </li>
            <li>
              <NavLink to="/events">
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
