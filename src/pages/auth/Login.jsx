import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TailSpin } from "react-loader-spinner";
import { useLoginUserMutation } from "../../services/common";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../Redux/reducers/auth";

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userType: "",
    email: "",
    password: "",
  });
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData).unwrap();

      dispatch(setUser(response));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <TailSpin height="80" width="80" color="#f3a247" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left Side: Image/Description */}
      <div className="md:w-1/2 w-full bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white flex flex-col justify-center items-center p-6 md:p-0">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">
            Manage Your Products Easily
          </h1>
          <p className="mb-6">
            Stay updated with product analytics and boost your business
            management.
          </p>
          <div className="mt-4">
            <p className="text-sm">
              “This platform has changed how I manage my business.”
            </p>
            <p className="text-sm font-bold mt-2">- MR. Jain, CEO</p>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="md:w-1/2 w-full flex justify-center items-center bg-white relative px-4 py-12 md:py-0">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-lg p-8 shadow-lg rounded-lg z-10 bg-white"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <Input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            className="mb-6 h-12"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            required
            className="mb-6 h-12"
          />
          <Input
            name="userType"
            placeholder="userType"
            type="select"
            onChange={handleChange}
            value={formData.userType}
            required
            className="mb-6 h-12"
          />
          <Button
            type="submit"
            variant="default"
            className="w-full h-12 bg-orange-500 text-white"
          >
            Login
          </Button>
          <div className="text-center mt-4">
            <p
              onClick={() => {
                navigate("/register");
              }}
            >
              Don’t have an account? Sign up
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
