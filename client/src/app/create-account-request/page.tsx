'use client'

import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import { RingLoader } from 'react-spinners';
import Image from 'next/image';
import ThemeTracker from '../../components/ThemeTracker';
import GithubLogo from "../images/GitHub_Lockup_Light.png"
import GitHubLogoLight from "../images/GitHub_Lockup_Dark.png";


export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("dark");
  const [errorMessage, setErrorMessage] = useState("");



  const submitRequest = (email: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email !== "" && email.includes("@") && email.includes(".")) {
      API.checkExistingAccountEmails(email)
        .then(res => {
          if (res !== "" && res !== undefined) {
            setErrorMessage("Looks like an account already exists with this e-mail. Try logging in.");
          } else {
            API.setEmailVerificationToken(email)
              .then(res => {
                window.location.href = "./create-account"
              })
          }
        }
        );
    } else {
      setErrorMessage("Invalid email. Please try again.");
      setEmail(email => "");
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
            <h6 className="text-center mt-4 pb-2">Request an Account</h6>
            <form className="p-4 mx-auto" onSubmit={(event) => { setErrorMessage(""); submitRequest(email, event) }}>
              <div className="mb-3">
                <label htmlFor="createAccountRequestEmailInput" className="form-label">Email address</label>
                <input type="email" className="form-control" id="createAccountRequestEmailInput" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='mb-3 text-center'>
                <button className="btn btn-primary" onClick={() => setErrorMessage("")} type='submit'>Request an Account</button>
              </div>
              <div className="text-center">
                <div className="form-text form-error-message mt-6 text-center">{errorMessage}</div>
              </div>
            </form>
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
    </div>
  );
}
