"use client";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3002/login",
        { username, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="height-100vh flex justify-center items-center">
      <form
        className="bg-gray-200 flex justify-center items-center flex-col space-y-6 w-1/4 lg:w-1/3 rounded-md py-10 px-4 lg:px-8 mt-10 min-w-[350px] max-w-[500px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-center my-4">LOGIN</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-style"
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-style"
          type="password"
          placeholder="password"
        />
        <button className="bg-white px-4 py-2 rounded-md hover:bg-black hover:text-white duration-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
