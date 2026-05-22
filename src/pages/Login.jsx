import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthLogin } from "../api/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mutate, isPending } = useAuthLogin();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: (data) => {
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("userData", JSON.stringify(data?.data?.safeUser));
        navigate("/home");
      },
      onError: (err) => {
        console.log(err.response?.data?.message);
      },
    });
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("token");
    if (isAuth) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-87.5">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}