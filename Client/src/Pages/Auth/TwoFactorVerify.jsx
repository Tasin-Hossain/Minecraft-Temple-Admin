import React, { useRef, useState } from "react";
import Logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import Button from "../../Components/ui/Button";

const TwoFactorVerify = () => {
  // loader
  const [loading, setLoading] = useState(false);
  // Otp
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-(--card) p-8 rounded-md border border-(--border)">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="w-15 mx-auto">
            <img className="w-full" src={Logo} alt="logo" />
          </div>
          <h1 className="">
            Log in to <span className="text-(--theme)">Minecraft</span> Temple
          </h1>

          <p className=" mb-8">
            We have emailed a two factor authentication code to you, please
            enter the code below.
          </p>

          {/* OTP Boxes */}
          <div className="flex justify-center gap-2 mb-8">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-14 text-center text-2xl bg-(--card-foreground) border-2 border-(--border) rounded-md focus:border-(--theme) outline-none"
              />
            ))}
          </div>
          
          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
          <Link to={'/login'}>
            <button className="btn">Back</button>
          </Link>

          <div className="flex gap-3">

            {loading ? (
              <Loader />
            ) : (
              <Button
                
                className=""
              >
                Confirm
              </Button>
            )}
          </div>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default TwoFactorVerify;
