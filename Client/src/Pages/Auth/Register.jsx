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
import { Link, useNavigate } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Loader from "../../Components/Loader";
import { useAuthActions } from "../../Hooks/useAuthActions";

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Show password
  const [registerCountdown, setRegisterCountdown] = useState(10); // Cooldown for Registerbutton
  const [canClickRegister, setCanClickRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });

  const { REGISTER, isRegisterLoading, error } = useAuthActions();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await REGISTER(formData);
    navigate("/verify", { state: { email: formData.email } });

  };

  const handelchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (open) {
      setCanClickRegister(false);
      setRegisterCountdown(10);

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
                value={formData.username}
                onChange={handelchange}
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
                value={formData.email}
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

          {/* I agree Trams & Condtions */}
          <div className="flex items-center justify-between px-1">
            <Checkbox
              label="I agree Trams & Condtions"
              checked={formData.agreedToTerms}
              onChange={() =>
                setFormData({
                  ...formData,
                  agreedToTerms: !formData.agreedToTerms,
                })
              }
            />
          </div>

          {/* Submit Button */}
          <div>
            {isRegisterLoading ? (
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
          {isLoading ? (
            <DiscordButton
              children="Login with Discord"
              icon={<Loader size={20} />}
            />
          ) : (
            <DiscordButton children="Login with Discord" icon={<FaDiscord />} />
          )}
          {isLoading ? (
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
