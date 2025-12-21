'use client'

import React, { useState, useEffect } from 'react';
import API from "../utils/API";
import { RingLoader } from 'react-spinners';
import Image from 'next/image'
import ThemeTracker from '../../components/ThemeTracker';
import GithubLogo from "../images/GitHub_Lockup_Light.png"
import GitHubLogoLight from "../images/GitHub_Lockup_Dark.png";

export default function ResetPasswordRequest() {
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("dark");
  const [errorMessage, setErrorMessage] = useState("");


  const submitRequest = (email: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email !== null && email.includes("@") && email.includes(".")) {
      API.setEmailResetToken(email)
        .then((res) => {
          if (res.acknowledged == true) {
            console.log("Password reset request submitted for:", email);
            window.location.href = '/reset-password';
          } else {
            setEmail("");
            setErrorMessage("Error submitting password reset request. Please try again.");
          }
        })
    } else {
      setErrorMessage("Invalid email. Please try again.");
      setEmail("");
    }
  }

  useEffect(() => {
    setTheme(ThemeTracker() ?? "dark");
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Next.js Passport Template</a>
        </div>
      </nav>
      <div className="container">
        <div className="row justify-content-center mt-2">
          <div className="col-md-12">
            <form className="mt-5 p-4 mx-auto" onSubmit={(event) => submitRequest(email, event)}>
              <h6 className="text-center mt-4 pb-2">Request a Password Reset</h6>
              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input className='form-control' placeholder="Enter email" value={email} type="email" onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <div className='text-center'>
                <button className="btn btn-primary" type='submit'>Request Reset</button>
              </div>
            </form>
            <div className="text-center">
              <div className="form-text form-error-message mt-6 text-center">{errorMessage}</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="row">
        <div className="col-md-12 text-center my-4">
          <a target="_blank" href="http://www.github.com/nick-ramsay/nextjs-mongo-passport-template">
            <Image
              className="hidden dark:block"
              src={theme == "dark" ? GithubLogo : GitHubLogoLight}
              width={80}
              alt="GitHub Logo"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
