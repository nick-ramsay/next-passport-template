'use client'

import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import { RingLoader } from 'react-spinners';
import API from './utils/API';
import { checkAuthStatus } from './shared-functions/shared-functions';

export default function CreateAccount() {
  const [user, setUser] = useState({ firstname: "", lastname: "" });
  const [loading, setLoading] = useState(false);
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
      <div>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div>
              <h1 className="text-2xl font-bold mb-10">Welcome, {user.firstname + " " + user.lastname}</h1>
            </div>
          </main>
        </div>
      </div>
    );
  }
}