import React, { useEffect, useState } from "react";
import Logo from "../../Assets/logo.png";
import { AiOutlineMail } from "react-icons/ai";
import Button from "../../Components/ui/Button";
import { useLocation } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";

const Verify = () => {
  const location = useLocation();
  const email = location.state?.email || "Your email";

  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(10);

  const { useResendVerification } = useAuth();

  const handleResend = async () => {

    // already running হলে prevent multiple click
    if (resending || cooldown > 0) return;

    setResending(true);

    const data = await useResendVerification(email);

    setCooldown(60);
    setResending(false);
  };

  // Countdown timer logic
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

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

          <Button
            type="button"
            onClick={handleResend}
            disabled={resending || cooldown > 0}
            className={`w-full ${
              resending || cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {resending
              ? "Resending..."
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend Verification Email"}
          </Button>



          <p className="text-xs text-(--muted-text) pt-2">
            Still having trouble? Contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
