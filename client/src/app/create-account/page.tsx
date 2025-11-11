'use client'

import React, { useState } from 'react';
import API from "../utils/API";
import { sha256 } from 'js-sha256';
import Image from 'next/image'
import GithubLogo from "../images/GitHub_Lockup_Light.png"
import GitHubLogoLight from "../images/GitHub_Lockup_Dark.png";


export default function CreateAccount() {
  const [verificationCode, setVerificationCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");


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
              alert("Account created successfully! Please log in.");
              window.location.href = "/login";
            });
          } else {
            alert("Sorry... an account already exists for this email.");
          }
        })
    }
    else if (password !== passwordConfirmation) {
      alert("Password and confirm password fields don't match...");
    }
    else {
      alert("Not enough info entered...");
    }
  }

  return (
    <div className="grid items-center justify-center h-screen w-screen">
      <div className="form-card xs-sm:w-96 x-sm:w-96 sm:w-96 md:w-full lg:w-full xl:w-full">
        <h1 className="text-md font-bold mb-5 text-center">Next.js Mongo Passport Template</h1>
        <form onSubmit={(event) => createNewAccount(event)}>
          <div className='mt-2 text-sm'>
            <label className='font-semibold dark:text-gray-300 text-gray-700'>Verification Code</label>
            <input className="mt-1" placeholder="Enter email verification code" type="text" onChange={(e) => setVerificationCode(e.target.value)}></input>
          </div>
          <div className='mt-4 text-sm'>
            <label className='font-semibold dark:text-gray-300 text-gray-700'>First Name</label>
            <input className="mt-1" placeholder="Enter first name" type="text" onChange={(e) => setFirstName(e.target.value)}></input>
          </div>
          <div className='mt-4 text-sm'>
            <label className='font-semibold dark:text-gray-300 text-gray-700'>Last Name</label>
            <input className="mt-1" placeholder="Enter last name" type="text" onChange={(e) => setLastName(e.target.value)}></input>
          </div>
          <div className='mt-4 text-sm'>
            <label className='font-semibold dark:text-gray-300 text-gray-700'>Email</label>
            <input className="mt-1" placeholder="Enter email" type="email" onChange={(e) => setEmail(e.target.value.toLowerCase())}></input>
          </div>
          <div className='mt-4 text-sm'>
            <label className='font-semibold dark:text-gray-300 text-gray-700'>Password</label>
            <input className="mt-1" placeholder="Enter new password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <div className='mt-4 text-sm'>
            <label className='font-semibold dark:text-gray-300 text-gray-700'>Confirm Password</label>
            <input className="mt-1" placeholder="Confirm new password" type="password" onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
          </div>
          <div className='mt-6 text-center'>
            <button type='submit'>Create Account</button>
          </div>
        </form>

      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
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
      </footer>
    </div>
  );
}
