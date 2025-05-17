"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FormContainer from "@/components/FormContainer";
import Link from "next/link";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [partnerType, setPartnerType] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

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
      setError("");

      const response = fetch("/api/auth/signuppart", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          user_type: "partner",
          name,
          phone,
          city,
          contactPerson,
          partnerType,
        }),
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
          heading="Join as partner"
          subheading="Join Qua Nutrition Network to access personalized nutrition services."
        >
          <form
            action="#"
            method="POST"
            className="bg-white px-4 py-10 sm:p-10 rounded-sm shadow-sm flex flex-col gap-4 md:min-w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-4  flex-col sm:flex-row">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className=" text-[#020817]">
                  Business/Brand Name
                </label>
                <input
                  type="text"
                  placeholder="Your Business Name"
                  className=" border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] "
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contactPerson" className=" text-[#020817]">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  placeholder="Contact Person Name"
                  className=" border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] "
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
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
                <label htmlFor="phone" className=" text-[#020817]">
                  Phone Number
                </label>
                <input
                  type="number"
                  placeholder="8754821356"
                  onChange={(e) => setPhone(e.target.value)}
                  className=" border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] "
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="password" className=" text-[#020817]">
                Password
              </label>
              <input
                type="text"
                placeholder="password"
                className=" border border-[#E2E8F0] px-3 py-2 rounded-sm sm:w-full  text-[#64748B]"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-4  sm:items-center flex-col sm:flex-row">
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className=" text-[#020817]">
                  City
                </label>
                <input
                  type="text"
                  placeholder="city"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                  className=" border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className=" text-[#020817]">
                  Type Of Partner
                </label>
                <Select
                  value={partnerType}
                  onValueChange={setPartnerType}
                  required
                >
                  <SelectTrigger className="w-[120px] py-5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Partner</SelectLabel>
                      <SelectItem value="Gym">Gym</SelectItem>
                      <SelectItem value="Clinik">Clinik</SelectItem>
                      <SelectItem value="Restaurent">Restaurent</SelectItem>
                      <SelectItem value="Academy">Academy</SelectItem>
                      <SelectItem value="Nutrition partner">
                        Nutrition partner
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
            <button
              type="submit"
              className=" gradient py-2 text-white rounded-sm cursor-pointer"
            >
              Create Account
            </button>
          </form>
        </FormContainer>
      </div>

      <Footer />
    </>
  );
}
