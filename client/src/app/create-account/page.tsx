'use client'

import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import { sha256 } from 'js-sha256';
import Image from 'next/image'
import GithubLogo from "../images/GitHub_Lockup_Light.png"
import AppLogo from "../images/AppLogo.png";
import GitHubLogoLight from "../images/GitHub_Lockup_Dark.png";


export default function CreateAccount() {
  const [verificationCode, setVerificationCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [theme, setTheme] = useState("dark")
  const [errorMessage, setErrorMessage] = useState("");


  const createNewAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let currentAccountInfo = {
      email: email,
      firstname: firstName,
      lastname: lastName,
      password: sha256(password)
    }

    if (firstName !== "" && lastName !== "" && email !== "" && password !== "" && passwordConfirmation !== "" && password === passwordConfirmation) {
      API.checkExistingAccountEmails(currentAccountInfo.email)
        .then(res => {
          if (res === "" || res === undefined) {
            API.createAccount(currentAccountInfo).then(res => {
              setErrorMessage("Account created successfully! Please log in");
              window.location.href = "/login";
              localStorage.removeItem("email");
            });
          } else {
            setErrorMessage("Sorry... an account already exists for this email");
          }
        })
    }
    else if (password !== passwordConfirmation) {
      setErrorMessage("Password and confirm password fields don't match");
    }
    else {
      setErrorMessage("Not enough info entered");
    }
  }

  useEffect(() => {
    let requestedEmail = localStorage.getItem("email");
    setEmail(requestedEmail ?? "");
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Image className='text-center' src={AppLogo} alt="AppLogo" width={90} />
        </div>
      </nav>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <form className="p-4 mx-auto" onSubmit={(event) => createNewAccount(event)}>
              <h6 className="text-center">Create an Account</h6>
              <div className="mb-3">
                <label className="form-label">Verification Code</label>
                <input className="form-control" placeholder="Enter email verification code" type="text" onChange={(e) => setVerificationCode(e.target.value)}></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>First Name</label>
                <input className="form-control" placeholder="Enter first name" type="text" onChange={(e) => setFirstName(e.target.value)}></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Last Name</label>
                <input className="form-control" placeholder="Enter last name" type="text" onChange={(e) => setLastName(e.target.value)}></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input className="form-control" placeholder="Enter email" type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value.toLowerCase())}></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input className="form-control" placeholder="Enter new password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Confirm Password</label>
                <input className="form-control" placeholder="Confirm new password" type="password" onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
              </div>
              <div className='mb-3 text-center'>
                <button className='btn btn-primary' type='submit'>Create Account</button>
              </div>
              <div className="text-center">
                <div className="form-text form-error-message mt-6 text-center">{errorMessage}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="row">
        <div className="col-md-12 text-center my-4">
          <a target="_blank" href="http://www.github.com/nick-ramsay/next-passport-template">
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
