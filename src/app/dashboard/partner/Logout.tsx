"use client";
import { useRouter } from "next/navigation";
const Logout = () => {
  const router = useRouter();
  async function handleLogout(event: React.FormEvent) {
    event.preventDefault();
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) router.push("/auth/login");
    } catch (error) {
      alert("Logout failed");
      console.log(error);
    }
  }
  return <p onClick={handleLogout}>Logout</p>;
};

export default Logout;
