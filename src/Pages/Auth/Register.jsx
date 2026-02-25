// src/pages/Login.jsx  অথবা যেখানে রাখতে চাও
import React, { useEffect, useState } from "react";
import Logo from "../../Assets/logo.png";
import { Input } from "../../Components/ui/Input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Checkbox } from "../../Components/ui/Checkbox";
import Button, {
  DiscordButton,
  GoogleButton,
} from "../../Components/ui/Button";
import { Link } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Loader from "../../Components/Loader";

const Register = () => {
  // Loader
  const [loading, setLoading] = useState(false);

  // Input Fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Show password
  const [showPassword, setShowPassword] = useState(false);

  // Cooldown for Registerbutton
  const [registerCountdown, setRegisterCountdown] = useState(8);
  const [canClickRegister, setCanClickRegister] = useState(false);

  useEffect(() => {
    if (open) {
      setCanClickRegister(false);
      setRegisterCountdown(8);

      const timer = setInterval(() => {
        setRegisterCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanClickRegister(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে তোমার login logic যাবে (API call)
    console.log("Register attempt:", { username, email, password });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 transition-colors duration-300">
      {/* Image 1 */}
      <div className="w-35 absolute left-1/4 top-1/8">
        <img src="./src/Assets/Auth/Logo1.png" alt="logo" className="w-full" />
      </div>
      {/* image 2 */}
      <div className="w-35 absolute right-1/4 bottom-1/9">
        <img src="./src/Assets/Auth/Logo2.png" alt="logo" className="w-full" />
      </div>
      <div className="max-w-md w-full space-y-8 bg-(--card) p-8 rounded-md border border-(--border)">
        {/* Logo / Heading */}
        <div className="text-center">
          <div className="w-15 mx-auto">
            <img className="w-full" src={Logo} alt="logo" />
          </div>
          <p className="mt-2 text-[14px] ">
            Welcome Back Please sign up your account
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <Input
                required
                label="username"
                id="username"
                placeholder="Enter your username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div>
              <Input
                required
                label="Email"
                id="email"
                placeholder="name@example.com"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="relative">
                <Input
                  label="Password"
                  name="passoword"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm leading-5 "
                >
                  {showPassword ? (
                    <FaRegEye
                      size={18}
                      className="hover:text-(--theme) cursor-pointer"
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={18}
                      className="hover:text-(--theme) cursor-pointer"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <Checkbox label="I agree Trams & Condtions" />
          </div>

          {/* Submit Button */}
          <div>
            {loading ? (
              <Button
                type="submit"
                className="w-full py-3 flex justify-center uppercase"
              >
                <Loader size={20} />
              </Button>
            ) : (
              <Button
                type="submit"
                className={`w-full py-3 flex justify-center uppercase ${
                  canClickRegister
                  ? "opacity-100 cursor-pointer"
                  : "opacity-50 cursor-not-allowed!"
                }`}
                disabled={!canClickRegister}
              >
                {canClickRegister
                ? "Sign Up"
                : `Sign Up (${registerCountdown}s)`}
              </Button>
            )}
          </div>

          {/* Sign up link */}
          <div className="text-center text-[14px] text-(--muted-text)">
            You have an account?{" "}
            <Link to={"/login"}>
              <span className="font-medium text-(--theme) hover:underline">
                Sign in
              </span>
            </Link>
          </div>
        </form>

        <div className="flex items-center justify-between">
          {loading ? (
            <DiscordButton
              children="Login with Discord"
              icon={<Loader size={20} />}
            />
          ) : (
            <DiscordButton children="Login with Discord" icon={<FaDiscord />} />
          )}
          {loading ? (
            <GoogleButton
              children="Continue with Google"
              icon={<Loader size={20} />}
            />
          ) : (
            <GoogleButton children="Continue with Google" icon={<FcGoogle />} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
