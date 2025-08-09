import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Divider from "./shared/Devider";
import SocialLogin from "./shared/SocialLogin";
import Lottie from "lottie-react";
import registerLottie from "../assets/Lotties/register.json";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const { register, setUser, updateUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  // imgbb API key
  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );
      setPhotoURL(res.data.data.url);
      toast.success("Photo uploaded successfully!");
    } catch (err) {
      toast.error("Photo upload failed!");
      setPhotoURL("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must include 1 uppercase, 1 lowercase letter & be at least 6 characters."
      );
      return;
    }

    if (!photoURL) {
      toast.error("Please upload your profile photo.");
      return;
    }

    register(email, password)
      .then((res) => {
        updateUser({ displayName: name, photoURL: photoURL }).then(() => {
          setUser((prevUser) => ({
            ...prevUser,
            displayName: name,
            photoURL: photoURL,
          }));
        });
        toast.success("Registered successfully!");
        navigate(from);
      })
      .catch((err) => {
        toast.error("Registration failed!");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center px-4">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-10">
        {/* Form Section */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border rounded px-3 py-2 hover:cursor-pointer"
                required
              />
              {uploading && (
                <p className="text-blue-600 text-sm mt-2">Uploading...</p>
              )}
              {photoURL && (
                <img
                  src={photoURL}
                  alt="Profile"
                  className="mt-2 w-20 h-20 object-cover rounded-full shadow"
                />
              )}
              {/* Hidden input for photoURL */}
              <input type="hidden" name="photoURL" value={photoURL} />
            </div>
            <div className="relative">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute hover:cursor-pointer top-9 right-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:cursor-pointer text-white font-semibold py-2 rounded hover:bg-primary/90 transition"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Register"}
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium underline">
              Login
            </Link>
          </p>
          <Divider />
          <SocialLogin />
        </div>

        {/* Lottie Animation */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <Lottie animationData={registerLottie} />
        </div>
      </div>
    </div>
  );
};

export default Register;