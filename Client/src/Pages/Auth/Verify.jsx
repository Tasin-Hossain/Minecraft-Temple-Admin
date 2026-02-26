import React from "react";
import Logo from "../../Assets/logo.png";
import { AiOutlineMail, AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "../../Components/ui/Button";

const Verify = () => {
  const email = "miniofficial51@gmail.com";

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 transition-colors duration-300">
      {/* Image 1 */}
      <div className="w-35 absolute right-1/4 bottom-1/12 z-100">
        <img src="./src/Assets/Auth/Logo4.png" alt="logo" className="w-full" />
      </div>
      {/* image 2 */}
      <div className="w-40 absolute right-1/5 bottom-1/12">
        <img src="./src/Assets/Auth/Logo5.png" alt="logo" className="w-full" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-(--card) p-8 rounded-md border border-(--border)">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="w-15 mx-auto">
            <img className="w-full" src={Logo} alt="logo" />
          </div>

          <div className="space-y-3">
            <h1 className="text-[16px] font-bold">Check Your Email</h1>

            <div className="flex justify-center">
              <AiOutlineMail
                className="text-(--theme) text-7xl animate-bounce"
                style={{ animationDuration: "2.2s" }}
              />
            </div>

            <p className=" ">
              We’ve sent a verification link to
              <br />
              <span className="font-semibold text-(--theme) break-all">
                {email}
              </span>
            </p>
          </div>
        </div>

        {/* Main message card */}
        <div className="bg-(--card-foreground) border border-(--border) rounded-md p-6 text-center space-y-4">
          <p>
            Please check your inbox (and spam/junk folder) to verify your
            account.
          </p>

          <p className="text-(--muted-text)">
            The link will expire in <span className="text-(--theme)">15</span>{" "}
            minutes.
          </p>
        </div>

        {/* Resend area */}
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <p className="text-(--muted-text)">Didn’t receive the email?</p>

          <Button type="button">Resend Verification Email</Button>

          <p className="text-xs text-(--muted-text) pt-2">
            Still having trouble? Contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
