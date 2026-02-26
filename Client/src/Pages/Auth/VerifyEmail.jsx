import React, { useState, useEffect } from "react";
import Logo from "../../Assets/logo.png";
import Loader from "../../Components/Loader";
import Button from "../../Components/ui/Button";
import {Link} from 'react-router-dom'
const VerifyEmail = () => {
  const [status, setStatus] = useState("loading");

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-4 transition-colors duration-300">
      {/* Card */}
      <div className="max-w-md w-full space-y-8 bg-(--card) p-8 rounded-md border border-(--border)">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo / Heading */}
          <div className="text-center">
            <div className="w-15 mx-auto">
              <img className="w-full" src={Logo} alt="logo" />
            </div>
          </div>

          {/* Content based on status */}
          {status === "loading" && (
            <>
              <h1 className="text-[20px]">Verifying your email</h1>

              <div className="">
                <Loader size={20} />
              </div>

              <p>Please wait a moment...</p>

              <p>We're checking your verification link</p>
            </>
          )}

          {status === "success" && (
            <>
              <h1 className="text-[20px]">
                Email Verified!
              </h1>
              <div className="w-20 h-20 rounded-full bg-green-200 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <p className="max-w-xs">
                Thank you! Your email has been successfully verified.
              </p>

              <Link to={'/admin'}>
                <Button className="mt-6 ">
                Go to Dashboard
              </Button>
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <h1 className="text-[20px]">
                Verification Failed
              </h1>
              <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
                <svg
                  className="w-10 h-10 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>


              <p className=" max-w-xs">
                The link may be expired or invalid.
              </p>

              <Button className="mt-6">
                Request New Link
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Optional footer text */}
      <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8">
        © {new Date().getFullYear()} Your Minecraft Temple
      </p>
    </div>
  );
};

export default VerifyEmail;
