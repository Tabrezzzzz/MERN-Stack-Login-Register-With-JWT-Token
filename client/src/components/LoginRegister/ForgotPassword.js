import React, { useState } from "react";
import { FaX } from "react-icons/fa6";

export const ForgotPassword = ({ setForgotPassword }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/confirm-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setStep(2);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error confirming email:", error);
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/set-new-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Optionally, you can redirect the user to the login page or another page.
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error setting new password:", error);
    }
  };

  return (
    <div className="form-container ">
      <div onClick={() => setForgotPassword(false)} className="Exit-Forgot-Password">
      <FaX />
      </div>
      <h2 className="component-title">Reset Password</h2>
      <div>
        {step === 1 && (
          <form onSubmit={handleSubmitEmail}>
            <label>
              Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            <button type="submit">Confirm Email</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmitNewPassword}>
            <label>
              New Password:
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

            <button type="submit">Set New Password</button>
          </form>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
};

