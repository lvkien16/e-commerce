"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return setError("Please fill in all fields");
    } else if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    } else if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    } else if (formData.phone.length !== 10 || isNaN(Number(formData.phone))) {
      setError("Please enter a valid phone number");
      return;
    }
    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return setLoading(false);
      } else {
        setError("");
        setLoading(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/auth/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10 w-full flex justify-center items-center px-4">
      <div className="bg-secondary py-10 w-full px-20 md:w-1/2 rounded-xl">
        <h1 className="text-4xl text-primary font-semibold text-center mb-4">
          Register
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Name"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <input
            onChange={handleChange}
            type="email"
            autoComplete="current-email"
            name="email"
            placeholder="Email"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <input
            onChange={handleChange}
            type="text"
            name="phone"
            placeholder="Phone number"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <input
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
            name="password"
            placeholder="Password"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-primary">
            Have an account?{" "}
            <Link href="/auth/log-in" className="hover:underline">
              Log in
            </Link>
          </p>
          <button
            type="submit"
            className="bg-primary text-white border hover:bg-transparent hover:text-primary border-primary w-full py-2 rounded-lg font-semibold focus:outline-none"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
