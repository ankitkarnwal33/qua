"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormContainer from "@/components/FormContainer";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export interface Decoded {
  email: string;
  exp: number;
  iat: number;
  id: number;
  user_type: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      const loginPromise = fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }).then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }

        // Save token to localStorage
        localStorage.setItem("token", data.token);
        const decoded: Decoded = jwtDecode(token);
        // console.log("Decoded JWT:", decoded);
        router.push(`/dashboard/${decoded.user_type}`);
        return data.token;
      });

      const token = localStorage.getItem("token") || "";
      toast.promise(loginPromise, {
        loading: "Logging in...",
        success: () => ({
          message: "Login Successful",
          description: "You have been logged in",
        }),
        error: (err: Error) => ({
          message: "Login failed",
          description: err.message,
          position: "top-center",
        }),
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <>
      <Header />
      <div className=" gradient-3 flex items-center justify-center min-h-40">
        <FormContainer heading="Log In To Your Account" subheading="">
          <form
            action="#"
            method="POST"
            className="bg-white p-10 rounded-sm shadow-sm flex flex-col gap-4 md:min-w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className=" text-[#020817]">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className=" border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] "
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className=" text-[#020817]">
                Password
              </label>
              <input
                type="text"
                placeholder="password"
                className=" border border-[#E2E8F0] px-3 py-2 rounded-sm  text-[#64748B]"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              className=" gradient py-2 text-white rounded-sm cursor-pointer"
            >
              Login
            </button>

            <div className="flex justify-between">
              <Link
                href={"/auth/forgetpassword"}
                className=" text-blue-800 underline"
              >
                forgot password ?
              </Link>
              <Link href={"/"} className=" text-blue-800 underline">
                Home
              </Link>
            </div>
          </form>
        </FormContainer>
      </div>
      <Footer />
    </>
  );
}
