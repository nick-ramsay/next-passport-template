'use client'

import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import Image from 'next/image'
import { sha256 } from 'js-sha256';
import API from '../utils/API';
import { checkAuthStatus } from '../shared-functions/shared-functions';
import GithubLogo from "../images/GitHub_Lockup_Light.png"
import GitHubLogoLight from "../images/GitHub_Lockup_Dark.png";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    checkAuthStatus(window.location.pathname).then(res => {
      if (res.user !== null) {
        window.location.href = '/';
      } else {
        setLoading(false);
      }
    });
  }, [])


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.login(email, password)
      window.location.href = '/';
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }
  if (loading) {
    return (
      <div className="grid items-center justify-center h-screen w-screen">
        <RingLoader loading={loading} color="#155dfc" />
      </div>

    );
  }
  else {
    return (
      <div className="grid items-center justify-center h-screen w-screen">
        <div className="form-card xs-sm:w-96 x-sm:w-96 sm:w-96 md:w-full lg:w-full xl:w-full">
          <h1 className="text-md font-bold mb-5 text-center">Next.js Mongo Passport Template</h1>
          <form onSubmit={handleLogin}>
            <div className='mt-3'>
              <input placeholder="Enter email" type="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className='mt-3'>
              <input placeholder="Enter password" type="password" onChange={(e) => setPassword(sha256(e.target.value))}></input>
              <div className='mt-5 text-center'>
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
          <div className='mt-5 text-center'>
            <a href="./create-account-request">Create an Account</a>
          </div>
          <div className='mt-1 text-center'>
            <a href="./reset-password-request">Reset Password</a>
          </div>
        </div>
        <div className="flex justify-center items-center m-5 p-5 max-w-m min-w-sm">
          <a target="_blank" href="http://www.github.com/nick-ramsay/nextjs-mongo-passport-template">
            <Image
              className="block dark:hidden"
              src={GitHubLogoLight}
              width={80}
              alt="GitHub Logo"
            />
            <Image
              className="hidden dark:block"
              src={GithubLogo}
              width={80}
              alt="GitHub Logo"
            />
          </a>
        </div>
      </div>
    );
  }
}