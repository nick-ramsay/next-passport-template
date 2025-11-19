'use client'

import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import Image from 'next/image'
import { sha256 } from 'js-sha256';
import API from '../utils/API';
import { checkAuthStatus } from '../shared-functions/shared-functions';
import { useBootstrapTheme } from "../../components/useBootstrapTheme";
import GithubLogo from "../images/GitHub_Lockup_Light.png"
import GitHubLogoLight from "../images/GitHub_Lockup_Dark.png";

export default function Home() {
  const theme = useBootstrapTheme();

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
      <div className="container p-4">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-md font-bold mb-5 text-center">Next.js Mongo Passport Template</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginPassword" onChange={(e) => setPassword(sha256(e.target.value))} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
            </form>
          </div>
        </div>
        <div className="row mt-2 mb-2 text-center">
          <div className="col-md-12">
            <a className="link-primary" href="./create-account-request">Create Account</a>
          </div>
        </div>
        <div className="row mb-2 text-center">
          <div className="col-md-12">
            <a className="link-primary" href="./reset-password-request">Reset Password</a>
          </div>
        </div>
        <footer className="fixed-bottom pb-5 text-center">
          <a target="_blank" href="http://www.github.com/nick-ramsay/nextjs-mongo-passport-template">
            <Image
              src={theme === "light" ? GitHubLogoLight : GithubLogo}
              width={80}
              alt="GitHub Logo"
            />
          </a>
        </footer>
      </div>
    );
  }
}