import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ use this only

const LoginPage = () => {
  const [view, setView] = useState('login'); // 'login', 'forgot', 'register'
const navigate = useNavigate();
  const { login } = useAuth(); // ✅ from AuthContext

 const handleLogin = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  // Optional: basic validation
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Create a realistic user object with entered credentials
  const user = {
  name: email
    .split("@")[0]
    .replace(/[0-9]/g, "")
    .replace(/[_\.]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" "),
    email,
    address: {
      line1: "Not Provided",
      city: "Unknown",
      state: "Unknown",
      country: "Unknown",
    },
    addresses: [],
    orders: [],
  };

  login(user);
  navigate("/account");
};



  return (
    <div className="min-h-screen bg-white text-[rgba(28,28,28,0.75)] border-y-[0.8px] border-[rgba(28,28,28,0.08)] overflow-y-auto">
      <div className="max-w-[525px] w-full mx-auto px-4 sm:px-6 md:px-8 text-center">
        <div className="py-16 sm:py-20 md:py-24">
          
          {/* === Reset Password === */}
          {view === 'forgot' && (
            <>
              <h1 className="text-[28px] sm:text-[32px] font-bold leading-[1.3] mb-4 font-playfair text-black">Reset your password</h1>
              <p className="my-4 text-sm sm:text-base">We will send you an email to reset your password</p>
              <form method="post" action="#" className="pt-8 text-left">
                <div className="mb-6">
                  <label className="mb-2 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="w-full h-[45px] px-4 border border-[rgba(28,28,28,0.55)] rounded-[10px] text-black bg-white text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 mb-4 px-6 py-3 uppercase bg-[#5d3754] text-white rounded-[10px] font-semibold text-sm sm:text-base transition duration-300"
                >
                  Submit
                </button>
                <button
                  onClick={() => setView('login')}
                  type="button"
                  className="block mt-2 mx-auto underline text-sm sm:text-base"
                >
                  Cancel
                </button>
              </form>
            </>
          )}

          {/* === Register === */}
          {view === 'register' && (
            <>
              <h1 className="text-[28px] sm:text-[32px] font-bold leading-[1.3] mb-4 font-playfair text-black">Create account</h1>
              <form method="post" action="#" className="pt-8 text-left">
                <div className="mb-6">
                  <input
                    type="text"
                    name="first_name"
                    autoComplete="given-name"
                    placeholder="First name"
                    className="w-full h-[50px] px-4 border border-[rgba(28,28,28,0.55)] rounded-[10px] text-black bg-white text-sm"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    name="last_name"
                    autoComplete="family-name"
                    placeholder="Last name"
                    className="w-full h-[50px] px-4 border border-[rgba(28,28,28,0.55)] rounded-[10px] text-black bg-white text-sm"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="w-full h-[45px] px-4 border border-[rgba(28,28,28,0.55)] rounded-[10px] text-black bg-white text-sm"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    className="w-full h-[50px] px-4 border border-[rgba(28,28,28,0.55)] rounded-[10px] text-black bg-white text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 mb-4 px-6 py-3 uppercase bg-[#5d3754] text-white rounded-[10px] font-semibold text-sm sm:text-base transition duration-300"
                >
                  Create
                </button>
                <button
                  onClick={() => setView('login')}
                  type="button"
                  className="block mt-2 mx-auto underline text-sm sm:text-base"
                >
                  Return to Login
                </button>
              </form>
            </>
          )}

          {/* === Login === */}
          {view === 'login' && (
            <>
              <h1 className="text-[28px] sm:text-[32px] font-bold leading-[1.3] mb-4 font-playfair text-black">Login</h1>
              <form onSubmit={handleLogin} noValidate className="pt-8 text-left">
                <div className="mb-6">
                  <label className="mb-2 block">Email</label>
                  <input
                    type="email"
                    name='email'
                    required
                    placeholder="Email"
                    className="w-full h-[45px] px-4 border border-[rgba(28,28,28,0.55)] rounded-[10px] text-black bg-white text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block">Password</label>
                  <input
                    type="password"
                    name='password'
                    required
                    placeholder="Password"
                    className="w-full h-[50px] px-4 border border-[rgba(28,28,28,0.55)] rounded-[10px] text-black bg-white text-base"
                  />
                </div>

                <button
                  onClick={() => setView('forgot')}
                  type="button"
                  className="block w-fit underline text-sm sm:text-base mb-5"
                >
                  Forgot your password?
                </button>

                <button
                   type='submit'
                  className="w-full mt-2 mb-4 px-6 py-3 uppercase bg-[#5d3754] text-white rounded-[10px] font-semibold text-sm sm:text-base transition duration-300"
                >
                  Sign in
                </button>

                <button
                  onClick={() => setView('register')}
                  type="button"
                  className="block mx-auto underline text-sm sm:text-base mt-4"
                >
                  New customer? Sign up for an account
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
