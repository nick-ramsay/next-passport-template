"use client"

import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { sha256 } from "js-sha256";
import { RingLoader } from "react-spinners";
import Image from "next/image"
import ThemeTracker from "../../components/ThemeTracker";
import GithubLogo from "../images/GitHub_Lockup_Light.png"
import GitHubLogoLight from "../images/GitHub_Lockup_Dark.png";

export default function ResetPassword() {
  const [resetCode, setResetCode] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [theme, setTheme] = useState("dark");
  const [errorMessage, setErrorMessage] = useState("");

  const submitRequest = (resetCode: string, email: string, newPassword: string, confirmNewPassword: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email !== "" && email.includes("@") && email.includes(".")) {
      if (email !== "" && newPassword !== "" && confirmNewPassword !== "" && resetCode !== "") {
        if (newPassword === confirmNewPassword) {
          API.resetPassword(email, resetCode, sha256(newPassword))
            .then((response) => {
              if (response.success) {
                alert("Password reset successfully!");
                window.location.href = "./login";
              } else {
                setErrorMessage("Error resetting password. Please check your reset code and email then try again.");
              }
            });
        }
        else {
          setErrorMessage("New passwords do not match. Please try again.");
        }
      }
      else {
        setErrorMessage("All fields are required. Please try again.");
      }
    }
    else {
      setErrorMessage("Missing or invalid email. Please try again.");
    }

  };

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
            <h6 className="text-center mt-4 pb-2">Reset Password</h6>
            <form className="p-4 mx-auto" onSubmit={(event) => submitRequest(resetCode, email, newPassword, confirmNewPassword, event)}>
              <div className="mb-3">
                <label className="form-label">Reset Code</label>
                <input className="form-control" placeholder="Reset Code" type="string" onChange={(e) => setResetCode(e.target.value)}></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input className="form-control" placeholder="New Password" type="password" onChange={(e) => setNewPassword(e.target.value)}></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input className="form-control" placeholder="New Password" type="password" onChange={(e) => setConfirmNewPassword(e.target.value)}></input>
              </div>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">Reset Password</button>
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
