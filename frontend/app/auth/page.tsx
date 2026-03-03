"use client";

import { useEffect, useState } from "react";

export default function AuthPage() {

  const [registerResponse, setRegisterResponse] = useState<any>(null);
  const [loginResponse, setLoginResponse] = useState<any>(null);

  const fakeUser = {
    name: "Test User",
    email: `test${Date.now()}@mail.com`,
    password: "12345678"
  };

  // 🔹 Register
  const sendFakeRegister = async () => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fakeUser)
    });

    const data = await response.json();
    setRegisterResponse(data);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return fakeUser; // return for login
  };

  // 🔹 Login
  const sendFakeLogin = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    setLoginResponse(data);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  };

  useEffect(() => {
    const runAuthFlow = async () => {
      const user = await sendFakeRegister();
      await sendFakeLogin(user.email, user.password);
    };

    runAuthFlow();
  }, []);

  return (
    <div>
      <h1>Auth Testing Page</h1>

      {/* REGISTER RESPONSE */}
      {registerResponse && (
        <>
          <h3>Register Response:</h3>
          <pre>{JSON.stringify(registerResponse, null, 2)}</pre>
        </>
      )}

      {/* LOGIN RESPONSE */}
      {loginResponse && (
        <>
          <h3>Login Response:</h3>
          <pre>{JSON.stringify(loginResponse, null, 2)}</pre>
        </>
      )}
    </div>
  );
}