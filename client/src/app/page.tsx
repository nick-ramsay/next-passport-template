'use client'

import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import { RingLoader } from 'react-spinners';
import API from './utils/API';
import { checkAuthStatus } from './shared-functions/shared-functions';

export default function CreateAccount() {
  const [user, setUser] = useState({ firstname: "", lastname: "" });
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
        try {
            setLoading(true)
            await API.logout();
            window.location.href = '/login';
        } catch (error) {
            setLoading(false)
            console.error("Logout failed:", error);
        }
    };

  const fetchUser = () => {
    API.getCurrentUser(window.location.pathname).then(res => { setUser(user => res.user); setLoading(loading => false); }).catch(err => {
      console.error("Error fetching user:", err.status);
      if (err.status === 401 || err.status === undefined) {
        window.location.href = '/login';
      };
    });

  }

  useEffect(() => {
    checkAuthStatus(window.location.pathname).then(fetchUser);

  }, [])

  if (loading) {
    return (
      <div className="grid items-center justify-center h-screen w-screen">
        <RingLoader loading={loading} color="#155dfc" />
      </div>

    );
  } else {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Next Mongo Template</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.firstname + " " + user.lastname}
                  </a>
                  <ul className="dropdown-menu align-content-end">
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="col-md-12">
          <div>
            <h1 className="text-2xl font-bold mb-10">Welcome, {user.firstname + " " + user.lastname}</h1>
          </div>
        </div>
      </div>
    );
  }
}