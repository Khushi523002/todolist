import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
// ⬆️ use "username" instead of "name"

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 mb-3 rounded border" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-3 rounded border" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 rounded border" required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
