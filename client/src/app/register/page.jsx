"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/register", { username, password })
      .then((res) => {
        if (res.status === 201) {
          toast.success(
            "başarıyla kayıt oldunuz giriş sayfasına yönlendiriliyorsunuz"
          );
        }
        setUsername("");
        setPassword("");
        router.push("/login");
      })
      .catch((err) => {
        if (err) {
          toast.error(err.response.data.msg);
        }
      });
  };

  return (
    <div className="height-100vh flex justify-center items-center">
      <form
        className="bg-gray-200 flex justify-center items-center flex-col space-y-6 w-1/4 lg:w-1/3 rounded-md py-10 px-4 lg:px-8 mt-10 min-w-[350px] max-w-[500px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-center my-4">REGISTER</h1>
        <input
          value={username}
          className="input-style"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={password}
          className="input-style"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-white px-4 py-2 rounded-md hover:bg-black hover:text-white duration-300">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
