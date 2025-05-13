import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  email: string;
  exp: number;
  iat: number;
  id: string;
  user_type: string;
};

export function useDecoded() {
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      setDecoded(decodedToken);
    } catch (error) {
      console.error("Failed to decode token:", error);
      router.push("/auth/login");
    }
  }, [router]);

  return decoded;
}
