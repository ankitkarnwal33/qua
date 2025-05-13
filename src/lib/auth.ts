"use server";

import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export const isAuthenticated = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (err) {
    console.error("Token invalid", err);
    return null;
  }
};
