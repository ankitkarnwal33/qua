"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormContainer from "@/components/FormContainer";
import Link from "next/link";

export interface Decoded {
  email: string;
  exp: number;
  iat: number;
  id: number;
  user_type: string;
}

export default function ForgetPassword() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) {
      setError("Please enter correct mobile number.");
      return;
    }

    if (mobile.length !== 10) {
      return setError("Mobile number should be 10 digits long!");
    }
    try {
      const loginPromise = fetch("/api/auth/sendotp", {
        method: "POST",
        body: JSON.stringify({ mobile }),
        headers: { "Content-Type": "application/json" },
      }).then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          setIsOtpSent(false);
          throw new Error(data.message || "Login failed");
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
  };

  async function handleChangePassword() {
    if (!otp) {
      return setError("Please enter the otp!");
    }
    if (!password) {
      return setError("Please enter the new password!");
    }
    if (!otp) {
      return setError("Please confirm the new password!");
    }
    if (password !== password2) {
      return setError("New password and confirm password not matched !");
    }

    try {
      const loginPromise = fetch("/api/auth/changepassword", {
        method: "POST",
        body: JSON.stringify({ otp, password, password2, mobile }),
        headers: { "Content-Type": "application/json" },
      }).then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }
        router.push(`/auth/login`);
      });

      toast.promise(loginPromise, {
        loading: "Changing the password...",
        success: () => ({
          message: "Password changed successfully.",
        }),
        error: (err: Error) => ({
          message: "Cannot change the password.",
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
              <label htmlFor="mobile" className=" text-[#020817]">
                Mobile
              </label>
              <input
                id="mobile"
                type="text"
                placeholder="9897996658"
                onChange={(e) => setMobile(e.target.value)}
                className={` border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] ${
                  isOtpSent ? "cursor-not-allowed" : ""
                } `}
                disabled={isOtpSent}
              />
            </div>

            {isOtpSent && (
              <>
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

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className=" text-[#020817]">
                    New password
                  </label>
                  <input
                    id="password"
                    type="text"
                    placeholder="Enter new password"
                    className=" border border-[#E2E8F0] px-3 py-2 rounded-sm  text-[#64748B]"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password2" className=" text-[#020817]">
                    Confirm password
                  </label>
                  <input
                    id="password2"
                    type="text"
                    placeholder="Confirm password"
                    className=" border border-[#E2E8F0] px-3 py-2 rounded-sm  text-[#64748B]"
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
              </>
            )}

            {error && <p className="text-red-600">{error}</p>}
            {!isOtpSent && (
              <button
                type="submit"
                className=" gradient py-2 text-white rounded-sm cursor-pointer"
              >
                Send Otp
              </button>
            )}
            {isOtpSent && (
              <button
                type="button"
                onClick={handleChangePassword}
                className=" gradient py-2 text-white rounded-sm cursor-pointer"
              >
                Change Password
              </button>
            )}

            <div className="flex justify-between">
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
