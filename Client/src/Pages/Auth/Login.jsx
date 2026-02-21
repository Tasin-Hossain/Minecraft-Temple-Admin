// src/pages/Login.jsx  অথবা যেখানে রাখতে চাও
import React, { useState } from "react";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে তোমার login logic যাবে (API call)
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-(--card) p-8 rounded-md shadow-xl border border-(--border)">
        {/* Logo / Heading */}
        <div className="text-center">
          <div className="w-15 mx-auto">
            <img className="w-full" src={Logo} alt="logo" />
          </div>
          <p className="mt-2 text-[14px] ">
            Welcome Back Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
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

            <a href="#" className="text-(--theme) text-[14px] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full py-3.5 flex justify-center uppercase"
            >
              Sign In
            </Button>
          </div>

          {/* Sign up link */}
          <div className="text-center text-[14px] text-(--muted-text)">
            Don't have an account?{" "}
            <Link to={"/register"}>
              <span className="font-medium text-(--theme) hover:underline">
                Sign up
              </span>
            </Link>
          </div>
        </form>

        <div className="flex items-center justify-between">
          <DiscordButton children="Login with Discord" icon={<FaDiscord />} />
          <GoogleButton children="Continue with Google" icon={<FcGoogle/>}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
