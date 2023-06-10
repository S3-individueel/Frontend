import { BrowserRouter, Route, Routes, NavLink, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import userIcon from './assets/icons/user.png';
import searchIcon from './assets/icons/magnifying-glass.png';
import './styles/reset.scss';
import './styles/04_template/t-header.scss';
import './styles/01_atom/a-searchBar.scss';
import './styles/main.scss';
import CitizenIdContext from './context/CitizenIdContext'; // Import the CitizenIdContext

function App() {
  const [citizenId, setCitizenId] = useState(1);

  return (
      <div className="App">
        <header className="t-header">
          <div>
            <div className="t-header__user">
              <a href='/'>
                <img src={userIcon} className="App-logo" alt="logo" />
              </a>
              <input type='number' name='citizenId' defaultValue={citizenId} onChange={e => setCitizenId(Number(e.target.value))}></input>
            </div>

            <div className='a-searchBar'>
              <form>
                <input type='text' placeholder='Search for a topic...' />
                <button type='submit'><img src={searchIcon} /></button>
              </form>
            </div>
          </div>
        </header>

        <main>
          <CitizenIdContext.Provider value={citizenId}> {/* Provide the value of citizenId */}
            <Outlet />
          </CitizenIdContext.Provider>
        </main>
      </div>
  );
}

export default App;
