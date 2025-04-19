import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-3 rounded border" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 rounded border" required />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Login</button>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account? <a href="/register" className="text-green-600 hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
