import { BrowserRouter, Route, Routes, NavLink, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import userIcon from './assets/icons/user.png';
import searchIcon from './assets/icons/magnifying-glass.png';
import './styles/reset.scss';
import './styles/04_template/t-header.scss';
import './styles/01_atom/a-searchBar.scss';
import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <header className="t-header">
        <div>
          <a href='/'>
            <img src={userIcon} className="App-logo" alt="logo" />
          </a>

          <div className='a-searchBar'>
            <form>
              <input type='text' placeholder='Search for a topic...'/>
              <button type='submit'><img src={searchIcon} /></button>
            </form>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
