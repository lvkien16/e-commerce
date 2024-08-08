"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { login } from "@/redux/user/userSlice";
import { useAppDispatch } from "@/redux/store";

interface FormData {
  email: string;
  password: string;
}

export default function LogInPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      } else {
        setError("");
        setLoading(false);
        setFormData({ email: "", password: "" });
        dispatch(login(data));
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 w-full flex justify-center items-center px-4">
      <div className="bg-secondary py-10 w-full px-20 md:w-1/2 rounded-xl">
        <h1 className="text-4xl text-primary font-semibold text-center mb-4">
          Log In
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogIn}>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoComplete="current-email"
            placeholder="Email"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
            value={formData.email}
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
            value={formData.password}
          />
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-primary">
            Don{`'`}t have an account?{" "}
            <Link href="/auth/register" className="hover:underline">
              Register
            </Link>
          </p>
          <button
            type="submit"
            className="bg-primary text-white border hover:bg-transparent hover:text-primary border-primary w-full py-2 rounded-lg font-semibold focus:outline-none"
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
