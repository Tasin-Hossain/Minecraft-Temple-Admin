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
import Loader from "../../Components/Loader";

import useAuth from "../../Hooks/useAuth";


const Login = () => {
  // Loader
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Show password
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    stayLoggedIn: false,
  });

  const { useLogin, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    useLogin(formData);
    
  };

  const handelchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            Welcome Back Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <Input
                required
                label="Email or Username"
                id="usernameOrEmail"
                placeholder="username@example.com"
                name="usernameOrEmail"
                type="email"
                value={formData.usernameOrEmail}
                onChange={handelchange}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={formData.password}
                  onChange={handelchange}
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
            {/* stay Login */}
            <Checkbox
              label="Stay log in"
              checked={formData.stayLoggedIn}
              onChange={() =>
                setFormData({
                  ...formData,
                  stayLoggedIn: !formData.stayLoggedIn,
                })
              }
            />

            <a href="#" className="text-(--theme) text-[14px] hover:underline">
              Forgot password?
            </a>
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
                onSubmit={handleSubmit}
                className="w-full py-3 flex justify-center uppercase"
              >
                Sign In
              </Button>
            )}
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

export default Login;
