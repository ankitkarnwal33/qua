"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FormContainer from "@/components/FormContainer";
import Link from "next/link";
import { toast } from "sonner";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const router = useRouter();
  async function handleSendOtp(event: React.FormEvent) {
    event.preventDefault();
    if (!agree) {
      setError("Please accept the terms and conditions.");
      return;
    }
    if (!name) {
      setError("Please input your name.");
      return;
    }
    if (!email) {
      setError("Please enter an email.");
      return;
    }
    if (!phone) {
      setError("Please enter mobile number.");
      return;
    }
    if (phone.length !== 10) {
      setError("Mobile number should be 10 digits long.");
      return;
    }
    setError("");

    try {
      const loginPromise = fetch("/api/auth/sendotpsignup", {
        method: "POST",
        body: JSON.stringify({ phone, name }),
        headers: { "Content-Type": "application/json" },
      }).then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          setIsOtpSent(false);
          throw new Error(data.message || "Cannot send otp ! Try again.");
        }
        setIsOtpSent(true);
      });

      toast.promise(loginPromise, {
        loading: "Sending otp...",
        success: () => ({
          message: "OTP sent successfully.",
        }),
        error: (err: Error) => ({
          message: "Cannot send otp.",
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
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!agree) {
        setError("Please accept the terms and conditions.");
        return;
      }
      if (!name) {
        setError("Please input your name.");
        return;
      }
      if (!email) {
        setError("Please enter an email.");
        return;
      }
      if (!phone) {
        setError("Please enter mobile number.");
        return;
      }
      if (phone.length !== 10) {
        setError("Mobile number should be 10 digits long.");
        return;
      }
      if (!otp) {
        setError("Please enter otp.");
        return;
      }
      setError("");

      const response = fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name, phone, otp }),
        headers: { "Content-Type": "application/json" },
      }).then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Signup failed");
        }

        // Save JWT token
        // localStorage.setItem("token", data.token);

        router.push("/auth/login");
        return data;
      });

      toast.promise(response, {
        loading: "Signing up...",
        success: (data) => ({
          message: `Welcome!`,
          description: `${data.message}`,
        }),
        error: (err: Error) => ({
          message: "Signup failed",
          description: err.message,
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
        <FormContainer
          heading="Create an Individual Account"
          subheading="Join Qua Nutrition Network to access personalized nutrition services."
        >
          <form
            action="#"
            method="POST"
            className="bg-white px-4 py-6 sm:p-10 rounded-sm shadow-sm flex flex-col gap-4 md:min-w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className=" text-[#020817]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className={`border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] ${
                  isOtpSent ? "cursor-not-allowed" : ""
                } `}
                onChange={(e) => setName(e.target.value)}
                disabled={isOtpSent}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className=" text-[#020817]">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className={`border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] ${
                  isOtpSent ? "cursor-not-allowed" : ""
                } `}
                disabled={isOtpSent}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className=" text-[#020817]">
                Phone Number
              </label>
              <input
                type="number"
                placeholder="8754821356"
                onChange={(e) => setPhone(e.target.value)}
                className={`border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] ${
                  isOtpSent ? "cursor-not-allowed" : ""
                } `}
                disabled={isOtpSent}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className=" text-[#020817]">
                Password
              </label>
              <input
                type="text"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                className={`border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] ${
                  isOtpSent ? "cursor-not-allowed" : ""
                } `}
                disabled={isOtpSent}
              />
            </div>

            {isOtpSent && (
              <div className="flex flex-col gap-2">
                <label htmlFor="otp" className=" text-[#020817]">
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="One time password"
                  className=" border border-[#E2E8F0] px-3 py-2 rounded-sm  text-[#64748B]"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="accept"
                id="accept"
                onChange={() => setAgree(!agree)}
              />
              <p>
                I agree to the{" "}
                <Link href={"#"} className=" text-blue-600">
                  {" "}
                  terms{" "}
                </Link>{" "}
                and{" "}
                <Link href={"#"} className=" text-blue-600">
                  {" "}
                  condition of company{" "}
                </Link>
              </p>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {isOtpSent && (
              <button
                type="submit"
                className=" gradient py-2 text-white rounded-sm cursor-pointer"
              >
                Create Account
              </button>
            )}
            {!isOtpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                className=" gradient py-2 text-white rounded-sm cursor-pointer"
              >
                Send Otp
              </button>
            )}
          </form>
        </FormContainer>
      </div>

      <Footer />
    </>
  );
}
